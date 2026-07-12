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

    def _grammar_file(self, dsl):
        return dsl.file_ids.filtered(lambda item: item.file_type == 'grammar')[:1]

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
        grammar = self._grammar_file(dsl)
        files = []
        if grammar:
            files.append({
                'id': grammar.id,
                'path': grammar.file_name,
                'content': grammar._read_text_utf8(),
                'isEntry': True,
            })
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
            'files': files,
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
        File._validate_grammar_filename(path)
        File._validate_text_content(content)

        if file_id:
            grammar = self._dsl_file_or_404(dsl, file_id)
            if grammar.file_type != 'grammar':
                raise MissingError(_('Grammar file not found.'))
            grammar._write_text_utf8(content, path)
        else:
            if self._grammar_file(dsl):
                raise ValidationError(_(
                    'This DSL already has a grammar file. Reload the editor and try again.',
                ))
            grammar = File._create_grammar_text(dsl, path, content)

        return {
            'id': grammar.id,
            'path': grammar.file_name,
            'content': grammar._read_text_utf8(),
            'isEntry': True,
        }
