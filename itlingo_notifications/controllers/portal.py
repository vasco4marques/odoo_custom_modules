from odoo import http
from odoo.http import request
from odoo.addons.portal.controllers.portal import CustomerPortal, pager


class ITLingoNotificationPortal(CustomerPortal):

    def _prepare_home_portal_values(self, counters):
        values = super()._prepare_home_portal_values(counters)
        if 'notification_count' in counters:
            values['notification_count'] = request.env[
                'itlingo.notification'
            ].search_count([('is_read', '=', False)])
        if 'message_count' in counters:
            values['message_count'] = request.env[
                'itlingo.message'
            ].search_count([('recipient_id', '=', request.uid), ('is_read', '=', False)])
        return values

    @http.route(
        ['/my/notifications', '/my/notifications/page/<int:page>'],
        type='http', auth='user', website=True,
    )
    def portal_my_notifications(self, page=1, **kw):
        Notification = request.env['itlingo.notification']
        domain = [('user_id', '=', request.uid)]
        notif_count = Notification.search_count(domain)
        page_detail = pager(
            url='/my/notifications',
            total=notif_count,
            page=page,
            step=20,
        )
        notifications = Notification.search(
            domain, limit=20, offset=page_detail['offset'],
            order='create_date desc',
        )
        return request.render('itlingo_notifications.portal_my_notifications', {
            'notifications': notifications,
            'pager': page_detail,
            'page_name': 'notifications',
            'default_url': '/my/notifications',
        })

    @http.route(
        '/my/notifications/mark_all_read',
        type='http', auth='user', website=True,
    )
    def portal_mark_all_read(self, **kw):
        request.env['itlingo.notification'].search([
            ('user_id', '=', request.uid),
            ('is_read', '=', False),
        ]).action_mark_read()
        return request.redirect('/my/notifications')

    @http.route(
        ['/my/messages', '/my/messages/page/<int:page>'],
        type='http', auth='user', website=True,
    )
    def portal_my_messages(self, page=1, **kw):
        Message = request.env['itlingo.message']
        domain = [
            '|',
            ('sender_id', '=', request.uid),
            ('recipient_id', '=', request.uid),
        ]
        msg_count = Message.search_count(domain)
        page_detail = pager(
            url='/my/messages',
            total=msg_count,
            page=page,
            step=20,
        )
        messages = Message.search(
            domain, limit=20, offset=page_detail['offset'],
            order='create_date desc',
        )
        return request.render('itlingo_notifications.portal_my_messages', {
            'messages': messages,
            'pager': page_detail,
            'page_name': 'messages',
            'default_url': '/my/messages',
        })
