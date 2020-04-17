using MotiNet.Entities;

namespace EntitiesGenerator
{
    // Entity Features:
    // - Entity
    // - NameBasedEntity

    public interface IProjectManager<TProject>
        : IEntityManager<TProject>,
          INameBasedEntityManager<TProject>
        where TProject : class
    { }
}
