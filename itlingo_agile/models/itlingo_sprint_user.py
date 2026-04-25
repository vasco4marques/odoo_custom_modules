from odoo import api, fields, models


class ItlingoSprintUser(models.Model):
    _name = 'itlingo.sprint.user'
    _description = 'ITLingo Sprint User'
    _order = 'sprint_id, user_id'

    sprint_id = fields.Many2one(
        'itlingo.sprint', string='Sprint',
        required=True, ondelete='cascade',
    )
    user_id = fields.Many2one(
        'res.users', string='User', required=True,
    )
    dev_utilization = fields.Float(
        string='Dev Utilization (%)', default=100.0,
        help='Percentage of time dedicated to development tasks.',
    )
    daily_work_hours = fields.Float(
        string='Daily Work Hours', default=8.0,
    )
    dev_total_hours = fields.Float(
        compute='_compute_dev_hours', string='Dev Total Hours',
        store=True,
    )
    dev_daily_hours = fields.Float(
        compute='_compute_dev_hours', string='Dev Daily Hours',
        store=True,
    )

    _unique_sprint_user = models.Constraint(
        'UNIQUE(sprint_id, user_id)',
        'A user can only appear once per sprint.',
    )

    @api.depends('dev_utilization', 'daily_work_hours',
                 'sprint_id.start_date', 'sprint_id.end_date')
    def _compute_dev_hours(self):
        for rec in self:
            rec.dev_daily_hours = rec.daily_work_hours * (rec.dev_utilization / 100.0)
            sprint = rec.sprint_id
            if sprint.start_date and sprint.end_date:
                days = (sprint.end_date - sprint.start_date).days + 1
                work_days = 0
                current = sprint.start_date
                from datetime import timedelta
                for i in range(days):
                    day = current + timedelta(days=i)
                    if day.weekday() < 5:
                        work_days += 1
                rec.dev_total_hours = rec.dev_daily_hours * work_days
            else:
                rec.dev_total_hours = 0.0
