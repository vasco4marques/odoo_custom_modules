from odoo import fields, models


class ItlingoOrganization(models.Model):
    _inherit = "itlingo.organization"

    allowed_dsl_ids = fields.Many2many(
        "itlingo.dsl",
        "itlingo_organization_dsl_rel",
        "organization_id",
        "dsl_id",
        string="Allowed DSLs",
        domain="[('status', '=', 'active')]",
        help="DSLs this organization may use. If empty, the organization may "
             "use all active platform DSLs.",
    )
