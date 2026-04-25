from odoo import api, fields, models


class ItlingoNotification(models.Model):
    _name = 'itlingo.notification'
    _description = 'ITLingo Notification'
    _order = 'create_date desc'

    user_id = fields.Many2one(
        'res.users', string='Recipient', required=True,
        default=lambda self: self.env.user, index=True, ondelete='cascade',
    )
    notification_type = fields.Selection([
        ('invite', 'Invitation'),
        ('status_change', 'Status Change'),
        ('assignment', 'Assignment'),
        ('mention', 'Mention'),
        ('system', 'System'),
    ], required=True, default='system')
    title = fields.Char(required=True)
    body = fields.Html()
    is_read = fields.Boolean(default=False, index=True)
    read_date = fields.Datetime()

    res_model = fields.Char(string='Related Model')
    res_id = fields.Many2oneReference(
        string='Related Record',
        model_field='res_model',
    )

    def action_mark_read(self):
        self.filtered(lambda n: not n.is_read).write({
            'is_read': True,
            'read_date': fields.Datetime.now(),
        })

    def action_mark_unread(self):
        self.write({'is_read': False, 'read_date': False})

    @api.model
    def _notify(self, user, title, body, notification_type='system',
                res_model=None, res_id=None):
        """Helper to create a notification for a user."""
        return self.sudo().create({
            'user_id': user.id,
            'title': title,
            'body': body,
            'notification_type': notification_type,
            'res_model': res_model,
            'res_id': res_id,
        })

    @api.model
    def _notify_many(self, users, title, body, notification_type='system',
                     res_model=None, res_id=None):
        """Send the same notification to multiple users."""
        vals_list = [{
            'user_id': u.id,
            'title': title,
            'body': body,
            'notification_type': notification_type,
            'res_model': res_model,
            'res_id': res_id,
        } for u in users]
        return self.sudo().create(vals_list)
