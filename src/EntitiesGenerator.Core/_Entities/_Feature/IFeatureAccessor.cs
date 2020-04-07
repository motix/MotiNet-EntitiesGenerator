using MotiNet.Entities;

namespace EntitiesGenerator
{
    public interface IFeatureAccessor<TFeature>
        : IEntityAccessor<TFeature>,
          INameBasedEntityAccessor<TFeature>,
          IReadableIdEntityAccessor<TFeature>
        where TFeature : class
    { }
}
