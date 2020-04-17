using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace EntitiesGenerator.Mvc
{
    // Base
    public abstract class ItemViewModelBase
    {
        protected ItemViewModelBase() => Id = Guid.NewGuid().ToString();

        public string Id { get; set; }

        [LocalizedRequired]
        [Display(Name = "Module", ResourceType = typeof(DisplayNames))]
        public string ModuleId { get; set; }

        [Display(Name = nameof(Position), ResourceType = typeof(DisplayNames))]
        public int Position { get; set; }

        [LocalizedRequired]
        [Display(Name = nameof(Name), ResourceType = typeof(DisplayNames))]
        public string Name { get; set; }

        [LocalizedRequired]
        [Display(Name = nameof(DisplayName), ResourceType = typeof(DisplayNames))]
        public string DisplayName { get; set; }

        [Display(Name = nameof(ParameterListLineBreak), ResourceType = typeof(DisplayNames))]
        public bool ParameterListLineBreak { get; set; }

        [Display(Name = nameof(AbstractModel), ResourceType = typeof(DisplayNames))]
        public bool AbstractModel { get; set; }
    }

    // Full
    public partial class ItemViewModel : ItemViewModelBase
    {
        [Display(Name = nameof(Module), ResourceType = typeof(DisplayNames))]
        public ModuleLiteViewModel Module { get; set; }

        [Display(Name = nameof(FeatureSettings), ResourceType = typeof(DisplayNames))]
        public ICollection<FeatureSettingViewModel> FeatureSettings { get; set; }
    }

    // Customization
    partial class ItemViewModel
    {
        public EntityFeatureSettingViewModel EntityFeatureSetting { get; set; }

        public TimeTrackedEntityFeatureSettingViewModel TimeTrackedEntityFeatureSetting { get; set; }

        public CodeBasedEntityFeatureSettingViewModel CodeBasedEntityFeatureSetting { get; set; }

        public NameBasedEntityFeatureSettingViewModel NameBasedEntityFeatureSetting { get; set; }

        public ScopedNameBasedEntityFeatureSettingViewModel ScopedNameBasedEntityFeatureSetting { get; set; }

        public ReadableIdEntityFeatureSettingViewModel ReadableIdEntityFeatureSetting { get; set; }

        public OnOffEntityFeatureSettingViewModel OnOffEntityFeatureSetting { get; set; }

        public PreprocessedEntityFeatureSettingViewModel PreprocessedEntityFeatureSetting { get; set; }

        public void CollectFeatureSettings()
        {
            FeatureSettings = new List<FeatureSettingViewModel>
            {
                EntityFeatureSetting,
                TimeTrackedEntityFeatureSetting,
                CodeBasedEntityFeatureSetting,
                NameBasedEntityFeatureSetting,
                ScopedNameBasedEntityFeatureSetting,
                ReadableIdEntityFeatureSetting,
                OnOffEntityFeatureSetting,
                PreprocessedEntityFeatureSetting
            };

            FeatureSettings = FeatureSettings.Where(x => x != null).ToList();
        }

        public void DistributeFeatureSettings()
        {
            foreach (var setting in FeatureSettings)
            {
                if (setting is EntityFeatureSettingViewModel)
                {
                    EntityFeatureSetting = (EntityFeatureSettingViewModel)setting;
                }
                else if (setting is TimeTrackedEntityFeatureSettingViewModel)
                {
                    TimeTrackedEntityFeatureSetting = (TimeTrackedEntityFeatureSettingViewModel)setting;
                }
                else if (setting is CodeBasedEntityFeatureSettingViewModel)
                {
                    CodeBasedEntityFeatureSetting = (CodeBasedEntityFeatureSettingViewModel)setting;
                }
                else if (setting is NameBasedEntityFeatureSettingViewModel)
                {
                    NameBasedEntityFeatureSetting = (NameBasedEntityFeatureSettingViewModel)setting;
                }
                else if (setting is ScopedNameBasedEntityFeatureSettingViewModel)
                {
                    ScopedNameBasedEntityFeatureSetting = (ScopedNameBasedEntityFeatureSettingViewModel)setting;
                }
                else if (setting is ReadableIdEntityFeatureSettingViewModel)
                {
                    ReadableIdEntityFeatureSetting = (ReadableIdEntityFeatureSettingViewModel)setting;
                }
                else if (setting is OnOffEntityFeatureSettingViewModel)
                {
                    OnOffEntityFeatureSetting = (OnOffEntityFeatureSettingViewModel)setting;
                }
                else if (setting is PreprocessedEntityFeatureSettingViewModel)
                {
                    PreprocessedEntityFeatureSetting = (PreprocessedEntityFeatureSettingViewModel)setting;
                }
                else
                {
                    throw new NotImplementedException();
                }
            }
        }
    }

    // Lite
    public class ItemLiteViewModel : ItemViewModelBase { }
}
