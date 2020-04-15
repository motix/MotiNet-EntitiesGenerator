import ContentHelper from '../content-helper';
import FeatureGenerator from './feature-generator';

export default class OnOffEntityFeatureGenerator extends FeatureGenerator {
    get featureType() {
        return 'OnOffEntity';
    }

    // IntelliSense support
    /**
     * @param {Item} item
     * @return {OnOffEntityFeatureSetting}
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

        data.push(`IOnOffEntityManager${this.itemGenericTypeParameters(item)}`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_EntityStoreInterface_StoreInterfacesData(item, data) {
        this.throwIfItemNotHasFeature(item);

        data.push(`IOnOffEntityStore${this.itemGenericTypeParameters(item)}`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_EntityManagerClass_PropertiesDeclarations1Data(item, data) {
        this.throwIfItemNotHasFeature(item);

        data.push(`public IOnOffEntityStore${this.itemGenericTypeParameters(item)} OnOffEntityStore => Store as IOnOffEntityStore${this.itemGenericTypeParameters(item)};`);
    }
}
