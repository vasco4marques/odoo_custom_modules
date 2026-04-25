from odoo import api, fields, models


class ProjectProject(models.Model):
    _inherit = 'project.project'

    document_ids = fields.One2many(
        'itlingo.document', 'project_id', string='Documents',
    )
    document_count = fields.Integer(
        compute='_compute_document_count', string='Documents',
    )

    @api.depends('document_ids')
    def _compute_document_count(self):
        for project in self:
            project.document_count = len(project.document_ids)
