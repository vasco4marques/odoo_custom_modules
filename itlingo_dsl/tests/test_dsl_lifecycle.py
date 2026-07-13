import json
from unittest.mock import patch

from odoo.exceptions import UserError, ValidationError
from odoo.tests import TransactionCase, tagged

from ..services.grammar_flattener import GrammarFlattenError

VALID_GRAMMAR = (
    "grammar {name}\n"
    "entry Model: 'model' name=ID;\n"
    "hidden terminal WS: /\\s+/;\n"
    "terminal ID: /[_a-zA-Z][\\w_]*/;\n"
)

INVALID_GRAMMAR = (
    "grammar {name}\n"
    "entry Model: value=MissingRule;\n"
)


@tagged('post_install', '-at_install')
class TestDslLifecycle(TransactionCase):
    """Draft, validation, and publication lifecycle (Phase 5)."""

    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.File = cls.env['itlingo.dsl.file']

    def _make_draft(self, acronym, grammar=VALID_GRAMMAR, version='test-1'):
        dsl = self.env['itlingo.dsl'].create({
            'name': f'Lifecycle {acronym}',
            'acronym': acronym,
            'version': version,
            'status': 'draft',
        })
        if grammar:
            self.File._create_grammar_text(
                dsl, f'{acronym.lower()}.langium',
                grammar.format(name=acronym),
            )
        return dsl

    def test_publish_valid_draft_records_audit_trail(self):
        dsl = self._make_draft('LCPUB')
        dsl.action_publish()

        self.assertEqual(dsl.status, 'active')
        self.assertEqual(dsl.grammar_validation_result, 'valid')
        self.assertTrue(dsl.grammar_validation_is_current)
        self.assertEqual(dsl.grammar_validation_digest, dsl._grammar_digest())
        self.assertIn('langium', dsl.grammar_validator_version)
        self.assertTrue(dsl.grammar_validation_time)
        self.assertEqual(dsl.published_by_id, self.env.user)
        self.assertTrue(dsl.published_at)
        self.assertEqual(dsl.published_digest, dsl.grammar_validation_digest)

    def test_publish_invalid_grammar_is_rejected(self):
        dsl = self._make_draft('LCBAD', grammar=INVALID_GRAMMAR)
        with self.assertRaisesRegex(ValidationError, 'MissingRule'):
            dsl.action_publish()

        self.assertEqual(dsl.status, 'draft')

    def test_direct_activation_without_validation_is_rejected(self):
        dsl = self._make_draft('LCRAW')
        with self.assertRaisesRegex(ValidationError, 'has not been validated'):
            dsl.status = 'active'
        self.assertEqual(dsl.status, 'draft')

    def test_stale_validation_is_rejected(self):
        dsl = self._make_draft('LCSTALE')
        dsl._run_grammar_validation()
        self.assertEqual(dsl.grammar_validation_result, 'valid')
        self.assertTrue(dsl.grammar_validation_is_current)

        dsl._grammar_file()._write_text_utf8(
            VALID_GRAMMAR.format(name='LCSTALE') + '// changed\n',
        )
        self.assertFalse(dsl.grammar_validation_is_current)
        with self.assertRaisesRegex(ValidationError, 'changed after'):
            dsl.status = 'active'

    def test_publication_requires_working_validator(self):
        dsl = self._make_draft('LCNODE')
        self.env['ir.config_parameter'].sudo().set_param(
            'itlingo_dsl.node_path', '/nonexistent/node-binary',
        )
        with self.assertRaisesRegex(UserError, 'unavailable'):
            dsl.action_publish()
        self.assertEqual(dsl.status, 'draft')

    def test_validation_diagnostics_are_stored_as_json(self):
        dsl = self._make_draft('LCDIAG', grammar=INVALID_GRAMMAR)
        with self.assertRaises(ValidationError):
            dsl.action_publish()
        # Whether the failed attempt's metadata persisted depends on the
        # caller's rollback; validate explicitly to inspect it deterministically.
        dsl._run_grammar_validation()

        self.assertEqual(dsl.grammar_validation_result, 'invalid')
        diagnostics = json.loads(dsl.grammar_validation_diagnostics)
        self.assertTrue(any(
            d['severity'] == 'error' and 'MissingRule' in d['message']
            for d in diagnostics
        ))
        self.assertTrue(all(
            {'severity', 'message', 'line', 'column'} <= set(d)
            for d in diagnostics
        ))

    def test_dsl_without_grammar_can_activate_directly(self):
        dsl = self._make_draft('LCMETA', grammar=None)
        dsl.status = 'active'
        self.assertEqual(dsl.status, 'active')

    def test_create_draft_version_copies_without_modifying_source(self):
        dsl = self._make_draft('LCCOPY')
        self.File.create({
            'dsl_id': dsl.id,
            'file_type': 'examples',
            'file_name': 'example.txt',
            'file': b'ZXhhbXBsZQ==',
        })
        dsl.action_publish()
        source_digest = dsl._grammar_digest()

        draft = dsl.action_create_draft_version()

        self.assertEqual(draft.status, 'draft')
        self.assertEqual(draft.acronym, dsl.acronym)
        self.assertNotEqual(draft.version, dsl.version)
        self.assertEqual(
            sorted(draft.file_ids.mapped('file_name')),
            sorted(dsl.file_ids.mapped('file_name')),
        )
        self.assertEqual(draft._grammar_digest(), source_digest)
        # Validation and publication audit fields never travel to the copy.
        self.assertFalse(draft.grammar_validation_result)
        self.assertFalse(draft.published_at)
        # The source version is untouched.
        self.assertEqual(dsl.status, 'active')
        self.assertEqual(dsl._grammar_digest(), source_digest)

    def test_suggest_next_version_bumps_and_avoids_duplicates(self):
        dsl = self._make_draft('LCVER', grammar=None, version='1.0')
        self.assertEqual(dsl._suggest_next_version(), '1.1')
        self.env['itlingo.dsl'].create({
            'name': 'Lifecycle LCVER taken',
            'acronym': 'LCVER',
            'version': '1.1',
        })
        self.assertEqual(dsl._suggest_next_version(), '1.2')

    def test_publish_deprecates_previous_active_and_supports_rollback(self):
        v1 = self._make_draft('LCROLL', version='test-1')
        v1.action_publish()

        v2 = v1.action_create_draft_version()
        v2._grammar_file()._write_text_utf8(
            VALID_GRAMMAR.format(name='LCROLL') + '// v2\n',
        )
        v2.action_publish()

        self.assertEqual(v2.status, 'active')
        self.assertEqual(v1.status, 'deprecated')

        # Rollback: the prior version is still there and can be reactivated
        # through the same validated publication path.
        v1.action_publish()
        self.assertEqual(v1.status, 'active')
        self.assertEqual(v2.status, 'deprecated')
        self.assertEqual(v1._grammar_digest(), v1.published_digest)


@tagged('post_install', '-at_install')
class TestDslLifecycleKbSync(TransactionCase):
    """KB projection follows publication, never draft edits (Phase 5.6)."""

    def setUp(self):
        super().setUp()
        self.KbFile = self.env.get('itlingo.kb.file')
        if self.KbFile is None:
            self.skipTest('itlingo_chatbot_integration is not installed')
        self.File = self.env['itlingo.dsl.file']

    def _kb_grammar_content(self, acronym):
        kb_file = self._kb_grammar_file(acronym)
        return kb_file.content if kb_file else None

    def _kb_grammar_file(self, acronym):
        lang = self.env['itlingo.kb.language'].sudo().search(
            [('name', '=', acronym)], limit=1,
        )
        if not lang:
            return self.KbFile.browse()
        return self.KbFile.sudo().search([
            ('language_id', '=', lang.id), ('file_type', '=', 'grammar'),
        ], limit=1)

    def test_kb_changes_only_on_publication(self):
        acronym = 'LCKB'
        content_v1 = VALID_GRAMMAR.format(name=acronym)
        v1 = self.env['itlingo.dsl'].create({
            'name': 'Lifecycle KB',
            'acronym': acronym,
            'version': 'test-1',
            'status': 'draft',
        })
        self.File._create_grammar_text(v1, 'lckb.langium', content_v1)
        self.assertIsNone(
            self._kb_grammar_content(acronym),
            'A draft must not project into the chatbot KB.',
        )

        v1.action_publish()
        self.assertEqual(self._kb_grammar_content(acronym), content_v1)

        # Draft iteration on a new version never touches the active KB entry.
        v2 = v1.action_create_draft_version()
        content_v2 = content_v1 + '// v2\n'
        v2._grammar_file()._write_text_utf8(content_v2)
        self.assertEqual(self._kb_grammar_content(acronym), content_v1)

        # Deleting a draft (or its files) leaves the active projection alone.
        v2_probe = v1.action_create_draft_version(new_version='test-probe')
        v2_probe.unlink()
        self.assertEqual(self._kb_grammar_content(acronym), content_v1)

        # Publication is the event that refreshes the KB.
        v2.action_publish()
        self.assertEqual(self._kb_grammar_content(acronym), content_v2)
        self.assertEqual(v1.status, 'deprecated')

    def test_active_multifile_grammar_is_one_flattened_kb_row(self):
        acronym = 'LCKBMF'
        entry_text = (
            "grammar LCKBMF\n"
            "import './Terminals'\n"
            "entry Model: 'model' name=ID;\n"
        )
        terminals_text = (
            "hidden terminal WS: /\\s+/;\n"
            "terminal ID: /[_a-zA-Z][\\w_]*/;\n"
        )
        dsl = self.env['itlingo.dsl'].create({
            'name': 'Lifecycle multi-file KB',
            'acronym': acronym,
            'version': 'test-1',
            'status': 'draft',
        })
        self.File._create_grammar_text(
            dsl, 'Main.langium', entry_text, is_entry=True,
        )
        self.File._create_grammar_text(
            dsl, 'Terminals.langium', terminals_text, is_entry=False,
        )

        dsl.action_publish()

        lang = self.env['itlingo.kb.language'].sudo().search([
            ('name', '=', acronym),
        ], limit=1)
        grammar_rows = self.KbFile.sudo().search([
            ('language_id', '=', lang.id), ('file_type', '=', 'grammar'),
        ])
        self.assertEqual(len(grammar_rows), 1)
        self.assertEqual(grammar_rows.file_name, '%s.langium' % acronym)
        self.assertEqual(grammar_rows.content, dsl._flattened_grammar_text())
        self.assertIn("entry Model", grammar_rows.content)
        self.assertIn("terminal ID", grammar_rows.content)
        self.assertNotIn("import './Terminals'", grammar_rows.content)

    def test_flatten_error_leaves_existing_kb_grammar_untouched(self):
        acronym = 'LCKBSAFE'
        content = VALID_GRAMMAR.format(name=acronym)
        dsl = self.env['itlingo.dsl'].create({
            'name': 'Lifecycle KB flatten safety',
            'acronym': acronym,
            'version': 'test-1',
            'status': 'draft',
        })
        self.File._create_grammar_text(dsl, 'Main.langium', content)
        dsl.action_publish()
        kb_file = self._kb_grammar_file(acronym)
        original = (kb_file.file_name, kb_file.content)

        with patch(
            'odoo.addons.itlingo_dsl.models.itlingo_dsl.'
            'ItlingoDsl._flattened_grammar_text',
            side_effect=GrammarFlattenError('cycle', 'simulated cycle'),
        ):
            dsl._sync_kb_files()

        kb_file.invalidate_recordset(['file_name', 'content'])
        self.assertEqual((kb_file.file_name, kb_file.content), original)
