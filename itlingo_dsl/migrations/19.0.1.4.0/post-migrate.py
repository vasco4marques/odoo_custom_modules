"""Initialize multi-file grammar metadata for existing grammar records."""

import logging


_logger = logging.getLogger(__name__)


def migrate(cr, version):
    cr.execute(
        """
        UPDATE itlingo_dsl_file
           SET relative_path = file_name,
               is_entry = TRUE
         WHERE file_type = 'grammar'
           AND relative_path IS NULL
        """
    )
    _logger.info("Initialized grammar workspace metadata for %s file(s)", cr.rowcount)
