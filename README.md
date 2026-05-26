# custom-addons

This folder must contain the **ITLingo Cloud custom Odoo modules** as its own
git repository.

It is intentionally empty in this skeleton — the modules live in a separate
repository and are gitignored here.

## Expected layout

After cloning, you should have:

```
custom-addons/
  itlingo_documents/
  itlingo_integration/
  itlingo_notifications/
  itlingo_organizations/
  itlingo_website_portal/
  itlingo_workspace_access/
  ...
```

## Setup

From the project root:

```bash
git clone <custom-addons-repo-url> custom-addons
```

The `addons_path` entry in `config/odoo.config` must point to the absolute
path of this folder.
