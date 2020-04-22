using System;
using System.ComponentModel.DataAnnotations;

namespace EntitiesGenerator.Mvc
{
    // Base
    public abstract partial class FeatureSettingViewModelBase
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();

        [LocalizedRequired]
        [Display(Name = "Item", ResourceType = typeof(DisplayNames))]
        public string ItemId { get; set; }
    }

    // Full
    public partial class FeatureSettingViewModel : FeatureSettingViewModelBase
    {
        [Display(Name = nameof(Item), ResourceType = typeof(DisplayNames))]
        public ItemLiteViewModel Item { get; set; }
    }

    // Lite
    public partial class FeatureSettingLiteViewModel : FeatureSettingViewModelBase
    { }
}
