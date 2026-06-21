"""Build the canonical model consumed by templates from a Langium RSL AST.

The model is a faithful projection: every RSL field is kept, enum wrappers are
flattened to their string value, system concepts are grouped into typed lists,
and each element gains uniform ``id`` / ``title`` / ``kind`` aliases.

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


def _resolve_refs(value, by_id):
    """Replace ``{$ref: name}`` markers in *value* with the resolved Element."""
    if isinstance(value, dict):
        if list(value.keys()) == ["$ref"]:
            name = value["$ref"]
            return by_id.get(name) or _stub(name)
        for key in list(value.keys()):
            value[key] = _resolve_refs(value[key], by_id)
        return value
    if isinstance(value, list):
        return [_resolve_refs(item, by_id) for item in value]
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
