{
    'name': 'ITLingo Organizations',
    'version': '19.0.1.0.0',
    'category': 'Services',
    'summary': 'Organization management for ITLingo Cloud',
    'description': """
Manages organizations, organization roles, and invitation workflows
for the ITLingo Cloud platform.
    """,
    'author': 'ITLingo',
    'website': 'https://itlingo.ist.utl.pt',
    'depends': ['base', 'contacts', 'mail', 'portal', 'project', 'auth_signup'],
    'data': [
        'security/itlingo_security.xml',
        'security/ir.model.access.csv',
        'security/itlingo_organization_rules.xml',
        'data/auth_signup_data.xml',
        'views/itlingo_organization_role_views.xml',
        'views/itlingo_organization_views.xml',
        'views/itlingo_menus.xml',
    ],
    'demo': ['demo/demo.xml'],
    'installable': True,
    'application': True,
    'license': 'LGPL-3',
}
