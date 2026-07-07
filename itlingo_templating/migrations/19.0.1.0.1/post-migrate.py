"""Recompute stored template flags after the document type taxonomy change."""

import logging

_logger = logging.getLogger(__name__)


def migrate(cr, version):
    cr.execute(
        """
        UPDATE itlingo_document d
           SET is_template = COALESCE((
               SELECT t.type_code = 'document_template'
                 FROM itlingo_document_type t
                WHERE t.id = d.document_type_id
           ), FALSE)
        """
    )
    _logger.info("Recomputed is_template for %s document(s)", cr.rowcount)
