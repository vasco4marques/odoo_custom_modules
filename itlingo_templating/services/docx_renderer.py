"""Render a DOCX template against the canonical model using docxtpl (Jinja2).

Rendering is lenient: missing fields resolve to blank instead of failing, so
partial specifications still produce a document.
"""

import io
import re


def _lenient_env():
    import jinja2
    # ChainableUndefined keeps *missing* keys blank; finalize keeps present-but
    # -None values (e.g. an unset version/vendor) blank instead of printing "None".
    return jinja2.Environment(
        undefined=jinja2.ChainableUndefined,
        finalize=lambda v: "" if v is None else v,
    )


def render_docx(template_bytes, context):
    """Render the DOCX *template_bytes* with *context*; return DOCX bytes."""
    from docxtpl import DocxTemplate

    tpl = DocxTemplate(io.BytesIO(template_bytes))
    tpl.render(context, jinja_env=_lenient_env())
    out = io.BytesIO()
    tpl.save(out)
    return out.getvalue()


def render_filename(pattern, context, fallback):
    """Render an output filename from a Jinja2 *pattern*; fall back if empty/invalid."""
    name = ""
    if pattern:
        try:
            name = _lenient_env().from_string(pattern).render(context).strip()
        except Exception:
            name = ""
    name = name or fallback
    if not name.lower().endswith(".docx"):
        name = "%s.docx" % name
    # Strip path separators / unsafe characters from the final filename.
    return re.sub(r"[\\/:*?\"<>|]+", "_", name)
