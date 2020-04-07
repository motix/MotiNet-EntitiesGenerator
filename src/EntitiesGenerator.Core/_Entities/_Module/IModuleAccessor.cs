using MotiNet.Entities;

namespace EntitiesGenerator
{
    public interface IModuleAccessor<TModule, TProject>
        : IEntityAccessor<TModule>,
          IScopedNameBasedEntityAccessor<TModule, TProject>
        where TModule : class
        where TProject : class
    { }
}
