using Microsoft.EntityFrameworkCore;
using MotiNet.Entities;
using MotiNet.Entities.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace EntitiesGenerator.EntityFrameworkCore
{
    public class FeatureStore<TDbContext>
        : EntityStore<Feature, TDbContext>,
          IFeatureStore<Feature>,
          INameBasedEntityStoreMarker<Feature, TDbContext>
        where TDbContext : DbContext
    {
        public FeatureStore(TDbContext dbContext) : base(dbContext) { }

        public ISearchSpecification<Feature> SearchActiveEntitiesSpecification => new SearchActiveSpecification<Feature>();

        public Feature FindByName(string normalizedName)
            => NameBasedEntityStoreHelper.FindEntityByName(this, normalizedName);

        public Task<Feature> FindByNameAsync(string normalizedName, CancellationToken cancellationToken)
            => NameBasedEntityStoreHelper.FindEntityByNameAsync(this, normalizedName, cancellationToken);
    }
}
