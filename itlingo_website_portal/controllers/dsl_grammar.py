import os
import re

from odoo import _
from odoo.exceptions import MissingError, ValidationError
from odoo.http import request, route
from odoo.modules.module import get_module_path

from .dsl import ITLingoDslPortal

_GRAMMAR_ASSET_DIR = 'static/dist/grammar-editor'


class ITLingoDslGrammarPortal(ITLingoDslPortal):
    """Record-scoped grammar editor and persistence API."""

    def _grammar_file_payload(self, grammar, include_id=True):
        payload = {
            'path': grammar.relative_path,
            'content': grammar._read_text_utf8(),
            'isEntry': grammar.is_entry,
        }
        if include_id:
            payload['id'] = grammar.id
        return payload

    def _grammar_files_payload(self, dsl, include_id=True):
        return [
            self._grammar_file_payload(grammar, include_id=include_id)
            for grammar in dsl._grammar_files()
        ]

    def _grammar_file_or_404(self, dsl, file_id):
        grammar = self._dsl_file_or_404(dsl, file_id)
        if grammar.file_type != 'grammar':
            raise MissingError(_('Grammar file not found.'))
        return grammar

    def _grammar_asset_version(self):
        """Return a cache-busting token that changes on every editor rebuild.

        The built bundle is served from a fixed, unversioned URL with a long
        max-age, so browsers keep a stale copy after a rebuild. Deriving the
        token from the built file's size and mtime forces a fresh download
        whenever the assets are regenerated, without breaking the bundle's
        sibling-chunk imports (which a relocating Odoo asset bundle would).
        """
        module_path = get_module_path('itlingo_website_portal')
        entry = os.path.join(module_path, _GRAMMAR_ASSET_DIR, 'grammar-editor.js')
        try:
            stat = os.stat(entry)
        except OSError:
            return '0'
        return f'{int(stat.st_mtime)}-{stat.st_size}'

    def _default_grammar_filename(self, dsl):
        stem = re.sub(r'[^A-Za-z0-9_-]+', '-', dsl.acronym or '').strip('-_')
        return f'{(stem or "grammar").lower()}.langium'

    def _default_grammar_name(self, dsl):
        """Derive a valid Langium grammar identifier from the DSL acronym."""
        stem = re.sub(r'[^A-Za-z0-9_]+', '', dsl.acronym or '')
        stem = stem.lstrip('0123456789_')
        return stem[:1].upper() + stem[1:] if stem else 'MyDsl'

    def _default_grammar_content(self, dsl):
        """Minimal starter grammar accepted by the pinned Langium version."""
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
            'grammar_asset_version': self._grammar_asset_version(),
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
            'files': self._grammar_files_payload(dsl),
            'suggestedPath': self._default_grammar_filename(dsl),
            'suggestedContent': self._default_grammar_content(dsl),
        }

    @route(
        '/dsl/<int:dsl_id>/grammar/save',
        type='jsonrpc', auth='user', website=True,
    )
    def portal_dsl_grammar_save(
        self, dsl_id, content, path, file_id=None, **kw,
    ):
        dsl = self._dsl_or_404(dsl_id)
        self._require_grammar_edit(dsl)
        File = request.env['itlingo.dsl.file'].sudo()

        if file_id:
            grammar = self._grammar_file_or_404(dsl, file_id)
            normalized_path = File._normalize_grammar_path(path)
            if normalized_path != grammar.relative_path:
                raise ValidationError(_(
                    'Saving a grammar file cannot rename it. Use the rename action.',
                ))
            grammar._write_text_utf8(content)
        else:
            normalized_path = File._normalize_grammar_path(path)
            grammar = File._create_grammar_text(
                dsl,
                normalized_path,
                content,
                is_entry=not bool(dsl._grammar_files()),
            )

        return self._grammar_file_payload(grammar)

    @route(
        '/dsl/<int:dsl_id>/grammar/file/create',
        type='jsonrpc', auth='user', website=True,
    )
    def portal_dsl_grammar_file_create(
        self, dsl_id, path, content='', **kw,
    ):
        dsl = self._dsl_or_404(dsl_id)
        self._require_grammar_edit(dsl)
        File = request.env['itlingo.dsl.file'].sudo()
        normalized_path = File._normalize_grammar_path(path)
        grammar = File._create_grammar_text(
            dsl,
            normalized_path,
            content,
            is_entry=not bool(dsl._grammar_files()),
        )
        return self._grammar_file_payload(grammar)

    @route(
        '/dsl/<int:dsl_id>/grammar/file/rename',
        type='jsonrpc', auth='user', website=True,
    )
    def portal_dsl_grammar_file_rename(
        self, dsl_id, file_id, path, **kw,
    ):
        dsl = self._dsl_or_404(dsl_id)
        self._require_grammar_edit(dsl)
        grammar = self._grammar_file_or_404(dsl, file_id)
        normalized_path = request.env[
            'itlingo.dsl.file'
        ]._normalize_grammar_path(path)
        grammar.write({'relative_path': normalized_path})
        return self._grammar_file_payload(grammar)

    @route(
        '/dsl/<int:dsl_id>/grammar/file/delete',
        type='jsonrpc', auth='user', website=True,
    )
    def portal_dsl_grammar_file_delete(self, dsl_id, file_id, **kw):
        dsl = self._dsl_or_404(dsl_id)
        self._require_grammar_edit(dsl)
        grammar = self._grammar_file_or_404(dsl, file_id)
        grammar.unlink()
        return {'id': file_id, 'deleted': True}

    @route(
        '/dsl/<int:dsl_id>/grammar/file/set-entry',
        type='jsonrpc', auth='user', website=True,
    )
    def portal_dsl_grammar_file_set_entry(self, dsl_id, file_id, **kw):
        dsl = self._dsl_or_404(dsl_id)
        self._require_grammar_edit(dsl)
        grammar = self._grammar_file_or_404(dsl, file_id)
        grammars = dsl._grammar_files()

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
        return {'files': self._grammar_files_payload(dsl)}

    @route(
        '/dsl/<int:dsl_id>/grammar/export',
        type='jsonrpc', auth='user', website=True,
    )
    def portal_dsl_grammar_export(self, dsl_id, **kw):
        dsl = self._dsl_or_404(dsl_id)
        self._require_dsl_files(dsl)
        return {'files': self._grammar_files_payload(dsl, include_id=False)}

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
        entry_count = 0
        for item in files:
            if not isinstance(item, dict):
                raise ValidationError(_(
                    'Every grammar workspace file must be an object.',
                ))
            path = File._normalize_grammar_path(item.get('path'))
            folded_path = path.casefold()
            if folded_path in paths:
                raise ValidationError(_(
                    "Grammar paths must be unique, ignoring case ('%(first)s' "
                    "and '%(second)s').",
                    first=paths[folded_path], second=path,
                ))
            paths[folded_path] = path
            content = item.get('content')
            File._validate_text_content(content)
            is_entry = item.get('isEntry')
            if not isinstance(is_entry, bool):
                raise ValidationError(_(
                    "The 'isEntry' value of every grammar file must be boolean.",
                ))
            entry_count += int(is_entry)
            prepared.append({
                'path': path,
                'content': content,
                'is_entry': is_entry,
            })

        if prepared and entry_count != 1:
            raise ValidationError(_(
                'A non-empty grammar workspace must have exactly one entry file.',
            ))

        # A JSON-RPC request is one database transaction: validation happens
        # before replacement, and any create failure rolls the unlink back.
        dsl._grammar_files().unlink()
        for item in sorted(
            prepared,
            key=lambda value: (not value['is_entry'], value['path']),
        ):
            File._create_grammar_text(
                dsl,
                item['path'],
                item['content'],
                is_entry=item['is_entry'],
            )
        return {'files': self._grammar_files_payload(dsl)}
