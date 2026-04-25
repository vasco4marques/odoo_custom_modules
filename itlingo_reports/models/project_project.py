from odoo import models, _


class ProjectProject(models.Model):
    _inherit = 'project.project'

    def action_view_burndown_report(self):
        self.ensure_one()
        return {
            'type': 'ir.actions.act_window',
            'name': _('Burndown'),
            'res_model': 'itlingo.burndown.report',
            'view_mode': 'graph,pivot,list',
            'search_view_id': self.env.ref(
                'itlingo_reports.itlingo_burndown_report_view_search',
            ).id,
            'domain': [('project_id', '=', self.id)],
        }

    def action_view_velocity_report(self):
        self.ensure_one()
        return {
            'type': 'ir.actions.act_window',
            'name': _('Velocity'),
            'res_model': 'itlingo.velocity.report',
            'view_mode': 'graph,list',
            'search_view_id': self.env.ref(
                'itlingo_reports.itlingo_velocity_report_view_search',
            ).id,
            'domain': [('project_id', '=', self.id)],
        }
