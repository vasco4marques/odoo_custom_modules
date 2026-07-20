import base64
import unittest

from odoo.exceptions import ValidationError
from odoo.tests.common import TransactionCase, tagged


@tagged('post_install', '-at_install')
class TestDocumentKbSync(TransactionCase):

    def setUp(self):
        super().setUp()
        try:
            self.KBFile = self.env['itlingo.kb.file'].sudo()
        except KeyError as exc:
            raise unittest.SkipTest('itlingo.kb.file is not installed') from exc
        self.env.cr.execute("SELECT to_regclass('chatbot_kbfile')")
        if not self.env.cr.fetchone()[0]:
            raise unittest.SkipTest('chatbot_kbfile table is not installed')

        self.org = self.env['itlingo.organization'].create({
            'name': 'KB Sync Test Org',
        })
        self.workspace = self.env['itlingo.workspace'].create({
            'name': 'KB Sync Test Workspace',
            'organization_id': self.org.id,
        })
        self.doc_type = self.env.ref('itlingo_documents.doc_type_specification')

    def test_published_grounding_document_creates_stable_kb_file(self):
        doc = self.env['itlingo.document'].create({
            'name': 'Grounding Source',
            'document_type_id': self.doc_type.id,
            'organization_id': self.org.id,
            'project_id': self.workspace.id,
            'file_name': 'grounding_source.txt',
            'document_file': base64.b64encode(b'Glossary term: actor'),
            'status': 'published',
            'dsl_knowledge': True,
        })

        source_url = 'odoo://itlingo.document/%s' % doc.id
        kb_file = self.KBFile.search([
            ('file_type', '=', 'other'),
            ('source_url', '=', source_url),
        ])
        self.assertEqual(len(kb_file), 1)
        self.assertEqual(kb_file.content, 'Glossary term: actor')

        doc.write({'file_name': 'renamed_grounding_source.txt'})
        kb_file = self.KBFile.search([
            ('file_type', '=', 'other'),
            ('source_url', '=', source_url),
        ])
        self.assertEqual(len(kb_file), 1)
        self.assertEqual(kb_file.file_name, 'renamed_grounding_source.txt')

    def test_binary_file_cannot_be_grounding_knowledge(self):
        with self.env.cr.savepoint(), self.assertRaises(ValidationError):
            self.env['itlingo.document'].create({
                'name': 'Binary Source',
                'document_type_id': self.doc_type.id,
                'organization_id': self.org.id,
                'project_id': self.workspace.id,
                'file_name': 'binary_source.docx',
                'document_file': base64.b64encode(b'PK\x03\x04binary'),
                'status': 'published',
                'dsl_knowledge': True,
            })

    def test_registered_dsl_extension_is_text_and_syncs_to_kb(self):
        self.env['itlingo.dsl'].create({
            'name': 'Knowledge Extension Test',
            'acronym': 'KXT',
            'version': 'test-1',
            'status': 'active',
            'file_extensions': '.kxt',
        })
        doc = self.env['itlingo.document'].create({
            'name': 'Dynamic DSL Source',
            'document_type_id': self.doc_type.id,
            'organization_id': self.org.id,
            'project_id': self.workspace.id,
            'file_name': 'dynamic_source.kxt',
            'document_file': base64.b64encode(b'entity Dynamic'),
            'status': 'published',
            'dsl_knowledge': True,
        })

        self.assertEqual(doc.document_format, 'text')
        kb_file = self.KBFile.search([
            ('file_type', '=', 'other'),
            ('source_url', '=', 'odoo://itlingo.document/%s' % doc.id),
        ])
        self.assertEqual(len(kb_file), 1)
        self.assertEqual(kb_file.content, 'entity Dynamic')
