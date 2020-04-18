using System.ComponentModel.DataAnnotations;

namespace EntitiesGenerator.Mvc
{
    // Base
    partial class FeatureSettingViewModelBase
    {
        [LocalizedRequired]
        [Display(Name = "Item", ResourceType = typeof(DisplayNames_Custom))]
        public string ItemId { get; set; }

        // Customization

        public string Type => GetType().Name.Replace("FeatureSettingViewModel", string.Empty);
    }

    // Full
    partial class FeatureSettingViewModel
    {
        [Display(Name = nameof(Item), ResourceType = typeof(DisplayNames_Custom))]
        public ItemLiteViewModel Item { get; set; }
    }
}
