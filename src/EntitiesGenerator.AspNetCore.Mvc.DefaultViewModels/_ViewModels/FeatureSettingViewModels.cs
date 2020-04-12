using System;
using System.ComponentModel.DataAnnotations;

namespace EntitiesGenerator.Mvc
{
    public abstract partial class FeatureSettingBaseViewModel
    {
        protected FeatureSettingBaseViewModel() => Id = Guid.NewGuid().ToString();

        public string Id { get; set; }

        [LocalizedRequired]
        [Display(Name = nameof(Item), ResourceType = typeof(DisplayNames))]
        public string ItemId { get; set; }

        [Display(Name = nameof(Item), ResourceType = typeof(DisplayNames))]
        public ItemLiteViewModel Item { get; set; }

        // Customizations

        public string Type => GetType().Name.Replace("FeatureSettingViewModel", string.Empty);
    }

    public class EntityFeatureSettingViewModel : FeatureSettingBaseViewModel
    {
        [Display(Name = nameof(ParameterListLineBreak), ResourceType = typeof(DisplayNames))]
        public bool ParameterListLineBreak { get; set; }
    }

    public class TimeTrackedEntityFeatureSettingViewModel : FeatureSettingBaseViewModel { }
}
