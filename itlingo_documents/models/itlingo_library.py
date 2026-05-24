from odoo import fields, models


class ItlingoLibrary(models.Model):
    _name = 'itlingo.library'
    _description = 'ITLingo Library'
    _order = 'name'

    name = fields.Char(required=True)
    document_library_ids = fields.One2many(
        'itlingo.document.library', 'library_id', string='Documents',
    )
    document_count = fields.Integer(
        compute='_compute_document_count', string='Document Count',
    )

    def _compute_document_count(self):
        for lib in self:
            lib.document_count = len(lib.document_library_ids)
