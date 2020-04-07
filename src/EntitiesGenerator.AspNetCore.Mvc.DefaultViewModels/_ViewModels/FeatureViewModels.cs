using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace EntitiesGenerator.Mvc
{
    // Base
    public abstract class FeatureViewModelBase
    {
        public string Id { get; set; }

        [Display(Name = "Active", ResourceType = typeof(DisplayNames))]
        public bool IsActive { get; set; }

        [Display(Name = nameof(Position), ResourceType = typeof(DisplayNames))]
        public int Position { get; set; }

        [LocalizedRequired]
        [Display(Name = nameof(Name), ResourceType = typeof(DisplayNames))]
        public string Name { get; set; }
    }

    // Full
    public class FeatureViewModel : FeatureViewModelBase
    {
        [Display(Name = nameof(FeatureSettings), ResourceType = typeof(DisplayNames))]
        public ICollection<ItemFeatureSettingViewModel> FeatureSettings { get; set; }
    }

    // Lite
    public class FeatureLiteViewModel : FeatureViewModelBase { }
}
