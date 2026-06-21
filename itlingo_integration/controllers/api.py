import base64
import json
import logging
import os
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
            'wsid': project.id,
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

    @http.route(
        '/itoi/launch/public/<int:project_id>',
        type='http', auth='public', website=True,
    )
    def itoi_launch_public(self, project_id, **kw):
        """Read-only ITOI launch for visitors to public workspaces (no membership)."""
        settings = request.env['itlingo.integration.settings'].sudo()._get_settings()
        itoi_url = (settings.itoi_url or 'http://localhost:3000/').rstrip('/')

        project = request.env['project.project'].sudo().browse(project_id)
        if not project.exists() or not project.is_public_workspace:
            return request.not_found()

        user = request.env.user
        org_name = project.organization_id.name if project.organization_id else ''

        payload = json.dumps({
            'user': user.login,
            'workspace': project.name,
            'organization': org_name,
            'write': False,
            'wsid': project.id,
        })

        iv_b64, ct_b64 = settings._aes_encrypt(payload)

        _logger.info(
            'ITOI public launch: user=%s project=%s',
            user.login, project.name,
        )

        qs = urlencode({'iv': iv_b64, 't': ct_b64})
        target = f'{itoi_url}/createTempWorkspace?{qs}'
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
    # Launch-token helpers (for ITOI document import endpoints)
    # ------------------------------------------------------------------

    def _validate_launch_token(self):
        """Decrypt the ITOI launch token forwarded by the ITOI backend.

        ITOI holds the AES-encrypted launch payload in its session and
        forwards it as ``Authorization: Bearer <iv>:<ciphertext>``. Unlike
        :meth:`_validate_bearer_token`, this token is not persisted as an
        ``itlingo.integration.token`` record; it is the same payload produced
        by :meth:`itoi_launch`, so we only need to decrypt it.

        Returns ``(payload, None)`` or ``(None, Response)`` on error.
        """
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
        settings = request.env['itlingo.integration.settings'].sudo()._get_settings()
        try:
            decrypted = settings._aes_decrypt(iv_b64, ct_b64)
            payload = json.loads(decrypted)
        except Exception:
            return None, Response(
                json.dumps({'error': 'Invalid token'}),
                status=401, content_type='application/json',
            )
        return payload, None

    def _check_workspace_access(self, payload, workspace_id):
        """Resolve the project for *workspace_id* and verify the token's user
        is allowed to access it.

        Access is granted when the user has an ``accepted`` workspace role on
        the project, or the project is a public workspace.

        Returns ``(project, None)`` or ``(None, Response)`` on error.
        """
        try:
            wsid = int(payload.get('wsid'))
        except (TypeError, ValueError):
            return None, Response(
                json.dumps({'error': 'Token does not carry a workspace id'}),
                status=401, content_type='application/json',
            )
        if wsid != workspace_id:
            return None, Response(
                json.dumps({'error': 'Workspace mismatch'}),
                status=403, content_type='application/json',
            )

        project = request.env['project.project'].sudo().browse(wsid)
        if not project.exists():
            return None, Response(
                json.dumps({'error': 'Workspace not found'}),
                status=404, content_type='application/json',
            )

        user = request.env['res.users'].sudo().search(
            [('login', '=', payload.get('user'))], limit=1,
        )
        if not user:
            return None, Response(
                json.dumps({'error': 'Unknown user'}),
                status=401, content_type='application/json',
            )

        has_role = request.env['itlingo.project.role'].sudo().search_count([
            ('user_id', '=', user.id),
            ('project_id', '=', project.id),
            ('state', '=', 'accepted'),
        ])
        if not has_role and not project.is_public_workspace:
            return None, Response(
                json.dumps({'error': 'You do not have access to this workspace'}),
                status=403, content_type='application/json',
            )
        return project, None

    @staticmethod
    def _file_extension(file_name):
        """Return the lowercase extension (without dot) of *file_name*."""
        if not file_name:
            return ''
        return os.path.splitext(file_name)[1].lower().lstrip('.')

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

    # ------------------------------------------------------------------
    # ITOI document import endpoints (token_api)
    # ------------------------------------------------------------------

    def _importable_workspace_documents(self, project):
        """Return the documents of *project* and its organization that are
        importable (whitelisted extension and have file content)."""
        settings = request.env['itlingo.integration.settings'].sudo()._get_settings()
        allowed = settings._get_importable_extensions()

        documents = project.document_ids
        if project.organization_id:
            documents |= project.organization_id.document_ids

        return documents.filtered(
            lambda d: d.document_file
            and self._file_extension(d.file_name) in allowed
            and not getattr(d, "is_template", False)
        )

    @http.route('/token_api/get-file-list/<int:workspace_id>', type='http',
                auth='none', methods=['GET'], csrf=False)
    def token_api_get_file_list(self, workspace_id, **kw):
        """List the importable cloud documents for a workspace (and its org)."""
        payload, error_resp = self._validate_launch_token()
        if error_resp:
            return error_resp
        project, error_resp = self._check_workspace_access(payload, workspace_id)
        if error_resp:
            return error_resp

        documents = self._importable_workspace_documents(project)
        namelist = [{
            'id': doc.id,
            'name': doc.file_name,
            'type': self._file_extension(doc.file_name)
            or (doc.document_type_id.name or ''),
        } for doc in documents]

        _logger.info(
            'ITOI get-file-list: workspace=%s user=%s files=%d',
            workspace_id, payload.get('user'), len(namelist),
        )
        return Response(
            json.dumps({'namelist': namelist}),
            content_type='application/json',
        )

    @http.route('/token_api/download-file/<int:workspace_id>/<int:file_id>',
                type='http', auth='none', methods=['GET'], csrf=False)
    def token_api_download_file(self, workspace_id, file_id, **kw):
        """Return the binary content of an importable cloud document."""
        payload, error_resp = self._validate_launch_token()
        if error_resp:
            return error_resp
        project, error_resp = self._check_workspace_access(payload, workspace_id)
        if error_resp:
            return error_resp

        document = request.env['itlingo.document'].sudo().browse(file_id)
        if not document.exists():
            return Response(
                json.dumps({'error': 'Document not found'}),
                status=404, content_type='application/json',
            )

        # The document must belong to this workspace or its organization.
        belongs = document.project_id.id == project.id or (
            project.organization_id
            and document.organization_id.id == project.organization_id.id
        )
        if not belongs:
            return Response(
                json.dumps({'error': 'Document does not belong to this workspace'}),
                status=403, content_type='application/json',
            )

        settings = request.env['itlingo.integration.settings'].sudo()._get_settings()
        allowed = settings._get_importable_extensions()
        if not document.document_file or \
                self._file_extension(document.file_name) not in allowed:
            return Response(
                json.dumps({'error': 'File type is not importable'}),
                status=403, content_type='application/json',
            )

        content = base64.b64decode(document.document_file)
        _logger.info(
            'ITOI download-file: workspace=%s user=%s file_id=%s name=%s bytes=%d',
            workspace_id, payload.get('user'), file_id,
            document.file_name, len(content),
        )
        return request.make_response(
            content,
            headers=[
                ('Content-Type', 'application/octet-stream'),
                ('Content-Disposition',
                 'attachment; filename="%s"' % (document.file_name or 'document')),
                ('Content-Length', str(len(content))),
            ],
        )
