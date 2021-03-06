﻿using Microsoft.EntityFrameworkCore;
using MotiNet.Entities.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace EntitiesGenerator.EntityFrameworkCore
{
    public partial class ItemStore<TDbContext>
        : EntityStore<Item, TDbContext>,
          IItemStore<Item, Module>,
          IScopedNameBasedEntityStoreMarker<Item, Module, TDbContext>
        where TDbContext : DbContext
    {
        public ItemStore(TDbContext dbContext) : base(dbContext) { }

        public Item FindByName(string normalizedName, Module module)
            => ScopedNameBasedEntityStoreHelper.FindEntityByName(this, normalizedName, module, x => x.ModuleId);

        public Task<Item> FindByNameAsync(string normalizedName, Module module, CancellationToken cancellationToken)
            => ScopedNameBasedEntityStoreHelper.FindEntityByNameAsync(this, normalizedName, module, x => x.ModuleId, cancellationToken);

        public Module FindScopeById(object id)
            => ScopedNameBasedEntityStoreHelper.FindScopeById(this, id);

        public Task<Module> FindScopeByIdAsync(object id, CancellationToken cancellationToken)
            => ScopedNameBasedEntityStoreHelper.FindScopeByIdAsync(this, id, cancellationToken);
    }
}
