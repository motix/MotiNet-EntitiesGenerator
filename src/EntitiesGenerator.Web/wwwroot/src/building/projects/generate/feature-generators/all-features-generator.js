import EntityFeatureGenerator from './entity-feature-generator';
import TimeTrackedEntityFeatureGenerator from './time-tracked-entity-feature-generator';
import CodeBasedEntityFeatureGenerator from './code-based-entity-feature-generator';
import NameBasedEntityFeatureGenerator from './name-based-entity-feature-generator';
import ScopedNameBasedEntityFeatureGenerator from './scoped-name-based-entity-feature-generator';
import ReadableIdEntityFeatureGenerator from './readable-id-entity-feature-generator';
import OnOffEntityFeatureGenerator from './on-off-entity-feature-generator';
import PreprocessedEntityFeatureGenerator from './preprocessed-entity-feature-generator';
import FeatureGenerator from './feature-generator';
import { StringHelper } from '../content-helper';

export default class AllFeaturesGenerator {
    constructor() {
        this.entityFeatureGenerator = new EntityFeatureGenerator();
        this.timeTrackedEntityFeatureGenerator = new TimeTrackedEntityFeatureGenerator();
        this.codeBasedEntityFeatureGenerator = new CodeBasedEntityFeatureGenerator();
        this.nameBasedEntityFeatureGenerator = new NameBasedEntityFeatureGenerator();
        this.scopedNameBasedEntityFeatureGenerator = new ScopedNameBasedEntityFeatureGenerator();
        this.readableIdEntityFeatureGenerator = new ReadableIdEntityFeatureGenerator();
        this.onOffEntityFeatureGenerator = new OnOffEntityFeatureGenerator();
        this.preprocessedEntityFeatureGenerator = new PreprocessedEntityFeatureGenerator();

        /**
         * @type FeatureGenerator[]
         */
        this.allFeatures = [
            this.entityFeatureGenerator,
            this.timeTrackedEntityFeatureGenerator,
            this.codeBasedEntityFeatureGenerator,
            this.nameBasedEntityFeatureGenerator,
            this.scopedNameBasedEntityFeatureGenerator,
            this.readableIdEntityFeatureGenerator,
            this.onOffEntityFeatureGenerator,
            this.preprocessedEntityFeatureGenerator
        ];
    }

    // Validations

    /**
     * @param {Module} module
     */
    moduleValidationRequired(module) {
        for (const feature of this.allFeatures) {
            if (feature.moduleValidationRequired(module)) {
                return true;
            }
        }

        return false;
    }

    /**
     * @param {Item} item
     */
    itemValidationRequired(item) {
        for (const feature of this.allFeatures) {
            if (feature.itemHasFeature(item) && feature.itemValidationRequired(item)) {
                return true;
            }
        }

        return false;
    }

    // Type parameters

    /**
     * @param {Module} module
     */
    moduleEntityNames(module) {
        /**
         * @type {EntityNameListItem[]};
         */
        var entities = [];

        for (const item of module.items) {
            entities = entities.concat(this.itemEntityNames(item));
        }

        for (const entity of entities) {
            if (entity.isSubEntity === true) {
                if (!_.some(entities,
                    value => value !== entity && value.name === entity.name && value.isSubEntity !== true)) {
                    entity.isUnmanagedSubEntity = true;
                }
            }
        }

        _.remove(entities, value => value.isSubEntity === true && value.isUnmanagedSubEntity !== true);

        return entities;
    }

    /**
     * @param {Module} module
     * @param {number} indent
     * @param {NewLineIfNotEmptyConfig} [newLineIfNotEmpty]
     */
    moduleGenericTypeParameters(module, indent, newLineIfNotEmpty) {
        const entities = this.moduleEntityNames(module);
        const parameters = _.map(entities, value => ({ text: `T${value.name}`, lineBreak: value.lineBreak }));

        var str = StringHelper.joinParameters(parameters, 0, {});

        if (str !== '') {
            str = `<${str}>`;

            var lines = str.split('\n');
            lines = _.map(lines, (value, index) => index === 0 ? value : ` ${value}`);

            str = lines.join('\n');
            str = StringHelper.indent(str, indent).trim();
        }

        if (!_.isUndefined(newLineIfNotEmpty)) {
            str = StringHelper.newLineIfNotEmpty(str, newLineIfNotEmpty);
        }

        return str;
    }

    /**
     * @param {Module} module
     * @param {number} indent
     * @param {NewLineIfNotEmptyConfig} [newLineIfNotEmpty]
     */
    moduleGenericTypeConstraints(module, indent, newLineIfNotEmpty) {
        const entities = this.moduleEntityNames(module);
        var parameters = _.map(entities, value => `where T${value.name} : class`);

        var str = parameters.join('\n');
        str = StringHelper.indent(str, indent);

        if (!_.isUndefined(newLineIfNotEmpty)) {
            str = StringHelper.newLineIfNotEmpty(str, newLineIfNotEmpty);
        }

        return str;
    }

    /**
     * @param {Item} item
     */
    itemEntityNames(item) {
        /**
         * @type {EntityNameListItem[]};
         */
        var entities = [{
            item: item,
            name: item.name,
            lineBreak: item.parameterListLineBreak
        }];

        for (const feature of this.allFeatures) {
            if (feature.itemHasFeature(item)) {
                entities = entities.concat(feature.itemEntityNames(item));
            }
        }

        entities = _.uniqBy(entities, value => value.name);

        return entities;
    }

    /**
     * @param {Item} item
     */
    itemGenericTypeParameters(item) {
        const entities = this.itemEntityNames(item);
        const parameters = _.map(entities, value => `T${value.name}`);

        var str = parameters.join(', ');
        str = `<${str}>`;

        return str;
    }

    /**
     * @param {Item} item
     * @param {number} indent
     */
    itemGenericTypeConstraints(item, indent) {
        const entities = this.itemEntityNames(item);
        var parameters = _.map(entities, value => `where T${value.name} : class`);

        var str = parameters.join('\n');
        str = StringHelper.indent(str, indent);

        return str;
    }

    /**
     * @param {Item} item
     */
    itemSpecificTypeParameters(item) {
        const entities = this.itemEntityNames(item);
        const parameters = _.map(entities, 'name');

        var str = parameters.join(', ');
        str = `<${str}>`;

        return str;
    }
}