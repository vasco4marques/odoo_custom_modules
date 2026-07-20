"""Collapse legacy template concepts into the unified Template type."""

import logging
import os

from odoo import SUPERUSER_ID, api


_logger = logging.getLogger(__name__)


def _xmlid_id(cr, name):
    cr.execute(
        """
        SELECT res_id
          FROM ir_model_data
         WHERE module = 'itlingo_documents'
           AND name = %s
           AND model = 'itlingo.document.type'
        """,
        (name,),
    )
    row = cr.fetchone()
    return row[0] if row else None


def migrate(cr, version):
    canonical_id = _xmlid_id(cr, 'doc_type_template')
    legacy_id = _xmlid_id(cr, 'doc_type_specification_template')
    if not canonical_id:
        _logger.warning("Template migration skipped: canonical XML id is missing")
        return

    env = api.Environment(cr, SUPERUSER_ID, {})
    if legacy_id and legacy_id != canonical_id:
        # Clear grounding through the ORM while these records still have their
        # legacy type. This invokes the regular KB cleanup before the unified
        # Template constraints start applying to them.
        legacy_grounding_templates = env['itlingo.document'].search([
            ('document_type_id', '=', legacy_id),
            ('dsl_knowledge', '=', True),
        ])
        if legacy_grounding_templates:
            legacy_grounding_templates.write({'dsl_knowledge': False})
            _logger.info(
                "Removed %s legacy template(s) from grounding knowledge",
                len(legacy_grounding_templates),
            )

    if legacy_id and legacy_id != canonical_id:
        cr.execute(
            """
            UPDATE itlingo_document
               SET document_type_id = %s
             WHERE document_type_id = %s
            """,
            (canonical_id, legacy_id),
        )
        _logger.info("Moved %s legacy specification template(s)", cr.rowcount)

    cr.execute(
        """
        UPDATE itlingo_document_type
           SET type_code = 'template',
               name = CASE WHEN id = %s THEN 'Template' ELSE name END,
               extension_file = NULL,
               active = (id = %s)
         WHERE id IN %s
        """,
        (canonical_id, canonical_id, tuple(
            item for item in (canonical_id, legacy_id) if item
        )),
    )

    cr.execute(
        """
        SELECT column_name
          FROM information_schema.columns
         WHERE table_name = 'itlingo_document'
           AND column_name = 'is_template'
        """
    )
    if cr.fetchone():
        cr.execute(
            "UPDATE itlingo_document SET is_template = "
            "(document_type_id = %s)",
            (canonical_id,),
        )

    templates_without_dsl = env['itlingo.document'].search([
        ('document_type_id', '=', canonical_id),
        ('dsl_id', '=', False),
    ])
    dsls = env['itlingo.dsl'].search([])
    inferred = 0
    for document in templates_without_dsl:
        extension = os.path.splitext(document.file_name or '')[1].lower().lstrip('.')
        matches = dsls.filtered(lambda dsl: extension in dsl._extensions())
        if len(matches) == 1:
            document.dsl_id = matches.id
            inferred += 1
        else:
            _logger.warning(
                "Template %s needs a DSL assignment after migration",
                document.display_name,
            )
    _logger.info("Inferred a DSL for %s migrated template(s)", inferred)

    # Remove metadata for the unused standalone itlingo.document.template
    # model. Its records never participated in document generation.
    cr.execute(
        """
        DELETE FROM ir_ui_menu
         WHERE id IN (
            SELECT res_id FROM ir_model_data
             WHERE module = 'itlingo_documents'
               AND name = 'itlingo_menu_document_templates'
         )
        """
    )
    cr.execute(
        "DELETE FROM ir_act_window WHERE res_model = 'itlingo.document.template'"
    )
    cr.execute(
        "DELETE FROM ir_ui_view WHERE model = 'itlingo.document.template'"
    )
    cr.execute(
        """
        DELETE FROM ir_model_access
         WHERE model_id IN (
            SELECT id FROM ir_model WHERE model = 'itlingo.document.template'
         )
        """
    )
    cr.execute(
        """
        DELETE FROM ir_model_data
         WHERE module = 'itlingo_documents'
           AND (
               name LIKE 'itlingo_document_template_%%'
               OR name LIKE 'access_itlingo_document_template_%%'
               OR name = 'itlingo_menu_document_templates'
           )
        """
    )
    stale_model = env['ir.model'].search([
        ('model', '=', 'itlingo.document.template'),
    ])
    if stale_model:
        stale_model.with_context(_force_unlink=True).unlink()
