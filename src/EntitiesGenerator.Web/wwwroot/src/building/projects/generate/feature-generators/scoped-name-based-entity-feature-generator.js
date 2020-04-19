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

    /**
     * @param {Item} item
     */
    namePropertyName(item) {
        return this.itemFeatureSetting(item).namePropertyName;
    }

    /**
     * @param {Item} item
     */
    deleteRestrict(item) {
        return this.itemFeatureSetting(item).deleteRestrict;
    }

    /**
     * @param {Item} item
     */
    hasSortedChildrenInScope(item) {
        return this.itemFeatureSetting(item).hasSortedChildrenInScope;
    }

    /**
     * @param {Item} item
     */
    sortedChildrenInScopeCriteriaPropertyName(item) {
        return this.itemFeatureSetting(item).sortedChildrenInScopeCriteriaPropertyName;
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
            `public IScopedNameBasedEntityStore${this.itemGenericTypeParameters(item)} ScopedNameBasedEntityStore => Store as IScopedNameBasedEntityStore${this.itemGenericTypeParameters(item)};`,
            `public IScopedNameBasedEntityAccessor${this.itemGenericTypeParameters(item)} ScopedNameBasedEntityAccessor => Accessor as IScopedNameBasedEntityAccessor${this.itemGenericTypeParameters(item)};`);
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

        const namePropertyName = this.namePropertyName(item);

        if (namePropertyName === 'Name') {
            data.push('INameWiseEntity');
        }
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

        const constructorModifier = item.abstractModel ? 'protected' : 'public';
        const namePropertyName = this.namePropertyName(item);

        data.push(
            `${constructorModifier} ${item.name}() => Id = Guid.NewGuid().ToString();`,
            `[StringLength(StringLengths.Guid)]
public string Id { get; set; }`,
            `[Required]
[StringLength(StringLengths.Guid)]
public string ${this.scopeName(item)}Id { get; set; }`,
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
    sm_EntityClass_EntityPropertyDeclarationsData_FromOthers(item, data) {
        for (const otherItem of item.module.items) {
            if (otherItem !== item && this.itemHasFeature(otherItem) && this.scopeName(otherItem) === item.name) {

                const constructorModifier = item.abstractModel ? 'protected' : 'public';

                data.push(
                    `${constructorModifier} ${item.name}() => Id = Guid.NewGuid().ToString();`,
                    `[StringLength(StringLengths.Guid)]
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
     * @param {string[]} data
     */
    sm_EntityClass_CustomizationPropertyDeclarationsData_FromOthers(item, data) {
        for (const otherItem of item.module.items) {
            if (otherItem !== item && this.itemHasFeature(otherItem) && this.scopeName(otherItem) === item.name &&
                this.hasSortedChildrenInScope(otherItem)) {
                data.push(`public IEnumerable<${otherItem.name}> Ordered${pluralize(otherItem.name)} => ${pluralize(otherItem.name)}?.OrderBy(x => x.${this.sortedChildrenInScopeCriteriaPropertyName(otherItem)});`);
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

        const constructorModifier = item.abstractModel ? 'protected' : 'public';

        data.push(
            `${constructorModifier} ${item.name}() => Id = Guid.NewGuid().ToString();`,
            `[StringLength(StringLengths.Guid)]
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
        const namePropertyName = this.namePropertyName(item);

        data.push(
            `public object GetId(${entityName} ${lowerFirstEntityName}) => ${lowerFirstEntityName}.Id;`,
            `public string GetName(${entityName} ${lowerFirstEntityName}) => ${lowerFirstEntityName}.${namePropertyName};`,
            `public void SetNormalizedName(${entityName} ${lowerFirstEntityName}, string normalized${namePropertyName}) => ${lowerFirstEntityName}.Normalized${namePropertyName} = normalized${namePropertyName};`,
            `public object GetScopeId(${entityName} ${lowerFirstEntityName}) => ${lowerFirstEntityName}.${scopeName}Id;`,
            `public void SetScopeId(${entityName} ${lowerFirstEntityName}, object ${lowerFirstScopeName}Id) => ${lowerFirstEntityName}.${scopeName}Id = (string)${lowerFirstScopeName}Id;`,
            `public ${scopeName} GetScope(${entityName} ${lowerFirstEntityName}) => ${lowerFirstEntityName}.${scopeName};`,
            `public void SetScope(${entityName} ${lowerFirstEntityName}, ${scopeName} ${lowerFirstScopeName}) => ${lowerFirstEntityName}.${scopeName} = ${lowerFirstScopeName};`);
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
        const pluralEntityName = pluralize(entityName);
        const scopeName = this.scopeName(item);
        const namePropertyName = this.namePropertyName(item);

        data.push(`// Unique name in scope
builder.HasIndex(nameof(${entityName}.${scopeName}Id), nameof(${entityName}.{namePropertyName})).IsUnique();
builder.HasIndex(nameof(${entityName}.${scopeName}Id), nameof(${entityName}.Normalized${namePropertyName})).IsUnique();`);

        if (this.deleteRestrict(item)) {
            data.push(`// Restrict delete
builder.HasOne(x => x.${scopeName})
       .WithMany(x => x.${pluralEntityName})
       .OnDelete(DeleteBehavior.Restrict);`);
        }
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    efSm_DbContextClass_EntityConfigurationsData_FromOthers(item, data) {
        for (const otherItem of item.module.items) {
            if (otherItem !== item && this.itemHasFeature(otherItem) && this.scopeName(otherItem) === item.name &&
                this.hasSortedChildrenInScope(otherItem)) {
                data.push(`// Ignore ordered children
builder.Ignore(x => x.Ordered${pluralize(otherItem.name)});`);
            }
        }
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
        const namePropertyName = this.namePropertyName(item);
        var nameSelecor = '';

        if (namePropertyName !== 'Name') {
            nameSelecor = `, x => x.${namePropertyName}, x => x.Id`;
        }

        data.push(
            `public ${entityName} FindByName(string normalized${namePropertyName}, ${scopeName} ${lowerFirstScopeName})
    => ScopedNameBasedEntityStoreHelper.FindEntityByName(this, normalized${namePropertyName}, ${lowerFirstScopeName}, x => x.${scopeName}Id${nameSelecor});`,
            `public Task<${entityName}> FindByNameAsync(string normalized${namePropertyName}, ${scopeName} ${lowerFirstScopeName}, CancellationToken cancellationToken)
    => ScopedNameBasedEntityStoreHelper.FindEntityByNameAsync(this, normalized${namePropertyName}, ${lowerFirstScopeName}, x => x.${scopeName}Id${nameSelecor}, cancellationToken);`,
            `public ${scopeName} FindScopeById(object id)
    => ScopedNameBasedEntityStoreHelper.FindScopeById(this, id);`,
            `public Task<${scopeName}> FindScopeByIdAsync(object id, CancellationToken cancellationToken)
    => ScopedNameBasedEntityStoreHelper.FindScopeByIdAsync(this, id, cancellationToken);`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    aspDv_ProfileClass_CreateEntityMapChainedMethodsData_FromOthers(item, data) {
        for (const otherItem of item.module.items) {
            if (otherItem !== item && this.itemHasFeature(otherItem) && this.scopeName(otherItem) === item.name &&
                this.hasSortedChildrenInScope(otherItem)) {
                data.push(`.SwapMemberWithOrderedMember(nameof(${item.name}ViewModel.${pluralize(otherItem.name)}))`);
            }
        }
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

        const scopeName = this.scopeName(item);
        const namePropertyName = this.namePropertyName(item);

        data.push(
            `protected ${item.name}ViewModelBase() => Id = Guid.NewGuid().ToString();`,
            'public string Id { get; set; }',
            `[LocalizedRequired]
[Display(Name = "${scopeName}", ResourceType = typeof(DisplayNames))]
public string ${scopeName}Id { get; set; }`,
            `[LocalizedRequired]
[Display(Name = nameof(${namePropertyName}), ResourceType = typeof(DisplayNames))]
public string ${namePropertyName} { get; set; }`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    aspDv_EntityViewModelsClass_BasePropertyDeclarationsData_FromOthers(item, data) {
        for (const otherItem of item.module.items) {
            if (otherItem !== item && this.itemHasFeature(otherItem) && this.scopeName(otherItem) === item.name) {
                data.push(
                    `protected ${item.name}ViewModelBase() => Id = Guid.NewGuid().ToString();`,
                    'public string Id { get; set; }');
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
        data.push(
            `protected ${item.name}ViewModelBase() => Id = Guid.NewGuid().ToString();`,
            'public string Id { get; set; }');
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
     * @param {{key: string, content: string}[]} data
     */
    aspDv_DisplayNamesResx_ItemsData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        const scopeName = this.scopeName(item);
        const namePropertyName = this.namePropertyName(item);
        const nameDisplayName = _.startCase(namePropertyName);

        data.push(
            {
                key: scopeName,
                content: `<data name="${scopeName}" xml:space="preserve">
  <value>${scopeName}</value>
</data>`
            },
            {
                key: namePropertyName,
                content: `<data name="${namePropertyName}" xml:space="preserve">
  <value>${nameDisplayName}</value>
</data>`
            },
            {
                key: pluralize(item.name),
                content: `<data name="${pluralize(item.name)}" xml:space="preserve">
  <value>${_.startCase(pluralize(item.name))}</value>
</data>`
            });
    }

    /**
     * @param {Item} item
     * @param {{key: string, content: string}[]} data
     */
    aspDv_DisplayNamesResxDesignerClass_ItemsData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        const scopeName = this.scopeName(item);
        const namePropertyName = this.namePropertyName(item);
        const nameDisplayName = _.startCase(namePropertyName);

        data.push(
            {
                key: scopeName,
                content: `/// <summary>
///   Looks up a localized string similar to ${scopeName}.
/// </summary>
public static string ${scopeName} {
    get {
        return ResourceManager.GetString("${scopeName}", resourceCulture);
    }
}`
            },
            {
                key: namePropertyName,
                content: `/// <summary>
///   Looks up a localized string similar to ${nameDisplayName}.
/// </summary>
public static string ${namePropertyName} {
    get {
        return ResourceManager.GetString("${namePropertyName}", resourceCulture);
    }
}`
            },
            {
                key: pluralize(item.name),
                content: `/// <summary>
///   Looks up a localized string similar to ${pluralize(item.name)}.
/// </summary>
public static string ${pluralize(item.name)} {
    get {
        return ResourceManager.GetString("${pluralize(item.name)}", resourceCulture);
    }
}`
            });
    }
}
