import 'lodash';

export default class TypeLists {
    static get featureSettingTypes() {
        return [
            'Entity',
            'ReadableIdEntity',
            'TimeTrackedEntity',
            'OnOffEntity',
            'CodeBasedEntity',
            'NameBasedEntity',
            'ScopedNameBasedEntity',
            'ChildEntity',
            'PreprocessedEntity'
        ];
    }

    static get featureSettingPropertyNames() {
        const names = _.map(TypeLists.featureSettingTypes, value => `${_.lowerFirst(value)}FeatureSetting`);
        return names;
    }

    static get itemsRelationshipTypes() {
        return [
            'OneToMany',
            'ManyToMany'
        ];
    }

    static get itemsRelationshipPropertyNames() {
        const names = _.map(TypeLists.itemsRelationshipTypes, value => `${_.lowerFirst(value)}ItemsRelationship`);
        return names;
    }
}
