grammar Rsl

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

Boolean infers Boolean:
    ^type=('True' | 'False' ) 
;

Month infers Month:
    ^type=('Jan' | 'Feb' | 'Mar' | 'Apr' | 'May' | 'Jun' | 'Jul' | 'Aug' | 'Sep' | 'Oct' | 'Nov' | 'Dec' ) 
;

^DateRule infers ^DateRule:
    year=INT  '-' month=INT  '-' day=INT   
;

Time infers Time:
    hh=INT  ':' mm=INT  (':' ss=INT  )?  
;

DateTime infers DateTime:
    'D' year=INT  '-' month=INT  '-' day=INT  ('T' hh=INT  ':' mm=INT  (':' ss=INT  )? )?  
;

AttributeValue infers AttributeValue:
    ^string=STRING  | dateTime=DateTime  | date=^DateRule  | time=Time  | doubleOrInt=DoubleOrInt  | percentage=Percentage  | ^boolean=Boolean  
;

Multiplicity infers Multiplicity:
    ^type=('"0"' | '"1"' | '"0..1"' | '"*"' | STRING ) 
;

Expression infers Expression:
    'expression' '[' operator=ExpressionOperator  value=INT  metric=MetricType  ']'  
;

ExpressionOperator infers ExpressionOperator:
    value=('>' | '<' | '=' | '>=' | '<=' | '<>' ) 
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
    'Include' ^type=IncludeSystemElementType  'fromSystem' system=[System:ID ] 'element' element=[SystemConcept:QualifiedName ] ('[' (updateFields=UpdateFields )? (tags+=Tag )* ('description' description=STRING  )? ']' )?  
;

UpdateFields infers UpdateFields:
    'updateFields' updateFields+=UpdateField  (',' updateFields+=UpdateField  )*  
;

UpdateField infers UpdateField:
    ((nameField=STRING ) "with" (valueField=STRING ) ) 
;

PackageAbstract infers PackageAbstract:
    PackageSystem 
;

PackageSystem infers PackageSystem:
    'Package' name=QualifiedName  (imports+=Import )* ((system=System ) | (testSuite=TestSuite ) ) 
;

System infers System:
    'System' name=ID  (nameAlias=STRING )? ':' ^type=SystemType  (':' subType=SystemSubType  )? ('[' ((isReusable?='isReusable' ) | (isFinal?='isFinal' ) )?('partOf' partOf=[System:ID ] )? ('vendor' vendor=STRING  )? ('version' version=STRING  )? (tags+=Tag )* ('description' description=STRING  )? ']' )? systemConcepts+=SystemConcept *  
;

SystemConcept infers SystemConcept:
    SystemElement | SystemRelation | SystemSet | LinguisticElement 
;

SystemElement infers SystemElement:
    StructureElement | BehaviorElement | Requirement | OtherElement | IncludeElementGeneric 
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
    Stakeholder | Actor 
;

BehaviorElement infers BehaviorElement:
    StateMachine | ActiveElement 
;

OtherElement infers OtherElement:
    GlossaryTerm | RiskGeneric | Stereotype | TypeExtended 
;

RiskGeneric infers RiskGeneric:
    Vulnerability | Risk 
;

IncludeElementGeneric infers IncludeElementGeneric:
    IncludeAll | IncludeElement 
;

SystemRelation infers SystemRelation:
    SystemsRelation | RequirementsRelation | TestsRelation | ElementsRelation 
;

SystemSet infers SystemSet:
    View | Theme 
;

TypeExtended infers TypeExtended:
    SystemTypeExtended | SystemSubTypeExtended | MetricTypeExtended | PriorityTypeExtended | StakeholderTypeExtended | StakeholderSubTypeExtended | ActorTypeExtended | GlossaryTermTypeExtended | ActiveEventTypeExtended | ActiveTaskTypeExtended | ActiveFlowTypeExtended | FRTypeExtended | QRTypeExtended | QRSubTypeExtended | ConstraintTypeExtended | ConstraintSubTypeExtended | GoalTypeExtended | GoalSubTypeExtended | UserStoryTypeExtended | UseCaseTypeExtended | ActionTypeExtended | DataEntityTypeExtended | DataEntitySubTypeExtended | DataEntityClusterTypeExtended | DataAttributeTypeExtended | ForeignKeyOnDeleteTypeExtended | StateMachineTypeExtended | VariableTypeExtended | TestTypeExtended | TestScenarioTypeExtended | ScenarioTypeExtended | StepTypeExtended | StepSubTypeExtended | VulnerabilityTypeExtended | VulnerabilitySubTypeExtended | VulnerabilityAttackVectorExtended | RiskTypeExtended | RiskSubTypeExtended | RiskTreatmentTypeExtended | RelationTypeExtended | SystemsRelationTypeExtended | SystemsRelationCategoryExtended | RequirementsRelationTypeExtended | TestsRelationTypeExtended | StereotypeTypeExtended 
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

PriorityType infers PriorityType:
    PriorityTypeOriginal | PriorityTypeExtendedRef 
;

PriorityTypeExtended infers PriorityTypeExtended:
    'PriorityType' name=ID  (nameAlias=STRING )? ('[' ('description' description=STRING  )? ']' )?  
;

PriorityTypeExtendedRef infers PriorityTypeExtendedRef:
    ^type=[PriorityTypeExtended:QualifiedName ] 
;

PriorityTypeOriginal infers PriorityTypeOriginal:
    ^type=('VeryHigh' | 'High' | 'Medium' | 'Low' | 'VeryLow' ) 
;

ImpactLevel infers ImpactLevel:
    ^type=('VeryHigh' | 'High' | 'Medium' | 'Low' | 'VeryLow' ) 
;

StakeholderType infers StakeholderType:
    StakeholderTypeOriginal | StakeholderTypeExtendedRef 
;

StakeholderTypeExtended infers StakeholderTypeExtended:
    'StakeholderType' name=ID  (nameAlias=STRING )? ('[' ('description' description=STRING  )? ']' )?  
;

StakeholderTypeExtendedRef infers StakeholderTypeExtendedRef:
    ^type=[StakeholderTypeExtended:QualifiedName ] 
;

StakeholderTypeOriginal infers StakeholderTypeOriginal:
    ^type=('Organization' | 'OrganizationalUnit' | 'Person' | 'System' | 'Other' ) 
;

StakeholderSubType infers StakeholderSubType:
    StakeholderSubTypeOriginal | StakeholderSubTypeExtendedRef 
;

StakeholderSubTypeExtended infers StakeholderSubTypeExtended:
    'StakeholderSubType' name=ID  (nameAlias=STRING )? ('[' ('description' description=STRING  )? ']' )?  
;

StakeholderSubTypeExtendedRef infers StakeholderSubTypeExtendedRef:
    ^type=[StakeholderSubTypeExtended:QualifiedName ] 
;

StakeholderSubTypeOriginal infers StakeholderSubTypeOriginal:
    ^type=('Organization_Owner' | 'Organization_Customer' | 'Organization_Sponsor' | 'Organization_Partner' | 'Organization_Government' | 'Organization_RegulatorAgent' | 'OrganizationalUnit_IT' | 'OrganizationalUnit_Operations' | 'OrganizationalUnit_Support' | 'OrganizationalUnit_Other' | 'Person_User' | 'Person_Manager' | 'Person_Manager_ProjectManager' | 'Person_Manager_TeamManager' | 'Person_Manager_FunctionalManager' | 'Person_Technical' | 'Person_Technical_BusinessAnalyst' | 'Person_Technical_RequirementsEngineer' | 'Person_Technical_Trainer' | 'Person_Technical_Trainee' | 'Person_Technical_SoftwareArchitect' | 'Person_Technical_SoftwareDeveloper' | 'Person_Technical_SoftwareDesigner' | 'Person_Technical_SoftwareTester' | 'System_Internal' | 'System_External' | 'System_Other' | 'Other' ) 
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
    ^type=('User' | 'ExternalSystem' | 'Other' ) 
;

GlossaryTermType infers GlossaryTermType:
    GlossaryTermTypeOriginal | GlossaryTermTypeExtendedRef 
;

GlossaryTermTypeExtended infers GlossaryTermTypeExtended:
    'GlossaryTermType' name=ID  (nameAlias=STRING )? ('[' ('description' description=STRING  )? ']' )?  
;

GlossaryTermTypeExtendedRef infers GlossaryTermTypeExtendedRef:
    ^type=[GlossaryTermTypeExtended:QualifiedName ] 
;

GlossaryTermTypeOriginal infers GlossaryTermTypeOriginal:
    ^type=('Adjective' | 'Adverb' | 'Noun' | 'Verb' ) 
;

TermApplicableTo infers TermApplicableTo:
    ^type=('System' | 'Stakeholder' | 'Actor' | 'DataEntity' | 'Other' ) 
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

FRType infers FRType:
    FRTypeOriginal | FRTypeExtendedRef 
;

FRTypeExtended infers FRTypeExtended:
    'FRType' name=ID  (nameAlias=STRING )? ('[' ('description' description=STRING  )? ']' )?  
;

FRTypeExtendedRef infers FRTypeExtendedRef:
    ^type=[FRTypeExtended:QualifiedName ] 
;

FRTypeOriginal infers FRTypeOriginal:
    ^type=('Functional' | 'Behavioral' | 'Data' ) 
;

GoalType infers GoalType:
    GoalTypeOriginal | GoalTypeExtendedRef 
;

GoalTypeExtended infers GoalTypeExtended:
    'GoalType' name=ID  (nameAlias=STRING )? ('[' ('description' description=STRING  )? ']' )?  
;

GoalTypeExtendedRef infers GoalTypeExtendedRef:
    ^type=[GoalTypeExtended:QualifiedName ] 
;

GoalTypeOriginal infers GoalTypeOriginal:
    ^type=('Functional' | 'Performance' | 'Compatibility' | 'Usability' | 'Reliability' | 'Security' | 'Maintainability' | 'Portability' | 'Privacy' | 'Cultural' | 'Legal' | 'Other' ) 
;

GoalSubType infers GoalSubType:
    GoalSubTypeOriginal | GoalSubTypeExtendedRef 
;

GoalSubTypeExtended infers GoalSubTypeExtended:
    'GoalSubType' name=ID  (nameAlias=STRING )? ('[' ('description' description=STRING  )? ']' )?  
;

GoalSubTypeExtendedRef infers GoalSubTypeExtendedRef:
    ^type=[GoalSubTypeExtended:QualifiedName ] 
;

GoalSubTypeOriginal infers GoalSubTypeOriginal:
    ^type=('Performance_SystemResponseTime' | 'Performance_NetworkResponseTime' | 'Performance_MemoryCapacity' | 'Performance_DiskCapacity' | 'Performance_Other' | 'Compatibility_CoExistence' | 'Compatibility_Interoperability' | 'Compatibility_Other' | 'Usability_AappropriatenessRecognizability' | 'Usability_Learnability' | 'Usability_Operability' | 'Usability_UserErrorProtection' | 'Usability_UserInterfaceAesthetics' | 'Usability_Accessibility' | 'Usability_Other' | 'Reliability_Maturity' | 'Reliability_Availability' | 'Reliability_FaultTolerance' | 'Reliability_Recoverability' | 'Reliability_Other' | 'Security_Authentication' | 'Security_Authorization' | 'Security_Confidentiality' | 'Security_Integrity' | 'Security_NonRepudiation' | 'Security_Accountability' | 'Security_PhysicalProtection' | 'Security_Recovery' | 'Security_Other' | 'Maintainability_Modularity' | 'Maintainability_Reusability' | 'Maintainability_Analyzability' | 'Maintainability_Modifiability' | 'Maintainability_Testability' | 'Maintainability_Other' | 'Portability_Adaptability' | 'Portability_Installability' | 'Portability_Replaceability' | 'Portability_Other' | 'Privacy_Collection' | 'Privacy_Disclosure' | 'Privacy_Retention' | 'Privacy_Usage' | 'Privacy_Informative' | 'Privacy_Other' | 'Cultural_Language' | 'Cultural_Currency' | 'Cultural_Other' | 'Legal_National' | 'Legal_International' | 'Legal_Other' ) 
;

QRType infers QRType:
    QRTypeOriginal | QRTypeExtendedRef 
;

QRTypeExtended infers QRTypeExtended:
    'QRType' name=ID  (nameAlias=STRING )? ('[' ('description' description=STRING  )? ']' )?  
;

QRTypeExtendedRef infers QRTypeExtendedRef:
    ^type=[QRTypeExtended:QualifiedName ] 
;

QRTypeOriginal infers QRTypeOriginal:
    ^type=('Functional' | 'Performance' | 'Compatibility' | 'Usability' | 'Reliability' | 'Security' | 'Maintainability' | 'Portability' | 'Privacy' | 'Cultural' | 'Legal' | 'Other' ) 
;

QRSubType infers QRSubType:
    QRSubTypeOriginal | QRSubTypeExtendedRef 
;

QRSubTypeExtended infers QRSubTypeExtended:
    'QRSubType' name=ID  (nameAlias=STRING )? ('[' ('description' description=STRING  )? ']' )?  
;

QRSubTypeExtendedRef infers QRSubTypeExtendedRef:
    ^type=[QRSubTypeExtended:QualifiedName ] 
;

QRSubTypeOriginal infers QRSubTypeOriginal:
    ^type=('Performance_SystemResponseTime' | 'Performance_NetworkResponseTime' | 'Performance_MemoryCapacity' | 'Performance_DiskCapacity' | 'Performance_Other' | 'Compatibility_CoExistence' | 'Compatibility_Interoperability' | 'Compatibility_Other' | 'Usability_AappropriatenessRecognizability' | 'Usability_Learnability' | 'Usability_Operability' | 'Usability_UserErrorProtection' | 'Usability_UserInterfaceAesthetics' | 'Usability_Accessibility' | 'Usability_Other' | 'Reliability_Maturity' | 'Reliability_Availability' | 'Reliability_FaultTolerance' | 'Reliability_Recoverability' | 'Reliability_Other' | 'Security_Authentication' | 'Security_Authorization' | 'Security_Confidentiality' | 'Security_Integrity' | 'Security_NonRepudiation' | 'Security_Accountability' | 'Security_PhysicalProtection' | 'Security_Recovery' | 'Security_Other' | 'Maintainability_Modularity' | 'Maintainability_Reusability' | 'Maintainability_Analyzability' | 'Maintainability_Modifiability' | 'Maintainability_Testability' | 'Maintainability_Other' | 'Portability_Adaptability' | 'Portability_Installability' | 'Portability_Replaceability' | 'Portability_Other' | 'Privacy_Collection' | 'Privacy_Disclosure' | 'Privacy_Retention' | 'Privacy_Usage' | 'Privacy_Informative' | 'Privacy_Other' | 'Cultural_Language' | 'Cultural_Currency' | 'Cultural_Other' | 'Legal_National' | 'Legal_International' | 'Legal_Other' ) 
;

ConstraintType infers ConstraintType:
    ConstraintTypeOriginal | ConstraintTypeExtendedRef 
;

ConstraintTypeExtended infers ConstraintTypeExtended:
    'ConstraintType' name=ID  (nameAlias=STRING )? ('[' ('description' description=STRING  )? ']' )?  
;

ConstraintTypeExtendedRef infers ConstraintTypeExtendedRef:
    ^type=[ConstraintTypeExtended:QualifiedName ] 
;

ConstraintTypeOriginal infers ConstraintTypeOriginal:
    ^type=('Cultural' | 'Legal' | 'Organizational' | 'Project' | 'Technological' | 'Physical' | 'Other' ) 
;

ConstraintSubType infers ConstraintSubType:
    ConstraintSubTypeOriginal | ConstraintSubTypeExtendedRef 
;

ConstraintSubTypeExtended infers ConstraintSubTypeExtended:
    'ConstraintSubType' name=ID  (nameAlias=STRING )? ('[' ('description' description=STRING  )? ']' )?  
;

ConstraintSubTypeExtendedRef infers ConstraintSubTypeExtendedRef:
    ^type=[ConstraintSubTypeExtended:QualifiedName ] 
;

ConstraintSubTypeOriginal infers ConstraintSubTypeOriginal:
    ^type=('Cultural_Language' | 'Cultural_Currency' | 'Cultural_Other' | 'Legal_National' | 'Legal_International' | 'Legal_Other' | 'Organizational_Politics' | 'Organizational_Management' | 'Organizational_Other' | 'Project_Cost' | 'Project_Time' | 'Project_Scope' | 'Project_Quality' | 'Project_Risk' | 'Project_Other' | 'Technological_PlatformHardware' | 'Technological_PlatformSoftware' | 'Technological_DevelopmentTool' | 'Physical_Concrete' | 'Physical_Abstract' | 'Other' ) 
;

UserStoryType infers UserStoryType:
    UserStoryTypeOriginal | UserStoryTypeExtendedRef 
;

UserStoryTypeExtended infers UserStoryTypeExtended:
    'UserStoryType' name=ID  (nameAlias=STRING )? ('[' ('description' description=STRING  )? ']' )?  
;

UserStoryTypeExtendedRef infers UserStoryTypeExtendedRef:
    ^type=[UserStoryTypeExtended:QualifiedName ] 
;

UserStoryTypeOriginal infers UserStoryTypeOriginal:
    ^type=('Epic' | 'UserStory' | 'Other' ) 
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
    ^type=('EntityCreate' | 'EntityRead' | 'EntityUpdate' | 'EntityDelete' | 'EntityReport' | 'EntityDashboard' | 'EntityOther' | 'EntitiesManage' | 'EntitiesBrowse' | 'EntitiesSearch' | 'EntitiesReport' | 'EntitiesDashboard' | 'EntitiesInteropImport' | 'EntitiesInteropExport' | 'EntitiesInteropSync' | 'EntitiesInteropSendMessage' | 'EntitiesInteropServiceInvocation' | 'EntitiesMapShow' | 'EntitiesMapInteract' | 'EntitiesOther' | 'Login' | 'Logout' | 'Other' ) 
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
    ^type=('Parameter' | 'Reference' | 'Master' | 'Document' | 'Transaction' | 'Other' ) 
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
    ^type=('Regular' | 'Weak' | 'Other' ) 
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
    ^type=('Parameter' | 'Reference' | 'Master' | 'Document' | 'Transaction' | 'Other' ) 
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

VariableType infers VariableType:
    VariableTypeOriginal ('(' size=DoubleOrInt  ')' )?  | VariableTypeExtendedRef | 'DataEnumeration' DataEnumerationRef  | 'DataEntity' dataEntity=[DataEntity:QualifiedName ]  
;

VariableTypeExtended infers VariableTypeExtended:
    'VariableType' name=ID  (nameAlias=STRING )? ('[' ('description' description=STRING  )? ']' )?  
;

VariableTypeExtendedRef infers VariableTypeExtendedRef:
    ^type=[VariableTypeExtended:QualifiedName ] 
;

VariableTypeOriginal infers VariableTypeOriginal:
    ^type=('Integer' | 'Double' | 'Decimal' | 'Boolean' | 'Bit' | 'Currency' | 'Date' | 'Time' | 'Datetime' | 'String' | 'Text' | 'Regex' | 'URL' | 'Email' | 'File' | 'Image' | 'XML' | 'Binary' | 'FilePath' | 'Data' ) 
;

StateMachineType infers StateMachineType:
    StateMachineTypeOriginal | StateMachineTypeExtendedRef 
;

StateMachineTypeExtended infers StateMachineTypeExtended:
    'StateMachineType' name=ID  (nameAlias=STRING )? ('[' ('description' description=STRING  )? ']' )?  
;

StateMachineTypeExtendedRef infers StateMachineTypeExtendedRef:
    ^type=[StateMachineTypeExtended:QualifiedName ] 
;

StateMachineTypeOriginal infers StateMachineTypeOriginal:
    ^type=('Simple' | 'Complex' ) 
;

TestType infers TestType:
    TestTypeOriginal | TestTypeExtendedRef 
;

TestTypeExtended infers TestTypeExtended:
    'TestType' name=ID  (nameAlias=STRING )? ('[' ('description' description=STRING  )? ']' )?  
;

TestTypeExtendedRef infers TestTypeExtendedRef:
    ^type=[TestTypeExtended:QualifiedName ] 
;

TestTypeOriginal infers TestTypeOriginal:
    ^type=('Valid' | 'Invalid' ) 
;

TestScenarioType infers TestScenarioType:
    TestScenarioTypeOriginal | TestScenarioTypeExtendedRef 
;

TestScenarioTypeExtended infers TestScenarioTypeExtended:
    'TestScenarioType' name=ID  (nameAlias=STRING )? ('[' ('description' description=STRING  )? ']' )?  
;

TestScenarioTypeExtendedRef infers TestScenarioTypeExtendedRef:
    ^type=[TestScenarioTypeExtended:QualifiedName ] 
;

TestScenarioTypeOriginal infers TestScenarioTypeOriginal:
    ^type=('Main' | 'Alternative' | 'Exception' ) 
;

ScenarioType infers ScenarioType:
    ScenarioTypeOriginal | ScenarioTypeExtendedRef 
;

ScenarioTypeExtended infers ScenarioTypeExtended:
    'ScenarioType' name=ID  (nameAlias=STRING )? ('[' ('description' description=STRING  )? ']' )?  
;

ScenarioTypeExtendedRef infers ScenarioTypeExtendedRef:
    ^type=[ScenarioTypeExtended:QualifiedName ] 
;

ScenarioTypeOriginal infers ScenarioTypeOriginal:
    ^type=('Nested' | 'Alternative' | 'Exception' ) 
;

StepType infers StepType:
    StepTypeOriginal | StepTypeExtendedRef 
;

StepTypeExtended infers StepTypeExtended:
    'StepType' name=ID  (nameAlias=STRING )? ('[' ('description' description=STRING  )? ']' )?  
;

StepTypeExtendedRef infers StepTypeExtendedRef:
    ^type=[StepTypeExtended:QualifiedName ] 
;

StepTypeOriginal infers StepTypeOriginal:
    ^type=('Actor' | 'System' | 'Event' | 'Other' ) 
;

StepSubType infers StepSubType:
    StepSubTypeOriginal | StepSubTypeExtendedRef 
;

StepSubTypeExtended infers StepSubTypeExtended:
    'StepSubType' name=ID  (nameAlias=STRING )? ('[' ('description' description=STRING  )? ']' )?  
;

StepSubTypeExtendedRef infers StepSubTypeExtendedRef:
    ^type=[StepSubTypeExtended:QualifiedName ] 
;

StepSubTypeOriginal infers StepSubTypeOriginal:
    ^type=('Open' | 'OpenApp' | 'CloseApp' | 'Write' | 'WriteSecret' | 'Read' | 'ClickOnElement' | 'ClickOnButton' | 'CheckOnPage' | 'CheckOnElement' | 'CheckElementInPage' | 'ReceiveMail' | 'Show' | 'Display' | 'Ask' | 'Validate' | 'Execute' | 'SendMail' | 'Timer' | 'Receive' | 'Conditional' | 'Cancel' | 'Error' | 'Signal' | 'Other' ) 
;

VulnerabilityType infers VulnerabilityType:
    VulnerabilityTypeOriginal | VulnerabilityTypeExtendedRef 
;

VulnerabilityTypeExtended infers VulnerabilityTypeExtended:
    'VulnerabilityType' name=ID  (nameAlias=STRING )? ('[' ('description' description=STRING  )? ']' )?  
;

VulnerabilityTypeExtendedRef infers VulnerabilityTypeExtendedRef:
    ^type=[VulnerabilityTypeExtended:QualifiedName ] 
;

VulnerabilityTypeOriginal infers VulnerabilityTypeOriginal:
    ^type=('Business' | 'Project' | 'IT' | 'Other' ) 
;

VulnerabilitySubType infers VulnerabilitySubType:
    VulnerabilitySubTypeOriginal | VulnerabilitySubTypeExtendedRef 
;

VulnerabilitySubTypeExtended infers VulnerabilitySubTypeExtended:
    'VulnerabilitySubType' name=ID  (nameAlias=STRING )? ('[' ('description' description=STRING  )? ']' )?  
;

VulnerabilitySubTypeExtendedRef infers VulnerabilitySubTypeExtendedRef:
    ^type=[VulnerabilitySubTypeExtended:QualifiedName ] 
;

VulnerabilitySubTypeOriginal infers VulnerabilitySubTypeOriginal:
    ^type=('IT_DoS' | 'IT_CodeExecution' | 'IT_Overflow' | 'IT_MemoryCorruption' | 'IT_SqlInjection' | 'IT_XSS' | 'IT_DirectoryTraversal' | 'IT_HttpResponseSplitting' | 'IT_BypassSomething' | 'IT_GainInformation' | 'IT_GainPrivileges' | 'IT_CSRF' | 'IT_FileInclusion' | 'Other' ) 
;

VulnerabilityAttackVector infers VulnerabilityAttackVector:
    VulnerabilityAttackVectorOriginal | VulnerabilityAttackVectorExtendedRef 
;

VulnerabilityAttackVectorExtended infers VulnerabilityAttackVectorExtended:
    'VulnerabilityAttackVector' name=ID  (nameAlias=STRING )? ('[' ('description' description=STRING  )? ']' )?  
;

VulnerabilityAttackVectorExtendedRef infers VulnerabilityAttackVectorExtendedRef:
    ^type=[VulnerabilityAttackVectorExtended:QualifiedName ] 
;

VulnerabilityAttackVectorOriginal infers VulnerabilityAttackVectorOriginal:
    ^type=('IT_Network' | 'IT_AdjacentNetwork' | 'IT_Local' | 'IT_Physical' | 'IT_Other' ) 
;

RiskType infers RiskType:
    RiskTypeOriginal | RiskTypeExtendedRef 
;

RiskTypeExtended infers RiskTypeExtended:
    'RiskType' name=ID  (nameAlias=STRING )? ('[' ('description' description=STRING  )? ']' )?  
;

RiskTypeExtendedRef infers RiskTypeExtendedRef:
    ^type=[RiskTypeExtended:QualifiedName ] 
;

RiskTypeOriginal infers RiskTypeOriginal:
    ^type=('Business' | 'Project' | 'IT' | 'Other' ) 
;

RiskSubType infers RiskSubType:
    RiskSubTypeOriginal | RiskSubTypeExtendedRef 
;

RiskSubTypeExtended infers RiskSubTypeExtended:
    'RiskSubType' name=ID  (nameAlias=STRING )? ('[' ('description' description=STRING  )? ']' )?  
;

RiskSubTypeExtendedRef infers RiskSubTypeExtendedRef:
    ^type=[RiskSubTypeExtended:QualifiedName ] 
;

RiskSubTypeOriginal infers RiskSubTypeOriginal:
    ^type=('Business_Strategic' | 'Business_Compliance' | 'Business_Operational' | 'Business_Financial' | 'Project_Schedule' | 'Project_Budget' | 'Project_Scope' | 'Project_Resource' | 'Project_Quality' | 'IT_Spoofing' | 'IT_Tampering' | 'IT_Repudiation' | 'IT_InformationDisclosure' | 'IT_DenialOfService' | 'IT_ElevationOfPrivilege' | 'Other' ) 
;

RiskTreatmentType infers RiskTreatmentType:
    RiskTreatmentTypeOriginal | RiskTreatmentTypeExtendedRef 
;

RiskTreatmentTypeExtended infers RiskTreatmentTypeExtended:
    'RiskTreatmentType' name=ID  (nameAlias=STRING )? ('[' ('description' description=STRING  )? ']' )?  
;

RiskTreatmentTypeExtendedRef infers RiskTreatmentTypeExtendedRef:
    ^type=[RiskTreatmentTypeExtended:QualifiedName ] 
;

RiskTreatmentTypeOriginal infers RiskTreatmentTypeOriginal:
    ^type=('Avoid' | 'Transfer' | 'Mitigate' | 'Accept' ) 
;

RiskStatus infers RiskStatus:
    ^type=('Identified' | 'Assessed' | 'Planned' | 'OnProcess' | 'Closed' | 'NotOccurred' | 'Rejected' ) 
;

RelationType infers RelationType:
    RelationTypeOriginal | RelationTypeExtendedRef 
;

RelationTypeExtended infers RelationTypeExtended:
    'RelationType' name=ID  (nameAlias=STRING )? ('[' ('description' description=STRING  )? ']' )?  
;

RelationTypeExtendedRef infers RelationTypeExtendedRef:
    ^type=[RelationTypeExtended:QualifiedName ] 
;

RelationTypeOriginal infers RelationTypeOriginal:
    ^type=('Requires' | 'Supports' | 'Obstructs' | 'Conflicts' | 'Identical' | 'Relates' | 'Other' ) 
;

ElementsRelationType infers ElementsRelationType:
    ^type=('Requires' | 'Supports' | 'Obstructs' | 'Conflicts' | 'Identical' | 'Relates' | 'Other' ) 
;

SystemsRelationType infers SystemsRelationType:
    SystemsRelationTypeOriginal | SystemsRelationTypeExtendedRef 
;

SystemsRelationTypeExtended infers SystemsRelationTypeExtended:
    'SystemsRelationType' name=ID  (nameAlias=STRING )? ('[' ('description' description=STRING  )? ']' )?  
;

SystemsRelationTypeExtendedRef infers SystemsRelationTypeExtendedRef:
    ^type=[SystemsRelationTypeExtended:QualifiedName ] 
;

SystemsRelationTypeOriginal infers SystemsRelationTypeOriginal:
    ^type=('Requires' | 'Supports' | 'Obstructs' | 'Conflicts' | 'Identical' | 'Relates' | 'Other' ) 
;

SystemsRelationCategory infers SystemsRelationCategory:
    SystemsRelationCategoryOriginal | SystemsRelationCategoryExtendedRef 
;

SystemsRelationCategoryExtended infers SystemsRelationCategoryExtended:
    'SystemsRelationCategory' name=ID  (nameAlias=STRING )? ('[' ('description' description=STRING  )? ']' )?  
;

SystemsRelationCategoryExtendedRef infers SystemsRelationCategoryExtendedRef:
    ^type=[SystemsRelationCategoryExtended:QualifiedName ] 
;

SystemsRelationCategoryOriginal infers SystemsRelationCategoryOriginal:
    ^type=('Import' | 'Export' | 'ImportExport' | 'Sync' | 'Interact' | 'Other' ) 
;

RequirementsRelationType infers RequirementsRelationType:
    RequirementsRelationTypeOriginal | RequirementsRelationTypeExtendedRef 
;

RequirementsRelationTypeExtended infers RequirementsRelationTypeExtended:
    'RequirementsRelationType' name=ID  (nameAlias=STRING )? ('[' ('description' description=STRING  )? ']' )?  
;

RequirementsRelationTypeExtendedRef infers RequirementsRelationTypeExtendedRef:
    ^type=[RequirementsRelationTypeExtended:QualifiedName ] 
;

RequirementsRelationTypeOriginal infers RequirementsRelationTypeOriginal:
    ^type=('Requires' | 'Supports' | 'Obstructs' | 'Conflicts' | 'Identical' | 'Relates' | 'IsSolution' | 'Other' ) 
;

TestsRelationType infers TestsRelationType:
    TestsRelationTypeOriginal | TestsRelationTypeExtendedRef 
;

TestsRelationTypeExtended infers TestsRelationTypeExtended:
    'TestsRelationType' name=ID  (nameAlias=STRING )? ('[' ('description' description=STRING  )? ']' )?  
;

TestsRelationTypeExtendedRef infers TestsRelationTypeExtendedRef:
    ^type=[TestsRelationTypeExtended:QualifiedName ] 
;

TestsRelationTypeOriginal infers TestsRelationTypeOriginal:
    ^type=('Requires' | 'Supports' | 'Obstructs' | 'Conflicts' | 'Identical' | 'Relates' | 'Other' ) 
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
    ^type=('System' | 'TestSuite' | 'GlossaryTerm' | 'Vulnerability' | 'Risk' | 'Stakeholder' | 'Actor' | 'StateMachine' | 'ActiveTask' | 'ActiveEvent' | 'ActiveFlow' | 'Goal' | 'QR' | 'FR' | 'Constraint' | 'UserStory' | 'UseCase' | 'AcceptanceCriteriaTest' | 'DataEntityTest' | 'UseCaseTest' | 'StateMachineTest' | 'DataEnumeration' | 'DataEntity' | 'DataEntityCluster' | 'Data' | 'TestData' | 'AcceptanceCriteriaTestView' | 'UseCaseTestView' | 'DataEntityTestView' | 'StatemachineTestView' | 'MainScenario' | 'Scenario' | 'Step' | 'AcceptanceCriteriaScenario' | 'DataAttribute' | 'Other' ) 
;

ViewType infers ViewType:
    ^type=('RequirementView' | 'GoalView' | 'QRView' | 'FRView' | 'ConstraintView' | 'UserStoryView' | 'UseCaseView' | 'TestView' | 'StakeholderView' | 'ActorView' | 'GlossaryTermView' | 'DataEntityView' | 'DataEntityClusterView' | 'ActiveElementView' | 'RiskView' | 'VulnerabilityView' ) 
;

ThemeType infers ThemeType:
    ^type=('SystemElementTheme' | 'StructureElementTheme' | 'BehaviorElementTheme' | 'RequirementTheme' | 'TestTheme' | 'OtherTheme' ) 
;

IncludeSystemElementType infers IncludeSystemElementType:
    ^type=('Goal' | 'QR' | 'FR' | 'Constraint' | 'UserStory' | 'UseCase' | 'AcceptanceCriteriaTestView' | 'UseCaseTestView' | 'DataEntityTestView' | 'StatemachineTestView' | 'Stakeholder' | 'Actor' | 'GlossaryTerm' | 'DataEnumeration' | 'DataEntity' | 'DataEntityCluster' | 'StateMachine' | 'ActiveEvent' | 'ActiveTask' | 'ActiveFlow' | 'Vulnerability' | 'Risk' | 'LinguisticRule' | 'LinguisticFragment' ) 
;

LinguisticRuleType infers LinguisticRuleType:
    ^type=('Morphology' | 'Syntax' | 'Semantics' ) 
;

GlossaryTerm infers GlossaryTerm:
    'Term' name=ID  (nameAlias=STRING )? ':' ^type=GlossaryTermType  ('[' ('isA' super=[GlossaryTerm:QualifiedName ] )? ('partOf' ('optional' | 'mandatory' )?partOf=[GlossaryTerm:QualifiedName ] )? ('acronym' acronym=STRING  )? ('applicableTo' applicableTo=RefTermApplicableTo  )? ('synonyms' synonyms+=STRING  (',' synonyms+=STRING  )* )? (tags+=Tag )* ('description' description=STRING  )? ']' )?  
;

RefTermApplicableTo infers RefTermApplicableTo:
    refs+=TermApplicableTo  (',' refs+=TermApplicableTo  )*  
;

Stakeholder infers Stakeholder:
    'Stakeholder' name=ID  (nameAlias=STRING )? ':' ^type=StakeholderType  (':' subType=StakeholderSubType  )? ('[' ('isA' super=[Stakeholder:QualifiedName ] )? ('partOf' ('optional' | 'mandatory' )?partOf=[Stakeholder:QualifiedName ] )? (tags+=Tag )* ('description' description=STRING  )? ']' )?  
;

ActiveElement infers ActiveElement:
    ActiveEvent | ActiveTask | ActiveFlow 
;

RefActiveElement infers RefActiveElement:
    refActiveElement+=[ActiveElement:QualifiedName ] (',' refActiveElement+=[ActiveElement:QualifiedName ] )+  
;

ActiveEvent infers ActiveEvent:
    'Event' name=ID  (nameAlias=STRING )? ':' ^type=ActiveEventType  ('[' ((isInitial?='isInitial' ) | (isFinal?='isFinal' ) )?((isCatch?='isCatch' ) | (isThrow?='isThrow' ) )?('participant' stakeholder=[Stakeholder:QualifiedName ] )? (tags+=Tag )* ('description' description=STRING  )? ']' )?  
;

ActiveTask infers ActiveTask:
    'Task' name=ID  (nameAlias=STRING )? ':' ^type=ActiveTaskType  ('[' ('partOf' ('optional' | 'mandatory' )?partOf=[ActiveTask:QualifiedName ] )? ('participant' participant=[Stakeholder:QualifiedName ] )? ('participantExternal' participantTarget=[Stakeholder:QualifiedName ] )? (tags+=Tag )* ('description' description=STRING  )? ']' )?  
;

ActiveFlow infers ActiveFlow:
    'TaskFlow' name=ID  (nameAlias=STRING )? ':' ^type=ActiveFlowType  ('[' ('condition' condition=STRING  )? 'activeElements' activeElements=RefActiveElement  (tags+=Tag )* ('description' description=STRING  )? ']' )?  
;

DataEntity infers DataEntity:
    'DataEntity' name=ID  (nameAlias=STRING )? ':' ^type=DataEntityType  (':' subType=DataEntitySubType  )? ('[' ('isA' super=[DataEntity:QualifiedName ] )? (attributes+=DataAttribute )* (constraint=DataEntityConstraint )? (tags+=Tag )* ('description' description=STRING  )? ']' )?  
;

DataAttribute infers DataAttribute:
    'attribute' name=ID  (nameAlias=STRING )? ':' ^type=DataAttributeType  ('[' ('defaultValue' defaultValue=STRING  )? ('values' values=STRING  )? ('visualization' visualizatione=STRING  )? ('helpMessage' helpMessage=STRING  )? (constraint=DataAttributeConstraint )? (tags+=Tag )* ('description' description=STRING  )? ']' )?  
;

DataAttributeRefsList infers DataAttributeRefsList:
    (attributeRef+=[DataAttribute:QualifiedName ]) (',' attributeRef+=[DataAttribute:QualifiedName ] )*  
;

DataEntityConstraint infers DataEntityConstraint:
    { infer DataEntityConstraint} 'constraints' '(' (isReadOnly='ReadOnly' )? (isEncrypted='Encrypted' )? ('showAs' '(' showAsAttribute=[DataAttribute:QualifiedName ] ')' )? (checks+=Check )* ')'  
;

DataAttributeConstraint infers DataAttributeConstraint:
    { infer DataAttributeConstraint} 'constraints' '(' ('multiplicity' multiplicity=Multiplicity  )? (isPrimaryKey='PrimaryKey' )? (isNotNull='NotNull' )? (isUnique='Unique' )? (isDerived='Derived'  ('(' expression=STRING  ')' )? )? (isReadOnly='ReadOnly' )? (isNotVisible='NotVisible' )? (isEncrypted='Encrypted' )? (foreignKey=ForeignKey )? (manyToMany=ManyToMany )? (checks+=Check )* ')'  
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

Actor infers Actor:
    'Actor' name=ID  (nameAlias=STRING )? ':' ^type=ActorType  ('[' ('isA' super=[Actor:QualifiedName ] )? ('stakeholder' stakeholder=[Stakeholder:QualifiedName ] )? (tags+=Tag )* ('description' description=STRING  )? ']' )?  
;

Requirement infers Requirement:
    Goal | FR | QR | Constraint | UserStory | UseCase 
;

Goal infers Goal:
    'Goal' name=ID  (nameAlias=STRING )? ':' ^type=GoalType  (':' subType=GoalSubType  )? ('[' ((isNegative?='isNegative' ) | (isPositive?='isPositive' ) )?((isConcrete?='isConcrete' ) | (isAbstract?='isAbstract' ) )?((isSolution?='isSolution' ) | (isProblem?='isProblem' ) )?('partOf' ('optional' | 'mandatory' )?partOf=[Goal:QualifiedName ] )? ('stakeholder' stakeholder=[Stakeholder:QualifiedName ] )? (acceptanceCriteria+=AcceptanceCriteria )* ('priority' priority=PriorityType  )? (tags+=Tag )* ('description' description=STRING  )? ']' )?  
;

FR infers FR:
    'FR' name=ID  (nameAlias=STRING )? ':' ^type=FRType  ('[' ((isNegative?='isNegative' ) | (isPositive?='isPositive' ) )?((isConcrete?='isConcrete' ) | (isAbstract?='isAbstract' ) )?((isSolution?='isSolution' ) | (isProblem?='isProblem' ) )?('partOf' ('optional' | 'mandatory' )?partOf=[FR:QualifiedName ] )? ('stakeholder' stakeholder=[Stakeholder:QualifiedName ] )? (acceptanceCriteria+=AcceptanceCriteria )* ('priority' priority=PriorityType  )? (tags+=Tag )* ('description' description=STRING  )? ']' )?  
;

QR infers QR:
    'QR' name=ID  (nameAlias=STRING )? ':' ^type=QRType  (':' subType=QRSubType  )? ('[' ((isNegative?='isNegative' ) | (isPositive?='isPositive' ) )?((isConcrete?='isConcrete' ) | (isAbstract?='isAbstract' ) )?((isSolution?='isSolution' ) | (isProblem?='isProblem' ) )?(expression=Expression )? ('partOf' ('optional' | 'mandatory' )?partOf=[QR:QualifiedName ] )? ('stakeholder' stakeholder=[Stakeholder:QualifiedName ] )? (acceptanceCriteria+=AcceptanceCriteria )* ('priority' priority=PriorityType  )? (tags+=Tag )* ('description' description=STRING  )? ']' )?  
;

Constraint infers Constraint:
    'Constraint' name=ID  (nameAlias=STRING )? ':' ^type=ConstraintType  (':' subType=ConstraintSubType  )? ('[' ((isNegative?='isNegative' ) | (isPositive?='isPositive' ) )?((isConcrete?='isConcrete' ) | (isAbstract?='isAbstract' ) )?((isSolution?='isSolution' ) | (isProblem?='isProblem' ) )?('partOf' ('optional' | 'mandatory' )?partOf=[Constraint:QualifiedName ] )? ('stakeholder' stakeholder=[Stakeholder:QualifiedName ] )? (acceptanceCriteria+=AcceptanceCriteria )* ('priority' priority=PriorityType  )? (tags+=Tag )* ('description' description=STRING  )? ']' )?  
;

UserStory infers UserStory:
    'UserStory' name=ID  (nameAlias=STRING )? ':' ^type=UserStoryType  ('[' ((isNegative?='isNegative' ) | (isPositive?='isPositive' ) )?((isConcrete?='isConcrete' ) | (isAbstract?='isAbstract' ) )?((isSolution?='isSolution' ) | (isProblem?='isProblem' ) )?('partOf' ('optional' | 'mandatory' )?partOf=[UserStory:QualifiedName ] )? ('stakeholder' stakeholder=[Stakeholder:QualifiedName ] )? ('asA' ((actor=[Actor:QualifiedName ]) | (otherRole=STRING ) )) ('iWant' goal=STRING  ) ('soThat' reason=STRING  )? (acceptanceCriteria+=AcceptanceCriteria )* ('priority' priority=PriorityType  )? (tags+=Tag )* ('description' description=STRING  )? ']' )?  
;

UseCase infers UseCase:
    'UseCase' name=ID  (nameAlias=STRING )? ':' ^type=UseCaseType  ('[' ((isNegative?='isNegative' ) | (isPositive?='isPositive' ) )?((isConcrete?='isConcrete' ) | (isAbstract?='isAbstract' ) )?((isSolution?='isSolution' ) | (isProblem?='isProblem' ) )?('stakeholder' stakeholder=[Stakeholder:QualifiedName ] )? ('primaryActor' primaryActor=[Actor:QualifiedName ] ) ('supportingActors' supportingActors+=RefActor  )? ('triggeredBy' triggeredBy=[ActiveEvent:QualifiedName ] )? ('dataEntity' dataEntity=[DataEntityGeneric:QualifiedName ] )? ('precondition' precondition=STRING  )? ('postcondition' postcondition=STRING  )? (actions=UCActions )? (extensionPoints=UCExtensionPoints )? (includes=UCIncludes )? (extends+=UCExtends )* (acceptanceCriteria+=AcceptanceCriteria )* ('priority' priority=PriorityType  )? (tags+=Tag )* ('description' description=STRING  )? (mainScenarios+=MainScenario )? ']' )?  
;

RefActor infers RefActor:
    refs+=[Actor:QualifiedName ] (',' refs+=[Actor:QualifiedName ] )*  
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

MainScenario infers MainScenario:
    'mainScenario' name=ID  '(' 'Main' ')' (nameAlias=STRING )? ('[' ('description' description=STRING  )? (steps+=Step )* ']' )?  
;

StepOperationUCType infers StepOperationUCType:
    ^type=('ExtendedBy' | 'Include' ) 
;

Step infers Step:
    name=ID  (('(' (^type=StepType  (':' subType=StepSubType  )? ) ')' (nameAlias=STRING ) ) | (('(' typeUC=StepOperationUCType  ) (usecase=[UseCase:QualifiedName ]) ')' (nameAlias=STRING )? ) )('actor' actor=[Actor:QualifiedName ] )? ('event' event=[ActiveEvent:QualifiedName ] )? ('repeat' repeat=STRING  )? ('description' description=STRING  )? ('nextStep' next=[Step:QualifiedName ] )? ('[' (scenarios+=Scenario )* ']' )?  
;

Scenario infers Scenario:
    'scenario' name=ID  '(' ^type=ScenarioType  ')' (nameAlias=STRING ) ('repeat' repeat=STRING  )? ('[' ('description' description=STRING  )? (steps+=Step )* ']' )?  
;

StateMachine infers StateMachine:
    'StateMachine' name=ID  (nameAlias=STRING )? ':' ^type=StateMachineType  ('[' 'dataEntity' entity=[DataEntityGeneric:QualifiedName ] (tags+=Tag )* ('description' description=STRING  )? states=States  ']' )?  
;

States infers States:
    { infer State} states+=State *  
;

State infers State:
    'state' name=ID  (nameAlias=STRING )? (isInitial?='isInitial' )? (isFinal?='isFinal' )? ('onEntry' onEntry=STRING  )? ('onExit' onExit=STRING  )? (':' (transitions+=Transition ) )? (transitions+=Transition )*  
;

Transition infers Transition:
    (ucAction=RefUCAction  ('nextState' nextstate=[State:ID ] )? ) 
;

RefUCAction infers RefUCAction:
    'useCase' useCase=[UseCase:QualifiedName ] 'action' action=ActionType   
;

AcceptanceCriteria infers AcceptanceCriteria:
    'acceptanceCriteria' name=ID  (nameAlias=STRING )? ':' ^type=TestType  ('[' ((isConcrete?='isConcrete' ) | (isAbstract?='isAbstract' ) )?(criteriaS=AcceptanceCriteriaScenario  | criteriaR=AcceptanceCriteriaRule  )(tags+=Tag )* ('description' description=STRING  )? ']' )?  
;

TestSuite infers TestSuite:
    'TestSuite' name=ID  (nameAlias=STRING )? ':' ^type=SystemType  (':' subType=SystemSubType  )? ('[' ((isReusable?='isReusable' ) | (isFinal?='isFinal' ) )?('systemUnderTest' sut=[System:QualifiedName ] ) (tags+=Tag )* ('description' description=STRING  )? ']' ) (elements+=TestElement )*  
;

TestElement infers TestElement:
    Test | TestData | TestSuiteSetupTeardown 
;

TestData infers TestData:
    Data 
;

TestSuiteSetupTeardown infers TestSuiteSetupTeardown:
    TestSuiteSetup | TestSuiteTeardown 
;

TestSuiteSetup infers TestSuiteSetup:
    { infer TestSuiteSetup} 'Setup' ('[' (testSteps+=TestStep )* ']' )  
;

TestSuiteTeardown infers TestSuiteTeardown:
    { infer TestSuiteTeardown} 'Teardown' ('[' (testSteps+=TestStep )* ']' )  
;

Test infers Test:
    AcceptanceCriteriaTest | DataEntityTest | UseCaseTest | StateMachineTest 
;

AcceptanceCriteriaTest infers AcceptanceCriteriaTest:
    'AcceptanceCriteriaTest' name=ID  (nameAlias=STRING )? ':' ^type=TestType  ('[' ('requirement' requirement=[Requirement:QualifiedName ] ) (criteriaS+=AcceptanceCriteriaScenario  | criteriaR+=AcceptanceCriteriaRule  )(tags+=Tag )* ('description' description=STRING  )? ']' )?  
;

AcceptanceCriteriaScenario infers AcceptanceCriteriaScenario:
    'scenario' scenario=STRING  ('given' given+=STRING  (('given' | 'and' )given+=STRING  )* )? ('when' when+=STRING  (('when' | 'and' )when+=STRING  )* )? ('then' then+=STRING  (('then' | 'and' | 'but' )then+=STRING  )* )?  
;

AcceptanceCriteriaRule infers AcceptanceCriteriaRule:
    'rule' rule=STRING   
;

DataEntityTest infers DataEntityTest:
    'DataEntityTest' name=ID  (nameAlias=STRING )? ':' ^type=TestType  ('[' 'dataEntity' entity=[DataEntity:QualifiedName ] (':=' table=DataTable  )? (testDataAttributes+=TestDataAttribute )* ('message' message=STRING  )? (tags+=Tag )* ('description' description=STRING  )? ']' )?  
;

TestDataAttribute infers TestDataAttribute:
    'testAttribute' attribute=[DataAttribute:QualifiedName ] '(' ('partitionClass' ^type=DataAttributeType  ('(' size=DoubleOrInt  ')' )? )? ('values' values=STRING  )? (isNotNull='isNotNull' )? (isUnique='isUnique' )? (isDerived='isDerived' )? (isReadOnly='isReadOnly' )? (isEncrypted='isEncrypted' )? ('message' message=STRING  )? ')'  
;

StateMachineTest infers StateMachineTest:
    'StateMachineTest' name=ID  (nameAlias=STRING )? ':' ^type=TestType  ('[' 'stateMachine' stateMachine=[StateMachine:QualifiedName ] stateSequence=StateSequence  ('message' message=STRING  )? (tags+=Tag )* ('description' description=STRING  )? ']' )?  
;

StateSequence infers StateSequence:
    'stateSequence' refState+=[State:QualifiedName ] (',' refState+=[State:QualifiedName ] )*  
;

UseCaseTest infers UseCaseTest:
    'UseCaseTest' name=ID  (nameAlias=STRING )? ('[' 'useCase' useCase=[UseCase:QualifiedName ] ('primaryActor' primaryActor=[Actor:QualifiedName ] )? ('supportingActors' supportingActors+=RefActor  )? (tags+=Tag )* ('description' description=STRING  )? ('oneTimeSetup' '[' (oneTimeSetupSteps+=TestStep )* ']' )? ('oneTimeTeardown' '[' (oneTimeTeardownSteps+=TestStep )* ']' )? (testCases+=TestCase )* ']' )?  
;

TestCase infers TestCase:
    'testCase' name=ID  (nameAlias=STRING )? ('[' (testParameters+=TestParameter )* ('dataEntity' entity=[DataEntity:QualifiedName ] (':=' entityTable=DataTable  )? )? ('description' description=STRING  )? (testSteps+=TestStep )* ']' )?  
;

TestParameter infers TestParameter:
    ('parameter' name=ID  ) 
;

TestStep infers TestStep:
    { infer TestStep} (('(' (^type=StepType  (':' subType=StepSubType  )? ) ')' ) | ('Execute' testCase=[TestCase:QualifiedName ] ) )(nameAlias=STRING )? ('actor' actor=[Actor:QualifiedName ] )? ('event' event=[ActiveEvent:QualifiedName ] )? ('description' description=STRING  )?  
;

Vulnerability infers Vulnerability:
    'Vulnerability' name=ID  (nameAlias=STRING )? ':' ^type=VulnerabilityType  (':' subType=VulnerabilitySubType  )? ('[' ('isA' super=[Vulnerability:QualifiedName ] )? ('partOf' ('optional' | 'mandatory' )?partOf=[Vulnerability:QualifiedName ] )? ('attack' attack=STRING  )? ('attackVector' attackVector=VulnerabilityAttackVector  )? ('score' score=DoubleOrInt  )? ('solution' solution=RefRequirements  )? (tags+=Tag )* ('description' description=STRING  )? ']' )?  
;

RefRequirements infers RefRequirements:
    refs+=[Requirement:QualifiedName ] (',' refs+=[Requirement:QualifiedName ] )*  
;

Risk infers Risk:
    { infer Risk} 'Risk' name=ID  (nameAlias=STRING )? ':' ^type=RiskType  (':' subType=RiskSubType  )? ('[' ('isNegativeRequirement' negativeRequirement=[Requirement:QualifiedName ] )? ('partOf' ('optional' | 'mandatory' )?partOf=[Risk:QualifiedName ] )? ('vulnerabilities' refVulnerabilities+=[Vulnerability:QualifiedName ] (',' refVulnerabilities+=[Vulnerability:QualifiedName ] )* )? (assessment=RiskAssessment )? (treatments+=RiskTreatment )* ('status' status=RiskStatus  )? (acceptanceCriteria+=AcceptanceCriteria )* (tags+=Tag )* ('description' description=STRING  )? ']' )?  
;

RiskAssessment infers RiskAssessment:
    { infer RiskAssessment} 'assessment' '[' ('probability' probability=DoubleOrInt  )? ('consequence' consequence=DoubleOrInt  )? ('impact' impact=DoubleOrInt  )? ('impactLevel' impactLevel=ImpactLevel  )? ']'  
;

RiskTreatment infers RiskTreatment:
    { infer RiskTreatment} 'treatment' name=ID  (nameAlias=STRING )? ':' ^type=RiskTreatmentType  ('[' ('solution' solution=RefRequirements  )? ('owner' owner=[Stakeholder:QualifiedName ] )? ('description' description=STRING  )? ']' )?  
;

Threat infers Threat:
    value=Risk  
;

ElementsRelation infers ElementsRelation:
    'ElementsRelation' name=ID  (nameAlias=STRING )? ':' ^type=ElementsRelationType  ('[' 'source' source=[SystemElement:QualifiedName ] 'target' target=[SystemElement:QualifiedName ] (tags+=Tag )* ('description' description=STRING  )? ']' )?  
;

SystemsRelation infers SystemsRelation:
    'SystemsRelation' name=ID  (nameAlias=STRING )? ':' ^type=SystemsRelationType  ('[' 'source' source=[System:ID ] 'target' target=[System:ID ] 'category' category=SystemsRelationCategory  (tags+=Tag )* ('description' description=STRING  )? ']' )?  
;

RequirementsRelation infers RequirementsRelation:
    'RequirementsRelation' name=ID  (nameAlias=STRING )? ':' ^type=RequirementsRelationType  ('[' 'source' source=[Requirement:QualifiedName ] 'target' target=[Requirement:QualifiedName ] (tags+=Tag )* ('description' description=STRING  )? ']' )?  
;

TestsRelation infers TestsRelation:
    'TestsRelation' name=ID  (nameAlias=STRING )? ':' ^type=TestsRelationType  ('[' 'source' source=[Test:QualifiedName ] 'target' target=[Test:QualifiedName ] (tags+=Tag )* ('description' description=STRING  )? ']' )?  
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

type PartOfSpeechEnum = 'Adjective' | 'Adposition' | 'Adverb' | 'Auxiliary' | 'CoordinatingConjunction' | 'Determiner' | 'Interjection' | 'Noun' | 'Numeral' | 'Particle' | 'Pronoun' | 'ProperNoun' | 'Punctuation' | 'SubordinatingConjunction' | 'Symbol' | 'Verb' | 'Other';
PartOfSpeechEnum returns PartOfSpeechEnum:
    PartOfSpeechEnum_ADJ | PartOfSpeechEnum_ADP | PartOfSpeechEnum_ADV | PartOfSpeechEnum_AUX | PartOfSpeechEnum_CCONJ | PartOfSpeechEnum_DET | PartOfSpeechEnum_INTJ | PartOfSpeechEnum_NOUN | PartOfSpeechEnum_NUM | PartOfSpeechEnum_PART | PartOfSpeechEnum_PRON | PartOfSpeechEnum_PROPN | PartOfSpeechEnum_PUNCT | PartOfSpeechEnum_SCONJ | PartOfSpeechEnum_SYM | PartOfSpeechEnum_VERB | PartOfSpeechEnum_X
;
PartOfSpeechEnum_ADJ returns string: 'Adjective' ;
PartOfSpeechEnum_ADP returns string: 'Adposition' ;
PartOfSpeechEnum_ADV returns string: 'Adverb' ;
PartOfSpeechEnum_AUX returns string: 'Auxiliary' ;
PartOfSpeechEnum_CCONJ returns string: 'CoordinatingConjunction' ;
PartOfSpeechEnum_DET returns string: 'Determiner' ;
PartOfSpeechEnum_INTJ returns string: 'Interjection' ;
PartOfSpeechEnum_NOUN returns string: 'Noun' ;
PartOfSpeechEnum_NUM returns string: 'Numeral' ;
PartOfSpeechEnum_PART returns string: 'Particle' ;
PartOfSpeechEnum_PRON returns string: 'Pronoun' ;
PartOfSpeechEnum_PROPN returns string: 'ProperNoun' ;
PartOfSpeechEnum_PUNCT returns string: 'Punctuation' ;
PartOfSpeechEnum_SCONJ returns string: 'SubordinatingConjunction' ;
PartOfSpeechEnum_SYM returns string: 'Symbol' ;
PartOfSpeechEnum_VERB returns string: 'Verb' ;
PartOfSpeechEnum_X returns string: 'Other' ;

PartOfSpeech infers PartOfSpeech:
    posTag=PartOfSpeechEnum  
;

type LinguisticRuleSeverityLevel = 'Warning' | 'Error';
LinguisticRuleSeverityLevel returns LinguisticRuleSeverityLevel:
    LinguisticRuleSeverityLevel_warning | LinguisticRuleSeverityLevel_error
;
LinguisticRuleSeverityLevel_warning returns string: 'Warning' ;
LinguisticRuleSeverityLevel_error returns string: 'Error' ;

type LinguisticLanguageType = 'English' | 'Spanish' | 'German' | 'French' | 'Italian' | 'Portuguese' | 'Japanese';
LinguisticLanguageType returns LinguisticLanguageType:
    LinguisticLanguageType_en | LinguisticLanguageType_es | LinguisticLanguageType_de | LinguisticLanguageType_fr | LinguisticLanguageType_it | LinguisticLanguageType_pt | LinguisticLanguageType_ja
;
LinguisticLanguageType_en returns string: 'English' ;
LinguisticLanguageType_es returns string: 'Spanish' ;
LinguisticLanguageType_de returns string: 'German' ;
LinguisticLanguageType_fr returns string: 'French' ;
LinguisticLanguageType_it returns string: 'Italian' ;
LinguisticLanguageType_pt returns string: 'Portuguese' ;
LinguisticLanguageType_ja returns string: 'Japanese' ;

Word infers Word:
    word=STRING  
;

LinguisticFragmentPart infers LinguisticFragmentPart:
    PartOfSpeech | Word | LinguisticRuleElementAndProperty | LinguisticFragmentRef 
;

LinguisticElement infers LinguisticElement:
    LinguisticRule | LinguisticFragment | LinguisticLanguage 
;

LinguisticLanguage infers LinguisticLanguage:
    'LinguisticLanguage' name=ID  (nameAlias=STRING )? ':' ^type=LinguisticLanguageType  ('[' ('description' description=STRING  )? ']' )?  
;

LinguisticFragment infers LinguisticFragment:
    'LinguisticFragment' name=ID  (nameAlias=STRING )? '(' options+=LinguisticFragmentPart  (',' options+=LinguisticFragmentPart  )* ')' ('description' description=STRING  )?  
;

LinguisticFragmentRef infers LinguisticFragmentRef:
    option=[LinguisticFragment:QualifiedName ] 
;

LinguisticRule infers LinguisticRule:
    'LinguisticRule' name=ID  (nameAlias=STRING )? ':' ^type=LinguisticRuleType  ('[' ('property' property=LinguisticRuleElementAndProperty  ) ('pattern' pattern+=LinguisticPattern  ('+' pattern+=LinguisticPattern  )* ) ('severity' severity=LinguisticRuleSeverityLevel  ) ('description' description=STRING  )? ']' )  
;

LinguisticPattern infers LinguisticPattern:
    parts+=LinguisticFragmentPart  | '(' parts+=LinguisticFragmentPart  ('|' parts+=LinguisticFragmentPart  )* ')'  
;

LinguisticRuleElementAndProperty infers LinguisticRuleElementAndProperty:
    element=LinguisticRuleElement  '.' property=LinguisticRuleElementProperty   
;

LinguisticRuleElement infers LinguisticRuleElement:
    element=StereotypeType  
;

type LinguisticRuleElementProperty = 'id' | 'name' | 'description';
LinguisticRuleElementProperty returns LinguisticRuleElementProperty:
    LinguisticRuleElementProperty_id | LinguisticRuleElementProperty_name | LinguisticRuleElementProperty_description
;
LinguisticRuleElementProperty_id returns string: 'id' ;
LinguisticRuleElementProperty_name returns string: 'name' ;
LinguisticRuleElementProperty_description returns string: 'description' ;

terminal ID: /[_a-zA-Z][\w_]*/;
terminal INT returns number: /[0-9]+/;
terminal STRING: /"(\\.|[^"\\])*"|'(\\.|[^'\\])*'/;

hidden terminal ML_COMMENT: /\/\*[\s\S]*?\*\//;
hidden terminal SL_COMMENT: /\/\/[^\n\r]*/;
hidden terminal WS: /\s+/;