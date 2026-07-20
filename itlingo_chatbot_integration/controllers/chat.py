from odoo import http
from odoo.http import request, Response
import os
import hmac
import hashlib
import base64
import json
import logging
import re
import time

import requests as http_requests

_logger = logging.getLogger(__name__)

# Roles allowed to export documents into a workspace (same as ITOI WRITE_ROLES).
EXPORT_WRITE_ROLES = ('ws_manager', 'doc_manager')

EXPORT_MAX_CONTENT_BYTES = 1024 * 1024  # 1 MB
ITOI_PUSH_TIMEOUT_S = 5


def _b64url_encode(data: bytes) -> str:
    return base64.urlsafe_b64encode(data).rstrip(b"=").decode("ascii")


def _b64url_decode(data: str) -> bytes:
    rem = len(data) % 4
    if rem:
        data += "=" * (4 - rem)
    return base64.urlsafe_b64decode(data.encode("ascii"))


def _sign_payload(secret: str, payload: dict) -> str:
    header = {"alg": "HS256", "typ": "JWT"}
    header_b = _b64url_encode(json.dumps(header, separators=(",", ":")).encode("utf-8"))
    payload_b = _b64url_encode(json.dumps(payload, separators=(",", ":")).encode("utf-8"))
    signing_input = (header_b + "." + payload_b).encode("ascii")
    sig = hmac.new(secret.encode("utf-8"), signing_input, hashlib.sha256).digest()
    sig_b = _b64url_encode(sig.encode("latin1") if isinstance(sig, str) else sig)
    return header_b + "." + payload_b + "." + sig_b


def _user_can_write_workspace(user, project_id: int) -> bool:
    """Return True when *user* holds an accepted write role on the workspace.

    Write roles mirror :data:`EXPORT_WRITE_ROLES` (``ws_manager``/``doc_manager``).
    Users with no role or only the lowest ``ws_member`` role are read-only.
    """
    return bool(request.env['itlingo.project.role'].sudo().search_count([
        ('user_id', '=', user.id),
        ('project_id', '=', project_id),
        ('state', '=', 'accepted'),
        ('role', 'in', EXPORT_WRITE_ROLES),
    ]))


def _build_workspace_token(project_id: int, user, secret: str) -> str:
    now = int(time.time())
    db_name = request.env.cr.dbname
    # include workspace_key for a stable external identifier
    project = request.env['itlingo.workspace'].sudo().browse(project_id)
    workspace_key = project.workspace_key if project and project.exists() else ''
    organization_id = project.organization_id.id if (project and project.exists() and project.organization_id) else None
    scope = f"odoo:{db_name}:workspace:{project_id}:user:{user.id}"
    payload = {
        # Read-only when the user lacks an accepted write role on the workspace
        # (no role at all, e.g. public workspace, or only the ws_member role).
        "read_only": not _user_can_write_workspace(user, project_id),
        "aud": "itlingo-chatbot",
        "sub": user.id,
        "odoo_user_id": user.id,
        "odoo_user_login": user.login,
        "odoo_user_name": user.name,
        "odoo_partner_id": user.partner_id.id if user.partner_id else None,
        "odoo_db": db_name,
        "workspace_id": project_id,
        "workspace_key": workspace_key,
        "workspace_name": request.env["itlingo.workspace"].sudo().browse(project_id).name or "",
        "organization_id": organization_id,
        "scope": scope,
        "iat": now,
        "exp": now + 3600,
    }
    return _sign_payload(secret, payload)


def _verify_workspace_token(token: str, secret: str) -> dict | None:
    """Verify an HS256 token produced by :func:`_build_workspace_token`.

    Returns the payload dict on success, or ``None`` on any failure
    (bad format, bad signature, expired, wrong audience).
    """
    try:
        parts = token.split(".")
        if len(parts) != 3:
            return None
        signing_input = (parts[0] + "." + parts[1]).encode("ascii")
        expected = hmac.new(secret.encode("utf-8"), signing_input, hashlib.sha256).digest()
        if not hmac.compare_digest(_b64url_encode(expected), parts[2]):
            return None
        payload = json.loads(_b64url_decode(parts[1]).decode("utf-8"))
        if payload.get("aud") != "itlingo-chatbot":
            return None
        exp = payload.get("exp")
        if exp and int(exp) < int(time.time()):
            return None
        return payload
    except Exception:
        return None


def _split_filename(filename: str) -> tuple[str, str]:
    """Return (base, extension-without-dot) of *filename*."""
    if "." in filename:
        base, ext = filename.rsplit(".", 1)
        return base, ext.lower()
    return filename, ""


def _dedup_filename(filename: str, existing_names: set[str]) -> str:
    """Return *filename* or the first free ``base(n).ext`` variant."""
    existing_lower = {n.lower() for n in existing_names}
    if filename.lower() not in existing_lower:
        return filename
    base, ext = _split_filename(filename)
    suffix = ("." + ext) if ext else ""
    n = 1
    while True:
        candidate = f"{base}({n}){suffix}"
        if candidate.lower() not in existing_lower:
            return candidate
        n += 1


def _resolve_dsl_export_filename(env, filename: str, dsl_reference) -> str:
    """Derive an exported specification's extension from its active DSL."""
    raw_reference = str(dsl_reference or '').strip()
    if not raw_reference:
        return filename

    Dsl = env['itlingo.dsl'].sudo()
    if raw_reference.isdigit():
        dsl = Dsl.browse(int(raw_reference)).exists()
        if dsl and dsl.status != 'active':
            dsl = Dsl.browse()
    else:
        dsl = Dsl.search([
            ('acronym', '=ilike', raw_reference),
            ('status', '=', 'active'),
        ], limit=1)
    if not dsl:
        raise ValueError(
            f'No active DSL matches "{raw_reference}". Reload the chatbot '
            'to refresh its available grammars.'
        )

    base_name, _client_extension = _split_filename(filename)
    return f'{base_name}.{dsl._extensions()[0]}'


class ChatController(http.Controller):
    def _workspace_shell_values(self, project_id: int, chat_url: str, token: str,
                                public_hub: bool = False) -> dict:
        project = request.env["itlingo.workspace"].sudo().browse(project_id)
        prefix = (
            f"/public-workspaces/{project_id}" if public_hub
            else f"/my/workspaces/{project_id}"
        )
        # The hub shell sidebar needs the member's role (Settings link is
        # manager-only); anonymous/public visitors have none.
        user_role = None
        if not public_hub:
            user_role = request.env['itlingo.project.role'].sudo().search([
                ('user_id', '=', request.env.user.id),
                ('project_id', '=', project_id),
                ('state', '=', 'accepted'),
            ], limit=1)
        return {
            "project": project,
            "project_id": project_id,
            "user_role": user_role,
            "workspace_key": project.workspace_key,
            "workspace_session_id": str(project.workspace_key),
            "ws_hub_prefix": prefix,
            "page_name": "workspace_chat",
            "workspace_hub": True,
            "workspace_hub_page": "chat",
            "workspace_hub_public": public_hub,
            "chat_url": chat_url,
            "token": token,
        }

    def _chat_config(self):
        params = request.env['ir.config_parameter'].sudo()
        chat_url = (
            params.get_param('itlingo_chatbot.chatbot_url')
            or params.get_param('itlingo_chatbot.url')
            or 'http://127.0.0.1:8000/'
        )
        secret = (os.getenv('ITLINGO_CHATBOT_SECRET') or params.get_param('itlingo_chatbot.secret', default=None) or '').strip()
        return chat_url, secret

    def _build_token_or_empty(self, project_id, user, secret):
        if not secret:
            return ''
        try:
            return _build_workspace_token(project_id, user, secret)
        except Exception:
            return ''

    @http.route(['/my/workspaces/<int:project_id>/chat'], type='http', auth='user', website=True)
    def workspace_chat(self, project_id, **kw):
        chat_url, secret = self._chat_config()
        token = self._build_token_or_empty(project_id, request.env.user, secret)
        return request.render('itlingo_chatbot_integration.chat_page', self._workspace_shell_values(project_id, chat_url, token))

    @http.route(['/public-workspaces/<int:project_id>/chat'], type='http', auth='public', website=True)
    def public_workspace_chat(self, project_id, **kw):
        """Read-only chatbot for anonymous visitors of a public workspace.

        The token is built for the current (public or roleless) user, so it
        always carries ``read_only: true`` and the chatbot rejects any write
        (new chats, messages, uploads) while allowing browsing of the
        workspace's existing chats.
        """
        project = request.env['itlingo.workspace'].sudo().browse(project_id)
        if not project.exists() or not project.is_public_workspace:
            return request.not_found()
        user = request.env.user
        if not user._is_public():
            # Workspace members keep their normal (possibly writable) hub.
            has_role = request.env['itlingo.project.role'].sudo().search_count([
                ('user_id', '=', user.id),
                ('project_id', '=', project_id),
                ('state', '=', 'accepted'),
            ])
            if has_role:
                return request.redirect(f'/my/workspaces/{project_id}/chat')
        chat_url, secret = self._chat_config()
        token = self._build_token_or_empty(project_id, user, secret)
        return request.render(
            'itlingo_chatbot_integration.chat_page',
            self._workspace_shell_values(project_id, chat_url, token, public_hub=True),
        )

    # ------------------------------------------------------------------
    # Chatbot document export (Chatbot -> Cloud -> ITOI)
    # ------------------------------------------------------------------

    @staticmethod
    def _json_response(payload: dict, status: int = 200) -> Response:
        return Response(
            json.dumps(payload), status=status, content_type='application/json',
        )

    @staticmethod
    def _itoi_failure(reason_code: str, message: str, http_status=None) -> dict:
        return {
            'pushed': False,
            'live': False,
            'reason_code': reason_code,
            'http_status': http_status,
            'message': message,
        }

    def _push_file_to_itoi(self, settings, user, project, filename: str, content: str) -> dict:
        """Push *content* to ITOI's ``/pushFile`` endpoint.

        Returns a structured dict: ``pushed``/``live`` (bools), ``file_name``
        (final name on the ITOI side) and, on failure, ``reason_code``,
        ``http_status`` and ``message`` (ITOI's own error text when available).
        Never raises.

        Reason codes: ``not_configured``, ``unreachable``, ``timeout``,
        ``route_missing``, ``auth_failed``, ``invalid_response``, plus any
        code ITOI itself reports (e.g. ``workspace_mismatch``,
        ``write_denied``, ``db_write_failed``).
        """
        itoi_url = (settings.itoi_url or '').rstrip('/')
        if not itoi_url:
            return self._itoi_failure(
                'not_configured', 'ITOI URL is not configured in the integration settings')

        try:
            payload = json.dumps({
                'user': user.login,
                'workspace': project.name,
                'organization': project.organization_id.name if project.organization_id else '',
                'write': True,
                'wsid': project.id,
            })
            iv_b64, ct_b64 = settings._aes_encrypt(payload)

            resp = http_requests.post(
                f'{itoi_url}/pushFile',
                headers={'Authorization': f'Bearer {iv_b64}:{ct_b64}'},
                json={
                    'filename': filename,
                    'content': base64.b64encode(content.encode('utf-8')).decode('ascii'),
                },
                timeout=ITOI_PUSH_TIMEOUT_S,
            )
        except http_requests.exceptions.Timeout:
            _logger.warning('ITOI pushFile timed out after %ss', ITOI_PUSH_TIMEOUT_S)
            return self._itoi_failure(
                'timeout', f'ITOI did not answer within {ITOI_PUSH_TIMEOUT_S}s')
        except Exception as e:
            _logger.warning('ITOI pushFile unreachable: %s', e)
            return self._itoi_failure('unreachable', f'ITOI is unreachable: {e}')

        try:
            data = resp.json()
        except ValueError:
            data = {}

        if resp.status_code != 200:
            # Only trust ITOI's own JSON ``error`` field. A non-JSON body is
            # typically an Express HTML error page (e.g. the 404 for a missing
            # route on an outdated deployment); never forward that markup
            # downstream, the ``reason_code`` already conveys the cause.
            itoi_message = (data.get('error') or '').strip()[:200]
            # Prefer ITOI's own machine-readable code; fall back to a
            # classification by HTTP status.
            reason_code = data.get('code')
            if not reason_code:
                if resp.status_code == 404:
                    # Route missing usually means an outdated ITOI deployment.
                    reason_code = 'route_missing'
                elif resp.status_code in (401, 403):
                    reason_code = 'auth_failed'
                else:
                    reason_code = 'itoi_error'
            log = _logger.error if reason_code == 'route_missing' else _logger.warning
            log(
                'ITOI pushFile failed: status=%s code=%s message=%s',
                resp.status_code, reason_code, itoi_message,
            )
            return self._itoi_failure(reason_code, itoi_message, resp.status_code)

        if not data or 'pushed' not in data:
            _logger.warning('ITOI pushFile returned unexpected body: %s', resp.text[:200])
            return self._itoi_failure(
                'invalid_response', 'ITOI returned an unexpected response', resp.status_code)

        return {
            'pushed': bool(data.get('pushed')),
            'live': bool(data.get('live')),
            'file_name': data.get('file_name') or filename,
        }

    @http.route('/chatbot_api/v1/export-document', type='http', auth='none',
                methods=['POST'], csrf=False)
    def chatbot_export_document(self, **kw):
        """Create an ``itlingo.document`` from chatbot content and push it to ITOI.

        Authenticated with the same HMAC token Odoo issues to the chatbot
        iframe (see :func:`_build_workspace_token`), forwarded by the chatbot
        backend as ``Authorization: Bearer <token>``.
        """
        auth_header = request.httprequest.headers.get('Authorization', '')
        if not auth_header.startswith('Bearer '):
            return self._json_response({'error': 'Missing or invalid Authorization header'}, 401)

        secret = (
            os.getenv('ITLINGO_CHATBOT_SECRET')
            or request.env['ir.config_parameter'].sudo().get_param('itlingo_chatbot.secret', default='')
            or ''
        ).strip()
        if not secret:
            return self._json_response({'error': 'Chatbot secret not configured'}, 500)

        payload = _verify_workspace_token(auth_header[7:], secret)
        if not payload:
            return self._json_response({'error': 'Invalid or expired token'}, 401)

        try:
            body = json.loads(request.httprequest.get_data(as_text=True) or '{}')
        except ValueError:
            return self._json_response({'error': 'Invalid JSON body'}, 400)

        try:
            workspace_id = int(body.get('workspace_id'))
        except (TypeError, ValueError):
            return self._json_response({'error': 'Missing or invalid workspace_id'}, 400)
        if int(payload.get('workspace_id') or 0) != workspace_id:
            return self._json_response({'error': 'Workspace mismatch'}, 403)

        content = body.get('content')
        if not isinstance(content, str) or not content.strip():
            return self._json_response({'error': 'Missing content'}, 400)
        if len(content.encode('utf-8')) > EXPORT_MAX_CONTENT_BYTES:
            return self._json_response({'error': 'Content too large'}, 413)

        filename = os.path.basename((body.get('filename') or '').strip())
        # Keep filenames conservative: no path separators or control chars.
        if not filename or not re.fullmatch(r'[\w][\w .()\-]*', filename):
            return self._json_response({'error': 'Missing or invalid filename'}, 400)
        try:
            filename = _resolve_dsl_export_filename(
                request.env,
                filename,
                body.get('dsl'),
            )
        except ValueError as err:
            return self._json_response({'error': str(err)}, 400)

        project = request.env['itlingo.workspace'].sudo().browse(workspace_id)
        if not project.exists():
            return self._json_response({'error': 'Workspace not found'}, 404)

        user = request.env['res.users'].sudo().browse(int(payload.get('odoo_user_id') or 0))
        if not user.exists():
            return self._json_response({'error': 'Unknown user'}, 401)

        has_write = request.env['itlingo.project.role'].sudo().search_count([
            ('user_id', '=', user.id),
            ('project_id', '=', project.id),
            ('state', '=', 'accepted'),
            ('role', 'in', EXPORT_WRITE_ROLES),
        ])
        if not has_write:
            return self._json_response(
                {'error': 'You do not have write access to this workspace'}, 403)

        settings = request.env['itlingo.integration.settings'].sudo()._get_settings()
        base_name, ext = _split_filename(filename)
        # Files of a draft DSL are stored (and pushed to ITOI) with a
        # "<ext>-draft" extension so ITOI runs the draft grammar's LSP.
        resolved_ext = request.env['itlingo.dsl'].sudo()._resolve_importable_extension(ext)
        if resolved_ext and resolved_ext != ext:
            ext = resolved_ext
            filename = f'{base_name}.{ext}'
        if ext not in settings._get_importable_extensions():
            return self._json_response(
                {'error': f'File extension ".{ext}" is not allowed'}, 400)

        Document = request.env['itlingo.document'].sudo()
        existing = Document.search([('project_id', '=', project.id)]).mapped('file_name')
        final_name = _dedup_filename(filename, {n for n in existing if n})

        document = Document.create({
            'name': _split_filename(final_name)[0],
            'file_name': final_name,
            'document_file': base64.b64encode(content.encode('utf-8')),
            'project_id': project.id,
            'organization_id': project.organization_id.id if project.organization_id else False,
            'creator_id': user.id,
            'status': 'draft',
        })
        _logger.info(
            'Chatbot export: document id=%s file=%s workspace=%s user=%s',
            document.id, final_name, project.name, user.login,
        )

        itoi_result = self._push_file_to_itoi(settings, user, project, final_name, content)

        return self._json_response({
            'id': document.id,
            'file_name': final_name,
            'itoi': {
                'pushed': itoi_result.get('pushed', False),
                'live': itoi_result.get('live', False),
                'file_name': itoi_result.get('file_name'),
                'reason_code': itoi_result.get('reason_code'),
                'http_status': itoi_result.get('http_status'),
                'message': itoi_result.get('message'),
            },
        })
