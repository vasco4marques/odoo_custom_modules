from odoo import api, models, _


class ItlingoProjectRole(models.Model):
    _inherit = 'itlingo.project.role'

    @api.model_create_multi
    def create(self, vals_list):
        records = super().create(vals_list)
        Notif = self.env['itlingo.notification']
        template = self.env.ref(
            'itlingo_notifications.mail_template_itlingo_invitation',
            raise_if_not_found=False,
        )
        for role in records:
            if role.state != 'pending':
                continue
            role_label = dict(role._fields['role'].selection).get(role.role, role.role)
            body = _(
                'You were invited to workspace <b>%s</b> as <b>%s</b>. '
                '<a href="/my/invitations">Open My Invitations</a> to respond.',
                role.project_id.name,
                role_label,
            )
            notif = Notif._notify(
                role.user_id,
                _('Workspace invitation: %s', role.project_id.name),
                body,
                notification_type='invite',
                res_model='itlingo.project.role',
                res_id=role.id,
            )
            if template and role.user_id.email:
                template.send_mail(notif.id, force_send=False)
        return records

    def action_accept(self):
        res = super().action_accept()
        Notif = self.env['itlingo.notification']
        for role in self:
            managers = role.project_id.workspace_role_ids.filtered(
                lambda r: r.role == 'ws_manager' and r.state == 'accepted'
            ).mapped('user_id')
            Notif._notify_many(
                managers,
                _('%s accepted the workspace invitation', role.user_id.name),
                _('%s joined workspace <b>%s</b>.',
                  role.user_id.name, role.project_id.name),
                notification_type='invite',
                res_model='project.project',
                res_id=role.project_id.id,
            )
        return res

    def action_reject(self):
        res = super().action_reject()
        Notif = self.env['itlingo.notification']
        for role in self:
            managers = role.project_id.workspace_role_ids.filtered(
                lambda r: r.role == 'ws_manager' and r.state == 'accepted'
            ).mapped('user_id')
            Notif._notify_many(
                managers,
                _('%s rejected the workspace invitation', role.user_id.name),
                _('%s declined to join workspace <b>%s</b>.',
                  role.user_id.name, role.project_id.name),
                notification_type='invite',
                res_model='project.project',
                res_id=role.project_id.id,
            )
        return res
