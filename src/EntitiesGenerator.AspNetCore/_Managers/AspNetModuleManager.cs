using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using MotiNet.Entities;
using System.Collections.Generic;
using System.Threading;

namespace EntitiesGenerator
{
    public class AspNetModuleManager<TModule, TProject> : ModuleManager<TModule, TProject>
        where TModule : class
        where TProject : class
    {
        private readonly CancellationToken _cancel;

        public AspNetModuleManager(
            IModuleStore<TModule, TProject> store,
            IModuleAccessor<TModule, TProject> moduleAccessor,
            IEnumerable<IValidator<TModule, TProject>> moduleValidators,
            ILogger<ModuleManager<TModule, TProject>> logger,
            ILookupNormalizer<TModule> nameNormalizer,
            IHttpContextAccessor contextAccessor)
            : base(store, moduleAccessor, moduleValidators, logger, nameNormalizer)
            => _cancel = contextAccessor?.HttpContext?.RequestAborted ?? CancellationToken.None;

        public override CancellationToken CancellationToken => _cancel;
    }
}
