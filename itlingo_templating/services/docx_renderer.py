"""Render a DOCX template against the canonical model using docxtpl (Jinja2).

Rendering is lenient: missing fields resolve to blank instead of failing, so
partial specifications still produce a document.
"""

import io

from .rendering import lenient_env, render_filename  # noqa: F401 (re-exported)


def render_docx(template_bytes, context):
    """Render the DOCX *template_bytes* with *context*; return DOCX bytes."""
    from docxtpl import DocxTemplate

    tpl = DocxTemplate(io.BytesIO(template_bytes))
    tpl.render(context, jinja_env=lenient_env())
    out = io.BytesIO()
    tpl.save(out)
    return out.getvalue()
