from odoo import fields, models


class ItlingoDocumentLibrary(models.Model):
    _name = 'itlingo.document.library'
    _description = 'ITLingo Document Library Link'
    _order = 'library_id, document_id'

    document_id = fields.Many2one(
        'itlingo.document', string='Document',
        required=True, ondelete='cascade',
    )
    library_id = fields.Many2one(
        'itlingo.library', string='Library',
        required=True, ondelete='cascade',
    )

    _unique_doc_lib = models.Constraint(
        'UNIQUE(document_id, library_id)',
        'A document can only appear once per library.',
    )
