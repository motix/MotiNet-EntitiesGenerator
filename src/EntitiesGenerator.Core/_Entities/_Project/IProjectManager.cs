using MotiNet.Entities;

namespace EntitiesGenerator
{
    // Entity Features:
    // - NameBasedEntity

    public interface IProjectManager<TProject>
        : IEntityManager<TProject>,
          INameBasedEntityManager<TProject>
        where TProject : class
    { }
}
