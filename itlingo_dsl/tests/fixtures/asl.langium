grammar Asl
import 'Terminals'

entry Model infers Model:
    (packages+=PackageAbstract )* 
;

QualifiedName returns string:
    ID ('.' ID )*  
;

QualifiedNameWithWildcard returns string:
    QualifiedName '.*'?  
;

Import infers Import:
    'Import' importedNamespace=QualifiedNameWithWildcard   
;

terminal DOUBLE returns string:INT '.' INT  ;
DoubleOrInt returns string:
    DOUBLE | INT 
;

Percentage returns string:
    DoubleOrInt '%'  
;

Month infers Month:
    ^type=('Jan' | 'Feb' | 'Mar' | 'Apr' | 'May' | 'Jun' | 'Jul' | 'Aug' | 'Sep' | 'Oct' | 'Nov' | 'Dec' ) 
;

^Date infers _Date:
    day=INT  '-' month=Month  '-' year=INT   
;

AttributeValue infers AttributeValue:
    value=STRING  | ^Date | Month | { infer AttributeValue} DoubleOrInt  | { infer AttributeValue} Percentage  
;

Multiplicity infers Multiplicity:
    ^type=('"0"' | '"1"' | '"0..1"' | '"*"' | STRING ) 
;

Tag infers Tag:
    'tag' '(' 'name' nameAlias=STRING  ('value' value=STRING  )? ')'  
;

Stereotype infers Stereotype:
    'stereotype' name=ID  (nameAlias=STRING )? ':' ^type=StereotypeType  ('[' (tags+=Tag )* ('description' description=STRING  )? ']' )?  
;

IncludeAll infers IncludeAll:
    'IncludeAll' 'fromSystem' system=[System:ID ] ('[' (tags+=Tag )* ('description' description=STRING  )? ']' )?  
;

IncludeElement infers IncludeElement:
    'Include' ^type=IncludeSystemElementType  'fromSystem' system=[System:ID ] 'element' element=[SystemElement:QualifiedName ] ('[' (updateFields=UpdateFields )? (tags+=Tag )* ('description' description=STRING  )? ']' )?  
;

UpdateFields infers UpdateFields:
    'updateFields' updateFields+=UpdateField  (',' updateFields+=UpdateField  )*  
;

UpdateField infers UpdateField:
    ((nameField=STRING ) "with" (valueField=STRING ) ) 
;

TypeExtended infers TypeExtended:
    SystemTypeExtended | SystemSubTypeExtended | MetricTypeExtended | ActorTypeExtended | ActiveEventTypeExtended | ActiveTaskTypeExtended | ActiveFlowTypeExtended | UseCaseTypeExtended | ActionTypeExtended | DataEntityTypeExtended | DataEntitySubTypeExtended | DataEntityClusterTypeExtended | DataAttributeTypeExtended | ForeignKeyOnDeleteTypeExtended | UIContainerTypeExtended | UIContainerSubTypeExtended | UIComponentTypeExtended | UIComponentSubTypeExtended | UIWireframeTypeExtended | UIComponentPartTypeExtended | UIComponentPartSubTypeExtended | UIActionTypeExtended | UIPortDefinitionTypeExtended | UIThrowingEventTypeExtended | UISystemEventTypeExtended | UIActionEventTypeExtended | UIElementEventTypeExtended | UIElementEventSubTypeExtended | ContextDimensionDeviceTypeExtended | ScreenSizeCategoryTypeExtended | NetworkConnectivityTypeExtended | ContextDimensionSensorTypeExtended | SensorStatusTypeExtended | StereotypeTypeExtended 
;

SystemType infers SystemType:
    SystemTypeOriginal | SystemTypeExtendedRef 
;

SystemTypeExtended infers SystemTypeExtended:
    'SystemType' name=ID  (nameAlias=STRING )? ('[' ('description' description=STRING  )? ']' )?  
;

SystemTypeExtendedRef infers SystemTypeExtendedRef:
    ^type=[SystemTypeExtended:QualifiedName ] 
;

SystemTypeOriginal infers SystemTypeOriginal:
    ^type=('Business' | 'Application' | 'SoftwareSystem' | 'HardwareSystem' | 'Other' ) 
;

SystemSubType infers SystemSubType:
    SystemSubTypeOriginal | SystemSubTypeExtendedRef 
;

SystemSubTypeExtended infers SystemSubTypeExtended:
    'SystemSubType' name=ID  (nameAlias=STRING )? ('[' ('description' description=STRING  )? ']' )?  
;

SystemSubTypeExtendedRef infers SystemSubTypeExtendedRef:
    ^type=[SystemSubTypeExtended:QualifiedName ] 
;

SystemSubTypeOriginal infers SystemSubTypeOriginal:
    ^type=('Business_PublicSector' | 'Business_IT' | 'Business_Other' | 'Application_Web' | 'Application_Mobile' | 'Application_Desktop' | 'Application_Sensor' | 'Application_Actuator' | 'Application_Other' | 'SoftwareSystem_OS' | 'SoftwareSystem_VM' | 'SoftwareSystem_DBMS' | 'SoftwareSystem_WebServer' | 'SoftwareSystem_WebClient' | 'SoftwareSystem_EmailServer' | 'SoftwareSystem_EmailClient' | 'SoftwareSystem_OfficeTool' | 'SoftwareSystem_OtherServer' | 'SoftwareSystem_OtherClient' | 'SoftwareSystem_Other' | 'HardwareSystem_Server' | 'HardwareSystem_Desktop' | 'HardwareSystem_Laptop' | 'HardwareSystem_Smartphone' | 'HardwareSystem_Smartwatch' | 'HardwareSystem_Sensor' | 'HardwareSystem_Actuator' | 'HardwareSystem_Storage' | 'HardwareSystem_Printer' | 'HardwareSystem_Network' | 'HardwareSystem_Other' ) 
;

MetricType infers MetricType:
    MetricTypeOriginal | MetricTypeExtendedRef 
;

MetricTypeExtended infers MetricTypeExtended:
    'MetricType' name=ID  (nameAlias=STRING )? ('[' ('description' description=STRING  )? ']' )?  
;

MetricTypeExtendedRef infers MetricTypeExtendedRef:
    ^type=[MetricTypeExtended:QualifiedName ] 
;

MetricTypeOriginal infers MetricTypeOriginal:
    ^type=('Time_Day' | 'Time_Hour' | 'Time_Min' | 'Time_Sec' | 'Time_mSec' | 'Frequency_Hz' | 'Frequency_KHz' | 'Frequency_MHz' | 'Capacity_KByte' | 'Capacity_MByte' | 'Capacity_GByte' | 'Capacity_TByte' | 'Capacity_PByte' | 'Capacity_EByte' | 'Task' | 'Error' | 'Error_PerTask' | 'Click' | 'Range_LikertScale' | 'Range_Binary' | 'Range_Other' | 'Other' ) 
;

ActorType infers ActorType:
    ActorTypeOriginal | ActorTypeExtendedRef 
;

ActorTypeExtended infers ActorTypeExtended:
    'ActorType' name=ID  (nameAlias=STRING )? ('[' ('description' description=STRING  )? ']' )?  
;

ActorTypeExtendedRef infers ActorTypeExtendedRef:
    ^type=[ActorTypeExtended:QualifiedName ] 
;

ActorTypeOriginal infers ActorTypeOriginal:
    ^type=('User' | 'ExternalSystem' | 'Timer' ) 
;

ActiveEventType infers ActiveEventType:
    ActiveEventTypeOriginal | ActiveEventTypeExtendedRef 
;

ActiveEventTypeExtended infers ActiveEventTypeExtended:
    'ActiveEventType' name=ID  (nameAlias=STRING )? ('[' ('description' description=STRING  )? ']' )?  
;

ActiveEventTypeExtendedRef infers ActiveEventTypeExtendedRef:
    ^type=[ActiveEventTypeExtended:QualifiedName ] 
;

ActiveEventTypeOriginal infers ActiveEventTypeOriginal:
    ^type=('Send' | 'Receive' | 'Timer' | 'Terminate' | 'Cancel' | 'Error' | 'Signal' | 'Conditional' | 'Undefined' ) 
;

ActiveTaskType infers ActiveTaskType:
    ActiveTaskTypeOriginal | ActiveTaskTypeExtendedRef 
;

ActiveTaskTypeExtended infers ActiveTaskTypeExtended:
    'ActiveTaskType' name=ID  (nameAlias=STRING )? ('[' ('description' description=STRING  )? ']' )?  
;

ActiveTaskTypeExtendedRef infers ActiveTaskTypeExtendedRef:
    ^type=[ActiveTaskTypeExtended:QualifiedName ] 
;

ActiveTaskTypeOriginal infers ActiveTaskTypeOriginal:
    ^type=('Manual' | 'User' | 'Service' | 'Send' | 'Receive' | 'Script' | 'BusinessRule' | 'Undefined' ) 
;

ActiveFlowType infers ActiveFlowType:
    ActiveFlowTypeOriginal | ActiveFlowTypeExtendedRef 
;

ActiveFlowTypeExtended infers ActiveFlowTypeExtended:
    'ActiveFlowType' name=ID  (nameAlias=STRING )? ('[' ('description' description=STRING  )? ']' )?  
;

ActiveFlowTypeExtendedRef infers ActiveFlowTypeExtendedRef:
    ^type=[ActiveFlowTypeExtended:QualifiedName ] 
;

ActiveFlowTypeOriginal infers ActiveFlowTypeOriginal:
    ^type=('Sequence' | 'SequenceConditional' | 'Parallel' ) 
;

UseCaseType infers UseCaseType:
    UseCaseTypeOriginal | UseCaseTypeExtendedRef 
;

UseCaseTypeExtended infers UseCaseTypeExtended:
    'UseCaseType' name=ID  (nameAlias=STRING )? ('[' ('description' description=STRING  )? ']' )?  
;

UseCaseTypeExtendedRef infers UseCaseTypeExtendedRef:
    ^type=[UseCaseTypeExtended:QualifiedName ] 
;

UseCaseTypeOriginal infers UseCaseTypeOriginal:
    ^type=('EntityCreate' | 'EntityRead' | 'EntityUpdate' | 'EntityDelete' | 'EntityReport' | 'EntityDashboard' | 'EntityOther' | 'EntitiesManage' | 'EntitiesBrowse' | 'EntitiesSearch' | 'EntitiesReport' | 'EntitiesDashboard' | 'EntitiesInteropImport' | 'EntitiesInteropExport' | 'EntitiesInteropSync' | 'EntitiesInteropSendMessage' | 'EntitiesInteropServiceInvocation' | 'EntitiesMapShow' | 'EntitiesMapInteract' | 'EntitiesOther' | 'Other' ) 
;

ActionType infers ActionType:
    ActionTypeOriginal | ActionTypeExtendedRef 
;

ActionTypeExtended infers ActionTypeExtended:
    'ActionType' name=ID  (nameAlias=STRING )? ('[' ('description' description=STRING  )? ']' )?  
;

ActionTypeExtendedRef infers ActionTypeExtendedRef:
    ^type=[ActionTypeExtended:QualifiedName ] 
;

ActionTypeOriginal infers ActionTypeOriginal:
    ^type=('aCreate' | 'aRead' | 'aUpdate' | 'aDelete' ) 
;

DataEntityType infers DataEntityType:
    DataEntityTypeOriginal | DataEntityTypeExtendedRef 
;

DataEntityTypeExtended infers DataEntityTypeExtended:
    'DataEntityType' name=ID  (nameAlias=STRING )? ('[' ('description' description=STRING  )? ']' )?  
;

DataEntityTypeExtendedRef infers DataEntityTypeExtendedRef:
    ^type=[DataEntityTypeExtended:QualifiedName ] 
;

DataEntityTypeOriginal infers DataEntityTypeOriginal:
    ^type=('Parameter' | 'Reference' | 'Master' | 'Document' | 'Transaction' | 'Multidimensional' | 'Other' ) 
;

DataEntitySubType infers DataEntitySubType:
    DataEntitySubTypeOriginal | DataEntitySubTypeExtendedRef 
;

DataEntitySubTypeExtended infers DataEntitySubTypeExtended:
    'DataEntitySubType' name=ID  (nameAlias=STRING )? ('[' ('description' description=STRING  )? ']' )?  
;

DataEntitySubTypeExtendedRef infers DataEntitySubTypeExtendedRef:
    ^type=[DataEntitySubTypeExtended:QualifiedName ] 
;

DataEntitySubTypeOriginal infers DataEntitySubTypeOriginal:
    ^type=('Regular' | 'Weak' | 'Fact' | 'Dimension' | 'Other' ) 
;

DataEntityClusterType infers DataEntityClusterType:
    DataEntityClusterTypeOriginal | DataEntityClusterTypeExtendedRef 
;

DataEntityClusterTypeExtended infers DataEntityClusterTypeExtended:
    'DataEntityClusterType' name=ID  (nameAlias=STRING )? ('[' ('description' description=STRING  )? ']' )?  
;

DataEntityClusterTypeExtendedRef infers DataEntityClusterTypeExtendedRef:
    ^type=[DataEntityClusterTypeExtended:QualifiedName ] 
;

DataEntityClusterTypeOriginal infers DataEntityClusterTypeOriginal:
    ^type=('Parameter' | 'Reference' | 'Master' | 'Document' | 'Transaction' | 'Multidimensional' | 'Other' ) 
;

DataAttributeType infers DataAttributeType:
    (DataAttributeTypeOriginal ('(' size=DoubleOrInt  ')' )?  | DataAttributeTypeExtendedRef | ('DataEnumeration' DataEnumerationRef ) )
;

DataAttributeTypeExtended infers DataAttributeTypeExtended:
    'DataAttributeType' name=ID  (nameAlias=STRING )? ('[' ('description' description=STRING  )? ']' )?  
;

DataAttributeTypeExtendedRef infers DataAttributeTypeExtendedRef:
    ^type=[DataAttributeTypeExtended:QualifiedName ] 
;

DataAttributeTypeOriginal infers DataAttributeTypeOriginal:
    ^type=('Integer' | 'Double' | 'Decimal' | 'Boolean' | 'Bit' | 'Currency' | 'Date' | 'Time' | 'Datetime' | 'String' | 'Text' | 'Regex' | 'URL' | 'Email' | 'File' | 'Image' | 'XML' | 'Binary' | 'FilePath' ) 
;

ForeignKeyOnDeleteType infers ForeignKeyOnDeleteType:
    ForeignKeyOnDeleteTypeOriginal | ForeignKeyOnDeleteTypeExtendedRef 
;

ForeignKeyOnDeleteTypeExtended infers ForeignKeyOnDeleteTypeExtended:
    'ForeignKeyOnDeleteType' name=ID  (nameAlias=STRING )? ('[' ('description' description=STRING  )? ']' )?  
;

ForeignKeyOnDeleteTypeExtendedRef infers ForeignKeyOnDeleteTypeExtendedRef:
    ^type=[ForeignKeyOnDeleteTypeExtended:QualifiedName ] 
;

ForeignKeyOnDeleteTypeOriginal infers ForeignKeyOnDeleteTypeOriginal:
    ^type=('CASCADE' | 'PROTECT' | 'SET_NULL' | 'SET_DEFAULT' ) 
;

UIContainerType infers UIContainerType:
    UIContainerTypeOriginal | UIContainerTypeExtendedRef 
;

UIContainerTypeExtended infers UIContainerTypeExtended:
    'UIContainerType' name=ID  (nameAlias=STRING )? ('[' ('description' description=STRING  )? ']' )?  
;

UIContainerTypeExtendedRef infers UIContainerTypeExtendedRef:
    ^type=[UIContainerTypeExtended:QualifiedName ] 
;

UIContainerTypeOriginal infers UIContainerTypeOriginal:
    ^type=('Window' | 'Menu' | 'Other' ) 
;

UIContainerSubType infers UIContainerSubType:
    UIContainerSubTypeOriginal | UIContainerSubTypeExtendedRef 
;

UIContainerSubTypeExtended infers UIContainerSubTypeExtended:
    'UIContainerSubType' name=ID  (nameAlias=STRING )? ('[' ('description' description=STRING  )? ']' )?  
;

UIContainerSubTypeExtendedRef infers UIContainerSubTypeExtendedRef:
    ^type=[UIContainerSubTypeExtended:QualifiedName ] 
;

UIContainerSubTypeOriginal infers UIContainerSubTypeOriginal:
    ^type=('Window_Modal' | 'Window_Modeless' | 'Menu_Main' | 'Menu_Contextual' | 'Other' ) 
;

UIComponentType infers UIComponentType:
    UIComponentTypeOriginal | UIComponentTypeExtendedRef 
;

UIComponentTypeExtended infers UIComponentTypeExtended:
    'UIComponentType' name=ID  (nameAlias=STRING )? ('[' ('description' description=STRING  )? ']' )?  
;

UIComponentTypeExtendedRef infers UIComponentTypeExtendedRef:
    ^type=[UIComponentTypeExtended:QualifiedName ] 
;

UIComponentTypeOriginal infers UIComponentTypeOriginal:
    ^type=('List' | 'Details' | 'Form' | 'Dialog' | 'Menu' ) 
;

UIComponentSubType infers UIComponentSubType:
    UIComponentSubTypeOriginal | UIComponentSubTypeExtendedRef 
;

UIComponentSubTypeExtended infers UIComponentSubTypeExtended:
    'UIComponentSubType' name=ID  (nameAlias=STRING )? ('[' ('description' description=STRING  )? ']' )?  
;

UIComponentSubTypeExtendedRef infers UIComponentSubTypeExtendedRef:
    ^type=[UIComponentSubTypeExtended:QualifiedName ] 
;

UIComponentSubTypeOriginal infers UIComponentSubTypeOriginal:
    ^type=('List_MultiChoice' | 'List_Tree' | 'List_Table' | 'List_Nested' | 'Form_Simple' | 'Form_MasterDetail' | 'Form_Other' | 'Dialog_Success' | 'Dialog_Error' | 'Dialog_Warning' | 'Dialog_Info' | 'Dialog_Message' | 'Menu_Main' | 'Menu_Contextual' | 'Other' ) 
;

UIWireframeType infers UIWireframeType:
    UIWireframeTypeOriginal | UIWireframeTypeExtendedRef 
;

UIWireframeTypeExtended infers UIWireframeTypeExtended:
    'UIWireframeType' name=ID  (nameAlias=STRING )? ('[' ('description' description=STRING  )? ']' )?  
;

UIWireframeTypeExtendedRef infers UIWireframeTypeExtendedRef:
    ^type=[UIWireframeTypeExtended:QualifiedName ] 
;

UIWireframeTypeOriginal infers UIWireframeTypeOriginal:
    ^type=('WFC_Button' | 'WFC_CheckBox' | 'WFC_ComboBox' | 'WFC_Image' | 'WFC_Label' | 'WFC_List' | 'WFC_RadioButton' | 'WFC_Table' | 'WFC_AudioPlayer' | 'WFC_VideoPlayer' | 'WFC_Calendar' | 'WFC_Header' | 'WFC_Hyperlink' | 'WFC_Paragraph' | 'WFC_ProgressBar' | 'WFC_Tab' | 'WFC_Text' | 'Other' ) 
;

UIComponentPartType infers UIComponentPartType:
    UIComponentPartTypeOriginal | UIComponentPartTypeExtendedRef 
;

UIComponentPartTypeExtended infers UIComponentPartTypeExtended:
    'UIComponentPartType' name=ID  (nameAlias=STRING )? ('[' ('description' description=STRING  )? ']' )?  
;

UIComponentPartTypeExtendedRef infers UIComponentPartTypeExtendedRef:
    ^type=[UIComponentPartTypeExtended:QualifiedName ] 
;

UIComponentPartTypeOriginal infers UIComponentPartTypeOriginal:
    ^type=('Field' | 'Slot' | 'Other' ) 
;

UIComponentPartSubType infers UIComponentPartSubType:
    UIComponentPartSubTypeOriginal | UIComponentPartSubTypeExtendedRef 
;

UIComponentPartSubTypeExtended infers UIComponentPartSubTypeExtended:
    'UIComponentPartSubType' name=ID  (nameAlias=STRING )? ('[' ('description' description=STRING  )? ']' )?  
;

UIComponentPartSubTypeExtendedRef infers UIComponentPartSubTypeExtendedRef:
    ^type=[UIComponentPartSubTypeExtended:QualifiedName ] 
;

UIComponentPartSubTypeOriginal infers UIComponentPartSubTypeOriginal:
    ^type=('Field_Output' | 'Field_Input' | 'Field_Selection' | 'Field_EditableSelection' | 'Slot_MenuGroup' | 'Slot_MenuOption' | 'Slot_MenuSeparator' | 'Slot_Other' | 'Other' ) 
;

UIActionType infers UIActionType:
    UIActionTypeOriginal | UIActionTypeExtendedRef 
;

UIActionTypeExtended infers UIActionTypeExtended:
    'UIActionType' name=ID  (nameAlias=STRING )? ('[' ('description' description=STRING  )? ']' )?  
;

UIActionTypeExtendedRef infers UIActionTypeExtendedRef:
    ^type=[UIActionTypeExtended:QualifiedName ] 
;

UIActionTypeOriginal infers UIActionTypeOriginal:
    ^type=('Server' | 'Client' | 'NotSpecified' ) 
;

UIPortDefinitionType infers UIPortDefinitionType:
    UIPortDefinitionTypeOriginal | UIPortDefinitionTypeExtendedRef 
;

UIPortDefinitionTypeExtended infers UIPortDefinitionTypeExtended:
    'UIPortDefinitionType' name=ID  (nameAlias=STRING )? ('[' ('description' description=STRING  )? ']' )?  
;

UIPortDefinitionTypeExtendedRef infers UIPortDefinitionTypeExtendedRef:
    ^type=[UIPortDefinitionTypeExtended:QualifiedName ] 
;

UIPortDefinitionTypeOriginal infers UIPortDefinitionTypeOriginal:
    ^type='NotSpecified'  
;

UIThrowingEventType infers UIThrowingEventType:
    UIThrowingEventTypeOriginal | UIThrowingEventTypeExtendedRef 
;

UIThrowingEventTypeExtended infers UIThrowingEventTypeExtended:
    'UIThrowingEventType' name=ID  (nameAlias=STRING )? ('[' ('description' description=STRING  )? ']' )?  
;

UIThrowingEventTypeExtendedRef infers UIThrowingEventTypeExtendedRef:
    ^type=[UIThrowingEventTypeExtended:QualifiedName ] 
;

UIThrowingEventTypeOriginal infers UIThrowingEventTypeOriginal:
    ^type=('SetContext' | 'Jump' ) 
;

UISystemEventType infers UISystemEventType:
    UISystemEventTypeOriginal | UISystemEventTypeExtendedRef 
;

UISystemEventTypeExtended infers UISystemEventTypeExtended:
    'UISystemEventType' name=ID  (nameAlias=STRING )? ('[' ('description' description=STRING  )? ']' )?  
;

UISystemEventTypeExtendedRef infers UISystemEventTypeExtendedRef:
    ^type=[UISystemEventTypeExtended:QualifiedName ] 
;

UISystemEventTypeOriginal infers UISystemEventTypeOriginal:
    ^type=('Time' | 'SystemAlert' | 'SystemMessage' | 'Other' ) 
;

UIActionEventType infers UIActionEventType:
    UIActionEventTypeOriginal | UIActionEventTypeExtendedRef 
;

UIActionEventTypeExtended infers UIActionEventTypeExtended:
    'UIActionEventType' name=ID  (nameAlias=STRING )? ('[' ('description' description=STRING  )? ']' )?  
;

UIActionEventTypeExtendedRef infers UIActionEventTypeExtendedRef:
    ^type=[UIActionEventTypeExtended:QualifiedName ] 
;

UIActionEventTypeOriginal infers UIActionEventTypeOriginal:
    ^type=('Normal' | 'Exception' | 'Other' ) 
;

UIElementEventType infers UIElementEventType:
    UIElementEventTypeOriginal | UIElementEventTypeExtendedRef 
;

UIElementEventTypeExtended infers UIElementEventTypeExtended:
    'UIElementEventType' name=ID  (nameAlias=STRING )? ('[' ('description' description=STRING  )? ']' )?  
;

UIElementEventTypeExtendedRef infers UIElementEventTypeExtendedRef:
    ^type=[UIElementEventTypeExtended:QualifiedName ] 
;

UIElementEventTypeOriginal infers UIElementEventTypeOriginal:
    ^type=('Select' | 'Submit' | 'Other' ) 
;

UIElementEventSubType infers UIElementEventSubType:
    UIElementEventSubTypeOriginal | UIElementEventSubTypeExtendedRef 
;

UIElementEventSubTypeExtended infers UIElementEventSubTypeExtended:
    'UIElementEventSubType' name=ID  (nameAlias=STRING )? ('[' ('description' description=STRING  )? ']' )?  
;

UIElementEventSubTypeExtendedRef infers UIElementEventSubTypeExtendedRef:
    ^type=[UIElementEventSubTypeExtended:QualifiedName ] 
;

UIElementEventSubTypeOriginal infers UIElementEventSubTypeOriginal:
    ^type=('Submit_Create' | 'Submit_Read' | 'Submit_Update' | 'Submit_Delete' | 'Submit_Up' | 'Submit_Back' | 'Submit_Ok' | 'Submit_Cancel' | 'Other' ) 
;

ContextDimensionDeviceType infers ContextDimensionDeviceType:
    ContextDimensionDeviceTypeOriginal | ContextDimensionDeviceTypeExtendedRef 
;

ContextDimensionDeviceTypeExtended infers ContextDimensionDeviceTypeExtended:
    'ContextDimensionDeviceType' name=ID  (nameAlias=STRING )? ('[' ('description' description=STRING  )? ']' )?  
;

ContextDimensionDeviceTypeExtendedRef infers ContextDimensionDeviceTypeExtendedRef:
    ^type=[ContextDimensionDeviceTypeExtended:QualifiedName ] 
;

ContextDimensionDeviceTypeOriginal infers ContextDimensionDeviceTypeOriginal:
    ^type=('Desktop' | 'Laptop' | 'Smartphone' | 'Tablet' | 'Any' | 'Other' ) 
;

ScreenSizeCategoryType infers ScreenSizeCategoryType:
    ScreenSizeCategoryTypeOriginal | ScreenSizeCategoryTypeExtendedRef 
;

ScreenSizeCategoryTypeExtended infers ScreenSizeCategoryTypeExtended:
    'ScreenSizeCategoryType' name=ID  (nameAlias=STRING )? ('[' ('description' description=STRING  )? ']' )?  
;

ScreenSizeCategoryTypeExtendedRef infers ScreenSizeCategoryTypeExtendedRef:
    ^type=[ScreenSizeCategoryTypeExtended:QualifiedName ] 
;

ScreenSizeCategoryTypeOriginal infers ScreenSizeCategoryTypeOriginal:
    ^type=('Small' | 'Normal' | 'Large' | 'ExtraLarge' | 'Any' ) 
;

NetworkConnectivityType infers NetworkConnectivityType:
    NetworkConnectivityTypeOriginal | NetworkConnectivityTypeExtendedRef 
;

NetworkConnectivityTypeExtended infers NetworkConnectivityTypeExtended:
    'NetworkConnectivityType' name=ID  (nameAlias=STRING )? ('[' ('description' description=STRING  )? ']' )?  
;

NetworkConnectivityTypeExtendedRef infers NetworkConnectivityTypeExtendedRef:
    ^type=[NetworkConnectivityTypeExtended:QualifiedName ] 
;

NetworkConnectivityTypeOriginal infers NetworkConnectivityTypeOriginal:
    ^type=('None' | 'BLUETOOTH' | 'WIFI' | 'WIMAX' | 'Any' ) 
;

ContextDimensionSensorType infers ContextDimensionSensorType:
    ContextDimensionSensorTypeOriginal | ContextDimensionSensorTypeExtendedRef 
;

ContextDimensionSensorTypeExtended infers ContextDimensionSensorTypeExtended:
    'ContextDimensionSensorType' name=ID  (nameAlias=STRING )? ('[' ('description' description=STRING  )? ']' )?  
;

ContextDimensionSensorTypeExtendedRef infers ContextDimensionSensorTypeExtendedRef:
    ^type=[ContextDimensionSensorTypeExtended:QualifiedName ] 
;

ContextDimensionSensorTypeOriginal infers ContextDimensionSensorTypeOriginal:
    ^type=('Microphone' | 'Camera' | 'Localization' | 'Temperature' | 'Proximity' | 'Accelerometer' | 'Infrared' | 'Pressure' | 'Light' | 'Touch' | 'Color' | 'Humidity' | 'Fingerprint' | 'IrisScanner' | 'HeartRate' | 'Other' ) 
;

SensorStatusType infers SensorStatusType:
    SensorStatusTypeOriginal | SensorStatusTypeExtendedRef 
;

SensorStatusTypeExtended infers SensorStatusTypeExtended:
    'SensorStatusType' name=ID  (nameAlias=STRING )? ('[' ('description' description=STRING  )? ']' )?  
;

SensorStatusTypeExtendedRef infers SensorStatusTypeExtendedRef:
    ^type=[SensorStatusTypeExtended:QualifiedName ] 
;

SensorStatusTypeOriginal infers SensorStatusTypeOriginal:
    ^type=('Active' | 'Inactive' | 'NotDefined' ) 
;

UserActivityStatusType infers UserActivityStatusType:
    UserActivityStatusTypeOriginal | UserActivityStatusTypeExtendedRef 
;

UserActivityStatusTypeExtended infers UserActivityStatusTypeExtended:
    'UserActivityStatusType' name=ID  (nameAlias=STRING )? ('[' ('description' description=STRING  )? ']' )?  
;

UserActivityStatusTypeExtendedRef infers UserActivityStatusTypeExtendedRef:
    ^type=[UserActivityStatusTypeExtended:QualifiedName ] 
;

UserActivityStatusTypeOriginal infers UserActivityStatusTypeOriginal:
    ^type=('Still' | 'Walking' | 'Running' | 'Cycling' | 'In-vehicle' | 'NotDefined' ) 
;

StereotypeType infers StereotypeType:
    StereotypeTypeOriginal | StereotypeTypeExtendedRef 
;

StereotypeTypeExtended infers StereotypeTypeExtended:
    'StereotypeType' name=ID  (nameAlias=STRING )? ('[' ('description' description=STRING  )? ']' )?  
;

StereotypeTypeExtendedRef infers StereotypeTypeExtendedRef:
    ^type=[StereotypeTypeExtended:QualifiedName ] 
;

StereotypeTypeOriginal infers StereotypeTypeOriginal:
    ^type=('System' | 'Actor' | 'ActiveTask' | 'ActiveEvent' | 'UseCase' | 'DataEntity' | 'DataEntityCluster' | 'Other' ) 
;

IncludeSystemElementType infers IncludeSystemElementType:
    ^type=('UseCase' | 'Actor' | 'DataEntity' | 'DataEntityCluster' | 'DataEnumeration' | 'ActiveEvent' | 'ActiveTask' | 'ActiveFlow' ) 
;

PackageAbstract infers PackageAbstract:
    PackageSystem 
;

PackageSystem infers PackageSystem:
    'Package' name=QualifiedName  (imports+=Import )* (system=System )  
;

System infers System:
    'System' name=ID  (nameAlias=STRING )? ':' ^type=SystemType  (':' subType=SystemSubType  )? ('[' ((isReusable?='isReusable' ) | (isFinal?='isFinal' ) )?(isTestSuite?='isTestSuite'  ('systemUnderTest' sut=[System:ID ] ) )? ('partOf' partOf=[System:ID ] )? ('vendor' vendor=STRING  )? ('version' version=STRING  )? (tags+=Tag )* ('description' description=STRING  )? ']' )? systemConcepts+=SystemConcept *  
;

RefSystems infers RefSystems:
    refs+=[System:ID ] (',' refs+=[System:ID ] )*  
;

SystemConcept infers SystemConcept:
    SystemElement 
;

SystemElement infers SystemElement:
    StructureElement | BehaviorElement | OtherElement | IncludeElementGeneric | UIModelElement | SystemSet 
;

StructureElement infers StructureElement:
    ActiveStructureElement | PassiveStructureElement 
;

PassiveStructureElement infers PassiveStructureElement:
    DataEnumeration | DataEntityGeneric | Data 
;

DataEntityGeneric infers DataEntityGeneric:
    DataEntity | DataEntityCluster 
;

ActiveStructureElement infers ActiveStructureElement:
    ContextDimension 
;

BehaviorElement infers BehaviorElement:
    UseCase | ActiveElement 
;

OtherElement infers OtherElement:
    Stereotype | Context | TypeExtended 
;

IncludeElementGeneric infers IncludeElementGeneric:
    IncludeAll | IncludeElement 
;

SystemSet infers SystemSet:
    View | Theme 
;

UIModelElement infers UIModelElement:
    FlowElement | UIParameter | UIParameterBinding | UIParameterBindingGroup | UIExpression 
;

FlowElement infers FlowElement:
    UIElement | UIComponentPart | UIAction | UIPortDefinition | UIEvent 
;

UIElement infers UIElement:
    UIContainer | UIComponent | UIComponentRef 
;

UIContainer infers UIContainer:
    'UIContainer' name=ID  (nameAlias=STRING )? ':' ^type=UIContainerType  (':' subType=UIContainerSubType  )? ('[' (isLandmark?='isLandmark' )? (isDefault?='isDefault' )? (isXOR?='isXOR' )? ('activationExpression' activationExpression=UIExpression  )? ('navigationFlowTo' flowsTo=RefFlowTo  )? (uiElements+=UIElement )* (uiActions+=UIAction )* (uiElementEvents+=UIElementEvent )* (uiParameters+=UIParameter )* (tags+=Tag )* ('description' description=STRING  )? ']' )?  
;

RefFlowTo infers RefFlowTo:
    refFlowTo+=[FlowElement:ID ] (parameterBindingGroup+=UIParameterBindingGroup )? (',' refFlowTo+=[FlowElement:ID ] (parameterBindingGroup+=UIParameterBindingGroup )? )*  
;

UIComponentRef infers UIComponentRef:
    'component' ref=[UIComponent:QualifiedName ]  
;

UIComponent infers UIComponent:
    'component' name=ID  (nameAlias=STRING )? ':' ^type=UIComponentType  (':' subType=UIComponentSubType  )? ('[' (isActive?='isActive' )? (isScrollable?='isScrollable' )? (isSlider?='isSlider' )? (title=STRING )? (message=STRING )? ('activationExpression' uiActivationExpression=UIExpression  )? ('dataBinding' dataEntity=[DataEntityGeneric:QualifiedName ] ('[' ('visualizationAttributes' displayAttributes=DataAttributeRefsList  )? ('searchAttributes' searchAttributes=DataAttributeRefsList  )? ('filterAttributes' filterAttributes=DataAttributeRefsList  )? ('sortAttributes' sortAttributes=DataAttributeRefsList  )? ('conditionalExpression' filterExpression=UIExpression  )? ('orderBy' orderBy=[DataAttribute:QualifiedName ] ('DESC' | 'ASC' )?)? ']' )? )? ('recursiveNestedDataBinding' rnDataEntity=[DataEntityGeneric:QualifiedName ] ('[' ('visualizationAttributes' drnDisplayAttributes=DataAttributeRefsList  )? ('sortAttributes' rnSortAttributes=DataAttributeRefsList  )? ('conditionalExpression' rnFilterExpression=UIExpression  )? ('orderBy' rnOrderBy=[DataAttribute:QualifiedName ] ('DESC' | 'ASC' )?)? )? )? ('dataFlowTo' dataFlowTos+=[UIComponent:ID ] (dataParameterBindingGroups+=UIParameterBindingGroup )? )* (uiComponentParts+=UIComponentPart )* (uiElementEvents+=UIElementEvent )* (uiParameters+=UIParameter )* (tags+=Tag )* ('description' description=STRING  )? ']' )?  
;

UIComponentPart infers UIComponentPart:
    'part' name=ID  (nameAlias=STRING )? ':' ^type=UIComponentPartType  (':' subType=UIComponentPartSubType  (':' wireframeType=UIWireframeType  )? )? ('[' (valueType=DataAttributeType )? (isReadOnly?='isReadOnly' )? (isHidden?='isHidden' )? ('defaultValue' defaultValue=STRING  )? ('activationExpression' uiActivationExpression=UIExpression  )? ('showIf' showIf=Expression  )? ('blockIf' blockIf=Expression  )? ('dataBinding' dataEntity=[DataEntityGeneric:QualifiedName ] ('[' ('visualizationAttributes' displayAttributes=DataAttributeRefsList  )? ('searchAttributes' searchAttributes=DataAttributeRefsList  )? ('filterAttributes' filterAttributes=DataAttributeRefsList  )? ('sortAttributes' sortAttributes=DataAttributeRefsList  )? ('conditionalExpression' filterExpression=UIExpression  )? ('orderBy' orderBy=[DataAttribute:QualifiedName ] ('DESC' | 'ASC' )?)? ']' )? )? ('dataAttributeBinding' dataAttributeBinding=[DataAttribute:QualifiedName ] )? (uiComponentParts+=UIComponentPart )* (uiElementEvents+=UIElementEvent )* (tags+=Tag )* ('description' description=STRING  )? ']' )?  
;

UIAction infers UIAction:
    'action' name=ID  (nameAlias=STRING )? ':' ^type=UIActionType  ('[' (uiActionEvents+=UIActionEvent )* (uiParameters+=UIParameter )* (tags+=Tag )* ('description' description=STRING  )? ']' )?  
;

UIPortDefinition infers UIPortDefinition:
    'uiPortDefinition' name=ID  (nameAlias=STRING )? ':' ^type=UIPortDefinitionType  ('[' (uiParameters+=UIParameter )* (tags+=Tag )* ('description' description=STRING  )? ']' )?  
;

UIEvent infers UIEvent:
    UIThrowingEvent | UICatchingEvent 
;

UIThrowingEvent infers UIThrowingEvent:
    'throwingEvent' name=ID  (nameAlias=STRING )? ':' ^type=UIThrowingEventType  ('[' (uiParameters+=UIParameter )* ('interactionFlowExpression' uiInteractionFlowExpression=UIExpression  )? ('activationExpression' uiActivationExpression=UIExpression  )? ('navigationFlowTo' flowsTo=RefFlowTo  )? (tags+=Tag )* ('description' description=STRING  )? ']' )?  
;

UICatchingEvent infers UICatchingEvent:
    UISystemEvent | UIActionEvent | UIElementEvent 
;

UISystemEvent infers UISystemEvent:
    'event' name=ID  (nameAlias=STRING )? ':' ^type=UISystemEventType  ('[' (uiParameters+=UIParameter )* ('interactionFlowExpression' interactionFlowExpression=UIExpression  )? ('activationExpression' activationExpression=UIExpression  )? ('triggeringExpressions' triggeringExpressions+=UIExpression + )? ('navigationFlowTo' flowsTo=RefFlowTo  )? (tags+=Tag )* ('description' description=STRING  )? ']' )?  
;

UIActionEvent infers UIActionEvent:
    'event' name=ID  (nameAlias=STRING )? ':' ^type=UIActionEventType  ('[' (uiParameters+=UIParameter )* ('interactionFlowExpression' interactionFlowExpression=UIExpression  )? ('activationExpression' activationExpression=UIExpression  )? ('navigationFlowTo' flowsTo=RefFlowTo  )? (tags+=Tag )* ('description' description=STRING  )? ']' )?  
;

UIElementEvent infers UIElementEvent:
    'event' name=ID  (nameAlias=STRING )? ':' ^type=UIElementEventType  (':' subType=UIElementEventSubType  )? ('[' (uiParameters+=UIParameter )* ('interactionFlowExpression' interactionFlowExpression+=UIExpression  )? ('activationExpression' activationExpression+=UIExpression  )? ('navigationFlowTo' flowsTo=RefFlowTo  )? (tags+=Tag )* ('description' description=STRING  )? ']' )?  
;

UIParameterBindingGroup infers UIParameterBindingGroup:
    'withParameters' (uiParameterBindings+=UIParameterBinding ) (',' uiParameterBindings+=UIParameterBinding  )*  
;

UIParameterBinding infers UIParameterBinding:
    '(' source=UIParameter  '->' target=UIParameter  ')'  
;

UIParameter infers UIParameter:
    name=ID  (nameAlias=STRING )?  
;

UISimpleExpression infers UISimpleExpression:
    expression=STRING  ('[' ('language' language=STRING  ) ('body' body=STRING  ) ']' )?  
;

UIContextExpression infers UIContextExpression:
    'validContext' validContext=[Context:ID ]  
;

UIExpression infers UIExpression:
    UISimpleExpression | UIContextExpression 
;

ActiveElement infers ActiveElement:
    ActiveEvent | ActiveTask | ActiveFlow 
;

RefActiveElement infers RefActiveElement:
    refActiveElement+=[ActiveElement:QualifiedName ] (',' refActiveElement+=[ActiveElement:QualifiedName ] )+  
;

ActiveEvent infers ActiveEvent:
    'Event' name=ID  (nameAlias=STRING )? ':' ^type=ActiveEventType  ('[' (isInitial?='isInitial' )? (isFinal?='isFinal' )? (tags+=Tag )* ('description' description=STRING  )? ']' )?  
;

ActiveTask infers ActiveTask:
    'Task' name=ID  (nameAlias=STRING )? ':' ^type=ActiveTaskType  ('[' ('partOf' ('optional' | 'mandatory' )?partOf=[ActiveTask:QualifiedName ] )? (tags+=Tag )* ('description' description=STRING  )? ']' )?  
;

ActiveFlow infers ActiveFlow:
    'TaskFlow' name=ID  (nameAlias=STRING )? ':' ^type=ActiveFlowType  ('[' ('condition' condition=STRING  )? 'activeElements' activeElements=RefActiveElement  (tags+=Tag )* ('description' description=STRING  )? ']' )?  
;

DataEntity infers DataEntity:
    'DataEntity' name=ID  (nameAlias=STRING )? ':' ^type=DataEntityType  (':' subType=DataEntitySubType  )? ('[' ('isA' super=[DataEntity:QualifiedName ] )? (attributes+=DataAttribute )* (constraint=DataEntityConstraint )? (tags+=Tag )* ('description' description=STRING  )? ']' )?  
;

DataAttribute infers DataAttribute:
    'attribute' name=ID  (nameAlias=STRING )? ':' ^type=DataAttributeType  ('[' ('defaultValue' defaultValue=STRING  )? ('values' values=STRING  )? ('formula' formula=Formula  )? ('visualization' visualizatione=STRING  )? ('helpMessage' helpMessage=STRING  )? (constraint=DataAttributeConstraint )? (tags+=Tag )* ('description' description=STRING  )? ']' )?  
;

DataAttributeRefsList infers DataAttributeRefsList:
    (attributeRef+=[DataAttribute:QualifiedName ]) (',' attributeRef+=[DataAttribute:QualifiedName ] )*  
;

DataEntityConstraint infers DataEntityConstraint:
    { infer DataEntityConstraint} 'constraints' '(' (isReadOnly='ReadOnly' )? (isEncrypted='Encrypted' )? ('showAs' '(' showAsAttribute=[DataAttribute:QualifiedName ] ')' )? (checks+=Check )* ')'  
;

DataAttributeConstraint infers DataAttributeConstraint:
    { infer DataAttributeConstraint} 'constraints' '(' ('multiplicity' multiplicity=Multiplicity  )? (isPrimaryKey='PrimaryKey' )? (isNotNull='NotNull' )? (isUnique='Unique' )? ('Derived' '(' derivedFrom=Expression  ')' )? (isReadOnly='ReadOnly' )? (isNotVisible='NotVisible' )? (isEncrypted='Encrypted' )? (foreignKey=ForeignKey )? (manyToMany=ManyToMany )? (checks+=Check )* ')'  
;

DataEnumeration infers DataEnumeration:
    'DataEnumeration' name=ID  (nameAlias=STRING )? 'values' '(' values+=DataEnumerationElement  (',' values+=DataEnumerationElement  )* ')' ('[' (tags+=Tag )* ('description' description=STRING  )? ']' )?  
;

DataEnumerationElement infers DataEnumerationElement:
    name=ID  (nameAlias=STRING )?  
;

DataEnumerationRef infers DataEnumerationRef:
    ^type=[DataEnumeration:QualifiedName ] 
;

Data infers Data:
    'Data' name=ID  (nameAlias=STRING )? ':' ^type=[DataEntity:QualifiedName ] (':=' table=DataTable  )? ('[' (tags+=Tag )* ('description' description=STRING  )? ']' )?  
;

DataTable infers DataTable:
    '[' (tableHeader=DataTableHeader ) (tableRows+=DataTableRow )* ']'  
;

DataTableHeader infers DataTableHeader:
    '[' (attributeRefs+=[DataAttribute:QualifiedName ]) ("," attributeRefs+=[DataAttribute:QualifiedName ] )* "]"  
;

DataTableRow infers DataTableRow:
    '[' (attributeValues+=AttributeValue ) ("," attributeValues+=AttributeValue  )* "]"  
;

ForeignKey infers ForeignKey:
    'ForeignKey' '(' targetEntity=[DataEntity:QualifiedName ] ('toField' toField=[DataAttribute:QualifiedName ] )? ('showAsField' showAsField=[DataAttribute:QualifiedName ] )? ('defaultValue' defaultValue=STRING  )? ('onDelete' onDelete=ForeignKeyOnDeleteType  )? ')'  
;

ManyToMany infers ManyToMany:
    'ManyToMany' '(' targetEntity=[DataEntity:QualifiedName ] ('throughEntity' throughEntity=[DataEntity:QualifiedName ] )? ('throughSourceField' throughSourceField=[DataAttribute:QualifiedName ] )? ('throughTargetField' throughTargetField=[DataAttribute:QualifiedName ] )? ')'  
;

Check infers Check:
    'Check' '(' name=ID  checkExpression=STRING  ')'  
;

DataEntityCluster infers DataEntityCluster:
    'DataEntityCluster' name=ID  (nameAlias=STRING )? ':' ^type=DataEntityClusterType  ('[' ('main' main=[DataEntity:QualifiedName ] ) (children+=ChildDataEntity )* ('uses' uses=RefDataEntity  )? (tags+=Tag )* ('description' description=STRING  )? ']' )?  
;

ChildDataEntity infers ChildDataEntity:
    'child' child=[DataEntity:QualifiedName ] ('[' 'uses' childUses=RefDataEntity  ']' )?  
;

RefDataEntity infers RefDataEntity:
    refDataEntity+=[DataEntity:QualifiedName ] (',' refDataEntity+=[DataEntity:QualifiedName ] )*  
;

Context infers Context:
    'Context' name=ID  (nameAlias=STRING )? ('[' ('actor' actors+=[ContextDimensionActor:QualifiedName ] )? ('device' devices+=[ContextDimensionDevice:QualifiedName ] )? ('sensor' sensors+=[ContextDimensionSensor:QualifiedName ] )? (tags+=Tag )* ('description' description=STRING  )? ']' )?  
;

ContextElement infers ContextElement:
    ContextDimension | ContextVariable 
;

ContextDimension infers ContextDimension:
    ContextDimensionActor | ContextDimensionDevice | ContextDimensionSensor 
;

ContextDimensionActor infers ContextDimensionActor:
    'Actor' name=ID  (nameAlias=STRING )? ':' ^type=ActorType  ('[' ('isA' super=[ContextDimensionActor:QualifiedName ] )? (tags+=Tag )* ('description' description=STRING  )? ']' )?  
;

ContextDimensionDevice infers ContextDimensionDevice:
    'ContexDevice' name=ID  (nameAlias=STRING )? ':' ^type=ContextDimensionDeviceType  ('[' 
    (
         ('cpuRam' cpuRam=INT  'Kb' )
        &('cpuProcessor' cpuProcessor=INT  'KHz' )
        &('battery' battery=INT  '%' )
        &('screenDiagonalSize' diagonalSize=INT  'pt' )
        &('screenSizeCategory' sizeCategory=ScreenSizeCategoryType  )
        &('screenPixelSize' pixelSizeX=INT  'x' pixelSizeY=INT  'px' )
        &('screenDensity' screenDensity=INT  'dpi' )
        &('networkConnectivity' networkConnectivity=NetworkConnectivityType  )
    )
    (tags+=Tag )* ('description' description=STRING  )? ']' )?  
;

ContextDimensionSensor infers ContextDimensionSensor:
    'ContexSensor' name=ID  (nameAlias=STRING )? ':' ^type=ContextDimensionSensorType  ('[' ('status' sensorStatus=SensorStatusType  )? (tags+=Tag )* ('description' description=STRING  )? ']' )?  
;

ContextVariable infers ContextVariable:
    'ContextVariable' name=ID  (nameAlias=STRING )? ('[' (tags+=Tag )* ('description' description=STRING  )? ']' )?  
;

UseCase infers UseCase:
    'UseCase' name=ID  (nameAlias=STRING )? ':' ^type=UseCaseType  ('[' ((isNegative?='isNegative' ) | (isPositive?='isPositive' ) )?((isConcrete?='isConcrete' ) | (isAbstract?='isAbstract' ) )?((isSolution?='isSolution' ) | (isProblem?='isProblem' ) )?('actorInitiates' actorInitiates=[ContextDimensionActor:QualifiedName ] ) ('actorParticipates' actorParticipates+=RefActor  )? ('dataEntity' dataEntity=[DataEntityGeneric:QualifiedName ] )? ('precondition' precondition=STRING  )? ('postcondition' postcondition=STRING  )? (actions=UCActions )? (extensionPoints=UCExtensionPoints )? (includes=UCIncludes )? (extends+=UCExtends )* (tags+=Tag )* ('description' description=STRING  )? ']' )?  
;

RefActor infers RefActor:
    refs+=[ContextDimensionActor:QualifiedName ] (',' refs+=[ContextDimensionActor:QualifiedName ] )*  
;

UCActions infers UCActions:
    'actions' actions+=ActionType  (',' actions+=ActionType  )*  
;

UCIncludes infers UCIncludes:
    'includes' includes+=RefUC   
;

UCExtends infers UCExtends:
    'extends' usecase=[UseCase:QualifiedName ] 'onExtensionPoint' extensionPoint=[UCExtensionPoint:QualifiedName ]  
;

UCExtensionPoints infers UCExtensionPoints:
    'extensionPoints' extensionPoints+=UCExtensionPoint  (',' extensionPoints+=UCExtensionPoint  )*  
;

UCExtensionPoint infers UCExtensionPoint:
    name=ID  ('[' description=STRING  ']' )?  
;

RefUC infers RefUC:
    refs+=[UseCase:QualifiedName ] (',' refs+=[UseCase:QualifiedName ] )*  
;

View infers View:
    'View' name=ID  (nameAlias=STRING )? ':' ^type=ViewType  ('[' elements=ReferenceElements  (tags+=Tag )* ('description' description=STRING  )? ']' )  
;

Theme infers Theme:
    'Theme' name=ID  (nameAlias=STRING )? ':' ^type=ThemeType  ('[' elements=ReferenceElements  (tags+=Tag )* ('description' description=STRING  )? ']' )  
;

ReferenceElements infers ReferenceElements:
    references+=[SystemElement:QualifiedName ] (',' references+=[SystemElement:QualifiedName ] )*  
;

ViewType infers ViewType:
    ^type=('ActiveStructureView' | 'PassiveStructureView' | 'UIView' | 'ActiveView' | 'UseCaseView' ) 
;

ThemeType infers ThemeType:
    ^type=('ActiveStructureTheme' | 'PassiveStructureTheme' | 'UITheme' | 'ActiveTheme' | 'UseCaseTheme' ) 
;

Formula infers Formula:
    ArithmeticFormula | DetailsFormula 
;

ArithmeticFormula infers ArithmeticFormula:
    'arithmetic' '(' expr=Expression  ')'  
;

DetailsFormula infers DetailsFormula:
    DetailsCountFormula | DetailsSumFormula 
;

DetailsCountFormula infers DetailsFormula:
    'details' ':' ^type='count'  '(' dataEntity=[DataEntityGeneric:QualifiedName ] ')'  
;

DetailsSumFormula infers DetailsFormula:
    'details' ':' ^type='sum'  '(' attr=[DataAttribute:QualifiedName ] ')'  
;

type DetailsFormulaOp = 'count' | 'sum';
DetailsFormulaOp returns string:
    DetailsFormulaOp_COUNT | DetailsFormulaOp_SUM
;
DetailsFormulaOp_COUNT returns string: 'count' ;
DetailsFormulaOp_SUM returns string: 'sum' ;

Expression infers Expression:
    BooleanExpression 
;

BooleanExpression infers Expression:
    Comparison (({ infer BooleanExpression.left=current} op=("||" | "&&" | "and" | "or" ) ) right=Comparison  )*  
;

Comparison infers Expression:
    Membership (({ infer Comparison.left=current} op=("<" | ">" | "<=" | ">=" ) ) right=Membership  )*  
;

Membership infers Expression:
    Equals (({ infer Membership.left=current} op=("in" | "not_in" ) ) "[" right+=Expression  (',' right+=Expression  )* "]" )*  
;

Equals infers Expression:
    Addition (({ infer Equals.left=current} op=("==" | "!=" | "=~" | "!~" | "is" ) ) right=Addition  )*  
;

Addition infers Expression:
    Multiplication (({ infer Plus.left=current} '+'  | { infer Minus.left=current} '-')   right=Multiplication  )*  
;

Multiplication infers Expression:
    Prefixed (({ infer MultiOrDivOrMod.left=current} op=("*" | "/" | "%" ) ) right=Prefixed  )*  
;

Prefixed infers Expression:
    { infer BooleanNegation} "!" expression=Atomic   | { infer ArithmeticSigned} '-' expression=Atomic   | Atomic 
;

Atomic infers Expression:
    LiteralExpression | TernaryExpression | ParenthesizedExpression | { infer FunctionReference} ref=Function   | { infer VariableReference} ref=Variable   
;

LiteralExpression infers LiteralExpression:
    { infer IntegerLiteral} value=INT   | { infer StringLiteral} value=STRING   | { infer NullLiteral} value='null'   | { infer BooleanLiteral} value=('true' | 'false' )  
;

TernaryExpression infers TernaryExpression:
    'if' expression=BooleanExpression  'then' truevalue=Atomic  (=>'else' falsevalue=Atomic  )?  
;

ParenthesizedExpression infers Expression:
    '(' Expression ')'  
;

Function infers _Function:
    function=QualifiedName  '(' (params+=Expression  (',' params+=Expression  )* )? ')'  
;

Variable infers Variable:
    value=[DataAttribute:QualifiedName ] 
;

