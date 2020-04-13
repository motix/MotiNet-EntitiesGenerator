import ContentHelper from '../content-helper';
import FeatureGenerator from './feature-generator';

export default class CodeBasedEntityFeatureGenerator extends FeatureGenerator {
    get featureType() {
        return 'CodeBasedEntityFeature';
    }

    // IntelliSense support
    /**
     * @param {Item} item
     * @return {CodeBasedEntityFeatureSetting}
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
