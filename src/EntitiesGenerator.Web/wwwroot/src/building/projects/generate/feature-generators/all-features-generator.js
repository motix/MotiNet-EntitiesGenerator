import EntityFeatureGenerator from './entity-feature-generator';
import TimeTrackedEntityFeatureGenerator from './time-tracked-entity-feature-generator';
import CodeBasedEntityFeatureGenerator from './code-based-entity-feature-generator';
import NameBasedEntityFeatureGenerator from './name-based-entity-feature-generator';
import ScopedNameBasedEntityFeatureGenerator from './scoped-name-based-entity-feature-generator';
import ReadableIdEntityFeatureGenerator from './readable-id-entity-feature-generator';
import OnOffEntityFeatureGenerator from './on-off-entity-feature-generator';
import PreprocessedEntityFeatureGenerator from './preprocessed-entity-feature-generator';
import FeatureGenerator from './feature-generator';

export default class AllFeaturesGenerator {
    constructor() {
        this.entityFeatureGenerator = new EntityFeatureGenerator();
        this.timeTrackedEntityFeatureGenerator = new TimeTrackedEntityFeatureGenerator();
        this.codeBasedEntityFeatureGenerator = new CodeBasedEntityFeatureGenerator();
        this.nameBasedEntityFeatureGenerator = new NameBasedEntityFeatureGenerator();
        this.scopedNameBasedEntityFeatureGenerator = new ScopedNameBasedEntityFeatureGenerator();
        this.readableIdEntityFeatureGenerator = new ReadableIdEntityFeatureGenerator();
        this.onOffEntityFeatureGenerator = new OnOffEntityFeatureGenerator();
        this.preprocessedEntityFeatureGenerator = new PreprocessedEntityFeatureGenerator();

        /**
         * @type FeatureGenerator[]
         */
        this.allFeatures = [
            this.entityFeatureGenerator,
            this.timeTrackedEntityFeatureGenerator,
            this.codeBasedEntityFeatureGenerator,
            this.nameBasedEntityFeatureGenerator,
            this.scopedNameBasedEntityFeatureGenerator,
            this.readableIdEntityFeatureGenerator,
            this.onOffEntityFeatureGenerator,
            this.preprocessedEntityFeatureGenerator
        ];
    }

    /**
     * @param {Module} module
     */
    moduleValidationRequired(module) {
        for (const feature of this.allFeatures) {
            if (feature.moduleValidationRequired(module)) {
                return true;
            }
        }

        return false;
    }

    /**
     * @param {Item} item
     */
    itemValidationRequired(item) {
        for (const feature of this.allFeatures) {
            if (feature.itemHasFeature(item) && feature.itemValidationRequired(item)) {
                return true;
            }
        }

        return false;
    }

    /**
     * @param {Item} item
     * @return {string[]}
     */
    itemUnmanagedSubEntities(item) {
        var subEntities = [];

        for (const feature of this.allFeatures) {
            if (feature.itemHasFeature(item)) {
                subEntities = subEntities.concat(feature.itemUnmanagedSubEntities(item));
            }
        }

        return subEntities;
    }
}