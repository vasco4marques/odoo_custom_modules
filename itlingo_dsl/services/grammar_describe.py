"""Describe Langium grammar types with the bundled Node CLI."""

import json
import logging
import os
import subprocess
import tempfile

_logger = logging.getLogger(__name__)

_MODULE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
_DESCRIBER_JS = os.path.join(_MODULE_DIR, "validator", "dist", "describe.mjs")

_DEFAULT_NODE_PATH = "node"
_DEFAULT_TIMEOUT = 30
SCHEMA_VERSION = "1.1"


class GrammarDescribeUnavailable(Exception):
    """Raised when the grammar-describe infrastructure cannot run safely."""


def _config(env):
    params = env["ir.config_parameter"].sudo()
    node_path = params.get_param("itlingo_dsl.node_path", _DEFAULT_NODE_PATH)
    try:
        timeout = int(params.get_param(
            "itlingo_dsl.describe_timeout", _DEFAULT_TIMEOUT,
        ))
    except (TypeError, ValueError):
        timeout = _DEFAULT_TIMEOUT
    return node_path, timeout


def _validate_result(result):
    """Reject malformed successful payloads instead of treating them as empty."""
    if not isinstance(result, dict):
        raise GrammarDescribeUnavailable(
            "The grammar describer returned an unexpected response."
        )
    if not result.get("success"):
        # Invalid grammar is a valid describer outcome. Its message is cached
        # by the caller so the portal can degrade without repeatedly spawning
        # Node for the same grammar revision.
        result.setdefault("schema_version", SCHEMA_VERSION)
        result.setdefault("message", "The grammar could not be described.")
        return result
    if result.get("schema_version") != SCHEMA_VERSION:
        raise GrammarDescribeUnavailable(
            "Unsupported grammar description schema version: %s."
            % (result.get("schema_version") or "missing")
        )
    if (
        not isinstance(result.get("entry_type"), str)
        or not isinstance(result.get("types"), list)
        or not isinstance(result.get("unions"), list)
        or not isinstance(result.get("describer_version"), str)
    ):
        raise GrammarDescribeUnavailable(
            "The grammar describer returned an incomplete type inventory."
        )
    return result


def _describe_path(env, grammar_path):
    if not os.path.exists(_DESCRIBER_JS):
        raise GrammarDescribeUnavailable(
            "Grammar describer bundle is missing (%s). Rebuild it with "
            "`npm ci && npm run build` in the validator/ folder."
            % _DESCRIBER_JS
        )
    if not os.path.exists(grammar_path):
        raise GrammarDescribeUnavailable(
            "Grammar source is missing (%s)." % grammar_path
        )

    node_path, timeout = _config(env)
    try:
        proc = subprocess.run(
            [node_path, _DESCRIBER_JS, grammar_path],
            capture_output=True,
            timeout=timeout,
        )
    except FileNotFoundError as err:
        raise GrammarDescribeUnavailable(
            "Node.js executable '%s' not found. Set the "
            "'itlingo_dsl.node_path' system parameter." % node_path
        ) from err
    except subprocess.TimeoutExpired as err:
        raise GrammarDescribeUnavailable(
            "Grammar description timed out after %ss." % timeout
        ) from err

    stdout = (proc.stdout or b"").decode("utf-8", "replace").strip()
    try:
        result = json.loads(stdout)
    except json.JSONDecodeError as err:
        stderr = (proc.stderr or b"").decode("utf-8", "replace")
        _logger.error(
            "Grammar describer produced invalid output (exit %s): %s\n%s",
            proc.returncode, stdout, stderr,
        )
        raise GrammarDescribeUnavailable(
            "The grammar describer returned an unexpected response."
        ) from err

    if proc.returncode and isinstance(result, dict) and result.get("success"):
        raise GrammarDescribeUnavailable(
            "The grammar describer exited unexpectedly."
        )
    return _validate_result(result)


def describe_grammar_text(env, grammar_text):
    """Return schema-v1.1 inventory for grammar source text.

    Invalid grammar returns the CLI's ``success: false`` payload. Missing
    Node/bundle, timeouts, malformed output, and incompatible schemas raise
    :class:`GrammarDescribeUnavailable`.
    """
    with tempfile.NamedTemporaryFile(suffix=".langium", delete=False) as tmp:
        tmp.write(grammar_text.encode("utf-8"))
        grammar_path = tmp.name
    try:
        return _describe_path(env, grammar_path)
    finally:
        try:
            os.unlink(grammar_path)
        except OSError:
            pass


def describe_grammar_file(env, grammar_path):
    """Describe a trusted on-disk grammar, preserving relative imports."""
    return _describe_path(env, grammar_path)
