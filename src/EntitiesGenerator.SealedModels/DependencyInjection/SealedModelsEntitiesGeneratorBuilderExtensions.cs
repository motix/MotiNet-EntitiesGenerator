using EntitiesGenerator;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace Microsoft.Extensions.DependencyInjection
{
    public static partial class SealedModelsEntitiesGeneratorBuilderExtensions
    {
        public static EntitiesGeneratorBuilder AddEntitiesGeneratorWithSealedModels(this IServiceCollection services)
            => services.AddEntitiesGenerator<Project, Module, Item,
                                             FeatureSetting,
                                             ItemsRelationship>()
                       .AddSealedModels();

        public static EntitiesGeneratorBuilder AddSealedModels(this EntitiesGeneratorBuilder builder)
        {
            var services = builder.Services;

            services.TryAddScoped(
                typeof(IProjectAccessor<>).MakeGenericType(builder.ProjectType),
                typeof(ProjectAccessor));

            services.TryAddScoped(
                typeof(IModuleAccessor<,>).MakeGenericType(builder.ModuleType, builder.ProjectType),
                typeof(ModuleAccessor));

            services.TryAddScoped(
                typeof(IItemAccessor<,>).MakeGenericType(builder.ItemType, builder.ModuleType),
                typeof(ItemAccessor));

            services.TryAddScoped(
                typeof(IFeatureSettingAccessor<,>).MakeGenericType(builder.FeatureSettingType, builder.ItemType),
                typeof(FeatureSettingAccessor));

            services.TryAddScoped(
                typeof(IItemsRelationshipAccessor<,>).MakeGenericType(builder.ItemsRelationshipType, builder.ModuleType),
                typeof(ItemsRelationshipAccessor));

            var internalMethod = typeof(SealedModelsEntitiesGeneratorBuilderExtensions).GetMethod("AddSealedModelsInternal",
                System.Reflection.BindingFlags.Static | System.Reflection.BindingFlags.NonPublic);

            if (internalMethod != null)
            {
                internalMethod.Invoke(null, new object[] { builder });
            }

            return builder;
        }
    }
}
