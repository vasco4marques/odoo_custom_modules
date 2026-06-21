from odoo import api, fields, models


class ItlingoWorkspace(models.Model):
    _inherit = 'itlingo.workspace'

    document_ids = fields.One2many(
        'itlingo.document', 'project_id', string='Documents',
    )
    document_count = fields.Integer(
        compute='_compute_document_count', string='Document Count',
    )

    @api.depends('document_ids')
    def _compute_document_count(self):
        for workspace in self:
            workspace.document_count = len(workspace.document_ids)
