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
        this.throwIfItemNotHaveFeature(item);

        data.push(`IOnOffEntityManager${this.itemGenericTypeParameters(item)}`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_EntityStoreInterface_StoreInterfacesData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        data.push(`IOnOffEntityStore${this.itemGenericTypeParameters(item)}`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_EntityManagerClass_PropertiesDeclarations1Data(item, data) {
        this.throwIfItemNotHaveFeature(item);

        data.push(`public IOnOffEntityStore${this.itemGenericTypeParameters(item)} OnOffEntityStore => Store as IOnOffEntityStore${this.itemGenericTypeParameters(item)};`);
    }

    // SealedModels

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    sm_EntityClass_EntityInterfacesData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        data.push('IIsActiveWiseEntity');
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    sm_EntityClass_EntityPropertyDeclarationsData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        data.push('public bool IsActive { get; set; }');
    }

    // EntityFrameworkCore.SealedModels

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    efSm_EntityStoreClass_StorePropertyDeclarationsData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        data.push(`public ISearchSpecification<${item.name}> SearchActiveEntitiesSpecification => new SearchActiveSpecification<${item.name}>();`);
    }

    // AspNetCore.Mvc.DefaultViewModels

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    aspDv_EntityViewModelsClass_BasePropertyDeclarationsData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        data.push(`[Display(Name = "Active", ResourceType = typeof(DisplayNames))]
public bool IsActive { get; set; }`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    aspDv_DisplayNamesResx_ItemsData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        data.push(`<data name="Active" xml:space="preserve">
  <value>Active</value>
</data>`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    aspDv_DisplayNamesResxDesignerClass_ItemsData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        data.push(`/// <summary>
///   Looks up a localized string similar to Active.
/// </summary>
public static string Active {
    get {
        return ResourceManager.GetString("Active", resourceCulture);
    }
}`);
    }
}
