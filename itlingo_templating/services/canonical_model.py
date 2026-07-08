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

_ALL_LISTS = list(_BUCKETS.values()) + ["other"]

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

_ASL_LISTS = [
    "actors",
    "use_cases",
    "data_entities",
    "data_entity_clusters",
    "data_enumerations",
    "data_attributes",
    "ui_containers",
    "ui_components",
    "ui_component_parts",
    "ui_actions",
    "ui_events",
    "ui_ports",
    "ui_parameters",
    "contexts",
    "context_devices",
    "context_sensors",
    "views",
    "themes",
    "other",
]


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


def _extract_system(ast):
    """Return the single System node (one system per file), or None."""
    for package in (ast or {}).get("packages", []) or []:
        system = package.get("system")
        if system:
            return system
    return None


def build_canonical_model(ast):
    """Transform a serialized Langium AST into the canonical template context."""
    ast = _flatten(ast or {})
    system = _extract_system(ast)

    model = {"schema_version": SCHEMA_VERSION, "project": {}, "by_id": {}}
    for list_name in _ALL_LISTS:
        model[list_name] = []

    if not system:
        return model

    model["project"] = {
        "code": system.get("name"),
        "name": system.get("nameAlias") or system.get("name"),
        "type": system.get("type"),
        "sub_type": system.get("subType"),
        "version": system.get("version"),
        "vendor": system.get("vendor"),
        "description": system.get("description"),
    }

    for concept in system.get("systemConcepts", []) or []:
        element = _add_aliases(concept)
        list_name = _BUCKETS.get(concept.get("$type"), "other")
        model[list_name].append(element)
        if element.get("id"):
            model["by_id"][element["id"]] = element

    # Second pass: now that every element is registered, turn reference markers
    # into the actual elements (shared object identity; cycles are fine for Jinja).
    for list_name in _ALL_LISTS:
        for element in model[list_name]:
            _resolve_refs(element, model["by_id"])

    return model


def _index_asl_elements(value, model, seen, parent_names=None):
    """Wrap and bucket named ASL nodes recursively."""
    parent_names = parent_names or []
    if isinstance(value, dict):
        marker = id(value)
        if marker in seen:
            return value
        seen.add(marker)

        node = value
        type_name = node.get("$type")
        list_name = _ASL_BUCKETS.get(type_name)
        if list_name and node.get("name"):
            node = _add_aliases(node)
            model[list_name].append(node)
            if node.get("id"):
                model["by_id"][node["id"]] = node
                if parent_names:
                    model["by_id"][".".join(parent_names + [node["id"]])] = node
        elif node.get("$type") and node.get("name"):
            node = _add_aliases(node)
            model["other"].append(node)
            if node.get("id"):
                model["by_id"][node["id"]] = node
                if parent_names:
                    model["by_id"][".".join(parent_names + [node["id"]])] = node

        child_parent_names = parent_names
        if node.get("$type") in ("DataEntity", "DataEntityCluster", "UIContainer", "UIComponent"):
            child_parent_names = parent_names + [node.get("name")]
        for key in list(node.keys()):
            node[key] = _index_asl_elements(node[key], model, seen, child_parent_names)
        return node
    if isinstance(value, list):
        return [_index_asl_elements(item, model, seen, parent_names) for item in value]
    return value


def build_asl_canonical_model(ast):
    """Transform a serialized ASL AST into the canonical template context."""
    ast = _flatten(ast or {})
    system = _extract_system(ast)

    model = {
        "schema_version": SCHEMA_VERSION,
        "dsl": "ASL",
        "system": {},
        "system_concepts": [],
        "by_id": {},
    }
    for list_name in _ASL_LISTS:
        model[list_name] = []

    if not system:
        return model

    model["system"] = Element({
        "id": system.get("name"),
        "name": system.get("name"),
        "title": system.get("nameAlias") or system.get("name"),
        "type": system.get("type"),
        "sub_type": system.get("subType"),
        "kind": system.get("$type"),
        "description": system.get("description"),
    })
    if model["system"].get("id"):
        model["by_id"][model["system"]["id"]] = model["system"]

    model["system_concepts"] = _index_asl_elements(
        system.get("systemConcepts", []) or [], model, set(),
    )

    for list_name in _ASL_LISTS:
        for element in model[list_name]:
            _resolve_refs(element, model["by_id"])
    model["system_concepts"] = _resolve_refs(model["system_concepts"], model["by_id"])

    return model
