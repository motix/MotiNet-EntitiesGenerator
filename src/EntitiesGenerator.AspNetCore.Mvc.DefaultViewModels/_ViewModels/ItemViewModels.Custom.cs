using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace EntitiesGenerator.Mvc
{
    // Base
    partial class ItemViewModelBase
    {
        [Display(Name = nameof(Position), ResourceType = typeof(DisplayNames_Custom))]
        public int Position { get; set; }

        [LocalizedRequired]
        [Display(Name = nameof(DisplayName), ResourceType = typeof(DisplayNames_Custom))]
        public string DisplayName { get; set; }

        [Display(Name = nameof(ParameterListLineBreak), ResourceType = typeof(DisplayNames_Custom))]
        public bool ParameterListLineBreak { get; set; }

        [Display(Name = nameof(AbstractModel), ResourceType = typeof(DisplayNames_Custom))]
        public bool AbstractModel { get; set; }
    }

    // Full
    partial class ItemViewModel
    {
        // Customization

        public ModuleViewModel FullModule { get; set; }

        public EntityFeatureSettingViewModel EntityFeatureSetting { get; set; }

        public TimeTrackedEntityFeatureSettingViewModel TimeTrackedEntityFeatureSetting { get; set; }

        public CodeBasedEntityFeatureSettingViewModel CodeBasedEntityFeatureSetting { get; set; }

        public NameBasedEntityFeatureSettingViewModel NameBasedEntityFeatureSetting { get; set; }

        public ScopedNameBasedEntityFeatureSettingViewModel ScopedNameBasedEntityFeatureSetting { get; set; }

        public ReadableIdEntityFeatureSettingViewModel ReadableIdEntityFeatureSetting { get; set; }

        public OnOffEntityFeatureSettingViewModel OnOffEntityFeatureSetting { get; set; }

        public ChildEntityFeatureSettingViewModel ChildEntityFeatureSetting { get; set; }

        public PreprocessedEntityFeatureSettingViewModel PreprocessedEntityFeatureSetting { get; set; }

        public void CollectFeatureSettings()
        {
            FeatureSettings = new List<FeatureSettingLiteViewModel>
            {
                EntityFeatureSetting,
                TimeTrackedEntityFeatureSetting,
                CodeBasedEntityFeatureSetting,
                NameBasedEntityFeatureSetting,
                ScopedNameBasedEntityFeatureSetting,
                ReadableIdEntityFeatureSetting,
                OnOffEntityFeatureSetting,
                ChildEntityFeatureSetting,
                PreprocessedEntityFeatureSetting
            };

            FeatureSettings = FeatureSettings.Where(x => x != null).ToList();
        }

        public void DistributeFeatureSettings()
        {
            foreach (var setting in FeatureSettings)
            {
                switch (setting)
                {
                    case EntityFeatureSettingViewModel viewModel:
                        EntityFeatureSetting = viewModel;
                        break;
                    case TimeTrackedEntityFeatureSettingViewModel viewModel:
                        TimeTrackedEntityFeatureSetting = viewModel;
                        break;
                    case CodeBasedEntityFeatureSettingViewModel viewModel:
                        CodeBasedEntityFeatureSetting = viewModel;
                        break;
                    case NameBasedEntityFeatureSettingViewModel viewModel:
                        NameBasedEntityFeatureSetting = viewModel;
                        break;
                    case ScopedNameBasedEntityFeatureSettingViewModel viewModel:
                        ScopedNameBasedEntityFeatureSetting = viewModel;
                        break;
                    case ReadableIdEntityFeatureSettingViewModel viewModel:
                        ReadableIdEntityFeatureSetting = viewModel;
                        break;
                    case OnOffEntityFeatureSettingViewModel viewModel:
                        OnOffEntityFeatureSetting = viewModel;
                        break;
                    case ChildEntityFeatureSettingViewModel viewModel:
                        ChildEntityFeatureSetting = viewModel;
                        break;
                    case PreprocessedEntityFeatureSettingViewModel viewModel:
                        PreprocessedEntityFeatureSetting = viewModel;
                        break;
                    default:
                        throw new NotImplementedException();
                }
            }
        }
    }
}
