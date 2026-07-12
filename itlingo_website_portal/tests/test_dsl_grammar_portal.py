import re

from lxml import html

from odoo.tests import HttpCase, JsonRpcException, new_test_user, tagged
from odoo.tools import mute_logger

VALID_GRAMMAR = (
    "grammar {name}\n"
    "entry Model: 'model' name=ID;\n"
    "hidden terminal WS: /\\s+/;\n"
    "terminal ID: /[_a-zA-Z][\\w_]*/;\n"
)


@tagged('post_install', '-at_install')
class TestDslGrammarPortal(HttpCase):

    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.maintainer = new_test_user(
            cls.env,
            login='grammar_maintainer',
            password='grammar_maintainer',
            groups=(
                'base.group_portal,'
                'itlingo_organizations.group_itlingo_member'
            ),
        )
        cls.unrelated = new_test_user(
            cls.env,
            login='grammar_unrelated',
            password='grammar_unrelated',
            groups=(
                'base.group_portal,'
                'itlingo_organizations.group_itlingo_member'
            ),
        )
        cls.admin = new_test_user(
            cls.env,
            login='grammar_admin',
            password='grammar_admin',
            groups='itlingo_organizations.group_itlingo_admin',
        )
        cls.draft = cls.env['itlingo.dsl'].create({
            'name': 'Portal Grammar Draft',
            'acronym': 'PGD',
            'version': 'test-1.0',
            'status': 'draft',
            'maintainer_ids': [(6, 0, cls.maintainer.ids)],
        })
        cls.other_draft = cls.env['itlingo.dsl'].create({
            'name': 'Other Portal Grammar Draft',
            'acronym': 'OPGD',
            'version': 'test-1.0',
            'status': 'draft',
            'maintainer_ids': [(6, 0, cls.maintainer.ids)],
        })
        cls.active = cls.env['itlingo.dsl'].create({
            'name': 'Public Portal Grammar',
            'acronym': 'PPG',
            'version': 'test-1.0',
            'status': 'draft',
            'maintainer_ids': [(6, 0, cls.maintainer.ids)],
        })
        cls.grammar = cls.env['itlingo.dsl.file']._create_grammar_text(
            cls.draft,
            'PGD.langium',
            'grammar PGD\n// Olá 🌍\nentry Model: name=ID;\n',
        )
        cls.other_grammar = cls.env['itlingo.dsl.file']._create_grammar_text(
            cls.other_draft,
            'OPGD.langium',
            'grammar OPGD\nentry Model: name=ID;\n',
        )
        cls.active_grammar = cls.env['itlingo.dsl.file']._create_grammar_text(
            cls.active,
            'PPG.langium',
            "grammar PPG\n"
            "entry Model: 'model' name=ID;\n"
            "hidden terminal WS: /\\s+/;\n"
            "terminal ID: /[_a-zA-Z][\\w_]*/;\n",
        )
        # Activation must go through publication (server-side validation).
        cls.active.action_publish()

    def test_public_catalog_only_contains_active_dsls(self):
        self.authenticate(None, None)
        response = self.url_open('/dsl')

        self.assertEqual(response.status_code, 200)
        self.assertIn('Public Portal Grammar', response.text)
        self.assertNotIn('Portal Grammar Draft', response.text)

        draft_response = self.url_open(
            f'/dsl/{self.draft.id}', allow_redirects=False,
        )
        self.assertEqual(draft_response.status_code, 404)

    def test_editor_assets_are_route_only(self):
        self.authenticate('grammar_maintainer', 'grammar_maintainer')
        detail = self.url_open(f'/dsl/{self.draft.id}')
        editor = self.url_open(f'/dsl/{self.draft.id}/grammar')
        langium_worker = self.url_open(
            '/itlingo_website_portal/static/dist/grammar-editor/'
            'langium-grammar-server.worker.js'
        )
        monaco_worker = self.url_open(
            '/itlingo_website_portal/static/dist/grammar-editor/'
            'editor.worker.js'
        )

        self.assertEqual(editor.status_code, 200)
        self.assertEqual(langium_worker.status_code, 200)
        self.assertEqual(monaco_worker.status_code, 200)
        self.assertIn('Back to DSL', editor.text)
        self.assertIn('grammar-editor.js', editor.text)
        self.assertNotIn('grammar-editor.js', detail.text)
        self.assertIn('Open editor', detail.text)

        document = html.fromstring(editor.content)
        breadcrumbs = document.xpath(
            "//ol[contains(concat(' ', normalize-space(@class), ' '),"
            " ' o_portal_submenu ')]"
            "//li[contains(concat(' ', normalize-space(@class), ' '),"
            " ' breadcrumb-item ')]"
        )
        self.assertEqual(
            [' '.join(item.text_content().split()) for item in breadcrumbs[-3:]],
            ['DSLs', self.draft.acronym, 'Grammar'],
        )
        self.assertEqual(
            breadcrumbs[-2].xpath('./a/@href'),
            [f'/dsl/{self.draft.id}'],
        )
        self.assertIn('active', breadcrumbs[-1].get('class', '').split())

    def test_language_service_diagnostics_and_restart_in_browser(self):
        browser_dsl = self.env['itlingo.dsl'].create({
            'name': 'Grammar Browser Smoke',
            'acronym': 'GBS',
            'version': 'test-1.0',
            'status': 'draft',
            'maintainer_ids': [(6, 0, self.maintainer.ids)],
        })
        self.env['itlingo.dsl.file']._create_grammar_text(
            browser_dsl,
            'GBS.langium',
            'grammar GBS\n'
            'entry Model: value=MissingRule;\n'
            'terminal WS: /\\s+/\n',
        )
        code = """
        (async () => {
            const root = document.querySelector('#itlingo-grammar-editor');
            const waitFor = async (predicate, message) => {
                const deadline = Date.now() + 30000;
                while (!predicate()) {
                    if (Date.now() > deadline) {
                        throw new Error(message);
                    }
                    await new Promise((resolve) => setTimeout(resolve, 100));
                }
            };

            await waitFor(
                () => root.dataset.grammarServerState === 'ready',
                'Langium grammar server did not become ready',
            );
            await waitFor(
                () => !root.querySelector('[data-grammar-validate]').disabled,
                'Validate never became available',
            );
            const capabilities = new Set(
                root.dataset.grammarServerCapabilities.split(','),
            );
            for (const capability of ['completion', 'hover', 'definition']) {
                if (!capabilities.has(capability)) {
                    throw new Error(`Langium server omitted ${capability} support`);
                }
            }
            await waitFor(
                () => Number(root.dataset.grammarDiagnosticErrors) > 0,
                'Invalid grammar did not create error markers',
            );
            const messages = JSON.parse(root.dataset.grammarDiagnosticMessages);
            if (!messages.some((message) => message.includes('MissingRule'))) {
                throw new Error('Unknown grammar rule diagnostic is missing');
            }
            if (!messages.some(
                (message) => message.toLowerCase().includes('expecting')
                    && message.includes(';'),
            )) {
                throw new Error(
                    `Missing-semicolon diagnostic is missing: ${messages.join(' | ')}`,
                );
            }

            // Problems panel lists every marker with position details.
            await waitFor(
                () => root.querySelectorAll('[data-grammar-problem-index]').length
                    === Number(root.dataset.grammarDiagnostics),
                'Problems panel did not list every diagnostic',
            );
            const summary = root.querySelector('[data-grammar-problems-summary]');
            if (!/Problems: .*error/.test(summary.textContent)) {
                throw new Error(`Problems summary lacks error count: ${summary.textContent}`);
            }
            const firstProblem = root.querySelector('[data-grammar-problem-index]');
            if (!/Ln \\d+, Col \\d+/.test(firstProblem.textContent)) {
                throw new Error('Problem entries do not show line and column');
            }

            // Selecting a problem focuses the editor on its range.
            firstProblem.click();
            await waitFor(
                () => root.dataset.grammarFocusedProblem === '0'
                    && root.querySelector('[data-grammar-editor]')
                        .contains(document.activeElement),
                'Selecting a problem did not focus the editor range',
            );

            // Explicit validation reports invalidity for the erroneous source.
            root.querySelector('[data-grammar-validate]').click();
            await waitFor(
                () => root.dataset.grammarValidityState === 'invalid',
                'Validate did not report the grammar as invalid',
            );

            // An invalid draft can still be saved and stays visibly invalid.
            const saveButton = root.querySelector('[data-grammar-save]');
            if (!saveButton) {
                throw new Error('Draft grammar editor is missing its Save button');
            }
            const statusEl = root.querySelector('[data-grammar-status]');
            if (statusEl.textContent !== 'Saved') {
                throw new Error('Loaded grammar should start in the Saved state');
            }
            if (root.dataset.grammarValidityState !== 'invalid') {
                throw new Error('Saved state must not imply validity');
            }

            const generation = Number(root.dataset.grammarServerGeneration);
            root.querySelector('[data-grammar-server-restart]').click();
            if (Number(root.dataset.grammarDiagnostics) !== 0) {
                throw new Error('Restart did not clear markers from the old client');
            }
            await waitFor(
                () => root.dataset.grammarServerState === 'ready'
                    && Number(root.dataset.grammarServerGeneration) > generation,
                'Langium grammar server did not restart cleanly',
            );
            await waitFor(
                () => Number(root.dataset.grammarDiagnosticErrors) > 0,
                'Diagnostics were not restored after restart',
            );
            console.log('test successful');
        })();
        """
        self.browser_js(
            f'/dsl/{browser_dsl.id}/grammar',
            code,
            ready="Boolean(document.querySelector('#itlingo-grammar-editor'))",
            login='grammar_maintainer',
            timeout=60,
        )

    def test_starter_grammar_is_valid_in_browser(self):
        starter_dsl = self.env['itlingo.dsl'].create({
            'name': 'Starter Grammar Draft',
            'acronym': 'SGD',
            'version': 'test-1.0',
            'status': 'draft',
            'maintainer_ids': [(6, 0, self.maintainer.ids)],
        })
        code = """
        (async () => {
            const root = document.querySelector('#itlingo-grammar-editor');
            const waitFor = async (predicate, message) => {
                const deadline = Date.now() + 30000;
                while (!predicate()) {
                    if (Date.now() > deadline) {
                        throw new Error(message);
                    }
                    await new Promise((resolve) => setTimeout(resolve, 100));
                }
            };

            await waitFor(
                () => root.dataset.grammarServerState === 'ready',
                'Langium grammar server did not become ready',
            );
            await waitFor(
                () => !root.querySelector('[data-grammar-validate]').disabled,
                'Validate never became available',
            );
            root.querySelector('[data-grammar-validate]').click();
            await waitFor(
                () => root.dataset.grammarValidityState === 'valid',
                'The starter grammar was not accepted by the Langium service',
            );
            if (Number(root.dataset.grammarDiagnosticErrors) !== 0) {
                throw new Error('The starter grammar produced error markers');
            }
            console.log('test successful');
        })();
        """
        self.browser_js(
            f'/dsl/{starter_dsl.id}/grammar',
            code,
            ready="Boolean(document.querySelector('#itlingo-grammar-editor'))",
            login='grammar_maintainer',
            timeout=60,
        )

    def test_maintainer_loads_and_saves_same_file(self):
        self.authenticate('grammar_maintainer', 'grammar_maintainer')
        workspace = self.make_jsonrpc_request(
            f'/dsl/{self.draft.id}/grammar/load',
        )
        self.assertTrue(workspace['permissions']['canEdit'])
        self.assertEqual(workspace['files'][0]['id'], self.grammar.id)
        self.assertIn('Olá 🌍', workspace['files'][0]['content'])

        saved = self.make_jsonrpc_request(
            f'/dsl/{self.draft.id}/grammar/save',
            {
                'file_id': self.grammar.id,
                'path': 'PGD.langium',
                'content': 'grammar PGD\nentry Model: title=STRING;\n',
            },
        )
        self.assertEqual(saved['id'], self.grammar.id)
        self.assertEqual(
            self.grammar._read_text_utf8(),
            'grammar PGD\nentry Model: title=STRING;\n',
        )

    def test_save_creates_missing_grammar(self):
        empty_dsl = self.env['itlingo.dsl'].create({
            'name': 'Empty Grammar Draft',
            'acronym': 'EGD',
            'version': 'test-1.0',
            'status': 'draft',
            'maintainer_ids': [(6, 0, self.maintainer.ids)],
        })
        self.authenticate('grammar_maintainer', 'grammar_maintainer')
        workspace = self.make_jsonrpc_request(
            f'/dsl/{empty_dsl.id}/grammar/load',
        )
        self.assertEqual(workspace['suggestedPath'], 'egd.langium')
        self.assertIn('grammar EGD', workspace['suggestedContent'])
        self.assertIn('entry Model:', workspace['suggestedContent'])

        saved = self.make_jsonrpc_request(
            f'/dsl/{empty_dsl.id}/grammar/save',
            {
                'file_id': False,
                'path': workspace['suggestedPath'],
                'content': 'grammar EGD\nentry Model: name=ID;\n',
            },
        )

        grammar = empty_dsl.file_ids.filtered(
            lambda item: item.file_type == 'grammar'
        )
        self.assertEqual(saved['id'], grammar.id)
        self.assertEqual(grammar.file_name, 'egd.langium')
        self.assertEqual(grammar._read_text_utf8(), saved['content'])

    def test_unrelated_and_anonymous_users_cannot_load_source(self):
        self.authenticate('grammar_unrelated', 'grammar_unrelated')
        with self.assertRaises(JsonRpcException), mute_logger('odoo.http'):
            self.make_jsonrpc_request(f'/dsl/{self.draft.id}/grammar/load')

        self.authenticate(None, None)
        response = self.url_open(
            f'/dsl/{self.draft.id}/grammar', allow_redirects=False,
        )
        self.assertIn(response.status_code, (302, 303))

    def test_cross_dsl_file_save_is_rejected(self):
        self.authenticate('grammar_maintainer', 'grammar_maintainer')
        with self.assertRaises(JsonRpcException), mute_logger('odoo.http'):
            self.make_jsonrpc_request(
                f'/dsl/{self.draft.id}/grammar/save',
                {
                    'file_id': self.other_grammar.id,
                    'path': 'PGD.langium',
                    'content': 'grammar PGD',
                },
            )

    def test_non_draft_is_read_only_for_maintainer_and_admin(self):
        for login in ('grammar_maintainer', 'grammar_admin'):
            self.authenticate(login, login)
            workspace = self.make_jsonrpc_request(
                f'/dsl/{self.active.id}/grammar/load',
            )
            self.assertFalse(workspace['permissions']['canEdit'])
            with self.assertRaises(JsonRpcException), mute_logger('odoo.http'):
                self.make_jsonrpc_request(
                    f'/dsl/{self.active.id}/grammar/save',
                    {
                        'file_id': self.active_grammar.id,
                        'path': 'PPG.langium',
                        'content': 'grammar Changed',
                    },
                )

    def test_read_only_editor_page_has_no_mutation_controls(self):
        self.authenticate('grammar_maintainer', 'grammar_maintainer')
        read_only = self.url_open(f'/dsl/{self.active.id}/grammar')
        editable = self.url_open(f'/dsl/{self.draft.id}/grammar')

        self.assertEqual(read_only.status_code, 200)
        self.assertNotIn('data-grammar-save', read_only.text)
        self.assertIn('read-only', read_only.text)
        self.assertIn('data-grammar-validate', read_only.text)
        self.assertIn('data-grammar-problems', read_only.text)
        self.assertIn('data-grammar-save', editable.text)

    def test_editor_page_states_parser_deployment_scope(self):
        self.authenticate('grammar_maintainer', 'grammar_maintainer')
        editor = self.url_open(f'/dsl/{self.draft.id}/grammar')
        self.assertIn('do not', editor.text)
        self.assertIn('deploy a parser', editor.text)

    def test_backend_button_opens_portal_editor(self):
        action = self.draft.action_open_grammar_editor()
        self.assertEqual(action['type'], 'ir.actions.act_url')
        self.assertEqual(action['url'], f'/dsl/{self.draft.id}/grammar')


@tagged('post_install', '-at_install')
class TestDslLifecyclePortal(HttpCase):
    """Portal publication and draft-version routes (Phase 5)."""

    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.maintainer = new_test_user(
            cls.env,
            login='lifecycle_maintainer',
            password='lifecycle_maintainer',
            groups=(
                'base.group_portal,'
                'itlingo_organizations.group_itlingo_member'
            ),
        )
        cls.unrelated = new_test_user(
            cls.env,
            login='lifecycle_unrelated',
            password='lifecycle_unrelated',
            groups=(
                'base.group_portal,'
                'itlingo_organizations.group_itlingo_member'
            ),
        )

    def _make_draft(self, acronym, grammar_content):
        dsl = self.env['itlingo.dsl'].create({
            'name': f'Lifecycle Portal {acronym}',
            'acronym': acronym,
            'version': 'test-1',
            'status': 'draft',
            'maintainer_ids': [(6, 0, self.maintainer.ids)],
        })
        self.env['itlingo.dsl.file']._create_grammar_text(
            dsl, f'{acronym.lower()}.langium', grammar_content,
        )
        return dsl

    def _csrf_token(self, dsl):
        page = self.url_open(f'/dsl/{dsl.id}')
        match = re.search(r'name="csrf_token" value="([^"]+)"', page.text)
        self.assertTrue(match, 'DSL page must expose a CSRF token')
        return match.group(1)

    def test_maintainer_publishes_valid_draft(self):
        dsl = self._make_draft('PLOK', VALID_GRAMMAR.format(name='PLOK'))
        self.authenticate('lifecycle_maintainer', 'lifecycle_maintainer')
        response = self.url_open(
            f'/dsl/{dsl.id}/publish',
            data={'csrf_token': self._csrf_token(dsl)},
        )

        self.assertEqual(response.status_code, 200)
        self.assertIn('message=published', response.url)
        dsl.invalidate_recordset()
        self.assertEqual(dsl.status, 'active')
        self.assertEqual(dsl.published_by_id, self.maintainer)

    def test_invalid_grammar_publication_fails_with_details(self):
        dsl = self._make_draft(
            'PLBAD', 'grammar PLBAD\nentry Model: value=MissingRule;\n',
        )
        self.authenticate('lifecycle_maintainer', 'lifecycle_maintainer')
        with mute_logger('odoo.http'):
            response = self.url_open(
                f'/dsl/{dsl.id}/publish',
                data={'csrf_token': self._csrf_token(dsl)},
            )

        self.assertIn('error=publish_failed', response.url)
        self.assertIn('MissingRule', response.text)
        dsl.invalidate_recordset()
        self.assertEqual(dsl.status, 'draft')

    def test_unrelated_user_cannot_publish(self):
        dsl = self._make_draft('PLDENY', VALID_GRAMMAR.format(name='PLDENY'))
        # The CSRF token is session-scoped: grab a genuine one from a page the
        # unrelated user does maintain, so this exercises authorization, not
        # CSRF rejection.
        own_dsl = self.env['itlingo.dsl'].create({
            'name': 'Lifecycle Portal own',
            'acronym': 'PLOWN',
            'version': 'test-1',
            'status': 'draft',
            'maintainer_ids': [(6, 0, self.unrelated.ids)],
        })
        self.authenticate('lifecycle_unrelated', 'lifecycle_unrelated')
        token = self._csrf_token(own_dsl)
        with mute_logger('odoo.http'):
            response = self.url_open(
                f'/dsl/{dsl.id}/publish', data={'csrf_token': token},
            )

        self.assertEqual(response.status_code, 403)
        dsl.invalidate_recordset()
        self.assertEqual(dsl.status, 'draft')

    def test_maintainer_creates_draft_version(self):
        dsl = self._make_draft('PLFORK', VALID_GRAMMAR.format(name='PLFORK'))
        dsl.action_publish()
        self.authenticate('lifecycle_maintainer', 'lifecycle_maintainer')
        response = self.url_open(
            f'/dsl/{dsl.id}/create-draft',
            data={'csrf_token': self._csrf_token(dsl), 'version': 'test-2'},
        )

        self.assertIn('message=draft_created', response.url)
        draft = self.env['itlingo.dsl'].search([
            ('acronym', '=', 'PLFORK'), ('version', '=', 'test-2'),
        ])
        self.assertEqual(draft.status, 'draft')
        self.assertEqual(
            draft._grammar_file()._read_text_utf8(),
            dsl._grammar_file()._read_text_utf8(),
        )
        dsl.invalidate_recordset()
        self.assertEqual(dsl.status, 'active')
