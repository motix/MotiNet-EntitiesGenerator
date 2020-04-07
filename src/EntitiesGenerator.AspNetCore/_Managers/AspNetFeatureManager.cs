using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using MotiNet.Entities;
using System.Collections.Generic;
using System.Threading;

namespace EntitiesGenerator
{
    public class AspNetFeatureManager<TFeature> : FeatureManager<TFeature> where TFeature : class
    {
        private readonly CancellationToken _cancel;
        
        public AspNetFeatureManager(
            IFeatureStore<TFeature> store,
            IFeatureAccessor<TFeature> featureAccessor,
            IEnumerable<IValidator<TFeature>> featureValidators,
            ILogger<FeatureManager<TFeature>> logger,
            ILookupNormalizer nameNormalizer,
            IHttpContextAccessor contextAccessor)
            : base(store, featureAccessor, featureValidators, logger, nameNormalizer)
            => _cancel = contextAccessor?.HttpContext?.RequestAborted ?? CancellationToken.None;

        public override CancellationToken CancellationToken => _cancel;
    }
}
