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
          INameBasedEntityStoreMarker<Feature, TDbContext>,
          IFeatureAccessor<Feature>
        where TDbContext : DbContext
    {
        public FeatureStore(TDbContext dbContext) : base(dbContext) { }

        #region Store

        public ISearchSpecification<Feature> SearchActiveEntitiesSpecification => new SearchActiveSpecification<Feature>();

        public Feature FindByName(string normalizedName)
            => NameBasedEntityStoreHelper.FindEntityByName(this, normalizedName);

        public Task<Feature> FindByNameAsync(string normalizedName, CancellationToken cancellationToken)
            => NameBasedEntityStoreHelper.FindEntityByNameAsync(this, normalizedName, cancellationToken);

        #endregion

        #region Accessor

        public object GetId(Feature feature) => feature.Id;

        public string GetName(Feature feature) => feature.Name;

        public void SetNormalizedName(Feature feature, string normalizedName) => feature.NormalizedName = normalizedName;

        public object GetIdSource(Feature feature) => feature.Name;

        public void SetId(Feature feature, string id) => feature.Id = id;

        #endregion
    }
}
