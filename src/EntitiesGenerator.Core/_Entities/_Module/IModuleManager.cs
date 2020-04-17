using MotiNet.Entities;

namespace EntitiesGenerator
{
    // Entity Features:
    // - Entity
    // - ScopedNameBasedEntity

    public interface IModuleManager<TModule, TProject>
        : IEntityManager<TModule>,
          IScopedNameBasedEntityManager<TModule, TProject>
        where TModule : class
        where TProject : class
    { }
}
