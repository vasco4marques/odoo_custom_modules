from odoo import models, _


class ProjectProject(models.Model):
    _inherit = 'project.project'

    def action_view_itlingo_sprints(self):
        self.ensure_one()
        return {
            'type': 'ir.actions.act_window',
            'name': _('Sprints'),
            'res_model': 'itlingo.sprint',
            'view_mode': 'list,kanban,form',
            'search_view_id': self.env.ref('itlingo_agile.itlingo_sprint_view_search').id,
            'domain': [('project_id', '=', self.id)],
            'context': {'default_project_id': self.id},
        }

    def action_view_product_backlog(self):
        self.ensure_one()
        return {
            'type': 'ir.actions.act_window',
            'name': _('Product backlog'),
            'res_model': 'itlingo.backlog.item',
            'view_mode': 'list,kanban,form',
            'search_view_id': self.env.ref('itlingo_agile.itlingo_backlog_item_view_search').id,
            'domain': [('project_id', '=', self.id)],
            'context': {'default_project_id': self.id},
        }
