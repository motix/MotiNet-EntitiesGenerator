using System.ComponentModel.DataAnnotations;

namespace EntitiesGenerator.Mvc
{
    public class ReadableIdEntityFeatureSettingViewModel : FeatureSettingLiteViewModel
    {
        [LocalizedRequired]
        [Display(Name = nameof(IdSourcePropertyName), ResourceType = typeof(DisplayNames_Custom))]
        public string IdSourcePropertyName { get; set; }
    }
}
