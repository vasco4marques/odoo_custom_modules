import json
import os
import re

from odoo import _
from odoo.exceptions import MissingError, ValidationError
from odoo.http import request, route
from odoo.modules.module import get_module_path

from .dsl import ITLingoDslPortal

_GRAMMAR_ASSET_DIR = 'static/dist/grammar-editor'
_WORKSPACE_FILE_TYPES = ('grammar', 'services')


class ITLingoDslGrammarPortal(ITLingoDslPortal):
    """Record-scoped grammar editor and persistence API."""

    def _grammar_file_payload(self, grammar, include_id=True):
        payload = {
            'path': grammar.relative_path,
            'content': grammar._read_text_utf8(),
            'isEntry': grammar.is_entry,
            'fileType': grammar.file_type,
        }
        if include_id:
            payload['id'] = grammar.id
        return payload

    def _grammar_files_payload(self, dsl, include_id=True):
        return [
            self._grammar_file_payload(grammar, include_id=include_id)
            for grammar in dsl._grammar_files()
        ]

    def _workspace_files_payload(self, dsl, include_id=True):
        workspace_files = dsl.file_ids.filtered(
            lambda item: item.file_type in _WORKSPACE_FILE_TYPES
        ).sorted(key=lambda item: (item.file_type != 'grammar', item.relative_path, item.id))
        return [
            self._grammar_file_payload(item, include_id=include_id)
            for item in workspace_files
        ]

    def _services_compilation_payload(self, dsl):
        return {
            'result': dsl.services_compile_result or '',
            'diagnostics': list(dsl.services_compile_diagnostics or []),
        }

    def _workspace_file_type(self, file_type):
        file_type = file_type or 'grammar'
        if file_type not in _WORKSPACE_FILE_TYPES:
            raise ValidationError(_('The workspace file type is not supported.'))
        return file_type

    def _grammar_file_or_404(self, dsl, file_id, file_type=None):
        workspace_file = self._dsl_file_or_404(dsl, file_id)
        if workspace_file.file_type not in _WORKSPACE_FILE_TYPES:
            raise MissingError(_('Grammar or services file not found.'))
        if file_type and workspace_file.file_type != self._workspace_file_type(file_type):
            raise MissingError(_('Grammar or services file not found.'))
        return workspace_file

    def _grammar_assets(self):
        """Return the content-hashed editor entry and stylesheet paths."""
        module_path = get_module_path('itlingo_website_portal')
        manifest_path = os.path.join(
            module_path, _GRAMMAR_ASSET_DIR, 'manifest.json',
        )
        try:
            with open(manifest_path, encoding='utf-8') as manifest_file:
                manifest = json.load(manifest_file)
            entry = next(
                asset for asset in manifest.values() if asset.get('isEntry')
            )
            styles = list(entry.get('css', []))
            extracted_style = manifest.get('style.css', {}).get('file')
            if extracted_style and extracted_style not in styles:
                styles.append(extracted_style)
            return {
                'script': entry['file'],
                'styles': styles,
            }
        except (OSError, ValueError, KeyError, StopIteration, TypeError):
            # Keep a useful page in source-only development checkouts. A
            # production build always ships the manifest and hashed assets.
            return {
                'script': 'grammar-editor.js',
                'styles': ['grammar-editor.css'],
            }

    def _default_grammar_filename(self, dsl):
        stem = re.sub(r'[^A-Za-z0-9_-]+', '-', dsl.acronym or '').strip('-_')
        return f'{(stem or "grammar").lower()}.langium'

    def _default_grammar_name(self, dsl):
        """Derive a valid Langium grammar identifier from the DSL acronym."""
        stem = re.sub(r'[^A-Za-z0-9_]+', '', dsl.acronym or '')
        stem = stem.lstrip('0123456789_')
        return stem[:1].upper() + stem[1:] if stem else 'MyDsl'

    def _default_grammar_content(self, dsl, file_type='grammar'):
        """Return starter content for a grammar or services entry file."""
        if file_type == 'services':
            return (
                '/**\n'
                ' * Return a Langium partial module to override this DSL\'s services.\n'
                ' * Dynamic DSLs have no generated AST helpers, so inspect node.$type\n'
                " * (for example, node.$type === 'Model') when matching AST nodes.\n"
                ' */\n'
                'export default function createDslModule() {\n'
                '    return {};\n'
                '}\n'
            )
        self._workspace_file_type(file_type)
        name = self._default_grammar_name(dsl)
        return (
            f'grammar {name}\n'
            '\n'
            'entry Model:\n'
            '    (elements+=Element)*;\n'
            '\n'
            'Element:\n'
            "    'element' name=ID;\n"
            '\n'
            'hidden terminal WS: /\\s+/;\n'
            'terminal ID: /[_a-zA-Z][\\w_]*/;\n'
            '\n'
            'hidden terminal ML_COMMENT: /\\/\\*[\\s\\S]*?\\*\\//;\n'
            'hidden terminal SL_COMMENT: /\\/\\/[^\\n\\r]*/;\n'
        )

    @route('/dsl/<int:dsl_id>/grammar', type='http', auth='user', website=True)
    def portal_dsl_grammar_editor(self, dsl_id, **kw):
        dsl = self._dsl_or_404(dsl_id)
        self._require_dsl_files(dsl)
        values = self._prepare_portal_layout_values()
        values.update({
            'dsl': dsl,
            'page_name': 'dsl_grammar_editor',
            'can_edit_grammar': self._can_edit_dsl(dsl) and dsl.status == 'draft',
            'grammar_assets': self._grammar_assets(),
        })
        return request.render(
            'itlingo_website_portal.portal_dsl_grammar_editor', values,
        )

    @route(
        '/dsl/<int:dsl_id>/grammar/load',
        type='jsonrpc', auth='user', website=True,
    )
    def portal_dsl_grammar_load(self, dsl_id, **kw):
        dsl = self._dsl_or_404(dsl_id)
        self._require_dsl_files(dsl)
        return {
            'dsl': {
                'id': dsl.id,
                'acronym': dsl.acronym,
                'version': dsl.version,
                'status': dsl.status,
            },
            'permissions': {
                'canRead': True,
                'canEdit': self._can_edit_dsl(dsl) and dsl.status == 'draft',
            },
            'files': self._workspace_files_payload(dsl),
            'suggestedPath': self._default_grammar_filename(dsl),
            'suggestedContent': self._default_grammar_content(dsl),
            'suggestedServicesPath': 'services.ts',
            'suggestedServicesContent': self._default_grammar_content(
                dsl, file_type='services',
            ),
            'servicesCompilation': self._services_compilation_payload(dsl),
        }

    @route(
        '/dsl/<int:dsl_id>/grammar/save',
        type='jsonrpc', auth='user', website=True,
    )
    def portal_dsl_grammar_save(
        self, dsl_id, content, path, file_id=None, file_type=None, **kw,
    ):
        dsl = self._dsl_or_404(dsl_id)
        self._require_grammar_edit(dsl)
        File = request.env['itlingo.dsl.file'].sudo()

        if file_id:
            grammar = self._grammar_file_or_404(dsl, file_id, file_type=file_type)
            normalized_path = File._normalize_grammar_path(
                path, file_type=grammar.file_type,
            )
            if normalized_path != grammar.relative_path:
                raise ValidationError(_(
                    'Saving a workspace file cannot rename it. Use the rename action.',
                ))
            grammar._write_text_utf8(content)
        else:
            file_type = self._workspace_file_type(file_type)
            normalized_path = File._normalize_grammar_path(path, file_type=file_type)
            create_text = (
                File._create_services_text
                if file_type == 'services' else File._create_grammar_text
            )
            existing = (
                dsl._services_files() if file_type == 'services'
                else dsl._grammar_files()
            )
            grammar = create_text(
                dsl, normalized_path, content, is_entry=not bool(existing),
            )

        return {
            **self._grammar_file_payload(grammar),
            'servicesCompilation': self._services_compilation_payload(dsl),
        }

    @route(
        '/dsl/<int:dsl_id>/grammar/file/create',
        type='jsonrpc', auth='user', website=True,
    )
    def portal_dsl_grammar_file_create(
        self, dsl_id, path, content='', file_type='grammar', **kw,
    ):
        dsl = self._dsl_or_404(dsl_id)
        self._require_grammar_edit(dsl)
        File = request.env['itlingo.dsl.file'].sudo()
        file_type = self._workspace_file_type(file_type)
        normalized_path = File._normalize_grammar_path(path, file_type=file_type)
        create_text = (
            File._create_services_text
            if file_type == 'services' else File._create_grammar_text
        )
        existing = (
            dsl._services_files() if file_type == 'services'
            else dsl._grammar_files()
        )
        grammar = create_text(
            dsl, normalized_path, content, is_entry=not bool(existing),
        )
        return {
            **self._grammar_file_payload(grammar),
            'servicesCompilation': self._services_compilation_payload(dsl),
        }

    @route(
        '/dsl/<int:dsl_id>/grammar/file/rename',
        type='jsonrpc', auth='user', website=True,
    )
    def portal_dsl_grammar_file_rename(
        self, dsl_id, file_id, path, file_type=None, **kw,
    ):
        dsl = self._dsl_or_404(dsl_id)
        self._require_grammar_edit(dsl)
        grammar = self._grammar_file_or_404(dsl, file_id, file_type=file_type)
        normalized_path = request.env[
            'itlingo.dsl.file'
        ]._normalize_grammar_path(path, file_type=grammar.file_type)
        grammar.write({'relative_path': normalized_path})
        return {
            **self._grammar_file_payload(grammar),
            'servicesCompilation': self._services_compilation_payload(dsl),
        }

    @route(
        '/dsl/<int:dsl_id>/grammar/file/delete',
        type='jsonrpc', auth='user', website=True,
    )
    def portal_dsl_grammar_file_delete(
        self, dsl_id, file_id, file_type=None, **kw,
    ):
        dsl = self._dsl_or_404(dsl_id)
        self._require_grammar_edit(dsl)
        grammar = self._grammar_file_or_404(dsl, file_id, file_type=file_type)
        grammar.unlink()
        return {
            'id': file_id,
            'deleted': True,
            'servicesCompilation': self._services_compilation_payload(dsl),
        }

    @route(
        '/dsl/<int:dsl_id>/grammar/file/set-entry',
        type='jsonrpc', auth='user', website=True,
    )
    def portal_dsl_grammar_file_set_entry(
        self, dsl_id, file_id, file_type=None, **kw,
    ):
        dsl = self._dsl_or_404(dsl_id)
        self._require_grammar_edit(dsl)
        grammar = self._grammar_file_or_404(dsl, file_id, file_type=file_type)
        grammars = (
            dsl._services_files() if grammar.file_type == 'services'
            else dsl._grammar_files()
        )

        # Flip the complete workspace in one statement so the one-entry
        # invariant never observes a transient zero-entry or two-entry state.
        request.env.cr.execute(
            'UPDATE itlingo_dsl_file '
            'SET is_entry = (id = %s) '
            'WHERE id IN %s',
            (grammar.id, tuple(grammars.ids)),
        )
        grammars.invalidate_recordset(['is_entry'])
        grammars.modified(['is_entry'])
        dsl._check_grammar_files()
        dsl._sync_kb_files()
        if grammar.file_type == 'services':
            dsl._run_services_compilation()
        return {
            'files': [self._grammar_file_payload(item) for item in grammars],
            'servicesCompilation': self._services_compilation_payload(dsl),
        }

    @route(
        '/dsl/<int:dsl_id>/grammar/export',
        type='jsonrpc', auth='user', website=True,
    )
    def portal_dsl_grammar_export(self, dsl_id, **kw):
        dsl = self._dsl_or_404(dsl_id)
        self._require_dsl_files(dsl)
        return {'files': self._workspace_files_payload(dsl, include_id=False)}

    @route(
        '/dsl/<int:dsl_id>/grammar/import',
        type='jsonrpc', auth='user', website=True,
    )
    def portal_dsl_grammar_import(self, dsl_id, files, **kw):
        dsl = self._dsl_or_404(dsl_id)
        self._require_grammar_edit(dsl)
        File = request.env['itlingo.dsl.file'].sudo()
        if not isinstance(files, list):
            raise ValidationError(_('Grammar workspace files must be a list.'))

        prepared = []
        paths = {}
        entry_counts = {file_type: 0 for file_type in _WORKSPACE_FILE_TYPES}
        for item in files:
            if not isinstance(item, dict):
                raise ValidationError(_(
                    'Every grammar workspace file must be an object.',
                ))
            file_type = self._workspace_file_type(item.get('fileType'))
            path = File._normalize_grammar_path(
                item.get('path'), file_type=file_type,
            )
            folded_path = (file_type, path.casefold())
            if folded_path in paths:
                raise ValidationError(_(
                    "Grammar paths must be unique, ignoring case ('%(first)s' "
                    "and '%(second)s').",
                    first=paths[folded_path], second=path,
                ))
            paths[folded_path] = path
            content = item.get('content')
            File._validate_text_content(content, file_type=file_type)
            is_entry = item.get('isEntry')
            if not isinstance(is_entry, bool):
                raise ValidationError(_(
                    "The 'isEntry' value of every grammar file must be boolean.",
                ))
            entry_counts[file_type] += int(is_entry)
            prepared.append({
                'path': path,
                'content': content,
                'is_entry': is_entry,
                'file_type': file_type,
            })

        for file_type in _WORKSPACE_FILE_TYPES:
            type_files = [
                item for item in prepared if item['file_type'] == file_type
            ]
            if type_files and entry_counts[file_type] != 1:
                raise ValidationError(_(
                    'A non-empty %(type)s workspace must have exactly one entry file.',
                    type=file_type,
                ))

        # A JSON-RPC request is one database transaction: validation happens
        # before replacement, and any create failure rolls the unlink back.
        structural_files = dsl.file_ids.filtered(
            lambda item: item.file_type in _WORKSPACE_FILE_TYPES
        )
        structural_files.with_context(skip_services_compile=True).unlink()
        File = File.with_context(skip_services_compile=True)
        for item in sorted(
            prepared,
            key=lambda value: (
                value['file_type'] != 'grammar',
                not value['is_entry'],
                value['path'],
            ),
        ):
            create_text = (
                File._create_services_text
                if item['file_type'] == 'services' else File._create_grammar_text
            )
            create_text(
                dsl, item['path'], item['content'], is_entry=item['is_entry'],
            )
        dsl._run_services_compilation()
        return {
            'files': self._workspace_files_payload(dsl),
            'servicesCompilation': self._services_compilation_payload(dsl),
        }
