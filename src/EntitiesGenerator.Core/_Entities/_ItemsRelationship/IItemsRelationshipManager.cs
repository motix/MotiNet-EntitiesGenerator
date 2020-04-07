using MotiNet.Entities;

namespace EntitiesGenerator
{
    // Entity Features: None

    public interface IItemsRelationshipManager<TItemsRelationship>
        : IEntityManager<TItemsRelationship>
        where TItemsRelationship : class
    { }
}
