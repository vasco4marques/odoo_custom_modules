from odoo import api, fields, models


class ItlingoMessage(models.Model):
    _name = 'itlingo.message'
    _description = 'ITLingo Direct Message'
    _order = 'create_date desc'

    sender_id = fields.Many2one(
        'res.users', string='Sender', required=True,
        default=lambda self: self.env.user, ondelete='cascade',
    )
    recipient_id = fields.Many2one(
        'res.users', string='Recipient', required=True,
        index=True, ondelete='cascade',
    )
    subject = fields.Char()
    body = fields.Html(required=True)
    is_read = fields.Boolean(default=False, index=True)
    read_date = fields.Datetime()
    project_id = fields.Many2one(
        'itlingo.workspace', string='Workspace Context',
    )

    def action_mark_read(self):
        self.filtered(lambda m: not m.is_read).write({
            'is_read': True,
            'read_date': fields.Datetime.now(),
        })

    @api.model
    def _send(self, sender, recipient, body, subject=None, project=None):
        """Helper to create and send a message."""
        return self.create({
            'sender_id': sender.id,
            'recipient_id': recipient.id,
            'subject': subject or '',
            'body': body,
            'project_id': project.id if project else False,
        })
