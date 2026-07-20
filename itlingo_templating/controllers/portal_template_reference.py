"""Public and maintainer-facing DSL Template Reference pages."""

import os
import re

from odoo import http
from odoo.http import content_disposition, request

from odoo.addons.itlingo_documents.constants import (
    SUPPORTED_TEMPLATE_ACCEPT,
    SUPPORTED_TEMPLATE_EXTENSIONS,
)
from odoo.addons.itlingo_website_portal.controllers.dsl import ITLingoDslPortal
from odoo.addons.itlingo_templating.services import template_linter
from odoo.addons.itlingo_templating.services.starter_template import (
    build_starter_template,
)


MAX_TEMPLATE_CHECK_BYTES = 5 * 1024 * 1024
SUPPORTED_TEMPLATE_FORMATS = {
    extension.lstrip(".") for extension in SUPPORTED_TEMPLATE_EXTENSIONS
}


def _snippet(type_name, alias=None):
    collection = alias or 'by_type["%s"]' % type_name
    return (
        "{% for item in " + collection + " %}\n"
        "{{ item.id }} — {{ item.title }}\n"
        "{% endfor %}"
    )


def prepare_reference_view(reference):
    """Split and annotate a raw reference payload for straightforward QWeb."""
    profile_aliases = [
        {
            **item,
            "collection": 'by_type["%s"]' % item["type_name"],
        }
        for item in reference.get("profile_aliases", [])
    ]
    alias_by_type = {
        item["type_name"]: item["alias"]
        for item in profile_aliases
    }
    types = []
    for item in reference.get("types", []):
        type_view = dict(item)
        type_view["anchor"] = "type-" + re.sub(
            r"[^a-zA-Z0-9_-]+", "-", item.get("name", "Element"),
        ).strip("-").lower()
        type_view["bucket_alias"] = alias_by_type.get(item.get("name"))
        type_view["filter_text"] = " ".join([
            item.get("name", ""),
            *(
                prop.get("name", "")
                for prop in item.get("properties", [])
            ),
        ]).lower()
        type_view["snippet"] = _snippet(
            item.get("name", "Element"), type_view["bucket_alias"],
        )
        types.append(type_view)
    return {
        "reference": {**reference, "profile_aliases": profile_aliases},
        "named_types": [item for item in types if item.get("indexed")],
        "embedded_types": [item for item in types if not item.get("indexed")],
    }


class ItlingoTemplateReferencePortal(http.Controller):

    @staticmethod
    def _render_detail(dsl, lint_result=None, check_error=None, pasted_template=""):
        portal = ITLingoDslPortal()
        reference = dsl._template_reference_context()
        values = portal._prepare_portal_layout_values()
        values.update({
            "page_name": "dsl_template_reference_detail",
            "dsl": dsl,
            "template_lint_result": lint_result,
            "template_check_error": check_error,
            "pasted_template": pasted_template,
            "template_file_accept": SUPPORTED_TEMPLATE_ACCEPT,
            "max_template_check_mb": MAX_TEMPLATE_CHECK_BYTES // (1024 * 1024),
            **prepare_reference_view(reference),
        })
        return request.render(
            "itlingo_templating.portal_template_reference_detail", values,
        )

    @http.route(
        "/dsl/template-reference",
        type="http", auth="public", website=True, methods=["GET"],
    )
    def portal_template_reference_list(self, **kw):
        portal = ITLingoDslPortal()
        dsls = request.env["itlingo.dsl"].sudo().search(
            portal._dsl_view_domain(), order="acronym, version desc",
        )
        values = portal._prepare_portal_layout_values()
        values.update({
            "page_name": "dsl_template_reference_list",
            "dsls": dsls,
        })
        return request.render(
            "itlingo_templating.portal_template_reference_list", values,
        )

    @http.route(
        "/dsl/<int:dsl_id>/template-reference",
        type="http", auth="public", website=True, methods=["GET"],
    )
    def portal_template_reference_detail(self, dsl_id, **kw):
        portal = ITLingoDslPortal()
        dsl = portal._dsl_or_404(dsl_id)
        portal._require_dsl_view(dsl)
        return self._render_detail(dsl)

    @http.route(
        "/dsl/<int:dsl_id>/template-reference/starter.md",
        type="http", auth="public", website=True, methods=["GET"],
    )
    def portal_template_reference_starter(self, dsl_id, **kw):
        portal = ITLingoDslPortal()
        dsl = portal._dsl_or_404(dsl_id)
        portal._require_dsl_view(dsl)
        starter = build_starter_template(
            dsl._template_reference_context(), dsl.acronym or "DSL",
        )
        filename = "%s-starter.md" % (dsl.acronym or "dsl").lower()
        return request.make_response(starter, headers=[
            ("Content-Type", "text/markdown; charset=utf-8"),
            ("Content-Disposition", content_disposition(filename)),
        ])

    @http.route(
        "/dsl/<int:dsl_id>/template-reference/check",
        type="http", auth="user", website=True, methods=["POST"],
    )
    def portal_template_reference_check(self, dsl_id, **post):
        portal = ITLingoDslPortal()
        dsl = portal._dsl_or_404(dsl_id)
        portal._require_dsl_view(dsl)
        pasted_template = (post.get("jinja_text") or "").strip()
        upload = request.httprequest.files.get("template_file")

        if pasted_template:
            template_bytes = pasted_template.encode("utf-8")
            template_format = "txt"
        elif upload and upload.filename:
            template_format = os.path.splitext(upload.filename)[1].lower().lstrip(".")
            if template_format not in SUPPORTED_TEMPLATE_FORMATS:
                return self._render_detail(
                    dsl,
                    check_error=(
                        "Unsupported template format. Upload DOCX, XLSX, or a supported text template."
                    ),
                )
            template_bytes = upload.read(MAX_TEMPLATE_CHECK_BYTES + 1)
        else:
            return self._render_detail(
                dsl,
                check_error="Upload a template file or paste Jinja to check.",
            )

        if len(template_bytes) > MAX_TEMPLATE_CHECK_BYTES:
            return self._render_detail(
                dsl,
                check_error="The template exceeds the %s MiB checking limit."
                % (MAX_TEMPLATE_CHECK_BYTES // (1024 * 1024)),
                pasted_template=pasted_template,
            )
        try:
            result = template_linter.lint_template(
                template_bytes,
                template_format,
                dsl._template_reference_context(),
            )
        except (ImportError, UnicodeDecodeError, ValueError) as err:
            return self._render_detail(
                dsl,
                check_error="Template checking failed: %s" % err,
                pasted_template=pasted_template,
            )
        except Exception as err:
            return self._render_detail(
                dsl,
                check_error="Template checking failed: %s" % err,
                pasted_template=pasted_template,
            )
        return self._render_detail(
            dsl, lint_result=result, pasted_template=pasted_template,
        )
