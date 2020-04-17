using Microsoft.Extensions.Logging;
using MotiNet.Entities;
using System;
using System.Collections.Generic;

namespace EntitiesGenerator
{
    public class ItemManager<TItem, TModule> : ManagerBase<TItem, TModule>, IItemManager<TItem, TModule>
        where TItem : class
        where TModule : class
    {
        public ItemManager(
            IItemStore<TItem, TModule> store,
            IItemAccessor<TItem, TModule> accessor,
            IEnumerable<IValidator<TItem, TModule>> validators,
            ILogger<ItemManager<TItem, TModule>> logger,
            ILookupNormalizer<TItem> nameNormalizer)
            : base(store, accessor, validators, logger)
        {
            NameNormalizer = nameNormalizer ?? throw new ArgumentNullException(nameof(nameNormalizer));
        }

        public IEntityStore<TItem> EntityStore => Store as IEntityStore<TItem>;

        public IEntityAccessor<TItem> EntityAccessor => Accessor as IEntityAccessor<TItem>;

        public IScopedNameBasedEntityStore<TItem, TModule> ScopedNameBasedEntityStore => Store as IScopedNameBasedEntityStore<TItem, TModule>;

        public IScopedNameBasedEntityAccessor<TItem, TModule> ScopedNameBasedEntityAccessor => Accessor as IScopedNameBasedEntityAccessor<TItem, TModule>;

        public IItemStore<TItem, TModule> ItemStore => Store as IItemStore<TItem, TModule>;

        public IItemAccessor<TItem, TModule> ItemAccessor => Accessor as IItemAccessor<TItem, TModule>;

        public ILookupNormalizer NameNormalizer { get; }
    }
}
