{
    'name': 'ITLingo Website & Portal',
    'version': '19.0.1.0.9',
    'category': 'Website',
    'summary': 'Public website and authenticated portal for ITLingo Cloud',
    'description': """
Provides authenticated portal pages for organizations,
workspaces, and invitations.
    """,
    'author': 'ITLingo',
    'website': 'https://itlingo.ist.utl.pt',
    'depends': [
        'website', 'portal', 'mail',
        'itlingo_organizations', 'itlingo_workspace_access',
        'itlingo_documents',
    ],
    'data': [
        'views/website_menus.xml',
        'data/website_remove_defaults.xml',
        'views/portal_templates.xml',
        'views/portal_organization_templates.xml',
        'views/portal_create_templates.xml',
        'views/portal_workspace_templates.xml',
        'views/portal_invitation_templates.xml',
    ],
    'assets': {
        'web.assets_frontend': [
            'itlingo_website_portal/static/src/scss/itlingo_portal.scss',
        ],
    },
    'installable': True,
    'license': 'LGPL-3',
    'pre_init_hook': 'pre_init_hook',
    'post_init_hook': 'post_init_hook',
}
