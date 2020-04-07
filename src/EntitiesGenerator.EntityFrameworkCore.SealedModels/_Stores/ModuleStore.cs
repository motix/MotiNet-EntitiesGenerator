using Microsoft.EntityFrameworkCore;
using MotiNet.Entities.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace EntitiesGenerator.EntityFrameworkCore
{
    public class ModuleStore<TDbContext>
        : EntityStore<Module, TDbContext>,
          IModuleStore<Module, Project>,
          IScopedNameBasedEntityStoreMarker<Module, Project, TDbContext>,
          IModuleAccessor<Module, Project>
        where TDbContext : DbContext
    {
        public ModuleStore(TDbContext dbContext) : base(dbContext) { }

        #region Store

        public Module FindByName(string normalizedName, Project project)
            => ScopedNameBasedEntityStoreHelper.FindEntityByName(this, normalizedName, project, x => x.ProjectId);

        public Task<Module> FindByNameAsync(string normalizedName, Project project, CancellationToken cancellationToken)
            => ScopedNameBasedEntityStoreHelper.FindEntityByNameAsync(this, normalizedName, project, x => x.ProjectId, cancellationToken);

        public Project FindScopeById(object id)
            => ScopedNameBasedEntityStoreHelper.FindScopeById(this, id);

        public Task<Project> FindScopeByIdAsync(object id, CancellationToken cancellationToken)
            => ScopedNameBasedEntityStoreHelper.FindScopeByIdAsync(this, id, cancellationToken);

        #endregion

        #region Accessor

        public object GetId(Module module) => module.Id;

        public string GetName(Module module) => module.Name;

        public void SetNormalizedName(Module module, string normalizedName) => module.NormalizedName = normalizedName;

        public object GetScopeId(Module module) => module.ProjectId;

        public void SetScopeId(Module module, object projectId) => module.ProjectId = (string)projectId;

        public Project GetScope(Module module) => module.Project;

        public void SetScope(Module module, Project project) => module.Project = project;

        #endregion
    }
}
