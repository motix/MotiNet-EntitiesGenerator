using EntitiesGenerator;

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

            return builder;
        }
    }
}
