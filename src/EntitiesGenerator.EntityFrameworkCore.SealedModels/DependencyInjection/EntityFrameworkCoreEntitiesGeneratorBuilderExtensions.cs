using EntitiesGenerator;
using EntitiesGenerator.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection.Extensions;

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
                typeof(IProjectStore<>).MakeGenericType(builder.ProjectType),
                typeof(ProjectStore<>).MakeGenericType(contextType));

            services.TryAddScoped(
                typeof(IModuleStore<,>).MakeGenericType(builder.ModuleType, builder.ProjectType),
                typeof(ModuleStore<>).MakeGenericType(contextType));

            services.TryAddScoped(
                typeof(IItemStore<,>).MakeGenericType(builder.ItemType, builder.ModuleType),
                typeof(ItemStore<>).MakeGenericType(contextType));

            services.TryAddScoped(
                typeof(IFeatureSettingStore<>).MakeGenericType(builder.FeatureSettingType),
                typeof(FeatureSettingStore<>).MakeGenericType(contextType));

            services.TryAddScoped(
                typeof(IItemsRelationshipStore<>).MakeGenericType(builder.ItemsRelationshipType),
                typeof(ItemsRelationshipStore<>).MakeGenericType(contextType));

            return builder;
        }
    }
}
