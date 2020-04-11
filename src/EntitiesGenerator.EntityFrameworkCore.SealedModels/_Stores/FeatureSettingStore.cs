using Microsoft.EntityFrameworkCore;
using MotiNet.Entities.EntityFrameworkCore;

namespace EntitiesGenerator.EntityFrameworkCore
{
    public class FeatureSettingStore<TDbContext>
        : EntityStore<FeatureSettingBase, TDbContext>,
          IFeatureSettingStore<FeatureSettingBase>
        where TDbContext : DbContext
    {
        public FeatureSettingStore(TDbContext dbContext) : base(dbContext) { }
    }
}
