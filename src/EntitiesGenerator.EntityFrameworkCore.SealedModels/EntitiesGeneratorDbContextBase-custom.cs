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

        public DbSet<OneToManyItemsRelationship> OneToManyItemsRelationships { get; set; }

        public DbSet<ManyToManyItemsRelationship> ManyToManyItemsRelationships { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<NameBasedEntityFeatureSetting>(ConfigureNameBasedEntityFeatureSetting);
            modelBuilder.Entity<ScopedNameBasedEntityFeatureSetting>(ConfigureScopedNameBasedEntityFeatureSetting);
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
        }
    }
}
