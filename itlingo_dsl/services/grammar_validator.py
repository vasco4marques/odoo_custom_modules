"""Validate Langium grammar source with the bundled Langium services.

Runs the self-contained ``validator/dist/validate.mjs`` bundle as a local Node
subprocess, the same pattern used by ``itlingo_templating`` for DSL parsing.
This is the server-side validation authority for DSL publication: it never
trusts a browser-supplied validity flag.
"""

import json
import logging
import os
import subprocess
import tempfile

_logger = logging.getLogger(__name__)

_MODULE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
_VALIDATOR_JS = os.path.join(_MODULE_DIR, "validator", "dist", "validate.mjs")

_DEFAULT_NODE_PATH = "node"
_DEFAULT_TIMEOUT = 30


class GrammarValidationUnavailable(Exception):
    """Raised when server-side validation cannot run (infrastructure)."""


def _config(env):
    params = env["ir.config_parameter"].sudo()
    node_path = params.get_param("itlingo_dsl.node_path", _DEFAULT_NODE_PATH)
    try:
        timeout = int(params.get_param(
            "itlingo_dsl.validate_timeout", _DEFAULT_TIMEOUT,
        ))
    except (TypeError, ValueError):
        timeout = _DEFAULT_TIMEOUT
    return node_path, timeout


def validate_grammar_text(env, grammar_text):
    """Validate Langium grammar source text server-side.

    Returns ``{"valid": bool, "diagnostics": [...], "validator_version": str}``.
    Raises ``GrammarValidationUnavailable`` when the validation infrastructure
    is missing or fails; callers must treat that as "not validated", never as
    "valid".
    """
    if not os.path.exists(_VALIDATOR_JS):
        raise GrammarValidationUnavailable(
            "Grammar validator bundle is missing (%s). Rebuild it with "
            "`npm ci && npm run build` in the validator/ folder."
            % _VALIDATOR_JS
        )

    node_path, timeout = _config(env)

    with tempfile.NamedTemporaryFile(suffix=".langium", delete=False) as tmp:
        tmp.write(grammar_text.encode("utf-8"))
        grammar_path = tmp.name

    try:
        proc = subprocess.run(
            [node_path, _VALIDATOR_JS, grammar_path],
            capture_output=True,
            timeout=timeout,
        )
    except FileNotFoundError as err:
        raise GrammarValidationUnavailable(
            "Node.js executable '%s' not found. Set the "
            "'itlingo_dsl.node_path' system parameter." % node_path
        ) from err
    except subprocess.TimeoutExpired as err:
        raise GrammarValidationUnavailable(
            "Grammar validation timed out after %ss." % timeout
        ) from err
    finally:
        try:
            os.unlink(grammar_path)
        except OSError:
            pass

    stdout = (proc.stdout or b"").decode("utf-8", "replace").strip()
    try:
        result = json.loads(stdout)
    except json.JSONDecodeError as err:
        stderr = (proc.stderr or b"").decode("utf-8", "replace")
        _logger.error(
            "Grammar validator produced invalid output: %s\n%s", stdout, stderr,
        )
        raise GrammarValidationUnavailable(
            "The grammar validator returned an unexpected response."
        ) from err

    if not result.get("success"):
        raise GrammarValidationUnavailable(
            result.get("error") or "The grammar validator failed."
        )

    return {
        "valid": bool(result.get("valid")),
        "diagnostics": result.get("diagnostics") or [],
        "validator_version": result.get("validatorVersion") or "unknown",
    }
