from odoo import api, fields, models


class ProjectTask(models.Model):
    _inherit = 'project.task'

    backlog_item_id = fields.Many2one(
        'itlingo.backlog.item', string='Backlog Item',
        domain="[('project_id', '=', project_id)]",
    )
    sprint_id = fields.Many2one(
        'itlingo.sprint', string='Sprint',
        domain="[('project_id', '=', project_id)]",
        tracking=True,
    )
    task_type = fields.Selection([
        ('management', 'Management'),
        ('technical', 'Technical'),
        ('general', 'General'),
    ], default='general', string='Task Type')
    planned_effort = fields.Float(
        string='Planned Effort (h)',
        help='Planned effort in hours for this task.',
    )
    day_effort_ids = fields.One2many(
        'itlingo.task.day.effort', 'task_id', string='Day Efforts',
        help='Log effort by day and assignee. Rows can be added manually; new tasks '
             'get a starter row per assignee for today.',
    )

    def _itlingo_create_default_day_efforts(self):
        Effort = self.env['itlingo.task.day.effort']
        today = fields.Date.context_today(self)
        for task in self:
            if not task.project_id or not task.user_ids:
                continue
            for user in task.user_ids:
                Effort.create({
                    'task_id': task.id,
                    'user_id': user.id,
                    'day': today,
                    'effort_type': 'actual',
                    'hours': 0.0,
                })

    @api.model_create_multi
    def create(self, vals_list):
        tasks = super().create(vals_list)
        tasks._itlingo_create_default_day_efforts()
        return tasks
