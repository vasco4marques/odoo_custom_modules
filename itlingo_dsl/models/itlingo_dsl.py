import base64
import hashlib
import json
import logging
import re

from odoo import api, fields, models, _
from odoo.exceptions import AccessError, UserError, ValidationError

from ..services import grammar_flattener, grammar_validator, services_compiler

_logger = logging.getLogger(__name__)

# Draft DSLs contribute their extension with this suffix (e.g. ".vsl" ->
# ".vsl-draft") so ITOI serves in-progress specifications with the draft
# grammar's language server instead of the published one.
DRAFT_EXTENSION_SUFFIX = "-draft"

# DSL lifecycle states whose files may be exchanged with ITOI. Deprecated DSLs
# are intentionally excluded.
IMPORTABLE_DSL_STATES = ("active", "draft")


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
        ],
        string="Status",
        required=True,
        default="draft",
    )

    file_extensions = fields.Char(
        string="File Extensions",
        help="Comma-separated list of supported file extensions, for example: .dsl,.dslx",
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
        help="Grammar (.langium), services (.ts), validation rules, examples "
             "and specifications that define this DSL.",
    )

    services_audit_ids = fields.One2many(
        "itlingo.dsl.services.audit",
        "dsl_id",
        string="Services Edit Audit",
        readonly=True,
        copy=False,
    )

    # ------------------------------------------------------------------
    # Author-supplied Langium services compilation audit
    # ------------------------------------------------------------------
    services_source_digest = fields.Char(
        string="Services Source Digest",
        readonly=True,
        copy=False,
        help="SHA-256 of the services TypeScript source set used for the last "
             "compilation attempt.",
    )

    services_compiled = fields.Text(
        string="Compiled Services",
        readonly=True,
        copy=False,
        help="Bundled ESM JavaScript produced from the DSL services sources.",
    )

    services_compiled_digest = fields.Char(
        string="Compiled Services Digest",
        readonly=True,
        copy=False,
        help="SHA-256 of the compiled services JavaScript artifact.",
    )

    services_compile_result = fields.Selection(
        selection=[("ok", "OK"), ("error", "Error")],
        string="Services Compile Result",
        readonly=True,
        copy=False,
    )

    services_compile_diagnostics = fields.Json(
        string="Services Compile Diagnostics",
        readonly=True,
        copy=False,
        help="Structured diagnostics from the last services compilation attempt.",
    )

    services_compile_time = fields.Datetime(
        string="Services Compiled On",
        readonly=True,
        copy=False,
    )

    # ------------------------------------------------------------------
    # Grammar validation and publication audit (Phase 5 lifecycle)
    # ------------------------------------------------------------------
    grammar_validation_result = fields.Selection(
        selection=[("valid", "Valid"), ("invalid", "Invalid")],
        string="Grammar Validation Result",
        readonly=True,
        copy=False,
        help="Result of the last server-side Langium validation of the "
             "flattened grammar workspace. Tied to an exact content digest: "
             "editing any reachable grammar file makes the result stale.",
    )

    grammar_validation_digest = fields.Char(
        string="Validated Content Digest",
        readonly=True,
        copy=False,
        help="SHA-256 of the flattened UTF-8 grammar text that was validated.",
    )

    grammar_validation_time = fields.Datetime(
        string="Validated On",
        readonly=True,
        copy=False,
    )

    grammar_validator_version = fields.Char(
        string="Validator Version",
        readonly=True,
        copy=False,
    )

    grammar_validation_diagnostics = fields.Text(
        string="Validation Diagnostics",
        readonly=True,
        copy=False,
        help="JSON list of {severity, message, line, column, code} from the "
             "last server-side validation.",
    )

    grammar_validation_is_current = fields.Boolean(
        string="Validation Is Current",
        compute="_compute_grammar_validation_is_current",
        help="True when the stored validation result matches the current "
             "grammar content digest.",
    )

    published_by_id = fields.Many2one(
        "res.users",
        string="Published By",
        readonly=True,
        copy=False,
    )

    published_at = fields.Datetime(
        string="Published On",
        readonly=True,
        copy=False,
    )

    published_digest = fields.Char(
        string="Published Content Digest",
        readonly=True,
        copy=False,
        help="SHA-256 of the flattened grammar text active at publication.",
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
    # File extensions
    # ------------------------------------------------------------------
    def _extensions(self):
        """Return this DSL's file extensions (lowercase, no dot)."""
        self.ensure_one()
        extensions = [
            ext.strip().lstrip(".").lower()
            for ext in (self.file_extensions or "").split(",")
            if ext.strip()
        ]
        if not extensions:
            # Sensible default so a DSL without configured extensions is
            # still usable: lowercased acronym (e.g. PSL -> .psl).
            acronym = (self.acronym or "").strip().lower()
            extensions = [acronym] if acronym else []
        return extensions

    @api.model
    def _all_extensions(self):
        """Return the importable extensions of every active or draft DSL.

        Published (``active``) DSLs contribute their extension verbatim.
        ``draft`` DSLs contribute a ``<ext>-draft`` variant so their
        in-progress grammar is served by a separate ITOI language server and
        never clashes with the published language. Deprecated DSLs contribute
        nothing.
        """
        extensions = set()
        for dsl in self.sudo().search([('status', 'in', IMPORTABLE_DSL_STATES)]):
            suffix = DRAFT_EXTENSION_SUFFIX if dsl.status == 'draft' else ''
            for ext in dsl._extensions():
                extensions.add(ext + suffix)
        return extensions

    @api.model
    def _resolve_importable_extension(self, ext):
        """Map the base extension of an exported file to its importable form.

        Given the extension of a file being exported (case-insensitive, with
        or without a leading dot or a trailing ``-draft`` suffix), return the
        extension it must carry to be importable — ``<ext>-draft`` when the
        matching DSL is a draft, the plain extension when it is active — or
        ``None`` when *ext* does not belong to any active or draft DSL.
        """
        raw = (ext or '').strip().lower().lstrip('.')
        if not raw:
            return None
        wants_draft = raw.endswith(DRAFT_EXTENSION_SUFFIX)
        base = raw[:-len(DRAFT_EXTENSION_SUFFIX)] if wants_draft else raw
        matches = [
            dsl for dsl in self.sudo().search(
                [('status', 'in', IMPORTABLE_DSL_STATES)])
            if base in dsl._extensions()
        ]
        if not matches:
            return None
        has_active = any(dsl.status == 'active' for dsl in matches)
        has_draft = any(dsl.status == 'draft' for dsl in matches)
        # An explicit "-draft" request wins when a draft exists; otherwise the
        # published language is preferred, falling back to draft.
        if (wants_draft and has_draft) or not has_active:
            return base + DRAFT_EXTENSION_SUFFIX
        return base

    @api.model
    def _refresh_document_formats(self):
        """Recompute stored formats after the registered extensions change."""
        Document = self.env.get("itlingo.document")
        if Document is None or "document_format" not in Document._fields:
            return
        documents = Document.sudo().search([("file_name", "!=", False)])
        if documents:
            documents._compute_document_format()
            documents.flush_recordset(["document_format"])

    # ------------------------------------------------------------------
    # Constraints
    # ------------------------------------------------------------------
    @api.constrains("file_ids")
    def _check_grammar_files(self):
        for dsl in self:
            for file_type, label in (("grammar", _("grammar")),
                                     ("services", _("services"))):
                workspace_files = dsl.file_ids.filtered(
                    lambda f, candidate=file_type: f.file_type == candidate
                )
                paths = {}
                for workspace_file in workspace_files:
                    path = workspace_file._normalize_grammar_path(
                        workspace_file.relative_path, file_type=file_type,
                    )
                    folded_path = path.casefold()
                    if folded_path in paths:
                        raise ValidationError(_(
                            "%(label)s paths must be unique within a DSL, "
                            "ignoring case ('%(first)s' and '%(second)s').",
                            label=label.capitalize(),
                            first=paths[folded_path], second=path,
                        ))
                    paths[folded_path] = path
                entries = workspace_files.filtered("is_entry")
                if workspace_files and len(entries) != 1:
                    raise ValidationError(_(
                        "A DSL with %(label)s files must have exactly one "
                        "entry %(label)s file (DSL: %(dsl)s).",
                        label=label, dsl=dsl.display_name,
                    ))

    # ------------------------------------------------------------------
    # Grammar/services validation and publication lifecycle
    # ------------------------------------------------------------------
    def _services_file(self):
        """Return this workspace's entry services file."""
        self.ensure_one()
        return self.file_ids.filtered(
            lambda f: f.file_type == "services" and f.is_entry
        )[:1]

    def _services_files(self):
        """Return all services files in deterministic path order."""
        self.ensure_one()
        return self.file_ids.filtered(
            lambda f: f.file_type == "services"
        ).sorted(key=lambda f: (f.relative_path, f.id))

    def _services_source_digest(self):
        """SHA-256 of the complete services workspace and its entry path."""
        self.ensure_one()
        services = self._services_files()
        entry = self._services_file()
        if not services or not entry:
            return False
        digest = hashlib.sha256()
        digest.update(b"entry\0")
        digest.update(entry.relative_path.encode("utf-8"))
        digest.update(b"\0")
        for services_file in services:
            digest.update(b"path\0")
            digest.update(services_file.relative_path.encode("utf-8"))
            digest.update(b"\0content\0")
            digest.update(services_file._read_text_utf8().encode("utf-8"))
            digest.update(b"\0")
        return digest.hexdigest()

    def _clear_services_compilation(self):
        """Clear compiled state when a DSL has no services workspace."""
        self.write({
            "services_source_digest": False,
            "services_compiled": False,
            "services_compiled_digest": False,
            "services_compile_result": False,
            "services_compile_diagnostics": False,
            "services_compile_time": False,
        })

    def _run_services_compilation(self):
        """Compile the current services workspace and store its audited result.

        Compilation errors, including unavailable infrastructure, are stored as
        diagnostics instead of rejecting a draft save. Publication separately
        enforces a successful, current artifact.
        """
        self.ensure_one()
        services = self._services_files()
        if not services:
            self._clear_services_compilation()
            return {
                "ok": True,
                "js": "",
                "diagnostics": [],
                "compiler_version": "none",
            }

        entry = self._services_file()
        source_digest = self._services_source_digest()
        files = {
            services_file.relative_path: services_file._read_text_utf8()
            for services_file in services
        }
        try:
            result = services_compiler.compile_services(
                self.env, files, entry.relative_path if entry else None,
            )
        except services_compiler.ServicesCompilationUnavailable as err:
            result = {
                "ok": False,
                "js": "",
                "diagnostics": [{
                    "severity": "error",
                    "message": str(err),
                    "path": entry.relative_path if entry else "",
                    "line": 1,
                    "column": 1,
                    "code": "services-compiler-unavailable",
                }],
                "compiler_version": "unavailable",
            }

        artifact = (result.get("js") or "") if result.get("ok") else ""
        artifact_digest = (
            hashlib.sha256(artifact.encode("utf-8")).hexdigest()
            if artifact else False
        )
        diagnostics = list(result.get("diagnostics") or [])
        self.write({
            "services_source_digest": source_digest,
            "services_compiled": artifact or False,
            "services_compiled_digest": artifact_digest,
            "services_compile_result": "ok" if result.get("ok") else "error",
            "services_compile_diagnostics": diagnostics,
            "services_compile_time": fields.Datetime.now(),
        })
        _logger.info(
            "Compiled services for DSL %s with %s: %s",
            self.display_name,
            result.get("compiler_version") or "unknown compiler",
            "ok" if result.get("ok") else "error",
        )
        return {
            **result,
            "js": artifact,
            "diagnostics": diagnostics,
        }

    def _services_compile_error_summary(self):
        self.ensure_one()
        diagnostics = self.services_compile_diagnostics or []
        errors = [d for d in diagnostics if d.get("severity") == "error"]
        lines = [
            _("%(path)s:%(line)s:%(column)s: %(message)s",
              path=d.get("path") or _("services"),
              line=d.get("line", "?"), column=d.get("column", "?"),
              message=d.get("message", ""))
            for d in errors[:5]
        ]
        if len(errors) > 5:
            lines.append(_("… and %s more errors.", len(errors) - 5))
        return "\n".join(lines)

    def _grammar_file(self):
        """Return this workspace's entry grammar file."""
        self.ensure_one()
        return self.file_ids.filtered(
            lambda f: f.file_type == "grammar" and f.is_entry
        )[:1]

    def _grammar_files(self):
        """Return all grammar files in deterministic path order."""
        self.ensure_one()
        return self.file_ids.filtered(
            lambda f: f.file_type == "grammar"
        ).sorted(key=lambda f: (f.relative_path, f.id))

    def _flatten_grammar_workspace(self):
        """Flatten every structural grammar file, including disabled files."""
        self.ensure_one()
        grammars = self._grammar_files()
        entry = self._grammar_file()
        files = {
            grammar.relative_path: grammar._read_text_utf8()
            for grammar in grammars
        }
        return grammar_flattener.flatten_grammar(
            files, entry.relative_path if entry else None,
        )

    def _flattened_grammar_text(self):
        """Return the import-free grammar artifact used at external boundaries.

        Grammar files are structural, so all files participate in import
        resolution regardless of ``is_enabled``.
        """
        self.ensure_one()
        text, _reached, _unreachable = self._flatten_grammar_workspace()
        return text

    def _grammar_digest(self):
        """SHA-256 of flattened UTF-8 text, or False when it cannot flatten."""
        self.ensure_one()
        if not self._grammar_files():
            return False
        try:
            text = self._flattened_grammar_text()
        except (grammar_flattener.GrammarFlattenError, ValidationError):
            return False
        return hashlib.sha256(text.encode("utf-8")).hexdigest()

    @api.depends(
        "file_ids.file", "file_ids.file_type", "file_ids.relative_path",
        "file_ids.is_entry",
        "grammar_validation_result", "grammar_validation_digest",
    )
    def _compute_grammar_validation_is_current(self):
        for dsl in self:
            digest = dsl._grammar_digest()
            dsl.grammar_validation_is_current = bool(
                digest
                and dsl.grammar_validation_result
                and dsl.grammar_validation_digest == digest
            )

    def _run_grammar_validation(self):
        """Validate the grammar server-side and store the audited result.

        Publication relies on this stored result plus the content digest; a
        browser-supplied validity flag is never consulted.
        """
        self.ensure_one()
        if not self._grammar_files():
            raise UserError(_("This DSL has no grammar file to validate."))
        try:
            text, _reached, unreachable = self._flatten_grammar_workspace()
        except grammar_flattener.GrammarFlattenError as err:
            raise UserError(_(
                "The grammar workspace cannot be flattened (%(code)s): %(error)s",
                code=err.code, error=str(err),
            )) from err
        try:
            result = grammar_validator.validate_grammar_text(self.env, text)
        except grammar_validator.GrammarValidationUnavailable as err:
            raise UserError(_(
                "Server-side grammar validation is unavailable: %s", err,
            )) from err
        result = dict(result)
        result["diagnostics"] = list(result.get("diagnostics") or [])
        for path in sorted(unreachable):
            result["diagnostics"].append({
                "severity": "warning",
                "message": _(
                    "Grammar file '%s' is unreachable from the entry grammar.", path,
                ),
                "line": 1,
                "column": 1,
                "code": "unreachable-grammar-file",
            })
        self.write({
            "grammar_validation_result": "valid" if result["valid"] else "invalid",
            "grammar_validation_digest": self._grammar_digest(),
            "grammar_validation_time": fields.Datetime.now(),
            "grammar_validator_version": result["validator_version"],
            "grammar_validation_diagnostics": json.dumps(result["diagnostics"]),
        })
        return result

    def _grammar_validation_error_summary(self):
        self.ensure_one()
        try:
            diagnostics = json.loads(self.grammar_validation_diagnostics or "[]")
        except json.JSONDecodeError:
            diagnostics = []
        errors = [d for d in diagnostics if d.get("severity") == "error"]
        lines = [
            _("line %(line)s: %(message)s",
              line=d.get("line", "?"), message=d.get("message", ""))
            for d in errors[:5]
        ]
        if len(errors) > 5:
            lines.append(_("… and %s more errors.", len(errors) - 5))
        return "\n".join(lines)

    def _ensure_grammar_publishable(self):
        """Block activation for invalid grammar or services compilation state.

        DSLs without a grammar file (metadata-only entries) may activate
        freely unless they carry a services workspace.
        """
        for dsl in self:
            if dsl._grammar_file():
                if not dsl.grammar_validation_result:
                    raise ValidationError(_(
                        "The grammar of %(dsl)s has not been validated. Publish "
                        "through the Publish action, which runs server-side "
                        "validation.", dsl=dsl.display_name,
                    ))
                if dsl.grammar_validation_digest != dsl._grammar_digest():
                    raise ValidationError(_(
                        "The grammar of %(dsl)s changed after its last "
                        "validation. Publish again to revalidate the current "
                        "content.", dsl=dsl.display_name,
                    ))
                if dsl.grammar_validation_result != "valid":
                    raise ValidationError(_(
                        "The grammar of %(dsl)s has validation errors and cannot "
                        "be published:\n%(errors)s",
                        dsl=dsl.display_name,
                        errors=dsl._grammar_validation_error_summary(),
                    ))

            if not dsl._services_files():
                continue
            if not dsl.services_compile_result:
                raise ValidationError(_(
                    "The services module of %(dsl)s has not been compiled. "
                    "Publish again to compile the current sources.",
                    dsl=dsl.display_name,
                ))
            if dsl.services_source_digest != dsl._services_source_digest():
                raise ValidationError(_(
                    "The services module of %(dsl)s changed after its last "
                    "compilation. Publish again to compile the current sources.",
                    dsl=dsl.display_name,
                ))
            if dsl.services_compile_result != "ok":
                raise ValidationError(_(
                    "The services module of %(dsl)s has compilation errors and "
                    "cannot be published:\n%(errors)s",
                    dsl=dsl.display_name,
                    errors=dsl._services_compile_error_summary(),
                ))
            artifact = dsl.services_compiled or ""
            artifact_digest = hashlib.sha256(
                artifact.encode("utf-8")
            ).hexdigest() if artifact else False
            if not artifact or artifact_digest != dsl.services_compiled_digest:
                raise ValidationError(_(
                    "The compiled services artifact of %(dsl)s is missing or "
                    "does not match its recorded digest. Publish again to "
                    "recompile it.", dsl=dsl.display_name,
                ))

    def _active_acronym_sibling(self):
        """The other DSL record that currently owns this acronym's KB entry."""
        self.ensure_one()
        acronym = (self.acronym or "").strip()
        if not acronym:
            return self.browse()
        return self.sudo().search([
            ("acronym", "=", acronym),
            ("status", "=", "active"),
            ("id", "!=", self.id),
        ], limit=1)

    def action_publish(self):
        """Validate server-side and promote this version to active.

        Publication is the only supported path to ``active`` for DSLs with a
        grammar. It deprecates any previously active version of the same
        acronym, records the audit trail, and is the single event that
        refreshes the chatbot knowledge base. It does not build or deploy
        templating or ITOI parsers; those consume the published record grammar.
        """
        if not self.env.user.has_group(
            "itlingo_organizations.group_itlingo_admin"
        ):
            raise AccessError(_(
                "Only platform administrators can publish or reactivate DSLs."
            ))
        for dsl in self:
            if dsl.status == "active":
                raise UserError(_(
                    "%(dsl)s is already the active version.",
                    dsl=dsl.display_name,
                ))
            grammar = dsl._grammar_file()
            if grammar:
                dsl._run_grammar_validation()
            if dsl._services_files():
                dsl._run_services_compilation()
            dsl._ensure_grammar_publishable()
            previous = dsl._active_acronym_sibling()
            previous.write({"status": "deprecated"})
            dsl.write({
                "status": "active",
                "published_by_id": self.env.uid,
                "published_at": fields.Datetime.now(),
                "published_digest": dsl.grammar_validation_digest
                if grammar else False,
            })
        return True

    def _suggest_next_version(self):
        """Next unused version string, bumping the trailing number."""
        self.ensure_one()
        match = re.match(r"^(.*?)(\d+)$", self.version or "")
        if match:
            prefix, number = match.group(1), int(match.group(2))
        else:
            prefix, number = f"{self.version or '1'}.", 0
        candidate = f"{prefix}{number + 1}"
        while self.sudo().search_count([
            ("acronym", "=", self.acronym), ("version", "=", candidate),
        ]):
            number += 1
            candidate = f"{prefix}{number + 1}"
        return candidate

    def action_create_draft_version(self, new_version=None):
        """Copy this DSL (metadata + definition files) into a new draft.

        The source version is not modified; published versions stay
        immutable and iteration happens on the new draft.
        """
        self.ensure_one()
        version = (new_version or self._suggest_next_version()).strip()
        if not version:
            raise ValidationError(_("A version is required for the new draft."))
        draft = self.copy({
            "version": version,
            "status": "draft",
        })
        # One2many fields are not copied by copy(); carry the definition
        # files (including the grammar) over to the new draft explicitly.
        copied_files = []
        for definition_file in self.file_ids:
            copied_files.append({
                "dsl_id": draft.id,
                "file_type": definition_file.file_type,
                "file_name": definition_file.file_name,
                "relative_path": definition_file.relative_path,
                "is_entry": definition_file.is_entry,
                "file": definition_file._attachment_base64(),
                "is_enabled": definition_file.is_enabled,
                "sequence": definition_file.sequence,
            })
        if copied_files:
            self.env["itlingo.dsl.file"].create(copied_files)
        return draft

    def action_create_draft_version_ui(self):
        """Backend button wrapper: create the draft and open its form."""
        self.ensure_one()
        draft = self.action_create_draft_version()
        return {
            "type": "ir.actions.act_window",
            "res_model": "itlingo.dsl",
            "res_id": draft.id,
            "view_mode": "form",
            "target": "current",
        }

    # ------------------------------------------------------------------
    # Chatbot KB sync
    # ------------------------------------------------------------------
    @api.model_create_multi
    def create(self, vals_list):
        records = super().create(vals_list)
        records._sync_kb_files()
        records._sync_maintainer_group()
        records._refresh_document_formats()
        return records

    def write(self, vals):
        if vals.get("status") == "active":
            self.filtered(
                lambda dsl: dsl.status != "active"
            )._ensure_grammar_publishable()
        result = super().write(vals)
        self._sync_kb_files()
        if {"status", "file_extensions", "acronym"} & set(vals):
            self._refresh_document_formats()
        if "maintainer_ids" in vals:
            self._sync_maintainer_group()
        return result

    def unlink(self):
        refresh_document_formats = bool(self)
        for dsl in self:
            # A draft or retired version must not clear the KB entry that the
            # acronym's active version still owns.
            if not dsl._active_acronym_sibling():
                dsl._remove_kb_files()
        result = super().unlink()
        if refresh_document_formats:
            self._refresh_document_formats()
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
        if dsl_file.file_type == "grammar":
            return dsl_file._read_text_utf8()
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

            # Only active DSLs are exposed to the chatbot. A non-active
            # version (e.g. a draft being edited) must never clear the KB
            # projection owned by the acronym's active version, so drafts
            # are invisible to the chatbot until publication.
            if dsl.status != "active":
                if not dsl._active_acronym_sibling():
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

            grammar_files = dsl._grammar_files()
            if not grammar_files:
                dsl._upsert_single_kb_file(
                    kb_file_model, lang, "grammar", None, None,
                )
            else:
                try:
                    grammar_text = dsl._flattened_grammar_text()
                except (
                    grammar_flattener.GrammarFlattenError, ValidationError,
                ) as err:
                    # Active grammars normally cannot reach this branch: the
                    # publication gate validates the same flattened artifact.
                    # If stored data is corrupted, keep the last known-good KB
                    # projection instead of replacing or deleting it.
                    _logger.error(
                        "Cannot flatten active DSL %s %s for chatbot KB sync; "
                        "leaving its grammar row untouched: %s",
                        dsl.acronym, dsl.version, err,
                    )
                else:
                    dsl._upsert_single_kb_file(
                        kb_file_model,
                        lang,
                        "grammar",
                        "%s.langium" % lang_name,
                        grammar_text,
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

    def _upsert_single_kb_file(
        self, kb_file_model, lang, file_type, file_name, text,
    ):
        """Upsert exactly one KB file for *file_type* (used for grammar)."""
        self.ensure_one()
        existing = kb_file_model.sudo().search([
            ("language_id", "=", lang.id), ("file_type", "=", file_type),
        ], order="id")
        if file_name is None:
            if existing:
                existing.sudo().unlink()
            return
        primary = existing[:1]
        duplicates = existing[1:]
        if duplicates:
            duplicates.sudo().unlink()
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
        if primary:
            primary.sudo().write(vals)
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
