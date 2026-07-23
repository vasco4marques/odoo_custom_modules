from odoo import _, api, fields, models
from odoo.exceptions import AccessError


class ItlingoDslServicesAudit(models.Model):
    _name = "itlingo.dsl.services.audit"
    _description = "ITLingo DSL Services Edit Audit"
    _order = "event_time desc, id desc"

    dsl_id = fields.Many2one(
        "itlingo.dsl",
        required=True,
        index=True,
        ondelete="cascade",
    )
    file_record_id = fields.Integer(
        string="File Record ID",
        readonly=True,
        help="Original itlingo.dsl.file ID, retained even after deletion.",
    )
    operation = fields.Selection(
        selection=[
            ("create", "Created"),
            ("update", "Updated"),
            ("delete", "Deleted"),
        ],
        required=True,
        readonly=True,
    )
    relative_path = fields.Char(required=True, readonly=True)
    source_digest = fields.Char(
        string="Resulting Workspace Digest",
        readonly=True,
        help="SHA-256 of the complete services source workspace after this edit.",
    )
    actor_id = fields.Many2one(
        "res.users",
        required=True,
        readonly=True,
        ondelete="restrict",
    )
    event_time = fields.Datetime(
        required=True,
        readonly=True,
        default=fields.Datetime.now,
    )

    @api.model_create_multi
    def create(self, vals_list):
        if not self.env.context.get("allow_services_audit_create"):
            raise AccessError(_("Services audit rows can only be created internally."))
        return super().create(vals_list)

    def write(self, _vals):
        raise AccessError(_("Services audit rows are immutable."))

    def unlink(self):
        raise AccessError(_("Services audit rows are immutable."))
