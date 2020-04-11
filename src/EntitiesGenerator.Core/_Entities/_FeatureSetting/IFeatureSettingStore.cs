using MotiNet.Entities;

namespace EntitiesGenerator
{
    public interface IFeatureSettingStore<TFeatureSetting>
        : IEntityStore<TFeatureSetting>
        where TFeatureSetting : class
    { }
}
