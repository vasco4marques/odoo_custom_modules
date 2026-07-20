"""Recompute the stored template flag for the unified type code."""

import logging


_logger = logging.getLogger(__name__)


def migrate(cr, version):
    cr.execute(
        """
        UPDATE itlingo_document d
           SET is_template = COALESCE((
               SELECT t.type_code = 'template'
                 FROM itlingo_document_type t
                WHERE t.id = d.document_type_id
           ), FALSE)
        """
    )
    _logger.info("Recomputed is_template for %s document(s)", cr.rowcount)
