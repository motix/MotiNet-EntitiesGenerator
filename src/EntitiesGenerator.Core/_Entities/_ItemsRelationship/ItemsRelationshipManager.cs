using Microsoft.Extensions.Logging;
using MotiNet.Entities;
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
            ILogger<ItemsRelationshipManager<TItemsRelationship, TModule>> logger)
            : base(store, accessor, validators, logger)
        { }

        public IEntityStore<TItemsRelationship> EntityStore => Store as IEntityStore<TItemsRelationship>;

        public IEntityAccessor<TItemsRelationship> EntityAccessor => Accessor as IEntityAccessor<TItemsRelationship>;

        public IChildEntityStore<TItemsRelationship, TModule> ChildEntityStore => Store as IChildEntityStore<TItemsRelationship, TModule>;

        public IChildEntityAccessor<TItemsRelationship, TModule> ChildEntityAccessor => Accessor as IChildEntityAccessor<TItemsRelationship, TModule>;

        public IItemsRelationshipStore<TItemsRelationship, TModule> ItemsRelationshipStore => Store as IItemsRelationshipStore<TItemsRelationship, TModule>;

        public IItemsRelationshipAccessor<TItemsRelationship, TModule> ItemsRelationshipAccessor => Accessor as IItemsRelationshipAccessor<TItemsRelationship, TModule>;
    }
}
