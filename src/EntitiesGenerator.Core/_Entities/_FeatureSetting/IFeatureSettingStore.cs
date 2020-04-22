using MotiNet.Entities;

namespace EntitiesGenerator
{
    public interface IFeatureSettingStore<TFeatureSetting, TItem>
        : IEntityStore<TFeatureSetting>,
          IChildEntityStore<TFeatureSetting, TItem>
        where TFeatureSetting : class
        where TItem : class
    { }
}
