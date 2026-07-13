{
    'name': 'ITLingo DSL',
    'version': '19.0.1.4.0',
    'category': 'Services',
    'summary': 'Platform-level Domain-Specific Language registry for ITLingo Cloud',
    'description': """
Registers and manages platform-level Domain-Specific Languages (DSLs)
supported by the ITLingo Cloud platform, such as RSL and ASL.

This module stores DSL metadata, lifecycle status, and references to
documentation, grammar definitions, and parser/validator services. It
does not implement the DSLs themselves.

It also integrates DSLs with the rest of the ecosystem: organizations and
workspaces may declare which DSLs they allow, and platform/organization
resources may be associated with a DSL.
    """,
    'author': 'ITLingo',
    'website': 'https://itlingo.ist.utl.pt',
    'depends': ['itlingo_organizations', 'itlingo_workspace_access'],
    'data': [
        'security/itlingo_dsl_groups.xml',
        'security/ir.model.access.csv',
        'security/itlingo_dsl_rules.xml',
        'views/itlingo_dsl_views.xml',
        'views/itlingo_dsl_resource_views.xml',
        'views/itlingo_org_resource_views.xml',
        'views/itlingo_organization_views.xml',
        'views/itlingo_workspace_views.xml',
        'views/itlingo_dsl_menus.xml',
        'data/itlingo_dsl_data.xml',
    ],
    'installable': True,
    'application': False,
    'license': 'LGPL-3',
}
