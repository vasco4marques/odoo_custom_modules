import base64
import binascii
import posixpath

from odoo import _, api, fields, models
from odoo.exceptions import ValidationError

DSL_FILE_TYPES = [
    ("grammar", "Grammar"),
    ("validation", "Validation"),
    ("examples", "Examples"),
    ("specification", "Specification"),
]

GRAMMAR_MAX_BYTES = 1024 * 1024
GRAMMAR_PATH_MAX_LENGTH = 512
GRAMMAR_PATH_MAX_DEPTH = 32


class ItlingoDslFile(models.Model):
    _name = "itlingo.dsl.file"
    _description = "ITLingo DSL Definition File"
    _order = "dsl_id, file_type, sequence, file_name"

    dsl_id = fields.Many2one(
        "itlingo.dsl",
        string="DSL",
        required=True,
        ondelete="cascade",
    )

    file_type = fields.Selection(
        selection=DSL_FILE_TYPES,
        string="File Type",
        required=True,
        default="specification",
        help="Maps directly to the chatbot knowledge-base file types. The "
             "grammar (.langium) defines the language; validation, examples "
             "and specifications are optional supporting material.",
    )

    file = fields.Binary(
        string="File",
        attachment=True,
        required=True,
    )

    file_name = fields.Char(
        string="Filename",
        required=True,
    )

    relative_path = fields.Char(
        string="Grammar Path",
        size=GRAMMAR_PATH_MAX_LENGTH,
        help="Normalized POSIX path inside the DSL grammar workspace. This "
             "field is meaningful only for grammar files.",
    )

    is_entry = fields.Boolean(
        string="Entry Grammar",
        default=False,
        help="The entry grammar from which imports are resolved. Exactly one "
             "grammar file must be the entry whenever a DSL has grammar files.",
    )

    is_enabled = fields.Boolean(
        string="Enabled",
        default=True,
        help="Disabled supporting files are not pushed to the chatbot "
             "knowledge base. Grammar files are structural and always "
             "participate in import resolution regardless of this flag.",
    )

    sequence = fields.Integer(
        string="Sequence",
        default=10,
        help="Order in which validation/examples files of the same type are "
             "concatenated into the knowledge base.",
    )

    # ------------------------------------------------------------------
    # Text attachment helpers
    # ------------------------------------------------------------------

    @api.model
    def _normalize_grammar_path(self, path):
        """Validate and return a grammar workspace path without rewriting it."""
        path = (path or "").strip()
        if not path:
            raise ValidationError(_("A grammar path is required."))
        if "\x00" in path:
            raise ValidationError(_("A grammar path cannot contain NUL characters."))
        if "\\" in path:
            raise ValidationError(_("A grammar path must use POSIX '/' separators."))
        if path.startswith("/"):
            raise ValidationError(_("A grammar path must be relative."))
        segments = path.split("/")
        if any(segment in {"", ".", ".."} for segment in segments):
            raise ValidationError(_(
                "A grammar path cannot contain empty, '.' or '..' segments."
            ))
        if not path.endswith(".langium"):
            raise ValidationError(_("A grammar path must end in .langium."))
        if len(path) > GRAMMAR_PATH_MAX_LENGTH:
            raise ValidationError(_(
                "A grammar path is too long. The maximum length is %(length)s characters.",
                length=GRAMMAR_PATH_MAX_LENGTH,
            ))
        if len(segments) > GRAMMAR_PATH_MAX_DEPTH:
            raise ValidationError(_(
                "A grammar path is too deep. The maximum depth is %(depth)s segments.",
                depth=GRAMMAR_PATH_MAX_DEPTH,
            ))
        return path

    @api.model
    def _validate_grammar_filename(self, file_name):
        """Backward-compatible alias for grammar path validation."""
        return self._normalize_grammar_path(file_name)

    @api.model
    def _validate_text_content(self, content, max_bytes=GRAMMAR_MAX_BYTES):
        """Return UTF-8 bytes for safe textual attachment content."""
        if not isinstance(content, str):
            raise ValidationError(_("Grammar content must be text."))
        if "\x00" in content:
            raise ValidationError(_("Grammar content cannot contain NUL characters."))
        try:
            raw = content.encode("utf-8")
        except UnicodeEncodeError as err:
            raise ValidationError(_("Grammar content must be valid UTF-8 text.")) from err
        if len(raw) > max_bytes:
            raise ValidationError(_(
                "Grammar content is too large. The maximum size is %(size)s bytes.",
                size=max_bytes,
            ))
        return raw

    def _attachment_base64(self):
        """Read the stored value of this attachment-backed binary field."""
        self.ensure_one()
        attachment = self.env["ir.attachment"].sudo().search([
            ("res_model", "=", self._name),
            ("res_id", "=", self.id),
            ("res_field", "=", "file"),
        ], limit=1)
        return attachment.datas if attachment else self.file

    def _read_binary_bytes(self):
        self.ensure_one()
        encoded = self._attachment_base64()
        if not encoded:
            return b""
        try:
            return base64.b64decode(encoded, validate=True)
        except (binascii.Error, ValueError, TypeError) as err:
            raise ValidationError(_("The stored file is not valid base64 data.")) from err

    def _read_text_utf8(self, max_bytes=GRAMMAR_MAX_BYTES):
        """Decode an attachment as strict UTF-8 text."""
        self.ensure_one()
        raw = self._read_binary_bytes()
        if len(raw) > max_bytes:
            raise ValidationError(_(
                "Grammar content is too large. The maximum size is %(size)s bytes.",
                size=max_bytes,
            ))
        try:
            content = raw.decode("utf-8")
        except UnicodeDecodeError as err:
            raise ValidationError(_("The stored grammar is not valid UTF-8 text.")) from err
        if "\x00" in content:
            raise ValidationError(_("Grammar content cannot contain NUL characters."))
        return content

    def _write_text_utf8(
        self, content, file_name=None, relative_path=None, is_entry=None,
    ):
        """Validate and store UTF-8 text in the current attachment record."""
        self.ensure_one()
        if self.file_type != "grammar":
            raise ValidationError(_("Only grammar files can be edited as grammar text."))
        target_path = self._normalize_grammar_path(
            relative_path or file_name or self.relative_path or self.file_name,
        )
        raw = self._validate_text_content(content)
        vals = {
            "file": base64.b64encode(raw),
            "relative_path": target_path,
            "file_name": posixpath.basename(target_path),
        }
        if is_entry is not None:
            vals["is_entry"] = is_entry
        self.write(vals)
        return self

    @api.model
    def _create_grammar_text(
        self, dsl, file_name, content, relative_path=None, is_entry=None,
    ):
        """Create a grammar workspace file from validated UTF-8 text."""
        dsl.ensure_one()
        target_path = self._normalize_grammar_path(relative_path or file_name)
        raw = self._validate_text_content(content)
        vals = {
            "dsl_id": dsl.id,
            "file_type": "grammar",
            "relative_path": target_path,
            "file_name": posixpath.basename(target_path),
            "file": base64.b64encode(raw),
        }
        if is_entry is not None:
            vals["is_entry"] = is_entry
        return self.create(vals)

    # ------------------------------------------------------------------
    # Grammar invariants
    # ------------------------------------------------------------------

    def _check_grammar_draft_mutation(self):
        for record in self:
            if record.file_type == "grammar" and record.dsl_id.status != "draft":
                raise ValidationError(_(
                    "Grammar files can only be changed while the DSL is in draft status."
                ))

    @api.constrains(
        "dsl_id", "file_type", "file_name", "file", "relative_path", "is_entry",
    )
    def _check_grammar_file(self):
        for record in self.filtered(lambda item: item.file_type == "grammar"):
            path = record._normalize_grammar_path(record.relative_path)
            if record.file_name != posixpath.basename(path):
                raise ValidationError(_(
                    "A grammar filename must match the basename of its grammar path."
                ))
            # Uploaded grammar files must meet the same text contract as editor saves.
            record._read_text_utf8()

    @api.model_create_multi
    def create(self, vals_list):
        vals_list = [dict(vals) for vals in vals_list]
        dsl_ids = {vals.get("dsl_id") for vals in vals_list if vals.get("dsl_id")}
        dsls = self.env["itlingo.dsl"].browse(dsl_ids)
        dsl_by_id = {dsl.id: dsl for dsl in dsls}
        dsl_has_grammar = {
            dsl.id: bool(dsl.file_ids.filtered(lambda item: item.file_type == "grammar"))
            for dsl in dsls
        }
        for vals in vals_list:
            if vals.get("file_type", "specification") == "grammar":
                dsl = dsl_by_id.get(vals.get("dsl_id"))
                if dsl and dsl.status != "draft":
                    raise ValidationError(_(
                        "Grammar files can only be created while the DSL is in draft status."
                    ))
                path = self._normalize_grammar_path(
                    vals.get("relative_path") or vals.get("file_name"),
                )
                vals["relative_path"] = path
                vals["file_name"] = posixpath.basename(path)
                if "is_entry" not in vals and dsl:
                    vals["is_entry"] = not dsl_has_grammar[dsl.id]
                if dsl:
                    dsl_has_grammar[dsl.id] = True
        records = super().create(vals_list)
        records.dsl_id._check_grammar_files()
        records.dsl_id._sync_kb_files()
        return records

    def write(self, vals):
        vals = dict(vals)
        grammar_records = self.filtered(lambda item: item.file_type == "grammar")
        if vals.get("file_type") == "grammar":
            grammar_records |= self
        if grammar_records and set(vals) & {
            "dsl_id", "file_type", "file", "file_name", "relative_path",
            "is_entry", "is_enabled", "sequence",
        }:
            target_dsl = self.env["itlingo.dsl"].browse(vals.get("dsl_id")) \
                if vals.get("dsl_id") else False
            for record in grammar_records:
                dsl = target_dsl or record.dsl_id
                if dsl.status != "draft":
                    raise ValidationError(_(
                        "Grammar files can only be changed while the DSL is in draft status."
                    ))
        if grammar_records and (
            "relative_path" in vals or "file_name" in vals
            or vals.get("file_type") == "grammar"
        ):
            if len(self) != 1:
                raise ValidationError(_(
                    "Grammar paths must be changed one file at a time."
                ))
            path = self._normalize_grammar_path(
                vals.get("relative_path") or self.relative_path
                or vals.get("file_name") or self.file_name,
            )
            vals["relative_path"] = path
            vals["file_name"] = posixpath.basename(path)
        dsls = self.dsl_id
        result = super().write(vals)
        affected_dsls = dsls | self.dsl_id
        affected_dsls._check_grammar_files()
        affected_dsls._sync_kb_files()
        return result

    def unlink(self):
        self._check_grammar_draft_mutation()
        dsls = self.dsl_id
        result = super().unlink()
        dsls._check_grammar_files()
        dsls._sync_kb_files()
        return result
