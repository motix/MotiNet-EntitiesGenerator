using EntitiesGenerator;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class SealedModelsEntitiesGeneratorBuilderExtensions
    {
        public static EntitiesGeneratorBuilder AddEntitiesGeneratorWithSealedModels(this IServiceCollection services)
            => services.AddEntitiesGenerator<Project, Module, Item,
                                             FeatureSettingBase,
                                             ItemsRelationship>()
                       .AddSealedModels();

        public static EntitiesGeneratorBuilder AddSealedModels(this EntitiesGeneratorBuilder builder)
        {
            // DomainSpecificTypes

            builder.DomainSpecificTypes.Add(nameof(EntityFeatureSetting), typeof(EntityFeatureSetting));
            builder.DomainSpecificTypes.Add(nameof(TimeTrackedEntityFeatureSetting), typeof(TimeTrackedEntityFeatureSetting));

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
                typeof(IFeatureSettingAccessor<>).MakeGenericType(builder.FeatureSettingType),
                typeof(FeatureSettingAccessor));

            services.TryAddScoped(
                typeof(IItemsRelationshipAccessor<>).MakeGenericType(builder.ItemsRelationshipType),
                typeof(ItemsRelationshipAccessor));

            return builder;
        }
    }
}
