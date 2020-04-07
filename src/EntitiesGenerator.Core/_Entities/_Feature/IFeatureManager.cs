using MotiNet.Entities;

namespace EntitiesGenerator
{
    // Entity Features:
    // - NameBasedEntity
    // - ReadableIdEntity
    // - OnOffEntity

    public interface IFeatureManager<TFeature>
        : IEntityManager<TFeature>,
          INameBasedEntityManager<TFeature>,
          IReadableIdEntityManager<TFeature>,
          IOnOffEntityManager<TFeature>
        where TFeature : class
    { }
}
