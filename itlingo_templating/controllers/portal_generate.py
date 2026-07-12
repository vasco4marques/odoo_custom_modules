import base64
import logging
import os

from odoo import _, http
from odoo.exceptions import AccessError, MissingError
from odoo.http import content_disposition, request
from odoo.addons.itlingo_website_portal.controllers.portal import ITLingoPortal

from odoo.addons.itlingo_templating.services import (
    canonical_model, docx_renderer, rendering, template_linter, text_renderer,
    xlsx_renderer,
)
from odoo.addons.itlingo_templating.services.dsl_parser import (
    DslParseError,
    default_dsl_extension,
    dsl_key_for_record,
    dsl_label,
    is_templatable_dsl,
    parse_dsl,
)

_logger = logging.getLogger(__name__)

# extension -> (renderer callable, MIME type)
_FORMATS = {
    "docx": (
        docx_renderer.render_docx,
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ),
    "xlsx": (
        xlsx_renderer.render_xlsx,
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ),
    "txt": (text_renderer.render_text, "text/plain; charset=utf-8"),
    "md": (text_renderer.render_text, "text/markdown; charset=utf-8"),
    "rst": (text_renderer.render_text, "text/x-rst; charset=utf-8"),
    "html": (text_renderer.render_text, "text/html; charset=utf-8"),
    "htm": (text_renderer.render_text, "text/html; charset=utf-8"),
    "json": (text_renderer.render_text, "application/json; charset=utf-8"),
    "xml": (text_renderer.render_text, "application/xml; charset=utf-8"),
    "yaml": (text_renderer.render_text, "application/yaml; charset=utf-8"),
    "yml": (text_renderer.render_text, "application/yaml; charset=utf-8"),
    "toml": (text_renderer.render_text, "application/toml; charset=utf-8"),
    "ini": (text_renderer.render_text, "text/plain; charset=utf-8"),
    "cfg": (text_renderer.render_text, "text/plain; charset=utf-8"),
    "properties": (text_renderer.render_text, "text/plain; charset=utf-8"),
    "sql": (text_renderer.render_text, "application/sql; charset=utf-8"),
    "csv": (text_renderer.render_text, "text/csv; charset=utf-8"),
    "tsv": (text_renderer.render_text, "text/tab-separated-values; charset=utf-8"),
    "css": (text_renderer.render_text, "text/css; charset=utf-8"),
    "js": (text_renderer.render_text, "text/javascript; charset=utf-8"),
    "ts": (text_renderer.render_text, "text/plain; charset=utf-8"),
    "sh": (text_renderer.render_text, "text/plain; charset=utf-8"),
}


def _split_extensions(value):
    extensions = []
    for raw in (value or "").split(","):
        ext = raw.strip().lower()
        if not ext:
            continue
        if not ext.startswith("."):
            ext = "." + ext
        extensions.append(ext)
    return extensions


class ItlingoTemplatingPortal(http.Controller):

    @staticmethod
    def _detail_url(base_url, document_id):
        return f"{base_url}/{document_id}"

    def _render_detail(self, document, base_url, project_id=None, org_id=None,
                       error=None, diagnostics=None, lint_result=None):
        """Render generation feedback in the normal scoped document page."""
        portal = ITLingoPortal()
        values = portal._prepare_portal_layout_values()
        if org_id is not None:
            organization, user_role, scoped_document = (
                portal._portal_org_document_or_404(org_id, document.id)
            )
            if not scoped_document:
                raise MissingError(_("Document not found."))
            values.update({
                "organization": organization,
                "user_role": user_role,
                "organization_hub": True,
                "org_hub_page": "documentation",
                "document_scope": "organization",
                "can_edit_document": (
                    user_role.role in portal._DOC_EDIT_ORG_ROLES
                ),
                "page_name": "organization_document_detail",
            })
        else:
            project, user_role, scoped_document = (
                portal._portal_ws_document_or_404(project_id, document.id)
            )
            if not scoped_document:
                raise MissingError(_("Document not found."))
            values.update({
                "project": project,
                "user_role": user_role,
                "document_scope": "workspace",
                "can_edit_document": (
                    user_role.role in portal._DOC_EDIT_WS_ROLES
                ),
                "page_name": "workspace_document_detail",
                **portal._portal_workspace_hub_common(
                    project, "documentation", public_hub=False,
                ),
            })
        values.update({
            "document": scoped_document,
            "doc_base_url": base_url,
            "doc_message": None,
            "doc_error": None,
            "generation_error": error,
            "generation_diagnostics": diagnostics or [],
            "template_lint_result": lint_result,
        })
        return request.render("itlingo_documents.portal_document_detail", values)

    def _get_template_document(self, document_id):
        """Return a readable template document or raise."""
        document = request.env["itlingo.document"].browse(document_id)
        if not document.exists():
            raise MissingError(_("Document not found."))
        try:
            document.check_access("read")
        except AccessError:
            raise AccessError(_("You do not have access to this document."))
        if not document.is_template:
            raise MissingError(_("This document is not a template."))
        return document

    @staticmethod
    def _template_format(document):
        """Return the supported format for a template file, else None."""
        ext = os.path.splitext(document.file_name or "")[1].lower().lstrip(".")
        return ext if ext in _FORMATS else None

    @staticmethod
    def _dsl_key(document):
        return dsl_key_for_record(request.env, document.dsl_id)

    @staticmethod
    def _source_extensions(document, dsl_key):
        return _split_extensions(document.dsl_id.file_extensions) or [
            default_dsl_extension(dsl_key),
        ]

    @staticmethod
    def _build_context(dsl, dsl_key, ast):
        return canonical_model.build_generic_model(
            ast, dsl._templating_profile(),
        ) | ({"dsl": "ASL"} if dsl_key == "ASL" else {})

    @http.route(
        "/my/workspaces/<int:project_id>/documents/<int:document_id>/generate",
        type="http", auth="user", website=True, methods=["GET", "POST"],
    )
    def portal_generate_workspace(self, project_id, document_id, **post):
        base_url = f"/my/workspaces/{project_id}/documents"
        return self._portal_generate(
            document_id, base_url, project_id=project_id, **post,
        )

    @http.route(
        "/my/organizations/<int:org_id>/documents/<int:document_id>/generate",
        type="http", auth="user", website=True, methods=["GET", "POST"],
    )
    def portal_generate_organization(self, org_id, document_id, **post):
        base_url = f"/my/organizations/{org_id}/documents"
        return self._portal_generate(
            document_id, base_url, org_id=org_id, **post,
        )

    @http.route(
        "/my/workspaces/<int:project_id>/documents/<int:document_id>/check",
        type="http", auth="user", website=True, methods=["POST"],
    )
    def portal_check_workspace(self, project_id, document_id, **post):
        return self._portal_check(
            document_id, f"/my/workspaces/{project_id}/documents",
            project_id=project_id,
        )

    @http.route(
        "/my/organizations/<int:org_id>/documents/<int:document_id>/check",
        type="http", auth="user", website=True, methods=["POST"],
    )
    def portal_check_organization(self, org_id, document_id, **post):
        return self._portal_check(
            document_id, f"/my/organizations/{org_id}/documents",
            org_id=org_id,
        )

    def _portal_check(self, document_id, base_url, project_id=None, org_id=None):
        document = self._get_template_document(document_id)
        if project_id is not None and document.project_id.id != project_id:
            raise MissingError(_("Document not found."))
        if org_id is not None and document.organization_id.id != org_id:
            raise MissingError(_("Document not found."))
        fmt = self._template_format(document)
        if not fmt or not document.document_file:
            return self._render_detail(
                document, base_url, project_id=project_id, org_id=org_id,
                error=_("Only supported template files with an attached file can be checked."),
            )
        if not document.dsl_id:
            return self._render_detail(
                document, base_url, project_id=project_id, org_id=org_id,
                error=_("This template is not associated with a DSL."),
            )
        try:
            result = template_linter.lint_template(
                base64.b64decode(document.document_file), fmt,
                document.dsl_id._template_reference_context(),
                self._dsl_key(document),
            )
        except (ImportError, UnicodeDecodeError) as err:
            result = {
                "skipped": True, "degraded": False, "findings": [],
                "message": str(err),
            }
        except Exception as err:
            _logger.exception("Template check failed for document %s", document.id)
            result = {
                "skipped": True, "degraded": False, "findings": [],
                "message": _("Template checking failed: %s") % err,
            }
        return self._render_detail(
            document, base_url, project_id=project_id, org_id=org_id,
            lint_result=result,
        )

    def _portal_generate(self, document_id, base_url, project_id=None,
                         org_id=None, **post):
        document = self._get_template_document(document_id)
        # The document must belong to the scope it is reached through.
        if project_id is not None and document.project_id.id != project_id:
            raise MissingError(_("Document not found."))
        if org_id is not None and document.organization_id.id != org_id:
            raise MissingError(_("Document not found."))
        fmt = self._template_format(document)
        if not fmt or not document.document_file:
            return self._render_detail(
                document, base_url, project_id=project_id, org_id=org_id,
                error=_(
                    "Only supported template files with an attached file can be generated."
                ),
            )

        dsl_key = self._dsl_key(document)
        if not document.dsl_id:
            return self._render_detail(
                document, base_url, project_id=project_id, org_id=org_id,
                error=_("This template is not associated with a DSL."),
            )
        if not is_templatable_dsl(request.env, document.dsl_id):
            return self._render_detail(
                document, base_url, project_id=project_id, org_id=org_id,
                error=_("This DSL does not have a current, valid published grammar."),
            )

        source_extensions = self._source_extensions(document, dsl_key)

        if request.httprequest.method != "POST":
            return request.redirect(self._detail_url(base_url, document.id) + "#generate")

        upload = request.httprequest.files.get("source_file")
        if not upload or not upload.filename:
            return self._render_detail(
                document, base_url, project_id=project_id, org_id=org_id,
                error=_("Please upload a %s file.") % dsl_label(document.dsl_id),
            )
        filename_lower = upload.filename.lower()
        if source_extensions and not any(
            filename_lower.endswith(ext) for ext in source_extensions
        ):
            return self._render_detail(
                document, base_url, project_id=project_id, org_id=org_id,
                error=_("Please upload a %s file (%s).") % (
                    dsl_label(document.dsl_id),
                    ", ".join(source_extensions),
                ),
            )

        source_bytes = upload.read()
        try:
            ast = parse_dsl(request.env, document.dsl_id, source_bytes)
        except DslParseError as err:
            return self._render_detail(
                document, base_url, project_id=project_id, org_id=org_id,
                error=str(err), diagnostics=err.diagnostics,
            )
        except RuntimeError as err:
            _logger.exception("%s parsing failed for document %s", dsl_key, document.id)
            return self._render_detail(
                document, base_url, project_id=project_id, org_id=org_id,
                error=str(err),
            )

        context = self._build_context(document.dsl_id, dsl_key, ast)

        renderer, mime = _FORMATS[fmt]
        try:
            template_bytes = base64.b64decode(document.document_file)
            output = renderer(template_bytes, context)
        except UnicodeDecodeError:
            return self._render_detail(
                document, base_url, project_id=project_id, org_id=org_id,
                error=_("Text template files must be encoded as UTF-8."),
            )
        except ImportError:
            return self._render_detail(
                document, base_url, project_id=project_id, org_id=org_id,
                error=_(
                    "The Python package required to render %s files is not "
                    "installed on the server." % fmt.upper()
                ),
            )
        except Exception as err:
            _logger.exception("%s rendering failed for document %s", fmt, document.id)
            return self._render_detail(
                document, base_url, project_id=project_id, org_id=org_id,
                error=_("Document generation failed: %s") % err,
            )

        # Extra variables available only to the output filename pattern.
        template_name = os.path.splitext(document.file_name or document.name or "template")[0]
        spec_name = os.path.splitext(upload.filename or "spec")[0]
        filename_context = dict(
            context, template_name=template_name, spec_name=spec_name,
        )
        fallback = document.name or "generated"
        filename = rendering.render_filename(
            document.output_filename_pattern, filename_context, fallback,
            extension="." + fmt,
        )
        return request.make_response(output, headers=[
            ("Content-Type", mime),
            ("Content-Disposition", content_disposition(filename)),
            ("Content-Length", str(len(output))),
        ])
