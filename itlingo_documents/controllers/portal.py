import base64

from odoo import _, http
from odoo.exceptions import AccessError, MissingError, UserError
from odoo.http import request
from odoo.addons.portal.controllers.portal import CustomerPortal, pager


class ITLingoDocumentPortal(CustomerPortal):

    def _is_admin(self):
        return request.env.user.has_group('itlingo_organizations.group_itlingo_admin')

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

        Admins can edit any document.
        Workspace documents require ws_manager on the document's workspace.
        Organization-level documents require org_manager on the doc's org.
        """
        if self._is_admin():
            return True
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
            'is_admin': self._is_admin(),
        })

    @http.route(
        '/my/documents/new',
        type='http', auth='user', website=True, methods=['GET', 'POST'],
    )
    def portal_document_create(self, **post):
        if not self._is_admin():
            raise AccessError(_('Only administrators can create platform documents.'))
        Document = request.env['itlingo.document']
        spec_file_obj = request.env['itlingo.document.spec.file']
        values = {
            'form': {
                'name': '',
            },
            'error': {},
            'page_name': 'document_create',
        }
        if request.httprequest.method == 'POST':
            name = (post.get('name') or '').strip()
            values['form'] = dict(post)

            # Required fields
            grammar_upload = request.httprequest.files.get('grammar_file')

            if not name:
                values['error']['name'] = _('DSL name is required.')
            elif not grammar_upload or not grammar_upload.filename:
                values['error']['grammar_file'] = _('Grammar file is required.')
            elif not grammar_upload.filename.endswith('.langium'):
                values['error']['grammar_file'] = _('Grammar file must have a .langium extension.')
            else:
                create_vals = {
                    'name': name,
                    'grammar_file': base64.b64encode(grammar_upload.read()),
                    'grammar_file_name': grammar_upload.filename,
                }

                # Optional: Validation Rules
                val_upload = request.httprequest.files.get('validation_rules_file')
                if val_upload and val_upload.filename:
                    create_vals['validation_rules_file'] = base64.b64encode(val_upload.read())
                    create_vals['validation_rules_file_name'] = val_upload.filename

                # Optional: Examples
                examples_upload = request.httprequest.files.get('examples_file')
                if examples_upload and examples_upload.filename:
                    create_vals['examples_file'] = base64.b64encode(examples_upload.read())
                    create_vals['examples_file_name'] = examples_upload.filename

                try:
                    document = Document.sudo().create(create_vals)

                    # Optional: Specification Examples (multiple files)
                    spec_uploads = request.httprequest.files.getlist('spec_example_files')
                    spec_vals_list = []
                    for f in spec_uploads:
                        if f and f.filename:
                            spec_vals_list.append({
                                'document_id': document.id,
                                'name': f.filename,
                                'file_data': base64.b64encode(f.read()),
                            })
                    if spec_vals_list:
                        spec_file_obj.sudo().create(spec_vals_list)

                except UserError as err:
                    values['error']['_form'] = str(err)
                else:
                    return request.redirect(f'/my/documents/{document.id}')
        return request.render(
            'itlingo_documents.portal_document_create', values,
        )

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

    @http.route(
        '/my/documents/<int:document_id>/upload-file',
        type='http', auth='user', website=True, methods=['POST'],
    )
    def portal_document_upload_file(self, document_id, **post):
        document = self._document_check_access(document_id)
        if not self._can_edit_document(document):
            raise AccessError(_('You cannot edit this document.'))
        field = post.get('field')
        allowed_fields = {'grammar_file', 'validation_rules_file', 'examples_file'}
        if field not in allowed_fields:
            raise AccessError(_('Invalid file field.'))
        upload = request.httprequest.files.get('file')
        if not upload or not upload.filename:
            return request.redirect(f'/my/documents/{document.id}?error=no_file')
        if field == 'grammar_file' and not upload.filename.endswith('.langium'):
            return request.redirect(f'/my/documents/{document.id}?error=invalid_extension')
        name_field = field.replace('_file', '_file_name')
        vals = {
            field: base64.b64encode(upload.read()),
            name_field: upload.filename,
        }
        try:
            document.sudo().write(vals)
        except UserError:
            return request.redirect(f'/my/documents/{document.id}?error=upload_failed')
        return request.redirect(f'/my/documents/{document.id}')

    @http.route(
        '/my/documents/<int:document_id>/delete-file',
        type='http', auth='user', website=True, methods=['POST'],
    )
    def portal_document_delete_file(self, document_id, **post):
        document = self._document_check_access(document_id)
        if not self._can_edit_document(document):
            raise AccessError(_('You cannot edit this document.'))
        field = post.get('field')
        allowed_fields = {'validation_rules_file', 'examples_file'}
        if field not in allowed_fields:
            raise AccessError(_('Cannot delete this file field.'))
        name_field = field.replace('_file', '_file_name')
        try:
            document.sudo().write({field: False, name_field: False})
        except UserError:
            return request.redirect(f'/my/documents/{document.id}?error=delete_failed')
        return request.redirect(f'/my/documents/{document.id}')

    @http.route(
        '/my/documents/<int:document_id>/add-spec-file',
        type='http', auth='user', website=True, methods=['POST'],
    )
    def portal_document_add_spec_file(self, document_id, **post):
        document = self._document_check_access(document_id)
        if not self._can_edit_document(document):
            raise AccessError(_('You cannot edit this document.'))
        spec_file_obj = request.env['itlingo.document.spec.file']
        uploads = request.httprequest.files.getlist('spec_example_files')
        vals_list = []
        for f in uploads:
            if f and f.filename:
                vals_list.append({
                    'document_id': document.id,
                    'name': f.filename,
                    'file_data': base64.b64encode(f.read()),
                })
        if vals_list:
            try:
                spec_file_obj.sudo().create(vals_list)
            except UserError:
                return request.redirect(f'/my/documents/{document.id}?error=upload_failed')
        return request.redirect(f'/my/documents/{document.id}')

    @http.route(
        '/my/documents/<int:document_id>/delete-spec-file/<int:spec_id>',
        type='http', auth='user', website=True, methods=['POST'],
    )
    def portal_document_delete_spec_file(self, document_id, spec_id, **post):
        document = self._document_check_access(document_id)
        if not self._can_edit_document(document):
            raise AccessError(_('You cannot edit this document.'))
        spec_file = request.env['itlingo.document.spec.file'].sudo().browse(spec_id)
        if not spec_file.exists() or spec_file.document_id.id != document.id:
            raise MissingError(_('File not found.'))
        try:
            spec_file.unlink()
        except UserError:
            return request.redirect(f'/my/documents/{document.id}?error=delete_failed')
        return request.redirect(f'/my/documents/{document.id}')
