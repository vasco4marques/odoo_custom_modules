"""Jinja2 helpers shared by the DOCX and XLSX renderers.

Rendering is lenient: missing fields resolve to blank instead of failing, so
partial specifications still produce a document.
"""

import json
import re


def lenient_env():
    """Jinja2 environment used by every renderer.

    ChainableUndefined keeps *missing* keys blank; finalize keeps present-but
    -None values (e.g. an unset version/vendor) blank instead of printing "None".
    """
    import jinja2

    env = jinja2.Environment(
        undefined=jinja2.ChainableUndefined,
        finalize=lambda v: "" if v is None else v,
        keep_trailing_newline=True,
    )
    default_dumps = env.policies["json.dumps_function"] or json.dumps

    def dumps_json_safe(value, **kwargs):
        def undefined_as_null(item):
            if isinstance(item, jinja2.Undefined):
                return None
            raise TypeError(
                "Object of type %s is not JSON serializable"
                % type(item).__name__
            )

        kwargs.setdefault("default", undefined_as_null)
        return default_dumps(value, **kwargs)

    env.policies["json.dumps_function"] = dumps_json_safe
    return env


SUPPORTED_TEMPLATE_EXTENSIONS = (
    ".docx", ".xlsx",
    ".txt", ".md", ".rst", ".html", ".htm", ".json", ".xml",
    ".yaml", ".yml", ".toml", ".ini", ".cfg", ".properties",
    ".sql", ".csv", ".tsv", ".css", ".js", ".ts", ".sh",
)


def render_filename(pattern, context, fallback, extension):
    """Render an output filename from a Jinja2 *pattern*.

    Falls back to *fallback* when the pattern is empty or invalid, then forces
    *extension* (e.g. ".xlsx"): a wrong office extension is replaced rather than
    stacked, so ``foo.docx`` becomes ``foo.xlsx`` instead of ``foo.docx.xlsx``.
    """
    name = ""
    if pattern:
        try:
            name = lenient_env().from_string(pattern).render(context).strip()
        except Exception:
            name = ""
    name = name or fallback
    lower = name.lower()
    if not lower.endswith(extension):
        for ext in SUPPORTED_TEMPLATE_EXTENSIONS:
            if lower.endswith(ext):
                name = name[: -len(ext)]
                break
        name = "%s%s" % (name, extension)
    # Strip path separators / unsafe characters from the final filename.
    return re.sub(r"[\\/:*?\"<>|]+", "_", name)
