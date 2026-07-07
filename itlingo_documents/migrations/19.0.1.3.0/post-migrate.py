"""Map legacy document types to the v0.2 taxonomy."""

import logging

_logger = logging.getLogger(__name__)


def _xmlid_id(cr, module, name):
    cr.execute(
        """
        SELECT res_id
          FROM ir_model_data
         WHERE module = %s
           AND name = %s
           AND model = 'itlingo.document.type'
        """,
        (module, name),
    )
    row = cr.fetchone()
    return row[0] if row else None


def migrate(cr, version):
    legacy_to_target = {
        'doc_type_rsl': 'doc_type_specification',
        'doc_type_psl': 'doc_type_specification',
        'doc_type_tsl': 'doc_type_specification',
        'doc_type_report': 'doc_type_technical_document',
        'doc_type_manual': 'doc_type_technical_document',
    }

    moved = 0
    for legacy_xmlid, target_xmlid in legacy_to_target.items():
        legacy_id = _xmlid_id(cr, 'itlingo_documents', legacy_xmlid)
        target_id = _xmlid_id(cr, 'itlingo_documents', target_xmlid)
        if not legacy_id or not target_id or legacy_id == target_id:
            continue
        cr.execute(
            """
            UPDATE itlingo_document
               SET document_type_id = %s
             WHERE document_type_id = %s
            """,
            (target_id, legacy_id),
        )
        moved += cr.rowcount

    cr.execute(
        """
        UPDATE itlingo_document_type
           SET active = FALSE
         WHERE id IN (
            SELECT res_id
              FROM ir_model_data
             WHERE module = 'itlingo_documents'
               AND name IN (
                   'doc_type_rsl', 'doc_type_psl', 'doc_type_tsl',
                   'doc_type_report', 'doc_type_manual'
               )
               AND model = 'itlingo.document.type'
         )
        """
    )
    _logger.info("Migrated %s document(s) away from legacy document types", moved)
