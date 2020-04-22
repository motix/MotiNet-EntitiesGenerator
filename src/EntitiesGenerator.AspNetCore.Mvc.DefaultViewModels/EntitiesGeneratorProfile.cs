using AutoMapper;
using MotiNet.AutoMapper;

namespace EntitiesGenerator.Mvc
{
    public partial class EntitiesGeneratorProfile : Profile
    {
        public EntitiesGeneratorProfile(EntitiesGeneratorBuilder builder)
        {
            CreateMap(builder.ProjectType, typeof(ProjectViewModel))
                .SwapMemberWithOrderedMember(nameof(ProjectViewModel.Modules))
                .ReverseMap();
            CreateMap(builder.ProjectType, typeof(ProjectLiteViewModel));

            CreateMap(builder.ModuleType, typeof(ModuleViewModel))
                .SwapMemberWithOrderedMember(nameof(ModuleViewModel.Items))
                .SwapMemberWithOrderedMember(nameof(ModuleViewModel.ItemsRelationships))
                .ReverseMap();
            CreateMap(builder.ModuleType, typeof(ModuleLiteViewModel));

            CreateMap(builder.ItemType, typeof(ItemViewModel))
                .ReverseMap();
            CreateMap(builder.ItemType, typeof(ItemLiteViewModel));

            CreateMap(builder.FeatureSettingType, typeof(FeatureSettingViewModel))
                .ReverseMap();
            CreateMap(builder.FeatureSettingType, typeof(FeatureSettingLiteViewModel));

            CreateMap(builder.ItemsRelationshipType, typeof(ItemsRelationshipViewModel))
                .ReverseMap();
            CreateMap(builder.ItemsRelationshipType, typeof(ItemsRelationshipLiteViewModel));

            var internalMethod = GetType().GetMethod("ConstructorInternal",
                System.Reflection.BindingFlags.Instance | System.Reflection.BindingFlags.NonPublic);

            if (internalMethod != null)
            {
                internalMethod.Invoke(this, new object[] { builder });
            }
        }
    }
}
