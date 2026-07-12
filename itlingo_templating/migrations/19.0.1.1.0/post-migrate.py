"""Discard grammar inventories cached with the pre-1.1 schema."""

import logging

_logger = logging.getLogger(__name__)


def migrate(cr, version):
    cr.execute(
        """
        UPDATE itlingo_dsl
           SET template_reference_json = NULL,
               template_reference_digest = NULL
         WHERE template_reference_json IS NOT NULL
            OR template_reference_digest IS NOT NULL
        """
    )
    _logger.info("Cleared %s cached template reference inventory(ies)", cr.rowcount)
