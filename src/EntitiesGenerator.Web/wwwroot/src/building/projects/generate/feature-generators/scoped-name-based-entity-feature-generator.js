import pluralize from 'pluralize';

import FeatureGenerator from './feature-generator';

export default class ScopedNameBasedEntityFeatureGenerator extends FeatureGenerator {
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

    /**
     * @param {Item} item
     * @return {EntityNameListItem[]}
     */
    itemEntityNames(item) {
        this.throwIfItemNotHaveFeature(item);

        return [
            {
                item: item,
                name: item.name,
                lineBreak: item.parameterListLineBreak
            }, {
                item: item,
                name: this.scopeName(item),
                lineBreak: false,
                isSubEntity: true
            }];
    }

    // Feature settings

    /**
     * @param {Item} item
     */
    scopeName(item) {
        return this.itemFeatureSetting(item).scopeName;
    }

    // Project specific content

    // Core

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_EntityManagerInterface_ManagerInterfacesData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        data.push(`IScopedNameBasedEntityManager${this.itemGenericTypeParameters(item)}`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_EntityStoreInterface_StoreInterfacesData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        data.push(`IScopedNameBasedEntityStore${this.itemGenericTypeParameters(item)}`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_EntityAccessorInterface_AccessorInterfacesData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        data.push(`IScopedNameBasedEntityAccessor${this.itemGenericTypeParameters(item)}`);
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

        data.push(`public IScopedNameBasedEntityStore${this.itemGenericTypeParameters(item)} ScopedNameBasedEntityStore => Store as IScopedNameBasedEntityStore${this.itemGenericTypeParameters(item)};`);
        data.push(`public IScopedNameBasedEntityAccessor${this.itemGenericTypeParameters(item)} ScopedNameBasedEntityAccessor => Accessor as IScopedNameBasedEntityAccessor${this.itemGenericTypeParameters(item)};`);
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
    core_EntityValidatorClass_SubEntityValidateMethodsData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        const scopeName = this.scopeName(item);
        const lowerFirstScopeName = _.lowerFirst(scopeName);

        data.push(`public Task<GenericResult> ValidateAsync(object manager, T${scopeName} ${lowerFirstScopeName})
    => throw new NeverValidateSubEntityException<T${scopeName}, I${item.name}Manager${this.itemGenericTypeParameters(item)}>();`);
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
     * @param {ParameterListItem[]} data
     */
    core_BuilderClass_ConstructorParametersData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        data.push({
            text: `Type ${_.lowerFirst(this.scopeName(item))}Type`,
            lineBreak: false
        });
    }

    /**
     * @param {Item} item
     * @param {ParameterListItem[]} data
     */
    core_BuilderClass_ConstructBuilderParametersData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        data.push({
            text: `${_.lowerFirst(this.scopeName(item))}Type`,
            lineBreak: false
        });
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_BuilderClass_PropertiesDeclarationsData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        data.push(`public Type ${this.scopeName(item)}Type { get; private set; }`);
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
    sm_EntityClass_EntityInterfacesData_FromOthers(item, data) {
        for (const otherItem of item.module.items) {
            if (otherItem !== item && this.itemHasFeature(otherItem) && this.scopeName(otherItem) === item.name) {
                data.push('IIdWiseEntity<string>');
            }
        }
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    sm_EntityClass_EntityPropertyDeclarationsData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        data.push(`[StringLength(StringLengths.Guid)]
public string Id { get; set; }`);
        data.push(`[Required]
[StringLength(StringLengths.Guid)]
public string ${this.scopeName(item)}Id { get; set; }`);
        data.push(`[Required]
[StringLength(StringLengths.TitleContent)]
public string Name { get; set; }`);
        data.push(`[Required]
[StringLength(StringLengths.TitleContent)]
public string NormalizedName { get; set; }`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    sm_EntityClass_EntityPropertyDeclarationsData_FromOthers(item, data) {
        for (const otherItem of item.module.items) {
            if (otherItem !== item && this.itemHasFeature(otherItem) && this.scopeName(otherItem) === item.name) {
                data.push(`[StringLength(StringLengths.Guid)]
public string Id { get; set; }`);
            }
        }
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    sm_EntityClass_RelationshipsPropertyDeclarationsData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        data.push(`public ${this.scopeName(item)} ${this.scopeName(item)} { get; set; }`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    sm_EntityClass_RelationshipsPropertyDeclarationsData_FromOthers(item, data) {
        for (const otherItem of item.module.items) {
            if (otherItem !== item && this.itemHasFeature(otherItem) && this.scopeName(otherItem) === item.name) {
                data.push(`public ICollection<${otherItem.name}> ${pluralize(otherItem.name)} { get; set; }`);
            }
        }
    }

    /**
     * @param {Item} item
     * @param {string} subEntityName
     * @param {string[]} data
     */
    sm_SubEntityClass_EntityInterfacesData_FromOthers(item, subEntityName, data) {
        data.push('IIdWiseEntity<string>');
    }

    /**
     * @param {Item} item
     * @param {string} subEntityName
     * @param {string[]} data
     */
    sm_SubEntityClass_EntityPropertyDeclarationsData_FromOthers(item, subEntityName, data) {
        data.push(`[StringLength(StringLengths.Guid)]
public string Id { get; set; }`);
    }

    /**
     * @param {Item} item
     * @param {string} subEntityName
     * @param {string[]} data
     */
    sm_SubEntityClass_RelationshipsPropertyDeclarationsData_FromOthers(item, subEntityName, data) {
        data.push(`public ICollection<${item.name}> ${pluralize(item.name)} { get; set; }`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    sm_EntityAccessorClass_AccessorMethodsData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        const entityName = item.name;
        const lowerFirstEntityName = _.lowerFirst(entityName);
        const scopeName = this.scopeName(item);
        const lowerFirstScopeName = _.lowerFirst(scopeName);

        data.push(`public object GetId(${entityName} ${lowerFirstEntityName}) => ${lowerFirstEntityName}.Id;`);
        data.push(`public string GetName(${entityName} ${lowerFirstEntityName}) => ${lowerFirstEntityName}.Name;`);
        data.push(`public void SetNormalizedName(${entityName} ${lowerFirstEntityName}, string normalizedName) => ${lowerFirstEntityName}.NormalizedName = normalizedName;`);
        data.push(`public object GetScopeId(${entityName} ${lowerFirstEntityName}) => ${lowerFirstEntityName}.${scopeName}Id;`);
        data.push(`public void SetScopeId(${entityName} ${lowerFirstEntityName}, object ${lowerFirstScopeName}Id) => ${lowerFirstEntityName}.${scopeName}Id = (string)${lowerFirstScopeName}Id;`);
        data.push(`public ${scopeName} GetScope(${entityName} ${lowerFirstEntityName}) => ${lowerFirstEntityName}.${scopeName};`);
        data.push(`public void SetScope(${entityName} ${lowerFirstEntityName}, ${scopeName} ${lowerFirstScopeName}) => ${lowerFirstEntityName}.${scopeName} = ${lowerFirstScopeName};`);
    }

    // EntityFrameworkCore

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    ef_DbContextClass_PropertyDeclarationsData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        const scopeName = this.scopeName(item);
        const pluralScopeName = pluralize(scopeName);

        data.push(`public DbSet<T${scopeName}> ${pluralScopeName} { get; set; }`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    ef_DbContextClass_ConfigureEntityRegistrationsData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        const scopeName = this.scopeName(item);

        data.push(`modelBuilder.Entity<T${scopeName}>(Configure${scopeName});`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    ef_DbContextClass_ConfigureEntityMethodsData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        const scopeName = this.scopeName(item);

        data.push(`protected virtual void Configure${scopeName}(EntityTypeBuilder<T${scopeName}> builder) { }`);
    }

    // EntityFrameworkCore.SealedModels

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    efSm_DbContextClass_EntityConfigurationsData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        const entityName = item.name;
        const scopeName = this.scopeName(item);

        data.push(`// Unique name in scope
builder.HasIndex(nameof(${entityName}.Name), nameof(${entityName}.${scopeName}Id)).IsUnique();
builder.HasIndex(nameof(${entityName}.NormalizedName), nameof(${entityName}.${scopeName}Id)).IsUnique();`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    efSm_EntityStoreClass_StoreInterfacesData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        data.push(`IScopedNameBasedEntityStoreMarker<${item.name}, ${this.scopeName(item)}, TDbContext>`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    efSm_EntityStoreClass_StoreMethodDeclarationsData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        const entityName = item.name;
        const scopeName = this.scopeName(item);
        const lowerFirstScopeName = _.lowerFirst(scopeName);

        data.push(`public ${entityName} FindByName(string normalizedName, ${scopeName} ${lowerFirstScopeName})
    => ScopedNameBasedEntityStoreHelper.FindEntityByName(this, normalizedName, ${lowerFirstScopeName}, x => x.${scopeName}Id);`);
        data.push(`public Task<${entityName}> FindByNameAsync(string normalizedName, ${scopeName} ${lowerFirstScopeName}, CancellationToken cancellationToken)
    => ScopedNameBasedEntityStoreHelper.FindEntityByNameAsync(this, normalizedName, ${lowerFirstScopeName}, x => x.${scopeName}Id, cancellationToken);`);
        data.push(`public ${scopeName} FindScopeById(object id)
    => ScopedNameBasedEntityStoreHelper.FindScopeById(this, id);`);
        data.push(`public Task<${scopeName}> FindScopeByIdAsync(object id, CancellationToken cancellationToken)
    => ScopedNameBasedEntityStoreHelper.FindScopeByIdAsync(this, id, cancellationToken);`);
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

        const scopeName = this.scopeName(item);

        data.push('public string Id { get; set; }');
        data.push(`[LocalizedRequired]
[Display(Name = "${scopeName}", ResourceType = typeof(DisplayNames))]
public string ${scopeName}Id { get; set; }`);
        data.push(`[LocalizedRequired]
[Display(Name = nameof(Name), ResourceType = typeof(DisplayNames))]
public string Name { get; set; }`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    aspDv_EntityViewModelsClass_BasePropertyDeclarationsData_FromOthers(item, data) {
        for (const otherItem of item.module.items) {
            if (otherItem !== item && this.itemHasFeature(otherItem) && this.scopeName(otherItem) === item.name) {
                data.push('public string Id { get; set; }');
            }
        }
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    aspDv_EntityViewModelsClass_FullPropertyDeclarationsData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        const scopeName = this.scopeName(item);

        data.push(`[Display(Name = nameof(${scopeName}), ResourceType = typeof(DisplayNames))]
public ${scopeName}LiteViewModel ${scopeName} { get; set; }`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    aspDv_EntityViewModelsClass_FullPropertyDeclarationsData_FromOthers(item, data) {
        for (const otherItem of item.module.items) {
            if (otherItem !== item && this.itemHasFeature(otherItem) && this.scopeName(otherItem) === item.name) {
                data.push(`[Display(Name = nameof(${pluralize(otherItem.name)}), ResourceType = typeof(DisplayNames))]
public ICollection<${otherItem.name}LiteViewModel> ${pluralize(otherItem.name)} { get; set; }`);
            }
        }
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    aspDv_SubEntityViewModelsClass_BasePropertyDeclarationsData_FromOthers(item, data) {
        data.push('public string Id { get; set; }');
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    aspDv_SubEntityViewModelsClass_FullPropertyDeclarationsData_FromOthers(item, data) {
        data.push(`[Display(Name = nameof(${pluralize(item.name)}), ResourceType = typeof(DisplayNames))]
public ICollection<${item.name}LiteViewModel> ${pluralize(item.name)} { get; set; }`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    aspDv_DisplayNamesResx_ItemsData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        const scopeName = this.scopeName(item);

        data.push(
            `<data name="${scopeName}" xml:space="preserve">
  <value>${scopeName}</value>
</data>`,
            `<data name="Name" xml:space="preserve">
  <value>Name</value>
</data>`,
            `<data name="${pluralize(item.name)}" xml:space="preserve">
  <value>${_.startCase(pluralize(item.name))}</value>
</data>`);
    }
}
