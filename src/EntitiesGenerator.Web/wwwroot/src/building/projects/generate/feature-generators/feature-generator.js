import ContentHelper from '../content-helper';

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
        const propertyName = ContentHelper.getLowerCaseEntityName(`${this.featureType}Setting`);
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
     * @return {string[]}
     */
    itemUnmanagedSubEntities(item) {
        this.throwIfItemNotHasFeature(item);

        return [];
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
