{
    "name": "ITLingo Chatbot Integration",
    "version": "1.0.0",
    "summary": "Embed the external Django chatbot UI into workspace pages",
    "category": "Website/Portal",
    "author": "ITLingo",
    "depends": [
        "website",
        "portal",
        "project",
        "itlingo_organizations",
        "itlingo_website_portal"
    ],
    "data": [
        "views/templates.xml",
        "data/ir_config_parameter.xml",
        "security/ir.model.access.csv",
        "views/chatbot_views.xml",
        "views/chatbot_menus.xml",
    ],
    "installable": True,
    "application": False,
}
