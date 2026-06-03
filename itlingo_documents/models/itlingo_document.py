import base64
import logging

from odoo import api, fields, models, _
from odoo.exceptions import ValidationError

_logger = logging.getLogger(__name__)


class ItlingoDocument(models.Model):
    _name = 'itlingo.document'
    _description = 'ITLingo Document'
    _inherit = ['mail.thread', 'mail.activity.mixin']
    _order = 'creation_date desc, name'

    name = fields.Char(required=True, tracking=True)
    status = fields.Selection([
        ('draft', 'Draft'),
        ('in_review', 'In Review'),
        ('approved', 'Approved'),
        ('published', 'Published'),
        ('archived', 'Archived'),
    ], default='draft', required=True, tracking=True)
    version = fields.Char(default='1.0', tracking=True)
    document_file = fields.Binary(string='File', attachment=True)
    file_name = fields.Char(string='Filename')
    file_size = fields.Integer(
        compute='_compute_file_size', store=True, string='Size (bytes)',
    )

    document_type_id = fields.Many2one(
        'itlingo.document.type', string='Document Type', tracking=True,
    )
    template_id = fields.Many2one(
        'itlingo.document.template', string='Template',
    )
    project_id = fields.Many2one(
        'project.project', string='Project',
        tracking=True,
    )
    organization_id = fields.Many2one(
        'itlingo.organization', string='Organization',
        tracking=True,
    )
    creator_id = fields.Many2one(
        'res.users', string='Creator',
        default=lambda self: self.env.user, readonly=True,
    )
    creation_date = fields.Datetime(
        default=fields.Datetime.now, readonly=True,
    )
    library_ids = fields.One2many(
        'itlingo.document.library', 'document_id', string='Libraries',
    )

    # DSL-specific fields
    grammar_file = fields.Binary(string='Grammar File', attachment=True)
    grammar_file_name = fields.Char(string='Grammar Filename')
    validation_rules_file = fields.Binary(string='Validation Rules File', attachment=True)
    validation_rules_file_name = fields.Char(string='Validation Rules Filename')
    examples_file = fields.Binary(string='Examples File', attachment=True)
    examples_file_name = fields.Char(string='Examples Filename')
    spec_example_file_ids = fields.One2many(
        'itlingo.document.spec.file', 'document_id',
        string='Specification Examples',
    )

    @api.depends('document_file')
    def _compute_file_size(self):
        for doc in self:
            if doc.document_file:
                doc.file_size = len(base64.b64decode(doc.document_file))
            else:
                doc.file_size = 0

    def action_submit_review(self):
        missing_lib = self.filtered(lambda d: not d.library_ids)
        if missing_lib:
            raise ValidationError(
                _('Add at least one library before submitting for review (document: %s).',
                  ', '.join(missing_lib.mapped('name'))),
            )
        self.write({'status': 'in_review'})

    def action_approve(self):
        self.write({'status': 'approved'})

    @api.model_create_multi
    def create(self, vals_list):
        records = super().create(vals_list)
        published = records.filtered(lambda r: r.status == 'published')
        if published:
            published._sync_kb_files()
        return records

    def write(self, vals):
        # Detect documents transitioning away from 'published' so we can
        # remove their KB files regardless of how the status is changed
        # (action buttons OR direct form write).
        was_published = self.filtered(lambda d: d.status == 'published')
        _logger.info("KB write: was_published=%s, status in vals=%s", was_published.ids, vals.get('status'))
        result = super().write(vals)
        is_still_published = self.filtered(lambda d: d.status == 'published')
        _logger.info("KB write: is_still_published=%s", is_still_published.ids)

        # Re-sync KB files when a published document's DSL files change
        if any(f in vals for f in (
            'grammar_file', 'grammar_file_name',
            'validation_rules_file', 'validation_rules_file_name',
            'examples_file', 'examples_file_name',
            'name', 'status',
        )):
            if is_still_published:
                is_still_published._sync_kb_files()

        # Remove KB files when a published doc is unpublished
        unpublished = was_published - is_still_published
        if unpublished:
            unpublished._remove_kb_files()

        return result

    def action_publish(self):
        self.write({'status': 'published'})

    def action_archive(self):
        self.write({'status': 'archived'})

    def action_reset_draft(self):
        self.write({'status': 'draft'})

    def unlink(self):
        """Remove KB files before deleting the document."""
        self._remove_kb_files()
        return super().unlink()

    # --------------------------------------------------------
    # KB file sync – create/update chatbot_kbfile records
    # --------------------------------------------------------
    def _attachment_base64(self, field_name: str):
        """Read base64 data for an attachment field directly from ir.attachment."""
        return _read_attachment_base64(self.env, 'itlingo.document', self.id, field_name)

    def _sync_kb_files(self):
        """Create / update chatbot_kbfile records for this document's DSL files."""
        import base64 as _b64
        kb_file_model = self.env.get('itlingo.kb.file')
        if kb_file_model is None:
            _logger.info("itlingo.kb.file model not available – skipping KB sync")
            return
        kb_lang_model = self.env.get('itlingo.kb.language')
        if kb_lang_model is None:
            return

        for doc in self:
            if doc.status != 'published':
                continue

            org_id = doc.organization_id.id if doc.organization_id else None
            project_id = doc.project_id.id if doc.project_id else None

            # Ensure a KBLanguage record exists for this DSL name
            lang = kb_lang_model.sudo().search([('name', '=', doc.name)], limit=1)
            if not lang:
                lang = kb_lang_model.sudo().create({'name': doc.name})

            # --- DSL file fields ---
            for file_type, name_field, att_field in [
                ('grammar', 'grammar_file_name', 'grammar_file'),
                ('validation', 'validation_rules_file_name', 'validation_rules_file'),
                ('examples', 'examples_file_name', 'examples_file'),
            ]:
                file_name = getattr(doc, name_field) or ''
                raw_b64 = doc._attachment_base64(att_field)
                if not raw_b64 or not file_name:
                    existing = kb_file_model.sudo().search([
                        ('language_id', '=', lang.id), ('file_type', '=', file_type),
                    ], limit=1)
                    if existing:
                        existing.sudo().unlink()
                    continue

                _logger.info("KB sync: upserting %s for %s (%s)", file_type, doc.name, file_name)
                raw_bytes = _b64.b64decode(raw_b64)
                try:
                    file_text = raw_bytes.decode('utf-8')
                except UnicodeDecodeError:
                    file_text = raw_bytes.decode('latin-1')
                file_text = file_text.replace('\x00', '')

                existing = kb_file_model.sudo().search([
                    ('language_id', '=', lang.id), ('file_type', '=', file_type),
                ], limit=1)
                vals = {
                    'file_name': file_name,
                    'extension': file_name.rsplit('.', 1)[-1].lower() if '.' in file_name else '',
                    'mime_type': 'application/octet-stream',
                    'file_type': file_type, 'language_id': lang.id,
                    'content': file_text, 'extraction_method': 'odoo_direct',
                    'is_enabled': True,
                    'organization_id': org_id, 'project_id': project_id,
                }
                if existing:
                    existing.sudo().write(vals)
                else:
                    kb_file_model.sudo().create(vals)

            # --- Spec examples ---
            for spec_file in doc.spec_example_file_ids:
                spec_raw = _read_attachment_base64(
                    self.env, 'itlingo.document.spec.file', spec_file.id, 'file_data',
                )
                if not spec_raw or not spec_file.name:
                    existing = kb_file_model.sudo().search([
                        ('language_id', '=', lang.id), ('file_type', '=', 'specification'),
                        ('file_name', '=', spec_file.name),
                    ], limit=1)
                    if existing:
                        existing.sudo().unlink()
                    continue

                ext = spec_file.name.rsplit('.', 1)[-1].lower() if '.' in spec_file.name else ''
                raw_bytes = _b64.b64decode(spec_raw)
                try:
                    file_text = raw_bytes.decode('utf-8')
                except UnicodeDecodeError:
                    file_text = raw_bytes.decode('latin-1')
                file_text = file_text.replace('\x00', '')

                existing = kb_file_model.sudo().search([
                    ('language_id', '=', lang.id), ('file_type', '=', 'specification'),
                    ('file_name', '=', spec_file.name),
                ], limit=1)
                vals = {
                    'file_name': spec_file.name, 'extension': ext,
                    'mime_type': 'application/octet-stream',
                    'file_type': 'specification', 'language_id': lang.id,
                    'content': file_text, 'extraction_method': 'odoo_direct',
                    'is_enabled': True,
                    'organization_id': org_id, 'project_id': project_id,
                }
                if existing:
                    existing.sudo().write(vals)
                else:
                    kb_file_model.sudo().create(vals)

            # Remove orphan spec files
            current_names = set(doc.spec_example_file_ids.mapped('name'))
            orphans = kb_file_model.sudo().search([
                ('language_id', '=', lang.id), ('file_type', '=', 'specification'),
                ('file_name', 'not in', list(current_names)),
            ])
            if orphans:
                orphans.sudo().unlink()

            # --- Main document file (organisation / workspace-level documents) ---
            doc_raw = doc._attachment_base64('document_file')
            doc_file_name = (doc.file_name or '').strip()
            if doc_raw and doc_file_name:
                ext = doc_file_name.rsplit('.', 1)[-1].lower() if '.' in doc_file_name else ''
                raw_bytes = _b64.b64decode(doc_raw)
                try:
                    file_text = raw_bytes.decode('utf-8')
                except UnicodeDecodeError:
                    file_text = raw_bytes.decode('latin-1')
                file_text = file_text.replace('\x00', '')

                existing = kb_file_model.sudo().search([
                    ('file_type', '=', 'other'), ('file_name', '=', doc_file_name),
                    ('organization_id', '=', org_id), ('project_id', '=', project_id),
                ], limit=1)
                vals = {
                    'file_name': doc_file_name, 'extension': ext,
                    'mime_type': 'application/octet-stream',
                    'file_type': 'other', 'language_id': None,
                    'content': file_text, 'extraction_method': 'odoo_direct',
                    'is_enabled': True,
                    'organization_id': org_id, 'project_id': project_id,
                }
                if existing:
                    existing.sudo().write(vals)
                else:
                    kb_file_model.sudo().create(vals)

    def _remove_kb_files(self):
        """Delete chatbot_kbfile records when a document is unpublished."""
        cr = self.env.cr
        for doc in self:
            org_id = doc.organization_id.id if doc.organization_id else None
            project_id = doc.project_id.id if doc.project_id else None
            _logger.info(
                "KB remove: doc %s (name=%s, org=%s, proj=%s)",
                doc.id, doc.name, org_id, project_id,
            )

            # Remove DSL files (grammar, validation, examples, specs) by
            # looking up the language_id from chatbot_kblanguage via SQL.
            cr.execute(
                "SELECT id FROM chatbot_kblanguage WHERE name = %s",
                [doc.name],
            )
            row = cr.fetchone()
            lang_id = row[0] if row else None
            _logger.info("KB remove: language_id for '%s' → %s", doc.name, lang_id)
            if lang_id:
                cr.execute(
                    "DELETE FROM chatbot_kbfile WHERE language_id = %s",
                    [lang_id],
                )
                _logger.info("KB remove: deleted DSL files for language_id %s", lang_id)

            # Remove "other" files (main document file) by org + project + file_name
            doc_file_name = (doc.file_name or '').strip()
            if doc_file_name:
                conditions = ["file_type = 'other'", "file_name = %s"]
                params = [doc_file_name]
                if org_id:
                    conditions.append("organization_id = %s")
                    params.append(org_id)
                if project_id:
                    conditions.append("project_id = %s")
                    params.append(project_id)
                cr.execute(
                    "DELETE FROM chatbot_kbfile WHERE " + " AND ".join(conditions),
                    params,
                )
                _logger.info("KB remove: deleted other files matching %s", doc_file_name)


def _read_attachment_base64(env, res_model, res_id, field_name):
    """Read base64 attachment data for any model/record/field."""
    att = env['ir.attachment'].sudo().search([
        ('res_model', '=', res_model),
        ('res_id', '=', res_id),
        ('res_field', '=', field_name),
    ], limit=1)
    if att:
        return att.datas
    _logger.warning("No attachment found for %s/%s/%s", res_model, res_id, field_name)
    return None
