from odoo import api, fields, models, _
from odoo.exceptions import UserError, ValidationError


class ItlingoSprint(models.Model):
    _name = 'itlingo.sprint'
    _description = 'ITLingo Sprint'
    _inherit = ['mail.thread']
    _order = 'project_id, sequence, start_date'

    name = fields.Char(required=True, tracking=True)
    project_id = fields.Many2one(
        'project.project', string='Workspace',
        required=True, ondelete='cascade', tracking=True,
    )
    start_date = fields.Date(tracking=True)
    end_date = fields.Date(tracking=True)
    actual_end = fields.Date(tracking=True)
    state = fields.Selection([
        ('not_started', 'Not Started'),
        ('executing', 'Executing'),
        ('canceled', 'Canceled'),
        ('closed', 'Closed'),
    ], default='not_started', required=True, tracking=True)
    goal = fields.Text()
    sequence = fields.Integer(default=10)

    sprint_user_ids = fields.One2many(
        'itlingo.sprint.user', 'sprint_id', string='Sprint Users',
    )
    backlog_item_ids = fields.One2many(
        'itlingo.backlog.item', 'sprint_id', string='Backlog Items',
    )
    task_ids = fields.One2many(
        'project.task', 'sprint_id', string='Tasks',
    )
    total_story_points = fields.Float(
        compute='_compute_story_points', string='Total Story Points',
        store=True,
    )
    completed_story_points = fields.Float(
        compute='_compute_story_points', string='Completed Story Points',
        store=True,
    )
    backlog_item_count = fields.Integer(
        compute='_compute_counts', string='Backlog Items',
    )
    task_count = fields.Integer(
        compute='_compute_counts', string='Tasks',
    )

    _sprint_date_check = models.Constraint(
        'CHECK(end_date IS NULL OR start_date IS NULL OR end_date >= start_date)',
        'Sprint end date must be after start date.',
    )

    @api.depends('backlog_item_ids.story_points', 'backlog_item_ids.status')
    def _compute_story_points(self):
        for sprint in self:
            items = sprint.backlog_item_ids
            sprint.total_story_points = sum(items.mapped('story_points'))
            sprint.completed_story_points = sum(
                items.filtered(lambda i: i.status == 'done').mapped('story_points')
            )

    @api.depends('backlog_item_ids', 'task_ids')
    def _compute_counts(self):
        for sprint in self:
            sprint.backlog_item_count = len(sprint.backlog_item_ids)
            sprint.task_count = len(sprint.task_ids)

    def action_start(self):
        for sprint in self:
            if sprint.state != 'not_started':
                raise UserError(_('Only sprints that have not started can be started.'))
            sprint.write({
                'state': 'executing',
                'start_date': sprint.start_date or fields.Date.context_today(self),
            })

    def action_close(self):
        for sprint in self:
            if sprint.state != 'executing':
                raise UserError(_('Only executing sprints can be closed.'))
            sprint.write({
                'state': 'closed',
                'actual_end': fields.Date.context_today(self),
            })

    def action_cancel(self):
        for sprint in self:
            if sprint.state in ('closed',):
                raise UserError(_('Closed sprints cannot be canceled.'))
            sprint.write({'state': 'canceled'})

    def action_reset(self):
        self.write({'state': 'not_started'})

    def action_open_plan_backlog_wizard(self):
        self.ensure_one()
        return {
            'type': 'ir.actions.act_window',
            'name': _('Add from product backlog'),
            'res_model': 'itlingo.sprint.plan.backlog',
            'view_mode': 'form',
            'target': 'new',
            'context': {'default_sprint_id': self.id},
        }
