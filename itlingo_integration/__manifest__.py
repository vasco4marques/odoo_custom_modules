{
    'name': 'ITLingo Integration',
    'version': '19.0.1.3.0',
    'category': 'Services',
    'summary': 'ITOI token-based integration for external ITLingo tools',
    'description': """
External integration module for connecting ITLingo desktop tools
(ITOI) to the Odoo platform via encrypted tokens and REST API.
    """,
    'author': 'ITLingo',
    'website': 'https://itlingo.ist.utl.pt',
    'depends': [
        'base', 'mail',
        'itlingo_organizations', 'itlingo_workspace_access',
        'itlingo_dsl', 'itlingo_documents',
    ],
    'external_dependencies': {'python': ['cryptography']},
    'data': [
        'security/ir.model.access.csv',
        'security/itlingo_integration_rules.xml',
        'views/itlingo_integration_settings_views.xml',
        'views/itlingo_integration_token_views.xml',
        'views/itlingo_integration_menus.xml',
    ],
    'installable': True,
    'license': 'LGPL-3',
}
