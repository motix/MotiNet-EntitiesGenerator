using Microsoft.EntityFrameworkCore;
using MotiNet.Entities.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace EntitiesGenerator.EntityFrameworkCore
{
    public partial class ItemsRelationshipStore<TDbContext>
        : EntityStore<ItemsRelationship, TDbContext>,
          IItemsRelationshipStore<ItemsRelationship, Module>,
          IChildEntityStoreMarker<ItemsRelationship, Module, TDbContext>
        where TDbContext : DbContext
    {
        public ItemsRelationshipStore(TDbContext dbContext) : base(dbContext) { }

        public Module FindParentById(object id)
            => ChildEntityStoreHelper.FindParentById(this, id);

        public Task<Module> FindParentByIdAsync(object id, CancellationToken cancellationToken)
            => ChildEntityStoreHelper.FindParentByIdAsync(this, id, cancellationToken);
    }
}
