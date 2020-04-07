using MotiNet.Entities;

namespace EntitiesGenerator
{
    public interface IProjectAccessor<TProject>
        : IEntityAccessor<TProject>,
          INameBasedEntityAccessor<TProject>
        where TProject : class
    { }
}
