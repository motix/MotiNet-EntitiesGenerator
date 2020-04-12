using AutoMapper;
using MotiNet.AutoMapper;

namespace EntitiesGenerator.Mvc
{
    public class EntitiesGeneratorProfile : Profile
    {
        public EntitiesGeneratorProfile(EntitiesGeneratorBuilder builder)
        {
            CreateMap(builder.ProjectType, typeof(ProjectViewModel))
                .SwapMemberWithOrderedMember(nameof(ProjectViewModel.Modules))
                .ReverseMap();
            CreateMap(builder.ProjectType, typeof(ProjectLiteViewModel));

            CreateMap(builder.ModuleType, typeof(ModuleViewModel))
                .SwapMemberWithOrderedMember(nameof(ModuleViewModel.Items))
                .ReverseMap();
            CreateMap(builder.ModuleType, typeof(ModuleLiteViewModel));

            CreateMap(builder.ItemType, typeof(ItemViewModel))
                .SwapMemberWithOrderedMember(nameof(ItemViewModel.FeatureSettings))
                .ReverseMap();
            CreateMap(builder.ItemType, typeof(ItemLiteViewModel));

            CreateMap(builder.FeatureSettingType, typeof(FeatureSettingBaseViewModel))
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
            CreateMap(builder.DomainSpecificTypes[nameof(PreprocessedEntityFeatureSettingViewModel).Replace("ViewModel", string.Empty)],
                      typeof(PreprocessedEntityFeatureSettingViewModel))
                .ReverseMap();

            CreateMap(builder.ItemsRelationshipType, typeof(ItemsRelationshipViewModel))
                .ReverseMap();
        }
    }
}
