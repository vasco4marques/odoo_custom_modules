import base64
import logging
import os

from odoo import _, http
from odoo.exceptions import AccessError, MissingError
from odoo.http import content_disposition, request

from odoo.addons.itlingo_templating.services import (
    canonical_model, docx_renderer, rendering, xlsx_renderer,
)
from odoo.addons.itlingo_templating.services.rsl_parser import RslParseError, parse_rsl

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
}


class ItlingoTemplatingPortal(http.Controller):

    def _get_template_document(self, document_id):
        """Return a readable template document or raise."""
        document = request.env["itlingo.document"].browse(document_id)
        if not document.exists():
            raise MissingError(_("Document not found."))
        try:
            document.check_access_rights("read")
            document.check_access_rule("read")
        except AccessError:
            raise AccessError(_("You do not have access to this document."))
        if not document.is_template:
            raise MissingError(_("This document is not a template."))
        return document

    @staticmethod
    def _template_format(document):
        """Return 'docx'/'xlsx' for a supported template file, else None."""
        ext = os.path.splitext(document.file_name or "")[1].lower().lstrip(".")
        return ext if ext in _FORMATS else None

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

    def _portal_generate(self, document_id, base_url, project_id=None,
                         org_id=None, **post):
        document = self._get_template_document(document_id)
        # The document must belong to the scope it is reached through.
        if project_id is not None and document.project_id.id != project_id:
            raise MissingError(_("Document not found."))
        if org_id is not None and document.organization_id.id != org_id:
            raise MissingError(_("Document not found."))
        values = {
            "document": document,
            "doc_base_url": base_url,
            "error": None,
            "diagnostics": None,
            "page_name": "document_generate",
        }

        fmt = self._template_format(document)
        if not fmt or not document.document_file:
            values["error"] = _(
                "Only DOCX/XLSX templates with an attached file can be generated."
            )
            return request.render("itlingo_templating.portal_generate_form", values)

        if request.httprequest.method != "POST":
            return request.render("itlingo_templating.portal_generate_form", values)

        upload = request.httprequest.files.get("rsl_file")
        if not upload or not upload.filename:
            values["error"] = _("Please upload an .rsl specification file.")
            return request.render("itlingo_templating.portal_generate_form", values)

        rsl_bytes = upload.read()
        try:
            ast = parse_rsl(request.env, rsl_bytes)
        except RslParseError as err:
            values["error"] = str(err)
            values["diagnostics"] = err.diagnostics
            return request.render("itlingo_templating.portal_generate_form", values)
        except RuntimeError as err:
            _logger.exception("RSL parsing failed for document %s", document.id)
            values["error"] = str(err)
            return request.render("itlingo_templating.portal_generate_form", values)

        context = canonical_model.build_canonical_model(ast)

        renderer, mime = _FORMATS[fmt]
        try:
            template_bytes = base64.b64decode(document.document_file)
            output = renderer(template_bytes, context)
        except ImportError:
            values["error"] = _(
                "The Python package required to render %s files is not "
                "installed on the server." % fmt.upper()
            )
            return request.render("itlingo_templating.portal_generate_form", values)
        except Exception as err:
            _logger.exception("%s rendering failed for document %s", fmt, document.id)
            values["error"] = _("Document generation failed: %s") % err
            return request.render("itlingo_templating.portal_generate_form", values)

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
