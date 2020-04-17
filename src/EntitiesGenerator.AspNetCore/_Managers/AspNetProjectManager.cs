using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using MotiNet.Entities;
using System.Collections.Generic;
using System.Threading;

namespace EntitiesGenerator
{
    public class AspNetProjectManager<TProject> : ProjectManager<TProject> where TProject : class
    {
        private readonly CancellationToken _cancel;
        
        public AspNetProjectManager(
            IProjectStore<TProject> store,
            IProjectAccessor<TProject> projectAccessor,
            IEnumerable<IValidator<TProject>> projectValidators,
            ILogger<ProjectManager<TProject>> logger,
            ILookupNormalizer<TProject> nameNormalizer,
            IHttpContextAccessor contextAccessor)
            : base(store, projectAccessor, projectValidators, logger, nameNormalizer)
            => _cancel = contextAccessor?.HttpContext?.RequestAborted ?? CancellationToken.None;

        public override CancellationToken CancellationToken => _cancel;
    }
}
