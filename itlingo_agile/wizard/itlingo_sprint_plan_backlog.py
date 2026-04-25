from odoo import fields, models, _
from odoo.exceptions import UserError


class ItlingoSprintPlanBacklog(models.TransientModel):
    _name = 'itlingo.sprint.plan.backlog'
    _description = 'Add product backlog items to sprint'

    sprint_id = fields.Many2one(
        'itlingo.sprint', string='Sprint', required=True, ondelete='cascade',
    )
    project_id = fields.Many2one(
        'project.project', related='sprint_id.project_id', readonly=True,
    )
    item_ids = fields.Many2many(
        'itlingo.backlog.item',
        string='Backlog items',
        domain="[('project_id', '=', project_id), '|', ('sprint_id', '=', False), ('sprint_id', '=', sprint_id)]",
    )

    def action_apply(self):
        for wiz in self:
            if not wiz.item_ids:
                raise UserError(_('Select at least one backlog item.'))
            wiz.item_ids.write({'sprint_id': wiz.sprint_id.id})
        return {'type': 'ir.actions.act_window_close'}
