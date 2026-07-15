# ITLingo Langium grammar tools

Self-contained Node CLIs used for **server-side** grammar validation and
template-reference type extraction. Publication never trusts a
browser-supplied validity flag; `validate.mjs` is the authority
(`itlingo_dsl/services/grammar_validator.py` runs it as a subprocess, the same
pattern as the `itlingo_templating` parser).

`langium` is pinned to 4.3.1 — the same version as the browser Grammar Editor
(`itlingo_website_portal/frontend/grammar-editor`) — so server and editor
verdicts agree. When bumping one, bump the other and the `LANGIUM_VERSION`
constants in `src/validate.mjs` and `src/describe.mjs`.

## Build

```sh
npm ci
npm run build
```

The bundled `dist/validate.mjs` and `dist/describe.mjs` files are committed,
so Node is required to run the tools (like the templating parser), not to
build the addon at deploy time.

## Validator usage

```sh
node dist/validate.mjs <grammarPath>
```

Prints JSON on stdout:

```json
{"success": true, "valid": false, "diagnostics": [
    {"severity": "error", "message": "...", "line": 2, "column": 20, "code": ""}
], "validatorVersion": "langium 4.3.1 / validator 1.0.0"}
```

Only `error` diagnostics make a grammar invalid; warnings and hints are
reported but do not block publication.

## Describer usage

```sh
node dist/describe.mjs <grammarPath>
```

The describer inlines relative Langium imports, runs Langium 4.3.1's
`collectAst` type collector, and prints the template-reference schema. A type
is `indexed` exactly when its complete (including inherited) properties contain
a `name` field whose type includes `string`. This matches the canonical
model's rule for valid `by_type` keys.

Schema version 1.1:

```json
{
  "success": true,
  "schema_version": "1.1",
  "entry_type": "Model",
  "types": [
    {
      "name": "Requirement",
      "indexed": true,
      "abstract": false,
      "super_types": ["Element"],
      "properties": [
        {
          "name": "actors",
          "kind": "reference",
          "target": "Actor",
          "list": true,
          "optional": true
        },
        {
          "name": "priority",
          "kind": "primitive",
          "type": "string",
          "list": false,
          "optional": true,
          "values": ["High", "Medium", "Low"]
        }
      ]
    }
  ],
  "unions": [
    {"name": "Element", "alternatives": ["Actor", "Requirement"]}
  ],
  "describer_version": "langium 4.3.1 / describer 1.1.0"
}
```

Property `kind` is one of `primitive`, `reference`, or `containment`.
Primitive `type` values are normalized to `string`, `number`, or `boolean`
(joined with ` | ` when a datatype allows alternatives); reference and
containment properties use `target` instead. A primitive assignment whose
grammar terminal is a bounded alternative of keywords also has an optional
sorted `values` array. This field is additive, so schema 1.0 consumers that
ignore unknown fields remain compatible. The templating addon's Template
Reference renders these values as allowed-value hints. Because stored and
built-in inventories include `SCHEMA_VERSION` in their cache identity, bump
that constant whenever the describer schema changes. Invalid input and infrastructure
failures print a JSON object with `success: false`, `message`, the
schema/version fields, and a non-zero exit status.

## Tests

```sh
npm test
```

The suite covers imported terminals, cross-references, arrays, optional
groups, fragment rules, datatype rules, declared interfaces, unions, invalid
input, and multi-file grammar inlining.
