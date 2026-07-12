"""Build bounded Markdown starter templates from grammar references."""

MAX_TYPES = 50
MAX_FIELDS_PER_TYPE = 20


def _field_expression(field):
    name = field.get("name")
    if not name:
        return None
    suffix = ".title" if field.get("kind") in {"reference", "containment"} else ""
    if field.get("list"):
        attribute = "title" if suffix else name
        return "{{ item.%s | map(attribute='%s') | join(', ') }}" % (name, attribute)
    return "{{ item.%s%s }}" % (name, suffix)


def build_starter_template(reference, acronym="DSL"):
    """Return a safe, bounded Markdown/Jinja skeleton for an inventory."""
    reference = reference or {}
    root_alias = reference.get("root_alias") or "root"
    lines = [
        "# {{ %s.title }}" % root_alias,
        "",
        "<!-- Starter template for %s. Remove sections you do not need. -->" % acronym,
        "",
    ]
    aliases = {
        item.get("type_name"): item.get("alias")
        for item in reference.get("profile_aliases", [])
        if item.get("type_name") and item.get("alias")
    }
    named_types = [item for item in reference.get("types", []) if item.get("indexed")]
    for type_item in named_types[:MAX_TYPES]:
        type_name = type_item.get("name") or "Element"
        collection = aliases.get(type_name) or 'by_type["%s"]' % type_name
        lines.extend([
            "## %s" % type_name,
            "",
            "{% for item in " + collection + " %}",
            "### {{ item.title }}",
            "",
            "- **ID:** {{ item.id }}",
            "- **Title:** {{ item.title }}",
            "- **Kind:** {{ item.kind }}",
        ])
        fields = []
        for field in type_item.get("properties", []):
            if field.get("name") in {"id", "title", "kind"}:
                continue
            expression = _field_expression(field)
            if expression:
                fields.append((field["name"], expression))
        for name, expression in fields[:MAX_FIELDS_PER_TYPE]:
            lines.append("- **%s:** %s" % (name, expression))
        lines.extend(["", "{% endfor %}", ""])
    return "\n".join(lines).rstrip() + "\n"
