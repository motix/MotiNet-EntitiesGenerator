using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection.Extensions;
using EntitiesGenerator;
using EntitiesGenerator.EntityFrameworkCore;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class EntityFrameworkCoreEntitiesGeneratorBuilderExtensions
    {
        public static EntitiesGeneratorBuilder AddEntityFrameworkCoreWithSealedModels<TContext>(this EntitiesGeneratorBuilder builder)
            where TContext : DbContext
        {
            var services = builder.Services;
            var contextType = typeof(TContext);

            services.TryAddScoped(
                typeof(IFeatureStore<>).MakeGenericType(builder.FeatureType),
                typeof(FeatureStore<>).MakeGenericType(contextType));
            services.TryAddScoped(
                typeof(IFeatureAccessor<>).MakeGenericType(builder.FeatureType),
                typeof(FeatureStore<>).MakeGenericType(contextType));

            services.TryAddScoped(
                typeof(IProjectStore<>).MakeGenericType(builder.ProjectType),
                typeof(ProjectStore<>).MakeGenericType(contextType));
            services.TryAddScoped(
                typeof(IProjectAccessor<>).MakeGenericType(builder.ProjectType),
                typeof(ProjectStore<>).MakeGenericType(contextType));

            services.TryAddScoped(
                typeof(IModuleStore<,>).MakeGenericType(builder.ModuleType, builder.ProjectType),
                typeof(ModuleStore<>).MakeGenericType(contextType));
            services.TryAddScoped(
                typeof(IModuleAccessor<,>).MakeGenericType(builder.ModuleType, builder.ProjectType),
                typeof(ModuleStore<>).MakeGenericType(contextType));

            services.TryAddScoped(
                typeof(IItemStore<,>).MakeGenericType(builder.ItemType, builder.ModuleType),
                typeof(ItemStore<>).MakeGenericType(contextType));
            services.TryAddScoped(
                typeof(IItemAccessor<,>).MakeGenericType(builder.ItemType, builder.ModuleType),
                typeof(ItemStore<>).MakeGenericType(contextType));

            services.TryAddScoped(
                typeof(IItemsRelationshipStore<>).MakeGenericType(builder.ItemsRelationshipType),
                typeof(ItemsRelationshipStore<>).MakeGenericType(contextType));
            services.TryAddScoped(
                typeof(IItemsRelationshipAccessor<>).MakeGenericType(builder.ItemsRelationshipType),
                typeof(ItemsRelationshipStore<>).MakeGenericType(contextType));

            return builder;
        }
    }
}
