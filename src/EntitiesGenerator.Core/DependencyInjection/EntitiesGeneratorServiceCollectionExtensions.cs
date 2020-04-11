using Microsoft.Extensions.DependencyInjection.Extensions;
using MotiNet.Entities;
using EntitiesGenerator;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class EntitiesGeneratorServiceCollectionExtensions
    {
        public static EntitiesGeneratorBuilder AddEntitiesGenerator<TProject, TModule, TItem,
                                                                    TFeatureSetting,
                                                                    TItemsRelationship>(
            this IServiceCollection services)
            where TProject : class
            where TModule : class
            where TItem : class
            where TFeatureSetting : class
            where TItemsRelationship : class
        {
            services.TryAddScoped<IProjectManager<TProject>, ProjectManager<TProject>>();
            services.TryAddScoped<IValidator<TProject>, ProjectValidator<TProject>>();

            services.TryAddScoped<IModuleManager<TModule, TProject>, ModuleManager<TModule, TProject>>();
            services.TryAddScoped<IValidator<TModule, TProject>, ModuleValidator<TModule, TProject>>();

            services.TryAddScoped<IItemManager<TItem, TModule>, ItemManager<TItem, TModule>>();
            services.TryAddScoped<IValidator<TItem, TModule>, ItemValidator<TItem, TModule>>();

            services.TryAddScoped<IFeatureSettingManager<TFeatureSetting>, FeatureSettingManager<TFeatureSetting>>();

            services.TryAddScoped<IItemsRelationshipManager<TItemsRelationship>, ItemsRelationshipManager<TItemsRelationship>>();
            services.TryAddScoped<IValidator<TItemsRelationship>, DefaultValidator<TItemsRelationship, ItemsRelationshipManager<TItemsRelationship>>>();

            // Features

            services.TryAddScoped<ILookupNormalizer, LowerInvariantLookupNormalizer>();
            services.TryAddScoped<EntitiesGeneratorErrorDescriber, EntitiesGeneratorErrorDescriber>();

            return new EntitiesGeneratorBuilder(
                services,
                typeof(TProject), typeof(TModule), typeof(TItem),
                typeof(TFeatureSetting),
                typeof(TItemsRelationship));
        }
    }
}
