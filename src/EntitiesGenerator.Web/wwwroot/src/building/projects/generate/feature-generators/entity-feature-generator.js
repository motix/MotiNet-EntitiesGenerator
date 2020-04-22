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
        this.throwIfItemNotHaveFeature(item);

        data.push(`IEntityManager${this.itemGenericTypeParameters(item)}`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_EntityStoreInterface_StoreInterfacesData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        data.push(`IEntityStore${this.itemGenericTypeParameters(item)}`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_EntityAccessorInterface_AccessorInterfacesData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        data.push(`IEntityAccessor${this.itemGenericTypeParameters(item)}`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_EntityManagerClass_PropertiesDeclarations1Data(item, data) {
        this.throwIfItemNotHaveFeature(item);

        data.push(
            `public IEntityStore${this.itemGenericTypeParameters(item)} EntityStore => Store as IEntityStore${this.itemGenericTypeParameters(item)};`,
            `public IEntityAccessor${this.itemGenericTypeParameters(item)} EntityAccessor => Accessor as IEntityAccessor${this.itemGenericTypeParameters(item)};`);
    }

    // SealedModels

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    sm_EntityClass_EntityPropertyDeclarationsData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        data.push(`[StringLength(StringLengths.Guid)]
public string Id { get; set; } = Guid.NewGuid().ToString();`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    sm_EntityAccessorClass_AccessorMethodsData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        data.push(`public object GetId(${item.name} ${_.lowerFirst(item.name)}) => ${_.lowerFirst(item.name)}.Id;`);
    }

    // EntityFrameworkCore.SealedModels

    /**
     * @param {Item} item
     * @param {{baseClass: string, constructorCall: string}} data
     */
    efSm_EntityStoreClass_StoreBaseData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        data.baseClass = `EntityStore<${item.name}, TDbContext>`;
        data.constructorCall = 'base(dbContext)';
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    efSm_EntityStoreClass_StoreMemberDeclarationsData_FeatureAbsent(item, data) {
        this.throwIfItemHasFeature(item);

        data.push(ContentHelper.generateDisposePattern());
    }

    // AspNetCore.Mvc.DefaultViewModels

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    aspDv_EntityViewModelsClass_BasePropertyDeclarationsData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        data.push('public string Id { get; set; } = Guid.NewGuid().ToString();');
    }
}
