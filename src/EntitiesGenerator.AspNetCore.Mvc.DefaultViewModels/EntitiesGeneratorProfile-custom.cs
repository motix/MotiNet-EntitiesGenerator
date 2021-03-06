﻿namespace EntitiesGenerator.Mvc
{
    partial class EntitiesGeneratorProfile
    {
        protected virtual void ConstructorInternal(EntitiesGeneratorBuilder builder)
        {
            CreateMap(builder.FeatureSettingType, typeof(FeatureSettingLiteViewModel))
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
            CreateMap(builder.DomainSpecificTypes[nameof(InterModuleEntityFeatureSettingViewModel).Replace("ViewModel", string.Empty)],
                      typeof(InterModuleEntityFeatureSettingViewModel))
                .ReverseMap();

            CreateMap(builder.ItemsRelationshipType, typeof(ItemsRelationshipLiteViewModel))
                .IncludeAllDerived()
                .ReverseMap()
                .IncludeAllDerived();

            CreateMap(builder.DomainSpecificTypes[nameof(OneToManyItemsRelationshipViewModel).Replace("ViewModel", string.Empty)],
                      typeof(OneToManyItemsRelationshipViewModel))
                .ReverseMap();
            CreateMap(builder.DomainSpecificTypes[nameof(ManyToManyItemsRelationshipViewModel).Replace("ViewModel", string.Empty)],
                      typeof(ManyToManyItemsRelationshipViewModel))
                .ReverseMap();
        }
    }
}
