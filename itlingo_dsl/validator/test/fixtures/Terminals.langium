terminal ID returns string: /[a-zA-Z_][a-zA-Z0-9_]*/;
terminal INT returns number: /[0-9]+/;
terminal STRING returns string: /"[^"\\]*(?:\\.[^"\\]*)*"/;
hidden terminal WS: /\s+/;
