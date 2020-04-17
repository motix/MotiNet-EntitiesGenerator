import FeatureGenerator from './feature-generator';

export default class NameBasedEntityFeatureGenerator extends FeatureGenerator {
    get featureType() {
        return 'NameBasedEntity';
    }

    // IntelliSense support
    /**
     * @param {Item} item
     * @return {NameBasedEntityFeatureSetting}
     */
    itemFeatureSetting(item) {
        return super.itemFeatureSetting(item);
    }

    /**
     * @param {Item} item
     */
    itemValidationRequired(item) {
        this.throwIfItemNotHaveFeature(item);

        return true;
    }

    // Project specific content

    // Core

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_EntityManagerInterface_ManagerInterfacesData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        data.push(`INameBasedEntityManager${this.itemGenericTypeParameters(item)}`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_EntityStoreInterface_StoreInterfacesData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        data.push(`INameBasedEntityStore${this.itemGenericTypeParameters(item)}`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_EntityAccessorInterface_AccessorInterfacesData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        data.push(`INameBasedEntityAccessor${this.itemGenericTypeParameters(item)}`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_EntityManagerClass_ConstructorParametersData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        data.push(`ILookupNormalizer<T${item.name}> nameNormalizer`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_EntityManagerClass_PropertiesAssignmentsData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        data.push('NameNormalizer = nameNormalizer ?? throw new ArgumentNullException(nameof(nameNormalizer));');
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_EntityManagerClass_PropertiesDeclarations1Data(item, data) {
        this.throwIfItemNotHaveFeature(item);

        data.push(
            `public INameBasedEntityStore${this.itemGenericTypeParameters(item)} NameBasedEntityStore => Store as INameBasedEntityStore${this.itemGenericTypeParameters(item)};`,
            `public INameBasedEntityAccessor${this.itemGenericTypeParameters(item)} NameBasedEntityAccessor => Accessor as INameBasedEntityAccessor${this.itemGenericTypeParameters(item)};`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_EntityManagerClass_PropertiesDeclarations2Data(item, data) {
        this.throwIfItemNotHaveFeature(item);

        data.push('public ILookupNormalizer NameNormalizer { get; }');
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_EntityValidatorClass_ValidationsData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        data.push(`await this.ValidateNameAsync(theManager, Accessor, ${_.lowerFirst(item.name)}, errors,
    name => ErrorDescriber.Invalid${item.name}Name(name), name => ErrorDescriber.Duplicate${item.name}Name(name));`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_ErrorDescriberClass_DescriberMethodsData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        const entityName = item.name;
        const lowerFirstEntityName = _.lowerFirst(entityName);

        data.push(`public virtual GenericError Invalid${entityName}Name(string ${lowerFirstEntityName}Name)
    => new GenericError
    {
        Code = nameof(Invalid${entityName}Name),
        Description = _localizer[nameof(Invalid${entityName}Name), ${lowerFirstEntityName}Name]
    };

public virtual GenericError Duplicate${entityName}Name(string ${lowerFirstEntityName}Name)
    => new GenericError
    {
        Code = nameof(Duplicate${entityName}Name),
        Description = _localizer[nameof(Duplicate${entityName}Name), ${lowerFirstEntityName}Name]
    };`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_ErrorDescriberResourcesResx_ItemsData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        data.push(`<data name="Duplicate${item.name}Name" xml:space="preserve">
  <value>${item.displayName} name '{0}' has already been used.</value>
</data>
<data name="Invalid${item.name}Name" xml:space="preserve">
  <value>${item.displayName} name '{0}' is invalid.</value>
</data>`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_DependencyInjectionClass_EntityServiceRegistrationsData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        data.push(`services.TryAddScoped<ILookupNormalizer<T${item.name}>, LowerInvariantLookupNormalizer<T${item.name}>>();`);
    }

    // SealedModels

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    sm_EntityClass_EntityInterfacesData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        data.push('INameWiseEntity');
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    sm_EntityClass_EntityPropertyDeclarationsData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        data.push(
            `public ${item.name}() => Id = Guid.NewGuid().ToString();`,
            `[StringLength(StringLengths.Guid)]
public string Id { get; set; }`,
            `[Required]
[StringLength(StringLengths.TitleContent)]
public string Name { get; set; }`,
            `[Required]
[StringLength(StringLengths.TitleContent)]
public string NormalizedName { get; set; }`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    sm_EntityAccessorClass_AccessorMethodsData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        data.push(
            `public object GetId(${item.name} ${_.lowerFirst(item.name)}) => ${_.lowerFirst(item.name)}.Id;`,
            `public string GetName(${item.name} ${_.lowerFirst(item.name)}) => ${_.lowerFirst(item.name)}.Name;`,
            `public void SetNormalizedName(${item.name} ${_.lowerFirst(item.name)}, string normalizedName) => ${_.lowerFirst(item.name)}.NormalizedName = normalizedName;`);
    }

    // EntityFrameworkCore.SealedModels

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    efSm_DbContextClass_EntityConfigurationsData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        data.push(`// Unique name
builder.HasIndex(x => x.Name).IsUnique();
builder.HasIndex(x => x.NormalizedName).IsUnique();`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    efSm_EntityStoreClass_StoreInterfacesData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        data.push(`INameBasedEntityStoreMarker<${item.name}, TDbContext>`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    efSm_EntityStoreClass_StoreMethodDeclarationsData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        data.push(
            `public ${item.name} FindByName(string normalizedName)
    => NameBasedEntityStoreHelper.FindEntityByName(this, normalizedName);`,
            `public Task<${item.name}> FindByNameAsync(string normalizedName, CancellationToken cancellationToken)
    => NameBasedEntityStoreHelper.FindEntityByNameAsync(this, normalizedName, cancellationToken);`);
    }

    // AspNetCore

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    asp_EntityManagerClass_ConstructorParametersData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        data.push(`ILookupNormalizer<T${item.name}> nameNormalizer`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    asp_EntityManagerClass_BaseConstructorParametersData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        data.push('nameNormalizer');
    }

    // AspNetCore.Mvc.DefaultViewModels

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    aspDv_EntityViewModelsClass_BasePropertyDeclarationsData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        data.push(
            `protected ${item.name}ViewModelBase() => Id = Guid.NewGuid().ToString();`,
            'public string Id { get; set; }',
            `[LocalizedRequired]
[Display(Name = nameof(Name), ResourceType = typeof(DisplayNames))]
public string Name { get; set; }`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    aspDv_DisplayNamesResx_ItemsData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        data.push(`<data name="Name" xml:space="preserve">
  <value>Name</value>
</data>`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    aspDv_DisplayNamesResxDesignerClass_ItemsData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        data.push(`/// <summary>
///   Looks up a localized string similar to Name.
/// </summary>
public static string Name {
    get {
        return ResourceManager.GetString("Name", resourceCulture);
    }
}`);
    }
}
