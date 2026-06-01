from odoo import api, fields, models, _
from odoo.exceptions import ValidationError

from .itlingo_dsl_resource import RESOURCE_KINDS, VISIBILITY, RAG_STATUS

DSL_SPECIFIC_KINDS = {
    "spec_example",
    "spec_library",
    "spec_template",
    "doc_template",
    "prompt_template",
    "transformation_rule",
}


class ItlingoOrgResource(models.Model):
    _name = "itlingo.org.resource"
    _description = "ITLingo Organization Resource"
    _order = "organization_id, resource_kind, name"

    name = fields.Char(
        string="Name",
        required=True,
    )

    organization_id = fields.Many2one(
        "itlingo.organization",
        string="Organization",
        required=True,
        ondelete="cascade",
    )

    dsl_id = fields.Many2one(
        "itlingo.dsl",
        string="DSL",
        ondelete="restrict",
        help="Required for DSL-specific resource kinds. May be left empty for "
             "generic organization resources.",
    )

    resource_kind = fields.Selection(
        selection=RESOURCE_KINDS,
        string="Kind",
        required=True,
        default="other",
    )

    visibility = fields.Selection(
        selection=VISIBILITY,
        string="Visibility",
        required=True,
        default="private",
    )

    description = fields.Text(
        string="Description",
    )

    reference_url = fields.Char(
        string="Reference URL",
        help="External URL for this resource, when it is not stored as a file.",
    )

    attachment_id = fields.Many2one(
        "ir.attachment",
        string="File",
    )

    rag_status = fields.Selection(
        selection=RAG_STATUS,
        string="RAG Status",
        required=True,
        default="not_indexed",
    )

    active = fields.Boolean(
        string="Active",
        default=True,
    )

    @api.constrains("dsl_id", "resource_kind")
    def _check_dsl_required_for_kind(self):
        for resource in self:
            if resource.resource_kind in DSL_SPECIFIC_KINDS and not resource.dsl_id:
                raise ValidationError(_(
                    "A DSL is required for resources of kind '%s'.",
                    dict(RESOURCE_KINDS).get(resource.resource_kind),
                ))

    @api.constrains("dsl_id", "organization_id")
    def _check_dsl_allowed_by_organization(self):
        for resource in self:
            org = resource.organization_id
            if not resource.dsl_id or not org or not org.allowed_dsl_ids:
                continue
            if resource.dsl_id not in org.allowed_dsl_ids:
                raise ValidationError(_(
                    "The DSL '%(dsl)s' is not allowed by the organization "
                    "'%(org)s'.",
                    dsl=resource.dsl_id.display_name, org=org.name,
                ))
