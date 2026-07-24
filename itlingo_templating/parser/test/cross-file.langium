grammar CrossFile

entry Model:
    packages+=PackageSystem*;

PackageSystem:
    'Package' name=QualifiedName imports+=Import* system=System;

Import:
    'Import' importedNamespace=QualifiedNameWithWildcard;

System:
    'System' name=ID concepts+=(Entity | Derived)*;

Entity:
    'Entity' name=ID '{' attributes+=Attribute* '}';

Attribute:
    'attribute' name=ID;

Derived:
    'derived' from=[Attribute:QualifiedName];

QualifiedName returns string:
    ID ('.' ID)*;

QualifiedNameWithWildcard returns string:
    QualifiedName '.*'?;

hidden terminal WS: /\s+/;
terminal ID: /[a-zA-Z_][a-zA-Z0-9_]*/;
