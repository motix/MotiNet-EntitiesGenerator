using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EntitiesGenerator.EntityFrameworkCore
{
    public abstract partial class EntitiesGeneratorDbContextBase
        : EntitiesGeneratorDbContextBase<Project, Module, Item,
                                         FeatureSetting,
                                         ItemsRelationship,
                                         string>
    {
        protected EntitiesGeneratorDbContextBase(DbContextOptions options) : base(options) { }

        protected EntitiesGeneratorDbContextBase() { }

        protected override void ConfigureProject(EntityTypeBuilder<Project> builder)
        {
            // Unique name
            builder.HasIndex(x => x.Name).IsUnique();
            builder.HasIndex(x => x.NormalizedName).IsUnique();

            // Ignore ordered children
            builder.Ignore(x => x.OrderedModules);
        }

        protected override void ConfigureModule(EntityTypeBuilder<Module> builder)
        {
            // Unique name in scope
            builder.HasIndex(nameof(Module.ProjectId), nameof(Module.Name)).IsUnique();
            builder.HasIndex(nameof(Module.ProjectId), nameof(Module.NormalizedName)).IsUnique();

            // Restrict delete
            builder.HasOne(x => x.Project)
                   .WithMany(x => x.Modules)
                   .OnDelete(DeleteBehavior.Restrict);

            // Ignore ordered children
            builder.Ignore(x => x.OrderedItems);

            // Ignore ordered children
            builder.Ignore(x => x.OrderedItemsRelationships);
        }

        protected override void ConfigureItem(EntityTypeBuilder<Item> builder)
        {
            // Unique name in scope
            builder.HasIndex(nameof(Item.ModuleId), nameof(Item.Name)).IsUnique();
            builder.HasIndex(nameof(Item.ModuleId), nameof(Item.NormalizedName)).IsUnique();

            // Restrict delete
            builder.HasOne(x => x.Module)
                   .WithMany(x => x.Items)
                   .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
