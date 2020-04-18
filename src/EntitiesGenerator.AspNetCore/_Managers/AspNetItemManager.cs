using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using MotiNet.Entities;
using System.Collections.Generic;
using System.Threading;

namespace EntitiesGenerator
{
    public class AspNetItemManager<TItem, TModule> : ItemManager<TItem, TModule>
        where TItem : class
        where TModule : class
    {
        private readonly CancellationToken _cancel;

        public AspNetItemManager(
            IItemStore<TItem, TModule> store,
            IItemAccessor<TItem, TModule> accessor,
            IEnumerable<IValidator<TItem, TModule>> validators,
            ILogger<ItemManager<TItem, TModule>> logger,
            ILookupNormalizer<TItem> nameNormalizer,
            IHttpContextAccessor contextAccessor)
            : base(store, accessor, validators, logger, nameNormalizer)
            => _cancel = contextAccessor?.HttpContext?.RequestAborted ?? CancellationToken.None;

        public override CancellationToken CancellationToken => _cancel;
    }
}
