from odoo import api, fields, models, _
from odoo.exceptions import UserError


class ItlingoOrganizationRole(models.Model):
    _name = 'itlingo.organization.role'
    _description = 'ITLingo Organization Role'
    _order = 'organization_id, user_id'

    user_id = fields.Many2one(
        'res.users', string='User', required=True, ondelete='cascade',
    )
    organization_id = fields.Many2one(
        'itlingo.organization', string='Organization',
        required=True, ondelete='cascade',
    )
    role = fields.Selection([
        ('org_manager', 'Org Manager'),
        ('org_member', 'Org Member'),
        ('doc_manager', 'Document Manager'),
    ], required=True, default='org_member')
    state = fields.Selection([
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('rejected', 'Rejected'),
    ], default='pending', required=True)
    invite_date = fields.Datetime(
        default=fields.Datetime.now, readonly=True,
    )
    response_date = fields.Datetime(readonly=True)

    _unique_user_org = models.Constraint(
        'UNIQUE(user_id, organization_id)',
        'A user can only have one role per organization.',
    )

    def _cascade_ws_manager(self, user, organization):
        """Give the user ws_manager / accepted on every project in the org."""
        if 'itlingo.project.role' not in self.env:
            return
        ProjectRole = self.env['itlingo.project.role'].sudo()
        projects = self.env['project.project'].sudo().search([
            ('organization_id', '=', organization.id),
        ])
        for project in projects:
            existing = ProjectRole.search([
                ('user_id', '=', user.id),
                ('project_id', '=', project.id),
            ], limit=1)
            if existing:
                if existing.role != 'ws_manager' or existing.state != 'accepted':
                    existing.write({'role': 'ws_manager', 'state': 'accepted'})
            else:
                ProjectRole.create({
                    'user_id': user.id,
                    'project_id': project.id,
                    'role': 'ws_manager',
                    'state': 'accepted',
                })

    @api.model_create_multi
    def create(self, vals_list):
        records = super().create(vals_list)
        todo_xmlid = 'mail.mail_activity_data_todo'
        for rec in records:
            if rec.role == 'org_manager' and rec.state == 'accepted':
                rec._cascade_ws_manager(rec.user_id, rec.organization_id)
            if rec.state != 'pending':
                continue
            role_label = dict(rec._fields['role'].selection).get(rec.role, rec.role)
            rec.organization_id.activity_schedule(
                todo_xmlid,
                user_id=rec.user_id.id,
                summary=_('Invitation: %s', rec.organization_id.name),
                note=_(
                    'You were invited to join <b>%s</b> as <b>%s</b>. '
                    'Open your portal at <a href="/my/invitations">My Invitations</a> '
                    'to accept or decline.',
                    rec.organization_id.name,
                    role_label,
                ),
            )
        return records

    def write(self, vals):
        res = super().write(vals)
        if vals.get('role') == 'org_manager' or vals.get('state') == 'accepted':
            for rec in self:
                if rec.role == 'org_manager' and rec.state == 'accepted':
                    rec._cascade_ws_manager(rec.user_id, rec.organization_id)
        return res

    @api.depends('user_id', 'organization_id', 'role')
    def _compute_display_name(self):
        for rec in self:
            rec.display_name = f'{rec.user_id.name} - {rec.organization_id.name} ({rec.role})'

    def action_accept(self):
        for rec in self:
            if rec.state != 'pending':
                raise UserError(_('Only pending invitations can be accepted.'))
            rec.write({
                'state': 'accepted',
                'response_date': fields.Datetime.now(),
            })
            rec.organization_id.message_post(
                body=_('%s accepted the invitation as %s.',
                       rec.user_id.name, dict(self._fields['role'].selection).get(rec.role)),
                message_type='notification',
                subtype_xmlid='mail.mt_note',
            )

    def action_reject(self):
        for rec in self:
            if rec.state != 'pending':
                raise UserError(_('Only pending invitations can be rejected.'))
            rec.write({
                'state': 'rejected',
                'response_date': fields.Datetime.now(),
            })
            rec.organization_id.message_post(
                body=_('%s rejected the invitation as %s.',
                       rec.user_id.name, dict(self._fields['role'].selection).get(rec.role)),
                message_type='notification',
                subtype_xmlid='mail.mt_note',
            )
