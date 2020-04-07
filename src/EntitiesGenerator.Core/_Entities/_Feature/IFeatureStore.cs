using MotiNet.Entities;

namespace EntitiesGenerator
{
    public interface IFeatureStore<TFeature>
        : IEntityStore<TFeature>,
          INameBasedEntityStore<TFeature>,
          IOnOffEntityStore<TFeature>
        where TFeature : class
    { }
}
