import json
import logging

from odoo import api, fields, models, _
from odoo.exceptions import ValidationError

from odoo.addons.itlingo_dsl.services import grammar_describe
from odoo.addons.itlingo_templating.services import canonical_model
from odoo.addons.itlingo_templating.services import template_reference as reference_service
from odoo.addons.itlingo_templating.services.dsl_parser import dsl_key_for_record
from odoo.addons.itlingo_templating.services.dsl_parser import is_templatable_dsl

_logger = logging.getLogger(__name__)


class ItlingoDsl(models.Model):
    _inherit = "itlingo.dsl"

    templating_builtin_generation = fields.Boolean(
        string="Built-in Templating Generation",
        compute="_compute_templating_builtin_generation",
    )
    template_profile = fields.Text(
        string="Template Profile (JSON)",
        help="Optional declarative aliases for template authors. Supported "
             "keys include bucket_aliases, root_alias, root_path, root_fields "
             "and title_fields.",
    )
    templating_generation_available = fields.Boolean(
        string="Templating Generation Available",
        compute="_compute_templating_generation_available",
    )
    template_reference_json = fields.Text(
        string="Template Reference Inventory",
        readonly=True,
        copy=False,
        help="Cached grammar inventory used by the portal Template "
             "Reference page.",
    )
    template_reference_digest = fields.Char(
        string="Template Reference Digest",
        readonly=True,
        copy=False,
        help="Schema version and SHA-256 grammar digest represented by the cached inventory.",
    )

    @api.depends()
    def _compute_templating_builtin_generation(self):
        for dsl in self:
            dsl.templating_builtin_generation = bool(
                dsl_key_for_record(dsl.env, dsl)
            )

    @api.depends(
        "status", "grammar_validation_result", "grammar_validation_digest",
        "published_digest", "file_ids.file", "file_ids.file_type",
    )
    def _compute_templating_generation_available(self):
        for dsl in self:
            dsl.templating_generation_available = is_templatable_dsl(dsl.env, dsl)

    @api.constrains("template_profile")
    def _check_template_profile(self):
        for dsl in self:
            try:
                profile = json.loads(dsl.template_profile or "{}")
            except json.JSONDecodeError as err:
                raise ValidationError(_(
                    "Template Profile must be valid JSON: %s", err.msg,
                )) from err
            if not isinstance(profile, dict):
                raise ValidationError(_("Template Profile must be a JSON object."))
            for key in ("bucket_aliases", "title_fields", "root_fields"):
                if key in profile and not isinstance(profile[key], dict):
                    raise ValidationError(_(
                        "Template Profile key '%s' must be a JSON object.", key,
                    ))

    def _templating_profile(self):
        self.ensure_one()
        custom = json.loads(self.template_profile or "{}")
        return canonical_model.profile_for_dsl(
            dsl_key_for_record(self.env, self), custom,
        )

    def _templating_variable_groups(self):
        """Small, portal-safe discovery summary for template authors."""
        self.ensure_one()
        profile = self._templating_profile()
        aliases = sorted(set((profile.get("bucket_aliases") or {}).values()))
        root_alias = profile.get("root_alias")
        return {
            "core": ["root", "elements", "by_type", "by_id", "schema_version"],
            "aliases": ([root_alias] if root_alias else []) + aliases
                + ([profile["other_alias"]] if profile.get("other_alias") else []),
        }

    def _template_reference(self, refresh=False):
        """Return the raw grammar inventory, cached by grammar revision.

        Built-in RSL/ASL grammars use the module-level file cache because their
        committed grammar is independent from editable DSL record metadata.
        Custom DSLs persist the describer payload on the record so a portal
        request spawns Node at most once per grammar digest.
        """
        self.ensure_one()
        dsl_key = dsl_key_for_record(self.env, self)
        if dsl_key:
            return reference_service.builtin_reference(
                self.env, dsl_key, refresh=refresh,
            )

        technical_record = self.sudo()
        grammar = technical_record._grammar_file()
        grammar_digest = technical_record._grammar_digest()
        digest = "%s:%s" % (grammar_describe.SCHEMA_VERSION, grammar_digest)
        if not grammar or not grammar_digest:
            return {
                "success": False,
                "schema_version": grammar_describe.SCHEMA_VERSION,
                "message": _("This DSL has no grammar to describe."),
            }

        if (
            not refresh
            and technical_record.template_reference_digest == digest
            and technical_record.template_reference_json
        ):
            try:
                cached = json.loads(technical_record.template_reference_json)
            except (TypeError, json.JSONDecodeError):
                cached = None
            if isinstance(cached, dict) and "success" in cached:
                return cached

        inventory = grammar_describe.describe_grammar_text(
            self.env, grammar._read_text_utf8(),
        )
        technical_record.write({
            "template_reference_json": json.dumps(
                inventory, ensure_ascii=False, sort_keys=True,
            ),
            "template_reference_digest": digest,
        })
        return inventory

    def _template_reference_context(self, refresh=False):
        """Return portal-ready reference data and degrade on infrastructure errors."""
        self.ensure_one()
        try:
            inventory = self._template_reference(refresh=refresh)
        except grammar_describe.GrammarDescribeUnavailable as err:
            _logger.warning(
                "Template Reference inventory unavailable for DSL %s: %s",
                self.id, err,
            )
            inventory = {
                "success": False,
                "schema_version": grammar_describe.SCHEMA_VERSION,
                "unavailable": True,
                "message": _(
                    "The grammar inventory is temporarily unavailable. "
                    "The generic context and configured aliases remain valid."
                ),
            }
        return reference_service.merge_profile(
            inventory, self._templating_profile(),
        )
