using System.ComponentModel.DataAnnotations;

namespace EntitiesGenerator.Mvc
{
    public class ReadableIdEntityFeatureSettingViewModel : FeatureSettingViewModel
    {
        [LocalizedRequired]
        [Display(Name = nameof(IdSourcePropertyName), ResourceType = typeof(DisplayNames_Custom))]
        public string IdSourcePropertyName { get; set; }
    }
}
