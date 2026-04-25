/** Workspace dashboard charts (Chart.js). Expects #itlingo-ws-chart-json with portal payload. */
(function () {
    function boot() {
        var script = document.getElementById('itlingo-ws-chart-json');
        if (!script || !script.textContent || typeof Chart === 'undefined') {
            return;
        }
        var data;
        try {
            data = JSON.parse(script.textContent.trim());
        } catch (e) {
            return;
        }
        var pid = data.projectId;
        if (!pid) {
            return;
        }

        var bd = document.getElementById('chart_burndown_' + pid);
        if (
            bd &&
            data.burndown &&
            data.burndown.labels &&
            data.burndown.labels.length
        ) {
            new Chart(bd, {
                type: 'line',
                data: {
                    labels: data.burndown.labels,
                    datasets: [
                        {
                            label: 'Burndown',
                            data: data.burndown.remaining,
                            borderColor: '#dc3545',
                            tension: 0.15,
                        },
                        {
                            label: 'Ideal',
                            data: data.burndown.ideal,
                            borderColor: '#0d6efd',
                            borderDash: [5, 5],
                            tension: 0.15,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    scales: { y: { beginAtZero: true } },
                },
            });
        }

        var bu = document.getElementById('chart_burnup_' + pid);
        if (
            bu &&
            data.burnup &&
            data.burnup.labels &&
            data.burnup.labels.length
        ) {
            new Chart(bu, {
                type: 'line',
                data: {
                    labels: data.burnup.labels,
                    datasets: [
                        {
                            label: 'Burnup',
                            data: data.burnup.values,
                            borderColor: '#198754',
                            tension: 0.15,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    scales: { y: { beginAtZero: true } },
                },
            });
        }

        var ts = document.getElementById('chart_tasks_' + pid);
        if (
            ts &&
            data.tasksBySprint &&
            data.tasksBySprint.labels &&
            data.tasksBySprint.labels.length
        ) {
            new Chart(ts, {
                type: 'bar',
                data: {
                    labels: data.tasksBySprint.labels,
                    datasets: [
                        {
                            label: 'Tasks',
                            data: data.tasksBySprint.counts,
                            backgroundColor: '#6c757d',
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    scales: { y: { beginAtZero: true } },
                },
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }
})();
