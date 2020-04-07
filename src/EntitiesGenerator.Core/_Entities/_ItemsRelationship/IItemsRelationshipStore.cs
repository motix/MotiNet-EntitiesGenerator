using MotiNet.Entities;

namespace EntitiesGenerator
{
    public interface IItemsRelationshipStore<TItemsRelationship>
        : IEntityStore<TItemsRelationship>
        where TItemsRelationship : class
    { }
}
