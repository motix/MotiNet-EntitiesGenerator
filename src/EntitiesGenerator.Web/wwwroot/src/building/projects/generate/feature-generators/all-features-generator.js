import TypeLists from '../../../shared/type-lists';
import { StringHelper } from '../content-helper';
import FeatureGenerator from './feature-generator';
import EntityFeatureGenerator from './entity-feature-generator';
import ReadableIdEntityFeatureGenerator from './readable-id-entity-feature-generator';
import TimeTrackedEntityFeatureGenerator from './time-tracked-entity-feature-generator';
import OnOffEntityFeatureGenerator from './on-off-entity-feature-generator';
import CodeBasedEntityFeatureGenerator from './code-based-entity-feature-generator';
import NameBasedEntityFeatureGenerator from './name-based-entity-feature-generator';
import ScopedNameBasedEntityFeatureGenerator from './scoped-name-based-entity-feature-generator';
import ChildEntityFeatureGenerator from './child-entity-feature-generator';
import PreprocessedEntityFeatureGenerator from './preprocessed-entity-feature-generator';

export default class AllFeaturesGenerator {
    constructor() {
        this.entityFeatureGenerator = new EntityFeatureGenerator();
        this.readableIdEntityFeatureGenerator = new ReadableIdEntityFeatureGenerator();
        this.timeTrackedEntityFeatureGenerator = new TimeTrackedEntityFeatureGenerator();
        this.onOffEntityFeatureGenerator = new OnOffEntityFeatureGenerator();
        this.codeBasedEntityFeatureGenerator = new CodeBasedEntityFeatureGenerator();
        this.nameBasedEntityFeatureGenerator = new NameBasedEntityFeatureGenerator();
        this.scopedNameBasedEntityFeatureGenerator = new ScopedNameBasedEntityFeatureGenerator();
        this.childEntityFeatureGenerator = new ChildEntityFeatureGenerator();
        this.preprocessedEntityFeatureGenerator = new PreprocessedEntityFeatureGenerator();

        /**
         * @type FeatureGenerator[]
         */
        this.allFeatures = _.map(TypeLists.featureSettingTypes, value => this[`${_.lowerFirst(value)}FeatureGenerator`]);
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
     */
    moduleBuilderEntityNames(module) {
        const entities = this.moduleEntityNames(module);

        _.remove(entities, value => value.modelOnly);

        return entities;
    }

    /**
     * @param {Module} module
     */
    moduleModelOnlyEntityNames(module) {
        const entities = this.moduleEntityNames(module);

        _.remove(entities, value => !value.modelOnly);

        return entities;
    }

    /**
     * @param {Module} module
     * @param {number} indent
     * @param {boolean} [includeKeyType]
     * @param {NewLineIfNotEmptyConfig} [newLineIfNotEmpty]
     */
    moduleGenericTypeParameters(module, indent, includeKeyType, newLineIfNotEmpty) {
        const entities = this.moduleBuilderEntityNames(module);

        if (includeKeyType === true) {
            entities.push({
                name: 'Key',
                lineBreak: true
            })
        }

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
     * @param {boolean} [includeKeyType]
     * @param {NewLineIfNotEmptyConfig} [newLineIfNotEmpty]
     */
    moduleGenericTypeConstraints(module, indent, includeKeyType, newLineIfNotEmpty) {
        const entities = this.moduleBuilderEntityNames(module);

        if (includeKeyType === true) {
            entities.push({
                name: 'Key',
                lineBreak: true
            })
        }

        var parameters = _.map(entities,
            (value, index) => includeKeyType === true && index === entities.length - 1 ? 'where TKey : IEquatable<TKey>' : `where T${value.name} : class`);

        var str = parameters.join('\n');
        str = StringHelper.indent(str, indent);

        if (!_.isUndefined(newLineIfNotEmpty)) {
            str = StringHelper.newLineIfNotEmpty(str, newLineIfNotEmpty);
        }

        return str;
    }

    /**
     * @param {Module} module
     * @param {number} indent
     * @param {boolean} [includeKeyType]
     * @param {NewLineIfNotEmptyConfig} [newLineIfNotEmpty]
     */
    moduleSpecificTypeParameters(module, indent, includeKeyType, newLineIfNotEmpty) {
        const entities = this.moduleBuilderEntityNames(module);

        if (includeKeyType === true) {
            entities.push({
                name: 'string',
                lineBreak: true
            })
        }

        const parameters = _.map(entities, value => ({ text: value.name, lineBreak: value.lineBreak }));

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
     * @param {Item} item
     */
    itemEntityNames(item) {
        /**
         * @type {EntityNameListItem[]};
         */
        var entities = [{
            item: item,
            name: item.name,
            modelOnly: item.modelOnly,
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
    itemEmptyGenericTypeParameters(item) {
        const entities = this.itemEntityNames(item);
        const str = `<${_.repeat(',', entities.length - 1)}>`;

        return str;
    }

    /**
     * @param {Item} item
     */
    itemMakeGenericTypeParameters(item) {
        const entities = this.itemEntityNames(item);
        const parameters = _.map(entities, value => `builder.${value.name}Type`);
        const str = parameters.join(', ');

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