{
    'name': 'ITLingo Website & Portal',
    'version': '19.0.1.7.0',
    'category': 'Website',
    'summary': 'Public website and authenticated portal for ITLingo Cloud',
    'description': """
Provides authenticated portal pages for organizations
and workspaces.
    """,
    'author': 'ITLingo',
    'website': 'https://itlingo.ist.utl.pt',
    'depends': [
        'website', 'portal', 'mail', 'project',
        'auth_totp_portal', 'auth_passkey_portal',
        'itlingo_organizations', 'itlingo_workspace_access',
        'itlingo_documents', 'itlingo_dsl',
    ],
    'data': [
        'views/website_menus.xml',
        'data/website_remove_defaults.xml',
        'views/portal_templates.xml',
        'views/portal_organization_templates.xml',
        'views/portal_create_templates.xml',
        'views/portal_workspace_templates.xml',
        'views/portal_dsl_templates.xml',
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
