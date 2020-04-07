using MotiNet.Entities;

namespace EntitiesGenerator
{
    public interface IItemAccessor<TItem, TModule>
        : IEntityAccessor<TItem>,
          IScopedNameBasedEntityAccessor<TItem, TModule>
        where TItem : class
        where TModule : class
    { }
}
