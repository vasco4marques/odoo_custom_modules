from odoo.tests import TransactionCase, tagged

from ..controllers.chat import _resolve_dsl_export_filename


@tagged('post_install', '-at_install')
class TestChatExportFilename(TransactionCase):

    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.psl = cls.env['itlingo.dsl'].create({
            'name': 'Chat Export Test Language',
            'acronym': 'XPSL',
            'version': 'test-1',
            'status': 'active',
            'file_extensions': '.psl,.product',
        })

    def test_dsl_acronym_overrides_client_extension(self):
        filename = _resolve_dsl_export_filename(
            self.env,
            'generated-spec.rsl',
            'xpsl',
        )

        self.assertEqual(filename, 'generated-spec.psl')

    def test_dsl_id_is_supported(self):
        filename = _resolve_dsl_export_filename(
            self.env,
            'generated-spec.txt',
            self.psl.id,
        )

        self.assertEqual(filename, 'generated-spec.psl')

    def test_unknown_dsl_is_rejected(self):
        with self.assertRaisesRegex(ValueError, 'No active DSL'):
            _resolve_dsl_export_filename(
                self.env,
                'generated-spec.rsl',
                'missing',
            )

    def test_draft_dsl_reference_is_rejected(self):
        draft = self.env['itlingo.dsl'].create({
            'name': 'Unpublished Chat Export Language',
            'acronym': 'XDRAFT',
            'version': 'test-1',
            'status': 'draft',
            'file_extensions': '.xdraft',
        })

        for reference in (draft.id, draft.acronym):
            with self.assertRaisesRegex(ValueError, 'No active DSL'):
                _resolve_dsl_export_filename(
                    self.env,
                    'generated-spec.txt',
                    reference,
                )

    def test_legacy_export_keeps_client_filename_without_dsl(self):
        filename = _resolve_dsl_export_filename(
            self.env,
            'notes.txt',
            None,
        )

        self.assertEqual(filename, 'notes.txt')
