"""Carry the workspace ``default_dsl_id`` over to ``itlingo.workspace``.

The ``allowed_dsl_ids`` m2m lives in ``itlingo_project_dsl_rel`` keyed by the
(preserved) workspace id, so it survives the decoupling automatically. The
scalar ``default_dsl_id`` was a column on ``project_project`` and must be
copied onto the new ``itlingo_workspace`` rows explicitly.
"""

import logging

_logger = logging.getLogger(__name__)


def migrate(cr, version):
    cr.execute("SELECT to_regclass('project_project')")
    if not cr.fetchone()[0]:
        return
    # Only act if the old column actually exists.
    cr.execute(
        """
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'project_project' AND column_name = 'default_dsl_id'
        """
    )
    if not cr.fetchone():
        return

    cr.execute(
        """
        UPDATE itlingo_workspace w
        SET default_dsl_id = p.default_dsl_id
        FROM project_project p
        WHERE p.id = w.id
          AND p.default_dsl_id IS NOT NULL
        """
    )
    _logger.info("Copied default_dsl_id for %s workspace(s)", cr.rowcount)
