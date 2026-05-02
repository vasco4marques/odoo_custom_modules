from odoo import api, models


class ResUsers(models.Model):
    _inherit = 'res.users'

    @api.model_create_multi
    def create(self, vals_list):
        users = super().create(vals_list)
        itlingo_member = self.env.ref(
            'itlingo_organizations.group_itlingo_member',
            raise_if_not_found=False,
        )
        if not itlingo_member:
            return users
        portal_group = self.env.ref('base.group_portal')
        for user in users:
            if portal_group in user.groups_id and itlingo_member not in user.groups_id:
                user.sudo().write({
                    'groups_id': [(4, itlingo_member.id)],
                })
        return users
