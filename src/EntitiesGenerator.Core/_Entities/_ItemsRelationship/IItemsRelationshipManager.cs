using MotiNet.Entities;

namespace EntitiesGenerator
{
    // Entity Features:
    // - Entity
    // - ScopedNameBasedEntity

    public interface IItemsRelationshipManager<TItemsRelationship, TModule>
        : IEntityManager<TItemsRelationship>,
          IScopedNameBasedEntityManager<TItemsRelationship, TModule>
        where TItemsRelationship : class
        where TModule : class
    { }
}
