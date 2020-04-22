using MotiNet.Entities;

namespace EntitiesGenerator
{
    public interface IFeatureSettingAccessor<TFeatureSetting, TItem>
        : IEntityAccessor<TFeatureSetting>,
          IChildEntityAccessor<TFeatureSetting, TItem>
        where TFeatureSetting : class
        where TItem : class
    { }
}
