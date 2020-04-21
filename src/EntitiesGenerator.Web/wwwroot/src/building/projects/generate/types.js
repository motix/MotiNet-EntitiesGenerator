/**
 * @typedef {Object} Folder
 * @property {string} type
 * @property {string} folderType
 * @property {string} fileType
 * @property {string} name
 * @property {Folder[]} children
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
 */

/**
 * @typedef {Object} Item
 * @property {string} name
 * @property {string} displayName
 * @property {boolean} parameterListLineBreak
 * @property {boolean} abstractModel
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
 * @typedef {FeatureSetting & {codePropertyName: string, hasCodeGenerator: boolean}} CodeBasedEntityFeatureSetting
 */

/**
 * @typedef {FeatureSetting & {namePropertyName: string}} NameBasedEntityFeatureSetting
 */

/**
 * @typedef {FeatureSetting & {scopeName: string, namePropertyName: string, deleteRestrict: boolean, hasSortedChildrenInScope: boolean, sortedChildrenInScopeCriteriaPropertyName: string}} ScopedNameBasedEntityFeatureSetting
 */

/**
 * @typedef {FeatureSetting & {parentName: string, deleteRestrict: boolean, hasSortedChildrenInParent: boolean, sortedChildrenInParentCriteriaPropertyName: string}} ChildEntityFeatureSetting
 */

/**
 * @typedef {FeatureSetting} PreprocessedEntityFeatureSetting
 */
