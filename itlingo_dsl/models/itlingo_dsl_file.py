import base64
import binascii
import posixpath

from odoo import _, api, fields, models
from odoo.exceptions import ValidationError

DSL_FILE_TYPES = [
    ("grammar", "Grammar"),
    ("services", "Services"),
    ("validation", "Validation"),
    ("examples", "Examples"),
    ("specification", "Specification"),
]

GRAMMAR_MAX_BYTES = 1024 * 1024
GRAMMAR_PATH_MAX_LENGTH = 512
GRAMMAR_PATH_MAX_DEPTH = 32
STRUCTURAL_FILE_TYPES = ("grammar", "services")
STRUCTURAL_FILE_EXTENSIONS = {
    "grammar": ".langium",
    "services": ".ts",
}
STRUCTURAL_FILE_LABELS = {
    "grammar": "grammar",
    "services": "services",
}


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
        help="Grammar (.langium) and services (.ts) files define the language "
             "runtime. Validation, examples and specifications are optional "
             "supporting material.",
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
        string="Workspace Path",
        size=GRAMMAR_PATH_MAX_LENGTH,
        help="Normalized POSIX path inside a DSL grammar or services workspace.",
    )

    is_entry = fields.Boolean(
        string="Entry File",
        default=False,
        help="The entry file from which imports are resolved. Grammar and "
             "services workspaces each require exactly one entry file.",
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
    def _normalize_grammar_path(self, path, file_type="grammar"):
        """Validate a grammar/services workspace path without rewriting it.

        The historical method name is retained because grammar callers already
        use it. Services callers select the TypeScript contract with
        ``file_type='services'``.
        """
        if file_type not in STRUCTURAL_FILE_TYPES:
            raise ValidationError(_("Unsupported structural file type: %s", file_type))
        label = STRUCTURAL_FILE_LABELS[file_type]
        extension = STRUCTURAL_FILE_EXTENSIONS[file_type]
        path = (path or "").strip()
        if not path:
            raise ValidationError(_("A %s path is required.", label))
        if "\x00" in path:
            raise ValidationError(_("A %s path cannot contain NUL characters.", label))
        if "\\" in path:
            raise ValidationError(_("A %s path must use POSIX '/' separators.", label))
        if path.startswith("/"):
            raise ValidationError(_("A %s path must be relative.", label))
        segments = path.split("/")
        if any(segment in {"", ".", ".."} for segment in segments):
            raise ValidationError(_(
                "A %(label)s path cannot contain empty, '.' or '..' segments.",
                label=label,
            ))
        if not path.endswith(extension):
            raise ValidationError(_(
                "A %(label)s path must end in %(extension)s.",
                label=label, extension=extension,
            ))
        if len(path) > GRAMMAR_PATH_MAX_LENGTH:
            raise ValidationError(_(
                "A %(label)s path is too long. The maximum length is "
                "%(length)s characters.",
                label=label, length=GRAMMAR_PATH_MAX_LENGTH,
            ))
        if len(segments) > GRAMMAR_PATH_MAX_DEPTH:
            raise ValidationError(_(
                "A %(label)s path is too deep. The maximum depth is "
                "%(depth)s segments.",
                label=label, depth=GRAMMAR_PATH_MAX_DEPTH,
            ))
        return path

    @api.model
    def _validate_grammar_filename(self, file_name):
        """Backward-compatible alias for grammar path validation."""
        return self._normalize_grammar_path(file_name)

    @api.model
    def _validate_text_content(
        self, content, max_bytes=GRAMMAR_MAX_BYTES, file_type="grammar",
    ):
        """Return UTF-8 bytes for safe textual attachment content."""
        label = STRUCTURAL_FILE_LABELS.get(file_type, _("text"))
        if not isinstance(content, str):
            raise ValidationError(_("%s content must be text.", label.capitalize()))
        if "\x00" in content:
            raise ValidationError(_(
                "%s content cannot contain NUL characters.", label.capitalize(),
            ))
        try:
            raw = content.encode("utf-8")
        except UnicodeEncodeError as err:
            raise ValidationError(_(
                "%s content must be valid UTF-8 text.", label.capitalize(),
            )) from err
        if len(raw) > max_bytes:
            raise ValidationError(_(
                "%(label)s content is too large. The maximum size is %(size)s bytes.",
                label=label.capitalize(), size=max_bytes,
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
        label = STRUCTURAL_FILE_LABELS.get(self.file_type, _("text"))
        raw = self._read_binary_bytes()
        if len(raw) > max_bytes:
            raise ValidationError(_(
                "%(label)s content is too large. The maximum size is %(size)s bytes.",
                label=label.capitalize(), size=max_bytes,
            ))
        try:
            content = raw.decode("utf-8")
        except UnicodeDecodeError as err:
            raise ValidationError(_(
                "The stored %s file is not valid UTF-8 text.", label,
            )) from err
        if "\x00" in content:
            raise ValidationError(_(
                "%s content cannot contain NUL characters.", label.capitalize(),
            ))
        return content

    def _write_text_utf8(
        self, content, file_name=None, relative_path=None, is_entry=None,
    ):
        """Validate and store UTF-8 text in the current attachment record."""
        self.ensure_one()
        if self.file_type not in STRUCTURAL_FILE_TYPES:
            raise ValidationError(_(
                "Only grammar and services files can be edited as workspace text."
            ))
        target_path = self._normalize_grammar_path(
            relative_path or file_name or self.relative_path or self.file_name,
            file_type=self.file_type,
        )
        raw = self._validate_text_content(content, file_type=self.file_type)
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

    @api.model
    def _create_services_text(
        self, dsl, file_name, content, relative_path=None, is_entry=None,
    ):
        """Create a services workspace file from validated UTF-8 text."""
        dsl.ensure_one()
        target_path = self._normalize_grammar_path(
            relative_path or file_name, file_type="services",
        )
        raw = self._validate_text_content(content, file_type="services")
        vals = {
            "dsl_id": dsl.id,
            "file_type": "services",
            "relative_path": target_path,
            "file_name": posixpath.basename(target_path),
            "file": base64.b64encode(raw),
        }
        if is_entry is not None:
            vals["is_entry"] = is_entry
        return self.create(vals)

    # ------------------------------------------------------------------
    # Structural workspace invariants
    # ------------------------------------------------------------------

    def _check_grammar_draft_mutation(self):
        for record in self:
            if (
                record.file_type in STRUCTURAL_FILE_TYPES
                and record.dsl_id.status != "draft"
            ):
                raise ValidationError(_(
                    "Grammar and services files can only be changed while the "
                    "DSL is in draft status."
                ))

    @api.constrains(
        "dsl_id", "file_type", "file_name", "file", "relative_path", "is_entry",
    )
    def _check_grammar_file(self):
        for record in self.filtered(
            lambda item: item.file_type in STRUCTURAL_FILE_TYPES
        ):
            path = record._normalize_grammar_path(
                record.relative_path, file_type=record.file_type,
            )
            if record.file_name != posixpath.basename(path):
                raise ValidationError(_(
                    "A workspace filename must match the basename of its path."
                ))
            # Uploaded workspace files meet the same contract as editor saves.
            record._read_text_utf8()

    @api.model_create_multi
    def create(self, vals_list):
        vals_list = [dict(vals) for vals in vals_list]
        dsl_ids = {vals.get("dsl_id") for vals in vals_list if vals.get("dsl_id")}
        dsls = self.env["itlingo.dsl"].browse(dsl_ids)
        dsl_by_id = {dsl.id: dsl for dsl in dsls}
        dsl_has_file_type = {
            (dsl.id, file_type): bool(dsl.file_ids.filtered(
                lambda item, candidate=file_type: item.file_type == candidate
            ))
            for dsl in dsls for file_type in STRUCTURAL_FILE_TYPES
        }
        for vals in vals_list:
            file_type = vals.get("file_type", "specification")
            if file_type in STRUCTURAL_FILE_TYPES:
                dsl = dsl_by_id.get(vals.get("dsl_id"))
                if dsl and dsl.status != "draft":
                    raise ValidationError(_(
                        "Grammar and services files can only be created while "
                        "the DSL is in draft status."
                    ))
                path = self._normalize_grammar_path(
                    vals.get("relative_path") or vals.get("file_name"),
                    file_type=file_type,
                )
                vals["relative_path"] = path
                vals["file_name"] = posixpath.basename(path)
                if "is_entry" not in vals and dsl:
                    vals["is_entry"] = not dsl_has_file_type[(dsl.id, file_type)]
                if dsl:
                    dsl_has_file_type[(dsl.id, file_type)] = True
        records = super().create(vals_list)
        records.dsl_id._check_grammar_files()
        records.dsl_id._sync_kb_files()
        return records

    def write(self, vals):
        vals = dict(vals)
        structural_records = self.filtered(
            lambda item: item.file_type in STRUCTURAL_FILE_TYPES
        )
        if vals.get("file_type") in STRUCTURAL_FILE_TYPES:
            structural_records |= self
        if structural_records and set(vals) & {
            "dsl_id", "file_type", "file", "file_name", "relative_path",
            "is_entry", "is_enabled", "sequence",
        }:
            target_dsl = self.env["itlingo.dsl"].browse(vals.get("dsl_id")) \
                if vals.get("dsl_id") else False
            for record in structural_records:
                dsl = target_dsl or record.dsl_id
                if dsl.status != "draft":
                    raise ValidationError(_(
                        "Grammar and services files can only be changed while "
                        "the DSL is in draft status."
                    ))
        if structural_records and (
            "relative_path" in vals or "file_name" in vals
            or vals.get("file_type") in STRUCTURAL_FILE_TYPES
        ):
            if len(self) != 1:
                raise ValidationError(_(
                    "Workspace paths must be changed one file at a time."
                ))
            target_file_type = vals.get("file_type") or self.file_type
            path = self._normalize_grammar_path(
                vals.get("relative_path") or self.relative_path
                or vals.get("file_name") or self.file_name,
                file_type=target_file_type,
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
