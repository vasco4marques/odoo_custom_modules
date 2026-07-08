"""Parse supported ITLingo DSL specifications into serialized Langium ASTs.

Runs the self-contained ``parser/dist/parser.mjs`` bundle as a local Node
subprocess. No network calls and no dependency on the chatbot/ITOI services.
"""

import json
import logging
import os
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


def is_supported_dsl(dsl_key):
    return (dsl_key or "").strip().upper() in _SUPPORTED_DSLS


def dsl_label(dsl_key):
    config = _SUPPORTED_DSLS.get((dsl_key or "").strip().upper())
    return config["label"] if config else "DSL specification"


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


def parse_dsl(env, dsl_key, source_bytes):
    """Parse supported DSL source bytes and return the serialized AST dict.

    Raises ``DslParseError`` on parse errors (with diagnostics) or
    ``RuntimeError`` on infrastructure problems (missing bundle, node not found,
    timeout).
    """
    dsl_key = (dsl_key or "").strip().upper()
    config = _SUPPORTED_DSLS.get(dsl_key)
    if not config:
        raise RuntimeError("Template generation is not available for this DSL.")

    grammar = config["grammar"]
    label = config["label"]
    if not os.path.exists(_PARSER_JS):
        raise RuntimeError(
            "DSL parser bundle is missing (%s). Rebuild it with `npm run build` "
            "in the parser/ folder." % _PARSER_JS
        )
    if not os.path.exists(grammar):
        raise RuntimeError(
            "%s grammar is missing (%s)." % (dsl_key, grammar)
        )

    node_path, timeout = _config(env)

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
