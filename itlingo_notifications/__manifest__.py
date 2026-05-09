{
    'name': 'ITLingo Notifications',
    'version': '19.0.1.0.0',
    'category': 'Services',
    'summary': 'In-app notifications and messaging for ITLingo Cloud',
    'description': """
Centralized notification system with read/unread tracking,
portal inbox, and automated event-driven notifications.
    """,
    'author': 'ITLingo',
    'website': 'https://itlingo.ist.utl.pt',
    'depends': [
        'mail', 'portal', 'website',
        'itlingo_organizations', 'itlingo_workspace_access',
    ],
    'data': [
        'security/ir.model.access.csv',
        'security/itlingo_notification_rules.xml',
        'data/mail_template_data.xml',
        'views/itlingo_notification_views.xml',
        'views/itlingo_message_views.xml',
        'views/itlingo_notification_menus.xml',
        'views/portal_notification_templates.xml',
        'views/website_notification_bell.xml',
    ],
    'assets': {
        'web.assets_frontend': [
            'itlingo_notifications/static/src/js/notification_bell.js',
            'itlingo_notifications/static/src/scss/notification_bell.scss',
        ],
    },
    'demo': ['demo/demo.xml'],
    'installable': True,
    'license': 'LGPL-3',
}
