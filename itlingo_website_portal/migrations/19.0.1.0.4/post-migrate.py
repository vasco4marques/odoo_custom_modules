# pylint: disable=missing-return
"""Repair DBs where website.page/website.menu rows could not be removed via XML delete."""

def migrate(cr, version):
    from odoo.addons.itlingo_website_portal.hooks import run_website_remove_defaults_sql

    run_website_remove_defaults_sql(cr)
