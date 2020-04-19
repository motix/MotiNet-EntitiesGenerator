import FeatureGenerator from './feature-generator';

export default class ChildEntityFeatureGenerator extends FeatureGenerator {
    get featureType() {
        return 'ChildEntity';
    }

    // IntelliSense support
    /**
     * @param {Item} item
     * @return {ChildEntityFeatureSetting}
     */
    itemFeatureSetting(item) {
        return super.itemFeatureSetting(item);
    }

    // Feature settings

    /**
     * @param {Item} item
     */
    parentName(item) {
        return this.itemFeatureSetting(item).parentName;
    }

    /**
     * @param {Item} item
     */
    deleteRestrict(item) {
        return this.itemFeatureSetting(item).deleteRestrict;
    }

    /**
     * @param {Item} item
     */
    hasSortedChildrenInParent(item) {
        return this.itemFeatureSetting(item).hasSortedChildrenInParent;
    }

    /**
     * @param {Item} item
     */
    sortedChildrenInParentCriteriaPropertyName(item) {
        return this.itemFeatureSetting(item).sortedChildrenInParentCriteriaPropertyName;
    }

    // Project specific content

    // Core

    // SealedModels

    // EntityFrameworkCore.SealedModels

    // AspNetCore

    // AspNetCore.Mvc.DefaultViewModels
}
