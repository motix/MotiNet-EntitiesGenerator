using MotiNet.Entities;

namespace EntitiesGenerator
{
    public interface IItemStore<TItem, TModule>
        : IEntityStore<TItem>,
          IScopedNameBasedEntityStore<TItem, TModule>
        where TItem : class
        where TModule : class
    { }
}
