using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EntitiesGenerator.EntityFrameworkCore
{
    public abstract class EntitiesGeneratorDbContextBase
        : EntitiesGeneratorDbContextBase<
            Feature,
            Project, Module, Item,
            ItemsRelationship,
            ItemFeatureSetting,
            // Key
            string>
    {
        protected EntitiesGeneratorDbContextBase(DbContextOptions options) : base(options) { }

        protected EntitiesGeneratorDbContextBase() { }

        protected override void ConfigureFeature(EntityTypeBuilder<Feature> builder)
        {
            // Unique
            builder.HasIndex(x => x.Name).IsUnique();
            builder.HasIndex(x => x.NormalizedName).IsUnique();
        }

        protected override void ConfigureProject(EntityTypeBuilder<Project> builder)
        {
            // Unique
            builder.HasIndex(x => x.Name).IsUnique();
            builder.HasIndex(x => x.NormalizedName).IsUnique();

            // Customization
            builder.Ignore(x => x.OrderedModules);
        }

        protected override void ConfigureModule(EntityTypeBuilder<Module> builder)
        {
            // Unique
            builder.HasIndex(nameof(Module.ProjectId), nameof(Module.Name));
            builder.HasIndex(nameof(Module.ProjectId), nameof(Module.NormalizedName));

            // Restrict delete
            builder.HasOne(x => x.Project)
                   .WithMany(x => x.Modules)
                   .OnDelete(DeleteBehavior.Restrict);

            // Customization
            builder.Ignore(x => x.OrderedItems);
        }

        protected override void ConfigureItem(EntityTypeBuilder<Item> builder)
        {
            // Unique
            builder.HasIndex(nameof(Item.ModuleId), nameof(Item.Name));
            builder.HasIndex(nameof(Item.ModuleId), nameof(Item.NormalizedName));

            // Restrict delete
            builder.HasOne(x => x.Module)
                   .WithMany(x => x.Items)
                   .OnDelete(DeleteBehavior.Restrict);

            // Customization
            builder.Ignore(x => x.OrderedFeatureSettings);
        }

        protected override void ConfigureItemsRelationship(EntityTypeBuilder<ItemsRelationship> builder)
        {
            // Unique
            builder.HasIndex(nameof(ItemsRelationship.Item1Id), nameof(ItemsRelationship.Item2Id));
        }

        protected override void ConfigureItemFeatureSetting(EntityTypeBuilder<ItemFeatureSetting> builder)
        {
            // Key
            builder.HasKey(x => new { x.ItemId, x.FeatureId });

            // Restrict delete
            builder.HasOne(x => x.Feature)
                   .WithMany(x => x.FeatureSettings)
                   .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
