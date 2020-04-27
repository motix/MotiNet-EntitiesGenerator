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
                modelOnly: item.modelOnly,
                lineBreak: item.parameterListLineBreak
            }, {
                item: item,
                name: this.parentName(item),
                modelOnly: item.modelOnly,
                lineBreak: false,
                isSubEntity: true
            }];
    }

    /**
     * @param {Item} item
     * @param {Item} otherItem
     */
    otherItemHasFeature(item, otherItem) {
        return otherItem !== item && this.itemHasFeature(otherItem) && this.parentName(otherItem) === item.name;
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
     * @returns {OneToManyItemsRelationship}
     */
    itemsRelationship(item) {
        for (const relationship of item.module.itemsRelationships) {
            if (relationship.type === 'OneToMany' && relationship.item1.name === this.parentName(item) && relationship.item2 === item) {
                return relationship;
            }
        }

        return null;
    }

    /**
     * @param {Item} item
     */
    parentPropertyName(item) {
        const itemsRelationship = this.itemsRelationship(item);

        if (itemsRelationship === null) {
            return this.parentName(item);
        }

        return itemsRelationship.item2PropertyName || itemsRelationship.item1.name;
    }

    /**
     * @param {Item} item
     */
    childrenPropertyName(item) {
        const itemsRelationship = this.itemsRelationship(item);

        if (itemsRelationship === null) {
            return pluralize(item.name);
        }

        return itemsRelationship.item1PropertyName || pluralize(itemsRelationship.item2.name);
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
        data.push(`IChildEntityManager${entityGenericTypeParameters}`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_EntityStoreInterface_StoreInterfacesData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        const entityGenericTypeParameters = this.itemGenericTypeParameters(item);
        data.push(`IChildEntityStore${entityGenericTypeParameters}`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_EntityAccessorInterface_AccessorInterfacesData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        const entityGenericTypeParameters = this.itemGenericTypeParameters(item);
        data.push(`IChildEntityAccessor${entityGenericTypeParameters}`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_EntityManagerClass_PropertiesDeclarations1Data(item, data) {
        this.throwIfItemNotHaveFeature(item);

        const entityGenericTypeParameters = this.itemGenericTypeParameters(item);

        data.push(
            `public IChildEntityStore${entityGenericTypeParameters} ChildEntityStore => Store as IChildEntityStore${entityGenericTypeParameters};`,
            `public IChildEntityAccessor${entityGenericTypeParameters} ChildEntityAccessor => Accessor as IChildEntityAccessor${entityGenericTypeParameters};`);
    }

    // SealedModels

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    sm_EntityClass_EntityInterfacesData_FromOthers(item, data) {
        for (const otherItem of item.module.items) {
            if (this.otherItemHasFeature(item, otherItem)) {
                data.push('IIdWiseEntity<string>');
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
     * @param {string[]} data
     */
    sm_EntityAccessorClass_AccessorMethodsData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        const entityName = item.name;
        const lowerFirstEntityName = _.lowerFirst(entityName);
        const parentName = this.parentName(item);
        const parentPropertyName = this.parentPropertyName(item);
        const lowerFirstParentPropertyName = _.lowerFirst(parentPropertyName);

        data.push(
            `public object GetParentId(${entityName} ${lowerFirstEntityName}) => ${lowerFirstEntityName}.${parentPropertyName}Id;`,
            `public void SetParentId(${entityName} ${lowerFirstEntityName}, object ${lowerFirstParentPropertyName}Id) => ${lowerFirstEntityName}.${parentPropertyName}Id = (string)${lowerFirstParentPropertyName}Id;`,
            `public ${parentName} GetParent(${entityName} ${lowerFirstEntityName}) => ${lowerFirstEntityName}.${parentPropertyName};`,
            `public void SetParent(${entityName} ${lowerFirstEntityName}, ${parentName} ${lowerFirstParentPropertyName}) => ${lowerFirstEntityName}.${parentPropertyName} = ${lowerFirstParentPropertyName};`);
    }

    // EntityFrameworkCore.SealedModels

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    efSm_EntityStoreClass_StoreInterfacesData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        const entityName = item.name;
        const parentName = this.parentName(item);

        data.push(`IChildEntityStoreMarker<${entityName}, ${parentName}, TDbContext>`);
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
}
