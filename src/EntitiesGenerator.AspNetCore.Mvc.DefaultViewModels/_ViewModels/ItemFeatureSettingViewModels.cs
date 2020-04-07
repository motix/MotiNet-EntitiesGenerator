using System.ComponentModel.DataAnnotations;

namespace EntitiesGenerator.Mvc
{
    // Full
    public class ItemFeatureSettingViewModel
    {
        [LocalizedRequired]
        [Display(Name = nameof(Item), ResourceType = typeof(DisplayNames))]
        public string ItemId { get; set; }

        [LocalizedRequired]
        [Display(Name = nameof(Feature), ResourceType = typeof(DisplayNames))]
        public string FeatureId { get; set; }

        [Display(Name = nameof(Item), ResourceType = typeof(DisplayNames))]
        public ItemLiteViewModel Item { get; set; }

        [Display(Name = nameof(Feature), ResourceType = typeof(DisplayNames))]
        public FeatureLiteViewModel Feature { get; set; }
    }
}
