from odoo import http
from odoo.http import request
from odoo.addons.portal.controllers.portal import CustomerPortal
from odoo.addons.itlingo_website_portal.controllers.portal import paginate


class ITLingoNotificationPortal(CustomerPortal):

    def _prepare_home_portal_values(self, counters):
        values = super()._prepare_home_portal_values(counters)
        if 'notification_count' in counters:
            values['notification_count'] = request.env[
                'itlingo.notification'
            ].search_count([
                ('user_id', '=', request.uid),
                ('is_read', '=', False),
            ])
        return values

    @http.route(
        ['/my/notifications', '/my/notifications/page/<int:page>'],
        type='http', auth='user', website=True,
    )
    def portal_my_notifications(self, page=1, **kw):
        Notification = request.env['itlingo.notification']
        domain = [('user_id', '=', request.uid)]
        notifications, notif_count, page_detail = paginate(
            Notification, domain, '/my/notifications', page,
            order='create_date desc',
        )
        actionable_ids = {
            n.id for n in notifications if n._is_pending_invitation()
        }
        return request.render('itlingo_notifications.portal_my_notifications', {
            'notifications': notifications,
            'notif_count': notif_count,
            'actionable_ids': actionable_ids,
            'pager': page_detail,
            'page_name': 'notifications',
            'default_url': '/my/notifications',
        })

    @http.route(
        '/my/notifications/mark_all_read',
        type='http', auth='user', website=True, methods=['POST'],
    )
    def portal_mark_all_read(self, **kw):
        request.env['itlingo.notification'].search([
            ('user_id', '=', request.uid),
            ('is_read', '=', False),
        ]).action_mark_read()
        return request.redirect('/my/notifications')

    @http.route(
        '/my/notifications/<int:notification_id>/respond',
        type='http', auth='user', website=True, methods=['POST'],
    )
    def portal_notification_respond(self, notification_id, action=None, **kw):
        notif = request.env['itlingo.notification'].sudo().browse(notification_id)
        if (notif.exists() and notif.user_id.id == request.uid
                and action in ('accept', 'reject')):
            role = notif._linked_invitation_role()
            if role and role.state == 'pending':
                if action == 'accept':
                    role.action_accept()
                else:
                    role.action_reject()
            notif.action_mark_read()
        return request.redirect('/my/notifications')
