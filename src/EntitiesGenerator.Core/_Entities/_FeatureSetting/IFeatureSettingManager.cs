using MotiNet.Entities;

namespace EntitiesGenerator
{
    // Entity Features:
    // - Entity
    // - ChildEntity

    public interface IFeatureSettingManager<TFeatureSetting, TItem>
        : IEntityManager<TFeatureSetting>,
          IChildEntityManager<TFeatureSetting, TItem>
        where TFeatureSetting : class
        where TItem : class
    { }
}
