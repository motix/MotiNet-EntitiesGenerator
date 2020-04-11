using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;

namespace EntitiesGenerator.EntityFrameworkCore
{
    public abstract class EntitiesGeneratorDbContextBase<
        TProject, TModule, TItem,
        TFeatureSetting,
        TItemsRelationship,
        // Key
        TKey>
        : DbContext
        where TProject : class
        where TModule : class
        where TItem: class
        where TFeatureSetting: class
        where TItemsRelationship : class
        // Key
        where TKey : IEquatable<TKey>
    {
        protected EntitiesGeneratorDbContextBase(DbContextOptions options) : base(options) { }

        protected EntitiesGeneratorDbContextBase() { }

        public DbSet<TProject> Projects { get; set; }
        public DbSet<TModule> Modules { get; set; }
        public DbSet<TItem> Items { get; set; }

        public DbSet<TFeatureSetting> FeatureSettings { get; set; }

        public DbSet<TItemsRelationship> ItemsRelationships { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TProject>(ConfigureProject);
            modelBuilder.Entity<TModule>(ConfigureModule);
            modelBuilder.Entity<TItem>(ConfigureItem);

            modelBuilder.Entity<TFeatureSetting>(ConfigureFeatureSetting);

            modelBuilder.Entity<TItemsRelationship>(ConfigureItemsRelationship);
        }

        protected virtual void ConfigureProject(EntityTypeBuilder<TProject> builder) { }
        protected virtual void ConfigureModule(EntityTypeBuilder<TModule> builder) { }
        protected virtual void ConfigureItem(EntityTypeBuilder<TItem> builder) { }

        protected virtual void ConfigureFeatureSetting(EntityTypeBuilder<TFeatureSetting> builder) { }

        protected virtual void ConfigureItemsRelationship(EntityTypeBuilder<TItemsRelationship> builder) { }
    }
}
