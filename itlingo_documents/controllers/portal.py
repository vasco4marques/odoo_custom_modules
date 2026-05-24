import base64

from odoo import _, http
from odoo.exceptions import AccessError, MissingError, UserError
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

    def _can_edit_document(self, document):
        """Return True if the current user can edit/delete this document.

        Workspace documents require ws_manager on the document's workspace.
        Organization-level documents require org_manager on the doc's org.
        """
        user = request.env.user
        if document.project_id:
            role = request.env['itlingo.project.role'].sudo().search([
                ('user_id', '=', user.id),
                ('project_id', '=', document.project_id.id),
                ('state', '=', 'accepted'),
                ('role', '=', 'ws_manager'),
            ], limit=1)
            return bool(role)
        if document.organization_id:
            role = request.env['itlingo.organization.role'].sudo().search([
                ('user_id', '=', user.id),
                ('organization_id', '=', document.organization_id.id),
                ('state', '=', 'accepted'),
                ('role', '=', 'org_manager'),
            ], limit=1)
            return bool(role)
        return False

    def _document_return_url(self, document):
        if document.project_id:
            return f'/my/workspaces/{document.project_id.id}/documentation'
        if document.organization_id:
            return f'/my/organizations/{document.organization_id.id}/documentation'
        return '/my/documents'

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
            'can_edit_document': self._can_edit_document(document),
            'page_name': 'documents',
        })

    @http.route(
        '/my/documents/<int:document_id>/edit',
        type='http', auth='user', website=True, methods=['GET', 'POST'],
    )
    def portal_document_edit(self, document_id, **post):
        document = self._document_check_access(document_id)
        if not self._can_edit_document(document):
            raise AccessError(_('You cannot edit this document.'))
        DocType = request.env['itlingo.document.type'].sudo()
        doc_types = DocType.search([], order='name')
        status_selection = document._fields['status'].selection
        values = {
            'document': document,
            'doc_types': doc_types,
            'status_selection': status_selection,
            'form': {
                'name': document.name,
                'document_type_id': document.document_type_id.id or '',
                'status': document.status,
                'version': document.version or '',
            },
            'error': {},
            'page_name': 'document_edit',
        }
        if request.httprequest.method == 'POST':
            name = (post.get('name') or '').strip()
            values['form'] = dict(post)
            raw_type = post.get('document_type_id')
            try:
                type_id = int(raw_type) if raw_type else False
            except (TypeError, ValueError):
                type_id = False
            status = (post.get('status') or '').strip()
            version = (post.get('version') or '').strip()
            allowed_status = {key for key, _label in status_selection}
            upload = request.httprequest.files.get('document_file')
            if not name:
                values['error']['name'] = _('Name is required.')
            elif type_id and type_id not in doc_types.ids:
                values['error']['document_type_id'] = _('Invalid document type.')
            elif status and status not in allowed_status:
                values['error']['status'] = _('Invalid status.')
            else:
                write_vals = {
                    'name': name,
                    'document_type_id': type_id or False,
                    'status': status or document.status,
                    'version': version or document.version,
                }
                if upload and upload.filename:
                    write_vals['file_name'] = upload.filename
                    write_vals['document_file'] = base64.b64encode(upload.read())
                try:
                    document.sudo().write(write_vals)
                except UserError as err:
                    values['error']['_form'] = str(err)
                else:
                    return request.redirect(f'/my/documents/{document.id}')
        return request.render(
            'itlingo_documents.portal_document_edit', values,
        )

    @http.route(
        '/my/documents/<int:document_id>/delete',
        type='http', auth='user', website=True, methods=['POST'],
    )
    def portal_document_delete(self, document_id, **post):
        document = self._document_check_access(document_id)
        if not self._can_edit_document(document):
            raise AccessError(_('You cannot delete this document.'))
        return_url = self._document_return_url(document)
        try:
            document.sudo().unlink()
        except UserError:
            return request.redirect(f'/my/documents/{document.id}?error=delete_failed')
        return request.redirect(f'{return_url}?message=doc_deleted')
