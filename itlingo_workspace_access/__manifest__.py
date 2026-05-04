{
    'name': 'ITLingo Workspace Access',
    'version': '19.0.1.0.0',
    'category': 'Services/Project',
    'summary': 'Workspace/project role management for ITLingo Cloud',
    'description': """
Extends Odoo Project with ITLingo workspace fields (organization, methodology,
business status, costs) and implements project-level role/invitation workflows.
    """,
    'author': 'ITLingo',
    'website': 'https://itlingo.ist.utl.pt',
    'depends': ['project', 'mail', 'itlingo_organizations'],
    'data': [
        'security/ir.model.access.csv',
        'security/itlingo_workspace_rules.xml',
        'views/itlingo_project_role_views.xml',
        'views/project_project_views.xml',
        'views/itlingo_workspace_menus.xml',
    ],
    'demo': ['demo/demo.xml'],
    'installable': True,
    'license': 'LGPL-3',
}
