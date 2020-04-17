using Microsoft.Extensions.Logging;
using MotiNet.Entities;
using System.Collections.Generic;

namespace EntitiesGenerator
{
    public class ItemsRelationshipManager<TItemsRelationship> : ManagerBase<TItemsRelationship>, IItemsRelationshipManager<TItemsRelationship>
        where TItemsRelationship : class
    {
        public ItemsRelationshipManager(
            IItemsRelationshipStore<TItemsRelationship> store,
            IItemsRelationshipAccessor<TItemsRelationship> accessor,
            IEnumerable<IValidator<TItemsRelationship>> validators,
            ILogger<ItemsRelationshipManager<TItemsRelationship>> logger)
            : base(store, accessor, validators, logger)
        { }

        public IEntityStore<TItemsRelationship> EntityStore => Store as IEntityStore<TItemsRelationship>;

        public IEntityAccessor<TItemsRelationship> EntityAccessor => Accessor as IEntityAccessor<TItemsRelationship>;

        public IItemsRelationshipStore<TItemsRelationship> ItemsRelationshipStore => Store as IItemsRelationshipStore<TItemsRelationship>;

        public IItemsRelationshipAccessor<TItemsRelationship> ItemsRelationshipAccessor => Accessor as IItemsRelationshipAccessor<TItemsRelationship>;
    }
}
