using Microsoft.EntityFrameworkCore;
using MotiNet.Entities.EntityFrameworkCore;

namespace EntitiesGenerator.EntityFrameworkCore
{
    public class FeatureSettingStore<TDbContext>
        : EntityStore<FeatureSetting, TDbContext>,
          IFeatureSettingStore<FeatureSetting>
        where TDbContext : DbContext
    {
        public FeatureSettingStore(TDbContext dbContext) : base(dbContext) { }
    }
}
