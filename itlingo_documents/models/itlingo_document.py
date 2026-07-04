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
    language = fields.Selection([
        ('en', 'English'),
        ('pt', 'Portuguese'),
        ('es', 'Spanish'),
        ('fr', 'French'),
        ('de', 'German'),
        ('other', 'Other'),
    ], string='Language', tracking=True,
        help='Language of the document content.')
    dsl_id = fields.Many2one(
        'itlingo.dsl', string='DSL', tracking=True,
        help='ITLingo DSL this document relates to (if any).',
    )
    document_format = fields.Selection([
        ('word', 'Word'),
        ('excel', 'Excel'),
        ('pdf', 'PDF'),
        ('text', 'Text'),
        ('other', 'Other'),
    ], string='Format', compute='_compute_document_format', store=True,
        help='Grouped format derived from the file extension.')
    dsl_knowledge = fields.Boolean(
        string='DSL Knowledge', tracking=True, default=False,
        help="When enabled on a published document, its content is added to "
             "the organization / workspace theory pool the chatbot uses as DSL "
             "knowledge. A document must be published before it can be marked.",
    )
    template_id = fields.Many2one(
        'itlingo.document.template', string='Template',
    )
    project_id = fields.Many2one(
        'itlingo.workspace', string='Workspace',
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

    _FORMAT_BY_EXTENSION = {
        'doc': 'word', 'docx': 'word', 'odt': 'word', 'rtf': 'word',
        'xls': 'excel', 'xlsx': 'excel', 'csv': 'excel', 'ods': 'excel',
        'pdf': 'pdf',
        'txt': 'text', 'md': 'text', 'rsl': 'text', 'asl': 'text',
        'psl': 'text', 'tsl': 'text', 'json': 'text', 'xml': 'text',
        'yaml': 'text', 'yml': 'text',
    }

    @api.depends('file_name')
    def _compute_document_format(self):
        for doc in self:
            fname = (doc.file_name or '').strip().lower()
            if not fname:
                doc.document_format = False
                continue
            ext = fname.rsplit('.', 1)[-1] if '.' in fname else ''
            doc.document_format = self._FORMAT_BY_EXTENSION.get(ext, 'other')

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

    # Fields whose change can affect the chatbot KB projection.
    _KB_SYNC_TRIGGER_FIELDS = (
        'document_file', 'file_name', 'name', 'status', 'dsl_knowledge',
        'organization_id', 'project_id',
    )

    @api.constrains('dsl_knowledge', 'status')
    def _check_dsl_knowledge_published(self):
        for doc in self:
            if doc.dsl_knowledge and doc.status != 'published':
                raise ValidationError(_(
                    'A document must be published before it can be marked as '
                    'DSL knowledge (document: %s).', doc.name,
                ))

    @api.model_create_multi
    def create(self, vals_list):
        records = super().create(vals_list)
        records._sync_kb_files()
        return records

    def write(self, vals):
        # A document can only be marked as DSL knowledge while published, so
        # leaving the published state automatically clears the mark (and pulls
        # the file from the theory pool).
        if (
            'status' in vals
            and vals.get('status') != 'published'
            and 'dsl_knowledge' not in vals
        ):
            vals = dict(vals, dsl_knowledge=False)
        result = super().write(vals)
        if any(f in vals for f in self._KB_SYNC_TRIGGER_FIELDS):
            self._sync_kb_files()
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
        """Project documents into the chatbot KB theory pool.

        A document is sent to the chatbot only when it is **published** AND
        flagged as **DSL knowledge**. It is then stored as an ``other``
        knowledge-base entry (the chatbot's language-agnostic "theory" pool),
        scoped to the document's organization / workspace. Documents that are
        not published, or not flagged, are removed from the pool. DSL definition
        files (grammar / validation / examples / specs) live on ``itlingo.dsl``.
        """
        import base64 as _b64
        kb_file_model = self.env.get('itlingo.kb.file')
        if kb_file_model is None:
            _logger.info("Chatbot KB model unavailable - skipping document KB sync")
            return

        for doc in self:
            doc_file_name = (doc.file_name or '').strip()
            doc_raw = doc._attachment_base64('document_file') if doc.document_file else None

            eligible = (
                doc.status == 'published'
                and doc.dsl_knowledge
                and doc_file_name
                and doc_raw
            )
            if not eligible:
                doc._remove_kb_files()
                continue

            org_id = doc.organization_id.id if doc.organization_id else None
            project_id = doc.project_id.id if doc.project_id else None

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
