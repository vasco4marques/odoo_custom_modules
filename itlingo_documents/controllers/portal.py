from odoo import _, http
from odoo.exceptions import AccessError, MissingError
from odoo.http import request
from odoo.addons.portal.controllers.portal import CustomerPortal, pager


class ITLingoDocumentPortal(CustomerPortal):

    def _prepare_home_portal_values(self, counters):
        values = super()._prepare_home_portal_values(counters)
        if 'document_count' in counters:
            values['document_count'] = request.env['itlingo.document'].search_count([])
        return values

    def _document_check_access(self, document_id):
        document = request.env['itlingo.document'].browse(document_id)
        if not document.exists():
            raise MissingError(_('Document not found.'))
        try:
            document.check_access_rights('read')
            document.check_access_rule('read')
        except AccessError:
            raise AccessError(_('You do not have access to this document.'))
        return document

    @http.route(
        ['/my/documents', '/my/documents/page/<int:page>'],
        type='http', auth='user', website=True,
    )
    def portal_my_documents(self, page=1, sortby=None, filterby=None, **kw):
        Document = request.env['itlingo.document']
        domain = []

        if filterby == 'draft':
            domain.append(('status', '=', 'draft'))
        elif filterby == 'published':
            domain.append(('status', '=', 'published'))

        doc_count = Document.search_count(domain)
        url_args = {'filterby': filterby} if filterby else None
        page_detail = pager(
            url='/my/documents',
            total=doc_count,
            page=page,
            step=20,
            url_args=url_args,
        )
        documents = Document.search(
            domain, limit=20, offset=page_detail['offset'],
            order='creation_date desc',
        )
        return request.render('itlingo_documents.portal_my_documents', {
            'documents': documents,
            'pager': page_detail,
            'page_name': 'documents',
            'default_url': '/my/documents',
        })

    @http.route(
        '/my/documents/<int:document_id>',
        type='http', auth='user', website=True,
    )
    def portal_document_detail(self, document_id, **kw):
        document = self._document_check_access(document_id)
        return request.render('itlingo_documents.portal_document_detail', {
            'document': document,
            'page_name': 'documents',
        })
