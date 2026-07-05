from odoo import http
from odoo.http import request


class ITLingoNotificationAPI(http.Controller):

    def _unread_count(self):
        return request.env['itlingo.notification'].search_count([
            ('user_id', '=', request.uid),
            ('is_read', '=', False),
        ])

    def _serialize_notifications(self, notifications):
        items = []
        for n in notifications:
            is_actionable = n._is_pending_invitation()
            items.append({
                'id': n.id,
                'title': n.title,
                'body': n.body or '',
                'notification_type': n.notification_type,
                'create_date': str(n.create_date),
                'is_actionable': is_actionable,
                'res_model': n.res_model or False,
                'res_id': n.res_id or False,
            })
        return items

    @http.route('/itlingo/notifications/bell', type='jsonrpc',
                auth='user', website=True)
    def notification_bell(self, **kw):
        Notif = request.env['itlingo.notification']
        unread = Notif.search([
            ('user_id', '=', request.uid),
            ('is_read', '=', False),
        ], limit=10, order='create_date desc')
        return {
            'unread_count': self._unread_count(),
            'notifications': self._serialize_notifications(unread),
        }

    @http.route('/itlingo/notifications/invitation/respond', type='jsonrpc',
                auth='user', website=True)
    def invitation_respond(self, notification_id, action, **kw):
        Notif = request.env['itlingo.notification'].sudo()
        notif = Notif.browse(notification_id)
        if not notif.exists() or notif.user_id.id != request.uid:
            return {'error': 'Notification not found.'}

        if action not in ('accept', 'reject'):
            return {'error': 'Invalid action.'}

        role = notif._linked_invitation_role()
        if not role:
            return {'error': 'No linked invitation.'}

        if role.state != 'pending':
            notif.action_mark_read()
            return {'error': 'Invitation already responded to.',
                    'unread_count': self._unread_count()}

        if action == 'accept':
            role.action_accept()
        else:
            role.action_reject()

        notif.action_mark_read()
        return {'success': True, 'unread_count': self._unread_count()}

    @http.route('/itlingo/notifications/mark_read', type='jsonrpc',
                auth='user', website=True)
    def mark_read(self, notification_id=None, **kw):
        Notif = request.env['itlingo.notification'].sudo()
        if notification_id:
            notif = Notif.browse(notification_id)
            if notif.exists() and notif.user_id.id == request.uid:
                notif.action_mark_read()
        else:
            Notif.search([
                ('user_id', '=', request.uid),
                ('is_read', '=', False),
            ]).action_mark_read()
        return {'success': True, 'unread_count': self._unread_count()}
