# pylint: disable=missing-return
"""Remove custom ITLingo website home, menu, and rewrite introduced in earlier versions."""

def migrate(cr, version):
    from odoo.addons.itlingo_website_portal.hooks import (
        _sql_delete_website_menu_by_xmlid,
        _sql_delete_website_page_by_xmlid,
    )

    _sql_delete_website_menu_by_xmlid(
        cr, "itlingo_website_portal", "menu_itlingo_home",
    )
    _sql_delete_website_page_by_xmlid(
        cr, "itlingo_website_portal", "itlingo_page_homepage",
    )
    cr.execute(
        """
        DELETE FROM website_rewrite r
        USING ir_model_data imd
        WHERE imd.module = 'itlingo_website_portal'
          AND imd.name = 'rewrite_itlingo_to_home'
          AND imd.model = 'website.rewrite'
          AND r.id = imd.res_id
        """
    )
    cr.execute(
        """
        DELETE FROM ir_model_data
        WHERE module = 'itlingo_website_portal'
          AND name = 'rewrite_itlingo_to_home'
          AND model = 'website.rewrite'
        """
    )
