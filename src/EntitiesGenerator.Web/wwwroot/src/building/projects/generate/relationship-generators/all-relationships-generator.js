import RelationshipGenerator from './relationship-generator';
import OneToManyRelationshipGenerator from './one-to-many-relationship-generator';
import ManyToManyRelationshipGenerator from './many-to-many-relationship-generator';

export default class AllRelationshipsGenerator {
    constructor() {
        this.oneToManyRelationshipGenerator = new OneToManyRelationshipGenerator();
        this.manyToManyRelationshipGenerator = new ManyToManyRelationshipGenerator();
    }

    /**
     * @param {Item} item
     * @param {ItemsRelationship} relationship
     */
    itemHasRelationship(item, relationship) {
        return relationship.item1 === item || relationship.item2 === item;
    }

    /**
     * @param {Item} item
     * @param {ItemsRelationship} relationship
     */
    findSubEntity(item, relationship) {
        if (item === relationship.item1) {
            if (!_.find(item.module.items, value => value === relationship.item2)) {
                return relationship.item2;
            }
        } else {
            if (!_.find(item.module.items, value => value === relationship.item1)) {
                return relationship.item1;
            }
        }

        return null;
    }

    /**
     * @param {ItemsRelationship} relationship
     * @returns {RelationshipGenerator}
     */
    getGenerator(relationship) {
        return this[`${_.lowerFirst(relationship.type)}RelationshipGenerator`];
    }
}
