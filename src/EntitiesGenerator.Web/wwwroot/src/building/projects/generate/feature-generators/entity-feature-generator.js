import ContentHelper from '../content-helper';
import FeatureGenerator from './feature-generator';

export default class EntityFeatureGenerator extends FeatureGenerator {
    get featureType() {
        return 'EntityFeature';
    }

    // IntelliSense support
    /**
     * @param {Item} item
     * @return {EntityFeatureSetting}
     */
    itemFeatureSetting(item) {
        return super.itemFeatureSetting(item);
    }
}
