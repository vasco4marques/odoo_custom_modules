# pylint: disable=missing-return
"""Make the DSLs navbar entry a normal (unrestricted) menu item.

The DSL catalog became public read-only, so the generic ``menu_itlingo_dsls``
record no longer carries any group. As with 19.0.1.1.1, the per-website menu
copies (the ones actually rendered in the navbar) keep their own group links,
so propagate the (now empty) groups from each generic ITLingo menu to its
website-specific copies.
"""


def migrate(cr, version):
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
