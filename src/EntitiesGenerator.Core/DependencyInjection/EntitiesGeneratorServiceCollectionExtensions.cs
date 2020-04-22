using EntitiesGenerator;
using Microsoft.Extensions.DependencyInjection.Extensions;
using MotiNet.Entities;

namespace Microsoft.Extensions.DependencyInjection
{
    public static partial class EntitiesGeneratorServiceCollectionExtensions
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
            services.TryAddScoped<ILookupNormalizer<TProject>, LowerInvariantLookupNormalizer<TProject>>();

            services.TryAddScoped<IModuleManager<TModule, TProject>, ModuleManager<TModule, TProject>>();
            services.TryAddScoped<IValidator<TModule, TProject>, ModuleValidator<TModule, TProject>>();
            services.TryAddScoped<ILookupNormalizer<TModule>, LowerInvariantLookupNormalizer<TModule>>();

            services.TryAddScoped<IItemManager<TItem, TModule>, ItemManager<TItem, TModule>>();
            services.TryAddScoped<IValidator<TItem, TModule>, ItemValidator<TItem, TModule>>();
            services.TryAddScoped<ILookupNormalizer<TItem>, LowerInvariantLookupNormalizer<TItem>>();

            services.TryAddScoped<IFeatureSettingManager<TFeatureSetting, TItem>, FeatureSettingManager<TFeatureSetting, TItem>>();

            services.TryAddScoped<IItemsRelationshipManager<TItemsRelationship, TModule>, ItemsRelationshipManager<TItemsRelationship, TModule>>();

            services.TryAddScoped<EntitiesGeneratorErrorDescriber, EntitiesGeneratorErrorDescriber>();

            var internalMethod = typeof(EntitiesGeneratorServiceCollectionExtensions).GetMethod("AddEntitiesGeneratorInternal",
                System.Reflection.BindingFlags.Static | System.Reflection.BindingFlags.NonPublic);

            if (internalMethod != null)
            {
                internalMethod = internalMethod.MakeGenericMethod(typeof(TProject), typeof(TModule), typeof(TItem),
                                                                  typeof(TFeatureSetting),
                                                                  typeof(TItemsRelationship));
                internalMethod.Invoke(null, new object[] { services });
            }

            return new EntitiesGeneratorBuilder(
                services,
                typeof(TProject), typeof(TModule), typeof(TItem),
                typeof(TFeatureSetting),
                typeof(TItemsRelationship));
        }
    }
}
