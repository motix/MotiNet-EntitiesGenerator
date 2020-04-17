using Microsoft.Extensions.Logging;
using MotiNet.Entities;
using System;
using System.Collections.Generic;

namespace EntitiesGenerator
{
    public class ProjectManager<TProject> : ManagerBase<TProject>, IProjectManager<TProject>
        where TProject : class
    {
        public ProjectManager(
            IProjectStore<TProject> store,
            IProjectAccessor<TProject> accessor,
            IEnumerable<IValidator<TProject>> validators,
            ILogger<ProjectManager<TProject>> logger,
            ILookupNormalizer<TProject> nameNormalizer)
            : base(store, accessor, validators, logger)
        {
            NameNormalizer = nameNormalizer ?? throw new ArgumentNullException(nameof(nameNormalizer));
        }

        public IEntityStore<TProject> EntityStore => Store as IEntityStore<TProject>;

        public IEntityAccessor<TProject> EntityAccessor => Accessor as IEntityAccessor<TProject>;

        public INameBasedEntityStore<TProject> NameBasedEntityStore => Store as INameBasedEntityStore<TProject>;

        public INameBasedEntityAccessor<TProject> NameBasedEntityAccessor => Accessor as INameBasedEntityAccessor<TProject>;

        public IProjectStore<TProject> ProjectStore => Store as IProjectStore<TProject>;

        public IProjectAccessor<TProject> ProjectAccessor => Accessor as IProjectAccessor<TProject>;

        public ILookupNormalizer NameNormalizer { get; }
    }
}
