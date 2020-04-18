using Microsoft.EntityFrameworkCore;
using MotiNet.Entities.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace EntitiesGenerator.EntityFrameworkCore
{
    public partial class ProjectStore<TDbContext>
        : EntityStore<Project, TDbContext>,
          IProjectStore<Project>,
          INameBasedEntityStoreMarker<Project, TDbContext>
        where TDbContext : DbContext
    {
        public ProjectStore(TDbContext dbContext) : base(dbContext) { }

        public Project FindByName(string normalizedName)
            => NameBasedEntityStoreHelper.FindEntityByName(this, normalizedName);

        public Task<Project> FindByNameAsync(string normalizedName, CancellationToken cancellationToken)
            => NameBasedEntityStoreHelper.FindEntityByNameAsync(this, normalizedName, cancellationToken);
    }
}
