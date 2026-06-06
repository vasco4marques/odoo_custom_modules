from odoo import fields, models


class ItlingoDsl(models.Model):
    _name = "itlingo.dsl"
    _description = "ITLingo Domain-Specific Language"
    _order = "acronym asc, version desc"

    name = fields.Char(
        string="Name",
        required=True,
    )

    acronym = fields.Char(
        string="Acronym",
        required=True,
    )

    version = fields.Char(
        string="Version",
        required=True,
        default="1.0",
    )

    description = fields.Text(
        string="Description",
    )

    status = fields.Selection(
        selection=[
            ("draft", "Draft"),
            ("active", "Active"),
            ("deprecated", "Deprecated"),
            ("archived", "Archived"),
        ],
        string="Status",
        required=True,
        default="draft",
    )

    file_extensions = fields.Char(
        string="File Extensions",
        help="Comma-separated list of supported file extensions, for example: .rsl,.asl",
    )

    grammar_reference = fields.Char(
        string="Grammar Reference",
        help="URL or reference to the grammar definition of this DSL.",
    )

    parser_validator_reference = fields.Char(
        string="Parser or Validator Reference",
        help="URL or reference to an external parser or validator service.",
    )

    documentation_url = fields.Char(
        string="Documentation URL",
    )

    notes = fields.Text(
        string="Internal Notes",
    )

    maintainer_ids = fields.Many2many(
        "res.users",
        string="Maintainers",
        help="Users responsible for this DSL's metadata and documentation. "
             "Maintainership does not by itself grant write access.",
    )

    active = fields.Boolean(
        string="Active",
        default=True,
    )

    _unique_acronym_version = models.Constraint(
        "unique(acronym, version)",
        "A DSL with this acronym and version already exists.",
    )
