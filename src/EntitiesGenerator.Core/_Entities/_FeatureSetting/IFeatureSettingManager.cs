using MotiNet.Entities;

namespace EntitiesGenerator
{
    // Entity Features: None

    public interface IFeatureSettingManager<TFeatureSetting>
        : IEntityManager<TFeatureSetting>
        where TFeatureSetting : class
    { }
}
