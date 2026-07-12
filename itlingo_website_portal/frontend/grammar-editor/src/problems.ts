/**
 * Pure marker-to-problem conversion shared by the Problems panel and the
 * Validate action. Monaco types are kept structural so this module can be
 * unit-tested without loading the editor.
 */

export type ProblemSeverity = 'error' | 'warning' | 'info' | 'hint';

/** Monaco MarkerSeverity constants, without importing the editor API. */
const MARKER_SEVERITY_ERROR = 8;
const MARKER_SEVERITY_WARNING = 4;
const MARKER_SEVERITY_INFO = 2;

export interface MarkerLike {
    severity: number;
    message: string;
    startLineNumber: number;
    startColumn: number;
    endLineNumber: number;
    endColumn: number;
    source?: string;
    code?: string | {value: string};
}

export interface ProblemItem {
    severity: ProblemSeverity;
    message: string;
    startLineNumber: number;
    startColumn: number;
    endLineNumber: number;
    endColumn: number;
    source: string;
    code: string;
}

export interface ProblemCounts {
    errors: number;
    warnings: number;
    others: number;
    total: number;
}

function toSeverity(severity: number): ProblemSeverity {
    if (severity === MARKER_SEVERITY_ERROR) {
        return 'error';
    }
    if (severity === MARKER_SEVERITY_WARNING) {
        return 'warning';
    }
    if (severity === MARKER_SEVERITY_INFO) {
        return 'info';
    }
    return 'hint';
}

const SEVERITY_ORDER: Record<ProblemSeverity, number> = {
    error: 0,
    warning: 1,
    info: 2,
    hint: 3,
};

export function toProblemItems(markers: readonly MarkerLike[]): ProblemItem[] {
    return markers
        .map((marker) => ({
            severity: toSeverity(marker.severity),
            message: marker.message,
            startLineNumber: marker.startLineNumber,
            startColumn: marker.startColumn,
            endLineNumber: marker.endLineNumber,
            endColumn: marker.endColumn,
            source: marker.source || '',
            code: typeof marker.code === 'object'
                ? marker.code?.value || ''
                : marker.code || '',
        }))
        .sort((left, right) => (
            SEVERITY_ORDER[left.severity] - SEVERITY_ORDER[right.severity]
            || left.startLineNumber - right.startLineNumber
            || left.startColumn - right.startColumn
            || left.message.localeCompare(right.message)
        ));
}

export function countProblems(problems: readonly ProblemItem[]): ProblemCounts {
    const errors = problems.filter((problem) => problem.severity === 'error').length;
    const warnings = problems.filter((problem) => problem.severity === 'warning').length;
    return {
        errors,
        warnings,
        others: problems.length - errors - warnings,
        total: problems.length,
    };
}

export function summarizeProblems(counts: ProblemCounts): string {
    if (counts.total === 0) {
        return 'No problems';
    }
    const parts: string[] = [];
    if (counts.errors) {
        parts.push(`${counts.errors} ${counts.errors === 1 ? 'error' : 'errors'}`);
    }
    if (counts.warnings) {
        parts.push(`${counts.warnings} ${counts.warnings === 1 ? 'warning' : 'warnings'}`);
    }
    if (counts.others) {
        parts.push(`${counts.others} ${counts.others === 1 ? 'hint' : 'hints'}`);
    }
    return parts.join(', ');
}

/**
 * Waits until `lastActivityAt()` has been quiet for `quietMs`, giving document
 * synchronization and the language server time to publish diagnostics for the
 * current content. Resolves `true` when quiet, `false` on timeout.
 */
export async function waitForDiagnosticsQuiet(
    lastActivityAt: () => number,
    options: {quietMs: number; timeoutMs: number},
    now: () => number = Date.now,
    sleep: (ms: number) => Promise<void> = (ms) => new Promise(
        (resolve) => setTimeout(resolve, ms),
    ),
): Promise<boolean> {
    const deadline = now() + options.timeoutMs;
    for (;;) {
        const quietFor = now() - lastActivityAt();
        if (quietFor >= options.quietMs) {
            return true;
        }
        if (now() >= deadline) {
            return false;
        }
        await sleep(Math.max(25, options.quietMs - quietFor));
    }
}
