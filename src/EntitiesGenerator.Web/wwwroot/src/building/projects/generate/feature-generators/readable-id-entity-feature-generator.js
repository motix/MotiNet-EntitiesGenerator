import ContentHelper from '../content-helper';
import FeatureGenerator from './feature-generator';

export default class ReadableIdEntityFeatureGenerator extends FeatureGenerator {
    get featureType() {
        return 'ReadableIdEntity';
    }

    // IntelliSense support
    /**
     * @param {Item} item
     * @return {ReadableIdEntityFeatureSetting}
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

        data.push(`IReadableIdEntityManager${this.itemGenericTypeParameters(item)}`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_EntityAccessorInterface_AccessorInterfacesData(item, data) {
        this.throwIfItemNotHasFeature(item);

        data.push(`IReadableIdEntityAccessor${this.itemGenericTypeParameters(item)}`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_EntityManagerClass_PropertiesDeclarations1Data(item, data) {
        this.throwIfItemNotHasFeature(item);

        data.push(`public IReadableIdEntityAccessor${this.itemGenericTypeParameters(item)} ReadableIdEntityAccessor => Accessor as IReadableIdEntityAccessor${this.itemGenericTypeParameters(item)};`);
    }
}
