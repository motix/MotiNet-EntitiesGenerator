using System.ComponentModel.DataAnnotations;

namespace EntitiesGenerator.Mvc
{
    public class ScopedNameBasedEntityFeatureSettingViewModel : FeatureSettingBaseViewModel
    {
        [LocalizedRequired]
        [Display(Name = nameof(ScopeName), ResourceType = typeof(DisplayNames))]
        public string ScopeName { get; set; }
    }
}
