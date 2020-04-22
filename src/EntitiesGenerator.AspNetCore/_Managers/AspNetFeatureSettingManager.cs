using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using MotiNet.Entities;
using System.Collections.Generic;
using System.Threading;

namespace EntitiesGenerator
{
    public class AspNetFeatureSettingManager<TFeatureSetting, TItem> : FeatureSettingManager<TFeatureSetting, TItem>
        where TFeatureSetting : class
        where TItem : class
    {
        private readonly CancellationToken _cancel;

        public AspNetFeatureSettingManager(
            IFeatureSettingStore<TFeatureSetting, TItem> store,
            IFeatureSettingAccessor<TFeatureSetting, TItem> accessor,
            IEnumerable<IValidator<TFeatureSetting, TItem>> validators,
            ILogger<FeatureSettingManager<TFeatureSetting, TItem>> logger,
            IHttpContextAccessor contextAccessor)
            : base(store, accessor, validators, logger)
            => _cancel = contextAccessor?.HttpContext?.RequestAborted ?? CancellationToken.None;

        public override CancellationToken CancellationToken => _cancel;
    }
}
