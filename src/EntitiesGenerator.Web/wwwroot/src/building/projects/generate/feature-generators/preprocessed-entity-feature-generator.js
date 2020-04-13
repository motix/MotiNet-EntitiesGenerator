import ContentHelper from '../content-helper';
import FeatureGenerator from './feature-generator';

export default class PreprocessedEntityFeatureGenerator extends FeatureGenerator {
    get featureType() {
        return 'PreprocessedEntityFeature';
    }

    // IntelliSense support
    /**
     * @param {Item} item
     * @return {PreprocessedEntityFeatureSetting}
     */
    itemFeatureSetting(item) {
        return super.itemFeatureSetting(item);
    }
}
