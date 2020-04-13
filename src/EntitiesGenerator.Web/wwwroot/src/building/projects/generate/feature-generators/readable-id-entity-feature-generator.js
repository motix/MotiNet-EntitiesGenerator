import ContentHelper from '../content-helper';
import FeatureGenerator from './feature-generator';

export default class ReadableIdEntityFeatureGenerator extends FeatureGenerator {
    get featureType() {
        return 'ReadableIdEntityFeature';
    }

    // IntelliSense support
    /**
     * @param {Item} item
     * @return {ReadableIdEntityFeatureSetting}
     */
    itemFeatureSetting(item) {
        return super.itemFeatureSetting(item);
    }
}
