import pluralize from 'pluralize';
import { SmProjectSG } from '../structure-generators/structure-generators';

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

    // Feature settings

    /**
     * @param {Item} item
     */
    useActiveField(item) {
        return this.itemFeatureSetting(item).useActiveField;
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
     * @param {Folder} folder
     */
    sm_SpecificationsFolder_GenerateSpecification(item, folder) {
        this.throwIfItemNotHaveFeature(item);

        const entityName = item.name;
        const pluralEntityName = pluralize(entityName);
        const lowerFirstEntityName = _.lowerFirst(entityName);

        if (!this.useActiveField(item)) {
            folder.children.push({
                type: 'file',
                name: `SearchActive${pluralEntityName}Specification.cs`,
                generator: {
                    get language() { return 'csharp'; },

                    generate() {
                        const namespace = SmProjectSG.getDefaultNamespace(item.module);

                        const content = `using MotiNet.Entities;
using System;
using System.Linq.Expressions;

namespace ${namespace}
{
    public partial class SearchActive${pluralEntityName}Specification
        : SearchSpecificationBase<${entityName}>, ISearchSpecification<${entityName}>
    {
        public override Expression<Func<${entityName}, bool>> Criteria
        {
            get
            {
                var internalProperty = GetType().GetProperty("CriteriaInternal",
                    System.Reflection.BindingFlags.Instance | System.Reflection.BindingFlags.NonPublic);

                if (internalProperty != null)
                {
                    return (Expression<Func<${entityName}, bool>>)internalProperty.GetValue(this);
                }

                throw new NotImplementedException();
            }
        }
    }
}
`;

                        return content;
                    }
                }
            });
        }
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    sm_EntityClass_EntityInterfacesData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        if (this.useActiveField(item)) {
            data.push('IIsActiveWiseEntity');
        }
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    sm_EntityClass_EntityPropertyDeclarationsData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        if (this.useActiveField(item)) {
            data.push('public bool IsActive { get; set; }');
        }
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    sm_DependencyInjectionClass_ServiceRegistrationsData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        if (!this.useActiveField(item)) {
            const entityName = item.name;
            const pluralEntityName = pluralize(entityName);

            data.push(`services.TryAddScoped<SearchActive${pluralEntityName}Specification, SearchActive${pluralEntityName}Specification>();`);
        }
    }

    // EntityFrameworkCore.SealedModels

    /**
     * @param {Item} item
     * @param {ParameterListItem[]} data
     */
    efSm_EntityStoreClass_ConstructorParametersData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        if (!this.useActiveField(item)) {
            const entityName = item.name;
            const pluralEntityName = pluralize(entityName);

            data.push({
                text: `SearchActive${pluralEntityName}Specification searchActive${pluralEntityName}Specification`,
                lineBreak: false
            });
        }
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    efSm_EntityStoreClass_ConstructorBodyData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        if (!this.useActiveField(item)) {
            const entityName = item.name;
            const pluralEntityName = pluralize(entityName);

            data.push(`SearchActiveEntitiesSpecification = searchActive${pluralEntityName}Specification;`);
        }
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    efSm_EntityStoreClass_StorePropertyDeclarationsData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        if (this.useActiveField(item)) {
            data.push(`public ISearchSpecification<${item.name}> SearchActiveEntitiesSpecification => new SearchActiveSpecification<${item.name}>();`);
        } else {
            data.push(`public ISearchSpecification<${item.name}> SearchActiveEntitiesSpecification { get; private set; }`);
        }
    }

    // AspNetCore.Mvc.DefaultViewModels

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    aspDv_EntityViewModelsClass_BasePropertyDeclarationsData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        if (this.useActiveField(item)) {
            data.push(`[Display(Name = "Active", ResourceType = typeof(DisplayNames))]
public bool IsActive { get; set; }`);
        }
    }

    /**
     * @param {Item} item
     * @param {{key: string, content: string}[]} data
     */
    aspDv_DisplayNamesResx_ItemsData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        if (this.useActiveField(item)) {
            data.push({
                key: 'Active',
                content: `<data name="Active" xml:space="preserve">
  <value>Active</value>
</data>`
            });
        }
    }

    /**
     * @param {Item} item
     * @param {{key: string, content: string}[]} data
     */
    aspDv_DisplayNamesResxDesignerClass_ItemsData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        if (this.useActiveField(item)) {
            data.push({
                key: 'Active',
                content: `/// <summary>
///   Looks up a localized string similar to Active.
/// </summary>
public static string Active {
    get {
        return ResourceManager.GetString("Active", resourceCulture);
    }
}`
            });
        }
    }
}
