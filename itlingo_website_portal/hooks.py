import logging

_logger = logging.getLogger(__name__)


def _sql_try_delete_orphan_view(cr, view_id):
    if not view_id:
        return
    cr.execute("SELECT 1 FROM ir_ui_view WHERE id = %s", (view_id,))
    if not cr.fetchone():
        return
    try:
        cr.execute(
            """
            DELETE FROM ir_ui_view
            WHERE id = %s
              AND NOT EXISTS (
                  SELECT 1 FROM website_page WHERE website_page.view_id = ir_ui_view.id
              )
            """,
            (view_id,),
        )
    except Exception:
        _logger.warning(
            "Could not delete ir.ui.view id=%s; you may remove it from Technical settings.",
            view_id,
            exc_info=True,
        )


def _sql_delete_website_page_by_id(cr, page_id, module=None, xmlid_name=None):
    """Remove one website.page row and its menus/xmlid without using the ORM."""
    cr.execute("DELETE FROM website_menu WHERE page_id = %s", (page_id,))
    cr.execute("SELECT view_id FROM website_page WHERE id = %s", (page_id,))
    vrow = cr.fetchone()
    view_id = vrow[0] if vrow else None
    cr.execute("DELETE FROM website_page WHERE id = %s", (page_id,))
    if module and xmlid_name:
        cr.execute(
            """
            DELETE FROM ir_model_data
            WHERE module = %s AND name = %s AND model = 'website.page'
            """,
            (module, xmlid_name),
        )
    else:
        cr.execute(
            """
            DELETE FROM ir_model_data
            WHERE model = 'website.page' AND res_id = %s
            """,
            (page_id,),
        )
    _sql_try_delete_orphan_view(cr, view_id)


def _sql_delete_website_menu_by_xmlid(cr, module, name):
    cr.execute(
        """
        SELECT res_id FROM ir_model_data
        WHERE module = %s AND name = %s AND model = 'website.menu'
        """,
        (module, name),
    )
    row = cr.fetchone()
    if not row:
        return
    menu_id = row[0]
    cr.execute("DELETE FROM website_menu WHERE id = %s", (menu_id,))
    cr.execute(
        """
        DELETE FROM ir_model_data
        WHERE module = %s AND name = %s AND model = 'website.menu'
        """,
        (module, name),
    )


def _sql_delete_website_page_by_xmlid(cr, module, name):
    cr.execute(
        """
        SELECT res_id FROM ir_model_data
        WHERE module = %s AND name = %s AND model = 'website.page'
        """,
        (module, name),
    )
    row = cr.fetchone()
    if not row:
        return
    _sql_delete_website_page_by_id(cr, row[0], module=module, xmlid_name=name)


def _sql_delete_menus_and_pages_by_urls(cr, urls):
    if not urls:
        return
    cr.execute(
        "DELETE FROM website_menu WHERE url IN %s",
        (tuple(urls),),
    )
    cr.execute(
        "SELECT id FROM website_page WHERE url IN %s",
        (tuple(urls),),
    )
    for (page_id,) in cr.fetchall():
        _sql_delete_website_page_by_id(cr, page_id)


def run_website_remove_defaults_sql(cr):
    """Everything that used to live in data/website_remove_defaults.xml (ORM-safe)."""
    cr.execute(
        """
        UPDATE ir_ui_view
           SET active = TRUE
         WHERE key = 'website.footer_no_copyright'
        """,
    )

    _sql_delete_website_menu_by_xmlid(
        cr, "itlingo_website_portal", "menu_itlingo_about",
    )
    _sql_delete_website_page_by_xmlid(
        cr, "itlingo_website_portal", "itlingo_page_about",
    )
    _sql_delete_website_menu_by_xmlid(
        cr, "itlingo_website_portal", "menu_itlingo_features",
    )
    _sql_delete_website_page_by_xmlid(
        cr, "itlingo_website_portal", "itlingo_page_features",
    )

    _sql_delete_menus_and_pages_by_urls(cr, ["/about-us", "/our-services"])


def pre_init_hook(env):
    """Before module data load on install: drop legacy ITLingo demo pages/menus."""
    run_website_remove_defaults_sql(env.cr)


def post_init_hook(env):
    """After install: repeat defaults cleanup (idempotent) and legacy URL rows."""
    run_website_remove_defaults_sql(env.cr)
    _sql_delete_menus_and_pages_by_urls(
        env.cr,
        ["/about", "/features"],
    )
