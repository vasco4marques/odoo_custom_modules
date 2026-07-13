"""Flatten a stored multi-file Langium grammar into one self-contained text."""

import posixpath
import re


_GRAMMAR_IMPORT_RE = re.compile(
    r"^(\s*)import\s+['\"]([^'\"]+)['\"]\s*;?\s*$", re.MULTILINE,
)


class GrammarFlattenError(Exception):
    """A structural grammar workspace error safe to present to an author."""

    def __init__(self, code, message):
        super().__init__(message)
        self.code = code


def _resolve_import(importer_path, imported_path):
    file_name = imported_path if imported_path.endswith(".langium") else (
        f"{imported_path}.langium"
    )
    resolved = posixpath.normpath(posixpath.join(
        posixpath.dirname(importer_path), file_name,
    ))
    if (
        not resolved
        or posixpath.isabs(resolved)
        or resolved == ".."
        or resolved.startswith("../")
    ):
        raise GrammarFlattenError(
            "missing-import",
            "Grammar import '%s' from '%s' escapes the grammar workspace."
            % (imported_path, importer_path),
        )
    return resolved


def flatten_grammar(files, entry_path):
    """Return ``(text, reached, unreachable)`` for a grammar workspace.

    Imports are expanded depth-first in source order. A file reached through
    more than one branch is emitted once, while a file reached again before
    its first visit completes is a true import cycle.
    """
    if not entry_path or entry_path not in files:
        raise GrammarFlattenError(
            "no-entry", "The grammar workspace has no valid entry file.",
        )

    done = set()
    in_progress = []
    parts = []

    def visit(path):
        if path in done:
            return
        if path in in_progress:
            cycle_start = in_progress.index(path)
            cycle = in_progress[cycle_start:] + [path]
            raise GrammarFlattenError(
                "cycle", "Circular grammar import: %s" % " -> ".join(cycle),
            )
        if path not in files:
            raise GrammarFlattenError(
                "missing-import", "Imported grammar file '%s' does not exist." % path,
            )

        in_progress.append(path)
        imports = []

        def strip_import(match):
            imported_path = match.group(2)
            imports.append(_resolve_import(path, imported_path))
            return ""

        parts.append(_GRAMMAR_IMPORT_RE.sub(strip_import, files[path]))
        for imported in imports:
            if imported not in files:
                raise GrammarFlattenError(
                    "missing-import",
                    "Grammar import '%s' from '%s' resolves to missing file '%s'."
                    % (imported, path, imported),
                )
            visit(imported)
        in_progress.pop()
        done.add(path)

    visit(entry_path)
    return "\n".join(parts), set(done), set(files) - done
