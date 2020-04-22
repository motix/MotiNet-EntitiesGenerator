using Microsoft.EntityFrameworkCore;
using MotiNet.Entities.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace EntitiesGenerator.EntityFrameworkCore
{
    public partial class FeatureSettingStore<TDbContext>
        : EntityStore<FeatureSetting, TDbContext>,
          IFeatureSettingStore<FeatureSetting, Item>,
          IChildEntityStoreMarker<FeatureSetting, Item, TDbContext>
        where TDbContext : DbContext
    {
        public FeatureSettingStore(TDbContext dbContext) : base(dbContext) { }

        public Item FindParentById(object id)
            => ChildEntityStoreHelper.FindParentById(this, id);

        public Task<Item> FindParentByIdAsync(object id, CancellationToken cancellationToken)
            => ChildEntityStoreHelper.FindParentByIdAsync(this, id, cancellationToken);
    }
}
