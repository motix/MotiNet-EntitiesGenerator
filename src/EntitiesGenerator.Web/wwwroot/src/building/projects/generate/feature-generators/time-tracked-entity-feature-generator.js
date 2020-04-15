import ContentHelper from '../content-helper';
import FeatureGenerator from './feature-generator';

export default class TimeTrackedEntityFeatureGenerator extends FeatureGenerator {
    get featureType() {
        return 'TimeTrackedEntity';
    }

    // IntelliSense support
    /**
     * @param {Item} item
     * @return {TimeTrackedEntityFeatureSetting}
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

        data.push(`ITimeTrackedEntityManager${this.itemGenericTypeParameters(item)}`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_EntityStoreInterface_StoreInterfacesData(item, data) {
        this.throwIfItemNotHasFeature(item);

        data.push(`ITimeTrackedEntityStore${this.itemGenericTypeParameters(item)}`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_EntityAccessorInterface_AccessorInterfacesData(item, data) {
        this.throwIfItemNotHasFeature(item);

        data.push(`ITimeTrackedEntityAccessor${this.itemGenericTypeParameters(item)}`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_EntityManagerClass_PropertiesDeclarations1Data(item, data) {
        this.throwIfItemNotHasFeature(item);

        data.push(`public ITimeTrackedEntityStore${this.itemGenericTypeParameters(item)} TimeTrackedEntityStore => Store as ITimeTrackedEntityStore${this.itemGenericTypeParameters(item)};`);
        data.push(`public ITimeTrackedEntityAccessor${this.itemGenericTypeParameters(item)} TimeTrackedEntityAccessor => Accessor as ITimeTrackedEntityAccessor${this.itemGenericTypeParameters(item)};`);
    }
}
