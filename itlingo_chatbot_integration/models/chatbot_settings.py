import os
import re

from odoo import api, fields, models
from odoo.exceptions import UserError
import json


class ItlingoChatbotModelProvider(models.Model):
    _name = 'itlingo.chatbot.settings.provider'
    _description = 'ITLingo Chatbot Model Provider'
    _order = 'sequence, id'
    _rec_name = 'label'

    settings_id = fields.Many2one('itlingo.chatbot.settings', required=True, ondelete='cascade')
    organization_id = fields.Many2one(
        'itlingo.organization', string='Organization', ondelete='cascade', index=True,
        help='Organization that owns this provider. Empty means it is a platform-level provider.',
    )
    sequence = fields.Integer(default=10)
    provider = fields.Char(required=True)
    label = fields.Char(required=True)
    option_ids = fields.One2many('itlingo.chatbot.settings.option', 'provider_id', string='Models')

    def name_get(self):
        result = []
        for record in self:
            name = (record.label or record.provider or '').strip() or f'{self._name},{record.id}'
            result.append((record.id, name))
        return result

    def _resolve_scopes(self):
        """Return the distinct (settings_id, organization_id) scopes to resync."""
        scopes = set()
        for record in self:
            if record.settings_id:
                scopes.add((record.settings_id.id, record.organization_id.id or False))
        return scopes

    def _sync_parent(self):
        if self.env.context.get('skip_model_group_sync'):
            return
        for settings_id, organization_id in self._resolve_scopes():
            self.env['itlingo.chatbot.settings'].browse(settings_id)._sync_model_groups_to_ops_configuration(organization_id=organization_id)

    @api.model_create_multi
    def create(self, vals_list):
        normalized_vals_list = []
        for vals in vals_list:
            item = dict(vals)
            if not item.get('provider') and item.get('label'):
                item['provider'] = item['label']
            normalized_vals_list.append(item)

        records = super().create(normalized_vals_list)
        records._sync_parent()
        return records

    def write(self, vals):
        updated_vals = dict(vals)
        if 'label' in updated_vals and 'provider' not in updated_vals:
            updated_vals['provider'] = updated_vals.get('label')
        result = super().write(updated_vals)
        self._sync_parent()
        return result

    def unlink(self):
        scopes = self._resolve_scopes()
        result = super().unlink()
        if not self.env.context.get('skip_model_group_sync'):
            for settings_id, organization_id in scopes:
                self.env['itlingo.chatbot.settings'].browse(settings_id)._sync_model_groups_to_ops_configuration(organization_id=organization_id)
        return result


class ItlingoChatbotModelOption(models.Model):
    _name = 'itlingo.chatbot.settings.option'
    _description = 'ITLingo Chatbot Model Option'
    _order = 'sequence, id'
    _rec_name = 'label'

    settings_id = fields.Many2one('itlingo.chatbot.settings', required=True, ondelete='cascade')
    provider_id = fields.Many2one('itlingo.chatbot.settings.provider', required=True, ondelete='cascade')
    organization_id = fields.Many2one(
        'itlingo.organization', string='Organization', ondelete='cascade', index=True,
        help='Organization that owns this model. Empty means it is a platform-level model.',
    )
    provider_name = fields.Char(related='provider_id.label', string='Provider', readonly=True)
    sequence = fields.Integer(default=10)
    label = fields.Char(required=True)
    value = fields.Char(required=True)
    api_env_var = fields.Char(string='API Env Var')
    url_env_var = fields.Char(string='URL Env Var')
    env_var_value = fields.Char(string='Env Var Value', help='Value stored for the API Env Var or URL Env Var in the shared database.')
    api_key = fields.Char(string='API Key', help='Deprecated: kept for compatibility with older records.')
    base_url = fields.Char(string='Base URL', help='Deprecated: kept for compatibility with older records.')
    base_url_enabled = fields.Boolean(default=False)
    disabled = fields.Boolean(default=False)

    def name_get(self):
        result = []
        for record in self:
            name = (record.label or record.value or '').strip() or f'{self._name},{record.id}'
            result.append((record.id, name))
        return result

    @api.model
    def _build_env_var_name(self, organization_id, provider_label, model_label, suffix):
        """Generate a stable, unique env-var name for an org-scoped model option."""
        def slug(text):
            return re.sub(r'[^A-Z0-9]+', '_', (text or '').upper()).strip('_') or 'X'

        return f"ORG{organization_id or 0}_{slug(provider_label)}_{slug(model_label)}_{suffix}"

    def _record_scope(self, record):
        settings_record = record.settings_id or (record.provider_id.settings_id if record.provider_id else False)
        organization_id = (
            record.organization_id.id
            or (record.provider_id.organization_id.id if record.provider_id else False)
            or False
        )
        return (settings_record.id if settings_record else False), organization_id

    def _resolve_scopes(self):
        scopes = set()
        for record in self:
            settings_id, organization_id = self._record_scope(record)
            if settings_id:
                scopes.add((settings_id, organization_id))
        return scopes

    def _options_for_scope(self, organization_id):
        return self.filtered(lambda r: self._record_scope(r)[1] == organization_id)

    def _sync_parent(self):
        if self.env.context.get('skip_model_group_sync'):
            return
        for settings_id, organization_id in self._resolve_scopes():
            self.env['itlingo.chatbot.settings'].browse(settings_id)._sync_model_groups_to_ops_configuration(organization_id=organization_id)

    @api.model_create_multi
    def create(self, vals_list):
        normalized_vals_list = []
        for vals in vals_list:
            item = dict(vals)
            provider_id = item.get('provider_id')
            if provider_id:
                provider = self.env['itlingo.chatbot.settings.provider'].browse(provider_id)
                if provider.exists():
                    if not item.get('settings_id'):
                        item['settings_id'] = provider.settings_id.id
                    if not item.get('organization_id') and provider.organization_id:
                        item['organization_id'] = provider.organization_id.id
            normalized_vals_list.append(item)

        records = super().create(normalized_vals_list)
        if not self.env.context.get('skip_model_group_sync'):
            for settings_id, organization_id in records._resolve_scopes():
                settings_record = self.env['itlingo.chatbot.settings'].browse(settings_id)
                scope_options = records._options_for_scope(organization_id)
                settings_record._propagate_env_values_from_options(scope_options, organization_id=organization_id)
                settings_record._sync_model_groups_to_ops_configuration(organization_id=organization_id)
        return records

    def write(self, vals):
        result = super().write(vals)
        if self.env.context.get('skip_model_group_sync'):
            return result

        for settings_id, organization_id in self._resolve_scopes():
            settings_record = self.env['itlingo.chatbot.settings'].browse(settings_id)
            scope_options = self._options_for_scope(organization_id)
            settings_record._propagate_env_values_from_options(scope_options, organization_id=organization_id)
            settings_record._sync_model_groups_to_ops_configuration(organization_id=organization_id)
        return result

    def unlink(self):
        scopes = self._resolve_scopes()
        result = super().unlink()
        if not self.env.context.get('skip_model_group_sync'):
            for settings_id, organization_id in scopes:
                self.env['itlingo.chatbot.settings'].browse(settings_id)._sync_model_groups_to_ops_configuration(organization_id=organization_id)
        return result


class ItlingoChatbotSettings(models.Model):
    _name = 'itlingo.chatbot.settings'
    _description = 'ITLingo Chatbot Settings'
    _rec_name = 'name'

    name = fields.Char(default='Chatbot Settings', readonly=True)
    settings_section = fields.Selection(
        [
            ('running', 'Running Settings'),
            ('operational', 'Operational Settings'),
        ],
        string='Settings Section',
        default='running',
    )
    chatbot_url = fields.Char(
        string='Chatbot URL',
        compute='_compute_running_settings',
        inverse='_inverse_chatbot_url',
        help='Base URL where the chatbot application is running.',
    )
    langium_ai_service_url = fields.Char(
        string='Langium AI Service URL',
        compute='_compute_running_settings',
        inverse='_inverse_langium_ai_service_url',
        help='Base URL where the Langium AI service is running.',
    )
    chatbot_secret = fields.Char(
        string='Chatbot Secret Key',
        compute='_compute_running_settings',
        inverse='_inverse_chatbot_secret',
        help='Shared secret used to sign and verify workspace access tokens.',
    )
    provider_ids = fields.One2many('itlingo.chatbot.settings.provider', 'settings_id', string='Model Providers')
    option_ids = fields.One2many('itlingo.chatbot.settings.option', 'settings_id', string='Model Options')
    # Legacy JSON snapshot used by Django and for bootstrap compatibility.
    model_groups = fields.Text(string='Model Groups (JSON)', compute='_compute_model_groups', help='JSON array describing model groups and options.')
    default_model = fields.Char(
        string='Default Model',
        compute='_compute_running_settings',
        inverse='_inverse_default_model',
    )
    rag_llm_model = fields.Char(
        string='RAG LLM Model',
        compute='_compute_running_settings',
        inverse='_inverse_rag_llm_model',
    )
    diagram_auto_switch_model = fields.Char(
        string='Diagram Generation Auto-Switch model',
        compute='_compute_running_settings',
        inverse='_inverse_diagram_auto_switch_model',
    )
    image_auto_switch_model = fields.Char(
        string='Image Interpretation Auto-Switch Model',
        compute='_compute_running_settings',
        inverse='_inverse_image_auto_switch_model',
    )
    agentic_generation_phase0_model = fields.Char(string='Phase 0 - extract spec', compute='_compute_running_settings', inverse='_inverse_agentic_phase0')
    agentic_generation_phase1_model = fields.Char(string='Phase 1 - draft DSL', compute='_compute_running_settings', inverse='_inverse_agentic_phase1')
    agentic_generation_phase3_model = fields.Char(string='Phase 3 - check completeness', compute='_compute_running_settings', inverse='_inverse_agentic_phase3')
    agentic_generation_phase4_model = fields.Char(string='Phase 4 - repair DSL', compute='_compute_running_settings', inverse='_inverse_agentic_phase4')
    agentic_generation_phase5_model = fields.Char(string='Phase 5 - finalize answer', compute='_compute_running_settings', inverse='_inverse_agentic_phase5')
    attachment_retention_days = fields.Integer(compute='_compute_running_settings', inverse='_inverse_attachment_retention_days')
    last_attachment_cleanup_at = fields.Datetime(compute='_compute_running_settings', inverse='_inverse_last_attachment_cleanup_at')
    active = fields.Boolean(default=True)

    @api.model
    def _get_running_settings_values(self):
        ops_config = self._get_ops_configuration_record()
        return {
            'chatbot_url': self.env['ir.config_parameter'].sudo().get_param('itlingo_chatbot.chatbot_url', ''),
            'langium_ai_service_url': self.env['ir.config_parameter'].sudo().get_param('itlingo_chatbot.langium_ai_service_url', ''),
            'chatbot_secret': (os.getenv('ITLINGO_CHATBOT_SECRET') or self.env['ir.config_parameter'].sudo().get_param('itlingo_chatbot.secret', '') or ''),
            'model_groups': json.dumps(ops_config.model_groups or []),
            'default_model': ops_config.default_model or '',
            'rag_llm_model': ops_config.rag_llm_model or '',
            'diagram_auto_switch_model': ops_config.diagram_auto_switch_model or '',
            'image_auto_switch_model': ops_config.image_auto_switch_model or '',
            'agentic_generation_phase0_model': ops_config.agentic_generation_phase0_model or '',
            'agentic_generation_phase1_model': ops_config.agentic_generation_phase1_model or '',
            'agentic_generation_phase3_model': ops_config.agentic_generation_phase3_model or '',
            'agentic_generation_phase4_model': ops_config.agentic_generation_phase4_model or '',
            'agentic_generation_phase5_model': ops_config.agentic_generation_phase5_model or '',
            'attachment_retention_days': int(ops_config.attachment_retention_days or 7),
            'last_attachment_cleanup_at': ops_config.last_attachment_cleanup_at or '',
        }

    # Category assignment fields that must start blank on org-scoped ops
    # configuration records so resolution falls back to the platform value.
    _OPS_CATEGORY_FIELDS = (
        'default_model', 'rag_llm_model', 'diagram_auto_switch_model',
        'image_auto_switch_model', 'agentic_generation_phase0_model',
        'agentic_generation_phase1_model', 'agentic_generation_phase3_model',
        'agentic_generation_phase4_model', 'agentic_generation_phase5_model',
    )

    def _ops_configuration_key(self, organization_id=False):
        return f'org:{organization_id}' if organization_id else 'default'

    def _get_ops_configuration_record(self, organization_id=False):
        ops_config_model = self.env['itlingo.ops.configuration'].sudo()
        key = self._ops_configuration_key(organization_id)
        record = ops_config_model.search([('key', '=', key)], limit=1)
        if not record:
            vals = {'key': key}
            if organization_id:
                vals.update({field: '' for field in self._OPS_CATEGORY_FIELDS})
            record = ops_config_model.create(vals)
        return record

    def _scoped_providers(self, organization_id=False):
        organization_id = organization_id or False
        return self.provider_ids.filtered(
            lambda rec: (rec.organization_id.id or False) == organization_id
        )

    def _serialize_model_groups(self, organization_id=False):
        self.ensure_one()
        groups = []
        for provider in self._scoped_providers(organization_id).sorted(lambda rec: (rec.sequence, rec.id)):
            options = []
            for option in provider.option_ids.sorted(lambda rec: (rec.sequence, rec.id)):
                option_values = {
                    'label': option.label,
                    'value': option.value,
                    'base_url_enabled': bool(option.base_url_enabled),
                }
                if option.api_env_var:
                    option_values['API_env_var'] = option.api_env_var
                if option.url_env_var:
                    option_values['URL_env_var'] = option.url_env_var
                if option.disabled:
                    option_values['disabled'] = True
                options.append(option_values)
            groups.append({
                'label': provider.label,
                'provider': provider.provider,
                'options': options,
            })
        return groups

    def _serialize_env_var_pairs(self, organization_id=False):
        self.ensure_one()
        pairs_by_env_var = {}
        for provider in self._scoped_providers(organization_id).sorted(lambda rec: (rec.sequence, rec.id)):
            for option in provider.option_ids.sorted(lambda rec: (rec.sequence, rec.id)):
                env_value = (option.env_var_value or option.api_key or option.base_url or '').strip()
                if not env_value:
                    continue
                if option.api_env_var:
                    pairs_by_env_var[str(option.api_env_var).strip()] = env_value
                if option.url_env_var:
                    pairs_by_env_var[str(option.url_env_var).strip()] = env_value
        return [
            {'env_var': env_var, 'env_val': env_val}
            for env_var, env_val in pairs_by_env_var.items()
            if env_var
        ]

    def _propagate_env_value_to_matching_options(self, env_var, env_value, organization_id=False):
        self.ensure_one()
        key = str(env_var or '').strip()
        if not key:
            return

        for provider in self._scoped_providers(organization_id):
            for option in provider.option_ids:
                option_keys = {
                    str(option.api_env_var or '').strip(),
                    str(option.url_env_var or '').strip(),
                }
                if key in option_keys and option.env_var_value != env_value:
                    option.with_context(skip_model_group_sync=True).write({'env_var_value': env_value})

    def _propagate_env_values_from_options(self, option_records, organization_id=False):
        self.ensure_one()
        propagated_values = {}
        for option in option_records:
            env_value = (option.env_var_value or option.api_key or option.base_url or '').strip()
            for env_var in (option.api_env_var, option.url_env_var):
                key = str(env_var or '').strip()
                if key:
                    propagated_values[key] = env_value

        for env_var, env_value in propagated_values.items():
            self._propagate_env_value_to_matching_options(env_var, env_value, organization_id=organization_id)

    def _sync_env_var_values_from_ops_configuration(self):
        self.ensure_one()
        ops_config = self._get_ops_configuration_record()
        env_var_map = {}
        for pair in ops_config.env_var_pairs or []:
            env_var = str(pair.get('env_var') or pair.get('name') or '').strip()
            env_val = str(pair.get('env_val') or pair.get('value') or '').strip()
            if env_var and env_val:
                env_var_map[env_var] = env_val

        option_updates = []
        for provider in self._scoped_providers(False):
            for option in provider.option_ids:
                candidate_keys = [
                    str(option.api_env_var or '').strip(),
                    str(option.url_env_var or '').strip(),
                ]
                resolved_value = ''
                for key in candidate_keys:
                    if key and key in env_var_map:
                        resolved_value = env_var_map[key]
                        break
                if option.env_var_value != resolved_value:
                    option_updates.append((option, resolved_value))

        for option, resolved_value in option_updates:
            option.with_context(skip_model_group_sync=True).write({'env_var_value': resolved_value})

    def _seed_provider_records_if_needed(self):
        self.ensure_one()
        if self.provider_ids:
            return

        ops_config = self._get_ops_configuration_record()
        raw_model_groups = json.dumps(ops_config.model_groups or [])
        try:
            seed_groups = json.loads(raw_model_groups) if raw_model_groups else []
        except Exception:
            seed_groups = []

        provider_commands = []
        for index, group in enumerate(seed_groups):
            option_commands = []
            for option_index, option in enumerate(group.get('options') or []):
                env_var_pairs = ops_config.env_var_pairs or []
                api_env_var = option.get('API_env_var') or option.get('api_env') or ''
                url_env_var = option.get('URL_env_var') or option.get('base_url_env') or ''
                env_var_value = option.get('env_var_value') or option.get('api_key') or option.get('api_value') or option.get('base_url') or option.get('base_url_value') or ''
                if not env_var_value:
                    for pair in env_var_pairs:
                        if pair.get('env_var') == api_env_var or pair.get('env_var') == url_env_var:
                            env_var_value = pair.get('env_val') or pair.get('value') or ''
                            if env_var_value:
                                break
                option_commands.append((0, 0, {
                    'sequence': (option_index + 1) * 10,
                    'label': option.get('label') or option.get('value') or '',
                    'value': option.get('value') or '',
                    'api_env_var': api_env_var,
                    'url_env_var': url_env_var,
                    'env_var_value': env_var_value,
                    'base_url_enabled': bool(option.get('base_url_enabled', False)),
                    'disabled': bool(option.get('disabled', False)),
                }))

            provider_commands.append((0, 0, {
                'sequence': (index + 1) * 10,
                'provider': group.get('provider') or group.get('label') or '',
                'label': group.get('label') or group.get('provider') or '',
                'option_ids': option_commands,
            }))

        if provider_commands:
            self.with_context(skip_model_group_sync=True).write({'provider_ids': provider_commands})
            self._sync_model_groups_to_ops_configuration()

    def _sync_model_groups_to_ops_configuration(self, organization_id=False):
        self.ensure_one()
        ops_config = self._get_ops_configuration_record(organization_id=organization_id)
        ops_config.write({
            'model_groups': self._serialize_model_groups(organization_id=organization_id),
            'env_var_pairs': self._serialize_env_var_pairs(organization_id=organization_id),
        })

    def action_open_providers(self):
        self.ensure_one()
        self._seed_provider_records_if_needed()
        self._sync_env_var_values_from_ops_configuration()
        list_view = self.env.ref('itlingo_chatbot_integration.itlingo_chatbot_settings_provider_view_list')
        form_view = self.env.ref('itlingo_chatbot_integration.itlingo_chatbot_settings_provider_view_form')
        return {
            'type': 'ir.actions.act_window',
            'name': 'Model Providers',
            'res_model': 'itlingo.chatbot.settings.provider',
            'view_mode': 'list,form',
            'views': [(list_view.id, 'list'), (form_view.id, 'form')],
            'domain': [('settings_id', '=', self.id)],
            'context': {'default_settings_id': self.id},
            'target': 'current',
        }

    def action_open_model_options(self):
        self.ensure_one()
        self._seed_provider_records_if_needed()
        self._sync_env_var_values_from_ops_configuration()
        list_view = self.env.ref('itlingo_chatbot_integration.itlingo_chatbot_settings_option_view_list')
        form_view = self.env.ref('itlingo_chatbot_integration.itlingo_chatbot_settings_option_view_form')
        return {
            'type': 'ir.actions.act_window',
            'name': 'Model Options',
            'res_model': 'itlingo.chatbot.settings.option',
            'view_mode': 'list,form',
            'views': [(list_view.id, 'list'), (form_view.id, 'form')],
            'domain': [('settings_id', '=', self.id)],
            'context': {'default_settings_id': self.id},
            'target': 'current',
        }

    @api.depends_context('uid')
    def _compute_running_settings(self):
        values = self._get_running_settings_values()
        for record in self:
            record.chatbot_url = values['chatbot_url']
            record.langium_ai_service_url = values['langium_ai_service_url']
            record.chatbot_secret = values.get('chatbot_secret') or ''
            record.default_model = values.get('default_model') or ''
            record.rag_llm_model = values.get('rag_llm_model') or ''
            record.diagram_auto_switch_model = values.get('diagram_auto_switch_model') or ''
            record.image_auto_switch_model = values.get('image_auto_switch_model') or ''
            record.agentic_generation_phase0_model = values.get('agentic_generation_phase0_model') or ''
            record.agentic_generation_phase1_model = values.get('agentic_generation_phase1_model') or ''
            record.agentic_generation_phase3_model = values.get('agentic_generation_phase3_model') or ''
            record.agentic_generation_phase4_model = values.get('agentic_generation_phase4_model') or ''
            record.agentic_generation_phase5_model = values.get('agentic_generation_phase5_model') or ''
            try:
                record.attachment_retention_days = int(values.get('attachment_retention_days') or 7)
            except Exception:
                record.attachment_retention_days = 7
            record.last_attachment_cleanup_at = values.get('last_attachment_cleanup_at') or False

    @api.depends('provider_ids', 'provider_ids.option_ids', 'provider_ids.option_ids.sequence', 'provider_ids.sequence')
    def _compute_model_groups(self):
        for record in self:
            try:
                record.model_groups = json.dumps(record._serialize_model_groups())
            except Exception:
                record.model_groups = '[]'

    def _inverse_chatbot_url(self):
        self.ensure_one()
        self.env['ir.config_parameter'].sudo().set_param('itlingo_chatbot.chatbot_url', self.chatbot_url or '')
        self.env['ir.config_parameter'].sudo().set_param('itlingo_chatbot.url', self.chatbot_url or '')

    def _inverse_langium_ai_service_url(self):
        self.ensure_one()
        self.env['ir.config_parameter'].sudo().set_param(
            'itlingo_chatbot.langium_ai_service_url', self.langium_ai_service_url or ''
        )

    def _inverse_chatbot_secret(self):
        self.ensure_one()
        value = (self.chatbot_secret or '').strip()
        self.env['ir.config_parameter'].sudo().set_param('itlingo_chatbot.secret', value)

    def _inverse_default_model(self):
        self.ensure_one()
        self._get_ops_configuration_record().write({'default_model': self.default_model or ''})

    def _inverse_rag_llm_model(self):
        self.ensure_one()
        self._get_ops_configuration_record().write({'rag_llm_model': self.rag_llm_model or ''})

    def _inverse_diagram_auto_switch_model(self):
        self.ensure_one()
        self._get_ops_configuration_record().write({'diagram_auto_switch_model': self.diagram_auto_switch_model or ''})

    def _inverse_image_auto_switch_model(self):
        self.ensure_one()
        self._get_ops_configuration_record().write({'image_auto_switch_model': self.image_auto_switch_model or ''})

    def _inverse_agentic_phase0(self):
        self.ensure_one()
        self._get_ops_configuration_record().write({'agentic_generation_phase0_model': self.agentic_generation_phase0_model or ''})

    def _inverse_agentic_phase1(self):
        self.ensure_one()
        self._get_ops_configuration_record().write({'agentic_generation_phase1_model': self.agentic_generation_phase1_model or ''})

    def _inverse_agentic_phase3(self):
        self.ensure_one()
        self._get_ops_configuration_record().write({'agentic_generation_phase3_model': self.agentic_generation_phase3_model or ''})

    def _inverse_agentic_phase4(self):
        self.ensure_one()
        self._get_ops_configuration_record().write({'agentic_generation_phase4_model': self.agentic_generation_phase4_model or ''})

    def _inverse_agentic_phase5(self):
        self.ensure_one()
        self._get_ops_configuration_record().write({'agentic_generation_phase5_model': self.agentic_generation_phase5_model or ''})

    def _inverse_attachment_retention_days(self):
        self.ensure_one()
        try:
            val = int(self.attachment_retention_days or 7)
        except Exception:
            val = 7
        self._get_ops_configuration_record().write({'attachment_retention_days': val})

    def _inverse_last_attachment_cleanup_at(self):
        self.ensure_one()
        val = self.last_attachment_cleanup_at or ''
        if hasattr(val, 'isoformat'):
            val = val.isoformat()
        self._get_ops_configuration_record().write({'last_attachment_cleanup_at': val or False})

    @api.model_create_multi
    def create(self, vals_list):
        if self.sudo().search_count([]) >= 1:
            raise UserError(
                'Only one Chatbot Settings record is allowed. Please edit the existing one.'
            )
        return super().create(vals_list)

    def unlink(self):
        raise UserError('Chatbot Settings cannot be deleted.')

    @api.model
    def _get_settings(self):
        settings = self.sudo().search([], limit=1, order='id asc')
        if not settings:
            settings = self.sudo().create({})
        settings._seed_provider_records_if_needed()
        return settings

    @api.model
    def action_open_settings(self, section='running'):
        record = self._get_settings()
        target_section = 'operational' if section == 'operational' else 'running'
        if record.settings_section != target_section:
            record.write({'settings_section': target_section})
        return {
            'type': 'ir.actions.act_window',
            'res_model': self._name,
            'res_id': record.id,
            'view_mode': 'form',
            'target': 'current',
        }