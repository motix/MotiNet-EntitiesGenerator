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

        public DbSet<ChildEntityFeatureSetting> ChildEntityFeatureSettings { get; set; }

        public DbSet<PreprocessedEntityFeatureSetting> PreprocessedEntityFeatureSettings { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Item>(ConfigureItemInternal);
            modelBuilder.Entity<NameBasedEntityFeatureSetting>(ConfigureNameBasedEntityFeatureSetting);
            modelBuilder.Entity<ScopedNameBasedEntityFeatureSetting>(ConfigureScopedNameBasedEntityFeatureSetting);
            modelBuilder.Entity<ChildEntityFeatureSetting>(ConfigureChildEntityFeatureSetting);
            modelBuilder.Entity<ItemsRelationship>(ConfigureItemsRelationshipInternal);
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

        protected virtual void ConfigureNameBasedEntityFeatureSetting(EntityTypeBuilder<NameBasedEntityFeatureSetting> builder)
        {
            builder.Property(x => x.NamePropertyName)
                   .HasColumnName(nameof(NameBasedEntityFeatureSetting.NamePropertyName));
        }

        protected virtual void ConfigureScopedNameBasedEntityFeatureSetting(EntityTypeBuilder<ScopedNameBasedEntityFeatureSetting> builder)
        {
            builder.Property(x => x.NamePropertyName)
                   .HasColumnName(nameof(ScopedNameBasedEntityFeatureSetting.NamePropertyName));
            builder.Property(x => x.DeleteRestrict)
                   .HasColumnName(nameof(ScopedNameBasedEntityFeatureSetting.DeleteRestrict));
        }

        protected virtual void ConfigureChildEntityFeatureSetting(EntityTypeBuilder<ChildEntityFeatureSetting> builder)
        {
            builder.Property(x => x.DeleteRestrict)
                   .HasColumnName(nameof(ChildEntityFeatureSetting.DeleteRestrict));
        }

        protected virtual void ConfigureItemsRelationshipInternal(EntityTypeBuilder<ItemsRelationship> builder)
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
