import ChildEntityFeatureGenerator from './child-entity-feature-generator';

export default class ScopedNameBasedEntityFeatureGenerator extends ChildEntityFeatureGenerator {
    get featureType() {
        return 'ScopedNameBasedEntity';
    }

    // IntelliSense support
    /**
     * @param {Item} item
     * @return {ScopedNameBasedEntityFeatureSetting}
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
    parentName(item) {
        return this.itemFeatureSetting(item).scopeName;
    }

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

        const entityGenericTypeParameters = this.itemGenericTypeParameters(item);
        data.push(`IScopedNameBasedEntityManager${entityGenericTypeParameters}`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_EntityStoreInterface_StoreInterfacesData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        const entityGenericTypeParameters = this.itemGenericTypeParameters(item);
        data.push(`IScopedNameBasedEntityStore${entityGenericTypeParameters}`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_EntityAccessorInterface_AccessorInterfacesData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        const entityGenericTypeParameters = this.itemGenericTypeParameters(item);
        data.push(`IScopedNameBasedEntityAccessor${entityGenericTypeParameters}`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_EntityManagerClass_ConstructorParametersData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        const entityName = item.name;
        const namePropertyName = this.namePropertyName(item);
        const lowerFirstNamePropertyName = _.lowerFirst(namePropertyName);

        data.push(`ILookupNormalizer<T${entityName}> ${lowerFirstNamePropertyName}Normalizer`);
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

        const entityGenericTypeParameters = this.itemGenericTypeParameters(item);

        data.push(
            `public IScopedNameBasedEntityStore${entityGenericTypeParameters} ScopedNameBasedEntityStore => Store as IScopedNameBasedEntityStore${entityGenericTypeParameters};`,
            `public IScopedNameBasedEntityAccessor${entityGenericTypeParameters} ScopedNameBasedEntityAccessor => Accessor as IScopedNameBasedEntityAccessor${entityGenericTypeParameters};`);
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

        const entityName = item.name;
        const lowerFirstEntityName = _.lowerFirst(entityName);
        const namePropertyName = this.namePropertyName(item);
        const lowerFirstNamePropertyName = _.lowerFirst(namePropertyName);

        data.push(`await this.ValidateNameAsync(theManager, Accessor, ${lowerFirstEntityName}, errors,
    ${lowerFirstNamePropertyName} => ErrorDescriber.Invalid${entityName}${namePropertyName}(${lowerFirstNamePropertyName}), ${lowerFirstNamePropertyName} => ErrorDescriber.Duplicate${entityName}${namePropertyName}(${lowerFirstNamePropertyName}));`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_EntityValidatorClass_SubEntityValidateMethodsData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        const entityName = item.name;
        const entityGenericTypeParameters = this.itemGenericTypeParameters(item);
        const parentName = this.parentName(item);
        const parentPropertyName = this.parentPropertyName(item);
        const lowerFirstScopePropertyName = _.lowerFirst(parentPropertyName);

        data.push(`public Task<GenericResult> ValidateAsync(object manager, T${parentName} ${lowerFirstScopePropertyName})
    => throw new NeverValidateSubEntityException<T${parentName}, I${entityName}Manager${entityGenericTypeParameters}>();`);
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

        const entityName = item.name;
        const namePropertyName = this.namePropertyName(item);
        const lowerNameDisplayName = _.lowerCase(namePropertyName);

        data.push(
            {
                key: `Duplicate${entityName}${namePropertyName}`,
                content: `<data name="Duplicate${entityName}${namePropertyName}" xml:space="preserve">
  <value>${item.displayName} ${lowerNameDisplayName} '{0}' has already been used.</value>
</data>`
            },
            {
                key: `Invalid${entityName}${namePropertyName}`,
                content: `<data name="Invalid${entityName}${namePropertyName}" xml:space="preserve">
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

        const entityName = item.name;
        const lookupNormalizer = this.lookupNormalizer(item);

        data.push(`services.TryAddScoped<ILookupNormalizer<T${entityName}>, ${lookupNormalizer}<T${entityName}>>();`);
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
        const parentName = this.parentName(item);
        const parentPropertyName = this.parentPropertyName(item);
        const lowerFirstScopePropertyName = _.lowerFirst(parentPropertyName);
        const namePropertyName = this.namePropertyName(item);

        data.push(
            `public object GetId(${entityName} ${lowerFirstEntityName}) => ${lowerFirstEntityName}.Id;`,
            `public string GetName(${entityName} ${lowerFirstEntityName}) => ${lowerFirstEntityName}.${namePropertyName};`,
            `public void SetNormalizedName(${entityName} ${lowerFirstEntityName}, string normalized${namePropertyName}) => ${lowerFirstEntityName}.Normalized${namePropertyName} = normalized${namePropertyName};`,
            `public object GetScopeId(${entityName} ${lowerFirstEntityName}) => ${lowerFirstEntityName}.${parentPropertyName}Id;`,
            `public void SetScopeId(${entityName} ${lowerFirstEntityName}, object ${lowerFirstScopePropertyName}Id) => ${lowerFirstEntityName}.${parentPropertyName}Id = (string)${lowerFirstScopePropertyName}Id;`,
            `public ${parentName} GetScope(${entityName} ${lowerFirstEntityName}) => ${lowerFirstEntityName}.${parentPropertyName};`,
            `public void SetScope(${entityName} ${lowerFirstEntityName}, ${parentName} ${lowerFirstScopePropertyName}) => ${lowerFirstEntityName}.${parentPropertyName} = ${lowerFirstScopePropertyName};`);
    }

    // EntityFrameworkCore.SealedModels

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    efSm_DbContextClass_EntityConfigurationsData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        const entityName = item.name;
        const parentPropertyName = this.parentPropertyName(item);
        const namePropertyName = this.namePropertyName(item);

        data.push(`// Unique name in scope
builder.HasIndex(nameof(${entityName}.${parentPropertyName}Id), nameof(${entityName}.${namePropertyName})).IsUnique();
builder.HasIndex(nameof(${entityName}.${parentPropertyName}Id), nameof(${entityName}.Normalized${namePropertyName})).IsUnique();`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    efSm_EntityStoreClass_StoreInterfacesData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        const entityName = item.name;
        const parentName = this.parentName(item);

        data.push(`IScopedNameBasedEntityStoreMarker<${entityName}, ${parentName}, TDbContext>`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    efSm_EntityStoreClass_StoreMethodDeclarationsData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        const entityName = item.name;
        const parentName = this.parentName(item);
        const parentPropertyName = this.parentPropertyName(item);
        const lowerFirstScopePropertyName = _.lowerFirst(parentPropertyName);
        const namePropertyName = this.namePropertyName(item);
        var nameSelecor = '';

        if (namePropertyName !== 'Name') {
            nameSelecor = `, x => x.${namePropertyName}, x => x.Id`;
        }

        data.push(
            `public ${entityName} FindByName(string normalized${namePropertyName}, ${parentName} ${lowerFirstScopePropertyName})
    => ScopedNameBasedEntityStoreHelper.FindEntityByName(this, normalized${namePropertyName}, ${lowerFirstScopePropertyName}, x => x.${parentPropertyName}Id${nameSelecor});`,
            `public Task<${entityName}> FindByNameAsync(string normalized${namePropertyName}, ${parentName} ${lowerFirstScopePropertyName}, CancellationToken cancellationToken)
    => ScopedNameBasedEntityStoreHelper.FindEntityByNameAsync(this, normalized${namePropertyName}, ${lowerFirstScopePropertyName}, x => x.${parentPropertyName}Id${nameSelecor}, cancellationToken);`,
            `public ${parentName} FindScopeById(object id)
    => ScopedNameBasedEntityStoreHelper.FindScopeById(this, id);`,
            `public Task<${parentName}> FindScopeByIdAsync(object id, CancellationToken cancellationToken)
    => ScopedNameBasedEntityStoreHelper.FindScopeByIdAsync(this, id, cancellationToken);`);
    }

    // AspNetCore

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    asp_EntityManagerClass_ConstructorParametersData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        const entityName = item.name;
        const namePropertyName = this.namePropertyName(item);
        const lowerFirstNamePropertyName = _.lowerFirst(namePropertyName);

        data.push(`ILookupNormalizer<T${entityName}> ${lowerFirstNamePropertyName}Normalizer`);
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
