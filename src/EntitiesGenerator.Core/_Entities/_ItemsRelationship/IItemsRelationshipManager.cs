using MotiNet.Entities;

namespace EntitiesGenerator
{
    // Entity Features:
    // - Entity
    // - ChildEntity

    public interface IItemsRelationshipManager<TItemsRelationship, TModule>
        : IEntityManager<TItemsRelationship>,
          IChildEntityManager<TItemsRelationship, TModule>
        where TItemsRelationship : class
        where TModule : class
    { }
}
