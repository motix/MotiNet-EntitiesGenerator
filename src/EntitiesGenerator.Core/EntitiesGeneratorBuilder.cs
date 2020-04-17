using Microsoft.Extensions.DependencyInjection;
using MotiNet.Entities;
using System;

namespace EntitiesGenerator
{
    public class EntitiesGeneratorBuilder : BuilderBase
    {
        public EntitiesGeneratorBuilder(
            IServiceCollection services,
            Type projectType, Type moduleType, Type itemType,
            Type featureSettingType,
            Type itemsRelationshipType)
            : base(services)
            => BuilderHelper.ConstructBuilder(
                this, typeof(EntitiesGeneratorBuilder).GetConstructors()[0],
                services,
                projectType, moduleType, itemType,
                featureSettingType,
                itemsRelationshipType);

        public Type ProjectType { get; private set; }

        public Type ModuleType { get; private set; }

        public Type ItemType { get; private set; }

        public Type FeatureSettingType { get; private set; }

        public Type ItemsRelationshipType { get; private set; }
    }
}
