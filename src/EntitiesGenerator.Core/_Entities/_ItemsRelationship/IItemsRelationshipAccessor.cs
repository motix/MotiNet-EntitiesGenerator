using MotiNet.Entities;

namespace EntitiesGenerator
{
    public interface IItemsRelationshipAccessor<TItemsRelationship, TModule>
        : IEntityAccessor<TItemsRelationship>,
          IScopedNameBasedEntityAccessor<TItemsRelationship, TModule>
        where TItemsRelationship : class
        where TModule : class
    { }
}
