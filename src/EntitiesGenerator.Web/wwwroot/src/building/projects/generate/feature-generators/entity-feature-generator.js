import ContentHelper from '../content-helper';
import FeatureGenerator from './feature-generator';

export default class EntityFeatureGenerator extends FeatureGenerator {
    get featureType() {
        return 'Entity';
    }

    // IntelliSense support
    /**
     * @param {Item} item
     * @return {EntityFeatureSetting}
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

        data.push(`IEntityManager${this.itemGenericTypeParameters(item)}`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_EntityStoreInterface_StoreInterfacesData(item, data) {
        this.throwIfItemNotHasFeature(item);

        data.push(`IEntityStore${this.itemGenericTypeParameters(item)}`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_EntityAccessorInterface_AccessorInterfacesData(item, data) {
        this.throwIfItemNotHasFeature(item);

        data.push(`IEntityAccessor${this.itemGenericTypeParameters(item)}`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_EntityManagerClass_PropertiesDeclarations1Data(item, data) {
        this.throwIfItemNotHasFeature(item);

        data.push(`public IEntityStore${this.itemGenericTypeParameters(item)} EntityStore => Store as IEntityStore${this.itemGenericTypeParameters(item)};`);
        data.push(`public IEntityAccessor${this.itemGenericTypeParameters(item)} EntityAccessor => Accessor as IEntityAccessor${this.itemGenericTypeParameters(item)};`);
    }
}
