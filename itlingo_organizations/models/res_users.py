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
        for user in users:
            if user.has_group('base.group_portal') \
                    and not user.has_group('itlingo_organizations.group_itlingo_member'):
                self.env.cr.execute(
                    "INSERT INTO res_groups_users_rel (gid, uid) "
                    "VALUES (%s, %s) ON CONFLICT DO NOTHING",
                    (itlingo_member.id, user.id),
                )
                pending = self._process_pending_invitations(user)
                if not pending:
                    user.org_setup_pending = True
        self.env.registry.clear_cache()
        return users

    def _process_pending_invitations(self, user):
        """Check for pending invitations by email and auto-create roles."""
        Pending = self.env['itlingo.pending.invitation'].sudo()
        email = user.login or user.email
        invitations = Pending.search([('email', '=ilike', email)])
        if not invitations:
            return False
        OrgRole = self.env['itlingo.organization.role'].sudo()
        WsRole = self.env.get('itlingo.project.role')
        for inv in invitations:
            if inv.organization_id:
                OrgRole.create({
                    'organization_id': inv.organization_id.id,
                    'user_id': user.id,
                    'role': inv.role,
                    'state': 'accepted',
                })
            elif inv.project_id and WsRole is not None:
                WsRole.sudo().create({
                    'project_id': inv.project_id.id,
                    'user_id': user.id,
                    'role': inv.role,
                    'state': 'accepted',
                })
        invitations.unlink()
        return True
