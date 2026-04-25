# pylint: disable=missing-return
"""Reset ITLingo homepage if it still uses the old prefilled #wrap (blocks Structure snippets)."""

OLD_DEFAULT_MARKER = "Ready to streamline your project management"

NEW_ARCH = """<t name="ITLingo Home" t-name="itlingo_website_portal.itlingo_page_homepage">
                <t t-call="website.layout">
                    <t t-set="pageName" t-value="'itlingo_home'"/>
                    <t t-set="additional_title">ITLingo Cloud</t>
                    <t t-set="meta_description">Collaborative platform for organizations, workspaces, and agile projects.</t>
                    <div id="wrap" class="oe_structure oe_empty"/>
                </t>
            </t>"""


def migrate(cr, version):
    from odoo import SUPERUSER_ID, api

    env = api.Environment(cr, SUPERUSER_ID, {})
    try:
        page = env.ref("itlingo_website_portal.itlingo_page_homepage")
    except ValueError:
        return
    if not page.view_id:
        return
    arch = page.view_id.arch_db or ""
    if OLD_DEFAULT_MARKER not in arch:
        return
    page.view_id.with_context(no_cow=True).write({"arch": NEW_ARCH})
