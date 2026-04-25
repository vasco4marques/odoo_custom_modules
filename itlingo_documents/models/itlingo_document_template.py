from odoo import fields, models


class ItlingoDocumentTemplate(models.Model):
    _name = 'itlingo.document.template'
    _description = 'ITLingo Document Template'
    _order = 'name'

    name = fields.Char(required=True)
    description = fields.Text()
    active = fields.Boolean(default=True)
