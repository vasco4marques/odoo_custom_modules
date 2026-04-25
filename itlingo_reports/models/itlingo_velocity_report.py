from odoo import fields, models, tools


class ItlingoVelocityReport(models.Model):
    _name = 'itlingo.velocity.report'
    _description = 'Sprint Velocity Analysis'
    _auto = False
    _order = 'project_id, sprint_sequence'

    sprint_id = fields.Many2one('itlingo.sprint', readonly=True)
    project_id = fields.Many2one('project.project', readonly=True)
    sprint_name = fields.Char(readonly=True)
    sprint_sequence = fields.Integer(readonly=True)
    sprint_state = fields.Char(readonly=True)
    planned_points = fields.Float(readonly=True)
    completed_points = fields.Float(readonly=True)
    velocity_pct = fields.Float(string='Velocity %', readonly=True)
    sprint_duration_days = fields.Integer(readonly=True)

    def init(self):
        tools.drop_view_if_exists(self.env.cr, self._table)
        self.env.cr.execute("""
            CREATE OR REPLACE VIEW %s AS (
                SELECT
                    s.id AS id,
                    s.id AS sprint_id,
                    s.project_id AS project_id,
                    s.name AS sprint_name,
                    s.sequence AS sprint_sequence,
                    s.state AS sprint_state,
                    COALESCE(SUM(bi.story_points), 0) AS planned_points,
                    COALESCE(SUM(
                        CASE WHEN bi.status = 'done' THEN bi.story_points ELSE 0 END
                    ), 0) AS completed_points,
                    CASE
                        WHEN COALESCE(SUM(bi.story_points), 0) > 0
                        THEN ROUND((
                            COALESCE(SUM(
                                CASE WHEN bi.status = 'done' THEN bi.story_points ELSE 0 END
                            ), 0) * 100.0 / NULLIF(SUM(bi.story_points), 0)
                        )::numeric, 1)
                        ELSE 0::numeric
                    END::double precision AS velocity_pct,
                    COALESCE(
                        s.actual_end - s.start_date,
                        s.end_date - s.start_date,
                        0
                    )::integer AS sprint_duration_days
                FROM itlingo_sprint s
                LEFT JOIN itlingo_backlog_item bi ON bi.sprint_id = s.id
                WHERE s.state IN ('executing', 'closed')
                GROUP BY s.id, s.project_id, s.name, s.sequence, s.state,
                         s.start_date, s.end_date, s.actual_end
            )
        """ % self._table)
