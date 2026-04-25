from odoo import fields, models


class ItlingoTaskDayEffort(models.Model):
    _name = 'itlingo.task.day.effort'
    _description = 'ITLingo Task Day Effort'
    _order = 'day, task_id'

    task_id = fields.Many2one(
        'project.task', string='Task',
        required=True, ondelete='cascade',
    )
    user_id = fields.Many2one('res.users', string='User')
    allocation_percentage = fields.Float(
        string='Allocation (%)', default=100.0,
    )
    day = fields.Date(required=True)
    effort_type = fields.Selection([
        ('actual', 'Actual'),
        ('remaining', 'Remaining'),
    ], required=True, default='actual')
    hours = fields.Float(string='Hours')
