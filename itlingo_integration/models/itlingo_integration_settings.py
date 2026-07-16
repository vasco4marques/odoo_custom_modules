import base64
import json
import os

from odoo import api, fields, models
from odoo.exceptions import UserError

try:
    from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
    from cryptography.hazmat.primitives.padding import PKCS7
    _HAS_CRYPTO = True
except ImportError:
    _HAS_CRYPTO = False


class ItlingoIntegrationSettings(models.Model):
    _name = 'itlingo.integration.settings'
    _description = 'ITLingo Integration Settings'
    _rec_name = 'name'

    name = fields.Char(
        default='ITLingo ITOI Integration', readonly=True,
    )
    encryption_key = fields.Char(
        string='Shared AES Key',
        help='32-character shared secret (AES-256-CBC). '
             'Must match the COM_KEY configured in ITOI.',
    )
    itoi_url = fields.Char(
        string='ITOI URL',
        default='http://localhost:3000/',
        help='Base URL of the ITOI instance (include trailing slash).',
    )
    api_base_url = fields.Char(
        string='API Base URL',
        default='',
        help='Base URL for external API callbacks.',
    )
    token_expiry_hours = fields.Integer(
        string='Token Expiry (hours)',
        default=24,
    )
    importable_extensions = fields.Char(
        string='Extra Importable File Extensions',
        default='txt,md,json,xml,yaml,yml,csv,properties',
        help='Comma-separated list of additional file extensions (without the '
             'dot) that ITOI users are allowed to import from cloud documents. '
             'The extensions of every registered DSL are always importable and '
             'do not need to be listed here. Only text-editable formats should '
             'be listed.',
    )
    active = fields.Boolean(default=True)

    @api.model_create_multi
    def create(self, vals_list):
        if self.sudo().search_count([]) >= 1:
            raise UserError(
                "Only one Integration Settings record is allowed. "
                "Please edit the existing one."
            )
        return super().create(vals_list)

    @api.model
    def _get_settings(self):
        """Return the singleton settings record, creating one if needed."""
        settings = self.sudo().search([], limit=1, order='id asc')
        if not settings:
            settings = self.sudo().create({})
        return settings

    @api.model
    def action_open_settings(self):
        """Open the singleton settings record in form view."""
        record = self._get_settings()
        return {
            'type': 'ir.actions.act_window',
            'res_model': self._name,
            'res_id': record.id,
            'view_mode': 'form',
            'target': 'current',
        }

    def _get_importable_extensions(self):
        """Return the set of allowed import extensions (lowercase, no dot).

        Every registered DSL's extensions are importable by default: a DSL
        exists to be authored and exchanged, so requiring an administrator to
        whitelist each new one would make it unusable until they did. The
        configured list only adds non-DSL formats on top.
        """
        self.ensure_one()
        raw = self.importable_extensions or ''
        extra = {
            ext.strip().lower().lstrip('.')
            for ext in raw.split(',')
            if ext.strip()
        }
        return extra | self.env['itlingo.dsl']._all_extensions()

    def _ensure_encryption_key(self):
        self.ensure_one()
        if not self.encryption_key:
            self.encryption_key = os.urandom(16).hex()
        key = self.encryption_key
        if len(key) != 32:
            raise UserError(
                "The AES shared key must be exactly 32 characters long "
                "(to match ITOI's COM_KEY)."
            )
        return key

    def _aes_encrypt(self, plaintext):
        """Encrypt *plaintext* with AES-256-CBC + PKCS7.

        Returns (iv_b64url, ciphertext_b64url) — the same pair ITOI
        expects as ``?iv=…&t=…`` query parameters.
        """
        self.ensure_one()
        if not _HAS_CRYPTO:
            raise UserError("The 'cryptography' Python package is required.")

        key = self._ensure_encryption_key().encode('utf-8')
        iv = os.urandom(16)

        padder = PKCS7(128).padder()
        padded = padder.update(plaintext.encode('utf-8')) + padder.finalize()

        cipher = Cipher(algorithms.AES(key), modes.CBC(iv))
        encryptor = cipher.encryptor()
        ciphertext = encryptor.update(padded) + encryptor.finalize()

        iv_b64 = base64.urlsafe_b64encode(iv).decode()
        ct_b64 = base64.urlsafe_b64encode(ciphertext).decode()
        return iv_b64, ct_b64

    def _aes_decrypt(self, iv_b64, ciphertext_b64):
        """Decrypt a payload previously encrypted with :meth:`_aes_encrypt`."""
        self.ensure_one()
        if not _HAS_CRYPTO:
            raise UserError("The 'cryptography' Python package is required.")

        key = self._ensure_encryption_key().encode('utf-8')
        iv = base64.urlsafe_b64decode(iv_b64)
        ciphertext = base64.urlsafe_b64decode(ciphertext_b64)

        cipher = Cipher(algorithms.AES(key), modes.CBC(iv))
        decryptor = cipher.decryptor()
        padded = decryptor.update(ciphertext) + decryptor.finalize()

        unpadder = PKCS7(128).unpadder()
        plaintext = unpadder.update(padded) + unpadder.finalize()
        return plaintext.decode('utf-8')
