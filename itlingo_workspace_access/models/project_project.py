from odoo import api, fields, models, _


class ProjectProject(models.Model):
    _inherit = 'project.project'

    organization_id = fields.Many2one(
        'itlingo.organization', string='Organization',
        tracking=True,
        domain="[('state', '=', 'active')]",
    )
    creator_id = fields.Many2one(
        'res.users', string='Creator',
        default=lambda self: self.env.user,
        readonly=True,
    )
    methodology = fields.Selection([
        ('scrum', 'Scrum'),
        ('kanban', 'Kanban'),
    ], string='Methodology', tracking=True)
    business_status = fields.Selection([
        ('not_started', 'Not Started'),
        ('executing', 'Executing'),
        ('canceled', 'Canceled'),
        ('concluded', 'Concluded'),
    ], string='Business Status', default='not_started', tracking=True)
    planned_start = fields.Date(string='Planned Start')
    planned_end = fields.Date(string='Planned End')
    actual_start = fields.Date(string='Actual Start')
    actual_end = fields.Date(string='Actual End')
    planned_cost = fields.Float(string='Planned Cost', digits=(12, 2))
    current_cost = fields.Float(string='Current Cost', digits=(12, 2))
    is_public_workspace = fields.Boolean(
        string='Public workspace',
        default=False,
        tracking=True,
        help='If enabled, the workspace is listed on the public workspace page and all users can see its documents, and specifications.',
    )

    workspace_role_ids = fields.One2many(
        'itlingo.project.role', 'project_id', string='Workspace Roles',
    )
    workspace_member_count = fields.Integer(
        compute='_compute_workspace_member_count', string='Workspace Members',
    )

    @api.depends('workspace_role_ids', 'workspace_role_ids.state')
    def _compute_workspace_member_count(self):
        for project in self:
            project.workspace_member_count = len(
                project.workspace_role_ids.filtered(lambda r: r.state == 'accepted')
            )

    def action_invite_workspace_member(self):
        return {
            'type': 'ir.actions.act_window',
            'name': _('Invite Workspace Member'),
            'res_model': 'itlingo.project.role',
            'view_mode': 'form',
            'target': 'new',
            'context': {
                'default_project_id': self.id,
                'default_state': 'pending',
            },
        }

    def action_start(self):
        self.write({
            'business_status': 'executing',
            'actual_start': fields.Date.context_today(self),
        })

    def action_conclude(self):
        self.write({
            'business_status': 'concluded',
            'actual_end': fields.Date.context_today(self),
        })

    def action_cancel(self):
        self.write({'business_status': 'canceled'})

    def action_reset(self):
        self.write({'business_status': 'not_started'})
