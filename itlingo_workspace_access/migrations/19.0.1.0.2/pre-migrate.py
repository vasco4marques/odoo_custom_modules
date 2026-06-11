# pylint: disable=missing-return
"""Regenerate duplicated project workspace keys.

When ``workspace_key`` was first added to ``project.project``, Odoo evaluated
the column default once and backfilled every pre-existing project with the
same UUID. Each workspace must have a unique key (external services such as
the ITLingo chatbot identify workspaces by it), so this migration regenerates
keys for all duplicates.

For each group of projects sharing a key, the project already bound to that
key in the chatbot integration (``chatbot_chatworkspace``) keeps it so its
chat history stays attached; every other project gets a fresh UUID.

Runs as a pre-migration so the UNIQUE constraint on ``workspace_key`` can be
created during the module upgrade that follows.
"""

import uuid


def migrate(cr, version):
    cr.execute("""
        SELECT workspace_key
        FROM project_project
        WHERE workspace_key IS NOT NULL AND workspace_key != ''
        GROUP BY workspace_key
        HAVING count(*) > 1
    """)
    duplicate_keys = [row[0] for row in cr.fetchall()]

    cr.execute("""
        SELECT id FROM project_project
        WHERE workspace_key IS NULL OR workspace_key = ''
    """)
    missing_key_ids = [row[0] for row in cr.fetchall()]

    if not duplicate_keys and not missing_key_ids:
        return

    cr.execute("""
        SELECT 1 FROM information_schema.tables
        WHERE table_name = 'chatbot_chatworkspace'
    """)
    has_chatbot_table = bool(cr.fetchone())

    for key in duplicate_keys:
        cr.execute(
            "SELECT id FROM project_project WHERE workspace_key = %s ORDER BY id",
            (key,),
        )
        project_ids = [row[0] for row in cr.fetchall()]

        keep_id = project_ids[0]
        if has_chatbot_table:
            cr.execute(
                """
                SELECT odoo_project_id FROM chatbot_chatworkspace
                WHERE workspace_key = %s AND odoo_project_id = ANY(%s)
                LIMIT 1
                """,
                (key, project_ids),
            )
            row = cr.fetchone()
            if row and row[0]:
                keep_id = row[0]

        for project_id in project_ids:
            if project_id == keep_id:
                continue
            cr.execute(
                "UPDATE project_project SET workspace_key = %s WHERE id = %s",
                (str(uuid.uuid4()), project_id),
            )

    for project_id in missing_key_ids:
        cr.execute(
            "UPDATE project_project SET workspace_key = %s WHERE id = %s",
            (str(uuid.uuid4()), project_id),
        )
