using Microsoft.Extensions.Logging;
using MotiNet.Entities;
using System.Collections.Generic;

namespace EntitiesGenerator
{
    public class FeatureSettingManager<TFeatureSetting> : ManagerBase<TFeatureSetting>, IFeatureSettingManager<TFeatureSetting>
        where TFeatureSetting : class
    {
        public FeatureSettingManager(
            IFeatureSettingStore<TFeatureSetting> store,
            IFeatureSettingAccessor<TFeatureSetting> accessor,
            IEnumerable<IValidator<TFeatureSetting>> validators,
            ILogger<FeatureSettingManager<TFeatureSetting>> logger)
            : base(store, accessor, validators, logger)
        { }

        public IEntityStore<TFeatureSetting> EntityStore => Store as IEntityStore<TFeatureSetting>;

        public IEntityAccessor<TFeatureSetting> EntityAccessor => Accessor as IEntityAccessor<TFeatureSetting>;

        public IFeatureSettingStore<TFeatureSetting> FeatureSettingStore => Store as IFeatureSettingStore<TFeatureSetting>;

        public IFeatureSettingAccessor<TFeatureSetting> FeatureSettingAccessor => Accessor as IFeatureSettingAccessor<TFeatureSetting>;
    }
}
