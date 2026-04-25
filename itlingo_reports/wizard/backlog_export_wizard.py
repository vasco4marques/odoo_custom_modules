import base64
import io

from odoo import fields, models

try:
    from openpyxl import Workbook
except ImportError:
    Workbook = None


class BacklogExportWizard(models.TransientModel):
    _name = 'itlingo.backlog.export.wizard'
    _description = 'Export Backlog to Excel'

    project_id = fields.Many2one(
        'project.project', required=True, string='Project',
    )
    sprint_id = fields.Many2one(
        'itlingo.sprint', string='Sprint (optional)',
        domain="[('project_id', '=', project_id)]",
    )
    export_file = fields.Binary(string='Download', readonly=True)
    export_filename = fields.Char()

    def action_export(self):
        self.ensure_one()
        if Workbook is None:
            raise models.UserError("openpyxl is required for Excel export.")

        domain = [('project_id', '=', self.project_id.id)]
        if self.sprint_id:
            domain.append(('sprint_id', '=', self.sprint_id.id))

        items = self.env['itlingo.backlog.item'].search(domain)
        wb = Workbook()
        ws = wb.active
        ws.title = 'Backlog'

        headers = [
            'Identifier', 'Name', 'Type', 'Story Points',
            'Priority', 'Status', 'Sprint', 'Description',
        ]
        ws.append(headers)

        for item in items:
            ws.append([
                item.identifier or '',
                item.name,
                item.item_type or '',
                item.story_points or 0,
                item.priority or '',
                item.status or '',
                item.sprint_id.name or '',
                item.description or '',
            ])

        fp = io.BytesIO()
        wb.save(fp)
        fp.seek(0)

        filename = 'backlog_%s.xlsx' % self.project_id.name.replace(' ', '_')
        self.write({
            'export_file': base64.b64encode(fp.read()),
            'export_filename': filename,
        })

        return {
            'type': 'ir.actions.act_window',
            'res_model': self._name,
            'res_id': self.id,
            'view_mode': 'form',
            'target': 'new',
        }
