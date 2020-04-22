import FeatureGenerator from './feature-generator';

export default class CodeBasedEntityFeatureGenerator extends FeatureGenerator {
    get featureType() {
        return 'CodeBasedEntity';
    }

    // IntelliSense support
    /**
     * @param {Item} item
     * @return {CodeBasedEntityFeatureSetting}
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
    codePropertyName(item) {
        return this.itemFeatureSetting(item).codePropertyName || 'Code';
    }

    /**
     * @param {Item} item
     */
    lookupNormalizer(item) {
        return this.itemFeatureSetting(item).lookupNormalizer;
    }

    /**
     * @param {Item} item
     */
    hasCodeGenerator(item) {
        return this.itemFeatureSetting(item).hasCodeGenerator;
    }

    // Project specific content

    // Core

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_EntityManagerInterface_ManagerInterfacesData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        data.push(`ICodeBasedEntityManager${this.itemGenericTypeParameters(item)}`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_EntityStoreInterface_StoreInterfacesData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        data.push(`ICodeBasedEntityStore${this.itemGenericTypeParameters(item)}`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_EntityAccessorInterface_AccessorInterfacesData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        data.push(`ICodeBasedEntityAccessor${this.itemGenericTypeParameters(item)}`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_EntityManagerClass_ConstructorParametersData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        const codePropertyName = this.codePropertyName(item);
        const lowerFirstCodePropertyName = _.lowerFirst(codePropertyName);

        data.push(`ILookupNormalizer<T${item.name}> ${lowerFirstCodePropertyName}Normalizer`);

        if (this.hasCodeGenerator(item)) {
            data.push(`IEntityCodeGenerator<T${item.name}> ${lowerFirstCodePropertyName}Generator`);
        }
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_EntityManagerClass_PropertiesAssignmentsData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        const codePropertyName = this.codePropertyName(item);
        const lowerFirstCodePropertyName = _.lowerFirst(codePropertyName);

        data.push(`CodeNormalizer = ${lowerFirstCodePropertyName}Normalizer ?? throw new ArgumentNullException(nameof(${lowerFirstCodePropertyName}Normalizer));`);

        if (this.hasCodeGenerator(item)) {
            data.push(`CodeGenerator = ${lowerFirstCodePropertyName}Generator ?? throw new ArgumentNullException(nameof(${lowerFirstCodePropertyName}Generator));`);
        }
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_EntityManagerClass_PropertiesDeclarations1Data(item, data) {
        this.throwIfItemNotHaveFeature(item);

        data.push(
            `public ICodeBasedEntityStore${this.itemGenericTypeParameters(item)} CodeBasedEntityStore => Store as ICodeBasedEntityStore${this.itemGenericTypeParameters(item)};`,
            `public ICodeBasedEntityAccessor${this.itemGenericTypeParameters(item)} CodeBasedEntityAccessor => Accessor as ICodeBasedEntityAccessor${this.itemGenericTypeParameters(item)};`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_EntityManagerClass_PropertiesDeclarations2Data(item, data) {
        this.throwIfItemNotHaveFeature(item);

        data.push('public ILookupNormalizer CodeNormalizer { get; }');

        if (this.hasCodeGenerator(item)) {
            data.push(`public IEntityCodeGenerator<T${item.name}> CodeGenerator { get; }`);
        } else {
            data.push(`public IEntityCodeGenerator<T${item.name}> CodeGenerator => null;`);
        }
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_EntityValidatorClass_ValidationsData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        const codePropertyName = this.codePropertyName(item);
        const lowerFirstCodePropertyName = _.lowerFirst(codePropertyName);

        data.push(`await this.ValidateCodeAsync(theManager, Accessor, ${_.lowerFirst(item.name)}, errors,
    ${lowerFirstCodePropertyName} => ErrorDescriber.Invalid${item.name}${codePropertyName}(${lowerFirstCodePropertyName}), ${lowerFirstCodePropertyName} => ErrorDescriber.Duplicate${item.name}${codePropertyName}(${lowerFirstCodePropertyName}));`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_ErrorDescriberClass_DescriberMethodsData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        const entityName = item.name;
        const lowerFirstEntityName = _.lowerFirst(entityName);
        const codePropertyName = this.codePropertyName(item);

        data.push(
            `public virtual GenericError Invalid${entityName}${codePropertyName}(string ${lowerFirstEntityName}${codePropertyName})
    => new GenericError
    {
        Code = nameof(Invalid${entityName}${codePropertyName}),
        Description = _localizer[nameof(Invalid${entityName}${codePropertyName}), ${lowerFirstEntityName}${codePropertyName}]
    };`,
            `public virtual GenericError Duplicate${entityName}${codePropertyName}(string ${lowerFirstEntityName}${codePropertyName})
    => new GenericError
    {
        Code = nameof(Duplicate${entityName}${codePropertyName}),
        Description = _localizer[nameof(Duplicate${entityName}${codePropertyName}), ${lowerFirstEntityName}${codePropertyName}]
    };`);
    }

    /**
     * @param {Item} item
     * @param {{key: string, content: string}[]} data
     */
    core_ErrorDescriberResourcesResx_ItemsData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        const codePropertyName = this.codePropertyName(item);
        const lowerCodeDisplayName = _.lowerCase(codePropertyName);

        data.push(
            {
                key: `Duplicate${item.name}${codePropertyName}`,
                content: `<data name="Duplicate${item.name}${codePropertyName}" xml:space="preserve">
  <value>${item.displayName} ${lowerCodeDisplayName} '{0}' has already been used.</value>
</data>`
            },
            {
                key: `Invalid${item.name}${codePropertyName}`,
                content: `<data name="Invalid${item.name}${codePropertyName}" xml:space="preserve">
  <value>${item.displayName} ${lowerCodeDisplayName} '{0}' is invalid.</value>
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

        const codePropertyName = this.codePropertyName(item);

        if (codePropertyName === 'Code') {
            data.push('ICodeWiseEntity');
        }
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    sm_EntityClass_EntityPropertyDeclarationsData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        const codePropertyName = this.codePropertyName(item);

        data.push(
            `[StringLength(StringLengths.Guid)]
public string Id { get; set; } = Guid.NewGuid().ToString();`,
            `[Required]
[StringLength(StringLengths.TitleContent)]
public string ${codePropertyName} { get; set; }`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    sm_EntityAccessorClass_AccessorMethodsData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        const codePropertyName = this.codePropertyName(item);
        const lowerFirstCodePropertyName = _.lowerFirst(codePropertyName);

        data.push(
            `public object GetId(${item.name} ${_.lowerFirst(item.name)}) => ${_.lowerFirst(item.name)}.Id;`,
            `public string GetCode(${item.name} ${_.lowerFirst(item.name)}) => ${_.lowerFirst(item.name)}.${codePropertyName};`,
            `public void SetCode(${item.name} ${_.lowerFirst(item.name)}, string ${lowerFirstCodePropertyName}) => ${_.lowerFirst(item.name)}.${codePropertyName} = ${lowerFirstCodePropertyName};`);
    }

    // EntityFrameworkCore.SealedModels

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    efSm_DbContextClass_EntityConfigurationsData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        const codePropertyName = this.codePropertyName(item);

        data.push(`// Unique code
builder.HasIndex(x => x.${codePropertyName}).IsUnique();`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    efSm_EntityStoreClass_StoreInterfacesData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        data.push(`ICodeBasedEntityStoreMarker<${item.name}, TDbContext>`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    efSm_EntityStoreClass_StoreMethodDeclarationsData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        const codePropertyName = this.codePropertyName(item);
        var codeSelecor = '';

        if (codePropertyName !== 'Code') {
            codeSelecor = `, x => x.${codePropertyName}`;
        }

        data.push(
            `public ${item.name} FindByCode(string normalized${codePropertyName})
    => CodeBasedEntityStoreHelper.FindEntityByCode(this, normalized${codePropertyName}${codeSelecor});`,
            `public Task<${item.name}> FindByCodeAsync(string normalized${codePropertyName}, CancellationToken cancellationToken)
    => CodeBasedEntityStoreHelper.FindEntityByCodeAsync(this, normalized${codePropertyName}${codeSelecor}, cancellationToken);`);
    }

    // AspNetCore

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    asp_EntityManagerClass_ConstructorParametersData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        const codePropertyName = this.codePropertyName(item);
        const lowerFirstCodePropertyName = _.lowerFirst(codePropertyName);

        data.push(`ILookupNormalizer<T${item.name}> ${lowerFirstCodePropertyName}Normalizer`);

        if (this.hasCodeGenerator(item)) {
            data.push(`IEntityCodeGenerator<T${item.name}> ${lowerFirstCodePropertyName}Generator`);
        }
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    asp_EntityManagerClass_BaseConstructorParametersData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        const codePropertyName = this.codePropertyName(item);
        const lowerFirstCodePropertyName = _.lowerFirst(codePropertyName);

        data.push(`${lowerFirstCodePropertyName}Normalizer`);

        if (this.hasCodeGenerator(item)) {
            data.push(`${lowerFirstCodePropertyName}Generator`);
        }
    }

    // AspNetCore.Mvc.DefaultViewModels

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    aspDv_EntityViewModelsClass_BasePropertyDeclarationsData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        const codePropertyName = this.codePropertyName(item);
        const codeRequired = this.hasCodeGenerator(item) ? `// No need to require ${codePropertyName} in view model as there is a generator in place` : '[LocalizedRequired]';

        data.push(
            'public string Id { get; set; } = Guid.NewGuid().ToString();',
            `${codeRequired}
[Display(Name = nameof(${codePropertyName}), ResourceType = typeof(DisplayNames))]
public string ${codePropertyName} { get; set; }`);
    }

    /**
     * @param {Item} item
     * @param {{key: string, content: string}[]} data
     */
    aspDv_DisplayNamesResx_ItemsData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        const codePropertyName = this.codePropertyName(item);
        const codeDisplayName = _.startCase(codePropertyName);

        data.push({
            key: codePropertyName,
            content: `<data name="${codePropertyName}" xml:space="preserve">
  <value>${codeDisplayName}</value>
</data>`
        });
    }

    /**
     * @param {Item} item
     * @param {{key: string, content: string}[]} data
     */
    aspDv_DisplayNamesResxDesignerClass_ItemsData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        const codePropertyName = this.codePropertyName(item);
        const codeDisplayName = _.startCase(codePropertyName);

        data.push({
            key: codePropertyName,
            content: `/// <summary>
///   Looks up a localized string similar to ${codeDisplayName}.
/// </summary>
public static string ${codePropertyName} {
    get {
        return ResourceManager.GetString("${codePropertyName}", resourceCulture);
    }
}`
        });
    }
}
