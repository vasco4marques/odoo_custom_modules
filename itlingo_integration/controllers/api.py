import json
import logging
from urllib.parse import urlencode

from werkzeug.utils import redirect as wz_redirect

from odoo import http
from odoo.http import request, Response

_logger = logging.getLogger(__name__)

WRITE_ROLES = ('ws_manager', 'doc_manager')


class ITLingoIntegrationAPI(http.Controller):

    # ------------------------------------------------------------------
    # ITOI redirect (replaces Django's generate-itoi-env/<project_id>)
    # ------------------------------------------------------------------

    @http.route(
        '/itoi/launch/<int:project_id>',
        type='http', auth='user', website=True,
    )
    def itoi_launch(self, project_id, **kw):
        """Encrypt user/project info and redirect the browser to ITOI's
        ``/createTempWorkspace?iv=…&t=…`` endpoint — same flow the old
        Django view used."""
        settings = request.env['itlingo.integration.settings'].sudo()._get_settings()
        itoi_url = (settings.itoi_url or 'http://localhost:3000/').rstrip('/')

        project = request.env['project.project'].sudo().browse(project_id)
        if not project.exists():
            return request.not_found()

        user = request.env.user
        role_rec = request.env['itlingo.project.role'].sudo().search([
            ('user_id', '=', user.id),
            ('project_id', '=', project_id),
            ('state', '=', 'accepted'),
        ], limit=1)

        has_write = role_rec.role in WRITE_ROLES if role_rec else False

        org_name = project.organization_id.name if project.organization_id else ''

        payload = json.dumps({
            'user': user.login,
            'workspace': project.name,
            'organization': org_name,
            'write': has_write,
        })

        iv_b64, ct_b64 = settings._aes_encrypt(payload)

        _logger.info(
            'ITOI launch: user=%s project=%s iv_len=%d ct_len=%d key_len=%d',
            user.login, project.name, len(iv_b64), len(ct_b64),
            len(settings.encryption_key or ''),
        )

        qs = urlencode({'iv': iv_b64, 't': ct_b64})
        target = f'{itoi_url}/createTempWorkspace?{qs}'
        _logger.info('ITOI redirect target: %s', target)
        return wz_redirect(target, code=302)

    # ------------------------------------------------------------------
    # Bearer-token helpers (for REST API endpoints)
    # ------------------------------------------------------------------

    def _validate_bearer_token(self):
        """Extract iv + ct from the Authorization header and validate."""
        auth_header = request.httprequest.headers.get('Authorization', '')
        if not auth_header.startswith('Bearer '):
            return None, Response(
                json.dumps({'error': 'Missing or invalid Authorization header'}),
                status=401, content_type='application/json',
            )
        raw = auth_header[7:]
        parts = raw.split(':', 1)
        if len(parts) != 2:
            return None, Response(
                json.dumps({'error': 'Token must be iv:ciphertext (base64url)'}),
                status=401, content_type='application/json',
            )
        iv_b64, ct_b64 = parts
        try:
            payload = request.env['itlingo.integration.token'].sudo()._validate_token(iv_b64, ct_b64)
        except Exception as e:
            return None, Response(
                json.dumps({'error': str(e)}),
                status=401, content_type='application/json',
            )
        return payload, None

    # ------------------------------------------------------------------
    # REST API endpoints
    # ------------------------------------------------------------------

    @http.route('/api/itlingo/v1/whoami', type='http', auth='none',
                methods=['GET'], csrf=False)
    def api_whoami(self, **kw):
        payload, error_resp = self._validate_bearer_token()
        if error_resp:
            return error_resp
        return Response(
            json.dumps({
                'user_id': payload.get('user_id'),
                'user_login': payload.get('user_login'),
                'project_id': payload.get('project_id'),
                'expires_at': payload.get('expires_at'),
            }),
            content_type='application/json',
        )

    @http.route('/api/itlingo/v1/projects', type='http', auth='none',
                methods=['GET'], csrf=False)
    def api_projects(self, **kw):
        payload, error_resp = self._validate_bearer_token()
        if error_resp:
            return error_resp

        user_id = payload.get('user_id')
        projects = request.env['project.project'].sudo().search([
            ('workspace_role_ids.user_id', '=', user_id),
            ('workspace_role_ids.state', '=', 'accepted'),
        ])

        data = [{
            'id': p.id,
            'name': p.name,
            'methodology': p.methodology,
            'business_status': p.business_status,
        } for p in projects]

        return Response(json.dumps(data), content_type='application/json')

    @http.route('/api/itlingo/v1/projects/<int:project_id>/backlog',
                type='http', auth='none', methods=['GET'], csrf=False)
    def api_project_backlog(self, project_id, **kw):
        payload, error_resp = self._validate_bearer_token()
        if error_resp:
            return error_resp

        items = request.env['itlingo.backlog.item'].sudo().search([
            ('project_id', '=', project_id),
        ])

        data = [{
            'id': item.id,
            'identifier': item.identifier,
            'name': item.name,
            'item_type': item.item_type,
            'story_points': item.story_points,
            'priority': item.priority,
            'status': item.status,
            'sprint_id': item.sprint_id.id if item.sprint_id else None,
            'sprint_name': item.sprint_id.name if item.sprint_id else None,
        } for item in items]

        return Response(json.dumps(data), content_type='application/json')

    @http.route('/api/itlingo/v1/projects/<int:project_id>/sprints',
                type='http', auth='none', methods=['GET'], csrf=False)
    def api_project_sprints(self, project_id, **kw):
        payload, error_resp = self._validate_bearer_token()
        if error_resp:
            return error_resp

        sprints = request.env['itlingo.sprint'].sudo().search([
            ('project_id', '=', project_id),
        ])

        data = [{
            'id': s.id,
            'name': s.name,
            'state': s.state,
            'start_date': str(s.start_date) if s.start_date else None,
            'end_date': str(s.end_date) if s.end_date else None,
            'total_story_points': s.total_story_points,
            'completed_story_points': s.completed_story_points,
        } for s in sprints]

        return Response(json.dumps(data), content_type='application/json')

    @http.route('/api/itlingo/v1/token/generate', type='http', auth='user',
                methods=['POST'], csrf=False)
    def api_generate_token(self, **kw):
        """Authenticated endpoint for users to generate their own ITOI token."""
        project_id = kw.get('project_id')
        description = kw.get('description', 'API Token')

        token_rec = request.env['itlingo.integration.token'].create({
            'user_id': request.uid,
            'project_id': int(project_id) if project_id else False,
            'description': description,
        })
        token_rec.action_generate_token()

        return Response(
            json.dumps({
                'iv': token_rec.token_iv,
                'token': token_rec.token_ct,
                'expires_at': str(token_rec.expires_at),
            }),
            content_type='application/json',
        )
