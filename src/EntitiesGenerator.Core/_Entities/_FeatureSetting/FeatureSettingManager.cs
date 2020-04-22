using Microsoft.Extensions.Logging;
using MotiNet.Entities;
using System.Collections.Generic;

namespace EntitiesGenerator
{
    public class FeatureSettingManager<TFeatureSetting, TItem> : ManagerBase<TFeatureSetting, TItem>, IFeatureSettingManager<TFeatureSetting, TItem>
        where TFeatureSetting : class
        where TItem : class
    {
        public FeatureSettingManager(
            IFeatureSettingStore<TFeatureSetting, TItem> store,
            IFeatureSettingAccessor<TFeatureSetting, TItem> accessor,
            IEnumerable<IValidator<TFeatureSetting, TItem>> validators,
            ILogger<FeatureSettingManager<TFeatureSetting, TItem>> logger)
            : base(store, accessor, validators, logger)
        { }

        public IEntityStore<TFeatureSetting> EntityStore => Store as IEntityStore<TFeatureSetting>;

        public IEntityAccessor<TFeatureSetting> EntityAccessor => Accessor as IEntityAccessor<TFeatureSetting>;

        public IChildEntityStore<TFeatureSetting, TItem> ChildEntityStore => Store as IChildEntityStore<TFeatureSetting, TItem>;

        public IChildEntityAccessor<TFeatureSetting, TItem> ChildEntityAccessor => Accessor as IChildEntityAccessor<TFeatureSetting, TItem>;

        public IFeatureSettingStore<TFeatureSetting, TItem> FeatureSettingStore => Store as IFeatureSettingStore<TFeatureSetting, TItem>;

        public IFeatureSettingAccessor<TFeatureSetting, TItem> FeatureSettingAccessor => Accessor as IFeatureSettingAccessor<TFeatureSetting, TItem>;
    }
}
