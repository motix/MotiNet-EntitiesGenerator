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

            // Ignore ordered children
            builder.Ignore(x => x.OrderedFeatureSettings);
        }

        protected override void ConfigureItemsRelationship(EntityTypeBuilder<ItemsRelationship> builder)
        {
            // Restrict delete
            builder.HasOne(x => x.Item1)
                   .WithMany(x => x.Item1ItemsRelationships)
                   .OnDelete(DeleteBehavior.Restrict);

            // Restrict delete
            builder.HasOne(x => x.Item2)
                   .WithMany(x => x.Item2ItemsRelationships)
                   .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
