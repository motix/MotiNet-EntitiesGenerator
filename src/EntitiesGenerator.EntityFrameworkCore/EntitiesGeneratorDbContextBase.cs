using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;

namespace EntitiesGenerator.EntityFrameworkCore
{
    public abstract class EntitiesGeneratorDbContextBase<
        TFeature,
        TProject, TModule, TItem,
        TItemsRelationship,
        TItemFeatureSetting,
        // Key
        TKey>
        : DbContext
        where TFeature : class
        where TProject : class
        where TModule : class
        where TItem: class
        where TItemsRelationship: class
        where TItemFeatureSetting: class
        // Key
        where TKey : IEquatable<TKey>
    {
        protected EntitiesGeneratorDbContextBase(DbContextOptions options) : base(options) { }

        protected EntitiesGeneratorDbContextBase() { }

        public DbSet<TFeature> Features { get; set; }

        public DbSet<TProject> Projects { get; set; }
        public DbSet<TModule> Modules { get; set; }
        public DbSet<TItem> Items { get; set; }

        public DbSet<TItemsRelationship> ItemsRelationships { get; set; }

        public DbSet<TItemFeatureSetting> ItemFeatureSettings { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TFeature>(ConfigureFeature);

            modelBuilder.Entity<TProject>(ConfigureProject);
            modelBuilder.Entity<TModule>(ConfigureModule);
            modelBuilder.Entity<TItem>(ConfigureItem);

            modelBuilder.Entity<TItemsRelationship>(ConfigureItemsRelationship);

            modelBuilder.Entity<TItemFeatureSetting>(ConfigureItemFeatureSetting);
        }

        protected virtual void ConfigureFeature(EntityTypeBuilder<TFeature> builder) { }

        protected virtual void ConfigureProject(EntityTypeBuilder<TProject> builder) { }
        protected virtual void ConfigureModule(EntityTypeBuilder<TModule> builder) { }
        protected virtual void ConfigureItem(EntityTypeBuilder<TItem> builder) { }

        protected virtual void ConfigureItemsRelationship(EntityTypeBuilder<TItemsRelationship> builder) { }

        protected virtual void ConfigureItemFeatureSetting(EntityTypeBuilder<TItemFeatureSetting> builder) { }
    }
}
