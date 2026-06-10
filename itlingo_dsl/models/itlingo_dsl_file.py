from odoo import api, fields, models

DSL_FILE_TYPES = [
    ("grammar", "Grammar"),
    ("validation", "Validation"),
    ("examples", "Examples"),
    ("specification", "Specification"),
]


class ItlingoDslFile(models.Model):
    _name = "itlingo.dsl.file"
    _description = "ITLingo DSL Definition File"
    _order = "dsl_id, file_type, sequence, file_name"

    dsl_id = fields.Many2one(
        "itlingo.dsl",
        string="DSL",
        required=True,
        ondelete="cascade",
    )

    file_type = fields.Selection(
        selection=DSL_FILE_TYPES,
        string="File Type",
        required=True,
        default="specification",
        help="Maps directly to the chatbot knowledge-base file types. The "
             "grammar (.langium) defines the language; validation, examples "
             "and specifications are optional supporting material.",
    )

    file = fields.Binary(
        string="File",
        attachment=True,
        required=True,
    )

    file_name = fields.Char(
        string="Filename",
        required=True,
    )

    is_enabled = fields.Boolean(
        string="Enabled",
        default=True,
        help="Disabled files are not pushed to the chatbot knowledge base.",
    )

    sequence = fields.Integer(
        string="Sequence",
        default=10,
        help="Order in which validation/examples files of the same type are "
             "concatenated into the knowledge base.",
    )

    @api.model_create_multi
    def create(self, vals_list):
        records = super().create(vals_list)
        records.dsl_id._sync_kb_files()
        return records

    def write(self, vals):
        dsls = self.dsl_id
        result = super().write(vals)
        (dsls | self.dsl_id)._sync_kb_files()
        return result

    def unlink(self):
        dsls = self.dsl_id
        result = super().unlink()
        dsls._sync_kb_files()
        return result
