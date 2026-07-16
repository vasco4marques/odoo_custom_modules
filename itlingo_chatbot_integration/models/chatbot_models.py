"""Odoo bindings for tables owned by the Django chatbot service.

Ownership contract: every table mapped here (``chatbot_*`` and
``session_settings``) is created and migrated exclusively by the Django
chatbot app (``chatbot_project/chatbot/migrations``). Odoo must NEVER issue
DDL against them, which is why every model below sets:

* ``_auto = False``  – Odoo skips all schema synchronisation (no table
  creation, no column adds/alters, no NOT NULL toggling, no indexes, no
  foreign keys) for the model. ORM reads and writes still work normally.
* ``_log_access = False`` – Odoo neither expects nor writes its
  ``create_uid``/``write_uid``/``create_date``/``write_date`` columns, which
  do not exist in the Django schema.

Because Odoo no longer relaxes the schema, records created from the Odoo
side must satisfy Django's NOT NULL columns. Django only enforces defaults
at the application level (its DB columns have no defaults), so every field
that is NOT NULL in the Django model carries an equivalent ``default=`` here.
Fields that are ``auto_now``/``auto_now_add`` in Django default to "now" on
create; ``updated_at`` is additionally stamped on every write (see
``ChatbotDjangoTableMixin``).

When the chatbot adds a column, mirror it here (with a default when NOT
NULL); never the other way around. On a fresh database, run the Django
migrations before using these models — Odoo will not create the tables.
"""

from odoo import fields, models


class ChatbotDjangoTableMixin(models.AbstractModel):
    _name = 'itlingo.chatbot.django.table.mixin'
    _description = 'Base for tables owned by the Django chatbot service'

    def write(self, vals):
        # Django's auto_now equivalent: keep updated_at fresh on Odoo-side writes.
        if 'updated_at' in self._fields and 'updated_at' not in vals:
            vals = dict(vals, updated_at=fields.Datetime.now())
        return super().write(vals)


class ItlingoChatWorkspace(models.Model):
    _name = 'itlingo.chat.workspace'
    _inherit = 'itlingo.chatbot.django.table.mixin'
    _description = 'Chat Workspace'
    _table = 'chatbot_chatworkspace'
    _auto = False
    _log_access = False

    odoo_project_id = fields.Integer(required=True, index=True)
    workspace_key = fields.Char(required=True, index=True)
    workspace_name = fields.Char(default='')
    current_thread_id = fields.Integer()
    created_at = fields.Datetime(readonly=True, default=fields.Datetime.now)
    updated_at = fields.Datetime(readonly=True, default=fields.Datetime.now)


class ItlingoChatFolder(models.Model):
    _name = 'itlingo.chat.folder'
    _inherit = 'itlingo.chatbot.django.table.mixin'
    _description = 'Chat Folder'
    _table = 'chatbot_chatfolder'
    _auto = False
    _log_access = False

    workspace_key = fields.Char(required=True, index=True)
    name = fields.Char(required=True)
    created_at = fields.Datetime(readonly=True, default=fields.Datetime.now)
    updated_at = fields.Datetime(readonly=True, default=fields.Datetime.now)
    thread_ids = fields.One2many('itlingo.chat.thread', 'folder_id', string='Threads')
    file_ids = fields.One2many('itlingo.thread.file', 'folder_id', string='Files')


class ItlingoChatThread(models.Model):
    _name = 'itlingo.chat.thread'
    _inherit = 'itlingo.chatbot.django.table.mixin'
    _description = 'Chat Thread'
    _table = 'chatbot_chatthread'
    _auto = False
    _log_access = False

    workspace_key = fields.Char(required=True, index=True)
    folder_id = fields.Many2one('itlingo.chat.folder', string='Folder', ondelete='cascade')
    title = fields.Char(default='New Chat')
    created_at = fields.Datetime(readonly=True, default=fields.Datetime.now)
    updated_at = fields.Datetime(readonly=True, default=fields.Datetime.now)
    message_ids = fields.One2many('itlingo.chat.message', 'thread_id', string='Messages')
    file_ids = fields.One2many('itlingo.thread.file', 'thread_id', string='Files')


class ItlingoChatMessage(models.Model):
    _name = 'itlingo.chat.message'
    _inherit = 'itlingo.chatbot.django.table.mixin'
    _description = 'Chat Message'
    _table = 'chatbot_chatmessage'
    _auto = False
    _log_access = False

    workspace_key = fields.Char(required=True, index=True)
    thread_id = fields.Many2one('itlingo.chat.thread', string='Thread', ondelete='cascade')
    role = fields.Char(required=True)
    content = fields.Text(default='')
    content_preview = fields.Char(compute='_compute_content_preview', store=False)
    timestamp = fields.Datetime(readonly=True, default=fields.Datetime.now)
    model = fields.Char()
    models_used = fields.Json(string='Models Used')
    tokens = fields.Json(string='Tokens')
    model_auto_switched = fields.Boolean(default=False)
    file_link_ids = fields.One2many('itlingo.message.file.link', 'message_id', string='File Links')

    def _compute_content_preview(self):
        max_len = 60
        for record in self:
            content = (record.content or '').strip().replace('\n', ' ')
            record.content_preview = content if len(content) <= max_len else content[: max_len - 1].rstrip() + '…'


class ItlingoModelUsage(models.Model):
    _name = 'itlingo.model.usage'
    _inherit = 'itlingo.chatbot.django.table.mixin'
    _description = 'Model Usage'
    _table = 'chatbot_modelusage'
    _auto = False
    _log_access = False

    timestamp = fields.Datetime(readonly=True, default=fields.Datetime.now)
    provider = fields.Char(index=True, default='')
    model = fields.Char(index=True, default='')
    input_tokens = fields.Integer(default=0)
    output_tokens = fields.Integer(default=0)
    total_tokens = fields.Integer(default=0)


class ItlingoThreadFile(models.Model):
    _name = 'itlingo.thread.file'
    _inherit = 'itlingo.chatbot.django.table.mixin'
    _description = 'Thread File'
    _table = 'chatbot_threadfile'
    _auto = False
    _log_access = False

    workspace_key = fields.Char(required=True, index=True)
    thread_id = fields.Many2one('itlingo.chat.thread', string='Thread', ondelete='cascade')
    folder_id = fields.Many2one('itlingo.chat.folder', string='Folder', ondelete='cascade')
    file_name = fields.Char(required=True)
    file_size_bytes = fields.Integer(default=0)
    extension = fields.Char(default='')
    mime_type = fields.Char(default='')
    extraction_method = fields.Char(default='')
    extracted_content = fields.Text(default='')
    preserve_full_context = fields.Boolean(default=False)
    created_at = fields.Datetime(readonly=True, default=fields.Datetime.now)
    updated_at = fields.Datetime(readonly=True, default=fields.Datetime.now)
    chunk_ids = fields.One2many('itlingo.thread.file.chunk', 'thread_file_id', string='Chunks')


class ItlingoThreadFileChunk(models.Model):
    _name = 'itlingo.thread.file.chunk'
    _inherit = 'itlingo.chatbot.django.table.mixin'
    _description = 'Thread File Chunk'
    _table = 'chatbot_threadfilechunk'
    _auto = False
    _log_access = False

    thread_file_id = fields.Many2one('itlingo.thread.file', string='Thread File', ondelete='cascade', required=True)
    chunk_index = fields.Integer(default=0)
    content = fields.Text(default='')
    created_at = fields.Datetime(readonly=True, default=fields.Datetime.now)


class ItlingoMessageFileLink(models.Model):
    _name = 'itlingo.message.file.link'
    _inherit = 'itlingo.chatbot.django.table.mixin'
    _description = 'Message File Link'
    _table = 'chatbot_messagefilelink'
    _auto = False
    _log_access = False

    message_id = fields.Many2one('itlingo.chat.message', string='Message', ondelete='cascade', required=True)
    thread_file_id = fields.Many2one('itlingo.thread.file', string='Thread File', ondelete='cascade', required=True)
    created_at = fields.Datetime(readonly=True, default=fields.Datetime.now)


class ItlingoOpsConfiguration(models.Model):
    _name = 'itlingo.ops.configuration'
    _inherit = 'itlingo.chatbot.django.table.mixin'
    _description = 'Ops Configuration'
    _table = 'chatbot_opsconfiguration'
    _auto = False
    _log_access = False

    key = fields.Char(required=True)
    model_groups = fields.Json(default=list)
    env_var_pairs = fields.Json(default=list)
    default_model = fields.Char(default='gemini-2.5-flash-lite')
    rag_llm_model = fields.Char(default='command-a-03-2025')
    diagram_auto_switch_model = fields.Char(default='gemini-2.5-flash')
    image_auto_switch_model = fields.Char(default='gemini-2.5-flash')
    agentic_generation_phase0_model = fields.Char(default='gemma-4-31b-it')
    agentic_generation_phase1_model = fields.Char(default='gemma-4-31b-it')
    agentic_generation_phase3_model = fields.Char(default='gemma-4-31b-it')
    agentic_generation_phase4_model = fields.Char(default='gemma-4-31b-it')
    agentic_generation_phase5_model = fields.Char(default='gemma-4-31b-it')
    attachment_retention_days = fields.Integer(default=7)
    last_attachment_cleanup_at = fields.Datetime()
    updated_at = fields.Datetime(readonly=True, default=fields.Datetime.now)


class ItlingoSysInstruction(models.Model):
    _name = 'itlingo.sys.instruction'
    _inherit = 'itlingo.chatbot.django.table.mixin'
    _description = 'System Instruction'
    _table = 'chatbot_sysinstruction'
    _auto = False
    _log_access = False

    key = fields.Char(required=True, default='default')
    platform_instruction = fields.Text(string='Platform System Instructions', default='', help='Global system instructions. These take priority over organization-level instructions.')
    organization_instruction = fields.Text(string='Organization System Instructions', default='', help='Organization-specific instructions. Must not contradict platform instructions.')
    organization_id = fields.Integer(string='Organization ID', index=True)
    updated_at = fields.Datetime(readonly=True, default=fields.Datetime.now)


class ItlingoKBLanguage(models.Model):
    _name = 'itlingo.kb.language'
    _inherit = 'itlingo.chatbot.django.table.mixin'
    _description = 'KB Language'
    _table = 'chatbot_kblanguage'
    _auto = False
    _log_access = False

    name = fields.Char(required=True)
    created_at = fields.Datetime(readonly=True, default=fields.Datetime.now)
    updated_at = fields.Datetime(readonly=True, default=fields.Datetime.now)


class ItlingoKBFile(models.Model):
    _name = 'itlingo.kb.file'
    _inherit = 'itlingo.chatbot.django.table.mixin'
    _description = 'KB File'
    _table = 'chatbot_kbfile'
    _auto = False
    _log_access = False

    file_name = fields.Char(required=True)
    extension = fields.Char(default='')
    mime_type = fields.Char(default='')
    file_type = fields.Char(default='other')
    language_id = fields.Many2one('itlingo.kb.language', string='Language', ondelete='set null')
    content = fields.Text(default='')
    source_url = fields.Char(default='')
    extraction_method = fields.Char(default='')
    is_enabled = fields.Boolean(default=True)
    organization_id = fields.Integer(string='Organization ID', index=True)
    project_id = fields.Integer(string='Project/Workspace ID', index=True)
    # ``raw_data`` holds raw bytes written by Django, while Odoo's Binary
    # semantics are base64 — never read or write this field from Odoo code.
    # The field must stay declared: removing it makes the ir.model.fields
    # cleanup DROP the column (even with _auto = False), destroying data.
    raw_data = fields.Binary(string='Raw File Data', attachment=False, readonly=True)
    created_at = fields.Datetime(readonly=True, default=fields.Datetime.now)
    updated_at = fields.Datetime(readonly=True, default=fields.Datetime.now)
    last_refreshed_at = fields.Datetime()


class ItlingoSessionSettings(models.Model):
    _name = 'itlingo.session.settings'
    _inherit = 'itlingo.chatbot.django.table.mixin'
    _description = 'Session Settings'
    _table = 'session_settings'
    _auto = False
    _log_access = False

    workspace_key = fields.Char(required=True, index=True)
    num_drafts = fields.Integer(default=1)
    max_rounds = fields.Integer(default=2)
    max_calls = fields.Integer(default=6)
    min_syntactic_score = fields.Float(default=4.0)
    min_completeness_score = fields.Float(default=4.0)
    created_at = fields.Datetime(readonly=True, default=fields.Datetime.now)
    updated_at = fields.Datetime(readonly=True, default=fields.Datetime.now)
