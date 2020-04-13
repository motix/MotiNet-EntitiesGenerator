import ContentHelper from '../content-helper';
import FeatureGenerator from './feature-generator';

export default class OnOffEntityFeatureGenerator extends FeatureGenerator {
    get featureType() {
        return 'OnOffEntityFeature';
    }

    // IntelliSense support
    /**
     * @param {Item} item
     * @return {OnOffEntityFeatureSetting}
     */
    itemFeatureSetting(item) {
        return super.itemFeatureSetting(item);
    }
}
