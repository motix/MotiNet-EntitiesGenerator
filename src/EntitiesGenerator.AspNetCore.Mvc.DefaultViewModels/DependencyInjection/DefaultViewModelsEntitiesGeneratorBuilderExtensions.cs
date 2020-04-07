using AutoMapper;
using EntitiesGenerator;
using EntitiesGenerator.Mvc;
using System;
using System.Reflection;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class DefaultViewModelsEntitiesGeneratorBuilderExtensions
    {
        public static EntitiesGeneratorProfile GetDefaultViewModelsProfile(this EntitiesGeneratorBuilder builder)
            => new EntitiesGeneratorProfile(builder);

        public static EntitiesGeneratorBuilder AddDefaultViewModels(this EntitiesGeneratorBuilder builder)
        {
            builder.Services.AddAutoMapper(config =>
            {
                config.AddProfile(builder.GetDefaultViewModelsProfile());
            }, Array.Empty<Assembly>());

            return builder;
        }
    }
}
