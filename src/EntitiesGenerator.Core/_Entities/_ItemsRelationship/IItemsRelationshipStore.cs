using MotiNet.Entities;

namespace EntitiesGenerator
{
    public interface IItemsRelationshipStore<TItemsRelationship, TModule>
        : IEntityStore<TItemsRelationship>,
          IChildEntityStore<TItemsRelationship, TModule>
        where TItemsRelationship : class
        where TModule : class
    { }
}
