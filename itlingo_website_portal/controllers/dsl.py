import base64

from odoo import _, http
from odoo.exceptions import AccessError, MissingError, UserError, ValidationError
from odoo.http import request, route, content_disposition
from odoo.addons.portal.controllers.portal import CustomerPortal

from .portal import paginate

DSL_STATUS = ('draft', 'active', 'deprecated')
DSL_FILE_TYPES = ('grammar', 'services', 'validation', 'examples', 'specification')


class ITLingoDslPortal(CustomerPortal):
    """Portal for managing platform DSL definitions.

    Platform admins manage every DSL (create / edit / delete / maintainers).
    DSL maintainers can edit only the specific DSLs they maintain (metadata and
    definition files); they cannot create or delete DSLs, nor manage the
    maintainer list.
    """

    # ──────────────────────────────────────────────
    # Helpers
    # ──────────────────────────────────────────────

    def _itlingo_is_admin(self):
        return request.env.user.has_group(
            'itlingo_organizations.group_itlingo_admin',
        )

    def _itlingo_admin_or_raise(self):
        if not self._itlingo_is_admin():
            raise AccessError(_('Only platform administrators can do this.'))

    def _maintained_dsl_ids(self):
        return request.env['itlingo.dsl'].sudo().search([
            ('maintainer_ids', 'in', request.env.user.ids),
        ]).ids

    def _can_access_dsl_area(self):
        return self._itlingo_is_admin() or bool(self._maintained_dsl_ids())

    def _require_dsl_area(self):
        if not self._can_access_dsl_area():
            raise AccessError(_('You do not have access to DSL management.'))

    def _can_edit_dsl(self, dsl):
        return self._itlingo_is_admin() or request.env.user in dsl.maintainer_ids

    def _can_view_dsl(self, dsl):
        return dsl.status == 'active' or self._can_edit_dsl(dsl)

    def _require_dsl_view(self, dsl):
        if not self._can_view_dsl(dsl):
            raise MissingError(_('DSL not found.'))

    def _dsl_view_domain(self):
        """Domain for DSLs visible to the current website visitor."""
        if self._itlingo_is_admin():
            return []
        if request.env.user._is_public():
            return [('status', '=', 'active')]
        return [
            '|',
            ('status', '=', 'active'),
            ('id', 'in', self._maintained_dsl_ids()),
        ]

    def _require_dsl_edit(self, dsl):
        if not self._can_edit_dsl(dsl):
            raise AccessError(_('You can only edit DSLs you maintain.'))

    def _require_structural_file_edit(self, dsl):
        self._require_dsl_edit(dsl)
        if dsl.status != 'draft':
            raise AccessError(_(
                'Grammar and services files can only be changed while the DSL '
                'is in draft status.',
            ))

    def _require_grammar_edit(self, dsl):
        """Backward-compatible gate used by the grammar editor routes."""
        self._require_structural_file_edit(dsl)

    def _can_view_dsl_files(self, dsl):
        return self._can_edit_dsl(dsl)

    def _require_dsl_files(self, dsl):
        if not self._can_view_dsl_files(dsl):
            raise AccessError(_('You do not have access to DSL definition files.'))

    def _dsl_or_404(self, dsl_id):
        dsl = request.env['itlingo.dsl'].sudo().browse(dsl_id)
        if not dsl.exists():
            raise MissingError(_('DSL not found.'))
        return dsl

    def _dsl_file_or_404(self, dsl, file_id):
        line = request.env['itlingo.dsl.file'].sudo().browse(file_id)
        if not line.exists() or line.dsl_id.id != dsl.id:
            raise MissingError(_('File not found.'))
        return line

    def _dsl_duplicate(self, acronym, version, exclude_id=None):
        domain = [('acronym', '=', acronym), ('version', '=', version)]
        if exclude_id:
            domain.append(('id', '!=', exclude_id))
        return bool(request.env['itlingo.dsl'].sudo().search_count(domain))

    def _dsl_form_values(self, post):
        return {
            'name': (post.get('name') or '').strip(),
            'acronym': (post.get('acronym') or '').strip(),
            'version': (post.get('version') or '').strip() or '1.0',
            'status': post.get('status') or 'draft',
            'description': (post.get('description') or '').strip(),
            'file_extensions': (post.get('file_extensions') or '').strip(),
            'documentation_url': (post.get('documentation_url') or '').strip(),
        }

    def _dsl_validate(self, vals, exclude_id=None):
        error = {}
        if not vals['name']:
            error['name'] = _('Name is required.')
        if not vals['acronym']:
            error['acronym'] = _('Acronym is required.')
        if vals['status'] not in DSL_STATUS:
            error['status'] = _('Invalid status.')
        if (vals['acronym'] and vals['version']
                and self._dsl_duplicate(vals['acronym'], vals['version'], exclude_id)):
            error['acronym'] = _(
                'A DSL with this acronym and version already exists.',
            )
        return error

    def _dsl_write_vals(self, vals):
        return {
            'name': vals['name'],
            'acronym': vals['acronym'],
            'version': vals['version'],
            'status': vals['status'],
            'description': vals['description'] or False,
            'file_extensions': vals['file_extensions'] or False,
            'documentation_url': vals['documentation_url'] or False,
        }

    # ──────────────────────────────────────────────
    # Portal home counter
    # ──────────────────────────────────────────────

    def _prepare_home_portal_values(self, counters):
        values = super()._prepare_home_portal_values(counters)
        if 'dsl_count' in counters:
            if self._itlingo_is_admin():
                values['dsl_count'] = request.env['itlingo.dsl'].sudo().search_count([])
            else:
                maintained_ids = self._maintained_dsl_ids()
                values['dsl_count'] = request.env['itlingo.dsl'].sudo().search_count([
                    '|', ('status', '=', 'active'), ('id', 'in', maintained_ids),
                ])
        return values

    # ──────────────────────────────────────────────
    # List (public read-only catalog; management actions per role)
    # ──────────────────────────────────────────────

    @route(['/dsl', '/dsl/page/<int:page>'], type='http', auth='public', website=True)
    def portal_dsl_list(self, page=1, **kw):
        is_admin = self._itlingo_is_admin()
        params = request.params
        Dsl = request.env['itlingo.dsl'].sudo()

        # Everyone (including anonymous users) can consult the catalog;
        # edit/delete actions are rendered per row based on the user's rights.
        domain = self._dsl_view_domain()
        name_q = (params.get('name') or '').strip()
        if name_q:
            domain = domain + [
                '|', ('name', 'ilike', name_q), ('acronym', 'ilike', name_q),
            ]

        url_args = {'name': name_q} if name_q else {}
        order, sortby, sortdir = self._portal_sort(params, {
            'acronym': 'acronym',
            'name': 'name',
            'version': 'version',
            'status': 'status',
        }, default_order='acronym, version desc')
        sort_qs = self._portal_sort_qs(url_args)
        if sortby:
            url_args = dict(url_args)
            url_args.update({'sortby': sortby, 'sortdir': sortdir})

        dsls, total, page_detail = paginate(
            Dsl, domain, '/dsl', page,
            url_args=url_args, order=order,
        )

        if is_admin:
            editable_dsl_ids = set(dsls.ids)
        elif request.env.user._is_public():
            editable_dsl_ids = set()
        else:
            editable_dsl_ids = set(self._maintained_dsl_ids())

        values = self._prepare_portal_layout_values()
        values.update({
            'dsls': dsls,
            'dsl_count': total,
            'page_name': 'dsls',
            'pager': page_detail,
            'default_url': '/dsl',
            'sortby': sortby,
            'sortdir': sortdir,
            'sort_base_url': '/dsl',
            'sort_qs': sort_qs,
            'filters': {'name': name_q},
            'can_manage_dsls': is_admin,
            'editable_dsl_ids': editable_dsl_ids,
            'show_dsl_management_columns': is_admin or bool(editable_dsl_ids),
            'dsl_message': params.get('message'),
            'dsl_error': params.get('error'),
        })
        return request.render('itlingo_website_portal.portal_dsl_list', values)

    # ──────────────────────────────────────────────
    # Create
    # ──────────────────────────────────────────────

    @route('/dsl/new', type='http', auth='user', website=True,
           methods=['GET', 'POST'])
    def portal_dsl_new(self, **post):
        self._itlingo_admin_or_raise()
        values = self._prepare_portal_layout_values()
        values.update({
            'page_name': 'dsl_new',
            'status_selection': request.env['itlingo.dsl']._fields['status'].selection,
            'form': {},
            'error': {},
        })
        if request.httprequest.method == 'POST':
            vals = self._dsl_form_values(post)
            values['form'] = vals
            error = self._dsl_validate(vals)
            if error:
                values['error'] = error
            else:
                try:
                    dsl = request.env['itlingo.dsl'].sudo().create(
                        self._dsl_write_vals(vals),
                    )
                except (UserError, ValidationError) as err:
                    values['error']['_form'] = str(err)
                else:
                    return request.redirect(f'/dsl/{dsl.id}?message=created')
        return request.render('itlingo_website_portal.portal_dsl_new', values)

    # ──────────────────────────────────────────────
    # Detail: read-only view for everyone, edit for admins/maintainers
    # ──────────────────────────────────────────────

    @route('/dsl/<int:dsl_id>', type='http', auth='public', website=True,
           methods=['GET', 'POST'])
    def portal_dsl_edit(self, dsl_id, **post):
        dsl = self._dsl_or_404(dsl_id)
        self._require_dsl_view(dsl)
        if not self._can_edit_dsl(dsl):
            if request.httprequest.method == 'POST':
                raise AccessError(_('You can only edit DSLs you maintain.'))
            values = self._prepare_portal_layout_values()
            values.update({
                'dsl': dsl,
                'page_name': 'dsl_view',
                'can_view_dsl_files': self._can_view_dsl_files(dsl),
            })
            return request.render(
                'itlingo_website_portal.portal_dsl_view', values,
            )
        values = self._prepare_portal_layout_values()
        values.update({
            'dsl': dsl,
            'page_name': 'dsl_edit',
            'status_selection': dsl._fields['status'].selection,
            'maintainers': dsl.maintainer_ids,
            'can_manage_dsls': self._itlingo_is_admin(),
            'form': {},
            'error': {},
            'dsl_message': request.params.get('message'),
            'dsl_error': request.params.get('error'),
            'can_edit_grammar': dsl.status == 'draft',
            'dsl_versions': request.env['itlingo.dsl'].sudo().search(
                [('acronym', '=', dsl.acronym)], order='version desc',
            ),
            'suggested_version': dsl._suggest_next_version(),
            'publish_error': request.session.pop('dsl_publish_error', None),
        })
        if request.httprequest.method == 'POST':
            vals = self._dsl_form_values(post)
            values['form'] = vals
            error = self._dsl_validate(vals, exclude_id=dsl.id)
            if error:
                values['error'] = error
            else:
                try:
                    dsl.write(self._dsl_write_vals(vals))
                except (UserError, ValidationError) as err:
                    values['error']['_form'] = str(err)
                else:
                    return request.redirect(f'/dsl/{dsl.id}?message=saved')
        return request.render('itlingo_website_portal.portal_dsl_edit', values)

    # ──────────────────────────────────────────────
    # Publication lifecycle
    # ──────────────────────────────────────────────

    @route('/dsl/<int:dsl_id>/publish', type='http', auth='user',
           website=True, methods=['POST'])
    def portal_dsl_publish(self, dsl_id, **post):
        dsl = self._dsl_or_404(dsl_id)
        self._itlingo_admin_or_raise()
        try:
            # ``dsl`` is sudo'd for access rights but keeps the request user,
            # so the publication audit records the real publisher. The server
            # revalidates the grammar; browser-reported validity is ignored.
            dsl.action_publish()
        except (UserError, ValidationError) as err:
            request.session['dsl_publish_error'] = str(err)
            return request.redirect(f'/dsl/{dsl.id}?error=publish_failed')
        return request.redirect(f'/dsl/{dsl.id}?message=published')

    @route('/dsl/<int:dsl_id>/create-draft', type='http', auth='user',
           website=True, methods=['POST'])
    def portal_dsl_create_draft(self, dsl_id, **post):
        dsl = self._dsl_or_404(dsl_id)
        self._require_dsl_edit(dsl)
        version = (post.get('version') or '').strip()
        try:
            draft = dsl.action_create_draft_version(version or None)
        except (UserError, ValidationError) as err:
            request.session['dsl_publish_error'] = str(err)
            return request.redirect(f'/dsl/{dsl.id}?error=draft_failed')
        return request.redirect(f'/dsl/{draft.id}?message=draft_created')

    # ──────────────────────────────────────────────
    # Files
    # ──────────────────────────────────────────────

    @route('/dsl/<int:dsl_id>/files/add', type='http', auth='user',
           website=True, methods=['POST'])
    def portal_dsl_file_add(self, dsl_id, **post):
        dsl = self._dsl_or_404(dsl_id)
        self._require_dsl_edit(dsl)
        file_type = post.get('file_type')
        if file_type not in DSL_FILE_TYPES:
            return request.redirect(f'/dsl/{dsl.id}?error=bad_type')
        if file_type in ('grammar', 'services'):
            self._require_structural_file_edit(dsl)
        upload = request.httprequest.files.get('file')
        if not upload or not upload.filename:
            return request.redirect(f'/dsl/{dsl.id}?error=no_file')
        try:
            request.env['itlingo.dsl.file'].sudo().create({
                'dsl_id': dsl.id,
                'file_type': file_type,
                'file': base64.b64encode(upload.read()),
                'file_name': upload.filename,
            })
        except (UserError, ValidationError):
            return request.redirect(f'/dsl/{dsl.id}?error=upload_failed')
        return request.redirect(f'/dsl/{dsl.id}?message=file_added')

    @route('/dsl/<int:dsl_id>/files/<int:file_id>/delete', type='http',
           auth='user', website=True, methods=['POST'])
    def portal_dsl_file_delete(self, dsl_id, file_id, **post):
        dsl = self._dsl_or_404(dsl_id)
        self._require_dsl_edit(dsl)
        line = self._dsl_file_or_404(dsl, file_id)
        if line.file_type in ('grammar', 'services'):
            self._require_structural_file_edit(dsl)
        line.unlink()
        return request.redirect(f'/dsl/{dsl.id}?message=file_removed')

    @route('/dsl/<int:dsl_id>/files/<int:file_id>/toggle', type='http',
           auth='user', website=True, methods=['POST'])
    def portal_dsl_file_toggle(self, dsl_id, file_id, **post):
        dsl = self._dsl_or_404(dsl_id)
        self._require_dsl_edit(dsl)
        line = self._dsl_file_or_404(dsl, file_id)
        if line.file_type in ('grammar', 'services'):
            self._require_structural_file_edit(dsl)
        line.write({'is_enabled': not line.is_enabled})
        return request.redirect(f'/dsl/{dsl.id}?message=file_updated')

    @route('/dsl/<int:dsl_id>/files/<int:file_id>/download', type='http',
           auth='public', website=True)
    def portal_dsl_file_download(self, dsl_id, file_id, **kw):
        dsl = self._dsl_or_404(dsl_id)
        self._require_dsl_files(dsl)
        line = self._dsl_file_or_404(dsl, file_id)
        if not line.file:
            return request.not_found()
        raw = base64.b64decode(line.file)
        return request.make_response(
            raw,
            headers=[
                ('Content-Type', 'application/octet-stream'),
                ('Content-Disposition', content_disposition(line.file_name or 'file')),
            ],
        )

    # ──────────────────────────────────────────────
    # Maintainers
    # ──────────────────────────────────────────────

    @route('/dsl/<int:dsl_id>/maintainers/add', type='http', auth='user',
           website=True, methods=['POST'])
    def portal_dsl_maintainer_add(self, dsl_id, **post):
        self._itlingo_admin_or_raise()
        dsl = self._dsl_or_404(dsl_id)
        email = (post.get('email') or '').strip()
        if not email:
            return request.redirect(f'/dsl/{dsl.id}?error=maint_email_required')
        Users = request.env['res.users'].sudo()
        user = Users.search([('login', '=', email)], limit=1)
        if not user:
            user = Users.search([('login', '=ilike', email)], limit=1)
        if not user:
            user = Users.search([('email', '=ilike', email)], limit=1)
        if not user:
            return request.redirect(f'/dsl/{dsl.id}?error=maint_user_not_found')
        if user in dsl.maintainer_ids:
            return request.redirect(f'/dsl/{dsl.id}?error=maint_already')
        dsl.write({'maintainer_ids': [(4, user.id)]})
        return request.redirect(f'/dsl/{dsl.id}?message=maint_added')

    @route('/dsl/<int:dsl_id>/maintainers/<int:user_id>/remove', type='http',
           auth='user', website=True, methods=['POST'])
    def portal_dsl_maintainer_remove(self, dsl_id, user_id, **post):
        self._itlingo_admin_or_raise()
        dsl = self._dsl_or_404(dsl_id)
        dsl.write({'maintainer_ids': [(3, user_id)]})
        return request.redirect(f'/dsl/{dsl.id}?message=maint_removed')

    # ──────────────────────────────────────────────
    # Delete
    # ──────────────────────────────────────────────

    @route('/dsl/<int:dsl_id>/delete', type='http', auth='user',
           website=True, methods=['POST'])
    def portal_dsl_delete(self, dsl_id, **post):
        self._itlingo_admin_or_raise()
        dsl = self._dsl_or_404(dsl_id)
        dsl.unlink()
        return request.redirect('/dsl?message=deleted')
