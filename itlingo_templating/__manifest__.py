{
    'name': 'ITLingo Templating',
    'version': '19.0.1.0.1',
    'category': 'Services',
    'summary': 'Generate DOCX/XLSX documents from RSL/ASL specifications and templates',
    'description': """
Turn a DOCX or XLSX template document plus an uploaded RSL or ASL specification
into a generated document. The specification is parsed locally (embedded
Langium parser, no dependency on the chatbot/ITOI services), normalized into a
canonical model and rendered with docxtpl (DOCX) or openpyxl + Jinja2 (XLSX).
    """,
    'author': 'ITLingo',
    'website': 'https://itlingo.ist.utl.pt',
    'depends': ['itlingo_documents'],
    'external_dependencies': {'python': ['docxtpl', 'openpyxl']},
    'data': [
        'views/itlingo_document_views.xml',
        'views/portal_generate.xml',
    ],
    'installable': True,
    'license': 'LGPL-3',
}
