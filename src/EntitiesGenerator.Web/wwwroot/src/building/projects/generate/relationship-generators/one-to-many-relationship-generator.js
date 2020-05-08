import 'lodash';
import pluralize from 'pluralize';

import '../types';

import RelationshipGenerator from './relationship-generator';

export default class OneToManyRelationshipGenerator extends RelationshipGenerator {
    get relationshipType() {
        return 'OneToMany';
    }

    // Relationship settings

    /**
     * @param {Item} item
     * @param {OneToManyItemsRelationship} itemsRelationship
     */
    isParentEntity(item, itemsRelationship) {
        return item === itemsRelationship.item1;
    }

    /**
     * @param {Item} item
     * @param {OneToManyItemsRelationship} itemsRelationship
     */
    isChildEntity(item, itemsRelationship) {
        return item === itemsRelationship.item2;
    }

    /**
     * @param {OneToManyItemsRelationship} itemsRelationship
     */
    parentPropertyName(itemsRelationship) {
        return itemsRelationship.item2PropertyName || itemsRelationship.item1.name;
    }

    /**
     * @param {OneToManyItemsRelationship} itemsRelationship
     */
    childrenPropertyName(itemsRelationship) {
        return itemsRelationship.item1PropertyName || pluralize(itemsRelationship.item2.name);
    }

    // Project specific content

    // SealedModels

    /**
     * @param {Item} item
     * @param {OneToManyItemsRelationship} itemsRelationship
     * @param {string[]} data
     */
    sm_EntityClass_EntityPropertyDeclarationsData(item, itemsRelationship, data) {
        this.throwIfItemNotHaveRelationship(item, itemsRelationship);

        if (this.isParentEntity(item, itemsRelationship)) {
            data.push(`[StringLength(StringLengths.Guid)]
public string Id { get; set; } = Guid.NewGuid().ToString();`);
        }

        if (this.isChildEntity(item, itemsRelationship)) {
            const parentPropertyName = this.parentPropertyName(itemsRelationship);
            const parentNullable = itemsRelationship.parentNullable;
            if (parentNullable) {
                data.push(`[StringLength(StringLengths.Guid)]
public string ${parentPropertyName}Id { get; set; }`);
            } else {
                data.push(`[Required]
[StringLength(StringLengths.Guid)]
public string ${parentPropertyName}Id { get; set; }`);
            }
        }
    }

    /**
     * @param {Item} item
     * @param {OneToManyItemsRelationship} itemsRelationship
     * @param {string[]} data
     */
    sm_EntityClass_RelationshipsPropertyDeclarationsData(item, itemsRelationship, data) {
        this.throwIfItemNotHaveRelationship(item, itemsRelationship);

        const otherItem = this.otherItem(item, itemsRelationship);
        const otherEntityName = otherItem.name;

        if (this.isParentEntity(item, itemsRelationship)) {
            const childrenPropertyName = this.childrenPropertyName(itemsRelationship);
            data.push(`public ICollection<${otherEntityName}> ${childrenPropertyName} { get; set; }`);
        }

        if (this.isChildEntity(item, itemsRelationship)) {
            const parentPropertyName = this.parentPropertyName(itemsRelationship);
            data.push(`public ${otherEntityName} ${parentPropertyName} { get; set; }`);
        }
    }

    /**
     * @param {Item} item
     * @param {OneToManyItemsRelationship} itemsRelationship
     * @param {string[]} data
     */
    sm_EntityClass_CustomizationFieldDeclarationsData(item, itemsRelationship, data) {
        this.throwIfItemNotHaveRelationship(item, itemsRelationship);

        if (this.isParentEntity(item, itemsRelationship) && itemsRelationship.hasSortedChildrenInParent) {
            const criteriaPropertyName = itemsRelationship.sortedChildrenInParentCriteriaPropertyName;

            if (criteriaPropertyName === null) {
                const child = this.otherItem(item, itemsRelationship);
                const childEntityName = child.name;
                const childrenPropertyName = this.childrenPropertyName(itemsRelationship);

                data.push(`private readonly Func<IEnumerable<${childEntityName}>, IEnumerable<${childEntityName}>> _ordered${childrenPropertyName}Method;`);
            }
        }
    }

    /**
     * @param {Item} item
     * @param {OneToManyItemsRelationship} itemsRelationship
     * @param {string[]} data
     */
    sm_EntityClass_CustomizationPropertyDeclarationsData(item, itemsRelationship, data) {
        this.throwIfItemNotHaveRelationship(item, itemsRelationship);

        if (this.isParentEntity(item, itemsRelationship) && itemsRelationship.hasSortedChildrenInParent) {
            const child = this.otherItem(item, itemsRelationship);
            const childEntityName = child.name;
            const childrenPropertyName = this.childrenPropertyName(itemsRelationship);
            const criteriaPropertyName = itemsRelationship.sortedChildrenInParentCriteriaPropertyName;

            if (criteriaPropertyName === null) {
                data.push(`public IEnumerable<${childEntityName}> Ordered${childrenPropertyName} => _ordered${childrenPropertyName}Method == null ?
    throw new NotImplementedException() : _ordered${childrenPropertyName}Method.Invoke(${childrenPropertyName});`);
            } else {
                data.push(`public IEnumerable<${childEntityName}> Ordered${childrenPropertyName} => ${childrenPropertyName}?.OrderBy(x => x.${criteriaPropertyName});`);
            }
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

        if (this.isParentEntity(item, itemsRelationship)) {
            if (itemsRelationship.hasSortedChildrenInParent) {
                const childrenPropertyName = this.childrenPropertyName(itemsRelationship);
                data.push(`// Ignore ordered children
builder.Ignore(x => x.Ordered${childrenPropertyName});`);
            }
        }

        if (this.isChildEntity(item, itemsRelationship)) {
            if (itemsRelationship.deleteRestrict) {
                const parentPropertyName = this.parentPropertyName(itemsRelationship);
                const childrenPropertyName = this.childrenPropertyName(itemsRelationship);

                data.push(`// Restrict delete
builder.HasOne(x => x.${parentPropertyName})
       .WithMany(x => x.${childrenPropertyName})
       .OnDelete(DeleteBehavior.Restrict);`);
            }
        }
    }

    // AspNetCore.Mvc.DefaultViewModels

    /**
     * @param {Item} item
     * @param {OneToManyItemsRelationship} itemsRelationship
     * @param {string[]} data
     */
    aspDv_EntityViewModelsClass_BasePropertyDeclarationsData(item, itemsRelationship, data) {
        this.throwIfItemNotHaveRelationship(item, itemsRelationship);

        if (this.isParentEntity(item, itemsRelationship)) {
            data.push('public string Id { get; set; } = Guid.NewGuid().ToString();');
        }

        if (this.isChildEntity(item, itemsRelationship)) {
            const parentPropertyName = this.parentPropertyName(itemsRelationship);
            const parentNullable = itemsRelationship.parentNullable;
            if (parentNullable) {
                data.push(`[Display(Name = "${parentPropertyName}", ResourceType = typeof(DisplayNames))]
public string ${parentPropertyName}Id { get; set; }`);
            } else {
                data.push(`[LocalizedRequired]
[Display(Name = "${parentPropertyName}", ResourceType = typeof(DisplayNames))]
public string ${parentPropertyName}Id { get; set; }`);
            }
        }
    }

    /**
     * @param {Item} item
     * @param {OneToManyItemsRelationship} itemsRelationship
     * @param {string[]} data
     */
    aspDv_EntityViewModelsClass_FullPropertyDeclarationsData(item, itemsRelationship, data) {
        this.throwIfItemNotHaveRelationship(item, itemsRelationship);

        const otherItem = this.otherItem(item, itemsRelationship);
        const otherEntityName = otherItem.name;

        if (this.isParentEntity(item, itemsRelationship)) {
            const childrenPropertyName = this.childrenPropertyName(itemsRelationship);

            data.push(`[Display(Name = nameof(${childrenPropertyName}), ResourceType = typeof(DisplayNames))]
public ICollection<${otherEntityName}LiteViewModel> ${childrenPropertyName} { get; set; }`);

            if (itemsRelationship.hasFullChildrenInParentViewModel) {
                data.push(`public ICollection<${otherEntityName}ViewModel> Full${childrenPropertyName} { get; set; }`);
            }
        }

        if (this.isChildEntity(item, itemsRelationship)) {
            const parentPropertyName = this.parentPropertyName(itemsRelationship);

            data.push(`[Display(Name = nameof(${parentPropertyName}), ResourceType = typeof(DisplayNames))]
public ${otherEntityName}LiteViewModel ${parentPropertyName} { get; set; }`);

            if (itemsRelationship.hasFullParentInChildrenViewModel) {
                data.push(`public ${otherEntityName}ViewModel Full${parentPropertyName} { get; set; }`);
            }
        }
    }

    /**
     * @param {Item} item
     * @param {OneToManyItemsRelationship} itemsRelationship
     * @param {{key: string, content: string}[]} data
     */
    aspDv_DisplayNamesResx_ItemsData(item, itemsRelationship, data) {
        this.throwIfItemNotHaveRelationship(item, itemsRelationship);

        if (this.isParentEntity(item, itemsRelationship)) {
            const childrenPropertyName = this.childrenPropertyName(itemsRelationship);
            const childrenDisplayName = _.startCase(childrenPropertyName);

            data.push({
                key: childrenPropertyName,
                content: `<data name="${childrenPropertyName}" xml:space="preserve">
  <value>${childrenDisplayName}</value>
</data>`
            });
        }

        if (this.isChildEntity(item, itemsRelationship)) {
            const parentPropertyName = this.parentPropertyName(itemsRelationship);
            const parentDisplayName = _.startCase(parentPropertyName);

            data.push({
                key: parentPropertyName,
                content: `<data name="${parentPropertyName}" xml:space="preserve">
  <value>${parentDisplayName}</value>
</data>`
            });
        }
    }

    /**
     * @param {Item} item
     * @param {OneToManyItemsRelationship} itemsRelationship
     * @param {{key: string, content: string}[]} data
     */
    aspDv_DisplayNamesResxDesignerClass_ItemsData(item, itemsRelationship, data) {
        this.throwIfItemNotHaveRelationship(item, itemsRelationship);

        if (this.isParentEntity(item, itemsRelationship)) {
            const childrenPropertyName = this.childrenPropertyName(itemsRelationship);
            const childrenDisplayName = _.startCase(childrenPropertyName);

            data.push({
                key: childrenPropertyName,
                content: `/// <summary>
///   Looks up a localized string similar to ${childrenDisplayName}.
/// </summary>
public static string ${childrenPropertyName} {
    get {
        return ResourceManager.GetString("${childrenPropertyName}", resourceCulture);
    }
}`
            });
        }

        if (this.isChildEntity(item, itemsRelationship)) {
            const parentPropertyName = this.parentPropertyName(itemsRelationship);
            const parentDisplayName = _.startCase(parentPropertyName);

            data.push({
                key: parentPropertyName,
                content: `/// <summary>
///   Looks up a localized string similar to ${parentDisplayName}.
/// </summary>
public static string ${parentPropertyName} {
    get {
        return ResourceManager.GetString("${parentPropertyName}", resourceCulture);
    }
}`
            });
        }
    }

    /**
     * @param {Item} item
     * @param {OneToManyItemsRelationship} itemsRelationship
     * @param {string[]} data
     */
    aspDv_ProfileClass_CreateEntityMapChainedMethodsData(item, itemsRelationship, data) {
        this.throwIfItemNotHaveRelationship(item, itemsRelationship);

        if (this.isParentEntity(item, itemsRelationship) && itemsRelationship.hasSortedChildrenInParent) {
            const entityName = item.name;
            const childrenPropertyName = this.childrenPropertyName(itemsRelationship);

            data.push(`.SwapMemberWithOrderedMember(nameof(${entityName}ViewModel.${childrenPropertyName}))`);
        }
    }
}
