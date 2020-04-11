using System;
using System.ComponentModel.DataAnnotations;

namespace EntitiesGenerator.Mvc
{
    public abstract class FeatureSettingBaseViewModel
    {
        protected FeatureSettingBaseViewModel() => Id = Guid.NewGuid().ToString();

        public string Id { get; set; }

        [LocalizedRequired]
        [Display(Name = nameof(Item), ResourceType = typeof(DisplayNames))]
        public string ItemId { get; set; }

        [Display(Name = nameof(Item), ResourceType = typeof(DisplayNames))]
        public ItemLiteViewModel Item { get; set; }
    }

    public class EntityFeatureSettingViewModel : FeatureSettingBaseViewModel { }

    public class TimeTrackedEntityFeatureSettingViewModel : FeatureSettingBaseViewModel { }
}
