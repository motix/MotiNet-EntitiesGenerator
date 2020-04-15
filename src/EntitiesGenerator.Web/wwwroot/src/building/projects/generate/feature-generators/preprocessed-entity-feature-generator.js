import ContentHelper from '../content-helper';
import FeatureGenerator from './feature-generator';

export default class PreprocessedEntityFeatureGenerator extends FeatureGenerator {
    get featureType() {
        return 'PreprocessedEntity';
    }

    // IntelliSense support
    /**
     * @param {Item} item
     * @return {PreprocessedEntityFeatureSetting}
     */
    itemFeatureSetting(item) {
        return super.itemFeatureSetting(item);
    }

    // Project specific content

    // Core

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_EntityManagerInterface_ManagerInterfacesData(item, data) {
        this.throwIfItemNotHasFeature(item);

        data.push(`IPreprocessedEntityManager${this.itemGenericTypeParameters(item)}`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_EntityManagerClass_ConstructorParametersData(item, data) {
        this.throwIfItemNotHasFeature(item);

        data.push(`IEntityPreprocessor<T${item.name}> preprocessor`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_EntityManagerClass_PropertiesAssignmentsData(item, data) {
        this.throwIfItemNotHasFeature(item);

        data.push('EntityPreprocessor = preprocessor ?? throw new ArgumentNullException(nameof(preprocessor));');
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_EntityManagerClass_PropertiesDeclarations2Data(item, data) {
        this.throwIfItemNotHasFeature(item);

        data.push(`public IEntityPreprocessor<T${item.name}> EntityPreprocessor { get; }`);
    }
}
