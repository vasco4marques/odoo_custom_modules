"""Decouple workspaces from ``project.project``.

Workspaces used to be ``project.project`` records. They now live in the
dedicated ``itlingo.workspace`` model.

This runs in *pre*-migration (before Odoo creates/updates tables for the
module). We must materialise and populate ``itlingo_workspace`` here, because
during the module's table-setup phase Odoo recreates the foreign keys that
point at it (e.g. ``itlingo_project_role.project_id``) and validates them
against existing data. If the rows were not yet copied, that validation would
fail. Integer ids are preserved so every stored reference keeps pointing at
the right record without remapping.
"""

import logging

_logger = logging.getLogger(__name__)

# (table, column) pairs whose FK currently points at project_project. Dropped
# so the ORM can recreate them against itlingo_workspace during table setup.
_FK_TARGETS = [
    ('itlingo_project_role', 'project_id'),
    ('itlingo_document', 'project_id'),
    ('itlingo_integration_token', 'project_id'),
    ('itlingo_message', 'project_id'),
    ('itlingo_project_dsl_rel', 'project_id'),
]


def _drop_fks(cr, table, column):
    cr.execute("SELECT to_regclass(%s)", (table,))
    if not cr.fetchone()[0]:
        return
    cr.execute(
        """
        SELECT con.conname
        FROM pg_constraint con
        JOIN pg_class rel ON rel.oid = con.conrelid
        JOIN pg_attribute att
          ON att.attrelid = con.conrelid
         AND att.attnum = ANY(con.conkey)
        WHERE con.contype = 'f'
          AND rel.relname = %s
          AND att.attname = %s
        """,
        (table, column),
    )
    for (conname,) in cr.fetchall():
        _logger.info("Dropping FK %s on %s.%s", conname, table, column)
        cr.execute(
            'ALTER TABLE "%s" DROP CONSTRAINT IF EXISTS "%s"' % (table, conname)
        )


def migrate(cr, version):
    cr.execute("SELECT to_regclass('project_project')")
    if not cr.fetchone()[0]:
        return

    # Already migrated? Nothing to do.
    cr.execute("SELECT to_regclass('itlingo_workspace')")
    if cr.fetchone()[0]:
        return

    # 1) Create the new table with the columns we carry over. Odoo's table
    #    setup will later add the remaining (mail.thread, etc.) columns and the
    #    unique/foreign-key constraints.
    cr.execute(
        """
        CREATE SEQUENCE IF NOT EXISTS itlingo_workspace_id_seq;
        CREATE TABLE itlingo_workspace (
            id integer PRIMARY KEY DEFAULT nextval('itlingo_workspace_id_seq'),
            name varchar NOT NULL,
            description text,
            active boolean,
            organization_id integer,
            creator_id integer,
            methodology varchar,
            business_status varchar,
            planned_start date,
            planned_end date,
            actual_start date,
            actual_end date,
            planned_cost numeric,
            current_cost numeric,
            is_public_workspace boolean,
            workspace_key varchar,
            create_uid integer,
            create_date timestamp without time zone,
            write_uid integer,
            write_date timestamp without time zone
        );
        ALTER SEQUENCE itlingo_workspace_id_seq OWNED BY itlingo_workspace.id;
        """
    )

    # 2) Copy every project row, preserving the id. ``name`` is a translated
    #    (jsonb) column on project_project, so extract a text value.
    cr.execute(
        """
        INSERT INTO itlingo_workspace (
            id, name, description, active,
            organization_id, creator_id, methodology, business_status,
            planned_start, planned_end, actual_start, actual_end,
            planned_cost, current_cost, is_public_workspace, workspace_key,
            create_uid, create_date, write_uid, write_date
        )
        SELECT
            id,
            COALESCE(
                name->>'en_US',
                (SELECT v FROM jsonb_each_text(name) AS t(k, v) LIMIT 1),
                'Workspace'
            ),
            description,
            COALESCE(active, TRUE),
            organization_id, creator_id, methodology, business_status,
            planned_start, planned_end, actual_start, actual_end,
            planned_cost, current_cost,
            COALESCE(is_public_workspace, FALSE), workspace_key,
            create_uid, create_date, write_uid, write_date
        FROM project_project
        """
    )
    _logger.info("Migrated %s workspace(s) into itlingo_workspace", cr.rowcount)

    # 3) Keep the sequence ahead of the preserved ids.
    cr.execute(
        "SELECT setval('itlingo_workspace_id_seq', "
        "GREATEST((SELECT COALESCE(MAX(id), 0) FROM itlingo_workspace), 1))"
    )

    # 4) Drop the stale FK constraints so the ORM recreates them against
    #    itlingo_workspace (now populated, so validation passes).
    for table, column in _FK_TARGETS:
        _drop_fks(cr, table, column)

    # 5) Repoint external ids, chatter messages and followers to the new model.
    cr.execute(
        """
        UPDATE ir_model_data SET model = 'itlingo.workspace'
        WHERE model = 'project.project'
          AND res_id IN (SELECT id FROM itlingo_workspace)
        """
    )
    cr.execute(
        """
        UPDATE mail_message SET model = 'itlingo.workspace'
        WHERE model = 'project.project'
          AND res_id IN (SELECT id FROM itlingo_workspace)
        """
    )
    cr.execute(
        """
        UPDATE mail_followers SET res_model = 'itlingo.workspace'
        WHERE res_model = 'project.project'
          AND res_id IN (SELECT id FROM itlingo_workspace)
        """
    )
