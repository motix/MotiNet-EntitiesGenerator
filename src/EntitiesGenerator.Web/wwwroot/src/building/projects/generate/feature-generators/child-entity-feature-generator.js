import pluralize from 'pluralize';

import FeatureGenerator from './feature-generator';

export default class ChildEntityFeatureGenerator extends FeatureGenerator {
    get featureType() {
        return 'ChildEntity';
    }

    // IntelliSense support
    /**
     * @param {Item} item
     * @return {ChildEntityFeatureSetting}
     */
    itemFeatureSetting(item) {
        return super.itemFeatureSetting(item);
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
                name: this.parentName(item),
                lineBreak: false,
                isSubEntity: true
            }];
    }

    // Feature settings

    /**
     * @param {Item} item
     */
    parentName(item) {
        return this.itemFeatureSetting(item).parentName;
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
    hasSortedChildrenInParent(item) {
        return this.itemFeatureSetting(item).hasSortedChildrenInParent;
    }

    /**
     * @param {Item} item
     */
    sortedChildrenInParentCriteriaPropertyName(item) {
        return this.itemFeatureSetting(item).sortedChildrenInParentCriteriaPropertyName;
    }

    // Project specific content

    // Core

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_EntityManagerInterface_ManagerInterfacesData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        data.push(`IChildEntityManager${this.itemGenericTypeParameters(item)}`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_EntityStoreInterface_StoreInterfacesData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        data.push(`IChildEntityStore${this.itemGenericTypeParameters(item)}`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_EntityAccessorInterface_AccessorInterfacesData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        data.push(`IChildEntityAccessor${this.itemGenericTypeParameters(item)}`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_EntityManagerClass_PropertiesDeclarations1Data(item, data) {
        this.throwIfItemNotHaveFeature(item);

        data.push(
            `public IChildEntityStore${this.itemGenericTypeParameters(item)} ChildEntityStore => Store as IChildEntityStore${this.itemGenericTypeParameters(item)};`,
            `public IChildEntityAccessor${this.itemGenericTypeParameters(item)} ChildEntityAccessor => Accessor as IChildEntityAccessor${this.itemGenericTypeParameters(item)};`);
    }

    /**
     * @param {Item} item
     * @param {ParameterListItem[]} data
     */
    core_BuilderClass_ConstructorParametersData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        data.push({
            text: `Type ${_.lowerFirst(this.parentName(item))}Type`,
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
            text: `${_.lowerFirst(this.parentName(item))}Type`,
            lineBreak: false
        });
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_BuilderClass_PropertiesDeclarationsData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        data.push(`public Type ${this.parentName(item)}Type { get; private set; }`);
    }

    // SealedModels

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    sm_EntityClass_EntityInterfacesData_FromOthers(item, data) {
        for (const otherItem of item.module.items) {
            if (otherItem !== item && this.itemHasFeature(otherItem) && this.parentName(otherItem) === item.name) {
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

        data.push(`[Required]
[StringLength(StringLengths.Guid)]
public string ${this.parentName(item)}Id { get; set; }`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    sm_EntityClass_EntityPropertyDeclarationsData_FromOthers(item, data) {
        for (const otherItem of item.module.items) {
            if (otherItem !== item && this.itemHasFeature(otherItem) && this.parentName(otherItem) === item.name) {

                data.push(`[StringLength(StringLengths.Guid)]
public string Id { get; set; } = Guid.NewGuid().ToString();`);
            }
        }
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    sm_EntityClass_RelationshipsPropertyDeclarationsData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        data.push(`public ${this.parentName(item)} ${this.parentName(item)} { get; set; }`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    sm_EntityClass_RelationshipsPropertyDeclarationsData_FromOthers(item, data) {
        for (const otherItem of item.module.items) {
            if (otherItem !== item && this.itemHasFeature(otherItem) && this.parentName(otherItem) === item.name) {
                data.push(`public ICollection<${otherItem.name}> ${pluralize(otherItem.name)} { get; set; }`);
            }
        }
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    sm_EntityClass_CustomizationFieldDeclarationsData_FromOthers(item, data) {
        for (const otherItem of item.module.items) {
            if (otherItem !== item && this.itemHasFeature(otherItem) && this.parentName(otherItem) === item.name &&
                this.hasSortedChildrenInParent(otherItem)) {
                const entityName = otherItem.name;
                const pluralEntityName = pluralize(entityName);
                const criteriaPropertyName = this.sortedChildrenInParentCriteriaPropertyName(otherItem);

                if (criteriaPropertyName === null) {
                    data.push(`private readonly Func<IEnumerable<${entityName}>, IEnumerable<${entityName}>> _ordered${pluralEntityName}Method;`);
                }
            }
        }
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    sm_EntityClass_CustomizationPropertyDeclarationsData_FromOthers(item, data) {
        for (const otherItem of item.module.items) {
            if (otherItem !== item && this.itemHasFeature(otherItem) && this.parentName(otherItem) === item.name &&
                this.hasSortedChildrenInParent(otherItem)) {
                const entityName = otherItem.name;
                const pluralEntityName = pluralize(entityName);
                const criteriaPropertyName = this.sortedChildrenInParentCriteriaPropertyName(otherItem);

                if (criteriaPropertyName === null) {
                    data.push(`public IEnumerable<${entityName}> Ordered${pluralEntityName}
    => _ordered${pluralEntityName}Method == null ?
    throw new NotImplementedException() :
    _ordered${pluralEntityName}Method.Invoke(${pluralEntityName});`);
                } else {
                    data.push(`public IEnumerable<${entityName}> Ordered${pluralEntityName} => ${pluralEntityName}?.OrderBy(x => x.${criteriaPropertyName});`);
                }
            }
        }
    }

    /**
     * @param {Item} item
     * @param {string} subEntityName
     * @param {string[]} data
     */
    sm_SubEntityClass_EntityInterfacesData(item, subEntityName, data) {
        this.throwIfItemNotHaveFeature(item);

        if (this.parentName(item) !== subEntityName) {
            return;
        }

        data.push('IIdWiseEntity<string>');
    }

    /**
     * @param {Item} item
     * @param {string} subEntityName
     * @param {string[]} data
     */
    sm_SubEntityClass_EntityPropertyDeclarationsData(item, subEntityName, data) {
        this.throwIfItemNotHaveFeature(item);

        if (this.parentName(item) !== subEntityName) {
            return;
        }

        data.push(`[StringLength(StringLengths.Guid)]
public string Id { get; set; } = Guid.NewGuid().ToString();`);
    }

    /**
     * @param {Item} item
     * @param {string} subEntityName
     * @param {string[]} data
     */
    sm_SubEntityClass_RelationshipsPropertyDeclarationsData(item, subEntityName, data) {
        this.throwIfItemNotHaveFeature(item);

        if (this.parentName(item) !== subEntityName) {
            return;
        }

        data.push(`public ICollection<${item.name}> ${pluralize(item.name)} { get; set; }`);
    }

    /**
     * @param {Item} item
     * @param {string} subEntityName
     * @param {string[]} data
     */
    sm_SubEntityClass_CustomizationFieldDeclarationsData(item, subEntityName, data) {
        this.throwIfItemNotHaveFeature(item);

        if (this.parentName(item) !== subEntityName) {
            return;
        }

        if (this.hasSortedChildrenInParent(item)) {
            const entityName = item.name;
            const pluralEntityName = pluralize(entityName);
            const criteriaPropertyName = this.sortedChildrenInParentCriteriaPropertyName(item);

            if (criteriaPropertyName === null) {
                data.push(`private readonly Func<IEnumerable<${entityName}>, IEnumerable<${entityName}>> _ordered${pluralEntityName}Method;`);
            }
        }
    }

    /**
     * @param {Item} item
     * @param {string} subEntityName
     * @param {string[]} data
     */
    sm_SubEntityClass_CustomizationPropertyDeclarationsData(item, subEntityName, data) {
        this.throwIfItemNotHaveFeature(item);

        if (this.parentName(item) !== subEntityName) {
            return;
        }

        if (this.hasSortedChildrenInParent(item)) {
            const entityName = item.name;
            const pluralEntityName = pluralize(entityName);
            const criteriaPropertyName = this.sortedChildrenInParentCriteriaPropertyName(item);

            if (criteriaPropertyName === null) {
                data.push(`public IEnumerable<${entityName}> Ordered${pluralEntityName}
    => _ordered${pluralEntityName}Method == null ?
    throw new NotImplementedException() :
    _ordered${pluralEntityName}Method.Invoke(${pluralEntityName});`);
            } else {
                data.push(`public IEnumerable<${entityName}> Ordered${pluralEntityName} => ${pluralEntityName}?.OrderBy(x => x.${criteriaPropertyName});`);
            }
        }
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
        const lowerFirstParentName = _.lowerFirst(parentName);

        data.push(
            `public object GetParentId(${entityName} ${lowerFirstEntityName}) => ${lowerFirstEntityName}.${parentName}Id;`,
            `public void SetParentId(${entityName} ${lowerFirstEntityName}, object ${lowerFirstParentName}Id) => ${lowerFirstEntityName}.${parentName}Id = (string)${lowerFirstParentName}Id;`,
            `public ${parentName} GetParent(${entityName} ${lowerFirstEntityName}) => ${lowerFirstEntityName}.${parentName};`,
            `public void SetParent(${entityName} ${lowerFirstEntityName}, ${parentName} ${lowerFirstParentName}) => ${lowerFirstEntityName}.${parentName} = ${lowerFirstParentName};`);
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
        const parentName = this.parentName(item);

        if (this.deleteRestrict(item)) {
            data.push(`// Restrict delete
builder.HasOne(x => x.${parentName})
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
            if (otherItem !== item && this.itemHasFeature(otherItem) && this.parentName(otherItem) === item.name &&
                this.hasSortedChildrenInParent(otherItem)) {
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

        data.push(`IChildEntityStoreMarker<${item.name}, ${this.parentName(item)}, TDbContext>`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    efSm_EntityStoreClass_StoreMethodDeclarationsData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        const parentName = this.parentName(item);

        data.push(
            `public ${parentName} FindParentById(object id)
    => ChildEntityStoreHelper.FindParentById(this, id);`,
            `public Task<${parentName}> FindParentByIdAsync(object id, CancellationToken cancellationToken)
    => ChildEntityStoreHelper.FindParentByIdAsync(this, id, cancellationToken);`);
    }

    // AspNetCore.Mvc.DefaultViewModels

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    aspDv_EntityViewModelsClass_BasePropertyDeclarationsData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        const parentName = this.parentName(item);

        data.push(`[LocalizedRequired]
[Display(Name = "${parentName}", ResourceType = typeof(DisplayNames))]
public string ${parentName}Id { get; set; }`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    aspDv_EntityViewModelsClass_BasePropertyDeclarationsData_FromOthers(item, data) {
        for (const otherItem of item.module.items) {
            if (otherItem !== item && this.itemHasFeature(otherItem) && this.parentName(otherItem) === item.name) {
                data.push('public string Id { get; set; } = Guid.NewGuid().ToString();');
            }
        }
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    aspDv_EntityViewModelsClass_FullPropertyDeclarationsData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        const parentName = this.parentName(item);

        data.push(`[Display(Name = nameof(${parentName}), ResourceType = typeof(DisplayNames))]
public ${parentName}LiteViewModel ${parentName} { get; set; }`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    aspDv_EntityViewModelsClass_FullPropertyDeclarationsData_FromOthers(item, data) {
        for (const otherItem of item.module.items) {
            if (otherItem !== item && this.itemHasFeature(otherItem) && this.parentName(otherItem) === item.name) {
                data.push(`[Display(Name = nameof(${pluralize(otherItem.name)}), ResourceType = typeof(DisplayNames))]
public ICollection<${otherItem.name}LiteViewModel> ${pluralize(otherItem.name)} { get; set; }`);
            }
        }
    }

    /**
     * @param {Item} item
     * @param {string} subEntityName
     * @param {string[]} data
     */
    aspDv_SubEntityViewModelsClass_BasePropertyDeclarationsData(item, subEntityName, data) {
        this.throwIfItemNotHaveFeature(item);

        if (this.parentName(item) !== subEntityName) {
            return;
        }

        data.push('public string Id { get; set; } = Guid.NewGuid().ToString();');
    }

    /**
     * @param {Item} item
     * @param {string} subEntityName
     * @param {string[]} data
     */
    aspDv_SubEntityViewModelsClass_FullPropertyDeclarationsData(item, subEntityName, data) {
        this.throwIfItemNotHaveFeature(item);

        if (this.parentName(item) !== subEntityName) {
            return;
        }

        data.push(`[Display(Name = nameof(${pluralize(item.name)}), ResourceType = typeof(DisplayNames))]
public ICollection<${item.name}LiteViewModel> ${pluralize(item.name)} { get; set; }`);
    }

    /**
     * @param {Item} item
     * @param {{key: string, content: string}[]} data
     */
    aspDv_DisplayNamesResx_ItemsData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        const parentName = this.parentName(item);

        data.push(
            {
                key: parentName,
                content: `<data name="${parentName}" xml:space="preserve">
  <value>${parentName}</value>
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

        const parentName = this.parentName(item);

        data.push(
            {
                key: parentName,
                content: `/// <summary>
///   Looks up a localized string similar to ${parentName}.
/// </summary>
public static string ${parentName} {
    get {
        return ResourceManager.GetString("${parentName}", resourceCulture);
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

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    aspDv_ProfileClass_CreateEntityMapChainedMethodsData_FromOthers(item, data) {
        for (const otherItem of item.module.items) {
            if (otherItem !== item && this.itemHasFeature(otherItem) && this.parentName(otherItem) === item.name &&
                this.hasSortedChildrenInParent(otherItem)) {
                data.push(`.SwapMemberWithOrderedMember(nameof(${item.name}ViewModel.${pluralize(otherItem.name)}))`);
            }
        }
    }
}
