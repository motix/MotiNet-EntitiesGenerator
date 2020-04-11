using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using MotiNet.Entities;
using System.Collections.Generic;
using System.Threading;

namespace EntitiesGenerator
{
    public class AspNetItemsRelationshipManager<TItemsRelationship> : ItemsRelationshipManager<TItemsRelationship> where TItemsRelationship : class
    {
        private readonly CancellationToken _cancel;

        public AspNetItemsRelationshipManager(
            IItemsRelationshipStore<TItemsRelationship> store,
            IItemsRelationshipAccessor<TItemsRelationship> itemsRelationshipAccessor,
            IEnumerable<IValidator<TItemsRelationship>> itemsRelationshipValidators,
            ILogger<ItemsRelationshipManager<TItemsRelationship>> logger,
            IHttpContextAccessor contextAccessor)
            : base(store, itemsRelationshipAccessor, itemsRelationshipValidators, logger)
            => _cancel = contextAccessor?.HttpContext?.RequestAborted ?? CancellationToken.None;

        public override CancellationToken CancellationToken => _cancel;
    }
}
