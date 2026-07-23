grammar Catalog

entry Catalog:
    'catalog' name=ID items+=Item*;

Item:
    'item' name=ID;

hidden terminal WS: /\s+/;
terminal ID: /[a-zA-Z_][a-zA-Z0-9_]*/;
