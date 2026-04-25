from odoo import fields, models


class ResConfigSettings(models.TransientModel):
    _inherit = 'res.config.settings'

    itlingo_api_base_url = fields.Char(
        string='ITLingo API Base URL',
        config_parameter='itlingo_integration.api_base_url',
    )
    itlingo_token_expiry_hours = fields.Integer(
        string='Token Expiry (hours)',
        config_parameter='itlingo_integration.token_expiry_hours',
        default=24,
    )
