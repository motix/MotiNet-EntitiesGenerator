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
        this.throwIfItemNotHaveFeature(item);

        data.push(`IPreprocessedEntityManager${this.itemGenericTypeParameters(item)}`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_EntityManagerClass_ConstructorParametersData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        data.push(`IEntityPreprocessor<T${item.name}> preprocessor`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_EntityManagerClass_PropertiesAssignmentsData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        data.push('EntityPreprocessor = preprocessor ?? throw new ArgumentNullException(nameof(preprocessor));');
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_EntityManagerClass_PropertiesDeclarations2Data(item, data) {
        this.throwIfItemNotHaveFeature(item);

        data.push(`public IEntityPreprocessor<T${item.name}> EntityPreprocessor { get; }`);
    }

    // AspNetCore

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    asp_EntityManagerClass_ConstructorParametersData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        data.push(`IEntityPreprocessor<T${item.name}> preprocessor`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    asp_EntityManagerClass_BaseConstructorParametersData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        data.push('preprocessor');
    }
}
