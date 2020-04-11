using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection.Extensions;
using EntitiesGenerator;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class AspNetEntitiesGeneratorBuilderExtensions
    {
        public static EntitiesGeneratorBuilder AddAspNetCore(this EntitiesGeneratorBuilder builder)
        {
            // Hosting doesn't add IHttpContextAccessor by default
            builder.Services.TryAddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            builder.Services.AddScoped(typeof(IProjectManager<>).MakeGenericType(builder.ProjectType), typeof(AspNetProjectManager<>).MakeGenericType(builder.ProjectType));
            builder.Services.AddScoped(typeof(IModuleManager<,>).MakeGenericType(builder.ModuleType, builder.ProjectType), typeof(AspNetModuleManager<,>).MakeGenericType(builder.ModuleType, builder.ProjectType));
            builder.Services.AddScoped(typeof(IItemManager<,>).MakeGenericType(builder.ItemType, builder.ModuleType), typeof(AspNetItemManager<,>).MakeGenericType(builder.ItemType, builder.ModuleType));

            builder.Services.AddScoped(typeof(IFeatureSettingManager<>).MakeGenericType(builder.FeatureSettingType), typeof(AspNetFeatureSettingManager<>).MakeGenericType(builder.FeatureSettingType));

            builder.Services.AddScoped(typeof(IItemsRelationshipManager<>).MakeGenericType(builder.ItemsRelationshipType), typeof(AspNetItemsRelationshipManager<>).MakeGenericType(builder.ItemsRelationshipType));

            return builder;
        }
    }
}
