using MotiNet.Entities;

namespace EntitiesGenerator
{
    public interface IItemsRelationshipAccessor<TItemsRelationship>
        : IEntityAccessor<TItemsRelationship>
        where TItemsRelationship : class
    { }
}
