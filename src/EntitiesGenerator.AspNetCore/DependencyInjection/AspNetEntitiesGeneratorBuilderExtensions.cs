using EntitiesGenerator;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class AspNetEntitiesGeneratorBuilderExtensions
    {
        public static EntitiesGeneratorBuilder AddAspNetCore(this EntitiesGeneratorBuilder builder)
        {
            var services = builder.Services;

            // Hosting doesn't add IHttpContextAccessor by default
            services.TryAddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            services.AddScoped(
                typeof(IProjectManager<>).MakeGenericType(builder.ProjectType),
                typeof(AspNetProjectManager<>).MakeGenericType(builder.ProjectType));

            services.AddScoped(
                typeof(IModuleManager<,>).MakeGenericType(builder.ModuleType, builder.ProjectType),
                typeof(AspNetModuleManager<,>).MakeGenericType(builder.ModuleType, builder.ProjectType));

            services.AddScoped(
                typeof(IItemManager<,>).MakeGenericType(builder.ItemType, builder.ModuleType),
                typeof(AspNetItemManager<,>).MakeGenericType(builder.ItemType, builder.ModuleType));

            services.AddScoped(
                typeof(IFeatureSettingManager<,>).MakeGenericType(builder.FeatureSettingType, builder.ItemType),
                typeof(AspNetFeatureSettingManager<,>).MakeGenericType(builder.FeatureSettingType, builder.ItemType));

            services.AddScoped(
                typeof(IItemsRelationshipManager<,>).MakeGenericType(builder.ItemsRelationshipType, builder.ModuleType),
                typeof(AspNetItemsRelationshipManager<,>).MakeGenericType(builder.ItemsRelationshipType, builder.ModuleType));

            var internalMethod = typeof(AspNetEntitiesGeneratorBuilderExtensions).GetMethod("AddAspNetCoreInternal",
                System.Reflection.BindingFlags.Static | System.Reflection.BindingFlags.NonPublic);

            if (internalMethod != null)
            {
                internalMethod.Invoke(null, new object[] { builder });
            }

            return builder;
        }
    }
}
