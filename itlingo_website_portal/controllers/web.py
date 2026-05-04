from odoo import http
from odoo.addons.portal.controllers.web import Home as PortalHome
from odoo.addons.web.controllers.utils import is_user_internal
from odoo.addons.website.controllers.main import Website as WebsiteHome
from odoo.addons.website.controllers.main import WebsiteSession
from odoo.http import request


class Website(WebsiteHome):
    """Send portal users to the website home ``/`` after login, not ``/my``."""

    def _login_redirect(self, uid, redirect=None):
        if not redirect:
            user = request.env['res.users'].sudo().browse(uid)
            if user._is_internal():
                if request.params.get('login_success'):
                    redirect = '/odoo?' + request.httprequest.query_string.decode()
            elif user.org_setup_pending:
                redirect = '/welcome/create-organization'
            else:
                redirect = '/'
        return super()._login_redirect(uid, redirect=redirect)

    @http.route()
    def web_client(self, s_action=None, **kw):
        if request.session.uid and not is_user_internal(request.session.uid):
            return request.redirect_query('/', query=request.params)
        return super(PortalHome, self).web_client(s_action, **kw)


class WebsiteLogout(WebsiteSession):
    """Default logout to website home ``/`` when no ``redirect`` query is given."""

    @http.route(auth='public')
    def logout(self, *args, **kw):
        redir = request.params.get('redirect') or '/'
        return super(WebsiteSession, self).logout(redirect=redir)
