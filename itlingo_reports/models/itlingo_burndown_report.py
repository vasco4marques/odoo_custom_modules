from odoo import fields, models, tools


class ItlingoBurndownReport(models.Model):
    _name = 'itlingo.burndown.report'
    _description = 'Sprint Burndown Analysis'
    _auto = False
    _order = 'sprint_id, day'

    sprint_id = fields.Many2one('itlingo.sprint', readonly=True)
    project_id = fields.Many2one('project.project', readonly=True)
    day = fields.Date(readonly=True)
    total_story_points = fields.Float(readonly=True)
    completed_story_points = fields.Float(readonly=True)
    remaining_story_points = fields.Float(readonly=True)
    task_count = fields.Integer(readonly=True)
    completed_task_count = fields.Integer(readonly=True)

    def init(self):
        tools.drop_view_if_exists(self.env.cr, self._table)
        self.env.cr.execute("""
            CREATE OR REPLACE VIEW %s AS (
                SELECT
                    ROW_NUMBER() OVER () AS id,
                    s.id AS sprint_id,
                    s.project_id AS project_id,
                    d.day::date AS day,
                    COALESCE(SUM(bi.story_points), 0) AS total_story_points,
                    COALESCE(SUM(
                        CASE WHEN bi.status = 'done' THEN bi.story_points ELSE 0 END
                    ), 0) AS completed_story_points,
                    COALESCE(SUM(bi.story_points), 0) - COALESCE(SUM(
                        CASE WHEN bi.status = 'done' THEN bi.story_points ELSE 0 END
                    ), 0) AS remaining_story_points,
                    COUNT(DISTINCT t.id) AS task_count,
                    COUNT(DISTINCT CASE WHEN t.stage_id IN (
                        SELECT ts.id FROM project_task_type ts
                        WHERE ts.fold = true
                    ) THEN t.id END) AS completed_task_count
                FROM itlingo_sprint s
                CROSS JOIN generate_series(
                    s.start_date::timestamp,
                    COALESCE(s.actual_end, s.end_date, CURRENT_DATE)::timestamp,
                    '1 day'::interval
                ) AS d(day)
                LEFT JOIN itlingo_backlog_item bi
                    ON bi.sprint_id = s.id
                LEFT JOIN project_task t
                    ON t.backlog_item_id = bi.id
                WHERE s.state IN ('executing', 'closed')
                GROUP BY s.id, s.project_id, d.day
            )
        """ % self._table)
