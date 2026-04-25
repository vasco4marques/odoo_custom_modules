# pylint: disable=missing-return
"""Full website_remove_defaults SQL cleanup (about/features pages, configurator URLs)."""

def migrate(cr, version):
    from odoo.addons.itlingo_website_portal.hooks import run_website_remove_defaults_sql

    run_website_remove_defaults_sql(cr)
