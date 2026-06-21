import base64

from odoo import _, http
from odoo.exceptions import AccessError, MissingError, UserError
from odoo.http import request, route, content_disposition
from odoo.addons.portal.controllers.portal import CustomerPortal, pager


class ITLingoPortal(CustomerPortal):

    @route(['/my', '/my/home'], type='http', auth='user', website=True)
    def home(self, **kw):
        return request.redirect('/')

    # ──────────────────────────────────────────────
    # Welcome: post-registration org creation
    # ──────────────────────────────────────────────

    @route('/welcome/create-organization', type='http', auth='user',
           website=True, methods=['GET', 'POST'])
    def welcome_create_organization(self, **post):
        user = request.env.user
        if not user.org_setup_pending:
            return request.redirect('/')

        values = self._prepare_portal_layout_values()
        values.update({'form': {}, 'error': {}})

        allowed_types = {'private', 'public'}
        allowed_activity = {
            'it', 'marketing', 'consulting', 'finance', 'education', 'other',
        }

        if request.httprequest.method == 'POST':
            if post.get('skip'):
                user.sudo().org_setup_pending = False
                return request.redirect('/')

            name = (post.get('name') or '').strip()
            org_type = post.get('organization_type') or 'private'
            activity = post.get('activity_type') or 'it'
            values['form'] = dict(post)

            if not name:
                values['error']['name'] = _('Name is required.')
            elif org_type not in allowed_types:
                values['error']['name'] = _('Invalid organization type.')
            elif activity not in allowed_activity:
                values['error']['name'] = _('Invalid activity type.')
            else:
                Org = request.env['itlingo.organization'].sudo()
                Role = request.env['itlingo.organization.role'].sudo()
                org = Org.create({
                    'name': name,
                    'organization_type': org_type,
                    'activity_type': activity,
                })
                Role.create({
                    'organization_id': org.id,
                    'user_id': user.id,
                    'role': 'org_manager',
                    'state': 'accepted',
                })
                user.sudo().org_setup_pending = False
                return request.redirect('/')

        return request.render(
            'itlingo_website_portal.portal_welcome_create_organization', values,
        )

    @route('/welcome/skip-organization', type='http', auth='user',
           website=True, methods=['POST'])
    def welcome_skip_organization(self, **post):
        request.env.user.sudo().org_setup_pending = False
        return request.redirect('/')

    def _send_signup_invitation_email(self, email):
        base_url = request.env['ir.config_parameter'].sudo().get_param('web.base.url')
        signup_url = f'{base_url}/web/signup'
        company = request.env.company
        body = (
            '<div style="font-family: Arial, sans-serif; max-width: 600px;">'
            '<h2>You\'ve been invited to ITLingo Cloud</h2>'
            '<p>Hello,</p>'
            '<p>You have been invited to collaborate on '
            '<strong>ITLingo Cloud</strong>.</p>'
            '<p>Create your account using the email address '
            'this message was sent to:</p>'
            '<p style="margin: 24px 0;">'
            f'<a href="{signup_url}" '
            'style="background-color: #714B67; color: white; '
            'padding: 12px 24px; text-decoration: none; '
            'border-radius: 4px; display: inline-block;">'
            'Create Account</a></p>'
            '<p style="color: #666; font-size: 12px;">'
            'If the button doesn\'t work, copy and paste this link '
            f'into your browser:<br/>{signup_url}</p>'
            '</div>'
        )
        mail = request.env['mail.mail'].sudo().create({
            'subject': "You've been invited to join ITLingo Cloud",
            'body_html': body,
            'email_to': email,
            'email_from': company.email_formatted or company.email or '',
        })
        mail.send()

    def _portal_workspace_role(self, user, project_id):
        return request.env['itlingo.project.role'].sudo().search([
            ('user_id', '=', user.id),
            ('project_id', '=', project_id),
            ('state', '=', 'accepted'),
        ], limit=1)

    def _portal_public_workspace_project(self, project_id):
        project = request.env['itlingo.workspace'].sudo().browse(project_id)
        if project.exists() and project.is_public_workspace:
            return project
        return None

    def _portal_ws_maybe_redirect_public_to_my(self, project_id, path_suffix=''):
        """Send workspace members to /my/workspaces when they use public hub URLs."""
        role = self._portal_workspace_role(request.env.user, project_id)
        if role:
            return request.redirect(f'/my/workspaces/{project_id}{path_suffix}')
        return None

    def _portal_workspace_hub_common(self, project, hub_page, public_hub=False):
        """Shared layout flags for workspace hub templates."""
        pid = project.id
        if public_hub:
            return {
                'ws_hub_prefix': f'/public-workspaces/{pid}',
                'workspace_hub_public': True,
                'workspace_hub': True,
                'workspace_hub_page': hub_page,
                'itoi_launch_path': f'/itoi/launch/public/{pid}',
            }
        return {
            'ws_hub_prefix': f'/my/workspaces/{pid}',
            'workspace_hub_public': False,
            'workspace_hub': True,
            'workspace_hub_page': hub_page,
            'itoi_launch_path': f'/itoi/launch/{pid}',
        }

    def _prepare_home_portal_values(self, counters):
        values = super()._prepare_home_portal_values(counters)
        user = request.env.user

        if 'organization_count' in counters:
            org_roles = request.env['itlingo.organization.role'].sudo().search([
                ('user_id', '=', user.id),
                ('state', '=', 'accepted'),
            ])
            values['organization_count'] = len(org_roles)

        if 'workspace_count' in counters:
            ws_roles = request.env['itlingo.project.role'].sudo().search([
                ('user_id', '=', user.id),
                ('state', '=', 'accepted'),
            ])
            values['workspace_count'] = len(ws_roles)

        if 'invitation_count' in counters:
            org_pending = request.env['itlingo.organization.role'].sudo().search_count([
                ('user_id', '=', user.id),
                ('state', '=', 'pending'),
            ])
            ws_pending = request.env['itlingo.project.role'].sudo().search_count([
                ('user_id', '=', user.id),
                ('state', '=', 'pending'),
            ])
            values['invitation_count'] = org_pending + ws_pending

        return values

    # ──────────────────────────────────────────────
    # Organizations
    # ──────────────────────────────────────────────

    def _portal_org_access(self, org_id):
        """Return (organization, user_role) or raise."""
        user = request.env.user
        org = request.env['itlingo.organization'].sudo().browse(org_id)
        if not org.exists():
            raise MissingError(_('Organization not found.'))
        user_role = request.env['itlingo.organization.role'].sudo().search([
            ('user_id', '=', user.id),
            ('organization_id', '=', org_id),
            ('state', '=', 'accepted'),
        ], limit=1)
        if not user_role:
            raise AccessError(_('You do not have access to this organization.'))
        return org, user_role

    def _portal_org_role_line(self, org_id, role_id):
        Role = request.env['itlingo.organization.role'].sudo()
        line = Role.browse(role_id)
        if not line.exists() or line.organization_id.id != org_id:
            raise MissingError(_('Member not found.'))
        return line

    def _portal_org_accepted_manager_count(self, org_id):
        Role = request.env['itlingo.organization.role'].sudo()
        return Role.search_count([
            ('organization_id', '=', org_id),
            ('state', '=', 'accepted'),
            ('role', '=', 'org_manager'),
        ])

    def _portal_org_list_filters_domain(self, org_ids, params):
        domain = [('id', 'in', org_ids)]
        name_q = (params.get('name') or '').strip()
        if name_q:
            domain.append(('name', 'ilike', f'%{name_q}%'))
        privacy = []
        if params.get('privacy_private') == '1':
            privacy.append('private')
        if params.get('privacy_public') == '1':
            privacy.append('public')
        if privacy:
            domain.append(('organization_type', 'in', privacy))
        states = []
        if params.get('state_active') == '1':
            states.append('active')
        if params.get('state_suspended') == '1':
            states.append('suspended')
        if states:
            domain.append(('state', 'in', states))
        return domain, name_q

    def _portal_org_list_url_args(self, params, name_q):
        url_args = {}
        if name_q:
            url_args['name'] = name_q
        if params.get('privacy_private') == '1':
            url_args['privacy_private'] = '1'
        if params.get('privacy_public') == '1':
            url_args['privacy_public'] = '1'
        if params.get('state_active') == '1':
            url_args['state_active'] = '1'
        if params.get('state_suspended') == '1':
            url_args['state_suspended'] = '1'
        return url_args

    # Workspace list filters (GET)
    _WS_ROLE_FILTER_KEYS = (
        'ws_manager', 'doc_manager', 'ws_member',
    )

    def _portal_ws_list_role_keys_from_params(self, params):
        keys = []
        for key in self._WS_ROLE_FILTER_KEYS:
            if params.get(f'role_{key}') == '1':
                keys.append(key)
        return keys

    def _portal_ws_list_filtered_project_ids(self, user, params):
        """Return (project_ids, role_map dict) after role filter."""
        WsRole = request.env['itlingo.project.role'].sudo()
        roles = WsRole.search([
            ('user_id', '=', user.id),
            ('state', '=', 'accepted'),
        ])
        role_map = {}
        for role in roles:
            role_map[role.project_id.id] = role
        role_keys = self._portal_ws_list_role_keys_from_params(params)
        project_ids = list(role_map.keys())
        if role_keys:
            project_ids = [
                pid for pid in project_ids
                if role_map[pid].role in role_keys
            ]
        return project_ids, role_map

    def _portal_ws_list_filters_domain(self, project_ids, params):
        domain = [('id', 'in', project_ids)]
        name_q = (params.get('name') or '').strip()
        if name_q:
            domain.append(('name', 'ilike', f'%{name_q}%'))
        pub_sel = []
        if params.get('public_ws') == '1':
            pub_sel.append(True)
        if params.get('private_ws') == '1':
            pub_sel.append(False)
        if len(pub_sel) == 1:
            domain.append(('is_public_workspace', '=', pub_sel[0]))
        return domain, name_q

    def _portal_ws_list_url_args(self, params, name_q):
        url_args = {}
        if name_q:
            url_args['name'] = name_q
        for key in self._WS_ROLE_FILTER_KEYS:
            if params.get(f'role_{key}') == '1':
                url_args[f'role_{key}'] = '1'
        if params.get('public_ws') == '1':
            url_args['public_ws'] = '1'
        if params.get('private_ws') == '1':
            url_args['private_ws'] = '1'
        return url_args

    @route(['/my/organizations', '/my/organizations/page/<int:page>'],
           type='http', auth='user', website=True)
    def portal_my_organizations(self, page=1, sortby=None, **kw):
        user = request.env.user
        params = request.params
        OrgRole = request.env['itlingo.organization.role'].sudo()

        roles = OrgRole.search([
            ('user_id', '=', user.id),
            ('state', '=', 'accepted'),
        ])
        org_ids = roles.mapped('organization_id').ids
        Org = request.env['itlingo.organization'].sudo()
        domain, name_q = self._portal_org_list_filters_domain(org_ids, params)
        url_args = self._portal_org_list_url_args(params, name_q)

        org_count = Org.search_count(domain)
        page_detail = pager(
            url='/my/organizations',
            total=org_count,
            page=page,
            step=10,
            url_args=url_args or None,
        )
        organizations = Org.search(
            domain,
            limit=10,
            offset=page_detail['offset'],
            order='name',
        )

        role_map = {}
        for role in roles:
            role_map[role.organization_id.id] = role

        values = self._prepare_portal_layout_values()
        values.update({
            'organizations': organizations,
            'role_map': role_map,
            'page_name': 'organizations',
            'pager': page_detail,
            'default_url': '/my/organizations',
            'filters': {
                'name': name_q,
                'privacy_private': params.get('privacy_private') == '1',
                'privacy_public': params.get('privacy_public') == '1',
                'state_active': params.get('state_active') == '1',
                'state_suspended': params.get('state_suspended') == '1',
            },
            'org_list_error': params.get('error'),
            'org_list_message': params.get('message'),
        })
        return request.render('itlingo_website_portal.portal_my_organizations', values)

    @route('/my/organizations/new', type='http', auth='user', website=True,
           methods=['GET', 'POST'])
    def portal_organization_new(self, **post):
        values = self._prepare_portal_layout_values()
        values.update({
            'page_name': 'organization_new',
            'form': {},
            'error': {},
        })
        allowed_types = {'private', 'public'}
        allowed_activity = {
            'it', 'marketing', 'consulting', 'finance', 'education', 'other',
        }
        if request.httprequest.method == 'POST':
            name = (post.get('name') or '').strip()
            org_type = post.get('organization_type') or 'private'
            activity = post.get('activity_type') or 'it'
            values['form'] = dict(post)
            if not name:
                values['error']['name'] = _('Name is required.')
            elif org_type not in allowed_types:
                values['error']['name'] = _('Invalid organization type.')
            elif activity not in allowed_activity:
                values['error']['name'] = _('Invalid activity type.')
            else:
                Org = request.env['itlingo.organization'].sudo()
                Role = request.env['itlingo.organization.role'].sudo()
                org = Org.create({
                    'name': name,
                    'organization_type': org_type,
                    'activity_type': activity,
                })
                Role.create({
                    'organization_id': org.id,
                    'user_id': request.env.user.id,
                    'role': 'org_manager',
                    'state': 'accepted',
                })
                return request.redirect(f'/my/organizations/{org.id}')
        return request.render('itlingo_website_portal.portal_organization_new', values)

    @route(
        '/my/organizations/<int:org_id>/delete',
        type='http', auth='user', website=True, methods=['POST'],
    )
    def portal_organization_delete(self, org_id, **post):
        org, user_role = self._portal_org_access(org_id)
        if user_role.role != 'org_manager':
            raise AccessError(
                _('Only organization managers can delete this organization.'),
            )
        Project = request.env['itlingo.workspace'].sudo()
        if Project.search_count([('organization_id', '=', org_id)]):
            return request.redirect(
                '/my/organizations?error=org_delete_has_workspaces',
            )
        org.unlink()
        return request.redirect('/my/organizations?message=org_deleted')

    @route(
        '/my/organizations/<int:org_id>/users/invite',
        type='http', auth='user', website=True, methods=['POST'],
    )
    def portal_organization_users_invite(self, org_id, **post):
        _, actor_role = self._portal_org_access(org_id)
        if actor_role.role != 'org_manager':
            raise AccessError(_('Only organization managers can invite members.'))
        email = (post.get('email') or '').strip()
        role_key = post.get('role') or 'org_member'
        allowed_roles = {'org_manager', 'org_member', 'doc_manager'}
        if role_key not in allowed_roles:
            return request.redirect(
                f'/my/organizations/{org_id}/users?error=invite_bad_role',
            )
        if not email:
            return request.redirect(
                f'/my/organizations/{org_id}/users?error=invite_email_required',
            )
        Users = request.env['res.users'].sudo()
        invitee = Users.search([('login', '=', email)], limit=1)
        if not invitee:
            invitee = Users.search([('login', '=ilike', email)], limit=1)
        if not invitee:
            invitee = Users.search([('email', '=ilike', email)], limit=1)
        if not invitee:
            Pending = request.env['itlingo.pending.invitation'].sudo()
            already_pending = Pending.search([
                ('email', '=ilike', email),
                ('organization_id', '=', org_id),
            ], limit=1)
            if already_pending:
                self._send_signup_invitation_email(email)
                return request.redirect(
                    f'/my/organizations/{org_id}/users?message=invite_resent',
                )
            partner = request.env['res.partner'].sudo().search(
                [('email', '=ilike', email)], limit=1,
            )
            if not partner:
                partner = request.env['res.partner'].sudo().create({
                    'name': email.split('@')[0],
                    'email': email,
                })
            Pending.create({
                'email': email,
                'organization_id': org_id,
                'role': role_key,
                'invited_by_id': request.env.user.id,
            })
            self._send_signup_invitation_email(email)
            return request.redirect(
                f'/my/organizations/{org_id}/users?message=invite_sent',
            )
        Role = request.env['itlingo.organization.role'].sudo()
        existing = Role.search([
            ('organization_id', '=', org_id),
            ('user_id', '=', invitee.id),
        ], limit=1)
        if existing:
            return request.redirect(
                f'/my/organizations/{org_id}/users?error=invite_already_member',
            )
        Role.create({
            'organization_id': org_id,
            'user_id': invitee.id,
            'role': role_key,
            'state': 'pending',
        })
        return request.redirect(
            f'/my/organizations/{org_id}/users?message=invite_sent',
        )

    @route(
        '/my/organizations/<int:org_id>/users/<int:role_id>/role',
        type='http', auth='user', website=True, methods=['POST'],
    )
    def portal_organization_user_role(self, org_id, role_id, **post):
        _, actor_role = self._portal_org_access(org_id)
        if actor_role.role != 'org_manager':
            raise AccessError(_('Only organization managers can change roles.'))
        target = self._portal_org_role_line(org_id, role_id)
        if target.state != 'accepted':
            return request.redirect(
                f'/my/organizations/{org_id}/users?error=role_not_accepted',
            )
        new_role = (post.get('role') or '').strip()
        allowed_roles = {'org_manager', 'org_member', 'doc_manager'}
        if new_role not in allowed_roles:
            return request.redirect(
                f'/my/organizations/{org_id}/users?error=role_invalid',
            )
        mgr_count = self._portal_org_accepted_manager_count(org_id)
        if target.role == 'org_manager' and new_role != 'org_manager':
            if mgr_count <= 1:
                return request.redirect(
                    f'/my/organizations/{org_id}/users?error=last_manager',
                )
        target.write({'role': new_role})
        return request.redirect(
            f'/my/organizations/{org_id}/users?message=role_updated',
        )

    @route(
        '/my/organizations/<int:org_id>/users/<int:role_id>/remove',
        type='http', auth='user', website=True, methods=['POST'],
    )
    def portal_organization_user_remove(self, org_id, role_id, **post):
        _, actor_role = self._portal_org_access(org_id)
        if actor_role.role != 'org_manager':
            raise AccessError(_('Only organization managers can remove members.'))
        target = self._portal_org_role_line(org_id, role_id)
        if target.state != 'accepted':
            return request.redirect(
                f'/my/organizations/{org_id}/users?error=remove_not_accepted',
            )
        mgr_count = self._portal_org_accepted_manager_count(org_id)
        if target.role == 'org_manager' and mgr_count <= 1:
            return request.redirect(
                f'/my/organizations/{org_id}/users?error=last_manager',
            )
        target.unlink()
        return request.redirect(
            f'/my/organizations/{org_id}/users?message=member_removed',
        )

    @route(
        '/my/organizations/<int:org_id>/leave',
        type='http', auth='user', website=True, methods=['POST'],
    )
    def portal_organization_leave(self, org_id, **post):
        org, user_role = self._portal_org_access(org_id)
        OrgRole = request.env['itlingo.organization.role'].sudo()
        accepted = OrgRole.search([
            ('organization_id', '=', org_id),
            ('state', '=', 'accepted'),
        ])
        if len(accepted) <= 1:
            Project = request.env['itlingo.workspace'].sudo()
            if Project.search_count([('organization_id', '=', org_id)]):
                return request.redirect(
                    '/my/organizations?error=org_delete_has_workspaces',
                )
            try:
                org.sudo().unlink()
            except UserError:
                return request.redirect(
                    f'/my/organizations/{org_id}/users?error=leave_failed',
                )
            return request.redirect('/my/organizations?message=org_deleted_self_leave')
        is_last_manager = (
            user_role.role == 'org_manager'
            and self._portal_org_accepted_manager_count(org_id) <= 1
        )
        if is_last_manager:
            return request.redirect(f'/my/organizations/{org_id}/leave/promote')
        user_role.unlink()
        return request.redirect('/my/organizations?message=left_organization')

    @route(
        '/my/organizations/<int:org_id>/leave/promote',
        type='http', auth='user', website=True, methods=['GET', 'POST'],
    )
    def portal_organization_leave_promote(self, org_id, **post):
        org, user_role = self._portal_org_access(org_id)
        if user_role.role != 'org_manager':
            return request.redirect(f'/my/organizations/{org_id}/users')
        OrgRole = request.env['itlingo.organization.role'].sudo()
        candidates = OrgRole.search([
            ('organization_id', '=', org_id),
            ('state', '=', 'accepted'),
            ('user_id', '!=', request.env.user.id),
        ])
        if not candidates:
            return request.redirect(f'/my/organizations/{org_id}/users')
        values = self._prepare_portal_layout_values()
        values.update({
            'organization': org,
            'user_role': user_role,
            'candidates': candidates,
            'organization_hub': True,
            'org_hub_page': 'users',
            'page_name': 'organization_leave_promote',
            'error': None,
        })
        if request.httprequest.method == 'POST':
            try:
                successor_role_id = int(post.get('successor_role_id') or 0)
            except (TypeError, ValueError):
                successor_role_id = 0
            successor = candidates.filtered(lambda r: r.id == successor_role_id)
            if not successor:
                values['error'] = _('Pick a member to promote before leaving.')
                return request.render(
                    'itlingo_website_portal.portal_organization_leave_promote',
                    values,
                )
            successor.write({'role': 'org_manager'})
            user_role.unlink()
            return request.redirect('/my/organizations?message=left_organization')
        return request.render(
            'itlingo_website_portal.portal_organization_leave_promote', values,
        )

    def _template_type_id(self):
        """Id of the 'Template' document type, or False when unavailable."""
        t = request.env.ref(
            'itlingo_documents.doc_type_template', raise_if_not_found=False,
        )
        return t.id if t else False

    def _apply_template_vals(self, vals, post):
        """Set the template output pattern when the chosen type is 'Template'."""
        Doc = request.env['itlingo.document']
        if 'output_filename_pattern' not in Doc._fields:
            return
        tpl_type_id = self._template_type_id()
        is_template = bool(tpl_type_id) and vals.get('document_type_id') == tpl_type_id
        vals['output_filename_pattern'] = (
            (post.get('output_filename_pattern') or '').strip()
            if is_template else False
        )

    # ──────────────────────────────────────────────
    # Documents (scoped under a workspace or organization)
    # ──────────────────────────────────────────────

    # Roles allowed to add / edit / delete documents in each scope. Plain
    # members (and users with no role) can only view and download.
    _DOC_EDIT_WS_ROLES = ('ws_manager', 'doc_manager')
    _DOC_EDIT_ORG_ROLES = ('org_manager', 'doc_manager')

    def _portal_ws_document_or_404(self, project_id, document_id):
        """Return (project, user_role, document) for a workspace document.

        Access to the workspace is enforced by ``_portal_ws_access``. The
        document is returned only when it belongs to that workspace, otherwise
        ``document`` is None so the caller can answer 404.
        """
        project, user_role = self._portal_ws_access(project_id)
        doc = request.env['itlingo.document'].sudo().browse(document_id)
        if not doc.exists() or doc.project_id.id != project_id:
            return project, user_role, None
        return project, user_role, doc

    def _portal_org_document_or_404(self, org_id, document_id):
        """Return (organization, user_role, document) for an org document."""
        org, user_role = self._portal_org_access(org_id)
        doc = request.env['itlingo.document'].sudo().browse(document_id)
        if not doc.exists() or doc.organization_id.id != org_id:
            return org, user_role, None
        return org, user_role, doc

    def _portal_document_download_response(self, document):
        """Stream a document's file as a download (any viewer may download)."""
        if not document.document_file:
            return request.not_found()
        raw = base64.b64decode(document.document_file)
        fname = document.file_name or 'document'
        return request.make_response(
            raw,
            headers=[
                ('Content-Type', 'application/octet-stream'),
                ('Content-Disposition', content_disposition(fname)),
            ],
        )

    def _portal_document_edit_flow(self, document, doc_base_url, post):
        """Shared GET/POST edit handler for a scoped document.

        Returns a rendered response or a redirect. The caller must have verified
        edit permission before calling. ``doc_base_url`` is the scoped documents
        URL (e.g. /my/workspaces/5/documents) used to build action/redirect URLs.
        """
        DocType = request.env['itlingo.document.type'].sudo()
        doc_types = DocType.search([], order='name')
        status_selection = document._fields['status'].selection
        template_type = request.env.ref(
            'itlingo_documents.doc_type_template', raise_if_not_found=False,
        )
        template_type_id = template_type.id if template_type else False
        has_pattern = 'output_filename_pattern' in document._fields
        values = self._prepare_portal_layout_values()
        values.update({
            'document': document,
            'doc_base_url': doc_base_url,
            'doc_types': doc_types,
            'status_selection': status_selection,
            'template_type_id': template_type_id,
            'form': {
                'name': document.name,
                'document_type_id': document.document_type_id.id or '',
                'dsl_knowledge': document.dsl_knowledge,
                'status': document.status,
                'version': document.version or '',
                'output_filename_pattern': (
                    document.output_filename_pattern or '' if has_pattern else ''
                ),
            },
            'error': {},
            'page_name': 'document_edit',
        })
        if request.httprequest.method == 'POST':
            name = (post.get('name') or '').strip()
            values['form'] = dict(post)
            raw_type = post.get('document_type_id')
            try:
                type_id = int(raw_type) if raw_type else False
            except (TypeError, ValueError):
                type_id = False
            dsl_knowledge = post.get('dsl_knowledge') == '1'
            values['form']['dsl_knowledge'] = dsl_knowledge
            output_pattern = (post.get('output_filename_pattern') or '').strip()
            values['form']['output_filename_pattern'] = output_pattern
            status = (post.get('status') or '').strip()
            version = (post.get('version') or '').strip()
            allowed_status = {key for key, _label in status_selection}
            final_status = status or document.status
            upload = request.httprequest.files.get('document_file')
            if not name:
                values['error']['name'] = _('Name is required.')
            elif type_id and type_id not in doc_types.ids:
                values['error']['document_type_id'] = _('Invalid document type.')
            elif status and status not in allowed_status:
                values['error']['status'] = _('Invalid status.')
            elif dsl_knowledge and final_status != 'published':
                values['error']['dsl_knowledge'] = _(
                    'A document must be published before it can be marked as '
                    'DSL knowledge.',
                )
            else:
                write_vals = {
                    'name': name,
                    'document_type_id': type_id or False,
                    'dsl_knowledge': dsl_knowledge,
                    'status': final_status,
                    'version': version or document.version,
                }
                if has_pattern:
                    is_tpl_type = bool(template_type_id) and type_id == template_type_id
                    write_vals['output_filename_pattern'] = (
                        output_pattern if is_tpl_type else False
                    )
                if upload and upload.filename:
                    write_vals['file_name'] = upload.filename
                    write_vals['document_file'] = base64.b64encode(upload.read())
                try:
                    document.sudo().write(write_vals)
                except UserError as err:
                    values['error']['_form'] = str(err)
                else:
                    return request.redirect(f'{doc_base_url}/{document.id}')
        return request.render('itlingo_documents.portal_document_edit', values)

    @route(
        '/my/organizations/<int:org_id>/documents/new',
        type='http', auth='user', website=True, methods=['GET', 'POST'],
    )
    def portal_organization_documentation_new(self, org_id, **post):
        org, user_role = self._portal_org_access(org_id)
        if user_role.role not in self._DOC_EDIT_ORG_ROLES:
            raise AccessError(
                _('Only organization or document managers can add documents.'),
            )
        DocType = request.env['itlingo.document.type'].sudo()
        doc_types = DocType.search([], order='name')
        values = self._prepare_portal_layout_values()
        values.update({
            'organization': org,
            'user_role': user_role,
            'doc_types': doc_types,
            'template_type_id': self._template_type_id(),
            'page_name': 'organization_documentation_new',
            'organization_hub': True,
            'org_hub_page': 'documentation',
            'form': {},
            'error': {},
        })
        if request.httprequest.method == 'POST':
            name = (post.get('name') or '').strip()
            values['form'] = dict(post)
            raw_type = post.get('document_type_id')
            try:
                type_id = int(raw_type) if raw_type else False
            except (TypeError, ValueError):
                type_id = False
            upload = request.httprequest.files.get('document_file')
            if not name:
                values['error']['name'] = _('Name is required.')
            elif type_id and type_id not in doc_types.ids:
                values['error']['document_type_id'] = _('Invalid document type.')
            else:
                file_b64 = False
                fname = False
                if upload and upload.filename:
                    fname = upload.filename
                    file_b64 = base64.b64encode(upload.read())
                doc_vals = {
                    'name': name,
                    'organization_id': org_id,
                    'document_type_id': type_id or False,
                    'document_file': file_b64 or False,
                    'file_name': fname or False,
                    'status': 'draft',
                    'creator_id': request.env.user.id,
                }
                self._apply_template_vals(doc_vals, post)
                try:
                    request.env['itlingo.document'].sudo().create(doc_vals)
                except UserError as err:
                    values['error']['_form'] = str(err)
                else:
                    return request.redirect(
                        f'/my/organizations/{org_id}/documents',
                    )
        return request.render(
            'itlingo_website_portal.portal_organization_hub_documentation_new',
            values,
        )

    @route('/my/organizations/<int:org_id>/workspaces',
           type='http', auth='user', website=True)
    def portal_organization_workspaces(self, org_id, **kw):
        org, user_role = self._portal_org_access(org_id)
        accessible_role_ids = request.env['itlingo.project.role'].sudo().search([
            ('user_id', '=', request.env.user.id),
            ('state', '=', 'accepted'),
            ('project_id.organization_id', '=', org_id),
        ]).mapped('project_id').ids
        projects = request.env['itlingo.workspace'].sudo().search([
            ('organization_id', '=', org_id),
            ('id', 'in', accessible_role_ids),
        ], order='name')
        values = self._prepare_portal_layout_values()
        values.update({
            'organization': org,
            'user_role': user_role,
            'projects': projects,
            'page_name': 'organization_workspaces',
            'organization_hub': True,
            'org_hub_page': 'workspaces',
        })
        return request.render(
            'itlingo_website_portal.portal_organization_hub_workspaces',
            values,
        )

    @route('/my/organizations/<int:org_id>/documents',
           type='http', auth='user', website=True)
    def portal_organization_documentation(self, org_id, **kw):
        org, user_role = self._portal_org_access(org_id)
        Document = request.env['itlingo.document'].sudo()
        documents = Document.search([
            ('organization_id', '=', org_id),
        ], order='creation_date desc, name')
        values = self._prepare_portal_layout_values()
        values.update({
            'organization': org,
            'user_role': user_role,
            'documents': documents,
            'can_upload_org_documents': user_role.role in self._DOC_EDIT_ORG_ROLES,
            'doc_message': request.params.get('message'),
            'doc_error': request.params.get('error'),
            'page_name': 'organization_documentation',
            'organization_hub': True,
            'org_hub_page': 'documentation',
        })
        return request.render(
            'itlingo_website_portal.portal_organization_hub_documentation',
            values,
        )

    @route(
        '/my/organizations/<int:org_id>/documents/<int:document_id>',
        type='http', auth='user', website=True,
    )
    def portal_organization_document_detail(self, org_id, document_id, **kw):
        _org, user_role, document = self._portal_org_document_or_404(
            org_id, document_id,
        )
        if not document:
            return request.not_found()
        values = self._prepare_portal_layout_values()
        values.update({
            'document': document,
            'doc_base_url': f'/my/organizations/{org_id}/documents',
            'can_edit_document': user_role.role in self._DOC_EDIT_ORG_ROLES,
            'page_name': 'document_detail',
        })
        return request.render('itlingo_documents.portal_document_detail', values)

    @route(
        '/my/organizations/<int:org_id>/documents/<int:document_id>/edit',
        type='http', auth='user', website=True, methods=['GET', 'POST'],
    )
    def portal_organization_document_edit(self, org_id, document_id, **post):
        _org, user_role, document = self._portal_org_document_or_404(
            org_id, document_id,
        )
        if not document:
            return request.not_found()
        if user_role.role not in self._DOC_EDIT_ORG_ROLES:
            raise AccessError(_('You cannot edit this document.'))
        return self._portal_document_edit_flow(
            document, f'/my/organizations/{org_id}/documents', post,
        )

    @route(
        '/my/organizations/<int:org_id>/documents/<int:document_id>/delete',
        type='http', auth='user', website=True, methods=['POST'],
    )
    def portal_organization_document_delete(self, org_id, document_id, **post):
        _org, user_role, document = self._portal_org_document_or_404(
            org_id, document_id,
        )
        if not document:
            return request.not_found()
        if user_role.role not in self._DOC_EDIT_ORG_ROLES:
            raise AccessError(_('You cannot delete this document.'))
        base_url = f'/my/organizations/{org_id}/documents'
        try:
            document.sudo().unlink()
        except UserError:
            return request.redirect(f'{base_url}/{document_id}?error=delete_failed')
        return request.redirect(f'{base_url}?message=doc_deleted')

    @route(
        '/my/organizations/<int:org_id>/documents/<int:document_id>/download',
        type='http', auth='user', website=True,
    )
    def portal_organization_document_download(self, org_id, document_id, **kw):
        _org, _user_role, document = self._portal_org_document_or_404(
            org_id, document_id,
        )
        if not document:
            return request.not_found()
        return self._portal_document_download_response(document)

    @route('/my/organizations/<int:org_id>/users',
           type='http', auth='user', website=True)
    def portal_organization_users(self, org_id, **kw):
        org, user_role = self._portal_org_access(org_id)
        members = request.env['itlingo.organization.role'].sudo().search([
            ('organization_id', '=', org_id),
            ('state', '=', 'accepted'),
        ], order='user_id')
        params = request.params
        values = self._prepare_portal_layout_values()
        values.update({
            'organization': org,
            'user_role': user_role,
            'members': members,
            'can_manage_org_users': user_role.role == 'org_manager',
            'org_users_error': params.get('error'),
            'org_users_message': params.get('message'),
            'page_name': 'organization_users',
            'organization_hub': True,
            'org_hub_page': 'users',
        })
        return request.render(
            'itlingo_website_portal.portal_organization_hub_users',
            values,
        )

    @route(
        '/my/organizations/<int:org_id>/settings',
        type='http', auth='user', website=True, methods=['GET', 'POST'],
    )
    def portal_organization_settings(self, org_id, **post):
        org, user_role = self._portal_org_access(org_id)
        if user_role.role != 'org_manager':
            raise AccessError(_('Only organization managers can change settings.'))

        allowed_types = {'private', 'public'}
        allowed_activity = {
            'it', 'marketing', 'consulting', 'finance', 'education', 'other',
        }
        Country = request.env['res.country'].sudo()
        countries = Country.search([], order='name')
        OrgModel = request.env['itlingo.organization']
        activity_type_selection = [
            {'value': key, 'label': label}
            for key, label in OrgModel._fields['activity_type'].selection
        ]

        values = self._prepare_portal_layout_values()
        values.update({
            'organization': org,
            'user_role': user_role,
            'page_name': 'organization_settings',
            'organization_hub': True,
            'org_hub_page': 'settings',
            'countries': countries,
            'activity_type_selection': activity_type_selection,
            'form': {},
            'error': {},
            'settings_message': None,
        })

        if request.httprequest.method == 'POST':
            name = (post.get('name') or '').strip()
            org_type = post.get('organization_type') or 'private'
            activity = post.get('activity_type') or 'it'
            raw_country = post.get('country_id')
            try:
                country_id = int(raw_country) if raw_country else False
            except (TypeError, ValueError):
                country_id = False
            values['form'] = dict(post)
            if not name:
                values['error']['name'] = _('Name is required.')
            elif org_type not in allowed_types:
                values['error']['organization_type'] = _('Invalid privacy value.')
            elif activity not in allowed_activity:
                values['error']['activity_type'] = _('Invalid activity type.')
            elif country_id and country_id not in countries.ids:
                values['error']['country_id'] = _('Invalid country.')
            else:
                org.write({
                    'name': name,
                    'organization_type': org_type,
                    'activity_type': activity,
                    'country_id': country_id or False,
                })
                values['settings_message'] = _('Settings saved.')
                values['form'] = {}
        if values.get('form') and values['form'].get('country_id'):
            try:
                values['country_selection_id'] = int(values['form']['country_id'])
            except (TypeError, ValueError):
                values['country_selection_id'] = False
        else:
            values['country_selection_id'] = (
                org.country_id.id if org.country_id else False
            )
        return request.render(
            'itlingo_website_portal.portal_organization_hub_settings',
            values,
        )

    # ──────────────────────────────────────────────
    # Organization LLM configuration
    # ──────────────────────────────────────────────

    LLM_CATEGORY_FIELDS = [
        ('default_model', 'Default Model'),
        ('rag_llm_model', 'RAG LLM Model'),
        ('diagram_auto_switch_model', 'Diagram Generation Model'),
        ('image_auto_switch_model', 'Image Interpretation Model'),
        ('agentic_generation_phase0_model', 'Agentic Phase 0 - extract spec'),
        ('agentic_generation_phase1_model', 'Agentic Phase 1 - draft DSL'),
        ('agentic_generation_phase3_model', 'Agentic Phase 3 - check completeness'),
        ('agentic_generation_phase4_model', 'Agentic Phase 4 - repair DSL'),
        ('agentic_generation_phase5_model', 'Agentic Phase 5 - finalize answer'),
    ]

    def _portal_org_llm_access(self, org_id):
        """Return (organization, user_role) for an org manager or raise."""
        org, user_role = self._portal_org_access(org_id)
        if user_role.role != 'org_manager':
            raise AccessError(_('Only organization managers can configure LLMs.'))
        return org, user_role

    def _validate_org_model_credentials(self, mode, api_key, base_url, has_existing_key=False):
        """Validate the single credential for an org model based on the chosen mode.

        A model is either an API-key model or a (self-hosted) Base-URL model; the
        ``credential_mode`` selector decides which one. Returns an error message,
        or None when valid.
        """
        if mode == 'url':
            if not (base_url or '').strip():
                return _('A Base URL is required for a self-hosted model.')
            return None
        # API-key mode (default).
        if not (api_key or '').strip() and not has_existing_key:
            return _('An API key is required for this model.')
        return None

    def _org_option_credentials_vals(self, org_id, provider, label, mode, api_key='', base_url='', keep_key=False):
        """Build the env-var fields for an org model option (API-key XOR Base-URL).

        ``mode`` ('api' or 'url') selects which credential the model uses; the
        other mode's fields are always cleared so switching modes can never leave
        a stale credential behind. ``keep_key`` preserves the previously stored
        API key on edit when the form left the key blank while staying in API mode.
        Callers must validate with :meth:`_validate_org_model_credentials` first.
        """
        Option = request.env['itlingo.chatbot.settings.option'].sudo()
        if mode == 'url':
            return {
                'base_url_enabled': True,
                'url_env_var': Option._build_env_var_name(org_id, provider.label, label, 'BASE_URL'),
                'base_url': base_url,
                'api_env_var': '',
                'env_var_value': '',
            }
        vals = {
            'base_url_enabled': False,
            'api_env_var': Option._build_env_var_name(org_id, provider.label, label, 'API_KEY'),
            'url_env_var': '',
            'base_url': '',
        }
        if not keep_key:
            vals['env_var_value'] = api_key
        return vals

    def _render_org_llm(self, org_id, error=None):
        values = self._portal_org_llm_values(org_id)
        values['llm_error'] = error
        return request.render('itlingo_website_portal.portal_organization_hub_llm', values)

    def _portal_org_llm_values(self, org_id):
        org, user_role = self._portal_org_llm_access(org_id)
        settings = request.env['itlingo.chatbot.settings'].sudo()._get_settings()
        Provider = request.env['itlingo.chatbot.settings.provider'].sudo()
        providers = Provider.search([('organization_id', '=', org_id)], order='sequence, id')
        ops_config = settings._get_ops_configuration_record(organization_id=org_id)

        org_models = []
        for provider in providers:
            for option in provider.option_ids.sorted(lambda r: (r.sequence, r.id)):
                org_models.append({
                    'value': option.value,
                    'label': option.label,
                    'provider_label': provider.label,
                })

        categories = [
            {
                'field': field_name,
                'label': label,
                'selected': getattr(ops_config, field_name, '') or '',
            }
            for field_name, label in self.LLM_CATEGORY_FIELDS
        ]

        values = self._prepare_portal_layout_values()
        values.update({
            'organization': org,
            'user_role': user_role,
            'page_name': 'organization_llm',
            'organization_hub': True,
            'org_hub_page': 'llm',
            'providers': providers,
            'org_models': org_models,
            'llm_categories': categories,
            'llm_error': None,
        })
        return values

    @route('/my/organizations/<int:org_id>/llm', type='http', auth='user', website=True)
    def portal_organization_llm(self, org_id, **kw):
        return self._render_org_llm(org_id)

    @route('/my/organizations/<int:org_id>/llm/provider/new',
           type='http', auth='user', website=True, methods=['POST'])
    def portal_organization_llm_provider_new(self, org_id, **post):
        self._portal_org_llm_access(org_id)
        label = (post.get('provider_label') or '').strip()
        if label:
            settings = request.env['itlingo.chatbot.settings'].sudo()._get_settings()
            Provider = request.env['itlingo.chatbot.settings.provider'].sudo()
            existing = Provider.search_count([('organization_id', '=', org_id)])
            Provider.create({
                'settings_id': settings.id,
                'organization_id': org_id,
                'label': label,
                'provider': label,
                'sequence': (existing + 1) * 10,
            })
        return request.redirect(f'/my/organizations/{org_id}/llm')

    @route('/my/organizations/<int:org_id>/llm/provider/<int:provider_id>/delete',
           type='http', auth='user', website=True, methods=['POST'])
    def portal_organization_llm_provider_delete(self, org_id, provider_id, **post):
        self._portal_org_llm_access(org_id)
        provider = request.env['itlingo.chatbot.settings.provider'].sudo().browse(provider_id)
        if provider.exists() and provider.organization_id.id == org_id:
            provider.unlink()
        return request.redirect(f'/my/organizations/{org_id}/llm')

    @route('/my/organizations/<int:org_id>/llm/model/new',
           type='http', auth='user', website=True, methods=['POST'])
    def portal_organization_llm_model_new(self, org_id, **post):
        self._portal_org_llm_access(org_id)
        Provider = request.env['itlingo.chatbot.settings.provider'].sudo()
        Option = request.env['itlingo.chatbot.settings.option'].sudo()
        try:
            provider_id = int(post.get('provider_id') or 0)
        except (TypeError, ValueError):
            provider_id = 0
        provider = Provider.browse(provider_id)
        label = (post.get('model_label') or '').strip()
        value = (post.get('model_value') or '').strip()
        mode = (post.get('credential_mode') or 'api').strip()
        api_key = (post.get('api_key') or '').strip()
        base_url = (post.get('base_url') or '').strip()
        if not (provider.exists() and provider.organization_id.id == org_id and label and value):
            return request.redirect(f'/my/organizations/{org_id}/llm')
        error = self._validate_org_model_credentials(mode, api_key, base_url)
        if error:
            return self._render_org_llm(org_id, error=error)
        vals = {
            'provider_id': provider.id,
            'organization_id': org_id,
            'label': label,
            'value': value,
            'sequence': (len(provider.option_ids) + 1) * 10,
            **self._org_option_credentials_vals(org_id, provider, label, mode, api_key=api_key, base_url=base_url),
        }
        Option.create(vals)
        return request.redirect(f'/my/organizations/{org_id}/llm')

    @route('/my/organizations/<int:org_id>/llm/model/<int:option_id>/edit',
           type='http', auth='user', website=True, methods=['POST'])
    def portal_organization_llm_model_edit(self, org_id, option_id, **post):
        self._portal_org_llm_access(org_id)
        Option = request.env['itlingo.chatbot.settings.option'].sudo()
        option = Option.browse(option_id)
        if not (option.exists() and option.organization_id.id == org_id):
            return request.redirect(f'/my/organizations/{org_id}/llm')

        provider = option.provider_id
        label = (post.get('model_label') or '').strip() or option.label
        value = (post.get('model_value') or '').strip() or option.value
        mode = (post.get('credential_mode') or 'api').strip()
        api_key = (post.get('api_key') or '').strip()
        base_url = (post.get('base_url') or '').strip()
        # Staying in API mode with a blank key keeps the previously stored key.
        has_existing_key = (not option.base_url_enabled) and bool(option.env_var_value or option.api_key)
        error = self._validate_org_model_credentials(
            mode, api_key, base_url, has_existing_key=has_existing_key)
        if error:
            return self._render_org_llm(org_id, error=error)

        keep_key = mode != 'url' and not api_key
        vals = {
            'label': label,
            'value': value,
            **self._org_option_credentials_vals(
                org_id, provider, label, mode, api_key=api_key, base_url=base_url, keep_key=keep_key),
        }
        option.write(vals)
        return request.redirect(f'/my/organizations/{org_id}/llm')

    @route('/my/organizations/<int:org_id>/llm/model/<int:option_id>/delete',
           type='http', auth='user', website=True, methods=['POST'])
    def portal_organization_llm_model_delete(self, org_id, option_id, **post):
        self._portal_org_llm_access(org_id)
        option = request.env['itlingo.chatbot.settings.option'].sudo().browse(option_id)
        if option.exists() and option.organization_id.id == org_id:
            option.unlink()
        return request.redirect(f'/my/organizations/{org_id}/llm')

    @route('/my/organizations/<int:org_id>/llm/categories',
           type='http', auth='user', website=True, methods=['POST'])
    def portal_organization_llm_categories(self, org_id, **post):
        self._portal_org_llm_access(org_id)
        settings = request.env['itlingo.chatbot.settings'].sudo()._get_settings()
        ops_config = settings._get_ops_configuration_record(organization_id=org_id)
        Provider = request.env['itlingo.chatbot.settings.provider'].sudo()
        valid_values = set()
        for provider in Provider.search([('organization_id', '=', org_id)]):
            for option in provider.option_ids:
                if option.value:
                    valid_values.add(option.value)
        updates = {}
        for field_name, _label in self.LLM_CATEGORY_FIELDS:
            selected = (post.get(field_name) or '').strip()
            updates[field_name] = selected if selected in valid_values else ''
        ops_config.write(updates)
        return request.redirect(f'/my/organizations/{org_id}/llm')

    @route('/my/organizations/<int:org_id>', type='http', auth='user', website=True)
    def portal_organization_detail(self, org_id, **kw):
        org, user_role = self._portal_org_access(org_id)
        Project = request.env['itlingo.workspace'].sudo()
        base_dom = [('organization_id', '=', org_id)]
        kpi_active = Project.search_count(
            base_dom + [('business_status', 'in', ['not_started', 'executing'])],
        )
        kpi_canceled = Project.search_count(
            base_dom + [('business_status', '=', 'canceled')],
        )
        kpi_completed = Project.search_count(
            base_dom + [('business_status', '=', 'concluded')],
        )
        values = self._prepare_portal_layout_values()
        values.update({
            'organization': org,
            'user_role': user_role,
            'kpi_users': org.member_count,
            'kpi_active_projects': kpi_active,
            'kpi_canceled_projects': kpi_canceled,
            'kpi_completed_projects': kpi_completed,
            'page_name': 'organization_stats',
            'organization_hub': True,
            'org_hub_page': 'stats',
        })
        return request.render(
            'itlingo_website_portal.portal_organization_hub_stats',
            values,
        )

    # ──────────────────────────────────────────────
    # Workspaces
    # ──────────────────────────────────────────────

    @route(['/my/workspaces', '/my/workspaces/page/<int:page>'],
           type='http', auth='user', website=True)
    def portal_my_workspaces(self, page=1, **kw):
        user = request.env.user
        params = request.params
        project_ids, role_map = self._portal_ws_list_filtered_project_ids(user, params)
        Project = request.env['itlingo.workspace'].sudo()
        domain, name_q = self._portal_ws_list_filters_domain(project_ids, params)
        url_args = self._portal_ws_list_url_args(params, name_q)

        project_count = Project.search_count(domain)
        page_detail = pager(
            url='/my/workspaces',
            total=project_count,
            page=page,
            step=10,
            url_args=url_args or None,
        )
        projects = Project.search(
            domain,
            limit=10,
            offset=page_detail['offset'],
            order='name',
        )

        can_create_workspace = bool(
            request.env['itlingo.organization.role'].sudo().search_count([
                ('user_id', '=', user.id),
                ('state', '=', 'accepted'),
                ('role', '=', 'org_manager'),
            ])
        )

        values = self._prepare_portal_layout_values()
        values.update({
            'projects': projects,
            'role_map': role_map,
            'page_name': 'workspaces',
            'pager': page_detail,
            'default_url': '/my/workspaces',
            'filters': {
                'name': name_q,
                'role_ws_manager': params.get('role_ws_manager') == '1',
                'role_doc_manager': params.get('role_doc_manager') == '1',
                'role_ws_member': params.get('role_ws_member') == '1',
                'public_ws': params.get('public_ws') == '1',
                'private_ws': params.get('private_ws') == '1',
            },
            'can_create_workspace': can_create_workspace,
            'ws_list_error': params.get('error'),
            'ws_list_message': params.get('message'),
        })
        return request.render('itlingo_website_portal.portal_my_workspaces', values)

    # ──────────────────────────────────────────────
    # Public workspaces (auth=public)
    # ──────────────────────────────────────────────

    @route(
        ['/public-workspaces', '/public-workspaces/page/<int:page>'],
        type='http', auth='public', website=True,
    )
    def portal_public_workspaces_list(self, page=1, **kw):
        params = request.params
        Project = request.env['itlingo.workspace'].sudo()
        domain = [('is_public_workspace', '=', True)]
        name_q = (params.get('name') or '').strip()
        if name_q:
            domain.append(('name', 'ilike', f'%{name_q}%'))
        url_args = {'name': name_q} if name_q else None

        project_count = Project.search_count(domain)
        page_detail = pager(
            url='/public-workspaces',
            total=project_count,
            page=page,
            step=10,
            url_args=url_args,
        )
        projects = Project.search(
            domain,
            limit=10,
            offset=page_detail['offset'],
            order='name',
        )
        user = request.env.user
        public_workspace_rows = []
        for p in projects:
            if self._portal_workspace_role(user, p.id):
                url = f'/my/workspaces/{p.id}'
            else:
                url = f'/public-workspaces/{p.id}'
            public_workspace_rows.append((p, url))

        values = self._prepare_portal_layout_values()
        values.update({
            'projects': projects,
            'public_workspace_rows': public_workspace_rows,
            'pager': page_detail,
            'page_name': 'public_workspaces',
            'default_url': '/public-workspaces',
            'filters': {'name': name_q},
        })
        return request.render('itlingo_website_portal.portal_public_workspaces', values)

    @route('/public-workspaces/<int:project_id>', type='http', auth='public', website=True)
    def portal_public_workspace_home(self, project_id, **kw):
        redir = self._portal_ws_maybe_redirect_public_to_my(project_id)
        if redir:
            return redir
        project = self._portal_public_workspace_project(project_id)
        if not project:
            return request.not_found()
        Role = request.env['itlingo.project.role'].sudo()
        values = self._prepare_portal_layout_values()
        values.update({
            'project': project,
            'user_role': Role.browse(),
            'page_name': 'public_workspace_detail',
            'members': Role.browse(),
            **self._portal_workspace_hub_common(project, 'home', public_hub=True),
        })
        return request.render('itlingo_website_portal.portal_workspace_detail', values)

    @route(
        '/public-workspaces/<int:project_id>/documents',
        type='http', auth='public', website=True,
    )
    def portal_public_workspace_documentation(self, project_id, **kw):
        redir = self._portal_ws_maybe_redirect_public_to_my(
            project_id, '/documents',
        )
        if redir:
            return redir
        project = self._portal_public_workspace_project(project_id)
        if not project:
            return request.not_found()
        Document = request.env['itlingo.document'].sudo()
        documents = Document.search([
            ('project_id', '=', project_id),
        ], order='creation_date desc, name')
        Role = request.env['itlingo.project.role'].sudo()
        values = self._prepare_portal_layout_values()
        values.update({
            'project': project,
            'user_role': Role.browse(),
            'documents': documents,
            'can_upload_ws_documents': False,
            'page_name': 'public_workspace_documentation',
            'members': Role.browse(),
            **self._portal_workspace_hub_common(project, 'documentation', public_hub=True),
        })
        return request.render(
            'itlingo_website_portal.portal_workspace_documentation',
            values,
        )

    @route(
        '/public-workspaces/<int:project_id>/specifications',
        type='http', auth='public', website=True,
    )
    def portal_public_workspace_specifications(self, project_id, **kw):
        redir = self._portal_ws_maybe_redirect_public_to_my(
            project_id, '/specifications',
        )
        if redir:
            return redir
        project = self._portal_public_workspace_project(project_id)
        if not project:
            return request.not_found()
        Role = request.env['itlingo.project.role'].sudo()
        values = self._prepare_portal_layout_values()
        values.update({
            'project': project,
            'user_role': Role.browse(),
            'has_write': False,
            'page_name': 'public_workspace_specifications',
            'members': Role.browse(),
            **self._portal_workspace_hub_common(project, 'specifications', public_hub=True),
        })
        return request.render(
            'itlingo_website_portal.portal_workspace_specifications',
            values,
        )

    def _portal_public_workspace_document_or_404(self, project_id, document_id):
        project = self._portal_public_workspace_project(project_id)
        if not project:
            return None, None
        doc = request.env['itlingo.document'].sudo().browse(document_id)
        if (
            not doc.exists()
            or not doc.project_id
            or doc.project_id.id != project_id
        ):
            return None, None
        return project, doc

    @route(
        '/public-workspaces/<int:project_id>/documents/<int:document_id>',
        type='http', auth='public', website=True,
    )
    def portal_public_workspace_document_detail(self, project_id, document_id, **kw):
        project, doc = self._portal_public_workspace_document_or_404(
            project_id, document_id,
        )
        if not doc:
            return request.not_found()
        values = self._prepare_portal_layout_values()
        values.update({
            'project': project,
            'document': doc,
            'page_name': 'public_workspace_document',
        })
        return request.render(
            'itlingo_website_portal.portal_public_workspace_document',
            values,
        )

    @route(
        '/public-workspaces/<int:project_id>/documents/<int:document_id>/download',
        type='http', auth='public', website=True,
    )
    def portal_public_workspace_document_download(
        self, project_id, document_id, **kw,
    ):
        _project, doc = self._portal_public_workspace_document_or_404(
            project_id, document_id,
        )
        if not doc or not doc.document_file:
            return request.not_found()
        raw = base64.b64decode(doc.document_file)
        fname = doc.file_name or 'document'
        return request.make_response(
            raw,
            headers=[
                ('Content-Type', 'application/octet-stream'),
                ('Content-Disposition', content_disposition(fname)),
            ],
        )

    @route(
        '/my/workspaces/<int:project_id>/business_status',
        type='http', auth='user', website=True, methods=['POST'],
    )
    def portal_workspace_business_status(self, project_id, **post):
        project, user_role = self._portal_ws_access(project_id)
        if user_role.role != 'ws_manager':
            raise AccessError(
                _('Only workspace managers can change workspace status.'),
            )
        transition = (post.get('transition') or '').strip()
        proj = project.sudo()
        try:
            if transition == 'executing':
                proj.action_start()
            elif transition == 'canceled':
                proj.action_cancel()
            elif transition == 'concluded':
                proj.action_conclude()
            elif transition == 'not_started':
                proj.action_reset()
            else:
                return request.redirect('/my/workspaces?error=ws_bad_status')
        except UserError:
            return request.redirect('/my/workspaces?error=ws_status_failed')
        return request.redirect('/my/workspaces?message=ws_status_updated')

    @route(
        '/my/workspaces/<int:project_id>/delete',
        type='http', auth='user', website=True, methods=['POST'],
    )
    def portal_workspace_delete(self, project_id, **post):
        project, user_role = self._portal_ws_access(project_id)
        if user_role.role != 'ws_manager':
            raise AccessError(_('Only workspace managers can delete a workspace.'))
        try:
            project.sudo().unlink()
        except UserError:
            return request.redirect('/my/workspaces?error=ws_delete_failed')
        return request.redirect('/my/workspaces?message=ws_deleted')

    _WS_NEW_SESSION_KEY = 'itlingo_portal_ws_new_wizard'

    @route('/my/workspaces/new', type='http', auth='user', website=True)
    def portal_workspace_new_entry(self, **kw):
        return request.redirect('/my/workspaces/new/step/1')

    @route(
        ['/my/workspaces/new/step/<int:step>'],
        type='http', auth='user', website=True, methods=['GET', 'POST'],
    )
    def portal_workspace_new(self, step=1, **post):
        user = request.env.user
        Role = request.env['itlingo.organization.role'].sudo()
        manager_roles = Role.search([
            ('user_id', '=', user.id),
            ('state', '=', 'accepted'),
            ('role', '=', 'org_manager'),
        ])
        organizations = manager_roles.mapped('organization_id')
        sess = request.session
        wizard = sess.get(self._WS_NEW_SESSION_KEY) or {}

        if step < 1 or step > 4:
            return request.redirect('/my/workspaces/new/step/1')

        values = self._prepare_portal_layout_values()
        values.update({
            'page_name': 'workspace_new',
            'wizard_step': step,
            'wizard_mode': 'create',
            'organizations': organizations,
            'form': {},
            'error': {},
        })

        allowed_methodology = {'scrum', 'kanban'}

        if request.httprequest.method == 'POST':
            if step == 1:
                name = (post.get('name') or '').strip()
                try:
                    org_id = int(post.get('organization_id') or 0)
                except (TypeError, ValueError):
                    org_id = 0
                methodology = post.get('methodology') or 'scrum'
                err = {}
                if not organizations:
                    err['organization_id'] = _('You are not an organization manager.')
                elif not name:
                    err['name'] = _('Workspace name is required.')
                elif org_id not in organizations.ids:
                    err['organization_id'] = _('Invalid organization.')
                elif methodology not in allowed_methodology:
                    err['name'] = _('Invalid methodology.')
                if err:
                    values['error'] = err
                    values['form'] = {
                        'name': name,
                        'organization_id': org_id,
                        'methodology': methodology,
                        'is_public_workspace': post.get('is_public_workspace') == '1',
                    }
                    return request.render(
                        'itlingo_website_portal.portal_workspace_wizard',
                        values,
                    )
                wizard = {
                    'name': name,
                    'organization_id': org_id,
                    'methodology': methodology,
                    'is_public_workspace': post.get('is_public_workspace') == '1',
                }
                sess[self._WS_NEW_SESSION_KEY] = wizard
                return request.redirect('/my/workspaces/new/step/2')

            if step == 2:
                wizard = sess.get(self._WS_NEW_SESSION_KEY) or {}
                if not wizard.get('name'):
                    return request.redirect('/my/workspaces/new/step/1')
                values['form'] = dict(post)
                wizard['planned_start'] = post.get('planned_start') or False
                wizard['planned_end'] = post.get('planned_end') or False
                wizard['actual_start'] = post.get('actual_start') or False
                wizard['actual_end'] = post.get('actual_end') or False
                try:
                    wizard['planned_cost'] = float(post.get('planned_cost') or 0)
                except (TypeError, ValueError):
                    wizard['planned_cost'] = 0.0
                try:
                    wizard['current_cost'] = float(post.get('current_cost') or 0)
                except (TypeError, ValueError):
                    wizard['current_cost'] = 0.0
                sess[self._WS_NEW_SESSION_KEY] = wizard
                return request.redirect('/my/workspaces/new/step/3')

            if step == 3:
                wizard = sess.get(self._WS_NEW_SESSION_KEY) or {}
                if not wizard.get('name'):
                    return request.redirect('/my/workspaces/new/step/1')
                wizard['description'] = post.get('description') or ''
                sess[self._WS_NEW_SESSION_KEY] = wizard
                return request.redirect('/my/workspaces/new/step/4')

            if step == 4:
                wizard = sess.pop(self._WS_NEW_SESSION_KEY, None)
                if not wizard or not wizard.get('name'):
                    return request.redirect('/my/workspaces/new/step/1')
                Project = request.env['itlingo.workspace'].sudo()
                WsRole = request.env['itlingo.project.role'].sudo()
                vals = {
                    'name': wizard['name'],
                    'organization_id': wizard['organization_id'],
                    'methodology': wizard['methodology'],
                    'description': wizard.get('description') or False,
                    'is_public_workspace': bool(wizard.get('is_public_workspace')),
                }
                for f in ('planned_start', 'planned_end', 'actual_start', 'actual_end'):
                    if wizard.get(f):
                        vals[f] = wizard[f]
                if wizard.get('planned_cost'):
                    vals['planned_cost'] = wizard['planned_cost']
                if wizard.get('current_cost'):
                    vals['current_cost'] = wizard['current_cost']
                project = Project.create(vals)
                WsRole.create({
                    'project_id': project.id,
                    'user_id': user.id,
                    'role': 'ws_manager',
                    'state': 'accepted',
                })
                project.message_subscribe(partner_ids=user.partner_id.ids)
                return request.redirect(f'/my/workspaces/{project.id}')

        # GET
        if step > 1 and not wizard.get('name'):
            return request.redirect('/my/workspaces/new/step/1')
        if step == 2:
            values['form'] = {
                'planned_start': wizard.get('planned_start') or '',
                'planned_end': wizard.get('planned_end') or '',
                'actual_start': wizard.get('actual_start') or '',
                'actual_end': wizard.get('actual_end') or '',
                'planned_cost': wizard.get('planned_cost', ''),
                'current_cost': wizard.get('current_cost', ''),
            }
        elif step == 3:
            values['form'] = {'description': wizard.get('description') or ''}
        elif step == 4:
            w = wizard
            org = request.env['itlingo.organization'].sudo().browse(
                w.get('organization_id', 0),
            )
            values['wizard_data'] = {
                'name': w.get('name'),
                'organization': org.name if org.exists() else '',
                'methodology': w.get('methodology'),
                'is_public_workspace': bool(w.get('is_public_workspace')),
                'planned_start': w.get('planned_start'),
                'planned_end': w.get('planned_end'),
                'actual_start': w.get('actual_start'),
                'actual_end': w.get('actual_end'),
                'planned_cost': w.get('planned_cost'),
                'current_cost': w.get('current_cost'),
                'description': w.get('description'),
            }
        if step == 1:
            raw_org = request.params.get('organization_id')
            try:
                default_org_id = int(raw_org or 0)
            except (TypeError, ValueError):
                default_org_id = 0
            if organizations:
                if not default_org_id or default_org_id not in organizations.ids:
                    default_org_id = organizations[0].id
            else:
                default_org_id = 0
            values['default_org_id'] = default_org_id
            if wizard.get('name'):
                values['form'] = {
                    'name': wizard.get('name', ''),
                    'organization_id': wizard.get('organization_id'),
                    'methodology': wizard.get('methodology', 'scrum'),
                    'is_public_workspace': bool(wizard.get('is_public_workspace')),
                }
        return request.render('itlingo_website_portal.portal_workspace_wizard', values)

    @route('/my/workspaces/<int:project_id>/settings', type='http', auth='user', website=True)
    def portal_workspace_settings_entry(self, project_id, **kw):
        return request.redirect(f'/my/workspaces/{project_id}/settings/1')

    @route(
        ['/my/workspaces/<int:project_id>/settings/<int:step>'],
        type='http', auth='user', website=True, methods=['GET', 'POST'],
    )
    def portal_workspace_settings(self, project_id, step=1, **post):
        project, user_role = self._portal_ws_access(project_id)
        if user_role.role != 'ws_manager':
            raise AccessError(_('Only workspace managers can change workspace settings.'))
        if step < 1 or step > 4:
            return request.redirect(f'/my/workspaces/{project_id}/settings/1')
        proj = project.sudo()
        allowed_methodology = {'scrum', 'kanban'}
        values = self._prepare_portal_layout_values()
        values.update({
            'project': project,
            'user_role': user_role,
            'workspace_hub': True,
            'workspace_hub_page': 'settings',
            'page_name': 'workspace_settings',
            'wizard_step': step,
            'wizard_mode': 'edit',
            'form': {},
            'error': {},
            'members': self._portal_workspace_hub_members(project_id),
            **self._portal_workspace_hub_common(project, 'settings', public_hub=False),
        })
        if request.httprequest.method == 'POST':
            if step == 1:
                name = (post.get('name') or '').strip()
                methodology = post.get('methodology') or 'scrum'
                is_public = post.get('is_public_workspace') == '1'
                values['form'] = {
                    'name': name,
                    'methodology': methodology,
                    'is_public_workspace': is_public,
                }
                if not name:
                    values['error']['name'] = _('Workspace name is required.')
                elif methodology not in allowed_methodology:
                    values['error']['name'] = _('Invalid methodology.')
                else:
                    proj.write({
                        'name': name,
                        'methodology': methodology,
                        'is_public_workspace': is_public,
                    })
                    return request.redirect(f'/my/workspaces/{project_id}/settings/2')
                return request.render(
                    'itlingo_website_portal.portal_workspace_wizard',
                    values,
                )
            if step == 2:
                pstart = post.get('planned_start') or False
                pend = post.get('planned_end') or False
                astart = post.get('actual_start') or False
                aend = post.get('actual_end') or False
                try:
                    pcost = float(post.get('planned_cost') or 0)
                except (TypeError, ValueError):
                    pcost = 0.0
                try:
                    ccost = float(post.get('current_cost') or 0)
                except (TypeError, ValueError):
                    ccost = 0.0
                proj.write({
                    'planned_start': pstart or False,
                    'planned_end': pend or False,
                    'actual_start': astart or False,
                    'actual_end': aend or False,
                    'planned_cost': pcost,
                    'current_cost': ccost,
                })
                return request.redirect(f'/my/workspaces/{project_id}/settings/3')
            if step == 3:
                proj.write({'description': post.get('description') or False})
                return request.redirect(f'/my/workspaces/{project_id}/settings/4')
            if step == 4:
                return request.redirect(f'/my/workspaces/{project_id}')
        if step == 1:
            values['form'] = {
                'name': proj.name,
                'methodology': proj.methodology or 'scrum',
                'is_public_workspace': proj.is_public_workspace,
            }
        elif step == 2:
            values['form'] = {
                'planned_start': proj.planned_start or '',
                'planned_end': proj.planned_end or '',
                'actual_start': proj.actual_start or '',
                'actual_end': proj.actual_end or '',
                'planned_cost': proj.planned_cost,
                'current_cost': proj.current_cost,
            }
        elif step == 3:
            desc = proj.description or ''
            values['form'] = {'description': desc}
        elif step == 4:
            values['wizard_data'] = {
                'name': proj.name,
                'methodology': proj.methodology,
                'organization': proj.organization_id.name if proj.organization_id else '',
                'is_public_workspace': proj.is_public_workspace,
                'planned_start': proj.planned_start,
                'planned_end': proj.planned_end,
                'actual_start': proj.actual_start,
                'actual_end': proj.actual_end,
                'planned_cost': proj.planned_cost,
                'current_cost': proj.current_cost,
                'description': proj.description,
            }
        return request.render('itlingo_website_portal.portal_workspace_wizard', values)

    def _portal_ws_access(self, project_id):
        """Return (project, user_role) or raise."""
        project = request.env['itlingo.workspace'].sudo().browse(project_id)
        if not project.exists():
            raise MissingError(_('Workspace not found.'))
        user_role = self._portal_workspace_role(request.env.user, project_id)
        if not user_role:
            raise AccessError(_('You do not have access to this workspace.'))
        return project, user_role

    def _portal_ws_accepted_manager_count(self, project_id):
        return request.env['itlingo.project.role'].sudo().search_count([
            ('project_id', '=', project_id),
            ('state', '=', 'accepted'),
            ('role', '=', 'ws_manager'),
        ])

    def _portal_workspace_hub_members(self, project_id):
        """Accepted workspace roles; never None (templates may use len(members))."""
        return request.env['itlingo.project.role'].sudo().search([
            ('project_id', '=', project_id),
            ('state', '=', 'accepted'),
        ])

    @route('/my/workspaces/<int:project_id>', type='http', auth='user', website=True)
    def portal_workspace_detail(self, project_id, **kw):
        project, user_role = self._portal_ws_access(project_id)
        params = request.params

        values = self._prepare_portal_layout_values()
        values.update({
            'project': project,
            'user_role': user_role,
            'workspace_hub': True,
            'workspace_hub_page': 'home',
            'ws_error': params.get('error'),
            'ws_message': params.get('message'),
            'page_name': 'workspace_detail',
            'members': self._portal_workspace_hub_members(project_id),
            **self._portal_workspace_hub_common(project, 'home', public_hub=False),
        })
        return request.render('itlingo_website_portal.portal_workspace_detail', values)

    @route('/my/workspaces/<int:project_id>/users', type='http', auth='user', website=True)
    def portal_workspace_users(self, project_id, **kw):
        project, user_role = self._portal_ws_access(project_id)
        params = request.params

        is_ws_manager = user_role.role == 'ws_manager'

        values = self._prepare_portal_layout_values()
        values.update({
            'project': project,
            'user_role': user_role,
            'members': self._portal_workspace_hub_members(project_id),
            'workspace_hub': True,
            'workspace_hub_page': 'users',
            'is_ws_manager': is_ws_manager,
            'can_manage_ws_users': is_ws_manager,
            'ws_error': params.get('error'),
            'ws_message': params.get('message'),
            'page_name': 'workspace_users',
            **self._portal_workspace_hub_common(project, 'users', public_hub=False),
        })
        return request.render('itlingo_website_portal.portal_workspace_users', values)

    def _portal_ws_user_redirect(self, project_id, error=None, message=None):
        base = f'/my/workspaces/{project_id}/users'
        q = []
        if error:
            q.append(f'error={error}')
        if message:
            q.append(f'message={message}')
        if q:
            return request.redirect(f'{base}?{"&".join(q)}')
        return request.redirect(base)

    @route(
        '/my/workspaces/<int:project_id>/users/invite',
        type='http', auth='user', website=True, methods=['POST'],
    )
    def portal_workspace_users_invite(self, project_id, **post):
        _project, actor_role = self._portal_ws_access(project_id)
        if actor_role.role != 'ws_manager':
            raise AccessError(_('Only workspace managers can invite members.'))
        to_users = post.get('redirect_users') == '1'
        email = (post.get('email') or '').strip()
        role_key = post.get('role') or 'ws_member'
        allowed_roles = {'ws_manager', 'doc_manager', 'ws_member'}
        if role_key not in allowed_roles:
            if to_users:
                return self._portal_ws_user_redirect(project_id, error='invite_bad_role')
            return request.redirect(
                f'/my/workspaces/{project_id}?error=invite_bad_role',
            )
        if not email:
            if to_users:
                return self._portal_ws_user_redirect(project_id, error='invite_email_required')
            return request.redirect(
                f'/my/workspaces/{project_id}?error=invite_email_required',
            )
        Users = request.env['res.users'].sudo()
        invitee = Users.search([('login', '=', email)], limit=1)
        if not invitee:
            invitee = Users.search([('login', '=ilike', email)], limit=1)
        if not invitee:
            invitee = Users.search([('email', '=ilike', email)], limit=1)
        if not invitee:
            Pending = request.env['itlingo.pending.invitation'].sudo()
            already_pending = Pending.search([
                ('email', '=ilike', email),
                ('project_id', '=', project_id),
            ], limit=1)
            if already_pending:
                self._send_signup_invitation_email(email)
                if to_users:
                    return self._portal_ws_user_redirect(project_id, message='invite_resent')
                return request.redirect(
                    f'/my/workspaces/{project_id}?message=invite_resent',
                )
            partner = request.env['res.partner'].sudo().search(
                [('email', '=ilike', email)], limit=1,
            )
            if not partner:
                partner = request.env['res.partner'].sudo().create({
                    'name': email.split('@')[0],
                    'email': email,
                })
            Pending.create({
                'email': email,
                'project_id': project_id,
                'role': role_key,
                'invited_by_id': request.env.user.id,
            })
            self._send_signup_invitation_email(email)
            if to_users:
                return self._portal_ws_user_redirect(project_id, message='invite_sent')
            return request.redirect(
                f'/my/workspaces/{project_id}?message=invite_sent',
            )
        WsRole = request.env['itlingo.project.role'].sudo()
        existing = WsRole.search([
            ('project_id', '=', project_id),
            ('user_id', '=', invitee.id),
        ], limit=1)
        if existing:
            if to_users:
                return self._portal_ws_user_redirect(project_id, error='invite_already_member')
            return request.redirect(
                f'/my/workspaces/{project_id}?error=invite_already_member',
            )
        WsRole.create({
            'project_id': project_id,
            'user_id': invitee.id,
            'role': role_key,
            'state': 'pending',
        })
        if to_users:
            return self._portal_ws_user_redirect(project_id, message='invite_sent')
        return request.redirect(
            f'/my/workspaces/{project_id}?message=invite_sent',
        )

    @route(
        '/my/workspaces/<int:project_id>/users/<int:role_id>/role',
        type='http', auth='user', website=True, methods=['POST'],
    )
    def portal_workspace_user_role(self, project_id, role_id, **post):
        _project, actor_role = self._portal_ws_access(project_id)
        if actor_role.role != 'ws_manager':
            raise AccessError(_('Only workspace managers can change roles.'))
        to_users = post.get('redirect_users') == '1'
        WsRole = request.env['itlingo.project.role'].sudo()
        target = WsRole.browse(role_id)
        if not target.exists() or target.project_id.id != project_id:
            raise MissingError(_('Member not found.'))
        if target.state != 'accepted':
            if to_users:
                return self._portal_ws_user_redirect(project_id, error='role_not_accepted')
            return request.redirect(
                f'/my/workspaces/{project_id}?error=role_not_accepted',
            )
        new_role = (post.get('role') or '').strip()
        allowed_roles = {'ws_manager', 'doc_manager', 'ws_member'}
        if new_role not in allowed_roles:
            if to_users:
                return self._portal_ws_user_redirect(project_id, error='role_invalid')
            return request.redirect(
                f'/my/workspaces/{project_id}?error=role_invalid',
            )
        mgr_count = self._portal_ws_accepted_manager_count(project_id)
        if target.role == 'ws_manager' and new_role != 'ws_manager':
            if mgr_count <= 1:
                if to_users:
                    return self._portal_ws_user_redirect(project_id, error='last_manager')
                return request.redirect(
                    f'/my/workspaces/{project_id}?error=last_manager',
                )
        target.write({'role': new_role})
        if to_users:
            return self._portal_ws_user_redirect(project_id, message='role_updated')
        return request.redirect(
            f'/my/workspaces/{project_id}?message=role_updated',
        )

    @route(
        '/my/workspaces/<int:project_id>/users/<int:role_id>/remove',
        type='http', auth='user', website=True, methods=['POST'],
    )
    def portal_workspace_user_remove(self, project_id, role_id, **post):
        _project, actor_role = self._portal_ws_access(project_id)
        if actor_role.role != 'ws_manager':
            raise AccessError(_('Only workspace managers can remove members.'))
        to_users = post.get('redirect_users') == '1'
        WsRole = request.env['itlingo.project.role'].sudo()
        target = WsRole.browse(role_id)
        if not target.exists() or target.project_id.id != project_id:
            raise MissingError(_('Member not found.'))
        if target.state != 'accepted':
            if to_users:
                return self._portal_ws_user_redirect(project_id, error='remove_not_accepted')
            return request.redirect(
                f'/my/workspaces/{project_id}?error=remove_not_accepted',
            )
        mgr_count = self._portal_ws_accepted_manager_count(project_id)
        if target.role == 'ws_manager' and mgr_count <= 1:
            if to_users:
                return self._portal_ws_user_redirect(project_id, error='last_manager')
            return request.redirect(
                f'/my/workspaces/{project_id}?error=last_manager',
            )
        uid = target.user_id.id
        target.unlink()
        if uid == request.env.user.id:
            return request.redirect('/my/workspaces?message=left_workspace')
        if to_users:
            return self._portal_ws_user_redirect(project_id, message='member_removed')
        return request.redirect(
            f'/my/workspaces/{project_id}?message=member_removed',
        )

    # ──────────────────────────────────────────────
    # Workspace: leave + promote successor
    # ──────────────────────────────────────────────

    @route(
        '/my/workspaces/<int:project_id>/leave',
        type='http', auth='user', website=True, methods=['POST'],
    )
    def portal_workspace_leave(self, project_id, **post):
        project, user_role = self._portal_ws_access(project_id)
        WsRole = request.env['itlingo.project.role'].sudo()
        accepted = WsRole.search([
            ('project_id', '=', project_id),
            ('state', '=', 'accepted'),
        ])
        if len(accepted) <= 1:
            try:
                project.sudo().unlink()
            except UserError:
                return self._portal_ws_user_redirect(project_id, error='leave_failed')
            return request.redirect('/my/workspaces?message=ws_deleted_self_leave')
        is_last_manager = (
            user_role.role == 'ws_manager'
            and self._portal_ws_accepted_manager_count(project_id) <= 1
        )
        if is_last_manager:
            return request.redirect(f'/my/workspaces/{project_id}/leave/promote')
        user_role.unlink()
        return request.redirect('/my/workspaces?message=left_workspace')

    @route(
        '/my/workspaces/<int:project_id>/leave/promote',
        type='http', auth='user', website=True, methods=['GET', 'POST'],
    )
    def portal_workspace_leave_promote(self, project_id, **post):
        project, user_role = self._portal_ws_access(project_id)
        if user_role.role != 'ws_manager':
            return request.redirect(f'/my/workspaces/{project_id}/users')
        WsRole = request.env['itlingo.project.role'].sudo()
        candidates = WsRole.search([
            ('project_id', '=', project_id),
            ('state', '=', 'accepted'),
            ('user_id', '!=', request.env.user.id),
        ])
        if not candidates:
            return request.redirect(f'/my/workspaces/{project_id}/users')
        values = self._prepare_portal_layout_values()
        values.update({
            'project': project,
            'user_role': user_role,
            'candidates': candidates,
            'workspace_hub': True,
            'workspace_hub_page': 'users',
            'page_name': 'workspace_leave_promote',
            'error': None,
            **self._portal_workspace_hub_common(project, 'users', public_hub=False),
        })
        if request.httprequest.method == 'POST':
            try:
                successor_role_id = int(post.get('successor_role_id') or 0)
            except (TypeError, ValueError):
                successor_role_id = 0
            successor = candidates.filtered(lambda r: r.id == successor_role_id)
            if not successor:
                values['error'] = _('Pick a member to promote before leaving.')
                return request.render(
                    'itlingo_website_portal.portal_workspace_leave_promote',
                    values,
                )
            successor.write({'role': 'ws_manager'})
            user_role.unlink()
            return request.redirect('/my/workspaces?message=left_workspace')
        return request.render(
            'itlingo_website_portal.portal_workspace_leave_promote', values,
        )

    # ──────────────────────────────────────────────
    # Workspace hub: documentation, placeholders
    # ──────────────────────────────────────────────

    @route('/my/workspaces/<int:project_id>/documents', type='http', auth='user', website=True)
    def portal_workspace_documentation(self, project_id, **kw):
        project, user_role = self._portal_ws_access(project_id)
        Document = request.env['itlingo.document'].sudo()
        documents = Document.search([
            ('project_id', '=', project_id),
        ], order='creation_date desc, name')
        can_doc = bool(
            user_role and user_role.role in self._DOC_EDIT_WS_ROLES,
        )
        params = request.params
        values = self._prepare_portal_layout_values()
        values.update({
            'project': project,
            'user_role': user_role,
            'workspace_hub': True,
            'workspace_hub_page': 'documentation',
            'documents': documents,
            'can_upload_ws_documents': can_doc,
            'doc_message': params.get('message'),
            'doc_error': params.get('error'),
            'page_name': 'workspace_documentation',
            'members': self._portal_workspace_hub_members(project_id),
            **self._portal_workspace_hub_common(project, 'documentation', public_hub=False),
        })
        return request.render(
            'itlingo_website_portal.portal_workspace_documentation',
            values,
        )

    @route(
        '/my/workspaces/<int:project_id>/documents/new',
        type='http', auth='user', website=True, methods=['GET', 'POST'],
    )
    def portal_workspace_documentation_new(self, project_id, **post):
        project, user_role = self._portal_ws_access(project_id)
        if user_role.role not in self._DOC_EDIT_WS_ROLES:
            raise AccessError(
                _('Only workspace managers or document managers can add documents.'),
            )
        DocType = request.env['itlingo.document.type'].sudo()
        doc_types = DocType.search([], order='name')
        values = self._prepare_portal_layout_values()
        values.update({
            'project': project,
            'user_role': user_role,
            'workspace_hub': True,
            'workspace_hub_page': 'documentation',
            'doc_types': doc_types,
            'template_type_id': self._template_type_id(),
            'page_name': 'workspace_documentation_new',
            'form': {},
            'error': {},
            'members': self._portal_workspace_hub_members(project_id),
            **self._portal_workspace_hub_common(project, 'documentation', public_hub=False),
        })
        if request.httprequest.method == 'POST':
            name = (post.get('name') or '').strip()
            values['form'] = dict(post)
            raw_type = post.get('document_type_id')
            try:
                type_id = int(raw_type) if raw_type else False
            except (TypeError, ValueError):
                type_id = False
            upload = request.httprequest.files.get('document_file')
            if not name:
                values['error']['name'] = _('Name is required.')
            elif type_id and type_id not in doc_types.ids:
                values['error']['document_type_id'] = _('Invalid document type.')
            else:
                file_b64 = False
                fname = False
                if upload and upload.filename:
                    fname = upload.filename
                    file_b64 = base64.b64encode(upload.read())
                doc_vals = {
                    'name': name,
                    'project_id': project_id,
                    'document_type_id': type_id or False,
                    'document_file': file_b64 or False,
                    'file_name': fname or False,
                    'status': 'draft',
                    'creator_id': request.env.user.id,
                }
                self._apply_template_vals(doc_vals, post)
                try:
                    request.env['itlingo.document'].sudo().create(doc_vals)
                except UserError as err:
                    values['error']['_form'] = str(err)
                else:
                    return request.redirect(
                        f'/my/workspaces/{project_id}/documents',
                    )
        return request.render(
            'itlingo_website_portal.portal_workspace_documentation_new',
            values,
        )

    @route(
        '/my/workspaces/<int:project_id>/documents/<int:document_id>',
        type='http', auth='user', website=True,
    )
    def portal_workspace_document_detail(self, project_id, document_id, **kw):
        _project, user_role, document = self._portal_ws_document_or_404(
            project_id, document_id,
        )
        if not document:
            return request.not_found()
        values = self._prepare_portal_layout_values()
        values.update({
            'document': document,
            'doc_base_url': f'/my/workspaces/{project_id}/documents',
            'can_edit_document': user_role.role in self._DOC_EDIT_WS_ROLES,
            'page_name': 'document_detail',
        })
        return request.render('itlingo_documents.portal_document_detail', values)

    @route(
        '/my/workspaces/<int:project_id>/documents/<int:document_id>/edit',
        type='http', auth='user', website=True, methods=['GET', 'POST'],
    )
    def portal_workspace_document_edit(self, project_id, document_id, **post):
        _project, user_role, document = self._portal_ws_document_or_404(
            project_id, document_id,
        )
        if not document:
            return request.not_found()
        if user_role.role not in self._DOC_EDIT_WS_ROLES:
            raise AccessError(_('You cannot edit this document.'))
        return self._portal_document_edit_flow(
            document, f'/my/workspaces/{project_id}/documents', post,
        )

    @route(
        '/my/workspaces/<int:project_id>/documents/<int:document_id>/delete',
        type='http', auth='user', website=True, methods=['POST'],
    )
    def portal_workspace_document_delete(self, project_id, document_id, **post):
        _project, user_role, document = self._portal_ws_document_or_404(
            project_id, document_id,
        )
        if not document:
            return request.not_found()
        if user_role.role not in self._DOC_EDIT_WS_ROLES:
            raise AccessError(_('You cannot delete this document.'))
        base_url = f'/my/workspaces/{project_id}/documents'
        try:
            document.sudo().unlink()
        except UserError:
            return request.redirect(f'{base_url}/{document_id}?error=delete_failed')
        return request.redirect(f'{base_url}?message=doc_deleted')

    @route(
        '/my/workspaces/<int:project_id>/documents/<int:document_id>/download',
        type='http', auth='user', website=True,
    )
    def portal_workspace_document_download(self, project_id, document_id, **kw):
        _project, _user_role, document = self._portal_ws_document_or_404(
            project_id, document_id,
        )
        if not document:
            return request.not_found()
        return self._portal_document_download_response(document)

    @route('/my/workspaces/<int:project_id>/specifications', type='http', auth='user', website=True)
    def portal_workspace_specifications(self, project_id, **kw):
        project, user_role = self._portal_ws_access(project_id)

        write_roles = ('ws_manager', 'doc_manager')
        has_write = bool(
            user_role and user_role.role in write_roles,
        )

        values = self._prepare_portal_layout_values()
        values.update({
            'project': project,
            'user_role': user_role,
            'has_write': has_write,
            'workspace_hub': True,
            'workspace_hub_page': 'specifications',
            'page_name': 'workspace_specifications',
            'members': self._portal_workspace_hub_members(project_id),
            **self._portal_workspace_hub_common(project, 'specifications', public_hub=False),
        })
        return request.render(
            'itlingo_website_portal.portal_workspace_specifications',
            values,
        )

    # ──────────────────────────────────────────────
    # Invitations
    # ──────────────────────────────────────────────

    @route('/my/invitations', type='http', auth='user', website=True)
    def portal_my_invitations(self, **kw):
        user = request.env.user

        org_invitations = request.env['itlingo.organization.role'].sudo().search([
            ('user_id', '=', user.id),
            ('state', '=', 'pending'),
        ])
        ws_invitations = request.env['itlingo.project.role'].sudo().search([
            ('user_id', '=', user.id),
            ('state', '=', 'pending'),
        ])

        values = self._prepare_portal_layout_values()
        values.update({
            'org_invitations': org_invitations,
            'ws_invitations': ws_invitations,
            'page_name': 'invitations',
        })
        return request.render('itlingo_website_portal.portal_my_invitations', values)

    @route('/my/invitations/org/<int:role_id>/accept',
           type='http', auth='user', website=True)
    def portal_accept_org_invitation(self, role_id, **kw):
        role = request.env['itlingo.organization.role'].sudo().browse(role_id)
        if role.exists() and role.user_id.id == request.env.user.id:
            role.action_accept()
        return request.redirect('/my/invitations')

    @route('/my/invitations/org/<int:role_id>/reject',
           type='http', auth='user', website=True)
    def portal_reject_org_invitation(self, role_id, **kw):
        role = request.env['itlingo.organization.role'].sudo().browse(role_id)
        if role.exists() and role.user_id.id == request.env.user.id:
            role.action_reject()
        return request.redirect('/my/invitations')

    @route('/my/invitations/ws/<int:role_id>/accept',
           type='http', auth='user', website=True)
    def portal_accept_ws_invitation(self, role_id, **kw):
        role = request.env['itlingo.project.role'].sudo().browse(role_id)
        if role.exists() and role.user_id.id == request.env.user.id:
            role.action_accept()
        return request.redirect('/my/invitations')

    @route('/my/invitations/ws/<int:role_id>/reject',
           type='http', auth='user', website=True)
    def portal_reject_ws_invitation(self, role_id, **kw):
        role = request.env['itlingo.project.role'].sudo().browse(role_id)
        if role.exists() and role.user_id.id == request.env.user.id:
            role.action_reject()
        return request.redirect('/my/invitations')

