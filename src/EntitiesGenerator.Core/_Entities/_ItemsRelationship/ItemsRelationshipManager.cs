using Microsoft.Extensions.Logging;
using MotiNet.Entities;
using System;
using System.Collections.Generic;

namespace EntitiesGenerator
{
    public class ItemsRelationshipManager<TItemsRelationship, TModule> : ManagerBase<TItemsRelationship, TModule>, IItemsRelationshipManager<TItemsRelationship, TModule>
        where TItemsRelationship : class
        where TModule : class
    {
        public ItemsRelationshipManager(
            IItemsRelationshipStore<TItemsRelationship, TModule> store,
            IItemsRelationshipAccessor<TItemsRelationship, TModule> accessor,
            IEnumerable<IValidator<TItemsRelationship, TModule>> validators,
            ILogger<ItemsRelationshipManager<TItemsRelationship, TModule>> logger,
            ILookupNormalizer<TItemsRelationship> nameNormalizer)
            : base(store, accessor, validators, logger)
        {
            NameNormalizer = nameNormalizer ?? throw new ArgumentNullException(nameof(nameNormalizer));
        }

        public IEntityStore<TItemsRelationship> EntityStore => Store as IEntityStore<TItemsRelationship>;

        public IEntityAccessor<TItemsRelationship> EntityAccessor => Accessor as IEntityAccessor<TItemsRelationship>;

        public IScopedNameBasedEntityStore<TItemsRelationship, TModule> ScopedNameBasedEntityStore => Store as IScopedNameBasedEntityStore<TItemsRelationship, TModule>;

        public IScopedNameBasedEntityAccessor<TItemsRelationship, TModule> ScopedNameBasedEntityAccessor => Accessor as IScopedNameBasedEntityAccessor<TItemsRelationship, TModule>;

        public IItemsRelationshipStore<TItemsRelationship, TModule> ItemsRelationshipStore => Store as IItemsRelationshipStore<TItemsRelationship, TModule>;

        public IItemsRelationshipAccessor<TItemsRelationship, TModule> ItemsRelationshipAccessor => Accessor as IItemsRelationshipAccessor<TItemsRelationship, TModule>;

        public ILookupNormalizer NameNormalizer { get; }
    }
}
