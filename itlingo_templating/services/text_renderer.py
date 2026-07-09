"""Render UTF-8 text templates with the shared Jinja2 environment."""

from .rendering import lenient_env


def render_text(template_bytes, context):
    """Render a UTF-8 encoded text template and return UTF-8 bytes.

    Text template formats are deliberately decoded strictly. This avoids treating
    an accidentally uploaded binary file as text and returning corrupted output.
    """
    template = template_bytes.decode("utf-8")
    return lenient_env().from_string(template).render(**context).encode("utf-8")
