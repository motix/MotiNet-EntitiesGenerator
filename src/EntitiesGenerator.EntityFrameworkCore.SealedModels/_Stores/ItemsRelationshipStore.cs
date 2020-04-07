using Microsoft.EntityFrameworkCore;
using MotiNet.Entities.EntityFrameworkCore;

namespace EntitiesGenerator.EntityFrameworkCore
{
    public class ItemsRelationshipStore<TDbContext>
        : EntityStore<ItemsRelationship, TDbContext>,
          IItemsRelationshipStore<ItemsRelationship>,
          IItemsRelationshipAccessor<ItemsRelationship>
        where TDbContext : DbContext
    {
        public ItemsRelationshipStore(TDbContext dbContext) : base(dbContext) { }

        #region Store

        #endregion

        #region Accessor

        public object GetId(ItemsRelationship projectEntitiesRelationship) => projectEntitiesRelationship.Id;

        #endregion
    }
}
