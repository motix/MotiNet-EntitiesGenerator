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

        data.push(`ILookupNormalizer<T${item.name}> codeNormalizer`);

        if (this.hasCodeGenerator(item)) {
            data.push(`IEntityCodeGenerator<T${item.name}> codeGenerator`);
        }
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_EntityManagerClass_PropertiesAssignmentsData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        data.push('CodeNormalizer = codeNormalizer ?? throw new ArgumentNullException(nameof(codeNormalizer));');

        if (this.hasCodeGenerator(item)) {
            data.push('CodeGenerator = codeGenerator ?? throw new ArgumentNullException(nameof(codeGenerator));');
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

        data.push(`await this.ValidateCodeAsync(theManager, Accessor, ${_.lowerFirst(item.name)}, errors,
    code => ErrorDescriber.Invalid${item.name}Code(code), code => ErrorDescriber.Duplicate${item.name}Code(code));`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_ErrorDescriberClass_DescriberMethodsData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        const entityName = item.name;
        const lowerFirstEntityName = _.lowerFirst(entityName);

        data.push(
            `public virtual GenericError Invalid${entityName}Code(string ${lowerFirstEntityName}Code)
    => new GenericError
    {
        Code = nameof(Invalid${entityName}Code),
        Description = _localizer[nameof(Invalid${entityName}Code), ${lowerFirstEntityName}Code]
    };`,
            `public virtual GenericError Duplicate${entityName}Code(string ${lowerFirstEntityName}Code)
    => new GenericError
    {
        Code = nameof(Duplicate${entityName}Code),
        Description = _localizer[nameof(Duplicate${entityName}Code), ${lowerFirstEntityName}Code]
    };`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_ErrorDescriberResourcesResx_ItemsData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        data.push(
            `<data name="Duplicate${item.name}Code" xml:space="preserve">
  <value>${item.displayName} code '{0}' has already been used.</value>
</data>`,
            `<data name="Invalid${item.name}Code" xml:space="preserve">
  <value>${item.displayName} code '{0}' is invalid.</value>
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

        data.push('ICodeWiseEntity');
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    sm_EntityClass_EntityPropertyDeclarationsData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        data.push(
            `[StringLength(StringLengths.Guid)]
public string Id { get; set; }`,
            `[Required]
[StringLength(StringLengths.TitleContent)]
public string Code { get; set; }`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    sm_EntityAccessorClass_AccessorMethodsData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        data.push(
            `public object GetId(${item.name} ${_.lowerFirst(item.name)}) => ${_.lowerFirst(item.name)}.Id;`,
            `public string GetCode(${item.name} ${_.lowerFirst(item.name)}) => ${_.lowerFirst(item.name)}.Code;`,
            `public void SetCode(${item.name} ${_.lowerFirst(item.name)}, string code) => ${_.lowerFirst(item.name)}.Code = code;`);
    }

    // EntityFrameworkCore.SealedModels

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    efSm_DbContextClass_EntityConfigurationsData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        data.push(`// Unique code
builder.HasIndex(x => x.Code).IsUnique();`);
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

        data.push(
            `public ${item.name} FindByCode(string normalizedCode)
    => CodeBasedEntityStoreHelper.FindEntityByCode(this, normalizedCode);`,
            `public Task<${item.name}> FindByCodeAsync(string normalizedCode, CancellationToken cancellationToken)
    => CodeBasedEntityStoreHelper.FindEntityByCodeAsync(this, normalizedCode, cancellationToken);`);
    }

    // AspNetCore

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    asp_EntityManagerClass_ConstructorParametersData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        data.push(`ILookupNormalizer<T${item.name}> codeNormalizer`);

        if (this.hasCodeGenerator(item)) {
            data.push(`IEntityCodeGenerator<T${item.name}> codeGenerator`);
        }
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    asp_EntityManagerClass_BaseConstructorParametersData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        data.push('codeNormalizer');

        if (this.hasCodeGenerator(item)) {
            data.push('codeGenerator');
        }
    }

    // AspNetCore.Mvc.DefaultViewModels

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    aspDv_EntityViewModelsClass_BasePropertyDeclarationsData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        data.push(
            'public string Id { get; set; }',
            `[LocalizedRequired]
[Display(Name = nameof(Code), ResourceType = typeof(DisplayNames))]
public string Code { get; set; }`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    aspDv_DisplayNamesResx_ItemsData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        data.push(`<data name="Code" xml:space="preserve">
  <value>Code</value>
</data>`);
    }
}
