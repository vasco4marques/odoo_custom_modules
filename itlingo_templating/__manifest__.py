{
    'name': 'ITLingo Templating',
    'version': '19.0.1.0.0',
    'category': 'Services',
    'summary': 'Generate DOCX documents from RSL specifications and templates',
    'description': """
Turn a DOCX template document plus an uploaded .rsl specification into a
generated DOCX. The RSL is parsed locally (embedded Langium parser, no
dependency on the chatbot/ITOI services), normalized into a canonical model
and rendered with docxtpl.
    """,
    'author': 'ITLingo',
    'website': 'https://itlingo.ist.utl.pt',
    'depends': ['itlingo_documents'],
    'external_dependencies': {'python': ['docxtpl']},
    'data': [
        'views/itlingo_document_views.xml',
        'views/portal_generate.xml',
    ],
    'installable': True,
    'license': 'LGPL-3',
}
