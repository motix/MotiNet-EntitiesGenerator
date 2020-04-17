using MotiNet.Entities;

namespace EntitiesGenerator
{
    // Entity Features:
    // - Entity

    public interface IItemsRelationshipManager<TItemsRelationship>
        : IEntityManager<TItemsRelationship>
        where TItemsRelationship : class
    { }
}
