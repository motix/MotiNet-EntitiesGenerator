import ContentHelper from '../content-helper';
import FeatureGenerator, { ItemNotHasFeature } from './feature-generator';

export default class ScopedNameBasedEntityFeatureGenerator extends FeatureGenerator {
    get featureType() {
        return 'ScopedNameBasedEntityFeature';
    }

    // IntelliSense support
    /**
     * @param {Item} item
     * @return {ScopedNameBasedEntityFeatureSetting}
     */
    itemFeatureSetting(item) {
        return super.itemFeatureSetting(item);
    }

    /**
     * @param {Item} item
     */
    itemValidationRequired(item) {
        this.throwIfItemNotHasFeature(item);

        return true;
    }

    /**
     * @param {Item} item
     */
    itemUnmanagedSubEntities(item) {
        this.throwIfItemNotHasFeature(item);

        const scopeName = this.itemFeatureSetting(item).scopeName;

        for (const otherItem of item.module.items) {
            if (otherItem !== item && otherItem.name === scopeName) {
                return [];
            }
        }

        return [scopeName];
    }
}
