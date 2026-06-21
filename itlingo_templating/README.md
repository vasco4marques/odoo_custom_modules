# ITLingo Templating

Generate DOCX documents from an RSL specification and a template.

## Flow

```
template .docx (itlingo.document, type = Template)
  + uploaded .rsl
  -> embedded Langium parser (local node subprocess) -> JSON AST
  -> canonical model (faithful + id/title/kind)
  -> docxtpl (Jinja2) render
  -> DOCX download
```

## Usage

Set an `itlingo.document`'s **Document Type** to **Template** and give it a
`.docx` file. `is_template` is derived from that type. An optional output
filename pattern appears for template documents in the create/edit forms.

On its scoped portal page (`/my/workspaces/<id>/documents/<doc_id>` or
`/my/organizations/<id>/documents/<doc_id>`), a green **Generate Template**
button opens an upload form; submitting an `.rsl` streams the generated DOCX.
Nothing is stored. Any user who can read the template can generate.

Templates are excluded from the knowledge pool and the ITOI send list.

## Template syntax (Jinja2 via docxtpl)

```
{{ project.name }} ({{ project.code }})

{% for req in functional_requirements %}
{{ req.id }} - {{ req.title }}: {{ req.description }}
{% endfor %}
```

Context keys: `project`, `stakeholders`, `actors`, `goals`,
`functional_requirements`, `quality_requirements`, `constraints`,
`user_stories`, `use_cases`, `glossary`, `data_entities`, `other`, `by_id`,
`schema_version`. Every element has `id`, `title`, `kind` plus its RSL fields.

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

## Rebuilding the parser bundle (local only)

Only when bumping the grammar or Langium version:

```
cp ../../../../rsl.langium parser/rsl.langium   # refresh the pinned grammar
cd parser
npm install
npm run build                                   # -> dist/parser.mjs (commit it)
```
