using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EntitiesGenerator.EntityFrameworkCore
{
    public abstract class EntitiesGeneratorDbContextBase
        : EntitiesGeneratorDbContextBase<Project, Module, Item,
                                         FeatureSetting,
                                         ItemsRelationship,
                                         string>
    {
        public DbSet<EntityFeatureSetting> EntityFeatureSettings { get; set; }
        public DbSet<TimeTrackedEntityFeatureSetting> TimeTrackedEntityFeatureSettings { get; set; }
        public DbSet<CodeBasedEntityFeatureSetting> CodeBasedEntityFeatureSettings { get; set; }
        public DbSet<NameBasedEntityFeatureSetting> NameBasedEntityFeatureSettings { get; set; }
        public DbSet<ScopedNameBasedEntityFeatureSetting> ScopedNameBasedEntityFeatureSettings { get; set; }
        public DbSet<ReadableIdEntityFeatureSetting> ReadableIdEntityFeatureSettings { get; set; }
        public DbSet<OnOffEntityFeatureSetting> OnOffEntityFeatureSettings { get; set; }
        public DbSet<PreprocessedEntityFeatureSetting> PreprocessedEntityFeatureSettings { get; set; }

        protected EntitiesGeneratorDbContextBase(DbContextOptions options) : base(options) { }

        protected EntitiesGeneratorDbContextBase() { }

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
            builder.HasIndex(nameof(Module.ProjectId), nameof(Module.Name)).IsUnique();
            builder.HasIndex(nameof(Module.ProjectId), nameof(Module.NormalizedName)).IsUnique();

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
            builder.HasIndex(nameof(Item.ModuleId), nameof(Item.Name)).IsUnique();
            builder.HasIndex(nameof(Item.ModuleId), nameof(Item.NormalizedName)).IsUnique();

            // Restrict delete
            builder.HasOne(x => x.Module)
                   .WithMany(x => x.Items)
                   .OnDelete(DeleteBehavior.Restrict);

            // Customization
            builder.Ignore(x => x.OrderedFeatureSettings);
        }

        protected override void ConfigureFeatureSetting(EntityTypeBuilder<FeatureSetting> builder)
        {
            builder.HasIndex(nameof(FeatureSetting.ItemId), "Discriminator").IsUnique();
        }

        protected override void ConfigureItemsRelationship(EntityTypeBuilder<ItemsRelationship> builder)
        {
            // Unique
            builder.HasIndex(nameof(ItemsRelationship.Item1Id), nameof(ItemsRelationship.Item2Id)).IsUnique();

            // Multiple cascade paths
            builder.HasOne(x => x.Item1)
                   .WithMany()
                   .OnDelete(DeleteBehavior.Restrict);
            builder.HasOne(x => x.Item2)
                   .WithMany()
                   .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
