using EntitiesGenerator;
using EntitiesGenerator.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace Microsoft.Extensions.DependencyInjection
{
    public static partial class EntityFrameworkCoreEntitiesGeneratorBuilderExtensions
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
                typeof(IFeatureSettingStore<,>).MakeGenericType(builder.FeatureSettingType, builder.ItemType),
                typeof(FeatureSettingStore<>).MakeGenericType(contextType));

            services.TryAddScoped(
                typeof(IItemsRelationshipStore<,>).MakeGenericType(builder.ItemsRelationshipType, builder.ModuleType),
                typeof(ItemsRelationshipStore<>).MakeGenericType(contextType));

            var internalMethod = typeof(EntityFrameworkCoreEntitiesGeneratorBuilderExtensions).GetMethod("AddEntityFrameworkCoreWithSealedModelsInternal",
                System.Reflection.BindingFlags.Static | System.Reflection.BindingFlags.NonPublic);

            if (internalMethod != null)
            {
                internalMethod = internalMethod.MakeGenericMethod(typeof(TContext));
                internalMethod.Invoke(null, new object[] { builder });
            }

            return builder;
        }
    }
}
