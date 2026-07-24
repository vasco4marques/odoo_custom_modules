"""Parse ITLingo DSL specifications into serialized Langium ASTs.

Runs ``parser/dist/parser.mjs`` as a local Node subprocess. Langium is kept as a
runtime dependency under ``parser/node_modules`` so author-supplied service
modules can share the parser's Langium instance.
"""

import hashlib
import base64
import json
import logging
import os
import re
import subprocess
import tempfile

from .spec_flattener import SpecFlattenError, SpecSource, flatten_spec

_logger = logging.getLogger(__name__)

_MODULE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
_PARSER_DIR = os.path.join(_MODULE_DIR, "parser")
_PARSER_JS = os.path.join(_PARSER_DIR, "dist", "parser.mjs")
_LANGIUM_PACKAGE = os.path.join(
    _PARSER_DIR, "node_modules", "langium", "package.json",
)

_DEFAULT_NODE_PATH = "node"
_DEFAULT_TIMEOUT = 30

class DslParseError(Exception):
    """Raised when a DSL specification cannot be parsed.

    ``diagnostics`` is a list of ``{severity, message, line, column}`` dicts.
    """

    def __init__(self, message, diagnostics=None):
        super().__init__(message)
        self.diagnostics = diagnostics or []


def is_templatable_dsl(env, dsl):
    """Whether *dsl* has a parser source that is safe to use for generation."""
    if not dsl:
        return False
    technical_dsl = dsl.sudo() if hasattr(dsl, "sudo") else dsl
    grammar = (
        technical_dsl._grammar_file()
        if hasattr(technical_dsl, "_grammar_file") else False
    )
    grammar_is_ready = bool(
        technical_dsl.status == "active"
        and grammar
        and technical_dsl.grammar_validation_result == "valid"
        and technical_dsl.grammar_validation_is_current
        and technical_dsl.published_digest
        and technical_dsl.published_digest == technical_dsl._grammar_digest()
    )
    if not grammar_is_ready:
        return False

    services_files = (
        technical_dsl._services_files()
        if hasattr(technical_dsl, "_services_files") else False
    )
    if not services_files:
        return True

    artifact = technical_dsl.services_compiled or ""
    artifact_digest = (
        hashlib.sha256(artifact.encode("utf-8")).hexdigest()
        if artifact else False
    )
    source_digest = (
        technical_dsl._services_source_digest()
        if hasattr(technical_dsl, "_services_source_digest") else False
    )
    return bool(
        technical_dsl.services_compile_result == "ok"
        and source_digest
        and technical_dsl.services_source_digest == source_digest
        and artifact
        and technical_dsl.services_compiled_digest == artifact_digest
    )


def dsl_label(dsl):
    return "%s specification" % (
        dsl.acronym or dsl.name or "DSL"
    )


def _config(env):
    params = env["ir.config_parameter"].sudo()
    node_path = params.get_param("itlingo_templating.node_path", _DEFAULT_NODE_PATH)
    try:
        timeout = int(params.get_param("itlingo_templating.parse_timeout", _DEFAULT_TIMEOUT))
    except (TypeError, ValueError):
        timeout = _DEFAULT_TIMEOUT
    return node_path, timeout


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
        "validation": dsl.templating_validation_level or "all",
        "services_module": dsl.services_compiled or "",
    }


def scoped_spec_sources(env, dsl, scope_document):
    """Load the exact workspace/organization corpus exposed to ITOI."""
    if not scope_document:
        return []
    project = getattr(scope_document, "project_id", False)
    organization = getattr(scope_document, "organization_id", False)
    documents = env["itlingo.document"]._scoped_dsl_source_documents(
        dsl, project=project, organization=organization,
    )
    sources = []
    for document in documents:
        raw = base64.b64decode(document.document_file)
        try:
            text = raw.decode("utf-8")
        except UnicodeDecodeError as err:
            raise DslParseError(
                "Imported specification %s must be encoded as UTF-8."
                % (document.file_name or document.name)
            ) from err
        sources.append(SpecSource(
            identifier="itlingo.document:%s" % document.id,
            name=document.file_name or document.name or "document-%s" % document.id,
            text=text,
        ))
    return sources


def parse_dsl(
    env, dsl, source_bytes, *, import_sources=None, scope_document=None,
    source_name="<uploaded specification>",
):
    """Parse DSL source bytes and return the serialized AST dict.

    The ``itlingo.dsl`` record supplies the published, validated grammar and
    the record-level validation policy.

    Raises ``DslParseError`` on parse errors (with diagnostics) or
    ``RuntimeError`` on infrastructure problems (missing bundle, node not found,
    timeout).
    """
    if not dsl or isinstance(dsl, str) or not is_templatable_dsl(env, dsl):
        raise RuntimeError(
            "Template generation requires an active DSL with a current, "
            "valid published grammar and current compiled services module."
        )
    technical_dsl = dsl.sudo() if hasattr(dsl, "sudo") else dsl
    config = _record_parser_config(technical_dsl)
    dsl_name = technical_dsl.acronym or technical_dsl.name or "DSL"

    try:
        source_text = source_bytes.decode("utf-8")
    except UnicodeDecodeError as err:
        raise DslParseError(
            "%s must be encoded as UTF-8." % config["label"]
        ) from err
    if import_sources is None:
        import_sources = (
            scoped_spec_sources(env, technical_dsl, scope_document)
            if scope_document else []
        )
    try:
        flattened_source = flatten_spec(
            source_text,
            import_sources,
            entry_name=source_name,
        ).encode("utf-8")
    except SpecFlattenError as err:
        diagnostic = {
            "severity": 1,
            "message": str(err),
            "line": err.line or 1,
            "column": 1,
        }
        raise DslParseError(str(err), diagnostics=[diagnostic]) from err

    label = config["label"]
    if not os.path.exists(_PARSER_JS):
        raise RuntimeError(
            "DSL parser bundle is missing (%s). Rebuild it with `npm run build` "
            "in the parser/ folder." % _PARSER_JS
        )
    if not os.path.exists(_LANGIUM_PACKAGE):
        raise RuntimeError(
            "DSL parser runtime dependency Langium is missing (%s). Run "
            "`npm ci --omit=dev` in the parser/ folder or rebuild the container."
            % _LANGIUM_PACKAGE
        )
    node_path, timeout = _config(env)

    with tempfile.TemporaryDirectory(prefix="itlingo-dsl-parser-") as temp_dir:
        grammar = os.path.join(temp_dir, "grammar.langium")
        with open(grammar, "wb") as grammar_file:
            grammar_file.write(config["grammar_text"].encode("utf-8"))

        source_path = os.path.join(temp_dir, "source%s" % config["suffix"])
        with open(source_path, "wb") as source_file:
            source_file.write(flattened_source)

        args = [
            node_path,
            _PARSER_JS,
            grammar,
            source_path,
            label,
            config["validation"],
        ]
        services_module = config["services_module"]
        if services_module:
            services_path = os.path.join(temp_dir, "services.mjs")
            with open(services_path, "wb") as services_file:
                services_file.write(services_module.encode("utf-8"))
            # ESM package imports resolve from the author module's location.
            # Link the parser's dependencies into the temporary workspace so
            # `import ... from "langium"` shares this process's Langium copy.
            os.symlink(
                os.path.join(_PARSER_DIR, "node_modules"),
                os.path.join(temp_dir, "node_modules"),
                target_is_directory=True,
            )
            args.append(services_path)

        try:
            proc = subprocess.run(
                args,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                stdin=subprocess.DEVNULL,
                cwd=temp_dir,
                timeout=timeout,
            )
        except FileNotFoundError as err:
            raise RuntimeError(
                "The DSL parser Node executable was not found: %s" % err
            ) from err
        except subprocess.TimeoutExpired as err:
            raise RuntimeError(
                "%s parsing timed out after %ss." % (dsl_name, timeout)
            ) from err

    stdout = (proc.stdout or b"").decode("utf-8", "replace").strip()
    try:
        result = json.loads(stdout)
    except json.JSONDecodeError as err:
        stderr = (proc.stderr or b"").decode("utf-8", "replace")
        _logger.error("%s parser produced invalid output: %s\n%s", dsl_name, stdout, stderr)
        raise RuntimeError("The %s parser returned an unexpected response." % dsl_name) from err

    if not result.get("success"):
        raise DslParseError(
            result.get("error") or "%s could not be parsed." % label,
            diagnostics=result.get("diagnostics"),
        )

    return result.get("ast") or {}
