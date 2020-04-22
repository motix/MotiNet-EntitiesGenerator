using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using MotiNet.Entities;
using System.Collections.Generic;
using System.Threading;

namespace EntitiesGenerator
{
    public class AspNetItemsRelationshipManager<TItemsRelationship, TModule> : ItemsRelationshipManager<TItemsRelationship, TModule>
        where TItemsRelationship : class
        where TModule : class
    {
        private readonly CancellationToken _cancel;

        public AspNetItemsRelationshipManager(
            IItemsRelationshipStore<TItemsRelationship, TModule> store,
            IItemsRelationshipAccessor<TItemsRelationship, TModule> accessor,
            IEnumerable<IValidator<TItemsRelationship, TModule>> validators,
            ILogger<ItemsRelationshipManager<TItemsRelationship, TModule>> logger,
            IHttpContextAccessor contextAccessor)
            : base(store, accessor, validators, logger)
            => _cancel = contextAccessor?.HttpContext?.RequestAborted ?? CancellationToken.None;

        public override CancellationToken CancellationToken => _cancel;
    }
}
