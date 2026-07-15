# ITLingo Templating

Generate documents from a specification written in any published ITLingo DSL
and a template.

## Flow

```
template .docx/.xlsx or UTF-8 text file (itlingo.document, type = Document Template)
  + uploaded DSL specification
  -> embedded Langium parser (local node subprocess) -> JSON AST
  -> canonical model (faithful + id/title/kind)
  -> docxtpl/openpyxl/Jinja2 render
  -> rendered file download
```

## Usage

Set an `itlingo.document`'s **Document Type** to **Document Template**, associate
it with a DSL, and give it a supported template file. Every DSL must be active
and have a current, valid grammar published through the grammar editor.
Supported formats are `.docx`, `.xlsx`, and UTF-8 text formats including `.txt`,
`.md`, `.rst`, `.html`, `.htm`, `.json`, `.xml`, `.yaml`, `.yml`, `.toml`,
`.ini`, `.cfg`, `.properties`, `.sql`, `.csv`, `.tsv`, `.css`, `.js`, `.ts`,
and `.sh`.
Text templates are rendered as UTF-8 using Jinja2 directly.
`is_template` is derived from that type. An optional output filename pattern
appears for template documents in the create/edit forms.

On its scoped portal page (`/my/workspaces/<id>/documents/<doc_id>` or
`/my/organizations/<id>/documents/<doc_id>`), a green **Generate Template**
button opens an upload form; submitting a matching specification file streams
the generated document. Nothing is stored. Any user who can read the template
can generate.

Templates are excluded from the knowledge pool and the ITOI send list.

## Grammar compatibility

The DSL record owns a grammar workspace with one entry file and any imported
`.langium` files. Validation and publication flatten that workspace into the
self-contained grammar passed to the runtime parser. The module bundles no
language-specific grammars.

The **Specification Validation** field on the DSL's backend **Templating** tab
defaults to **Full validation**. Select **Syntax only** when the grammar relies
on custom editor scoping or validation services that the generic runtime parser
does not have. This setting is generic and belongs to each DSL record.

## Template Reference inventory

`itlingo.dsl._template_reference()` returns the schema-v1.1 type inventory
produced by the grammar describer. Inventories are stored in
`template_reference_json` and keyed by the schema version plus
`template_reference_digest`, so Node is run once per grammar/schema revision.

`_template_reference_context()` adds the current Template Profile aliases at
render time. Profile edits therefore appear immediately without invalidating
or rebuilding the grammar inventory. If Node or the describer bundle is unavailable, this method returns
a structured degraded payload with `success: false` and `unavailable: true`.

The website exposes this metadata and its authoring tools through these routes:

- `/dsl/template-reference` lists every DSL visible to the current visitor.
- `/dsl/<id>/template-reference` shows the generic context, profile aliases,
  named and embedded grammar types, and copy-ready Jinja snippets. Named types can be searched by type or field,
  have stable anchors, and primitive fields show bounded grammar-literal
  `values` when available.
- `GET /dsl/<id>/template-reference/starter.md` downloads a bounded
  Markdown/Jinja skeleton built by `services/starter_template.py` from the
  same visible inventory.
- `POST /dsl/<id>/template-reference/check` lets an authenticated viewer
  upload a supported template (maximum 5 MiB) or paste Jinja and runs the
  advisory checker without a specification. The input and result are not
  stored.

Anonymous visitors see active DSLs. Maintainers additionally see their own
draft or retired versions, and platform administrators see every DSL. A
missing or temporarily unavailable inventory leaves the generic context and
configured aliases visible instead of returning an error page.

## Advisory template checking

`services/template_linter.py` extracts Jinja from DOCX, XLSX, and supported
UTF-8 text formats and checks it against `_template_reference_context()`. It
reports unknown top-level variables, invalid literal `by_type['Type']` keys,
and conservative possible field typos for loops bound to one known type. Close
matches are included as suggestions. Findings never block generation; an
unavailable inventory returns `skipped` rather than an empty success result.

In addition to the reference-page checker above, saved template documents can
be checked on their generation page through the scoped authenticated routes:

- `POST /my/workspaces/<project_id>/documents/<document_id>/check`
- `POST /my/organizations/<org_id>/documents/<document_id>/check`

These routes check the document's existing attachment against its associated
DSL. They do not require a specification and do not change or create records.

## Template syntax (Jinja2)

```
{{ project.name }} ({{ project.code }})

{% for req in functional_requirements %}
{{ req.id }} - {{ req.title }}: {{ req.description }}
{% endfor %}
```

Every DSL gets the generic context keys `root`, `elements`, `by_type`, `by_id`,
`schema_version`, and `dsl` (the record acronym). Each named AST node is an element with `id`, `title`, and
`kind` aliases plus all fields from its grammar. For example:

```
{% for requirement in by_type['Requirement'] %}
{{ requirement.id }}: {{ requirement.title }}
{% endfor %}
```

An optional JSON Template Profile on the DSL can add friendly bucket aliases,
a root alias/projection, and per-type title fields. A minimal profile is:

```json
{
  "bucket_aliases": {"Requirement": "requirements"},
  "title_fields": {"Requirement": "label"}
}
```

References resolve to the target element, so navigate them directly:

```
{{ uc.primaryActor.title }}      {# the target's title #}
{{ uc.primaryActor }}            {# bare ref renders the title #}
```

`by_id` (id -> element) is still available for lookups by name string, and
`by_id[uc.primaryActor]` also works.

## Setup

Two dependencies are not delivered by `git pull`:

1. **docxtpl** (Python) - install once in the Odoo venv:
   ```
   pip install docxtpl
   ```
2. **Node.js** - already required by Odoo. The parser ships pre-bundled
   (`parser/dist/parser.mjs`); no install needed on the server.

Optional system parameters (Settings > Technical > System Parameters):

- `itlingo_templating.node_path` (default `node`)
- `itlingo_templating.parse_timeout` seconds (default `30`)
- `itlingo_dsl.node_path` (default `node`; shared by grammar validation and description)
- `itlingo_dsl.describe_timeout` seconds (default `30`)

## Rebuilding the parser bundle (local only)

Only when changing the parser runner or the shared Langium version:

```
cd parser
npm install
npm run build                                   # -> dist/parser.mjs (commit it)
```

## Adding RSL or ASL as ordinary records

Neither language is created by this module. On a fresh installation, a platform
administrator creates the desired DSL record and uploads the grammar workspace
from the thesis repository's `languium dsls/` directory:

- RSL: `rsl.langium` as the entry grammar.
- ASL: `asl.langium` as the entry grammar plus `Terminals.langium`.

Validate and publish the record exactly like any other DSL. If ASL documents
produce unresolved-link diagnostics in the generic runtime, select **Syntax
only** under **Specification Validation**. Friendly aliases are not supplied;
templates should use `by_type["TypeName"]`, or an administrator may explicitly
configure a record-level Template Profile.
