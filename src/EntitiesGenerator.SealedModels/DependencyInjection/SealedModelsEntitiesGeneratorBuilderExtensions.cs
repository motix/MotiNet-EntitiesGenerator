﻿using EntitiesGenerator;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class SealedModelsEntitiesGeneratorBuilderExtensions
    {
        public static EntitiesGeneratorBuilder AddEntitiesGeneratorWithSealedModels(this IServiceCollection services)
            => services.AddEntitiesGenerator<Project, Module, Item,
                                             FeatureSetting,
                                             ItemsRelationship>()
                       .AddSealedModels();

        public static EntitiesGeneratorBuilder AddSealedModels(this EntitiesGeneratorBuilder builder)
        {
            // DomainSpecificTypes

            builder.DomainSpecificTypes.Add(nameof(EntityFeatureSetting), typeof(EntityFeatureSetting));
            builder.DomainSpecificTypes.Add(nameof(TimeTrackedEntityFeatureSetting), typeof(TimeTrackedEntityFeatureSetting));
            builder.DomainSpecificTypes.Add(nameof(CodeBasedEntityFeatureSetting), typeof(CodeBasedEntityFeatureSetting));
            builder.DomainSpecificTypes.Add(nameof(NameBasedEntityFeatureSetting), typeof(NameBasedEntityFeatureSetting));
            builder.DomainSpecificTypes.Add(nameof(ScopedNameBasedEntityFeatureSetting), typeof(ScopedNameBasedEntityFeatureSetting));
            builder.DomainSpecificTypes.Add(nameof(ReadableIdEntityFeatureSetting), typeof(ReadableIdEntityFeatureSetting));
            builder.DomainSpecificTypes.Add(nameof(OnOffEntityFeatureSetting), typeof(OnOffEntityFeatureSetting));
            builder.DomainSpecificTypes.Add(nameof(PreprocessedEntityFeatureSetting), typeof(PreprocessedEntityFeatureSetting));

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
