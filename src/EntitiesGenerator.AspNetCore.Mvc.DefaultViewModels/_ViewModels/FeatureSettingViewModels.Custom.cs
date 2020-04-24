using System.ComponentModel.DataAnnotations;

namespace EntitiesGenerator.Mvc
{
    // Base
    partial class FeatureSettingViewModelBase
    {
        // Customization

        [Display(Name = nameof(Type), ResourceType = typeof(DisplayNames_Custom))]
        public string Type => GetType().Name.Replace("FeatureSettingViewModel", string.Empty);
    }
}
