{
    'name': 'ITLingo Templating',
    'version': '19.0.1.1.0',
    'category': 'Services',
    'summary': 'Generate office and text documents from any published DSL',
    'description': """
Turn a DOCX, XLSX, or UTF-8 text template plus an uploaded DSL specification
into a generated document. The specification is parsed locally (embedded
Langium parser, no dependency on the chatbot/ITOI services), normalized into a
canonical model and rendered with docxtpl (DOCX), openpyxl + Jinja2 (XLSX), or
Jinja2 directly (text formats).
    """,
    'author': 'ITLingo',
    'website': 'https://itlingo.ist.utl.pt',
    'depends': ['itlingo_documents', 'itlingo_dsl', 'itlingo_website_portal'],
    'external_dependencies': {'python': ['docxtpl', 'openpyxl']},
    'data': [
        'views/portal_template_reference.xml',
        'views/portal_dsl_templates.xml',
        'views/itlingo_document_views.xml',
        'views/portal_generate.xml',
    ],
    'installable': True,
    'license': 'LGPL-3',
}
