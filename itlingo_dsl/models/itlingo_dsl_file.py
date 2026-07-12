import base64
import binascii

from odoo import _, api, fields, models
from odoo.exceptions import ValidationError

DSL_FILE_TYPES = [
    ("grammar", "Grammar"),
    ("validation", "Validation"),
    ("examples", "Examples"),
    ("specification", "Specification"),
]

GRAMMAR_MAX_BYTES = 1024 * 1024


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

    is_enabled = fields.Boolean(
        string="Enabled",
        default=True,
        help="Disabled files are not pushed to the chatbot knowledge base.",
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
    def _validate_grammar_filename(self, file_name):
        """Validate the single-file grammar path used by the editor."""
        file_name = (file_name or "").strip()
        if not file_name:
            raise ValidationError(_("A grammar filename is required."))
        if (
            file_name in {".", ".."}
            or "/" in file_name
            or "\\" in file_name
            or "\x00" in file_name
        ):
            raise ValidationError(_(
                "The grammar filename must be a plain filename without path segments."
            ))
        if not file_name.endswith(".langium"):
            raise ValidationError(_("The grammar filename must end in .langium."))
        return file_name

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

    def _write_text_utf8(self, content, file_name=None):
        """Validate and store UTF-8 text in the current attachment record."""
        self.ensure_one()
        if self.file_type != "grammar":
            raise ValidationError(_("Only grammar files can be edited as grammar text."))
        target_name = self._validate_grammar_filename(file_name or self.file_name)
        raw = self._validate_text_content(content)
        self.write({
            "file": base64.b64encode(raw),
            "file_name": target_name,
        })
        return self

    @api.model
    def _create_grammar_text(self, dsl, file_name, content):
        """Create the DSL's single grammar file from validated text."""
        dsl.ensure_one()
        target_name = self._validate_grammar_filename(file_name)
        raw = self._validate_text_content(content)
        return self.create({
            "dsl_id": dsl.id,
            "file_type": "grammar",
            "file_name": target_name,
            "file": base64.b64encode(raw),
        })

    # ------------------------------------------------------------------
    # Grammar invariants
    # ------------------------------------------------------------------

    def _check_grammar_draft_mutation(self):
        for record in self:
            if record.file_type == "grammar" and record.dsl_id.status != "draft":
                raise ValidationError(_(
                    "Grammar files can only be changed while the DSL is in draft status."
                ))

    @api.constrains("dsl_id", "file_type", "file_name", "file")
    def _check_grammar_file(self):
        for record in self.filtered(lambda item: item.file_type == "grammar"):
            record._validate_grammar_filename(record.file_name)
            # Uploaded grammar files must meet the same text contract as editor saves.
            record._read_text_utf8()

    @api.model_create_multi
    def create(self, vals_list):
        dsl_ids = {vals.get("dsl_id") for vals in vals_list if vals.get("dsl_id")}
        dsls = self.env["itlingo.dsl"].browse(dsl_ids)
        dsl_by_id = {dsl.id: dsl for dsl in dsls}
        for vals in vals_list:
            if vals.get("file_type", "specification") == "grammar":
                dsl = dsl_by_id.get(vals.get("dsl_id"))
                if dsl and dsl.status != "draft":
                    raise ValidationError(_(
                        "Grammar files can only be created while the DSL is in draft status."
                    ))
        records = super().create(vals_list)
        records.dsl_id._sync_kb_files()
        return records

    def write(self, vals):
        grammar_records = self.filtered(lambda item: item.file_type == "grammar")
        if vals.get("file_type") == "grammar":
            grammar_records |= self
        if grammar_records and set(vals) & {
            "dsl_id", "file_type", "file", "file_name", "is_enabled", "sequence",
        }:
            target_dsl = self.env["itlingo.dsl"].browse(vals.get("dsl_id")) \
                if vals.get("dsl_id") else False
            for record in grammar_records:
                dsl = target_dsl or record.dsl_id
                if dsl.status != "draft":
                    raise ValidationError(_(
                        "Grammar files can only be changed while the DSL is in draft status."
                    ))
        dsls = self.dsl_id
        result = super().write(vals)
        (dsls | self.dsl_id)._sync_kb_files()
        return result

    def unlink(self):
        self._check_grammar_draft_mutation()
        dsls = self.dsl_id
        result = super().unlink()
        dsls._sync_kb_files()
        return result
