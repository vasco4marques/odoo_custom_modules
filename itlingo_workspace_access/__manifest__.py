{
    'name': 'ITLingo Workspace Access',
    'version': '19.0.2.1.0',
    'category': 'Services/Project',
    'summary': 'Workspace role management for ITLingo Cloud',
    'description': """
Provides the ITLingo workspace model (organization, business
status, costs) and implements workspace-level role/invitation workflows.
    """,
    'author': 'ITLingo',
    'website': 'https://itlingo.ist.utl.pt',
    'depends': ['mail', 'itlingo_organizations'],
    'data': [
        'security/ir.model.access.csv',
        'security/itlingo_workspace_rules.xml',
        'views/itlingo_project_role_views.xml',
        'views/itlingo_workspace_views.xml',
        'views/itlingo_workspace_menus.xml',
    ],
    'demo': ['demo/demo.xml'],
    'installable': True,
    'license': 'LGPL-3',
}
