using Microsoft.Extensions.Logging;
using MotiNet.Entities;
using System;
using System.Collections.Generic;

namespace EntitiesGenerator
{
    public class FeatureManager<TFeature> : ManagerBase<TFeature>, IFeatureManager<TFeature>
        where TFeature : class
    {
        public FeatureManager(
            IFeatureStore<TFeature> store,
            IFeatureAccessor<TFeature> featureAccessor,
            IEnumerable<IValidator<TFeature>> featureValidators,
            ILogger<FeatureManager<TFeature>> logger,
            ILookupNormalizer nameNormalizer)
            : base(store, featureAccessor, featureValidators, logger)
            => NameNormalizer = nameNormalizer ?? throw new ArgumentNullException(nameof(nameNormalizer));

        public IEntityStore<TFeature> EntityStore => Store as IEntityStore<TFeature>;

        public IEntityAccessor<TFeature> EntityAccessor => Accessor as IEntityAccessor<TFeature>;

        public INameBasedEntityStore<TFeature> NameBasedEntityStore => Store as INameBasedEntityStore<TFeature>;

        public INameBasedEntityAccessor<TFeature> NameBasedEntityAccessor => Accessor as INameBasedEntityAccessor<TFeature>;

        public IReadableIdEntityAccessor<TFeature> ReadableIdEntityAccessor => Accessor as IReadableIdEntityAccessor<TFeature>;

        public IOnOffEntityStore<TFeature> OnOffEntityStore => Store as IOnOffEntityStore<TFeature>;

        public IFeatureStore<TFeature> FeatureStore => Store as IFeatureStore<TFeature>;

        public IFeatureAccessor<TFeature> FeatureAccessor => Accessor as IFeatureAccessor<TFeature>;

        public ILookupNormalizer NameNormalizer { get; }
    }
}
