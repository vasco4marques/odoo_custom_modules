# pylint: disable=missing-return
"""Propagate menu group_ids from generic menus to their per-website copies.

``website.menu`` records created without a ``website_id`` are duplicated per
website at install time, but module upgrades only update the xmlid-bound
generic record. The DSL maintainer group was added to ``menu_itlingo_dsls``
after the initial install, so the website-specific copies (the ones actually
rendered in the navbar) kept their old groups and maintainers could not see
the DSLs menu entry.
"""


def migrate(cr, version):
    # Replace each website copy's groups with those of the matching generic
    # ITLingo menu (same url).
    cr.execute(
        """
        DELETE FROM res_groups_website_menu_rel rel
        USING website_menu m
        WHERE rel.website_menu_id = m.id
          AND m.website_id IS NOT NULL
          AND m.url IN (
              SELECT gm.url
              FROM website_menu gm
              JOIN ir_model_data imd
                ON imd.model = 'website.menu'
               AND imd.module = 'itlingo_website_portal'
               AND imd.res_id = gm.id
              WHERE gm.website_id IS NULL
          )
        """
    )
    cr.execute(
        """
        INSERT INTO res_groups_website_menu_rel (res_groups_id, website_menu_id)
        SELECT rel.res_groups_id, m.id
        FROM website_menu gm
        JOIN ir_model_data imd
          ON imd.model = 'website.menu'
         AND imd.module = 'itlingo_website_portal'
         AND imd.res_id = gm.id
        JOIN res_groups_website_menu_rel rel
          ON rel.website_menu_id = gm.id
        JOIN website_menu m
          ON m.url = gm.url
         AND m.website_id IS NOT NULL
        WHERE gm.website_id IS NULL
        ON CONFLICT DO NOTHING
        """
    )
