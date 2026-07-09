from odoo import api, fields, models

from odoo.addons.itlingo_templating.services.dsl_parser import dsl_key_for_record


class ItlingoDsl(models.Model):
    _inherit = "itlingo.dsl"

    templating_builtin_generation = fields.Boolean(
        string="Built-in Templating Generation",
        compute="_compute_templating_builtin_generation",
    )

    @api.depends()
    def _compute_templating_builtin_generation(self):
        for dsl in self:
            dsl.templating_builtin_generation = bool(
                dsl_key_for_record(dsl.env, dsl)
            )
