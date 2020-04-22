using Microsoft.EntityFrameworkCore;
using MotiNet.Entities.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace EntitiesGenerator.EntityFrameworkCore
{
    public partial class ItemsRelationshipStore<TDbContext>
        : EntityStore<ItemsRelationship, TDbContext>,
          IItemsRelationshipStore<ItemsRelationship, Module>,
          IScopedNameBasedEntityStoreMarker<ItemsRelationship, Module, TDbContext>
        where TDbContext : DbContext
    {
        public ItemsRelationshipStore(TDbContext dbContext) : base(dbContext) { }

        public ItemsRelationship FindByName(string normalizedName, Module module)
            => ScopedNameBasedEntityStoreHelper.FindEntityByName(this, normalizedName, module, x => x.ModuleId);

        public Task<ItemsRelationship> FindByNameAsync(string normalizedName, Module module, CancellationToken cancellationToken)
            => ScopedNameBasedEntityStoreHelper.FindEntityByNameAsync(this, normalizedName, module, x => x.ModuleId, cancellationToken);

        public Module FindScopeById(object id)
            => ScopedNameBasedEntityStoreHelper.FindScopeById(this, id);

        public Task<Module> FindScopeByIdAsync(object id, CancellationToken cancellationToken)
            => ScopedNameBasedEntityStoreHelper.FindScopeByIdAsync(this, id, cancellationToken);
    }
}
