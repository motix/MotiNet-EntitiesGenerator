using MotiNet.Entities;

namespace EntitiesGenerator
{
    public interface IModuleStore<TModule, TProject>
        : IEntityStore<TModule>,
          IScopedNameBasedEntityStore<TModule, TProject>
        where TModule : class
        where TProject : class
    { }
}
