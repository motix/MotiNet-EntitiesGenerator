using Microsoft.EntityFrameworkCore;
using MotiNet.Entities.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace EntitiesGenerator.EntityFrameworkCore
{
    public class ModuleStore<TDbContext>
        : EntityStore<Module, TDbContext>,
          IModuleStore<Module, Project>,
          IScopedNameBasedEntityStoreMarker<Module, Project, TDbContext>
        where TDbContext : DbContext
    {
        public ModuleStore(TDbContext dbContext) : base(dbContext) { }

        public Module FindByName(string normalizedName, Project project)
            => ScopedNameBasedEntityStoreHelper.FindEntityByName(this, normalizedName, project, x => x.ProjectId);

        public Task<Module> FindByNameAsync(string normalizedName, Project project, CancellationToken cancellationToken)
            => ScopedNameBasedEntityStoreHelper.FindEntityByNameAsync(this, normalizedName, project, x => x.ProjectId, cancellationToken);

        public Project FindScopeById(object id)
            => ScopedNameBasedEntityStoreHelper.FindScopeById(this, id);

        public Task<Project> FindScopeByIdAsync(object id, CancellationToken cancellationToken)
            => ScopedNameBasedEntityStoreHelper.FindScopeByIdAsync(this, id, cancellationToken);
    }
}
