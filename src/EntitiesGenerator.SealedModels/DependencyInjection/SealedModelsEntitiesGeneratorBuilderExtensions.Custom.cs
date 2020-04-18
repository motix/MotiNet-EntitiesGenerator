using EntitiesGenerator;

namespace Microsoft.Extensions.DependencyInjection
{
    partial class SealedModelsEntitiesGeneratorBuilderExtensions
    {
        private static EntitiesGeneratorBuilder AddSealedModelsInternal(this EntitiesGeneratorBuilder builder)
        {
            builder.DomainSpecificTypes.Add(nameof(EntityFeatureSetting), typeof(EntityFeatureSetting));
            builder.DomainSpecificTypes.Add(nameof(TimeTrackedEntityFeatureSetting), typeof(TimeTrackedEntityFeatureSetting));
            builder.DomainSpecificTypes.Add(nameof(CodeBasedEntityFeatureSetting), typeof(CodeBasedEntityFeatureSetting));
            builder.DomainSpecificTypes.Add(nameof(NameBasedEntityFeatureSetting), typeof(NameBasedEntityFeatureSetting));
            builder.DomainSpecificTypes.Add(nameof(ScopedNameBasedEntityFeatureSetting), typeof(ScopedNameBasedEntityFeatureSetting));
            builder.DomainSpecificTypes.Add(nameof(ReadableIdEntityFeatureSetting), typeof(ReadableIdEntityFeatureSetting));
            builder.DomainSpecificTypes.Add(nameof(OnOffEntityFeatureSetting), typeof(OnOffEntityFeatureSetting));
            builder.DomainSpecificTypes.Add(nameof(ChildEntityFeatureSetting), typeof(ChildEntityFeatureSetting));
            builder.DomainSpecificTypes.Add(nameof(PreprocessedEntityFeatureSetting), typeof(PreprocessedEntityFeatureSetting));

            return builder;
        }
    }
}
