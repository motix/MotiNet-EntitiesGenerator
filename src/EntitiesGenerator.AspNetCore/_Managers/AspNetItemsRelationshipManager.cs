using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using MotiNet.Entities;
using System.Collections.Generic;
using System.Threading;

namespace EntitiesGenerator
{
    public class AspNetItemsRelationshipManager<TItemsRelationship> : ItemsRelationshipManager<TItemsRelationship>
        where TItemsRelationship : class
    {
        private readonly CancellationToken _cancel;

        public AspNetItemsRelationshipManager(
            IItemsRelationshipStore<TItemsRelationship> store,
            IItemsRelationshipAccessor<TItemsRelationship> accessor,
            IEnumerable<IValidator<TItemsRelationship>> validators,
            ILogger<ItemsRelationshipManager<TItemsRelationship>> logger,
            IHttpContextAccessor contextAccessor)
            : base(store, accessor, validators, logger)
            => _cancel = contextAccessor?.HttpContext?.RequestAborted ?? CancellationToken.None;

        public override CancellationToken CancellationToken => _cancel;
    }
}
