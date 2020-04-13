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
 * @property {Project} project
 * @property {Item[]} items
 */

/**
 * @typedef {Object} Item
 * @property {string} name
 * @property {string} displayName
 * @property {boolean} parameterListLineBreak
 * @property {Module} module
 * @property {EntityFeatureSetting} entityFeatureSetting
 * @property {TimeTrackedEntityFeatureSetting} timeTrackedEntityFeatureSetting
 * @property {CodeBasedEntityFeatureSetting} codeBasedEntityFeatureSetting
 * @property {NameBasedEntityFeatureSetting} nameBasedEntityFeatureSetting
 * @property {ScopedNameBasedEntityFeatureSetting} scopedNameBasedEntityFeatureSetting
 * @property {ReadableIdEntityFeatureSetting} readableIdEntityFeatureSetting
 * @property {OnOffEntityFeatureSetting} onOffEntityFeatureSetting
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
 * @typedef {FeatureSetting} TimeTrackedEntityFeatureSetting
 */

/**
 * @typedef {FeatureSetting & {hasCodeGenerator: boolean}} CodeBasedEntityFeatureSetting
 */

/**
 * @typedef {FeatureSetting} NameBasedEntityFeatureSetting
 */

/**
 * @typedef {FeatureSetting & {scopeName: string}} ScopedNameBasedEntityFeatureSetting
 */

/**
 * @typedef {FeatureSetting} ReadableIdEntityFeatureSetting
 */

/**
 * @typedef {FeatureSetting} OnOffEntityFeatureSetting
 */

/**
 * @typedef {FeatureSetting} PreprocessedEntityFeatureSetting
 */
