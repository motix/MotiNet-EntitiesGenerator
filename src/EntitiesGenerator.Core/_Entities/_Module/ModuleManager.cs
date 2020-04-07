using Microsoft.Extensions.Logging;
using MotiNet.Entities;
using System;
using System.Collections.Generic;

namespace EntitiesGenerator
{
    public class ModuleManager<TModule, TProject> : ManagerBase<TModule, TProject>, IModuleManager<TModule, TProject>
        where TModule : class
        where TProject : class
    {
        public ModuleManager(
            IModuleStore<TModule, TProject> store,
            IModuleAccessor<TModule, TProject> moduleAccessor,
            IEnumerable<IValidator<TModule, TProject>> moduleValidators,
            ILogger<ModuleManager<TModule, TProject>> logger,
            ILookupNormalizer nameNormalizer)
            : base(store, moduleAccessor, moduleValidators, logger)
            => NameNormalizer = nameNormalizer ?? throw new ArgumentNullException(nameof(nameNormalizer));

        public IEntityStore<TModule> EntityStore => Store as IEntityStore<TModule>;

        public IEntityAccessor<TModule> EntityAccessor => Accessor as IEntityAccessor<TModule>;

        public IScopedNameBasedEntityStore<TModule, TProject> ScopedNameBasedEntityStore => Store as IScopedNameBasedEntityStore<TModule, TProject>;

        public IScopedNameBasedEntityAccessor<TModule, TProject> ScopedNameBasedEntityAccessor => Accessor as IScopedNameBasedEntityAccessor<TModule, TProject>;

        public IModuleStore<TModule, TProject> ModuleStore => Store as IModuleStore<TModule, TProject>;

        public IModuleAccessor<TModule, TProject> ModuleAccessor => Accessor as IModuleAccessor<TModule, TProject>;

        public ILookupNormalizer NameNormalizer { get; }
    }
}
