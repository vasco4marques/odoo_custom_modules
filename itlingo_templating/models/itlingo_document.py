from odoo import api, fields, models, _
from odoo.exceptions import ValidationError

from odoo.addons.itlingo_templating.services.dsl_parser import dsl_key_for_record
from odoo.addons.itlingo_templating.services.rendering import (
    SUPPORTED_TEMPLATE_EXTENSIONS,
)

TEMPLATE_TYPE_CODE = "document_template"


class ItlingoDocument(models.Model):
    _inherit = "itlingo.document"

    is_template = fields.Boolean(
        string="Is Template",
        compute="_compute_is_template",
        store=True,
        help="Derived from the document type: a document is a template when its "
             "type is 'Document Template'. Templates are excluded from the "
             "knowledge pool and cannot be sent to ITOI.",
    )
    output_filename_pattern = fields.Char(
        string="Output Filename Pattern",
        help="Jinja2 pattern for the generated filename. Available variables: "
             "template_name (this template's name) and spec_name (uploaded "
             "specification name). DSL-specific template fields may also be "
             "used. Example: {{ spec_name }}_{{ template_name }}.docx. "
             "Defaults to the template name.",
    )
    template_generation_supported = fields.Boolean(
        string="Template Generation Supported",
        compute="_compute_template_generation_supported",
    )
    template_format_supported = fields.Boolean(
        string="Template Format Supported",
        compute="_compute_template_format_supported",
    )

    @api.depends("document_type_id", "document_type_id.type_code")
    def _compute_is_template(self):
        for doc in self:
            doc.is_template = doc.document_type_id.type_code == TEMPLATE_TYPE_CODE

    @api.depends("dsl_id")
    def _compute_template_generation_supported(self):
        for doc in self:
            doc.template_generation_supported = bool(
                dsl_key_for_record(doc.env, doc.dsl_id)
            )

    @api.depends("file_name")
    def _compute_template_format_supported(self):
        for doc in self:
            doc.template_format_supported = (doc.file_name or "").lower().endswith(
                SUPPORTED_TEMPLATE_EXTENSIONS
            )

    @api.constrains("is_template", "dsl_knowledge")
    def _check_template_not_knowledge(self):
        for doc in self:
            if doc.is_template and doc.dsl_knowledge:
                raise ValidationError(_(
                    "A template cannot be part of the knowledge pool "
                    "(document: %s).", doc.name,
                ))

    def _vals_make_template(self, vals):
        """True when *vals* set a document type whose code is 'document_template'."""
        dt_id = vals.get("document_type_id")
        if not dt_id:
            return False
        dt = self.env["itlingo.document.type"].browse(dt_id)
        return dt.type_code == TEMPLATE_TYPE_CODE

    @api.model_create_multi
    def create(self, vals_list):
        for vals in vals_list:
            if self._vals_make_template(vals):
                vals["dsl_knowledge"] = False
        return super().create(vals_list)

    def write(self, vals):
        if "document_type_id" in vals and self._vals_make_template(vals):
            vals = dict(vals, dsl_knowledge=False)
        return super().write(vals)
