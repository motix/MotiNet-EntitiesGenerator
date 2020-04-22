using System.ComponentModel.DataAnnotations;

namespace EntitiesGenerator.Mvc
{
    // Base
    partial class FeatureSettingViewModelBase
    {
        // Customization

        public string Type => GetType().Name.Replace("FeatureSettingViewModel", string.Empty);
    }
}
