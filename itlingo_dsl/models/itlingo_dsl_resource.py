from odoo import fields, models

RESOURCE_KINDS = [
    ("spec_example", "Example Specification"),
    ("spec_library", "Specification Library"),
    ("spec_template", "Specification Template"),
    ("paper", "Scientific Paper"),
    ("technical_report", "Technical Report"),
    ("doc_template", "Document Template"),
    ("tutorial", "Tutorial"),
    ("prompt_template", "Prompt Template"),
    ("transformation_rule", "Transformation Rule"),
    ("other", "Other"),
]

VISIBILITY = [
    ("private", "Private"),
    ("protected", "Protected"),
    ("public", "Public"),
]

RAG_STATUS = [
    ("not_indexed", "Not Indexed"),
    ("in_processing", "In Processing"),
    ("indexed", "Indexed"),
    ("failed", "Failed"),
]


class ItlingoDslResource(models.Model):
    _name = "itlingo.dsl.resource"
    _description = "ITLingo DSL Resource"
    _order = "dsl_id, resource_kind, name"

    name = fields.Char(
        string="Name",
        required=True,
    )

    dsl_id = fields.Many2one(
        "itlingo.dsl",
        string="DSL",
        required=True,
        ondelete="restrict",
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
