import base64
import logging

from odoo import api, fields, models, _
from odoo.exceptions import ValidationError

_logger = logging.getLogger(__name__)


def _read_attachment_base64(env, res_model, res_id, field_name):
    """Read base64 attachment data for an ``attachment=True`` binary field."""
    att = env['ir.attachment'].sudo().search([
        ('res_model', '=', res_model),
        ('res_id', '=', res_id),
        ('res_field', '=', field_name),
    ], limit=1)
    if att:
        return att.datas
    return None


class ItlingoDsl(models.Model):
    _name = "itlingo.dsl"
    _description = "ITLingo Domain-Specific Language"
    _order = "acronym asc, version desc"

    name = fields.Char(
        string="Name",
        required=True,
    )

    acronym = fields.Char(
        string="Acronym",
        required=True,
    )

    version = fields.Char(
        string="Version",
        required=True,
        default="1.0",
    )

    description = fields.Html(
        string="Description",
        sanitize=True,
    )

    status = fields.Selection(
        selection=[
            ("draft", "Draft"),
            ("active", "Active"),
            ("deprecated", "Deprecated"),
            ("archived", "Archived"),
        ],
        string="Status",
        required=True,
        default="draft",
    )

    file_extensions = fields.Char(
        string="File Extensions",
        help="Comma-separated list of supported file extensions, for example: .rsl,.asl",
    )

    grammar_reference = fields.Char(
        string="Grammar Reference",
        help="URL or reference to the grammar definition of this DSL.",
    )

    parser_validator_reference = fields.Char(
        string="Parser or Validator Reference",
        help="URL or reference to an external parser or validator service.",
    )

    documentation_url = fields.Char(
        string="Documentation URL",
    )

    notes = fields.Text(
        string="Internal Notes",
    )

    maintainer_ids = fields.Many2many(
        "res.users",
        string="Maintainers",
        help="Users responsible for this DSL's metadata and documentation. "
             "Maintainership does not by itself grant write access.",
    )

    active = fields.Boolean(
        string="Active",
        default=True,
    )

    file_ids = fields.One2many(
        "itlingo.dsl.file",
        "dsl_id",
        string="Definition Files",
        help="Grammar (.langium), validation rules, examples and "
             "specifications that define this DSL and are pushed to the "
             "chatbot knowledge base.",
    )

    _unique_acronym_version = models.Constraint(
        "unique(acronym, version)",
        "A DSL with this acronym and version already exists.",
    )

    # ------------------------------------------------------------------
    # Maintainership helpers
    # ------------------------------------------------------------------
    @api.model
    def _dsls_maintained_by(self, user):
        """DSLs the given user maintains.

        Maintainers are the users allowed to manage a DSL (metadata and
        definition files) through the portal.
        """
        if not user:
            return self.browse()
        return self.sudo().search(
            [("maintainer_ids", "in", user.ids)], order="acronym",
        )

    def _is_maintained_by(self, user):
        self.ensure_one()
        return bool(user) and user in self.maintainer_ids

    # ------------------------------------------------------------------
    # Constraints
    # ------------------------------------------------------------------
    @api.constrains("file_ids")
    def _check_single_grammar(self):
        for dsl in self:
            grammars = dsl.file_ids.filtered(
                lambda f: f.file_type == "grammar"
            )
            if len(grammars) > 1:
                raise ValidationError(_(
                    "A DSL can have at most one grammar file (DSL: %s).",
                    dsl.display_name,
                ))
            for grammar in grammars:
                if grammar.file_name and not grammar.file_name.endswith(".langium"):
                    raise ValidationError(_(
                        "The grammar file must have a .langium extension "
                        "(file: %s).",
                        grammar.file_name,
                    ))

    # ------------------------------------------------------------------
    # Chatbot KB sync
    # ------------------------------------------------------------------
    @api.model_create_multi
    def create(self, vals_list):
        records = super().create(vals_list)
        records._sync_kb_files()
        records._sync_maintainer_group()
        return records

    def write(self, vals):
        result = super().write(vals)
        self._sync_kb_files()
        if "maintainer_ids" in vals:
            self._sync_maintainer_group()
        return result

    def unlink(self):
        self._remove_kb_files()
        result = super().unlink()
        self._sync_maintainer_group()
        return result

    @api.model
    def _sync_maintainer_group(self):
        """Mirror the union of all DSL maintainers into the maintainer group.

        The group is only used to surface DSL-management navigation for
        maintainers; per-DSL edit rights remain enforced in the controller.
        """
        group = self.env.ref(
            "itlingo_dsl.group_itlingo_dsl_maintainer", raise_if_not_found=False,
        )
        if not group:
            return
        maintainers = self.sudo().search([]).mapped("maintainer_ids")
        group.sudo().write({"user_ids": [(6, 0, maintainers.ids)]})

    def _dsl_file_text(self, dsl_file):
        """Decode the textual content of a DSL definition file."""
        raw_b64 = _read_attachment_base64(
            self.env, "itlingo.dsl.file", dsl_file.id, "file",
        )
        if not raw_b64:
            return ""
        raw_bytes = base64.b64decode(raw_b64)
        try:
            text = raw_bytes.decode("utf-8")
        except UnicodeDecodeError:
            text = raw_bytes.decode("latin-1")
        return text.replace("\x00", "")

    def _sync_kb_files(self):
        """Project each DSL's definition files into the chatbot KB.

        The KB is the shared chatbot database (``chatbot_kblanguage`` /
        ``chatbot_kbfile``). Every DSL maps to one KB language keyed by its
        acronym, and its files are written at platform scope
        (``organization_id`` / ``project_id`` left empty).
        """
        kb_file_model = self.env.get("itlingo.kb.file")
        kb_lang_model = self.env.get("itlingo.kb.language")
        if kb_file_model is None or kb_lang_model is None:
            _logger.info("Chatbot KB models unavailable - skipping DSL KB sync")
            return

        for dsl in self:
            lang_name = (dsl.acronym or "").strip()
            if not lang_name:
                continue

            # Only active DSLs are exposed to the chatbot.
            if dsl.status != "active":
                dsl._remove_kb_files()
                continue

            lang = kb_lang_model.sudo().search(
                [("name", "=", lang_name)], limit=1,
            )
            if not lang:
                lang = kb_lang_model.sudo().create({"name": lang_name})

            enabled = dsl.file_ids.filtered(
                lambda f: f.is_enabled and f.file_name
            )

            grammar_files = enabled.filtered(lambda f: f.file_type == "grammar")
            dsl._upsert_single_kb_file(
                kb_file_model, lang, "grammar", grammar_files[:1],
            )

            validation_files = enabled.filtered(
                lambda f: f.file_type == "validation"
            ).sorted(key=lambda f: (f.sequence, f.id))
            dsl._upsert_concatenated_kb_file(
                kb_file_model, lang, "validation", validation_files,
            )

            examples_files = enabled.filtered(
                lambda f: f.file_type == "examples"
            ).sorted(key=lambda f: (f.sequence, f.id))
            dsl._upsert_concatenated_kb_file(
                kb_file_model, lang, "examples", examples_files,
            )

            spec_files = enabled.filtered(
                lambda f: f.file_type == "specification"
            )
            dsl._sync_spec_kb_files(kb_file_model, lang, spec_files)

    def _upsert_single_kb_file(self, kb_file_model, lang, file_type, dsl_files):
        """Upsert exactly one KB file for *file_type* (used for grammar)."""
        self.ensure_one()
        existing = kb_file_model.sudo().search([
            ("language_id", "=", lang.id), ("file_type", "=", file_type),
        ], limit=1)
        if not dsl_files:
            if existing:
                existing.sudo().unlink()
            return
        dsl_file = dsl_files[0]
        text = self._dsl_file_text(dsl_file)
        file_name = dsl_file.file_name or ""
        ext = file_name.rsplit(".", 1)[-1].lower() if "." in file_name else ""
        vals = {
            "file_name": file_name,
            "extension": ext,
            "mime_type": "application/octet-stream",
            "file_type": file_type,
            "language_id": lang.id,
            "content": text,
            "extraction_method": "odoo_direct",
            "is_enabled": True,
            "organization_id": False,
            "project_id": False,
        }
        if existing:
            existing.sudo().write(vals)
        else:
            kb_file_model.sudo().create(vals)

    def _upsert_concatenated_kb_file(self, kb_file_model, lang, file_type, dsl_files):
        """Concatenate all files of *file_type* into a single KB row.

        Used for validation and examples, which the chatbot collapses into a
        single per-language string.
        """
        self.ensure_one()
        existing = kb_file_model.sudo().search([
            ("language_id", "=", lang.id), ("file_type", "=", file_type),
        ], limit=1)
        parts = []
        for dsl_file in dsl_files:
            text = self._dsl_file_text(dsl_file)
            if not text:
                continue
            parts.append("# === %s ===\n\n%s" % (dsl_file.file_name or "", text))
        content = "\n\n".join(parts)
        if not content:
            if existing:
                existing.sudo().unlink()
            return
        file_name = "%s_%s.txt" % (lang.name, file_type)
        vals = {
            "file_name": file_name,
            "extension": "txt",
            "mime_type": "text/plain",
            "file_type": file_type,
            "language_id": lang.id,
            "content": content,
            "extraction_method": "odoo_direct",
            "is_enabled": True,
            "organization_id": False,
            "project_id": False,
        }
        if existing:
            existing.sudo().write(vals)
        else:
            kb_file_model.sudo().create(vals)

    def _sync_spec_kb_files(self, kb_file_model, lang, dsl_files):
        """Sync specification files as one KB row per file."""
        self.ensure_one()
        current_names = set()
        for dsl_file in dsl_files:
            file_name = dsl_file.file_name or ""
            if not file_name:
                continue
            current_names.add(file_name)
            text = self._dsl_file_text(dsl_file)
            ext = file_name.rsplit(".", 1)[-1].lower() if "." in file_name else ""
            existing = kb_file_model.sudo().search([
                ("language_id", "=", lang.id),
                ("file_type", "=", "specification"),
                ("file_name", "=", file_name),
            ], limit=1)
            vals = {
                "file_name": file_name,
                "extension": ext,
                "mime_type": "application/octet-stream",
                "file_type": "specification",
                "language_id": lang.id,
                "content": text,
                "extraction_method": "odoo_direct",
                "is_enabled": True,
                "organization_id": False,
                "project_id": False,
            }
            if existing:
                existing.sudo().write(vals)
            else:
                kb_file_model.sudo().create(vals)

        orphans = kb_file_model.sudo().search([
            ("language_id", "=", lang.id),
            ("file_type", "=", "specification"),
            ("file_name", "not in", list(current_names)),
        ])
        if orphans:
            orphans.sudo().unlink()

    def _remove_kb_files(self):
        """Delete all KB files for this DSL's language (keeps the language)."""
        kb_file_model = self.env.get("itlingo.kb.file")
        kb_lang_model = self.env.get("itlingo.kb.language")
        if kb_file_model is None or kb_lang_model is None:
            return
        for dsl in self:
            lang_name = (dsl.acronym or "").strip()
            if not lang_name:
                continue
            lang = kb_lang_model.sudo().search(
                [("name", "=", lang_name)], limit=1,
            )
            if not lang:
                continue
            files = kb_file_model.sudo().search([("language_id", "=", lang.id)])
            if files:
                files.sudo().unlink()
