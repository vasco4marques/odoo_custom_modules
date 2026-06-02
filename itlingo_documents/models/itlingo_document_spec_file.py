from odoo import fields, models


class ItlingoDocumentSpecFile(models.Model):
    _name = 'itlingo.document.spec.file'
    _description = 'ITLingo Document Specification Example File'
    _order = 'name'

    name = fields.Char(string='Filename', required=True)
    file_data = fields.Binary(string='File', attachment=True, required=True)
    document_id = fields.Many2one(
        'itlingo.document', string='Document',
        required=True, ondelete='cascade',
    )
