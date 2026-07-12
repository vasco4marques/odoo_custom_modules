from odoo import models


class ItlingoDsl(models.Model):
    _inherit = "itlingo.dsl"

    def action_open_grammar_editor(self):
        """Open the single portal Grammar Editor for this DSL.

        Backend users get a button instead of a second editor implementation;
        the portal route enforces the same authorization and draft-only rules.
        """
        self.ensure_one()
        return {
            "type": "ir.actions.act_url",
            "url": f"/dsl/{self.id}/grammar",
            "target": "self",
        }
