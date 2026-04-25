{
    'name': 'ITLingo Agile',
    'version': '19.0.1.0.0',
    'category': 'Services/Project',
    'summary': 'Scrum/Kanban agile management for ITLingo Cloud',
    'description': """
Adds first-class Scrum/Agile concepts to Odoo Project: sprints, backlog items,
task day effort tracking, sprint users, and sprint/backlog views.
    """,
    'author': 'ITLingo',
    'website': 'https://itlingo.ist.utl.pt',
    'depends': ['project', 'hr_timesheet', 'itlingo_workspace_access'],
    'data': [
        'security/ir.model.access.csv',
        'security/itlingo_agile_rules.xml',
        'wizard/itlingo_sprint_plan_backlog_views.xml',
        'views/itlingo_backlog_item_views.xml',
        'views/itlingo_sprint_views.xml',
        'views/project_project_hub_views.xml',
        'views/project_task_views.xml',
        'views/itlingo_task_day_effort_views.xml',
        'views/itlingo_agile_menus.xml',
    ],
    'demo': ['demo/demo.xml'],
    'installable': True,
    'license': 'LGPL-3',
}
