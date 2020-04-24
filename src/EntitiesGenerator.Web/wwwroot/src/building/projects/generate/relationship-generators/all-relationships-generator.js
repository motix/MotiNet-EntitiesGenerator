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
     * @param {ItemsRelationship} relationship
     * @returns {RelationshipGenerator}
     */
    getGenerator(relationship) {
        return this[`${_.lowerFirst(relationship.type)}RelationshipGenerator`];
    }
}
