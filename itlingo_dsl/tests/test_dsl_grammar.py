import base64

from odoo.exceptions import AccessError, ValidationError
from odoo.tests import TransactionCase, new_test_user, tagged

from ..models.itlingo_dsl_file import GRAMMAR_MAX_BYTES


@tagged('post_install', '-at_install')
class TestDslGrammar(TransactionCase):

    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.File = cls.env['itlingo.dsl.file']
        cls.dsl = cls.env['itlingo.dsl'].create({
            'name': 'Grammar Test Language',
            'acronym': 'GTL',
            'version': 'test-1.0',
            'status': 'draft',
        })

    def test_unicode_grammar_text_round_trip(self):
        content = "grammar GTL\n// Português 日本語 🚀\nentry Model: name=ID;\n"
        grammar = self.File._create_grammar_text(
            self.dsl, 'GTL.langium', content,
        )

        self.assertEqual(grammar._read_text_utf8(), content)

        updated = content.replace('name=ID', 'name=STRING')
        grammar._write_text_utf8(updated)
        grammar.invalidate_recordset(['file'])
        self.assertEqual(grammar._read_text_utf8(), updated)

    def test_invalid_binary_grammar_is_rejected(self):
        with self.assertRaisesRegex(ValidationError, 'valid UTF-8'):
            self.File.create({
                'dsl_id': self.dsl.id,
                'file_type': 'grammar',
                'file_name': 'invalid.langium',
                'file': base64.b64encode(b'\xff\xfe'),
            })

    def test_invalid_name_nul_and_size_are_rejected(self):
        with self.assertRaisesRegex(ValidationError, r"'\.\.' segments"):
            self.File._create_grammar_text(self.dsl, '../GTL.langium', '')
        with self.assertRaisesRegex(ValidationError, 'end in .langium'):
            self.File._create_grammar_text(self.dsl, 'GTL.txt', '')
        with self.assertRaisesRegex(ValidationError, 'NUL'):
            self.File._create_grammar_text(self.dsl, 'GTL.langium', 'a\x00b')
        with self.assertRaisesRegex(ValidationError, 'too large'):
            self.File._create_grammar_text(
                self.dsl, 'GTL.langium', 'x' * (GRAMMAR_MAX_BYTES + 1),
            )

    def test_non_draft_grammar_is_immutable(self):
        grammar = self.File._create_grammar_text(
            self.dsl, 'GTL.langium', 'grammar GTL\nentry Model: name=ID;\n',
        )
        # Deprecated exercises the non-draft guard without requiring the
        # publication path; activation itself is covered by the lifecycle tests.
        self.dsl.status = 'deprecated'

        with self.assertRaisesRegex(ValidationError, 'draft status'):
            grammar._write_text_utf8('grammar Changed')
        with self.assertRaisesRegex(ValidationError, 'draft status'):
            grammar.unlink()
        with self.assertRaisesRegex(ValidationError, 'draft status'):
            grammar.is_enabled = False

    def test_only_admin_acl_can_create_dsl(self):
        manager = new_test_user(
            self.env,
            login='grammar_acl_manager',
            groups='itlingo_organizations.group_itlingo_manager',
        )
        with self.assertRaises(AccessError):
            self.env['itlingo.dsl'].with_user(manager).create({
                'name': 'Forbidden DSL',
                'acronym': 'FORBIDDEN',
                'version': 'test-1.0',
            })
