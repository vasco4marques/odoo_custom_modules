from odoo import http
from odoo.http import request
import os
import hmac
import hashlib
import base64
import json
import time


def _b64url_encode(data: bytes) -> str:
    return base64.urlsafe_b64encode(data).rstrip(b"=").decode("ascii")


def _sign_payload(secret: str, payload: dict) -> str:
    header = {"alg": "HS256", "typ": "JWT"}
    header_b = _b64url_encode(json.dumps(header, separators=(",", ":")).encode("utf-8"))
    payload_b = _b64url_encode(json.dumps(payload, separators=(",", ":")).encode("utf-8"))
    signing_input = (header_b + "." + payload_b).encode("ascii")
    sig = hmac.new(secret.encode("utf-8"), signing_input, hashlib.sha256).digest()
    sig_b = _b64url_encode(sig.encode("latin1") if isinstance(sig, str) else sig)
    return header_b + "." + payload_b + "." + sig_b


def _build_workspace_token(project_id: int, user, secret: str) -> str:
    now = int(time.time())
    db_name = request.env.cr.dbname
    # include workspace_key for a stable external identifier
    project = request.env['project.project'].sudo().browse(project_id)
    workspace_key = project.workspace_key if project and project.exists() else ''
    scope = f"odoo:{db_name}:workspace:{project_id}:user:{user.id}"
    payload = {
        "aud": "itlingo-chatbot",
        "sub": user.id,
        "odoo_user_id": user.id,
        "odoo_user_login": user.login,
        "odoo_user_name": user.name,
        "odoo_partner_id": user.partner_id.id if user.partner_id else None,
        "odoo_db": db_name,
        "workspace_id": project_id,
        "workspace_key": workspace_key,
        "workspace_name": request.env["project.project"].sudo().browse(project_id).name or "",
        "scope": scope,
        "iat": now,
        "exp": now + 3600,
    }
    return _sign_payload(secret, payload)


class ChatController(http.Controller):
    def _workspace_shell_values(self, project_id: int, chat_url: str, token: str) -> dict:
        project = request.env["project.project"].sudo().browse(project_id)
        return {
            "project": project,
            "project_id": project_id,
            "workspace_key": project.workspace_key,
            "workspace_session_id": str(project.workspace_key),
            "ws_hub_prefix": f"/my/workspaces/{project_id}",
            "workspace_hub_page": "chat",
            "workspace_hub_public": False,
            "chat_url": chat_url,
            "token": token,
        }

    @http.route(['/my/workspaces/<int:project_id>/chat'], type='http', auth='user', website=True)
    def workspace_chat(self, project_id, **kw):
        # read configuration
        params = request.env['ir.config_parameter'].sudo()
        chat_url = (
            params.get_param('itlingo_chatbot.chatbot_url')
            or params.get_param('itlingo_chatbot.url')
            or 'http://127.0.0.1:8000/'
        )
        secret = (os.getenv('ITLINGO_CHATBOT_SECRET') or params.get_param('itlingo_chatbot.secret', default=None) or '').strip()

        user = request.env.user
        token = ''
        if secret:
            try:
                token = _build_workspace_token(project_id, user, secret)
            except Exception:
                token = ''

        return request.render('itlingo_chatbot_integration.chat_page', self._workspace_shell_values(project_id, chat_url, token))
