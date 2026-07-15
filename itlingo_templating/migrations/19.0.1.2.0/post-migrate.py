"""Discard grammar inventories described from unflattened entry grammars.

Multi-file grammars used to reach the describer with their imports
unresolved, caching an ENOENT failure payload under a digest the fix does
not change. Inventories are cheap caches; clear them all so the next portal
visit rebuilds from the flattened grammar.
"""

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
