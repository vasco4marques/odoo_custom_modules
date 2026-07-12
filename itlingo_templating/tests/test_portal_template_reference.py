from lxml import html

from odoo.tests import HttpCase, new_test_user, tagged


REFERENCE_GRAMMAR = r"""
grammar PortalReference

entry Model:
    requirements+=Requirement*
    actors+=Actor*
;

Requirement:
    'requirement' name=ID
    ('priority' priority=('High' | 'Medium' | 'Low'))?
    ('actors' actors+=[Actor:ID] (',' actors+=[Actor:ID])*)?
;

Actor:
    'actor' name=ID
;

hidden terminal WS: /\s+/;
terminal ID: /[a-zA-Z_][a-zA-Z0-9_]*/;
terminal STRING: /"[^"\\]*(?:\\.[^"\\]*)*"/;
"""


@tagged("post_install", "-at_install")
class TestPortalTemplateReference(HttpCase):

    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.maintainer = new_test_user(
            cls.env,
            login="reference_maintainer",
            password="reference_maintainer",
            groups=(
                "base.group_portal,"
                "itlingo_organizations.group_itlingo_member"
            ),
        )
        cls.unrelated = new_test_user(
            cls.env,
            login="reference_unrelated",
            password="reference_unrelated",
            groups=(
                "base.group_portal,"
                "itlingo_organizations.group_itlingo_member"
            ),
        )
        cls.admin = new_test_user(
            cls.env,
            login="reference_admin",
            password="reference_admin",
            groups=(
                "base.group_user,"
                "itlingo_organizations.group_itlingo_admin"
            ),
        )
        cls.draft = cls.env["itlingo.dsl"].create({
            "name": "Reference Draft Language",
            "acronym": "RDL",
            "version": "test-1.0",
            "status": "draft",
            "maintainer_ids": [(6, 0, cls.maintainer.ids)],
            "template_profile": (
                '{"bucket_aliases": {"Requirement": "requirements"}, '
                '"root_alias": "catalog", '
                '"title_fields": {"Requirement": ["name"]}}'
            ),
        })
        cls.env["itlingo.dsl.file"]._create_grammar_text(
            cls.draft, "RDL.langium", REFERENCE_GRAMMAR,
        )
        cls.active = cls.env["itlingo.dsl"].create({
            "name": "Reference Public Language",
            "acronym": "RPL",
            "version": "test-1.0",
            "status": "draft",
            "maintainer_ids": [(6, 0, cls.maintainer.ids)],
        })
        cls.env["itlingo.dsl.file"]._create_grammar_text(
            cls.active, "RPL.langium", REFERENCE_GRAMMAR,
        )
        cls.active.action_publish()
        cls.degraded = cls.env["itlingo.dsl"].create({
            "name": "Reference Without Grammar",
            "acronym": "RWG",
            "version": "test-1.0",
            "status": "active",
        })

    @staticmethod
    def _text(response):
        return " ".join(html.fromstring(response.content).text_content().split())

    def test_anonymous_selector_and_detail_show_active_only(self):
        self.authenticate(None, None)
        selector = self.url_open("/dsl/template-reference")

        self.assertEqual(selector.status_code, 200)
        selector_text = self._text(selector)
        self.assertIn("Reference Public Language", selector_text)
        self.assertIn("Reference Without Grammar", selector_text)
        self.assertNotIn("Reference Draft Language", selector_text)

        detail = self.url_open(
            f"/dsl/{self.active.id}/template-reference",
        )
        self.assertEqual(detail.status_code, 200)
        self.assertIn("Generic context", self._text(detail))

        forbidden = self.url_open(
            f"/dsl/{self.draft.id}/template-reference",
            allow_redirects=False,
        )
        self.assertEqual(forbidden.status_code, 404)

    def test_maintainer_sees_draft_inventory_fields_aliases_and_snippet(self):
        self.authenticate("reference_maintainer", "reference_maintainer")
        selector = self.url_open("/dsl/template-reference")
        self.assertIn("Reference Draft Language", self._text(selector))

        response = self.url_open(
            f"/dsl/{self.draft.id}/template-reference",
        )
        self.assertEqual(response.status_code, 200)
        document = html.fromstring(response.content)
        text = " ".join(document.text_content().split())

        self.assertIn("Templates can be authored against this draft now", text)
        self.assertIn("Requirement", text)
        self.assertIn("priority", text)
        self.assertIn("reference → Actor", text)
        self.assertIn("list", text)
        self.assertIn("optional", text)
        self.assertIn("one of: High | Low | Medium", text)
        self.assertIn('requirements → by_type["Requirement"]', text)
        self.assertIn("{% for item in requirements %}", text)
        self.assertTrue(document.xpath(
            "//*[@id='wrap' and contains(@class, 'oe_structure')]"
        ))
        self.assertTrue(document.xpath(
            "//button[contains(@class, 'js-copy-template-snippet')]"
        ))
        self.assertTrue(document.xpath("//*[@id='template-reference-filter']"))
        self.assertTrue(document.xpath(
            "//*[@id='template-reference-type-count' and @aria-live='polite']"
        ))
        requirement = document.xpath("//*[@id='type-requirement']")[0]
        self.assertIn("requirement", requirement.get("data-filter-text"))
        self.assertIn("priority", requirement.get("data-filter-text"))
        self.assertTrue(requirement.xpath(".//a[@href='#type-requirement']"))
        self.assertTrue(document.xpath(
            f"//a[@href='/dsl/{self.draft.id}/template-reference/starter.md']"
        ))

    def test_unrelated_user_cannot_view_draft_but_admin_can(self):
        self.authenticate("reference_unrelated", "reference_unrelated")
        unrelated = self.url_open(
            f"/dsl/{self.draft.id}/template-reference",
            allow_redirects=False,
        )
        self.assertEqual(unrelated.status_code, 404)

        self.authenticate("reference_admin", "reference_admin")
        admin_selector = self.url_open("/dsl/template-reference")
        self.assertIn("Reference Draft Language", self._text(admin_selector))
        admin_detail = self.url_open(
            f"/dsl/{self.draft.id}/template-reference",
        )
        self.assertEqual(admin_detail.status_code, 200)

    def test_no_grammar_uses_degraded_mode_without_losing_generic_context(self):
        self.authenticate(None, None)
        response = self.url_open(
            f"/dsl/{self.degraded.id}/template-reference",
        )
        text = self._text(response)

        self.assertEqual(response.status_code, 200)
        self.assertIn("Grammar inventory unavailable", text)
        self.assertIn("Generic context", text)
        self.assertIn("Uniform element aliases", text)
        self.assertIn("Template Profile aliases", text)
        self.assertNotIn("Named types", text)
        document = html.fromstring(response.content)
        self.assertFalse(document.xpath("//*[@id='template-reference-filter']"))
        self.assertFalse(document.xpath(
            f"//a[@href='/dsl/{self.degraded.id}/template-reference/starter.md']"
        ))

    def test_starter_download_access_headers_and_content(self):
        active_route = f"/dsl/{self.active.id}/template-reference/starter.md"
        self.authenticate(None, None)
        response = self.url_open(active_route)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.headers["Content-Type"], "text/markdown; charset=utf-8")
        self.assertIn("rpl-starter.md", response.headers["Content-Disposition"])
        self.assertIn('{% for item in by_type["Requirement"] %}', response.text)
        self.assertIn("{{ item.priority }}", response.text)
        self.assertIn("{{ item.actors | map(attribute='title')", response.text)

        forbidden = self.url_open(
            f"/dsl/{self.draft.id}/template-reference/starter.md",
            allow_redirects=False,
        )
        self.assertEqual(forbidden.status_code, 404)

        self.authenticate("reference_maintainer", "reference_maintainer")
        draft = self.url_open(
            f"/dsl/{self.draft.id}/template-reference/starter.md"
        )
        self.assertEqual(draft.status_code, 200)
        self.assertIn("# {{ catalog.title }}", draft.text)
        self.assertIn("{% for item in requirements %}", draft.text)

    def test_dsl_pages_link_to_template_reference(self):
        self.authenticate(None, None)
        catalog = self.url_open("/dsl")
        detail = self.url_open(f"/dsl/{self.active.id}")

        self.assertIn('/dsl/template-reference', catalog.text)
        self.assertIn(
            f'/dsl/{self.active.id}/template-reference', detail.text,
        )

        self.authenticate("reference_maintainer", "reference_maintainer")
        edit = self.url_open(f"/dsl/{self.draft.id}")
        self.assertIn(
            f'/dsl/{self.draft.id}/template-reference', edit.text,
        )

    def test_breadcrumbs_render_on_selector_and_detail(self):
        self.authenticate(None, None)

        selector = html.fromstring(self.url_open("/dsl/template-reference").content)
        crumbs = selector.xpath(
            "//ol[contains(@class, 'o_portal_submenu')]"
            "//li[contains(@class, 'breadcrumb-item')]"
        )
        crumb_text = [" ".join(li.text_content().split()) for li in crumbs]
        self.assertIn("DSLs", crumb_text)
        self.assertIn("Template Reference", crumb_text)
        self.assertTrue(selector.xpath(
            "//ol[contains(@class, 'o_portal_submenu')]"
            "//li[contains(@class, 'breadcrumb-item')]/a[@href='/dsl']"
        ))

        detail = html.fromstring(
            self.url_open(f"/dsl/{self.active.id}/template-reference").content
        )
        detail_crumbs = detail.xpath(
            "//ol[contains(@class, 'o_portal_submenu')]"
            "//li[contains(@class, 'breadcrumb-item')]"
        )
        detail_text = [" ".join(li.text_content().split()) for li in detail_crumbs]
        self.assertIn("DSLs", detail_text)
        self.assertIn("Template Reference", detail_text)
        self.assertIn(self.active.acronym, detail_text)
        self.assertTrue(detail.xpath(
            "//ol[contains(@class, 'o_portal_submenu')]"
            "//li[contains(@class, 'breadcrumb-item')]"
            "/a[@href='/dsl/template-reference']"
        ))
        self.assertTrue(detail.xpath(
            "//ol[contains(@class, 'o_portal_submenu')]"
            "//li[contains(@class, 'breadcrumb-item') and contains(@class, 'active')]"
            f"[normalize-space(text())='{self.active.acronym}']"
        ))

    def test_copy_button_copies_the_rendered_snippet(self):
        code = """
        (async () => {
            let copied = null;
            Object.defineProperty(navigator, 'clipboard', {
                configurable: true,
                value: {writeText: async (text) => { copied = text; }},
            });
            const button = document.querySelector('.js-copy-template-snippet');
            const snippet = document.getElementById(button.dataset.copyTarget);
            button.click();
            const deadline = Date.now() + 5000;
            while (button.textContent.trim() !== 'Copied') {
                if (Date.now() > deadline) throw new Error('Copy did not complete');
                await new Promise((resolve) => setTimeout(resolve, 50));
            }
            if (copied !== snippet.textContent) {
                throw new Error('Copied content does not match the snippet');
            }
            console.log('test successful');
        })();
        """
        self.browser_js(
            f"/dsl/{self.draft.id}/template-reference",
            code,
            ready="Boolean(document.querySelector('.js-copy-template-snippet'))",
            login="reference_maintainer",
            timeout=30,
        )

    def test_template_check_requires_login_and_removed_inspector_404s(self):
        route = f"/dsl/{self.active.id}/template-reference/check"
        self.authenticate(None, None)
        anonymous = self.url_open(
            route, data={}, method="POST", allow_redirects=False,
        )
        self.assertIn(anonymous.status_code, (302, 303))
        self.assertIn("/web/login", anonymous.headers.get("Location", ""))
        removed = self.url_open(
            f"/dsl/{self.active.id}/template-reference/inspect",
            allow_redirects=False,
        )
        self.assertEqual(removed.status_code, 404)

    def test_template_check_upload_and_paste_render_findings_without_persistence(self):
        self.authenticate("reference_unrelated", "reference_unrelated")
        detail = html.fromstring(
            self.url_open(f"/dsl/{self.active.id}/template-reference").content
        )
        self.assertTrue(detail.xpath("//*[@id='template-checker']"))
        self.assertFalse(detail.xpath("//*[@id='context-inspector']"))
        token = detail.xpath(
            "//*[@id='template-checker']//input[@name='csrf_token']/@value"
        )[0]
        before_attachments = self.env["ir.attachment"].search_count([])
        upload_response = self.url_open(
            f"/dsl/{self.active.id}/template-reference/check",
            data={"csrf_token": token},
            files={
                "template_file": (
                    "template.md",
                    b"{{ elemnts }}",
                    "text/plain",
                ),
            },
        )
        upload_text = self._text(upload_response)
        self.assertEqual(upload_response.status_code, 200)
        self.assertIn("Unknown template variable `elemnts`", upload_text)
        self.assertIn("Did you mean elements?", upload_text)

        paste_response = self.url_open(
            f"/dsl/{self.active.id}/template-reference/check",
            data={
                "csrf_token": token,
                "jinja_text": "{% for item in by_type['Requiremnt'] %}{{ item.title|lenght }}{% endfor %}",
            },
        )
        paste_text = self._text(paste_response)
        self.assertEqual(paste_response.status_code, 200)
        self.assertIn("Unknown `by_type` key `Requiremnt`", paste_text)
        self.assertIn("Did you mean Requirement?", paste_text)
        self.assertIn("Unknown Jinja filter `lenght`", paste_text)
        self.assertLess(
            paste_response.text.index('data-category="filter"'),
            paste_response.text.index('data-category="dsl"'),
        )
        self.assertEqual(
            self.env["ir.attachment"].search_count([]), before_attachments,
        )

    def test_template_check_degraded_inventory_is_skipped(self):
        self.authenticate("reference_unrelated", "reference_unrelated")
        detail = html.fromstring(
            self.url_open(f"/dsl/{self.degraded.id}/template-reference").content
        )
        token = detail.xpath(
            "//*[@id='template-checker']//input[@name='csrf_token']/@value"
        )[0]
        response = self.url_open(
            f"/dsl/{self.degraded.id}/template-reference/check",
            data={
                "csrf_token": token,
                "jinja_text": "{% for item in elemnts %}{{ item.title }}",
            },
        )
        text = self._text(response)
        self.assertEqual(response.status_code, 200)
        self.assertIn(
            "Invalid Jinja syntax",
            text,
        )
        self.assertIn(
            "DSL variable checking was skipped because the grammar inventory is unavailable",
            text,
        )
        self.assertNotIn("No known variable", text)
