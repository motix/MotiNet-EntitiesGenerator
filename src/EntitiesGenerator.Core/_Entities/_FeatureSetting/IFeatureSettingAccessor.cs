using MotiNet.Entities;

namespace EntitiesGenerator
{
    public interface IFeatureSettingAccessor<TFeatureSetting>
        : IEntityAccessor<TFeatureSetting>
        where TFeatureSetting : class
    { }
}
