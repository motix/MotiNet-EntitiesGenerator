using MotiNet.Entities;

namespace EntitiesGenerator
{
    // Entity Features:
    // - Entity
    // - ScopedNameBasedEntity

    public interface IItemManager<TItem, TModule>
        : IEntityManager<TItem>,
          IScopedNameBasedEntityManager<TItem, TModule>
        where TItem : class
        where TModule : class
    { }
}
