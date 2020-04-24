import '../types';
import 'lodash';

export default class RelationshipGenerator {
    get relationshipType() {
        return null;
    }

    /**
     * @param {ItemsRelationship} itemsRelationship
     */
    relationshipMatchesGenerator(itemsRelationship) {
        return itemsRelationship.type === this.relationshipType;
    }

    /**
     * @param {Item} item
     * @param {ItemsRelationship} itemsRelationship
     */
    itemHasRelationship(item, itemsRelationship) {
        return itemsRelationship.type === this.relationshipType && (itemsRelationship.item1 === item || itemsRelationship.item2 === item);
    }

    /**
     * @param {ItemsRelationship} itemsRelationship
     */
    throwIfRelationshipNotMatchGenerator(itemsRelationship) {
        if (!this.relationshipMatchesGenerator(itemsRelationship)) {
            const error = new RelationshipNotMatchGeneratorError(itemsRelationship, this);
            console.error(error);
            throw error.message;
        }
    }

    /**
     * @param {Item} item
     * @param {ItemsRelationship} itemsRelationship
     */
    throwIfItemNotHaveRelationship(item, itemsRelationship) {
        if (!this.itemHasRelationship(item, itemsRelationship)) {
            const error = new ItemNotHasRelationshipError(item, itemsRelationship, this);
            console.error(error);
            throw error.message;
        }
    }

    /**
     * @param {Item} item
     * @param {ItemsRelationship} itemsRelationship
     */
    otherItem(item, itemsRelationship) {
        return item === itemsRelationship.item1 ? itemsRelationship.item2 : itemsRelationship.item1;
    }

    /**
     * @param {Item} item
     * @param {ItemsRelationship} itemsRelationship
     */
    itemPropertyName(item, itemsRelationship) {
        return item === itemsRelationship.item1 ? itemsRelationship.item1PropertyName : itemsRelationship.item2PropertyName;
    }

    // Project specific structure

    // EntityFrameworkCore

    /**
     * @param {ItemsRelationship} itemsRelationship
     * @param {StructureNode} folder
     */
    ef_ProjectFolder(itemsRelationship, folder) {
        this.throwIfRelationshipNotMatchGenerator(itemsRelationship);
    }

    // EntityFrameworkCore.SealedModels

    /**
     * @param {ItemsRelationship} itemsRelationship
     * @param {StructureNode} folder
     */
    efSm_ProjectFolder(itemsRelationship, folder) {
        this.throwIfRelationshipNotMatchGenerator(itemsRelationship);
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
    }

    /**
     * @param {Item} item
     * @param {ItemsRelationship} itemsRelationship
     * @param {string[]} data
     */
    sm_EntityClass_RelationshipsPropertyDeclarationsData(item, itemsRelationship, data) {
        this.throwIfItemNotHaveRelationship(item, itemsRelationship);
    }

    /**
     * @param {Item} item
     * @param {ItemsRelationship} itemsRelationship
     * @param {string[]} data
     */
    sm_EntityClass_CustomizationFieldDeclarationsData(item, itemsRelationship, data) {
        this.throwIfItemNotHaveRelationship(item, itemsRelationship);
    }

    /**
     * @param {Item} item
     * @param {ItemsRelationship} itemsRelationship
     * @param {string[]} data
     */
    sm_EntityClass_CustomizationPropertyDeclarationsData(item, itemsRelationship, data) {
        this.throwIfItemNotHaveRelationship(item, itemsRelationship);
    }

    // EntityFrameworkCore

    /**
     * @param {Item} item
     * @param {ItemsRelationship} itemsRelationship
     * @param {string[]} data
     */
    ef_DbContextClass_PropertyDeclarationsData(item, itemsRelationship, data) {
        this.throwIfItemNotHaveRelationship(item, itemsRelationship);
    }

    /**
     * @param {Item} item
     * @param {ItemsRelationship} itemsRelationship
     * @param {string[]} data
     */
    ef_DbContextClass_ConfigureEntityRegistrationsData(item, itemsRelationship, data) {
        this.throwIfItemNotHaveRelationship(item, itemsRelationship);
    }

    // EntityFrameworkCore.SealedModels

    /**
     * @param {Item} item
     * @param {ItemsRelationship} itemsRelationship
     * @param {string[]} data
     */
    efSm_DbContextClass_EntityConfigurationsData(item, itemsRelationship, data) {
        this.throwIfItemNotHaveRelationship(item, itemsRelationship);
    }

    // AspNetCore.Mvc.DefaultViewModels

    /**
     * @param {Item} item
     * @param {ItemsRelationship} itemsRelationship
     * @param {string[]} data
     */
    aspDv_EntityViewModelsClass_BasePropertyDeclarationsData(item, itemsRelationship, data) {
        this.throwIfItemNotHaveRelationship(item, itemsRelationship);
    }

    /**
     * @param {Item} item
     * @param {ItemsRelationship} itemsRelationship
     * @param {string[]} data
     */
    aspDv_EntityViewModelsClass_FullPropertyDeclarationsData(item, itemsRelationship, data) {
        this.throwIfItemNotHaveRelationship(item, itemsRelationship);
    }

    /**
     * @param {Item} item
     * @param {ItemsRelationship} itemsRelationship
     * @param {{key: string, content: string}[]} data
     */
    aspDv_DisplayNamesResx_ItemsData(item, itemsRelationship, data) {
        this.throwIfItemNotHaveRelationship(item, itemsRelationship);
    }

    /**
     * @param {Item} item
     * @param {ItemsRelationship} itemsRelationship
     * @param {{key: string, content: string}[]} data
     */
    aspDv_DisplayNamesResxDesignerClass_ItemsData(item, itemsRelationship, data) {
        this.throwIfItemNotHaveRelationship(item, itemsRelationship);
    }

    /**
     * @param {Item} item
     * @param {ItemsRelationship} itemsRelationship
     * @param {string[]} data
     */
    aspDv_ProfileClass_CreateEntityMapChainedMethodsData(item, itemsRelationship, data) {
        this.throwIfItemNotHaveRelationship(item, itemsRelationship);
    }
}

class RelationshipNotMatchGeneratorError {
    /**
     * @param {ItemsRelationship} itemsRelationship
     * @param {RelationshipGenerator} relationshipGenerator
     */
    constructor(itemsRelationship, relationshipGenerator) {
        this.itemsRelationship = itemsRelationship;
        this.relationshipGenerator = relationshipGenerator;
        this.relationshipType = itemsRelationship.type;
        this.generatorType = relationshipGenerator.relationshipType;
        this.message = `Relationship ${relationshipty} does not match generator ${this.generatorType}.`;
    }
}

class ItemNotHasRelationshipError {
    /**
     * @param {Item} item
     * @param {ItemsRelationship} itemsRelationship
     * @param {RelationshipGenerator} relationshipGenerator
     */
    constructor(item, itemsRelationship, relationshipGenerator) {
        this.item = item;
        this.itemsRelationship = itemsRelationship;
        this.relationshipGenerator = relationshipGenerator;
        this.itemName = item.name;
        this.relationshipType = relationshipGenerator.relationshipType;
        this.message = `Item ${this.itemName} does not have relationship ${this.relationshipType}. This operation cannot perform if this item does not have the relationship.`;
    }
}
