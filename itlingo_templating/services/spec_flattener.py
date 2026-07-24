"""Resolve ASL/RSL ``Import`` declarations into one multi-package source.

ASL and RSL both accept multiple ``Package`` declarations in one model.  The
cloud parser can therefore preserve the DSL's normal import/scoping semantics
without reading arbitrary files: only scoped document content supplied by Odoo
is appended to the uploaded entry specification.
"""

from dataclasses import dataclass
import re


_IMPORT_RE = re.compile(
    r"(?<![A-Za-z0-9_])Import[ \t]+"
    r"(?P<namespace>[A-Za-z_][A-Za-z0-9_]*(?:\.[A-Za-z_*][A-Za-z0-9_*]*)*)"
)
_PACKAGE_RE = re.compile(
    r"^[ \t]*Package[ \t]+"
    r"(?P<namespace>[A-Za-z_][A-Za-z0-9_]*(?:\.[A-Za-z_][A-Za-z0-9_]*)*)"
    r"\b",
    re.MULTILINE,
)


class SpecFlattenError(ValueError):
    """A missing or ambiguous specification import."""

    def __init__(self, message, *, namespace=None, source=None, line=None):
        super().__init__(message)
        self.namespace = namespace
        self.source = source
        self.line = line


@dataclass(frozen=True)
class SpecSource:
    """One trusted sibling specification made available by the caller."""

    identifier: str
    name: str
    text: str


def _line_number(text, offset):
    return text.count("\n", 0, offset) + 1


def _code_only(text):
    """Mask comments and quoted strings while retaining offsets/newlines."""
    output = list(text)
    index = 0
    state = "code"
    quote = None
    while index < len(text):
        char = text[index]
        following = text[index + 1] if index + 1 < len(text) else ""
        if state == "code":
            if char in ("'", '"'):
                quote = char
                output[index] = " "
                state = "string"
            elif char == "/" and following == "/":
                output[index] = output[index + 1] = " "
                state = "line_comment"
                index += 1
            elif char == "/" and following == "*":
                output[index] = output[index + 1] = " "
                state = "block_comment"
                index += 1
        elif state == "string":
            if char != "\n":
                output[index] = " "
            if char == "\\" and following:
                if following != "\n":
                    output[index + 1] = " "
                index += 1
            elif char == quote:
                state = "code"
        elif state == "line_comment":
            if char == "\n":
                state = "code"
            else:
                output[index] = " "
        elif state == "block_comment":
            if char == "*" and following == "/":
                output[index] = output[index + 1] = " "
                state = "code"
                index += 1
            elif char != "\n":
                output[index] = " "
        index += 1
    return "".join(output)


def _packages(text):
    return tuple(
        match.group("namespace")
        for match in _PACKAGE_RE.finditer(_code_only(text))
    )


def _imports(source):
    code = _code_only(source.text)
    return tuple(
        (
            match.group("namespace"),
            _line_number(source.text, match.start()),
        )
        for match in _IMPORT_RE.finditer(code)
    )


def _package_can_supply(package, imported_namespace):
    """Mirror the old prefix/wildcard import matching at package granularity."""
    imported = imported_namespace.split(".")
    package_parts = package.split(".")
    comparable = min(len(imported), len(package_parts))
    for index in range(comparable):
        if imported[index] == "*":
            continue
        if imported[index] != package_parts[index]:
            return False
    # A shorter package may own the System/element suffix in a specific import;
    # a shorter import selects all packages below that namespace.
    return True


def flatten_spec(entry_text, import_sources=(), entry_name="<uploaded specification>"):
    """Return *entry_text* with its transitive imported packages appended.

    ``import_sources`` must contain :class:`SpecSource` instances. Sources with
    no ``Package`` declaration are ignored. Duplicate declarations of the same
    package are rejected because choosing one would make editor/cloud results
    dependent on record ordering.
    """
    entry = SpecSource("__entry__", entry_name, entry_text)
    entry_packages = set(_packages(entry.text))
    # An uploaded entry is authoritative for the package being generated. A
    # stored copy of that same package must not be appended as a duplicate.
    candidates = [
        entry,
        *[
            source for source in import_sources
            if entry_packages.isdisjoint(_packages(source.text))
        ],
    ]
    packages_by_source = {
        source.identifier: _packages(source.text)
        for source in candidates
    }

    included = {entry.identifier}
    ordered = [entry]
    cursor = 0
    while cursor < len(ordered):
        current = ordered[cursor]
        cursor += 1
        for namespace, line in _imports(current):
            supplying = []
            for source in candidates:
                if any(
                    _package_can_supply(package, namespace)
                    for package in packages_by_source[source.identifier]
                ):
                    supplying.append(source)
            if not supplying:
                raise SpecFlattenError(
                    "Import %s in %s cannot be resolved from specifications "
                    "in this workspace/organization."
                    % (namespace, current.name),
                    namespace=namespace,
                    source=current.name,
                    line=line,
                )
            matching_packages = {}
            for source in supplying:
                for package in packages_by_source[source.identifier]:
                    if _package_can_supply(package, namespace):
                        matching_packages.setdefault(package, []).append(source)
            for package, owners in matching_packages.items():
                distinct = {owner.identifier: owner for owner in owners}
                if len(distinct) > 1:
                    names = ", ".join(
                        sorted(owner.name for owner in distinct.values())
                    )
                    raise SpecFlattenError(
                        "Import %s is ambiguous: package %s is declared by %s."
                        % (namespace, package, names),
                        namespace=namespace,
                        source=current.name,
                        line=line,
                    )
            for source in supplying:
                if source.identifier not in included:
                    included.add(source.identifier)
                    ordered.append(source)

    return "\n\n".join(
        source.text.rstrip() for source in ordered if source.text.strip()
    ) + "\n"
