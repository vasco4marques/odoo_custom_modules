from odoo import api, fields, models, _


class ItlingoBacklogItem(models.Model):
    _name = 'itlingo.backlog.item'
    _description = 'ITLingo Backlog Item'
    _inherit = ['mail.thread']
    _order = 'project_id, sequence, priority desc, identifier'

    identifier = fields.Char(
        string='ID', readonly=True, copy=False, default='New',
    )
    name = fields.Char(required=True, tracking=True)
    description = fields.Html()
    item_type = fields.Selection([
        ('user_story', 'User Story'),
        ('feature', 'Feature'),
        ('bug', 'Bug'),
        ('epic', 'Epic'),
        ('other', 'Other'),
    ], default='user_story', required=True, tracking=True)
    story_points = fields.Float(tracking=True)
    actual_effort = fields.Float(string='Actual Effort (h)')
    priority = fields.Selection([
        ('vlo', 'Very Low'),
        ('lo', 'Low'),
        ('med', 'Medium'),
        ('hi', 'High'),
        ('vhi', 'Very High'),
    ], default='med', required=True, tracking=True)
    status = fields.Selection([
        ('new', 'New'),
        ('ready', 'Ready'),
        ('in_progress', 'In Progress'),
        ('done', 'Done'),
        ('canceled', 'Canceled'),
    ], default='new', required=True, tracking=True)
    sequence = fields.Integer(default=10)

    project_id = fields.Many2one(
        'project.project', string='Workspace',
        required=True, ondelete='cascade', tracking=True,
    )
    sprint_id = fields.Many2one(
        'itlingo.sprint', string='Sprint',
        domain="[('project_id', '=', project_id)]",
        tracking=True,
    )
    initial_sprint_id = fields.Many2one(
        'itlingo.sprint', string='Initial Sprint',
        domain="[('project_id', '=', project_id)]",
    )
    final_sprint_id = fields.Many2one(
        'itlingo.sprint', string='Final Sprint',
        domain="[('project_id', '=', project_id)]",
    )
    task_ids = fields.One2many(
        'project.task', 'backlog_item_id', string='Tasks',
    )
    task_count = fields.Integer(
        compute='_compute_task_count', string='Tasks',
    )
    document_item_id = fields.Char(string='Document Item ID')
    combined_with_story_points = fields.Boolean(default=False)

    @api.depends('task_ids')
    def _compute_task_count(self):
        for item in self:
            item.task_count = len(item.task_ids)

    @api.model_create_multi
    def create(self, vals_list):
        for vals in vals_list:
            if vals.get('identifier', 'New') == 'New':
                project_id = vals.get('project_id')
                if project_id:
                    project = self.env['project.project'].browse(project_id)
                    existing = self.search_count([('project_id', '=', project_id)])
                    vals['identifier'] = f'{project.name[:3].upper()}-{existing + 1:04d}'
                else:
                    vals['identifier'] = self.env['ir.sequence'].next_by_code(
                        'itlingo.backlog.item') or 'New'
        return super().create(vals_list)

    def action_view_tasks(self):
        self.ensure_one()
        return {
            'type': 'ir.actions.act_window',
            'name': _('Tasks'),
            'res_model': 'project.task',
            'view_mode': 'list,form,kanban',
            'domain': [('backlog_item_id', '=', self.id)],
            'context': {
                'default_backlog_item_id': self.id,
                'default_project_id': self.project_id.id,
                'default_sprint_id': self.sprint_id.id,
            },
        }
