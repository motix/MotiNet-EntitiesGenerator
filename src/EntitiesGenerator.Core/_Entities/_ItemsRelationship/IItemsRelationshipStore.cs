using MotiNet.Entities;

namespace EntitiesGenerator
{
    public interface IItemsRelationshipStore<TItemsRelationship, TModule>
        : IEntityStore<TItemsRelationship>,
          IScopedNameBasedEntityStore<TItemsRelationship, TModule>
        where TItemsRelationship : class
        where TModule : class
    { }
}
