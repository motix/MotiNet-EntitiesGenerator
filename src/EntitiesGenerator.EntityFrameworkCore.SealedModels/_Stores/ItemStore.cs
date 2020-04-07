using Microsoft.EntityFrameworkCore;
using MotiNet.Entities.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace EntitiesGenerator.EntityFrameworkCore
{
    public class ItemStore<TDbContext>
        : EntityStore<Item, TDbContext>,
          IItemStore<Item, Module>,
          IScopedNameBasedEntityStoreMarker<Item, Module, TDbContext>,
          IItemAccessor<Item, Module>
        where TDbContext : DbContext
    {
        public ItemStore(TDbContext dbContext) : base(dbContext) { }

        #region Store

        public Item FindByName(string normalizedName, Module module)
            => ScopedNameBasedEntityStoreHelper.FindEntityByName(this, normalizedName, module, x => x.ModuleId);

        public Task<Item> FindByNameAsync(string normalizedName, Module module, CancellationToken cancellationToken)
            => ScopedNameBasedEntityStoreHelper.FindEntityByNameAsync(this, normalizedName, module, x => x.ModuleId, cancellationToken);

        public Module FindScopeById(object id)
            => ScopedNameBasedEntityStoreHelper.FindScopeById(this, id);

        public Task<Module> FindScopeByIdAsync(object id, CancellationToken cancellationToken)
            => ScopedNameBasedEntityStoreHelper.FindScopeByIdAsync(this, id, cancellationToken);

        #endregion

        #region Accessor

        public object GetId(Item item) => item.Id;

        public string GetName(Item item) => item.Name;

        public void SetNormalizedName(Item item, string normalizedName) => item.NormalizedName = normalizedName;

        public object GetScopeId(Item item) => item.ModuleId;

        public void SetScopeId(Item item, object moduleId) => item.ModuleId = (string)moduleId;

        public Module GetScope(Item item) => item.Module;

        public void SetScope(Item item, Module module) => item.Module = module;

        #endregion
    }
}
