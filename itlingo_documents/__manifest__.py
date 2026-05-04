{
    'name': 'ITLingo Documents',
    'version': '19.0.1.0.0',
    'category': 'Services',
    'summary': 'Structured document management for ITLingo Cloud',
    'description': """
Typed, versioned document management with templates, linked to
projects and organizations.
    """,
    'author': 'ITLingo',
    'website': 'https://itlingo.ist.utl.pt',
    'depends': ['mail', 'itlingo_organizations', 'itlingo_workspace_access'],
    'data': [
        'security/ir.model.access.csv',
        'security/itlingo_document_rules.xml',
        'data/itlingo_document_type_data.xml',
        'views/itlingo_document_template_views.xml',
        'views/itlingo_document_type_views.xml',
        'views/itlingo_document_views.xml',
        'views/itlingo_library_views.xml',
        'views/itlingo_document_menus.xml',
        'views/project_project_views.xml',
        'views/portal_document_templates.xml',
    ],
    'demo': ['demo/demo.xml'],
    'installable': True,
    'license': 'LGPL-3',
}
