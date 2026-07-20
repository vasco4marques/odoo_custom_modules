"""Document-format constants shared by portal and rendering modules."""


SUPPORTED_TEMPLATE_EXTENSIONS = (
    ".docx", ".xlsx",
    ".txt", ".md", ".rst", ".html", ".htm", ".json", ".xml",
    ".yaml", ".yml", ".toml", ".ini", ".cfg", ".properties",
    ".sql", ".csv", ".tsv", ".css", ".js", ".ts", ".sh",
)

SUPPORTED_TEMPLATE_ACCEPT = ",".join(SUPPORTED_TEMPLATE_EXTENSIONS)
