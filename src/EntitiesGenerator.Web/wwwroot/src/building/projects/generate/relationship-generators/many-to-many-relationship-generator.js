import 'lodash';
import pluralize from 'pluralize';
import { EfProjectSG } from '../structure-generators/structure-generators';

import '../types';

import RelationshipGenerator from './relationship-generator';

export default class ManyToManyRelationshipGenerator extends RelationshipGenerator {
    get relationshipType() {
        return 'ManyToMany';
    }

    // Relationship settings

    /**
     * @param {Item} item
     * @param {ManyToManyItemsRelationship} itemsRelationship
     */
    othersPropertyName(item, itemsRelationship) {
        const otherItem = this.otherItem(item, itemsRelationship);
        return this.itemPropertyName(item, itemsRelationship) || pluralize(otherItem.name);
    }

    /**
     * @param {Item} item
     * @param {ManyToManyItemsRelationship} itemsRelationship
     */
    hasSortedOtherItemsInItem(item, itemsRelationship) {
        return (item === itemsRelationship.item1 && itemsRelationship.hasSortedItem2sInItem1) ||
            (item === itemsRelationship.item2 && itemsRelationship.hasSortedItem1sInItem2);
    }

    /**
     * @param {Item} item
     * @param {ManyToManyItemsRelationship} itemsRelationship
     */
    criteriaPropertyName(item, itemsRelationship) {
        return item === itemsRelationship.item1 ?
            itemsRelationship.sortedItem2sInItem1CriteriaPropertyName : itemsRelationship.sortedItem1sInItem2CriteriaPropertyName;
    }

    // Project specific structure

    // EntityFrameworkCore

    /**
     * @param {ItemsRelationship} itemsRelationship
     * @param {StructureNode} folder
     */
    ef_ProjectFolder(itemsRelationship, folder) {
        this.throwIfRelationshipNotMatchGenerator(itemsRelationship);

        let manyToManyFolder = _.find(folder.children, value => value.name === '_ManyToMany');

        if (!manyToManyFolder) {
            manyToManyFolder = {
                type: 'folder',
                name: '_ManyToMany',
                children: []
            }

            folder.children.push(manyToManyFolder);
        }

        const entity1Name = itemsRelationship.item1.name;
        const entity2Name = itemsRelationship.item2.name;

        manyToManyFolder.children.push({
            type: 'file',
            name: `${entity1Name}${entity2Name}.cs`,
            generator: {
                get language() { return 'csharp'; },

                generate() {
                    const namespace = EfProjectSG.getDefaultNamespace(itemsRelationship.module);

                    const content = `using System;

namespace ${namespace}
{
    public class ${entity1Name}${entity2Name}<T${entity1Name}, T${entity2Name}, TKey>
        where T${entity1Name} : class
        where T${entity2Name} : class
        where TKey : IEquatable<TKey>
    {
        public TKey ${entity1Name}Id { get; set; }
        public TKey ${entity2Name}Id { get; set; }

        public T${entity1Name} ${entity1Name} { get; set; }
        public T${entity2Name} ${entity2Name} { get; set; }
    }
}
`;

                    return content;
                }
            }
        });
    }

    // EntityFrameworkCore.SealedModels

    /**
     * @param {ItemsRelationship} itemsRelationship
     * @param {StructureNode} folder
     */
    efSm_ProjectFolder(itemsRelationship, folder) {
        this.throwIfRelationshipNotMatchGenerator(itemsRelationship);

        let manyToManySpecificationsFolder = _.find(folder.children, value => value.name === '_ManyToManySpecifications');

        if (!manyToManySpecificationsFolder) {
            manyToManySpecificationsFolder = {
                type: 'folder',
                name: '_ManyToManySpecifications',
                children: []
            }

            folder.children.push(manyToManySpecificationsFolder);
        }

        const namespace = EfProjectSG.getDefaultNamespace(itemsRelationship.module);
        const entity1Name = itemsRelationship.item1.name;
        const pluralEntity1Name = pluralize(entity1Name);
        const entity1PropertyName = this.othersPropertyName(itemsRelationship.item1, itemsRelationship);
        const entity2Name = itemsRelationship.item2.name;
        const pluralEntity2Name = pluralize(entity2Name);
        const entity2PropertyName = this.othersPropertyName(itemsRelationship.item2, itemsRelationship);

        manyToManySpecificationsFolder.children.push({
            type: 'file',
            name: `${pluralEntity1Name}To${pluralEntity2Name}IncludeSpecification.cs`,
            generator: {
                get language() { return 'csharp'; },

                generate() {
                    const content = `using MotiNet.Entities;

namespace ${namespace}
{
    public class ${pluralEntity1Name}To${pluralEntity2Name}IncludeSpecification : ManyToManyIncludeSpecification<${entity1Name}>
    {
        public ${pluralEntity1Name}To${pluralEntity2Name}IncludeSpecification() : base(
            thisIdExpression: x => x.Id,
            otherType: typeof(${entity2Name}),
            otherIdExpression: x => ((${entity2Name})x).Id,
            othersExpression: x => x.${entity1PropertyName},
            linkType: typeof(${entity1Name}${entity2Name}<${entity1Name}, ${entity2Name}, string>),
            linkForeignKeyToThisExpression: x => ((${entity1Name}${entity2Name}<${entity1Name}, ${entity2Name}, string>)x).${entity1Name}Id,
            linkForeignKeyToOtherExpression: x => ((${entity1Name}${entity2Name}<${entity1Name}, ${entity2Name}, string>)x).${entity2Name}Id)
        { }
    }
}
`;

                    return content;
                }
            }
        });

        manyToManySpecificationsFolder.children.push({
            type: 'file',
            name: `${pluralEntity1Name}To${pluralEntity2Name}RelationshipSpecification.cs`,
            generator: {
                get language() { return 'csharp'; },

                generate() {
                    const content = `using MotiNet.Entities;

namespace ${namespace}
{
    public class ${pluralEntity1Name}To${pluralEntity2Name}RelationshipSpecification : ManyToManyRelationshipSpecification<${entity1Name}>
    {
        public ${pluralEntity1Name}To${pluralEntity2Name}RelationshipSpecification() : base(
            thisIdExpression: x => x.Id,
            otherIdExpression: x => ((${entity2Name})x).Id,
            othersExpression: x => x.${entity1PropertyName},
            linkType: typeof(${entity1Name}${entity2Name}<${entity1Name}, ${entity2Name}, string>),
            linkForeignKeyToThisExpression: x => ((${entity1Name}${entity2Name}<${entity1Name}, ${entity2Name}, string>)x).${entity1Name}Id,
            linkForeignKeyToOtherExpression: x => ((${entity1Name}${entity2Name}<${entity1Name}, ${entity2Name}, string>)x).${entity2Name}Id)
        { }
    }
}
`;

                    return content;
                }
            }
        });

        manyToManySpecificationsFolder.children.push({
            type: 'file',
            name: `${pluralEntity2Name}To${pluralEntity1Name}IncludeSpecification.cs`,
            generator: {
                get language() { return 'csharp'; },

                generate() {
                    const content = `using MotiNet.Entities;

namespace ${namespace}
{
    public class ${pluralEntity2Name}To${pluralEntity1Name}IncludeSpecification : ManyToManyIncludeSpecification<${entity2Name}>
    {
        public ${pluralEntity2Name}To${pluralEntity1Name}IncludeSpecification() : base(
            thisIdExpression: x => x.Id,
            otherType: typeof(${entity1Name}),
            otherIdExpression: x => ((${entity1Name})x).Id,
            othersExpression: x => x.${entity2PropertyName},
            linkType: typeof(${entity1Name}${entity2Name}<${entity1Name}, ${entity2Name}, string>),
            linkForeignKeyToThisExpression: x => ((${entity1Name}${entity2Name}<${entity1Name}, ${entity2Name}, string>)x).${entity2Name}Id,
            linkForeignKeyToOtherExpression: x => ((${entity1Name}${entity2Name}<${entity1Name}, ${entity2Name}, string>)x).${entity1Name}Id)
        { }
    }
}
`;

                    return content;
                }
            }
        });

        manyToManySpecificationsFolder.children.push({
            type: 'file',
            name: `${pluralEntity2Name}To${pluralEntity1Name}RelationshipSpecification.cs`,
            generator: {
                get language() { return 'csharp'; },

                generate() {
                    const content = `using MotiNet.Entities;

namespace ${namespace}
{
    public class ${pluralEntity2Name}To${pluralEntity1Name}RelationshipSpecification : ManyToManyRelationshipSpecification<${entity2Name}>
    {
        public ${pluralEntity2Name}To${pluralEntity1Name}RelationshipSpecification() : base(
            thisIdExpression: x => x.Id,
            otherIdExpression: x => ((${entity1Name})x).Id,
            othersExpression: x => x.${entity2PropertyName},
            linkType: typeof(${entity1Name}${entity2Name}<${entity1Name}, ${entity2Name}, string>),
            linkForeignKeyToThisExpression: x => ((${entity1Name}${entity2Name}<${entity1Name}, ${entity2Name}, string>)x).${entity2Name}Id,
            linkForeignKeyToOtherExpression: x => ((${entity1Name}${entity2Name}<${entity1Name}, ${entity2Name}, string>)x).${entity1Name}Id)
        { }
    }
}
`;

                    return content;
                }
            }
        });
    }

    // Project specific content

    // SealedModels

    /**
     * @param {Item} item
     * @param {ItemsRelationship} itemsRelationship
     * @param {string[]} data
     */
    sm_EntityClass_EntityPropertyDeclarationsData(item, itemsRelationship, data) {
        this.throwIfItemNotHaveRelationship(item, itemsRelationship);

        data.push(`[StringLength(StringLengths.Guid)]
public string Id { get; set; } = Guid.NewGuid().ToString();`);
    }

    /**
     * @param {Item} item
     * @param {ManyToManyItemsRelationship} itemsRelationship
     * @param {string[]} data
     */
    sm_EntityClass_RelationshipsPropertyDeclarationsData(item, itemsRelationship, data) {
        this.throwIfItemNotHaveRelationship(item, itemsRelationship);

        const otherItem = this.otherItem(item, itemsRelationship);
        const otherEntityName = otherItem.name;
        const othersPropertyName = this.othersPropertyName(item, itemsRelationship);

        data.push(`public ICollection<${otherEntityName}> ${othersPropertyName} { get; set; }`);
    }

    /**
     * @param {Item} item
     * @param {ManyToManyItemsRelationship} itemsRelationship
     * @param {string[]} data
     */
    sm_EntityClass_CustomizationFieldDeclarationsData(item, itemsRelationship, data) {
        this.throwIfItemNotHaveRelationship(item, itemsRelationship);

        if (this.hasSortedOtherItemsInItem(item, itemsRelationship)) {
            const criteriaPropertyName = this.criteriaPropertyName(item, itemsRelationship);

            if (criteriaPropertyName === null) {
                const otherItem = this.otherItem(item, itemsRelationship);
                const otherEntityName = otherItem.name;
                const othersPropertyName = this.othersPropertyName(item, itemsRelationship);

                data.push(`private readonly Func<IEnumerable<${otherEntityName}>, IEnumerable<${otherEntityName}>> _ordered${othersPropertyName}Method;`);
            }
        }
    }

    /**
     * @param {Item} item
     * @param {ManyToManyItemsRelationship} itemsRelationship
     * @param {string[]} data
     */
    sm_EntityClass_CustomizationPropertyDeclarationsData(item, itemsRelationship, data) {
        this.throwIfItemNotHaveRelationship(item, itemsRelationship);

        if (this.hasSortedOtherItemsInItem(item, itemsRelationship)) {
            const otherItem = this.otherItem(item, itemsRelationship);
            const otherEntityName = otherItem.name;
            const othersPropertyName = this.othersPropertyName(item, itemsRelationship);
            const criteriaPropertyName = this.criteriaPropertyName(item, itemsRelationship);

            if (criteriaPropertyName === null) {
                data.push(`public IEnumerable<${otherEntityName}> Ordered${othersPropertyName} => _ordered${othersPropertyName}Method == null ?
    throw new NotImplementedException() : _ordered${othersPropertyName}Method.Invoke(${othersPropertyName});`);
            } else {
                data.push(`public IEnumerable<${otherEntityName}> Ordered${othersPropertyName} => ${othersPropertyName}?.OrderBy(x => x.${criteriaPropertyName});`);
            }
        }
    }

    // EntityFrameworkCore

    /**
     * @param {Item} item
     * @param {ItemsRelationship} itemsRelationship
     * @param {string[]} data
     */
    ef_DbContextClass_PropertyDeclarationsData(item, itemsRelationship, data) {
        this.throwIfItemNotHaveRelationship(item, itemsRelationship);

        if (item === itemsRelationship.item1) {
            const entity1Name = itemsRelationship.item1.name;
            const entity2Name = itemsRelationship.item2.name;
            const dbSetName = pluralize(`${entity1Name}${entity2Name}`);

            data.push(`// Many to many
public DbSet<${entity1Name}${entity2Name}<T${entity1Name}, T${entity2Name}, string>> ${dbSetName} { get; set; }`);
        }
    }

    /**
     * @param {Item} item
     * @param {ItemsRelationship} itemsRelationship
     * @param {string[]} data
     */
    ef_DbContextClass_ConfigureEntityRegistrationsData(item, itemsRelationship, data) {
        this.throwIfItemNotHaveRelationship(item, itemsRelationship);

        if (item === itemsRelationship.item1) {
            const entity1Name = itemsRelationship.item1.name;
            const entity2Name = itemsRelationship.item2.name;

            data.push(`// Many to many
modelBuilder.Entity<${entity1Name}${entity2Name}<T${entity1Name}, T${entity2Name}, TKey>>().HasKey(x => new { x.${entity1Name}Id, x.${entity2Name}Id });`);
        }
    }

    // EntityFrameworkCore.SealedModels

    /**
     * @param {Item} item
     * @param {OneToManyItemsRelationship} itemsRelationship
     * @param {string[]} data
     */
    efSm_DbContextClass_EntityConfigurationsData(item, itemsRelationship, data) {
        this.throwIfItemNotHaveRelationship(item, itemsRelationship);

        const othersPropertyName = this.othersPropertyName(item, itemsRelationship);

        if (this.hasSortedOtherItemsInItem(item, itemsRelationship)) {
            data.push(`// Many to many
builder.Ignore(x => x.${othersPropertyName});
builder.Ignore(x => x.Ordered${othersPropertyName});`);
        } else {
            data.push(`// Many to many
builder.Ignore(x => x.${othersPropertyName});`);
        }
    }

    // AspNetCore.Mvc.DefaultViewModels

    /**
     * @param {Item} item
     * @param {ItemsRelationship} itemsRelationship
     * @param {string[]} data
     */
    aspDv_EntityViewModelsClass_BasePropertyDeclarationsData(item, itemsRelationship, data) {
        this.throwIfItemNotHaveRelationship(item, itemsRelationship);

        data.push('public string Id { get; set; } = Guid.NewGuid().ToString();');
    }

    /**
     * @param {Item} item
     * @param {ItemsRelationship} itemsRelationship
     * @param {string[]} data
     */
    aspDv_EntityViewModelsClass_FullPropertyDeclarationsData(item, itemsRelationship, data) {
        this.throwIfItemNotHaveRelationship(item, itemsRelationship);

        const otherItem = this.otherItem(item, itemsRelationship);
        const otherEntityName = otherItem.name;
        const othersPropertyName = this.othersPropertyName(item, itemsRelationship);

        data.push(`[Display(Name = nameof(${othersPropertyName}), ResourceType = typeof(DisplayNames))]
public ICollection<${otherEntityName}LiteViewModel> ${othersPropertyName} { get; set; }`);
    }

    /**
     * @param {Item} item
     * @param {ItemsRelationship} itemsRelationship
     * @param {{key: string, content: string}[]} data
     */
    aspDv_DisplayNamesResx_ItemsData(item, itemsRelationship, data) {
        this.throwIfItemNotHaveRelationship(item, itemsRelationship);

        const othersPropertyName = this.othersPropertyName(item, itemsRelationship);
        const othersDisplayName = _.startCase(othersPropertyName);

        data.push({
            key: othersPropertyName,
            content: `<data name="${othersPropertyName}" xml:space="preserve">
  <value>${othersDisplayName}</value>
</data>`
        });
    }

    /**
     * @param {Item} item
     * @param {ItemsRelationship} itemsRelationship
     * @param {{key: string, content: string}[]} data
     */
    aspDv_DisplayNamesResxDesignerClass_ItemsData(item, itemsRelationship, data) {
        this.throwIfItemNotHaveRelationship(item, itemsRelationship);

        const othersPropertyName = this.othersPropertyName(item, itemsRelationship);
        const othersDisplayName = _.startCase(othersPropertyName);

        data.push({
            key: othersPropertyName,
            content: `/// <summary>
///   Looks up a localized string similar to ${othersDisplayName}.
/// </summary>
public static string ${othersPropertyName} {
    get {
        return ResourceManager.GetString("${othersPropertyName}", resourceCulture);
    }
}`
        });
    }

    /**
     * @param {Item} item
     * @param {OneToManyItemsRelationship} itemsRelationship
     * @param {string[]} data
     */
    aspDv_ProfileClass_CreateEntityMapChainedMethodsData(item, itemsRelationship, data) {
        this.throwIfItemNotHaveRelationship(item, itemsRelationship);

        if (this.hasSortedOtherItemsInItem(item, itemsRelationship)) {
            const entityName = item.name;
            const othersPropertyName = this.othersPropertyName(item, itemsRelationship);

            data.push(`.SwapMemberWithOrderedMember(nameof(${entityName}ViewModel.${othersPropertyName}))`);
        }
    }
}
