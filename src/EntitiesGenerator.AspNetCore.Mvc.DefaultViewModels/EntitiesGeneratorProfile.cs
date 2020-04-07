using AutoMapper;
using MotiNet.AutoMapper;

namespace EntitiesGenerator.Mvc
{
    public class EntitiesGeneratorProfile : Profile
    {
        public EntitiesGeneratorProfile(EntitiesGeneratorBuilder builder)
        {
            CreateMap(builder.FeatureType, typeof(FeatureViewModel))
                .ReverseMap();
            CreateMap(builder.FeatureType, typeof(FeatureLiteViewModel));

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

            CreateMap(builder.ItemsRelationshipType, typeof(ItemsRelationshipViewModel))
                .ReverseMap();

            CreateMap(builder.DomainSpecificTypes[nameof(ItemFeatureSettingViewModel).Replace("ViewModel", string.Empty)],
                      typeof(ItemFeatureSettingViewModel))
                .ReverseMap();
        }
    }
}
