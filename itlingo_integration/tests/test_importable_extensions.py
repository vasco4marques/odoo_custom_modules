from odoo.tests import TransactionCase, tagged


@tagged("post_install", "-at_install")
class TestImportableExtensions(TransactionCase):

    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.settings = cls.env["itlingo.integration.settings"]._get_settings()
        cls.settings.importable_extensions = "txt,md"

    def _new_dsl(self, acronym, file_extensions):
        return self.env["itlingo.dsl"].create({
            "name": "DSL %s" % acronym,
            "acronym": acronym,
            "version": "test-1",
            "status": "draft",
            "file_extensions": file_extensions,
        })

    def test_dsl_extensions_are_importable_without_configuration(self):
        self._new_dsl("VSL", ".vsl")
        allowed = self.settings._get_importable_extensions()
        self.assertIn("vsl", allowed)

    def test_configured_extras_are_kept(self):
        allowed = self.settings._get_importable_extensions()
        self.assertIn("txt", allowed)
        self.assertIn("md", allowed)

    def test_unknown_extension_stays_disallowed(self):
        allowed = self.settings._get_importable_extensions()
        self.assertNotIn("exe", allowed)

    def test_dsl_without_extensions_falls_back_to_acronym(self):
        self._new_dsl("PSL", False)
        allowed = self.settings._get_importable_extensions()
        self.assertIn("psl", allowed)

    def test_multiple_and_dotless_extensions_are_normalized(self):
        dsl = self._new_dsl("MSL", " .MSL , msl2 ")
        self.assertEqual(dsl._extensions(), ["msl", "msl2"])
        allowed = self.settings._get_importable_extensions()
        self.assertIn("msl", allowed)
        self.assertIn("msl2", allowed)

    def test_archived_dsl_extensions_are_not_importable(self):
        dsl = self._new_dsl("ZSL", ".zsl")
        dsl.active = False
        allowed = self.settings._get_importable_extensions()
        self.assertNotIn("zsl", allowed)
