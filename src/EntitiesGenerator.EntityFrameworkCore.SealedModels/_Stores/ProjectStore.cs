using Microsoft.EntityFrameworkCore;
using MotiNet.Entities.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace EntitiesGenerator.EntityFrameworkCore
{
    public class ProjectStore<TDbContext>
        : EntityStore<Project, TDbContext>,
          IProjectStore<Project>,
          INameBasedEntityStoreMarker<Project, TDbContext>,
          IProjectAccessor<Project>
        where TDbContext : DbContext
    {
        public ProjectStore(TDbContext dbContext) : base(dbContext) { }

        #region Store

        public Project FindByName(string normalizedName)
            => NameBasedEntityStoreHelper.FindEntityByName(this, normalizedName);

        public Task<Project> FindByNameAsync(string normalizedName, CancellationToken cancellationToken)
            => NameBasedEntityStoreHelper.FindEntityByNameAsync(this, normalizedName, cancellationToken);

        #endregion

        #region Accessor

        public object GetId(Project project) => project.Id;

        public string GetName(Project project) => project.Name;

        public void SetNormalizedName(Project project, string normalizedName) => project.NormalizedName = normalizedName;

        #endregion
    }
}
