Package demo
System DemoApp "Demo App" : SoftwareSystem : SoftwareSystem_WebServer [
    vendor "ITLingo"
    version "1.0"
    description "An example ASL system used to exercise the templating framework."
]
Actor actor_user "End User" : User [
    description "A user of the application."
]
DataEntity Customer "Customer" : Master : Regular [
    attribute customerName "Name" : String
]
UIContainer Home "Home" : Window : Window_Modeless [
    component CustomerList "Customers" : List : List_Table [
        dataBinding Customer [
            visualizationAttributes customerName
        ]
        part CustomerName "Customer name" : Field : Field_Output : WFC_Label [
            dataAttributeBinding customerName
        ]
        event RowSelected "Row selected" : Select
    ]
    action Refresh "Refresh" : Client
    description "Main customer screen."
]
