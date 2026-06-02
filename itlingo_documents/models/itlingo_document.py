import base64

from odoo import api, fields, models, _
from odoo.exceptions import ValidationError


class ItlingoDocument(models.Model):
    _name = 'itlingo.document'
    _description = 'ITLingo Document'
    _inherit = ['mail.thread', 'mail.activity.mixin']
    _order = 'creation_date desc, name'

    name = fields.Char(required=True, tracking=True)
    status = fields.Selection([
        ('draft', 'Draft'),
        ('in_review', 'In Review'),
        ('approved', 'Approved'),
        ('published', 'Published'),
        ('archived', 'Archived'),
    ], default='draft', required=True, tracking=True)
    version = fields.Char(default='1.0', tracking=True)
    document_file = fields.Binary(string='File', attachment=True)
    file_name = fields.Char(string='Filename')
    file_size = fields.Integer(
        compute='_compute_file_size', store=True, string='Size (bytes)',
    )

    document_type_id = fields.Many2one(
        'itlingo.document.type', string='Document Type', tracking=True,
    )
    template_id = fields.Many2one(
        'itlingo.document.template', string='Template',
    )
    project_id = fields.Many2one(
        'project.project', string='Project',
        tracking=True,
    )
    organization_id = fields.Many2one(
        'itlingo.organization', string='Organization',
        tracking=True,
    )
    creator_id = fields.Many2one(
        'res.users', string='Creator',
        default=lambda self: self.env.user, readonly=True,
    )
    creation_date = fields.Datetime(
        default=fields.Datetime.now, readonly=True,
    )
    library_ids = fields.One2many(
        'itlingo.document.library', 'document_id', string='Libraries',
    )

    # DSL-specific fields
    grammar_file = fields.Binary(string='Grammar File', attachment=True)
    grammar_file_name = fields.Char(string='Grammar Filename')
    validation_rules_file = fields.Binary(string='Validation Rules File', attachment=True)
    validation_rules_file_name = fields.Char(string='Validation Rules Filename')
    examples_file = fields.Binary(string='Examples File', attachment=True)
    examples_file_name = fields.Char(string='Examples Filename')
    spec_example_file_ids = fields.One2many(
        'itlingo.document.spec.file', 'document_id',
        string='Specification Examples',
    )

    @api.depends('document_file')
    def _compute_file_size(self):
        for doc in self:
            if doc.document_file:
                doc.file_size = len(base64.b64decode(doc.document_file))
            else:
                doc.file_size = 0

    def action_submit_review(self):
        missing_lib = self.filtered(lambda d: not d.library_ids)
        if missing_lib:
            raise ValidationError(
                _('Add at least one library before submitting for review (document: %s).',
                  ', '.join(missing_lib.mapped('name'))),
            )
        self.write({'status': 'in_review'})

    def action_approve(self):
        self.write({'status': 'approved'})

    def action_publish(self):
        self.write({'status': 'published'})

    def action_archive(self):
        self.write({'status': 'archived'})

    def action_reset_draft(self):
        self.write({'status': 'draft'})
