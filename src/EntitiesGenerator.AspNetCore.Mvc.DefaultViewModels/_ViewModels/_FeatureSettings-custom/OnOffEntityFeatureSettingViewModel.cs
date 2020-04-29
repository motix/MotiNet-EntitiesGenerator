using System.ComponentModel.DataAnnotations;

namespace EntitiesGenerator.Mvc
{
    public class OnOffEntityFeatureSettingViewModel : FeatureSettingLiteViewModel
    {
        [Display(Name = nameof(UseActiveField), ResourceType = typeof(DisplayNames_Custom))]
        public bool UseActiveField { get; set; }
    }
}
