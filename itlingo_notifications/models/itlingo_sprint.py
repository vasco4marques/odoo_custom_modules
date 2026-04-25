from odoo import models, _


class ItlingoSprint(models.Model):
    _inherit = 'itlingo.sprint'

    def action_start(self):
        res = super().action_start()
        Notif = self.env['itlingo.notification']
        for sprint in self:
            members = sprint.sprint_user_ids.mapped('user_id')
            Notif._notify_many(
                members,
                _('Sprint "%s" has started', sprint.name),
                _('Sprint <b>%s</b> in project <b>%s</b> is now active.',
                  sprint.name, sprint.project_id.name),
                notification_type='status_change',
                res_model='itlingo.sprint',
                res_id=sprint.id,
            )
        return res

    def action_close(self):
        res = super().action_close()
        Notif = self.env['itlingo.notification']
        for sprint in self:
            members = sprint.sprint_user_ids.mapped('user_id')
            Notif._notify_many(
                members,
                _('Sprint "%s" has been closed', sprint.name),
                _('Sprint <b>%s</b> in project <b>%s</b> is now closed.',
                  sprint.name, sprint.project_id.name),
                notification_type='status_change',
                res_model='itlingo.sprint',
                res_id=sprint.id,
            )
        return res
