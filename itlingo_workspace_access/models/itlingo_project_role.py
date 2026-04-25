from odoo import api, fields, models, _
from odoo.exceptions import UserError


class ItlingoProjectRole(models.Model):
    _name = 'itlingo.project.role'
    _description = 'ITLingo Project Role'
    _order = 'project_id, user_id'

    user_id = fields.Many2one(
        'res.users', string='User', required=True, ondelete='cascade',
    )
    project_id = fields.Many2one(
        'project.project', string='Project',
        required=True, ondelete='cascade',
    )
    role = fields.Selection([
        ('ws_manager', 'Workspace Manager'),
        ('product_manager', 'Product Manager'),
        ('sprint_manager', 'Sprint Manager'),
        ('doc_manager', 'Document Manager'),
        ('ws_member', 'Workspace Member'),
    ], required=True, default='ws_member')
    state = fields.Selection([
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('rejected', 'Rejected'),
    ], default='pending', required=True)
    invite_date = fields.Datetime(
        default=fields.Datetime.now, readonly=True,
    )
    response_date = fields.Datetime(readonly=True)

    _unique_user_project = models.Constraint(
        'UNIQUE(user_id, project_id)',
        'A user can only have one role per project.',
    )

    @api.model_create_multi
    def create(self, vals_list):
        records = super().create(vals_list)
        todo_xmlid = 'mail.mail_activity_data_todo'
        for rec in records:
            if rec.state != 'pending':
                continue
            role_label = dict(rec._fields['role'].selection).get(rec.role, rec.role)
            rec.project_id.activity_schedule(
                todo_xmlid,
                user_id=rec.user_id.id,
                summary=_('Workspace invitation: %s', rec.project_id.name),
                note=_(
                    'You were invited to workspace <b>%s</b> as <b>%s</b>. '
                    'Open your portal at <a href="/my/invitations">My Invitations</a> '
                    'to accept or decline.',
                    rec.project_id.name,
                    role_label,
                ),
            )
        return records

    @api.depends('user_id', 'project_id', 'role')
    def _compute_display_name(self):
        for rec in self:
            rec.display_name = f'{rec.user_id.name} - {rec.project_id.name} ({rec.role})'

    def action_accept(self):
        for rec in self:
            if rec.state != 'pending':
                raise UserError(_('Only pending invitations can be accepted.'))
            rec.write({
                'state': 'accepted',
                'response_date': fields.Datetime.now(),
            })
            rec.project_id.message_subscribe(partner_ids=rec.user_id.partner_id.ids)
            rec.project_id.message_post(
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
            rec.project_id.message_post(
                body=_('%s rejected the invitation as %s.',
                       rec.user_id.name, dict(self._fields['role'].selection).get(rec.role)),
                message_type='notification',
                subtype_xmlid='mail.mt_note',
            )
