"""Template-reference inventories and render-time metadata."""

import copy
import hashlib
import os
import re

from odoo.addons.itlingo_dsl.services import grammar_describe

from .dsl_parser import bundled_grammar_path


_BUILTIN_REFERENCE_CACHE = {}
_GRAMMAR_IMPORT_RE = re.compile(
    r"^\s*import\s+['\"]([^'\"]+)['\"]\s*;?\s*$", re.MULTILINE,
)


BUILTIN_COMPATIBILITY_COLLECTIONS = {
    "RSL": [
        {"name": "stakeholders", "type_names": ["Stakeholder"]},
        {"name": "actors", "type_names": ["Actor"]},
        {"name": "goals", "type_names": ["Goal"]},
        {"name": "functional_requirements", "type_names": ["FR"]},
        {"name": "quality_requirements", "type_names": ["QR"]},
        {"name": "constraints", "type_names": ["Constraint"]},
        {"name": "user_stories", "type_names": ["UserStory"]},
        {"name": "use_cases", "type_names": ["UseCase"]},
        {"name": "glossary", "type_names": ["GlossaryTerm"]},
        {"name": "data_entities", "type_names": ["DataEntity"]},
        {"name": "other", "type_names": []},
    ],
    "ASL": [
        {"name": "actors", "type_names": ["ContextDimensionActor"]},
        {"name": "use_cases", "type_names": ["UseCase"]},
        {"name": "data_entities", "type_names": ["DataEntity"]},
        {"name": "data_entity_clusters", "type_names": ["DataEntityCluster"]},
        {"name": "data_enumerations", "type_names": ["DataEnumeration"]},
        {"name": "data_attributes", "type_names": ["DataAttribute"]},
        {"name": "ui_containers", "type_names": ["UIContainer"]},
        {"name": "ui_components", "type_names": ["UIComponent"]},
        {"name": "ui_component_parts", "type_names": ["UIComponentPart"]},
        {"name": "ui_actions", "type_names": ["UIAction"]},
        {
            "name": "ui_events",
            "type_names": [
                "UIElementEvent", "UIActionEvent", "UISystemEvent",
                "UIThrowingEvent",
            ],
        },
        {"name": "ui_ports", "type_names": ["UIPortDefinition"]},
        {"name": "ui_parameters", "type_names": ["UIParameter"]},
        {"name": "contexts", "type_names": ["Context"]},
        {"name": "context_devices", "type_names": ["ContextDimensionDevice"]},
        {"name": "context_sensors", "type_names": ["ContextDimensionSensor"]},
        {"name": "views", "type_names": ["View"]},
        {"name": "themes", "type_names": ["Theme"]},
        {"name": "system_concepts", "type_names": ["SystemConcept"]},
        {"name": "other", "type_names": []},
    ],
}


def _grammar_tree_digest(path, seen=None, digest=None):
    """Hash a bundled grammar and every relative import it depends on."""
    path = os.path.abspath(path)
    seen = seen if seen is not None else set()
    digest = digest or hashlib.sha256()
    if path in seen:
        return digest.hexdigest()
    seen.add(path)
    try:
        with open(path, "rb") as grammar_file:
            source = grammar_file.read()
    except OSError as err:
        raise grammar_describe.GrammarDescribeUnavailable(
            "Bundled grammar source is missing (%s)." % path
        ) from err
    digest.update(path.encode("utf-8"))
    digest.update(b"\0")
    digest.update(source)
    digest.update(b"\0")
    try:
        text = source.decode("utf-8")
    except UnicodeDecodeError as err:
        raise grammar_describe.GrammarDescribeUnavailable(
            "Bundled grammar source is not valid UTF-8 (%s)." % path
        ) from err
    for imported_path in _GRAMMAR_IMPORT_RE.findall(text):
        file_name = imported_path if imported_path.endswith(".langium") \
            else imported_path + ".langium"
        _grammar_tree_digest(
            os.path.join(os.path.dirname(path), file_name), seen, digest,
        )
    return digest.hexdigest()


def builtin_reference(env, dsl_key, refresh=False):
    """Describe a bundled grammar once per file-content revision."""
    grammar_path = bundled_grammar_path(dsl_key)
    if not grammar_path or not os.path.exists(grammar_path):
        raise grammar_describe.GrammarDescribeUnavailable(
            "%s bundled grammar is missing." % (dsl_key or "DSL")
        )
    digest = "%s:%s" % (
        grammar_describe.SCHEMA_VERSION, _grammar_tree_digest(grammar_path),
    )
    cached = _BUILTIN_REFERENCE_CACHE.get(dsl_key)
    if not refresh and cached and cached[0] == digest:
        inventory = copy.deepcopy(cached[1])
    else:
        inventory = grammar_describe.describe_grammar_file(env, grammar_path)
        _BUILTIN_REFERENCE_CACHE[dsl_key] = (digest, copy.deepcopy(inventory))
        inventory = copy.deepcopy(inventory)
    inventory["compatibility_collections"] = copy.deepcopy(
        BUILTIN_COMPATIBILITY_COLLECTIONS.get(dsl_key, [])
    )
    return inventory


def merge_profile(inventory, profile):
    """Attach profile aliases without changing the cached grammar payload."""
    reference = copy.deepcopy(inventory)
    profile = copy.deepcopy(profile or {})
    reference["profile"] = profile
    reference["profile_aliases"] = sorted(
        (
            {"alias": alias, "type_name": type_name}
            for type_name, alias in (profile.get("bucket_aliases") or {}).items()
        ),
        key=lambda item: (item["alias"], item["type_name"]),
    )
    reference["root_alias"] = profile.get("root_alias")
    reference["title_fields"] = copy.deepcopy(profile.get("title_fields") or {})
    return reference


def clear_builtin_reference_cache():
    """Test helper for isolating module-level cache assertions."""
    _BUILTIN_REFERENCE_CACHE.clear()
