from odoo import _, fields
from odoo.addons.auth_signup.controllers.main import AuthSignupHome
from odoo.exceptions import UserError
from odoo.http import request


TERMS_VERSION = '2026-07'


class TermsSignup(AuthSignupHome):
    """Require and record Terms acceptance for every website signup."""

    def get_auth_signup_qcontext(self):
        qcontext = super().get_auth_signup_qcontext()
        qcontext['terms_accepted'] = request.params.get('terms_accepted')
        return qcontext

    def _prepare_signup_values(self, qcontext):
        values = super()._prepare_signup_values(qcontext)
        # This helper is also used by /web/reset_password. Terms acceptance is
        # required only when an account is created from the registration form.
        if not request.httprequest.path.rstrip('/').endswith('/web/signup'):
            return values

        if qcontext.get('terms_accepted') != 'on':
            raise UserError(_(
                'You must accept the Terms and Conditions before creating an account.'
            ))

        httprequest = request.httprequest
        values.update({
            'terms_accepted_version': TERMS_VERSION,
            'terms_accepted_at': fields.Datetime.now(),
            'terms_accepted_ip': httprequest.remote_addr,
            'terms_accepted_user_agent': httprequest.environ.get('HTTP_USER_AGENT'),
        })
        return values
