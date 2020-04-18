using Microsoft.EntityFrameworkCore;
using MotiNet.Entities.EntityFrameworkCore;

namespace EntitiesGenerator.EntityFrameworkCore
{
    public partial class ItemsRelationshipStore<TDbContext>
        : EntityStore<ItemsRelationship, TDbContext>,
          IItemsRelationshipStore<ItemsRelationship>
        where TDbContext : DbContext
    {
        public ItemsRelationshipStore(TDbContext dbContext) : base(dbContext) { }
    }
}
