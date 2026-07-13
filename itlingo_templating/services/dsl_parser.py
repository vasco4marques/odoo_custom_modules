"""Parse ITLingo DSL specifications into serialized Langium ASTs.

Runs the self-contained ``parser/dist/parser.mjs`` bundle as a local Node
subprocess. No network calls and no dependency on the chatbot/ITOI services.
"""

import json
import logging
import os
import re
import subprocess
import tempfile

_logger = logging.getLogger(__name__)

_MODULE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
_PARSER_JS = os.path.join(_MODULE_DIR, "parser", "dist", "parser.mjs")

_DEFAULT_NODE_PATH = "node"
_DEFAULT_TIMEOUT = 30

_SUPPORTED_DSLS = {
    "RSL": {
        "grammar": os.path.join(_MODULE_DIR, "parser", "rsl.langium"),
        "suffix": ".rsl",
        "label": "RSL specification",
        "validation": "all",
    },
    "ASL": {
        "grammar": os.path.join(_MODULE_DIR, "parser", "asl.langium"),
        "suffix": ".asl",
        "label": "ASL specification",
        # The ASL extension in ITOI has custom scope/linking services. The
        # lightweight runtime grammar parser does not load those services, so
        # cloud templating validates ASL syntax and lets the canonical model
        # resolve template-friendly references by name.
        "validation": "syntax",
    },
}

_SUPPORTED_DSL_XML_IDS = {
    "RSL": "itlingo_dsl.dsl_rsl_1_0",
    "ASL": "itlingo_dsl.dsl_asl_1_0",
}


class DslParseError(Exception):
    """Raised when a DSL specification cannot be parsed.

    ``diagnostics`` is a list of ``{severity, message, line, column}`` dicts.
    """

    def __init__(self, message, diagnostics=None):
        super().__init__(message)
        self.diagnostics = diagnostics or []


class RslParseError(DslParseError):
    """Raised when an RSL specification cannot be parsed."""


class AslParseError(DslParseError):
    """Raised when an ASL specification cannot be parsed."""


def supported_dsl_keys():
    return tuple(_SUPPORTED_DSLS.keys())


def bundled_grammar_path(dsl_key):
    """Return the committed grammar path for a built-in DSL key."""
    config = _SUPPORTED_DSLS.get((dsl_key or "").strip().upper())
    return config.get("grammar") if config else None


def dsl_key_for_record(env, dsl):
    """Return the parser key for a DSL record.

    DSL acronyms are editable metadata. Use stable seeded XML ids instead of
    names/acronyms for parser selection.
    """
    if not dsl:
        return ""
    for key, xml_id in _SUPPORTED_DSL_XML_IDS.items():
        record = env.ref(xml_id, raise_if_not_found=False)
        if record and dsl.id == record.id:
            return key
    return ""


def is_supported_dsl(dsl_key):
    return (dsl_key or "").strip().upper() in _SUPPORTED_DSLS


def is_templatable_dsl(env, dsl):
    """Whether *dsl* has a parser source that is safe to use for generation."""
    if not dsl:
        return False
    if dsl_key_for_record(env, dsl):
        return True
    grammar = dsl._grammar_file() if hasattr(dsl, "_grammar_file") else False
    return bool(
        dsl.status == "active"
        and grammar
        and dsl.grammar_validation_result == "valid"
        and dsl.grammar_validation_is_current
        and dsl.published_digest
        and dsl.published_digest == dsl._grammar_digest()
    )


def dsl_label(dsl_or_key):
    if isinstance(dsl_or_key, str):
        config = _SUPPORTED_DSLS.get((dsl_or_key or "").strip().upper())
        return config["label"] if config else "DSL specification"
    return "%s specification" % (
        dsl_or_key.acronym or dsl_or_key.name or "DSL"
    )


def default_dsl_extension(dsl_key):
    config = _SUPPORTED_DSLS.get((dsl_key or "").strip().upper())
    return config["suffix"] if config else ".dsl"


def _config(env):
    params = env["ir.config_parameter"].sudo()
    node_path = params.get_param("itlingo_templating.node_path", _DEFAULT_NODE_PATH)
    try:
        timeout = int(params.get_param("itlingo_templating.parse_timeout", _DEFAULT_TIMEOUT))
    except (TypeError, ValueError):
        timeout = _DEFAULT_TIMEOUT
    return node_path, timeout


def _parse_error_class(dsl_key):
    if dsl_key == "RSL":
        return RslParseError
    if dsl_key == "ASL":
        return AslParseError
    return DslParseError


_GRAMMAR_IMPORT_RE = re.compile(
    r"^\s*import\s+['\"]([^'\"]+)['\"]\s*;?\s*$", re.MULTILINE,
)


def _record_parser_config(dsl):
    """Build parser configuration from a published DSL record."""
    grammar_text = dsl._flattened_grammar_text()
    imports = _GRAMMAR_IMPORT_RE.findall(grammar_text)
    if imports:
        raise RuntimeError(
            "The published grammar imports %s. Record-sourced grammars must "
            "be self-contained before they can be used for template generation."
            % ", ".join(imports)
        )
    extensions = [
        item.strip() for item in (dsl.file_extensions or "").split(",")
        if item.strip()
    ]
    suffix = extensions[0] if extensions else ".dsl"
    if not suffix.startswith("."):
        suffix = "." + suffix
    return {
        "grammar_text": grammar_text,
        "suffix": suffix,
        "label": dsl_label(dsl),
        "validation": "all",
    }


def parse_dsl(env, dsl_or_key, source_bytes):
    """Parse DSL source bytes and return the serialized AST dict.

    ``dsl_or_key`` may be the stable ``RSL``/``ASL`` parser key (legacy API) or
    an ``itlingo.dsl`` record. Built-ins keep using their bundled grammars;
    other records use their published, validated, self-contained grammar.

    Raises ``DslParseError`` on parse errors (with diagnostics) or
    ``RuntimeError`` on infrastructure problems (missing bundle, node not found,
    timeout).
    """
    dsl = None if isinstance(dsl_or_key, str) else dsl_or_key
    dsl_key = (
        (dsl_or_key or "").strip().upper()
        if isinstance(dsl_or_key, str)
        else dsl_key_for_record(env, dsl)
    )
    config = _SUPPORTED_DSLS.get(dsl_key)
    if not config:
        if not dsl or not is_templatable_dsl(env, dsl):
            raise RuntimeError(
                "Template generation requires an active DSL with a current, "
                "valid published grammar."
            )
        config = _record_parser_config(dsl)

    label = config["label"]
    if not os.path.exists(_PARSER_JS):
        raise RuntimeError(
            "DSL parser bundle is missing (%s). Rebuild it with `npm run build` "
            "in the parser/ folder." % _PARSER_JS
        )
    grammar = config.get("grammar")
    if grammar and not os.path.exists(grammar):
        raise RuntimeError(
            "%s grammar is missing (%s)." % (dsl_key, grammar)
        )

    node_path, timeout = _config(env)

    grammar_path = None
    if config.get("grammar_text") is not None:
        with tempfile.NamedTemporaryFile(suffix=".langium", delete=False) as tmp:
            tmp.write(config["grammar_text"].encode("utf-8"))
            grammar_path = tmp.name
        grammar = grammar_path

    with tempfile.NamedTemporaryFile(suffix=config["suffix"], delete=False) as tmp:
        tmp.write(source_bytes)
        source_path = tmp.name

    try:
        proc = subprocess.run(
            [node_path, _PARSER_JS, grammar, source_path, label, config["validation"]],
            capture_output=True,
            timeout=timeout,
        )
    except FileNotFoundError as err:
        raise RuntimeError(
            "Node.js executable '%s' not found. Set the "
            "'itlingo_templating.node_path' system parameter." % node_path
        ) from err
    except subprocess.TimeoutExpired as err:
        raise RuntimeError("%s parsing timed out after %ss." % (dsl_key, timeout)) from err
    finally:
        try:
            os.unlink(source_path)
        except OSError:
            pass
        if grammar_path:
            try:
                os.unlink(grammar_path)
            except OSError:
                pass

    stdout = (proc.stdout or b"").decode("utf-8", "replace").strip()
    try:
        result = json.loads(stdout)
    except json.JSONDecodeError as err:
        stderr = (proc.stderr or b"").decode("utf-8", "replace")
        _logger.error("%s parser produced invalid output: %s\n%s", dsl_key, stdout, stderr)
        raise RuntimeError("The %s parser returned an unexpected response." % dsl_key) from err

    if not result.get("success"):
        raise _parse_error_class(dsl_key)(
            result.get("error") or "%s could not be parsed." % label,
            diagnostics=result.get("diagnostics"),
        )

    return result.get("ast") or {}


def parse_rsl(env, rsl_bytes):
    """Parse RSL source bytes and return the serialized AST dict."""
    return parse_dsl(env, "RSL", rsl_bytes)


def parse_asl(env, asl_bytes):
    """Parse ASL source bytes and return the serialized AST dict."""
    return parse_dsl(env, "ASL", asl_bytes)
