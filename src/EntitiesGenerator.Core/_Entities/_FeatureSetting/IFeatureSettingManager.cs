using MotiNet.Entities;

namespace EntitiesGenerator
{
    // Entity Features:
    // - Entity

    public interface IFeatureSettingManager<TFeatureSetting>
        : IEntityManager<TFeatureSetting>
        where TFeatureSetting : class
    { }
}
