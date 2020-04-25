using System.ComponentModel.DataAnnotations;

namespace EntitiesGenerator.Mvc
{
    public class ScopedNameBasedEntityFeatureSettingViewModel : FeatureSettingLiteViewModel
    {
        [LocalizedRequired]
        [Display(Name = nameof(ScopeName), ResourceType = typeof(DisplayNames_Custom))]
        public string ScopeName { get; set; }

        [Display(Name = nameof(NamePropertyName), ResourceType = typeof(DisplayNames_Custom))]
        public string NamePropertyName { get; set; }

        [LocalizedRequired]
        [Display(Name = nameof(LookupNormalizer), ResourceType = typeof(DisplayNames_Custom))]
        public string LookupNormalizer { get; set; }
    }
}
