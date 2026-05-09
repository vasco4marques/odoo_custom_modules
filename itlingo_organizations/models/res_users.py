from odoo import api, fields, models


class ResUsers(models.Model):
    _inherit = 'res.users'

    org_setup_pending = fields.Boolean(
        default=False,
        help='When True the user is redirected to the welcome '
             'organisation-creation screen on next login.',
    )

    @api.model_create_multi
    def create(self, vals_list):
        users = super().create(vals_list)
        itlingo_member = self.env.ref(
            'itlingo_organizations.group_itlingo_member',
            raise_if_not_found=False,
        )
        if not itlingo_member:
            return users
        skip_org_setup = self.env.context.get('no_org_setup', False)
        for user in users:
            if user.has_group('base.group_portal') \
                    and not user.has_group('itlingo_organizations.group_itlingo_member'):
                self.env.cr.execute(
                    "INSERT INTO res_groups_users_rel (gid, uid) "
                    "VALUES (%s, %s) ON CONFLICT DO NOTHING",
                    (itlingo_member.id, user.id),
                )
                if not skip_org_setup:
                    user.org_setup_pending = True
        self.env.registry.clear_cache()
        return users
