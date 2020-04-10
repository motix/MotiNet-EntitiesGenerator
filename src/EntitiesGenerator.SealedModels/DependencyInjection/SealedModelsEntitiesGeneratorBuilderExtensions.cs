using EntitiesGenerator;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class SealedModelsEntitiesGeneratorBuilderExtensions
    {
        public static EntitiesGeneratorBuilder AddEntitiesGeneratorWithSealedModels(this IServiceCollection services)
            => services.AddEntitiesGenerator<Feature,
                                             Project, Module, Item,
                                             ItemsRelationship>()
                       .AddSealedModels();

        public static EntitiesGeneratorBuilder AddSealedModels(this EntitiesGeneratorBuilder builder)
        {
            // DomainSpecificTypes

            builder.DomainSpecificTypes.Add(nameof(ItemFeatureSetting), typeof(ItemFeatureSetting));

            var services = builder.Services;

            // Accessors

            services.TryAddScoped(
                typeof(IFeatureAccessor<>).MakeGenericType(builder.FeatureType),
                typeof(FeatureAccessor));

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
                typeof(IItemsRelationshipAccessor<>).MakeGenericType(builder.ItemsRelationshipType),
                typeof(ItemsRelationshipAccessor));

            return builder;
        }
    }
}
