from odoo import api, fields, models


class ItlingoOrganization(models.Model):
    _inherit = 'itlingo.organization'

    document_ids = fields.One2many(
        'itlingo.document', 'organization_id', string='Documents',
    )
    document_count = fields.Integer(
        compute='_compute_document_count', string='Documents',
    )

    @api.depends('document_ids')
    def _compute_document_count(self):
        for org in self:
            org.document_count = len(org.document_ids)
