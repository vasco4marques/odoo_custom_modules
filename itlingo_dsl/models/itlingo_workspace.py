from odoo import api, fields, models, _
from odoo.exceptions import ValidationError


class ItlingoWorkspace(models.Model):
    _inherit = "itlingo.workspace"

    allowed_dsl_ids = fields.Many2many(
        "itlingo.dsl",
        "itlingo_project_dsl_rel",
        "project_id",
        "dsl_id",
        string="Available DSLs",
        domain="[('status', '=', 'active')]",
        help="DSLs available in this workspace. If empty, the workspace "
             "inherits the DSLs allowed by its organization.",
    )

    default_dsl_id = fields.Many2one(
        "itlingo.dsl",
        string="Default DSL",
        domain="[('status', '=', 'active')]",
        help="Default DSL proposed for new specifications in this workspace.",
    )

    @api.constrains("allowed_dsl_ids", "organization_id")
    def _check_allowed_dsl_within_organization(self):
        for workspace in self:
            org = workspace.organization_id
            if not org or not org.allowed_dsl_ids or not workspace.allowed_dsl_ids:
                continue
            forbidden = workspace.allowed_dsl_ids - org.allowed_dsl_ids
            if forbidden:
                names = ", ".join(forbidden.mapped("acronym"))
                raise ValidationError(_(
                    "The following DSLs are not allowed by the organization "
                    "'%(org)s': %(dsls)s",
                    org=org.name, dsls=names,
                ))

    @api.constrains("default_dsl_id", "allowed_dsl_ids", "organization_id")
    def _check_default_dsl(self):
        for workspace in self:
            dsl = workspace.default_dsl_id
            if not dsl:
                continue
            if dsl.status == "archived":
                raise ValidationError(_(
                    "An archived DSL (%s) cannot be set as the default DSL.",
                    dsl.display_name,
                ))
            available = workspace._itlingo_available_dsls()
            if available and dsl not in available:
                raise ValidationError(_(
                    "The default DSL (%s) must be one of the workspace's "
                    "available DSLs.",
                    dsl.display_name,
                ))

    def _itlingo_available_dsls(self):
        """Resolve the DSLs available in this workspace.

        Active platform DSLs, filtered by the organization's allowed DSLs (if
        any), then by the workspace's allowed DSLs (if any).
        """
        self.ensure_one()
        dsl_model = self.env["itlingo.dsl"]
        available = dsl_model.search([("status", "=", "active")])
        org = self.organization_id
        if org and org.allowed_dsl_ids:
            available &= org.allowed_dsl_ids
        if self.allowed_dsl_ids:
            available &= self.allowed_dsl_ids
        return available
