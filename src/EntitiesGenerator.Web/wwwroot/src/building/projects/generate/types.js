/**
 * @typedef {Object} StructureNode
 * @property {string} type
 * @property {string} folderType
 * @property {string} fileType
 * @property {string} name
 * @property {StructureNode[]} children
 * @property {Object} generator
 */

/**
 * @typedef {Object} NewLineIfNotEmptyConfig
 * @property {boolean} startComma
 * @property {boolean} start
 * @property {boolean} endComma
 * @property {boolean} end
 * @property {number} endIndent
 * @property {boolean} spaceIfEmpty
 */

/**
 * @typedef {Object} ParameterListItem
 * @property {string} text
 * @property {boolean} lineBreak
 */

/**
 * @typedef {Object} EntityNameListItem
 * @property {Item} item
 * @property {string} name
 * @property {boolean} modelOnly
 * @property {boolean} lineBreak
 * @property {boolean} isSubEntity
 * @property {boolean} isUnmanagedSubEntity
 */

/**
 * @typedef {Object} Project
 * @property {string} name
 * @property {string} namespace
 * @property {Module[]} modules
 */

/**
 * @typedef {Object} Module
 * @property {string} name
 * @property {boolean} hasOwnNamespace
 * @property {boolean} hasCoreOptions
 * @property {boolean} hasEntityFrameworkCoreSealedModelsOptions
 * @property {boolean} hasAspNetCoreOptions
 * @property {Project} project
 * @property {Item[]} items
 * @property {ItemsRelationship[]} itemsRelationships
 */

/**
 * @typedef {Object} Item
 * @property {string} name
 * @property {string} displayName
 * @property {boolean} parameterListLineBreak
 * @property {boolean} modelOnly
 * @property {boolean} abstractModel
 * @property {boolean} reverseMappingLiteViewModel
 * @property {Module} module
 * @property {EntityFeatureSetting} entityFeatureSetting
 * @property {ReadableIdEntityFeatureSetting} readableIdEntityFeatureSetting
 * @property {TimeTrackedEntityFeatureSetting} timeTrackedEntityFeatureSetting
 * @property {OnOffEntityFeatureSetting} onOffEntityFeatureSetting
 * @property {CodeBasedEntityFeatureSetting} codeBasedEntityFeatureSetting
 * @property {NameBasedEntityFeatureSetting} nameBasedEntityFeatureSetting
 * @property {ScopedNameBasedEntityFeatureSetting} scopedNameBasedEntityFeatureSetting
 * @property {ChildEntityFeatureSetting} childEntityFeatureSetting
 * @property {PreprocessedEntityFeatureSetting} preprocessedEntityFeatureSetting
 * @property {InterModuleEntityFeatureSetting} interModuleEntityFeatureSetting
 */

/**
 * @typedef {Object} FeatureSetting
 * @property {number} position
 */

/**
 * @typedef {FeatureSetting} EntityFeatureSetting
 */

/**
 * @typedef {FeatureSetting & {idSourcePropertyName: string}} ReadableIdEntityFeatureSetting
 */

/**
 * @typedef {FeatureSetting} TimeTrackedEntityFeatureSetting
 */

/**
 * @typedef {FeatureSetting & {useActiveField: boolean}} OnOffEntityFeatureSetting
 */

/**
 * @typedef {FeatureSetting & {codePropertyName: string, lookupNormalizer: string, hasCodeGenerator: boolean}} CodeBasedEntityFeatureSetting
 */

/**
 * @typedef {FeatureSetting & {namePropertyName: string, lookupNormalizer: string}} NameBasedEntityFeatureSetting
 */

/**
 * @typedef {FeatureSetting & {scopeName: string, namePropertyName: string, lookupNormalizer: string}} ScopedNameBasedEntityFeatureSetting
 */

/**
 * @typedef {FeatureSetting & {parentName: string}} ChildEntityFeatureSetting
 */

/**
 * @typedef {FeatureSetting} PreprocessedEntityFeatureSetting
 */

/**
 * @typedef {FeatureSetting} InterModuleEntityFeatureSetting
 */

/**
 * @typedef {Object} ItemsRelationship
 * @property {Module} module
 * @property {Item} item1
 * @property {Item} item2
 * @property {string} item1PropertyName
 * @property {string} item2PropertyName
 * @property {string} type
 */

/**
 * @typedef {ItemsRelationship & {parentNullable: boolean, deleteRestrict: boolean, hasSortedChildrenInParent: boolean, sortedChildrenInParentCriteriaPropertyName: string, hasFullChildrenInParentViewModel: boolean, hasFullParentInChildrenViewModel: boolean}} OneToManyItemsRelationship
 */

/**
 * @typedef {ItemsRelationship & {hasSortedItem2sInItem1: boolean, sortedItem2sInItem1CriteriaPropertyName: string, hasSortedItem1sInItem2: boolean, sortedItem1sInItem2CriteriaPropertyName: string, hasFullItem2sInItem1ViewModel: boolean, hasFullItem1sInItem2ViewModel: boolean}} ManyToManyItemsRelationship
 */
