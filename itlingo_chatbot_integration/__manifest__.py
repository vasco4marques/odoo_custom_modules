{
    "name": "ITLingo Chatbot Integration",
    "version": "1.3.0",
    "summary": "Embed the external Django chatbot UI into workspace pages",
    "category": "Website/Portal",
    "author": "ITLingo",
    "depends": [
        "website",
        "portal",
        "itlingo_organizations",
        "itlingo_website_portal",
        "itlingo_documents",
        "itlingo_workspace_access",
        "itlingo_integration"
    ],
    "data": [
        "views/templates.xml",
        "data/ir_config_parameter.xml",
        "security/ir.model.access.csv",
        "views/chatbot_settings_views.xml",
        "views/chatbot_views.xml",
        "views/chatbot_menus.xml",
    ],
    "installable": True,
    "application": False,
}
