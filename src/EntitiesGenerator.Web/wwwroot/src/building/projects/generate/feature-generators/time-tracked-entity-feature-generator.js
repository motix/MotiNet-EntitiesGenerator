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
        this.throwIfItemNotHaveFeature(item);

        data.push(`ITimeTrackedEntityManager${this.itemGenericTypeParameters(item)}`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_EntityStoreInterface_StoreInterfacesData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        data.push(`ITimeTrackedEntityStore${this.itemGenericTypeParameters(item)}`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_EntityAccessorInterface_AccessorInterfacesData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        data.push(`ITimeTrackedEntityAccessor${this.itemGenericTypeParameters(item)}`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_EntityManagerClass_PropertiesDeclarations1Data(item, data) {
        this.throwIfItemNotHaveFeature(item);

        data.push(`public ITimeTrackedEntityStore${this.itemGenericTypeParameters(item)} TimeTrackedEntityStore => Store as ITimeTrackedEntityStore${this.itemGenericTypeParameters(item)};`);
        data.push(`public ITimeTrackedEntityAccessor${this.itemGenericTypeParameters(item)} TimeTrackedEntityAccessor => Accessor as ITimeTrackedEntityAccessor${this.itemGenericTypeParameters(item)};`);
    }

    // SealedModels

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    sm_EntityClass_EntityInterfacesData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        data.push('ITimeWiseEntity');
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    sm_EntityClass_EntityPropertyDeclarationsData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        data.push('public DateTime DataCreateDate { get; set; }');
        data.push('public DateTime DataLastModifyDate { get; set; }');
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    sm_EntityAccessorClass_AccessorMethodsData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        data.push(`public DateTime GetDataCreateDate(${item.name} ${_.lowerFirst(item.name)}) => ${_.lowerFirst(item.name)}.DataCreateDate;`);
        data.push(`public void SetDataCreateDate(${item.name} ${_.lowerFirst(item.name)}, DateTime dataCreateDate) => ${_.lowerFirst(item.name)}.DataCreateDate = dataCreateDate;`);
        data.push(`public void SetDataLastModifyDate(${item.name} ${_.lowerFirst(item.name)}, DateTime dataLastModifyDate) => ${_.lowerFirst(item.name)}.DataLastModifyDate = dataLastModifyDate;`);
    }

    // EntityFrameworkCore.SealedModels

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    efSm_EntityStoreClass_StoreInterfacesData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        data.push(`ITimeTrackedEntityStoreMarker<${item.name}, TDbContext>`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    efSm_EntityStoreClass_StoreMethodDeclarationsData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        data.push(`public ${item.name} FindLatest()
    => TimeTrackedEntityStoreHelper.FindLatestEntity(this);`);
        data.push(`public Task<${item.name}> FindLatestAsync(CancellationToken cancellationToken)
    => TimeTrackedEntityStoreHelper.FindLatestEntityAsync(this, cancellationToken);`);
    }

    // AspNetCore.Mvc.DefaultViewModels

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    aspDv_EntityViewModelsClass_BasePropertyDeclarationsData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        data.push('public DateTime DataCreateDate { get; set; }');
        data.push('public DateTime DataLastModifyDate { get; set; }');
    }
}
