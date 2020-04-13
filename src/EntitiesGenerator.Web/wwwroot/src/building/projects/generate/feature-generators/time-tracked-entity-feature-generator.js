import ContentHelper from '../content-helper';
import FeatureGenerator from './feature-generator';

export default class TimeTrackedEntityFeatureGenerator extends FeatureGenerator {
    get featureType() {
        return 'TimeTrackedEntityFeature';
    }

    // IntelliSense support
    /**
     * @param {Item} item
     * @return {TimeTrackedEntityFeatureSetting}
     */
    itemFeatureSetting(item) {
        return super.itemFeatureSetting(item);
    }
}
