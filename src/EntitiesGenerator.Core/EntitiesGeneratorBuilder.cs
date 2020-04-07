using Microsoft.Extensions.DependencyInjection;
using MotiNet.Entities;
using System;

namespace EntitiesGenerator
{
    public class EntitiesGeneratorBuilder : BuilderBase
    {
        public EntitiesGeneratorBuilder(
            IServiceCollection services,
            Type featureType,
            Type projectType, Type moduleType, Type itemType,
            Type itemsRelationshipType)
            : base(services)
            => BuilderHelper.ConstructBuilder(
                this, typeof(EntitiesGeneratorBuilder).GetConstructors()[0],
                services,
                featureType,
                projectType, moduleType, itemType,
                itemsRelationshipType);

        #region Properties

        public Type FeatureType { get; private set; }

        public Type ProjectType { get; private set; }

        public Type ModuleType { get; private set; }

        public Type ItemType { get; private set; }

        public Type ItemsRelationshipType { get; private set; }

        #endregion
    }
}
