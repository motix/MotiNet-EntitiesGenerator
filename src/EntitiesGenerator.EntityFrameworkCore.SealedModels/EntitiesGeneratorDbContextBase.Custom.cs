using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EntitiesGenerator.EntityFrameworkCore
{
    partial class EntitiesGeneratorDbContextBase
    {
        public DbSet<EntityFeatureSetting> EntityFeatureSettings { get; set; }

        public DbSet<TimeTrackedEntityFeatureSetting> TimeTrackedEntityFeatureSettings { get; set; }

        public DbSet<CodeBasedEntityFeatureSetting> CodeBasedEntityFeatureSettings { get; set; }

        public DbSet<NameBasedEntityFeatureSetting> NameBasedEntityFeatureSettings { get; set; }

        public DbSet<ScopedNameBasedEntityFeatureSetting> ScopedNameBasedEntityFeatureSettings { get; set; }

        public DbSet<ReadableIdEntityFeatureSetting> ReadableIdEntityFeatureSettings { get; set; }

        public DbSet<OnOffEntityFeatureSetting> OnOffEntityFeatureSettings { get; set; }

        public DbSet<PreprocessedEntityFeatureSetting> PreprocessedEntityFeatureSettings { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Item>(ConfigureItemInternal);
        }

        protected virtual void ConfigureItemInternal(EntityTypeBuilder<Item> builder)
        {
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
