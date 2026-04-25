# pylint: disable=missing-return


def migrate(cr, version):
    """Recreate homepage as page-owned QWeb (inline arch) for full Website Builder structure blocks."""
    from odoo import SUPERUSER_ID, api

    env = api.Environment(cr, SUPERUSER_ID, {})
    Imd = env["ir.model.data"].sudo()
    page_row = Imd.search(
        [
            ("module", "=", "itlingo_website_portal"),
            ("name", "=", "itlingo_page_homepage"),
            ("model", "=", "website.page"),
        ],
        limit=1,
    )
    if not page_row:
        return
    page = env["website.page"].sudo().browse(page_row.res_id).exists()
    if not page:
        Imd.search(
            [
                ("module", "=", "itlingo_website_portal"),
                ("name", "in", ("itlingo_page_homepage", "menu_itlingo_home")),
            ]
        ).unlink()
        return
    view = page.view_id
    if not view or view.key != "itlingo_website_portal.itlingo_homepage":
        return

    menu_row = Imd.search(
        [
            ("module", "=", "itlingo_website_portal"),
            ("name", "=", "menu_itlingo_home"),
            ("model", "=", "website.menu"),
        ],
        limit=1,
    )
    if menu_row:
        menu = env["website.menu"].sudo().browse(menu_row.res_id).exists()
        if menu:
            menu.unlink()

    page.unlink()
    env["ir.ui.view"].sudo().search([("key", "=", "itlingo_website_portal.itlingo_homepage")]).unlink()
    Imd.search(
        [
            ("module", "=", "itlingo_website_portal"),
            ("name", "in", ("itlingo_page_homepage", "menu_itlingo_home", "itlingo_homepage")),
        ]
    ).unlink()
