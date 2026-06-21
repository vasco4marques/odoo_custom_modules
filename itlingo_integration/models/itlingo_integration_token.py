import json
from datetime import timedelta

from odoo import api, fields, models, _
from odoo.exceptions import UserError


class ItlingoIntegrationToken(models.Model):
    _name = 'itlingo.integration.token'
    _description = 'ITLingo ITOI Token'
    _order = 'create_date desc'

    user_id = fields.Many2one(
        'res.users', string='User', required=True,
        default=lambda self: self.env.user, ondelete='cascade',
    )
    project_id = fields.Many2one(
        'itlingo.workspace', string='Workspace',
    )
    token_iv = fields.Char(string='Token IV (base64url)', readonly=True)
    token_ct = fields.Text(string='Token Ciphertext (base64url)', readonly=True)
    expires_at = fields.Datetime(string='Expires At', readonly=True)
    is_active = fields.Boolean(default=True)
    description = fields.Char()

    def action_generate_token(self):
        self.ensure_one()
        settings = self.env['itlingo.integration.settings']._get_settings()

        expiry_hours = settings.token_expiry_hours or 24
        expires_at = fields.Datetime.now() + timedelta(hours=expiry_hours)

        payload = json.dumps({
            'user_id': self.user_id.id,
            'user_login': self.user_id.login,
            'project_id': self.project_id.id if self.project_id else None,
            'expires_at': fields.Datetime.to_string(expires_at),
        })

        iv_b64, ct_b64 = settings._aes_encrypt(payload)
        self.write({
            'token_iv': iv_b64,
            'token_ct': ct_b64,
            'expires_at': expires_at,
            'is_active': True,
        })
        return True

    def action_revoke(self):
        self.write({'is_active': False})

    @api.model
    def _validate_token(self, iv_b64, ct_b64):
        """Decrypt and validate a token. Returns the payload dict or raises."""
        settings = self.env['itlingo.integration.settings']._get_settings()

        try:
            decrypted = settings._aes_decrypt(iv_b64, ct_b64)
        except Exception:
            raise UserError(_("Invalid or expired token."))

        payload = json.loads(decrypted)

        token_rec = self.search([
            ('token_iv', '=', iv_b64),
            ('token_ct', '=', ct_b64),
            ('is_active', '=', True),
        ], limit=1)
        if not token_rec:
            raise UserError(_("Token has been revoked."))

        if token_rec.expires_at and token_rec.expires_at < fields.Datetime.now():
            token_rec.is_active = False
            raise UserError(_("Token has expired."))

        return payload
