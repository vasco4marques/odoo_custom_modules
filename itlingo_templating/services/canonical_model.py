"""Build canonical models consumed by templates from serialized Langium ASTs.

The models are faithful projections: every DSL field is kept, enum wrappers are
flattened to their string value, concepts are grouped into typed lists, and each
element gains uniform ``id`` / ``title`` / ``kind`` aliases.

Cross references are resolved to the target element, so templates can navigate
them directly (``uc.primaryActor.title``). A bare reference renders as the
target's title (``{{ uc.primaryActor }}``) and still works as a ``by_id`` key
(``by_id[uc.primaryActor]``) for backward compatibility. Dangling references
resolve to a stub carrying the name as ``id``/``title``.
"""

SCHEMA_VERSION = "1.0"

# RSL concept $type -> canonical list name.
_BUCKETS = {
    "Stakeholder": "stakeholders",
    "Actor": "actors",
    "GlossaryTerm": "glossary",
    "Goal": "goals",
    "FR": "functional_requirements",
    "QR": "quality_requirements",
    "Constraint": "constraints",
    "UserStory": "user_stories",
    "UseCase": "use_cases",
    "DataEntity": "data_entities",
}

# ASL concept $type -> canonical list name. ASL UI elements can be nested
# inside containers/components, so ASL collection walks the whole system tree.
_ASL_BUCKETS = {
    "ContextDimensionActor": "actors",
    "UseCase": "use_cases",
    "DataEntity": "data_entities",
    "DataEntityCluster": "data_entity_clusters",
    "DataEnumeration": "data_enumerations",
    "DataAttribute": "data_attributes",
    "UIContainer": "ui_containers",
    "UIComponent": "ui_components",
    "UIComponentPart": "ui_component_parts",
    "UIAction": "ui_actions",
    "UIElementEvent": "ui_events",
    "UIActionEvent": "ui_events",
    "UISystemEvent": "ui_events",
    "UIThrowingEvent": "ui_events",
    "UIPortDefinition": "ui_ports",
    "UIParameter": "ui_parameters",
    "Context": "contexts",
    "ContextDimensionDevice": "context_devices",
    "ContextDimensionSensor": "context_sensors",
    "View": "views",
    "Theme": "themes",
}

RSL_PROFILE = {
    "bucket_aliases": _BUCKETS,
    "root_path": "packages.0.system",
    "root_alias": "project",
    "root_fields": {
        "code": ["name"],
        "name": ["nameAlias", "name"],
        "type": ["type"],
        "sub_type": ["subType"],
        "version": ["version"],
        "vendor": ["vendor"],
        "description": ["description"],
    },
    "ignored_types": ["PackageSystem", "System"],
    "other_alias": "other",
}

ASL_PROFILE = {
    "bucket_aliases": _ASL_BUCKETS,
    "root_path": "packages.0.system",
    "root_alias": "system",
    "tree_alias": "system_concepts",
    "tree_path": "packages.0.system.systemConcepts",
    "ignored_types": ["PackageSystem", "System"],
    "qualified_parent_types": [
        "DataEntity", "DataEntityCluster", "UIContainer", "UIComponent",
    ],
    "other_alias": "other",
}

BUILTIN_PROFILES = {"RSL": RSL_PROFILE, "ASL": ASL_PROFILE}


def profile_for_dsl(dsl_key, custom_profile=None):
    """Return a built-in profile optionally overlaid by record JSON."""
    profile = dict(BUILTIN_PROFILES.get(dsl_key, {}))
    for key, value in (custom_profile or {}).items():
        if key in ("bucket_aliases", "title_fields", "root_fields"):
            merged = dict(profile.get(key) or {})
            merged.update(value or {})
            profile[key] = merged
        else:
            profile[key] = value
    return profile


class Element(dict):
    """A canonical element: attribute access maps to items, renders as its title.

    Hashable and comparable by ``id`` so a resolved reference can still be used
    as a ``by_id`` key (``by_id[uc.primaryActor]``).
    """

    def __getattr__(self, name):
        try:
            return self[name]
        except KeyError:
            raise AttributeError(name)

    def __str__(self):
        return self.get("title") or self.get("id") or ""

    def __hash__(self):
        return hash(self.get("id"))

    def __eq__(self, other):
        if isinstance(other, str):
            return self.get("id") == other
        if isinstance(other, Element):
            return self.get("id") == other.get("id")
        return NotImplemented

    def __ne__(self, other):
        result = self.__eq__(other)
        return result if result is NotImplemented else not result


def _flatten(value):
    """Recursively collapse RSL enum wrappers (``{$type, type}``) to their string."""
    if isinstance(value, dict):
        if set(value.keys()) <= {"$type", "type"} and isinstance(value.get("type"), str):
            return value["type"]
        return {k: _flatten(v) for k, v in value.items()}
    if isinstance(value, list):
        return [_flatten(v) for v in value]
    return value


def _add_aliases(element):
    """Wrap as an Element with uniform id/title/kind aliases (additive)."""
    element = Element(element)
    name = element.get("name")
    element["id"] = name
    element["title"] = element.get("nameAlias") or name
    element["kind"] = element.get("$type")
    return element


def _profile_title(element, profile):
    fields = (profile.get("title_fields") or {}).get(element.get("$type"), [])
    if isinstance(fields, str):
        fields = [fields]
    for field in fields:
        if element.get(field):
            element["title"] = element[field]
            break
    return element


def _stub(name):
    """Element for a reference whose target is not in the model (e.g. a metatype)."""
    return Element({"id": name, "title": name, "kind": None, "name": name})


def _resolve_refs(value, by_id, seen=None):
    """Replace ``{$ref: name}`` markers in *value* with the resolved Element."""
    if seen is None:
        seen = set()
    if isinstance(value, dict):
        if list(value.keys()) == ["$ref"]:
            name = value["$ref"]
            return by_id.get(name) or _stub(name)
        marker = id(value)
        if marker in seen:
            return value
        seen.add(marker)
        for key in list(value.keys()):
            value[key] = _resolve_refs(value[key], by_id, seen)
        return value
    if isinstance(value, list):
        return [_resolve_refs(item, by_id, seen) for item in value]
    return value


def _path_value(value, path):
    for part in (path or "").split("."):
        if not part:
            continue
        if isinstance(value, list):
            try:
                value = value[int(part)]
            except (ValueError, IndexError):
                return None
        elif isinstance(value, dict):
            value = value.get(part)
        else:
            return None
        if value is None:
            return None
    return value


def _project_root(root, fields):
    if not fields:
        return root
    projected = Element()
    for output_name, source_names in fields.items():
        if isinstance(source_names, str):
            source_names = [source_names]
        projected[output_name] = next(
            (root.get(name) for name in source_names if root.get(name) is not None),
            None,
        )
    return projected


def _index_nodes(value, model, profile, seen, parent_names=None):
    """Wrap every named AST node and index it by runtime type and id."""
    parent_names = parent_names or []
    if isinstance(value, dict):
        marker = id(value)
        if marker in seen:
            return value
        seen.add(marker)
        node = value
        if node.get("$type") and node.get("name"):
            node = _profile_title(_add_aliases(node), profile)
            model["elements"].append(node)
            model["by_type"].setdefault(node["kind"], []).append(node)
            model["by_id"][node["id"]] = node
            if parent_names:
                model["by_id"][".".join(parent_names + [node["id"]])] = node
            qualifier_types = profile.get("qualified_parent_types")
            if qualifier_types is None or node.get("kind") in qualifier_types:
                parent_names = parent_names + [node["id"]]
        for key in list(node.keys()):
            node[key] = _index_nodes(node[key], model, profile, seen, parent_names)
        return node
    if isinstance(value, list):
        return [_index_nodes(item, model, profile, seen, parent_names) for item in value]
    return value


def build_generic_model(ast, profile=None):
    """Build the convention-driven context used by every DSL.

    Profiles only add aliases/projections; indexing and reference resolution
    remain fully grammar-independent.
    """
    profile = profile or {}
    root = Element(_flatten(ast or {}))
    model = {
        "schema_version": SCHEMA_VERSION,
        "root": root,
        "elements": [],
        "by_type": {},
        "by_id": {},
    }
    model["root"] = _index_nodes(root, model, profile, set())
    _resolve_refs(model["root"], model["by_id"])

    for key, value in model["root"].items():
        if key not in model and not isinstance(value, (dict, list)):
            model[key] = value

    aliases = profile.get("bucket_aliases") or {}
    for type_name, alias in aliases.items():
        model[alias] = model["by_type"].get(type_name, [])

    ignored = set(profile.get("ignored_types") or [])
    other_alias = profile.get("other_alias")
    if other_alias:
        known_types = set(aliases)
        model[other_alias] = [
            element for element in model["elements"]
            if element.get("kind") not in known_types | ignored
        ]

    profile_root = _path_value(model["root"], profile.get("root_path"))
    if profile.get("root_alias"):
        model[profile["root_alias"]] = _project_root(
            profile_root or Element(), profile.get("root_fields"),
        )
    if profile.get("tree_alias"):
        model[profile["tree_alias"]] = (
            _path_value(model["root"], profile.get("tree_path")) or []
        )
    return model


def build_canonical_model(ast):
    """Transform a serialized Langium AST into the canonical template context."""
    return build_generic_model(ast, RSL_PROFILE)


def build_asl_canonical_model(ast):
    """Transform a serialized ASL AST into the canonical template context."""
    model = build_generic_model(ast, ASL_PROFILE)
    model["dsl"] = "ASL"
    return model
