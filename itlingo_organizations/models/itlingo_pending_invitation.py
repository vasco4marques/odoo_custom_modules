from odoo import fields, models


class ItlingoPendingInvitation(models.Model):
    _name = 'itlingo.pending.invitation'
    _description = 'Pending invitation for users who have not yet signed up'
    _order = 'create_date desc'

    email = fields.Char(required=True, index=True)
    organization_id = fields.Many2one(
        'itlingo.organization', ondelete='cascade',
    )
    project_id = fields.Integer(string='Workspace ID')
    role = fields.Char(required=True)
    invited_by_id = fields.Many2one('res.users', string='Invited By')
