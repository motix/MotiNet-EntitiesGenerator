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

    // Feature settings

    /**
     * @param {Item} item
     */
    namePropertyName(item) {
        return this.itemFeatureSetting(item).namePropertyName || 'Name';
    }

    /**
     * @param {Item} item
     */
    lookupNormalizer(item) {
        return this.itemFeatureSetting(item).lookupNormalizer;
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

        const namePropertyName = this.namePropertyName(item);
        const lowerFirstNamePropertyName = _.lowerFirst(namePropertyName);

        data.push(`ILookupNormalizer<T${item.name}> ${lowerFirstNamePropertyName}Normalizer`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_EntityManagerClass_PropertiesAssignmentsData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        const namePropertyName = this.namePropertyName(item);
        const lowerFirstNamePropertyName = _.lowerFirst(namePropertyName);

        data.push(`NameNormalizer = ${lowerFirstNamePropertyName}Normalizer ?? throw new ArgumentNullException(nameof(${lowerFirstNamePropertyName}Normalizer));`);
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

        const namePropertyName = this.namePropertyName(item);
        const lowerFirstNamePropertyName = _.lowerFirst(namePropertyName);

        data.push(`await this.ValidateNameAsync(theManager, Accessor, ${_.lowerFirst(item.name)}, errors,
    ${lowerFirstNamePropertyName} => ErrorDescriber.Invalid${item.name}${namePropertyName}(${lowerFirstNamePropertyName}), ${lowerFirstNamePropertyName} => ErrorDescriber.Duplicate${item.name}${namePropertyName}(${lowerFirstNamePropertyName}));`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_ErrorDescriberClass_DescriberMethodsData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        const entityName = item.name;
        const lowerFirstEntityName = _.lowerFirst(entityName);
        const namePropertyName = this.namePropertyName(item);

        data.push(`public virtual GenericError Invalid${entityName}${namePropertyName}(string ${lowerFirstEntityName}${namePropertyName})
    => new GenericError
    {
        Code = nameof(Invalid${entityName}${namePropertyName}),
        Description = _localizer[nameof(Invalid${entityName}${namePropertyName}), ${lowerFirstEntityName}${namePropertyName}]
    };

public virtual GenericError Duplicate${entityName}${namePropertyName}(string ${lowerFirstEntityName}${namePropertyName})
    => new GenericError
    {
        Code = nameof(Duplicate${entityName}${namePropertyName}),
        Description = _localizer[nameof(Duplicate${entityName}${namePropertyName}), ${lowerFirstEntityName}${namePropertyName}]
    };`);
    }

    /**
     * @param {Item} item
     * @param {{key: string, content: string}[]} data
     */
    core_ErrorDescriberResourcesResx_ItemsData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        const namePropertyName = this.namePropertyName(item);
        const lowerNameDisplayName = _.lowerCase(namePropertyName);

        data.push(
            {
                key: `Duplicate${item.name}${namePropertyName}`,
                content: `<data name="Duplicate${item.name}${namePropertyName}" xml:space="preserve">
  <value>${item.displayName} ${lowerNameDisplayName} '{0}' has already been used.</value>
</data>`
            },
            {
                key: `Invalid${item.name}${namePropertyName}`,
                content: `<data name="Invalid${item.name}${namePropertyName}" xml:space="preserve">
  <value>${item.displayName} ${lowerNameDisplayName} '{0}' is invalid.</value>
</data>`
            });
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_DependencyInjectionClass_EntityServiceRegistrationsData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        data.push(`services.TryAddScoped<ILookupNormalizer<T${item.name}>, ${this.lookupNormalizer(item)}<T${item.name}>>();`);
    }

    // SealedModels

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    sm_EntityClass_EntityInterfacesData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        const namePropertyName = this.namePropertyName(item);

        if (namePropertyName === 'Name') {
            data.push('INameWiseEntity');
        }
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    sm_EntityClass_EntityPropertyDeclarationsData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        const constructorModifier = item.abstractModel ? 'protected' : 'public';
        const namePropertyName = this.namePropertyName(item);

        data.push(
            `[StringLength(StringLengths.Guid)]
public string Id { get; set; } = Guid.NewGuid().ToString();`,
            `[Required]
[StringLength(StringLengths.TitleContent)]
public string ${namePropertyName} { get; set; }`,
            `[Required]
[StringLength(StringLengths.TitleContent)]
public string Normalized${namePropertyName} { get; set; }`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    sm_EntityAccessorClass_AccessorMethodsData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        const entityName = item.name;
        const lowerFirstEntityName = _.lowerFirst(entityName);
        const namePropertyName = this.namePropertyName(item);

        data.push(
            `public object GetId(${entityName} ${lowerFirstEntityName}) => ${lowerFirstEntityName}.Id;`,
            `public string GetName(${entityName} ${lowerFirstEntityName}) => ${lowerFirstEntityName}.${namePropertyName};`,
            `public void SetNormalizedName(${entityName} ${lowerFirstEntityName}, string normalized${namePropertyName}) => ${lowerFirstEntityName}.Normalized${namePropertyName} = normalized${namePropertyName};`);
    }

    // EntityFrameworkCore.SealedModels

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    efSm_DbContextClass_EntityConfigurationsData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        const namePropertyName = this.namePropertyName(item);

        data.push(`// Unique name
builder.HasIndex(x => x.${namePropertyName}).IsUnique();
builder.HasIndex(x => x.Normalized${namePropertyName}).IsUnique();`);
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

        const namePropertyName = this.namePropertyName(item);
        var nameSelecor = '';

        if (namePropertyName !== 'Name') {
            nameSelecor = `, x => x.${namePropertyName}`;
        }

        data.push(
            `public ${item.name} FindByName(string normalized${namePropertyName})
    => NameBasedEntityStoreHelper.FindEntityByName(this, normalized${namePropertyName}${nameSelecor});`,
            `public Task<${item.name}> FindByNameAsync(string normalized${namePropertyName}, CancellationToken cancellationToken)
    => NameBasedEntityStoreHelper.FindEntityByNameAsync(this, normalized${namePropertyName}${nameSelecor}, cancellationToken);`);
    }

    // AspNetCore

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    asp_EntityManagerClass_ConstructorParametersData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        const namePropertyName = this.namePropertyName(item);
        const lowerFirstNamePropertyName = _.lowerFirst(namePropertyName);

        data.push(`ILookupNormalizer<T${item.name}> ${lowerFirstNamePropertyName}Normalizer`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    asp_EntityManagerClass_BaseConstructorParametersData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        const namePropertyName = this.namePropertyName(item);
        const lowerFirstNamePropertyName = _.lowerFirst(namePropertyName);

        data.push(`${lowerFirstNamePropertyName}Normalizer`);
    }

    // AspNetCore.Mvc.DefaultViewModels

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    aspDv_EntityViewModelsClass_BasePropertyDeclarationsData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        const namePropertyName = this.namePropertyName(item);

        data.push(
            'public string Id { get; set; } = Guid.NewGuid().ToString();',
            `[LocalizedRequired]
[Display(Name = nameof(${namePropertyName}), ResourceType = typeof(DisplayNames))]
public string ${namePropertyName} { get; set; }`);
    }

    /**
     * @param {Item} item
     * @param {{key: string, content: string}[]} data
     */
    aspDv_DisplayNamesResx_ItemsData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        const namePropertyName = this.namePropertyName(item);
        const nameDisplayName = _.startCase(namePropertyName);

        data.push({
            key: namePropertyName,
            content: `<data name="${namePropertyName}" xml:space="preserve">
  <value>${nameDisplayName}</value>
</data>`
        });
    }

    /**
     * @param {Item} item
     * @param {{key: string, content: string}[]} data
     */
    aspDv_DisplayNamesResxDesignerClass_ItemsData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        const namePropertyName = this.namePropertyName(item);
        const nameDisplayName = _.startCase(namePropertyName);

        data.push({
            key: namePropertyName,
            content: `/// <summary>
///   Looks up a localized string similar to ${nameDisplayName}.
/// </summary>
public static string ${namePropertyName} {
    get {
        return ResourceManager.GetString("${namePropertyName}", resourceCulture);
    }
}`
        });
    }
}
