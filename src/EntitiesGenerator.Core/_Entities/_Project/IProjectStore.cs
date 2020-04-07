using MotiNet.Entities;

namespace EntitiesGenerator
{
    public interface IProjectStore<TProject>
        : IEntityStore<TProject>,
          INameBasedEntityStore<TProject>
        where TProject : class
    { }
}
