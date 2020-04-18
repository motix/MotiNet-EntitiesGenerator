using System.ComponentModel.DataAnnotations;

namespace EntitiesGenerator.Mvc
{
    public class NameBasedEntityFeatureSettingViewModel : FeatureSettingViewModel
    {
        [Display(Name = nameof(NamePropertyName), ResourceType = typeof(DisplayNames_Custom))]
        public string NamePropertyName { get; set; }
    }
}
