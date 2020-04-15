export default class FeatureGenerator {
    get featureType() {
        return null;
    }

    /**
     * @param {Item} item
     */
    itemHasFeature(item) {
        return this.itemFeatureSetting(item) !== null;
    }

    /**
     * @param {Item} item
     * @return {FeatureSetting}
     */
    itemFeatureSetting(item) {
        const propertyName = _.lowerFirst(`${this.featureType}FeatureSetting`);
        return item[propertyName];
    }

    /**
     * @param {Module} module
     */
    moduleValidationRequired(module) {
        for (const item of module.items) {
            if (this.itemHasFeature(item) && this.itemValidationRequired(item)) {
                return true;
            }
        }

        return false;
    }

    /**
     * @param {Item} item
     */
    itemValidationRequired(item) {
        this.throwIfItemNotHasFeature(item);

        return false;
    }

    /**
     * @param {Item} item
     * @return {EntityNameListItem[]}
     */
    itemEntityNames(item) {
        this.throwIfItemNotHasFeature(item);

        return [{
            item: item,
            name: item.name,
            lineBreak: item.parameterListLineBreak
        }];
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
     */
    throwIfItemNotHasFeature(item) {
        if (!this.itemHasFeature(item)) {
            const error = new ItemNotHasFeatureError(item, this);
            console.error(error);
            throw error.message;
        }
    }

    // Project specific content

    // Core

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_EntityManagerInterface_FeaturesCommentData(item, data) {
        this.throwIfItemNotHasFeature(item);

        data.push(this.featureType);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_EntityManagerInterface_ManagerInterfacesData(item, data) {
        this.throwIfItemNotHasFeature(item);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_EntityStoreInterface_StoreInterfacesData(item, data) {
        this.throwIfItemNotHasFeature(item);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_EntityAccessorInterface_AccessorInterfacesData(item, data) {
        this.throwIfItemNotHasFeature(item);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_EntityManagerClass_ConstructorParametersData(item, data) {
        this.throwIfItemNotHasFeature(item);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_EntityManagerClass_PropertiesAssignmentsData(item, data) {
        this.throwIfItemNotHasFeature(item);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_EntityManagerClass_PropertiesDeclarations1Data(item, data) {
        this.throwIfItemNotHasFeature(item);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_EntityManagerClass_PropertiesDeclarations2Data(item, data) {
        this.throwIfItemNotHasFeature(item);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_EntityValidatorClass_ValidationsData(item, data) {
        this.throwIfItemNotHasFeature(item);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_EntityValidatorClass_SubEntityValidationsData(item, data) {
        this.throwIfItemNotHasFeature(item);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_ErrorDescriberClass_DescribersData(item, data) {
        this.throwIfItemNotHasFeature(item);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_ErrorDescriberResourcesClass_ItemsData(item, data) {
        this.throwIfItemNotHasFeature(item);
    }

    /**
     * @param {Item} item
     * @param {ParameterListItem[]} data
     */
    core_BuilderClass_ConstructorParametersData(item, data) {
        this.throwIfItemNotHasFeature(item);
    }

    /**
     * @param {Item} item
     * @param {ParameterListItem[]} data
     */
    core_BuilderClass_ConstructBuilderParametersData(item, data) {
        this.throwIfItemNotHasFeature(item);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_BuilderClass_PropertiesDeclarationsData(item, data) {
        this.throwIfItemNotHasFeature(item);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_DependencyInjectionClass_EntityServiceRegistrationsData(item, data) {
        this.throwIfItemNotHasFeature(item);
    }
}

class ItemNotHasFeatureError {
    /**
     * @param {Item} item
     * @param {FeatureGenerator} featureGenerator
     */
    constructor(item, featureGenerator) {
        this.item = item;
        this.featureGenerator = featureGenerator;
        this.itemName = item.name;
        this.featureType = featureGenerator.featureType;
        this.message = `Item ${this.itemName} does not has feature ${this.featureType}.`;
    }
}
