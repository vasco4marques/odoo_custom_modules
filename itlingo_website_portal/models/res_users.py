from odoo import fields, models


class ResUsers(models.Model):
    _inherit = 'res.users'

    terms_accepted_version = fields.Char(
        string='Accepted Terms Version', readonly=True, copy=False,
        help='Version of the Terms and Conditions accepted at registration.',
    )
    terms_accepted_at = fields.Datetime(
        string='Terms Accepted At', readonly=True, copy=False,
        help='UTC timestamp at which the Terms and Conditions were accepted.',
    )
    terms_accepted_ip = fields.Char(
        string='Terms Acceptance IP Address', readonly=True, copy=False,
    )
    terms_accepted_user_agent = fields.Char(
        string='Terms Acceptance User Agent', readonly=True, copy=False,
    )
