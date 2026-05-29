from odoo import fields, models


class ItlingoChatWorkspace(models.Model):
    _name = 'itlingo.chat.workspace'
    _description = 'Chat Workspace'
    _table = 'chatbot_chatworkspace'

    odoo_project_id = fields.Integer(index=True)
    workspace_key = fields.Char(required=True, index=True)
    workspace_name = fields.Char()
    current_thread_id = fields.Integer()
    created_at = fields.Datetime(readonly=True)
    updated_at = fields.Datetime(readonly=True)


class ItlingoChatFolder(models.Model):
    _name = 'itlingo.chat.folder'
    _description = 'Chat Folder'
    _table = 'chatbot_chatfolder'

    workspace_key = fields.Char(required=True, index=True)
    name = fields.Char(required=True)
    created_at = fields.Datetime(readonly=True)
    updated_at = fields.Datetime(readonly=True)
    thread_ids = fields.One2many('itlingo.chat.thread', 'folder_id', string='Threads')
    file_ids = fields.One2many('itlingo.thread.file', 'folder_id', string='Files')


class ItlingoChatThread(models.Model):
    _name = 'itlingo.chat.thread'
    _description = 'Chat Thread'
    _table = 'chatbot_chatthread'

    workspace_key = fields.Char(required=True, index=True)
    folder_id = fields.Many2one('itlingo.chat.folder', string='Folder', ondelete='cascade')
    title = fields.Char(default='New Chat')
    created_at = fields.Datetime(readonly=True)
    updated_at = fields.Datetime(readonly=True)
    message_ids = fields.One2many('itlingo.chat.message', 'thread_id', string='Messages')
    file_ids = fields.One2many('itlingo.thread.file', 'thread_id', string='Files')


class ItlingoChatMessage(models.Model):
    _name = 'itlingo.chat.message'
    _description = 'Chat Message'
    _table = 'chatbot_chatmessage'

    workspace_key = fields.Char(required=True, index=True)
    thread_id = fields.Many2one('itlingo.chat.thread', string='Thread', ondelete='cascade')
    role = fields.Char(required=True)
    content = fields.Text()
    content_preview = fields.Char(compute='_compute_content_preview', store=False)
    timestamp = fields.Datetime(readonly=True)
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
    _description = 'Model Usage'
    _table = 'chatbot_modelusage'

    timestamp = fields.Datetime(readonly=True)
    provider = fields.Char(index=True)
    model = fields.Char(index=True)
    input_tokens = fields.Integer(default=0)
    output_tokens = fields.Integer(default=0)
    total_tokens = fields.Integer(default=0)


class ItlingoThreadFile(models.Model):
    _name = 'itlingo.thread.file'
    _description = 'Thread File'
    _table = 'chatbot_threadfile'

    workspace_key = fields.Char(required=True, index=True)
    thread_id = fields.Many2one('itlingo.chat.thread', string='Thread', ondelete='cascade')
    folder_id = fields.Many2one('itlingo.chat.folder', string='Folder', ondelete='cascade')
    file_name = fields.Char(required=True)
    file_size_bytes = fields.Integer()
    extension = fields.Char()
    mime_type = fields.Char()
    extraction_method = fields.Char()
    extracted_content = fields.Text()
    preserve_full_context = fields.Boolean(default=False)
    created_at = fields.Datetime(readonly=True)
    updated_at = fields.Datetime(readonly=True)
    chunk_ids = fields.One2many('itlingo.thread.file.chunk', 'thread_file_id', string='Chunks')


class ItlingoThreadFileChunk(models.Model):
    _name = 'itlingo.thread.file.chunk'
    _description = 'Thread File Chunk'
    _table = 'chatbot_threadfilechunk'

    thread_file_id = fields.Many2one('itlingo.thread.file', string='Thread File', ondelete='cascade')
    chunk_index = fields.Integer()
    content = fields.Text()
    created_at = fields.Datetime(readonly=True)


class ItlingoMessageFileLink(models.Model):
    _name = 'itlingo.message.file.link'
    _description = 'Message File Link'
    _table = 'chatbot_messagefilelink'

    message_id = fields.Many2one('itlingo.chat.message', string='Message', ondelete='cascade')
    thread_file_id = fields.Many2one('itlingo.thread.file', string='Thread File', ondelete='cascade')
    created_at = fields.Datetime(readonly=True)


class ItlingoOpsConfiguration(models.Model):
    _name = 'itlingo.ops.configuration'
    _description = 'Ops Configuration'
    _table = 'chatbot_opsconfiguration'

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
    updated_at = fields.Datetime(readonly=True)


class ItlingoKBLanguage(models.Model):
    _name = 'itlingo.kb.language'
    _description = 'KB Language'
    _table = 'chatbot_kblanguage'

    name = fields.Char(required=True)
    created_at = fields.Datetime(readonly=True)
    updated_at = fields.Datetime(readonly=True)


class ItlingoKBFile(models.Model):
    _name = 'itlingo.kb.file'
    _description = 'KB File'
    _table = 'chatbot_kbfile'

    file_name = fields.Char(required=True)
    extension = fields.Char()
    mime_type = fields.Char()
    file_type = fields.Char()
    language_id = fields.Many2one('itlingo.kb.language', string='Language', ondelete='set null')
    content = fields.Text()
    source_url = fields.Char()
    extraction_method = fields.Char()
    is_enabled = fields.Boolean(default=True)
    created_at = fields.Datetime(readonly=True)
    updated_at = fields.Datetime(readonly=True)
    last_refreshed_at = fields.Datetime()


class ItlingoSessionSettings(models.Model):
    _name = 'itlingo.session.settings'
    _description = 'Session Settings'
    _table = 'session_settings'

    session_id = fields.Char(required=True)
    num_drafts = fields.Integer(default=1)
    max_rounds = fields.Integer(default=2)
    max_calls = fields.Integer(default=6)
    min_syntactic_score = fields.Float(default=4.0)
    min_completeness_score = fields.Float(default=4.0)
    created_at = fields.Datetime(readonly=True)
    updated_at = fields.Datetime(readonly=True)
