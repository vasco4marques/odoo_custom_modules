{
    'name': 'ITLingo Reports',
    'version': '19.0.1.0.0',
    'category': 'Services',
    'summary': 'Burndown, velocity reports and Excel export/import for ITLingo',
    'description': """
Sprint burndown and velocity analysis via SQL views,
QWeb PDF reports, and openpyxl-based Excel import/export.
    """,
    'author': 'ITLingo',
    'website': 'https://itlingo.ist.utl.pt',
    'depends': ['itlingo_agile', 'itlingo_workspace_access'],
    'external_dependencies': {'python': ['openpyxl']},
    'data': [
        'security/ir.model.access.csv',
        'views/itlingo_burndown_views.xml',
        'views/itlingo_velocity_views.xml',
        'views/project_project_report_hub_views.xml',
        'wizard/backlog_export_wizard_views.xml',
        'wizard/backlog_import_wizard_views.xml',
        'views/itlingo_report_menus.xml',
        'report/sprint_report_templates.xml',
        'report/sprint_report_actions.xml',
    ],
    'installable': True,
    'license': 'LGPL-3',
}
