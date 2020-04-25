using System.ComponentModel.DataAnnotations;

namespace EntitiesGenerator.Mvc
{
    public class ChildEntityFeatureSettingViewModel : FeatureSettingLiteViewModel
    {
        [LocalizedRequired]
        [Display(Name = nameof(ParentName), ResourceType = typeof(DisplayNames_Custom))]
        public string ParentName { get; set; }
    }
}
