from odoo import api, fields, models, _
from odoo.exceptions import ValidationError


class ItlingoOrganization(models.Model):
    _name = 'itlingo.organization'
    _description = 'ITLingo Organization'
    _inherit = ['mail.thread', 'mail.activity.mixin']
    _order = 'name'

    name = fields.Char(required=True, tracking=True)
    # DEPRECATED: organizations have no public exposure, so a Public/Private
    # type carries no behavior. Removed from all views/forms; the column will
    # be dropped in a follow-up migration once confirmed.
    organization_type = fields.Selection([
        ('private', 'Private'),
        ('public', 'Public'),
    ], string='Type (deprecated)', default='private', required=True)
    activity_type = fields.Selection([
        ('it', 'IT'),
        ('marketing', 'Marketing'),
        ('consulting', 'Consulting'),
        ('finance', 'Finance'),
        ('education', 'Education'),
        ('other', 'Other'),
    ], string='Activity Type', default='it', required=True, tracking=True)
    state = fields.Selection([
        ('active', 'Active'),
        ('suspended', 'Suspended'),
    ], default='active', required=True, tracking=True)
    country_id = fields.Many2one('res.country', string='Country')
    partner_id = fields.Many2one(
        'res.partner', string='Related Contact',
        help='Odoo contact record linked to this organization.',
    )
    description = fields.Html()
    logo = fields.Image(max_width=256, max_height=256)
    company_id = fields.Many2one(
        'res.company', string='Company',
        default=lambda self: self.env.company,
    )

    role_ids = fields.One2many(
        'itlingo.organization.role', 'organization_id', string='Roles',
    )
    member_count = fields.Integer(
        compute='_compute_member_count', string='Members',
    )

    @api.depends('role_ids', 'role_ids.state')
    def _compute_member_count(self):
        for org in self:
            org.member_count = len(
                org.role_ids.filtered(lambda r: r.state == 'accepted')
            )

    @api.model_create_multi
    def create(self, vals_list):
        for vals in vals_list:
            if not vals.get('partner_id'):
                partner = self.env['res.partner'].create({
                    'name': vals.get('name', ''),
                    'is_company': True,
                    'country_id': vals.get('country_id'),
                    'company_id': vals.get('company_id', self.env.company.id),
                })
                vals['partner_id'] = partner.id
        return super().create(vals_list)

    def action_suspend(self):
        self.write({'state': 'suspended'})

    def action_activate(self):
        self.write({'state': 'active'})

    def action_invite_member(self):
        return {
            'type': 'ir.actions.act_window',
            'name': _('Invite Member'),
            'res_model': 'itlingo.organization.role',
            'view_mode': 'form',
            'target': 'new',
            'context': {
                'default_organization_id': self.id,
                'default_state': 'pending',
            },
        }
