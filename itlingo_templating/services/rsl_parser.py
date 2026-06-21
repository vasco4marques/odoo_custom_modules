"""Parse an .rsl specification into a JSON AST via the embedded Langium parser.

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
_GRAMMAR = os.path.join(_MODULE_DIR, "parser", "rsl.langium")

_DEFAULT_NODE_PATH = "node"
_DEFAULT_TIMEOUT = 30


class RslParseError(Exception):
    """Raised when the RSL specification cannot be parsed.

    ``diagnostics`` is a list of ``{severity, message, line, column}`` dicts.
    """

    def __init__(self, message, diagnostics=None):
        super().__init__(message)
        self.diagnostics = diagnostics or []


def _config(env):
    params = env["ir.config_parameter"].sudo()
    node_path = params.get_param("itlingo_templating.node_path", _DEFAULT_NODE_PATH)
    try:
        timeout = int(params.get_param("itlingo_templating.parse_timeout", _DEFAULT_TIMEOUT))
    except (TypeError, ValueError):
        timeout = _DEFAULT_TIMEOUT
    return node_path, timeout


def parse_rsl(env, rsl_bytes):
    """Parse RSL source bytes and return the serialized AST dict.

    Raises ``RslParseError`` on parse errors (with diagnostics) or RuntimeError
    on infrastructure problems (missing bundle, node not found, timeout).
    """
    if not os.path.exists(_PARSER_JS):
        raise RuntimeError(
            "RSL parser bundle is missing (%s). Rebuild it with `npm run build` "
            "in the parser/ folder." % _PARSER_JS
        )

    node_path, timeout = _config(env)

    with tempfile.NamedTemporaryFile(suffix=".rsl", delete=False) as tmp:
        tmp.write(rsl_bytes)
        rsl_path = tmp.name

    try:
        proc = subprocess.run(
            [node_path, _PARSER_JS, _GRAMMAR, rsl_path],
            capture_output=True,
            timeout=timeout,
        )
    except FileNotFoundError as err:
        raise RuntimeError(
            "Node.js executable '%s' not found. Set the "
            "'itlingo_templating.node_path' system parameter." % node_path
        ) from err
    except subprocess.TimeoutExpired as err:
        raise RuntimeError("RSL parsing timed out after %ss." % timeout) from err
    finally:
        try:
            os.unlink(rsl_path)
        except OSError:
            pass

    stdout = (proc.stdout or b"").decode("utf-8", "replace").strip()
    try:
        result = json.loads(stdout)
    except json.JSONDecodeError as err:
        stderr = (proc.stderr or b"").decode("utf-8", "replace")
        _logger.error("RSL parser produced invalid output: %s\n%s", stdout, stderr)
        raise RuntimeError("The RSL parser returned an unexpected response.") from err

    if not result.get("success"):
        raise RslParseError(
            result.get("error") or "The RSL specification could not be parsed.",
            diagnostics=result.get("diagnostics"),
        )

    return result.get("ast") or {}
