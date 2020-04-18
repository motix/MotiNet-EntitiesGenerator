using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace EntitiesGenerator.EntityFrameworkCore
{
    partial class ItemStore<TDbContext>
    {
        public override Task<Item> CreateAsync(Item entity, CancellationToken cancellationToken)
        {
            var ret = base.CreateAsync(entity, cancellationToken);

            return ret;
        }

        public override async Task UpdateAsync(Item entity, CancellationToken cancellationToken)
        {
            await base.UpdateAsync(entity, cancellationToken);

            var feaureSettings = DbContext.Set<FeatureSetting>();

            feaureSettings.RemoveRange(feaureSettings.Where(x => x.ItemId == entity.Id));
            await DbContext.SaveChangesAsync(cancellationToken);

            foreach (var setting in entity.FeatureSettings)
            {
                setting.ItemId = entity.Id;
                feaureSettings.Add(setting);
            }

            await DbContext.SaveChangesAsync(cancellationToken);
        }
    }
}
