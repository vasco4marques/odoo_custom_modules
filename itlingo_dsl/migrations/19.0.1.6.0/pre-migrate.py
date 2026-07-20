"""Replace the removed DSL ``archived`` lifecycle status."""

import logging


_logger = logging.getLogger(__name__)


def migrate(cr, version):
    cr.execute(
        """
        UPDATE itlingo_dsl
           SET status = 'deprecated'
         WHERE status = 'archived'
        """
    )
    _logger.info(
        "Migrated %s archived DSL(s) to deprecated",
        cr.rowcount,
    )
