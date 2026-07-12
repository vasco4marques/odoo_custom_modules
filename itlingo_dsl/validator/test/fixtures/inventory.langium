grammar Inventory
import 'Terminals'

interface Named {
    name: string
}

interface Requirement extends Named {
    priority?: string
    actors?: @Actor[]
    attributes?: Attribute[]
}

type Element = Requirement | Actor;

entry Model infers Model:
    elements+=Element*
;

Element returns Element:
    Requirement | Actor
;

Requirement returns Requirement:
    'requirement' NamedPart
    ('priority' priority=('High' | 'Medium' | 'Low'))?
    ('actors' actors+=[Actor:ID] (',' actors+=[Actor:ID])*)?
    ('attributes' attributes+=Attribute*)?
;

Actor infers Actor:
    'actor' name=ID ('active' active?='active')?
;

Attribute infers Attribute:
    'attribute' key=ID value=Scalar
;

fragment NamedPart:
    name=ID
;

Scalar returns string:
    STRING | INT
;
