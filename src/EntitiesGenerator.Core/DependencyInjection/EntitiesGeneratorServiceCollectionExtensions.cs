using Microsoft.Extensions.DependencyInjection.Extensions;
using MotiNet.Entities;
using EntitiesGenerator;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class EntitiesGeneratorServiceCollectionExtensions
    {
        public static EntitiesGeneratorBuilder AddEntitiesGenerator<TFeature,
                                                                    TProject, TModule, TItem,
                                                                    TItemsRelationship>(
            this IServiceCollection services)
            where TFeature : class
            where TProject : class
            where TModule : class
            where TItem : class
            where TItemsRelationship : class
        {
            services.TryAddScoped<IFeatureManager<TFeature>, FeatureManager<TFeature>>();
            services.TryAddScoped<IValidator<TFeature>, FeatureValidator<TFeature>>();

            services.TryAddScoped<IProjectManager<TProject>, ProjectManager<TProject>>();
            services.TryAddScoped<IValidator<TProject>, ProjectValidator<TProject>>();

            services.TryAddScoped<IModuleManager<TModule, TProject>, ModuleManager<TModule, TProject>>();
            services.TryAddScoped<IValidator<TModule, TProject>, ModuleValidator<TModule, TProject>>();

            services.TryAddScoped<IItemManager<TItem, TModule>, ItemManager<TItem, TModule>>();
            services.TryAddScoped<IValidator<TItem, TModule>, ItemValidator<TItem, TModule>>();

            services.TryAddScoped<IItemsRelationshipManager<TItemsRelationship>, ItemsRelationshipManager<TItemsRelationship>>();
            services.TryAddScoped<IValidator<TItemsRelationship>, DefaultValidator<TItemsRelationship, ItemsRelationshipManager<TItemsRelationship>>>();

            // Features

            services.TryAddScoped<ILookupNormalizer, LowerInvariantLookupNormalizer>();
            services.TryAddScoped<EntitiesGeneratorErrorDescriber, EntitiesGeneratorErrorDescriber>();

            return new EntitiesGeneratorBuilder(
                services,
                typeof(TFeature),
                typeof(TProject), typeof(TModule), typeof(TItem),
                typeof(TItemsRelationship));
        }
    }
}
