using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using MotiNet.Entities;
using System.Collections.Generic;
using System.Threading;

namespace EntitiesGenerator
{
    public class AspNetFeatureSettingManager<TFeatureSetting> : FeatureSettingManager<TFeatureSetting> where TFeatureSetting : class
    {
        private readonly CancellationToken _cancel;
        
        public AspNetFeatureSettingManager(
            IFeatureSettingStore<TFeatureSetting> store,
            IFeatureSettingAccessor<TFeatureSetting> featureSettingAccessor,
            IEnumerable<IValidator<TFeatureSetting>> featureSettingValidators,
            ILogger<FeatureSettingManager<TFeatureSetting>> logger,
            IHttpContextAccessor contextAccessor)
            : base(store, featureSettingAccessor, featureSettingValidators, logger)
            => _cancel = contextAccessor?.HttpContext?.RequestAborted ?? CancellationToken.None;

        public override CancellationToken CancellationToken => _cancel;
    }
}
