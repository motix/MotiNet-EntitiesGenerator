using MotiNet.AutoMapper;

namespace EntitiesGenerator.Mvc
{
    partial class EntitiesGeneratorProfile
    {
        protected virtual void ConstructorInternal(EntitiesGeneratorBuilder builder)
        {
            CreateMap(builder.ItemType, typeof(ItemViewModel))
                .SwapMemberWithOrderedMember(nameof(ItemViewModel.FeatureSettings));

            CreateMap(builder.FeatureSettingType, typeof(FeatureSettingViewModel))
                .IncludeAllDerived()
                .ReverseMap()
                .IncludeAllDerived();

            CreateMap(builder.DomainSpecificTypes[nameof(EntityFeatureSettingViewModel).Replace("ViewModel", string.Empty)],
                      typeof(EntityFeatureSettingViewModel))
                .ReverseMap();
            CreateMap(builder.DomainSpecificTypes[nameof(TimeTrackedEntityFeatureSettingViewModel).Replace("ViewModel", string.Empty)],
                      typeof(TimeTrackedEntityFeatureSettingViewModel))
                .ReverseMap();
            CreateMap(builder.DomainSpecificTypes[nameof(CodeBasedEntityFeatureSettingViewModel).Replace("ViewModel", string.Empty)],
                      typeof(CodeBasedEntityFeatureSettingViewModel))
                .ReverseMap();
            CreateMap(builder.DomainSpecificTypes[nameof(NameBasedEntityFeatureSettingViewModel).Replace("ViewModel", string.Empty)],
                      typeof(NameBasedEntityFeatureSettingViewModel))
                .ReverseMap();
            CreateMap(builder.DomainSpecificTypes[nameof(ScopedNameBasedEntityFeatureSettingViewModel).Replace("ViewModel", string.Empty)],
                      typeof(ScopedNameBasedEntityFeatureSettingViewModel))
                .ReverseMap();
            CreateMap(builder.DomainSpecificTypes[nameof(ReadableIdEntityFeatureSettingViewModel).Replace("ViewModel", string.Empty)],
                      typeof(ReadableIdEntityFeatureSettingViewModel))
                .ReverseMap();
            CreateMap(builder.DomainSpecificTypes[nameof(OnOffEntityFeatureSettingViewModel).Replace("ViewModel", string.Empty)],
                      typeof(OnOffEntityFeatureSettingViewModel))
                .ReverseMap();
            CreateMap(builder.DomainSpecificTypes[nameof(ChildEntityFeatureSettingViewModel).Replace("ViewModel", string.Empty)],
                      typeof(ChildEntityFeatureSettingViewModel))
                .ReverseMap();
            CreateMap(builder.DomainSpecificTypes[nameof(PreprocessedEntityFeatureSettingViewModel).Replace("ViewModel", string.Empty)],
                      typeof(PreprocessedEntityFeatureSettingViewModel))
                .ReverseMap();
        }
    }
}
