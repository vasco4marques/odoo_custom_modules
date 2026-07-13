export interface VersionedTextModel {
    getAlternativeVersionId(): number;
}

export interface WorkspaceFile<TModel extends VersionedTextModel = VersionedTextModel> {
    id?: number;
    path: string;
    isEntry: boolean;
    model: TModel;
    savedVersionId: number;
    dirty: boolean;
}

/**
 * Build a stable file URI while preserving the grammar workspace's directory
 * structure. Encoding each segment separately is important: encoding the whole
 * path would turn `/` into `%2F` and break relative Langium imports.
 */
export function buildFileUri(dslId: number, path: string): string {
    const encodedPath = path.split('/').map((segment) => encodeURIComponent(segment)).join('/');
    return `file:///itlingo-dsl/${dslId}/${encodedPath}`;
}

export function validateGrammarPath(value: string): string {
    const path = value.trim();
    const segments = path.split('/');
    if (!path || path.includes('\0') || path.includes('\\') || path.startsWith('/')) {
        throw new Error('Use a non-empty relative path with forward slashes.');
    }
    if (segments.some((segment) => !segment || segment === '.' || segment === '..')) {
        throw new Error("Grammar paths cannot contain empty, '.' or '..' segments.");
    }
    if (!path.endsWith('.langium')) {
        throw new Error('Grammar paths must end in .langium.');
    }
    return path;
}

/** Small registry shared by editor switching, save state, and file actions. */
export class WorkspaceFileRegistry<
    TModel extends VersionedTextModel = VersionedTextModel,
> {
    readonly files = new Map<string, WorkspaceFile<TModel>>();

    add(file: WorkspaceFile<TModel>): WorkspaceFile<TModel> {
        if (this.files.has(file.path)) {
            throw new Error(`The grammar workspace already contains '${file.path}'.`);
        }
        this.files.set(file.path, file);
        return file;
    }

    get(path: string): WorkspaceFile<TModel> | undefined {
        return this.files.get(path);
    }

    sorted(): WorkspaceFile<TModel>[] {
        return [...this.files.values()].sort((left, right) => (
            left.path.localeCompare(right.path)
        ));
    }

    refreshDirty(path: string): boolean {
        const file = this.required(path);
        file.dirty = file.model.getAlternativeVersionId() !== file.savedVersionId;
        return file.dirty;
    }

    markSaved(path: string, versionId?: number): void {
        const file = this.required(path);
        file.savedVersionId = versionId ?? file.model.getAlternativeVersionId();
        this.refreshDirty(path);
    }

    hasDirty(): boolean {
        return [...this.files.values()].some((file) => file.dirty);
    }

    rename(oldPath: string, newPath: string, model: TModel): WorkspaceFile<TModel> {
        const oldFile = this.required(oldPath);
        if (oldPath !== newPath && this.files.has(newPath)) {
            throw new Error(`The grammar workspace already contains '${newPath}'.`);
        }
        this.files.delete(oldPath);
        const version = model.getAlternativeVersionId();
        const renamed: WorkspaceFile<TModel> = {
            ...oldFile,
            path: newPath,
            model,
            savedVersionId: oldFile.dirty ? version - 1 : version,
            dirty: oldFile.dirty,
        };
        this.files.set(newPath, renamed);
        return renamed;
    }

    delete(path: string): WorkspaceFile<TModel> {
        const file = this.required(path);
        this.files.delete(path);
        return file;
    }

    private required(path: string): WorkspaceFile<TModel> {
        const file = this.files.get(path);
        if (!file) {
            throw new Error(`Grammar file '${path}' is not registered.`);
        }
        return file;
    }
}
