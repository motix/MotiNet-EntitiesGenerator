using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

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
    }

    // Full
    public partial class ItemViewModel : ItemViewModelBase
    {
        [Display(Name = nameof(Module), ResourceType = typeof(DisplayNames))]
        public ModuleLiteViewModel Module { get; set; }

        [Display(Name = nameof(FeatureSettings), ResourceType = typeof(DisplayNames))]
        public ICollection<FeatureSettingBaseViewModel> FeatureSettings { get; set; }
    }

    // Customization
    partial class ItemViewModel
    {
        public EntityFeatureSettingViewModel EntityFeatureSetting { get; set; }
    
        public TimeTrackedEntityFeatureSettingViewModel TimeTrackedEntityFeatureSetting { get; set; }

        public void CollectFeatureSettings()
        {
            FeatureSettings = new List<FeatureSettingBaseViewModel>();

            if (EntityFeatureSetting != null)
            {
                FeatureSettings.Add(EntityFeatureSetting);
            }

            if (TimeTrackedEntityFeatureSetting != null)
            {
                FeatureSettings.Add(TimeTrackedEntityFeatureSetting);
            }
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
