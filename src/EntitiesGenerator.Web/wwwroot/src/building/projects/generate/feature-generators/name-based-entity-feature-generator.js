import ContentHelper from '../content-helper';
import FeatureGenerator from './feature-generator';

export default class NameBasedEntityFeatureGenerator extends FeatureGenerator {
    get featureType() {
        return 'NameBasedEntityFeature';
    }

    // IntelliSense support
    /**
     * @param {Item} item
     * @return {NameBasedEntityFeatureSetting}
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
}
