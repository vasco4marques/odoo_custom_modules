from odoo import fields, models


class ItlingoDocumentType(models.Model):
    _name = 'itlingo.document.type'
    _description = 'ITLingo Document Type'
    _order = 'name'

    type_code = fields.Selection([
        ('specification', 'Specification'),
        ('specification_template', 'Specification Template'),
        ('specification_library', 'Specification Library'),
        ('document_template', 'Document Template'),
        ('technical_document', 'Technical Document'),
        ('dataset', 'Dataset'),
        ('tutorial', 'Tutorial'),
        ('prompt_template', 'Prompt Template'),
        ('other', 'Other'),
    ], required=True, default='other')
    subtype = fields.Char()
    short_name = fields.Char()
    name = fields.Char(required=True)
    extension_file = fields.Char(
        string='File Extension',
        help='Expected file extension, e.g. .docx, .pdf',
    )
    template_id = fields.Many2one(
        'itlingo.document.template', string='Default Template',
    )
    active = fields.Boolean(default=True)
