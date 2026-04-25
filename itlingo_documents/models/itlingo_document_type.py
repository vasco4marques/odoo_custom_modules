from odoo import fields, models


class ItlingoDocumentType(models.Model):
    _name = 'itlingo.document.type'
    _description = 'ITLingo Document Type'
    _order = 'name'

    type_code = fields.Selection([
        ('rsl', 'RSL'),
        ('psl', 'PSL'),
        ('tsl', 'TSL'),
        ('report', 'Report'),
        ('specification', 'Specification'),
        ('manual', 'Manual'),
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
