using System.ComponentModel.DataAnnotations;

namespace EntitiesGenerator.Mvc
{
    public class CodeBasedEntityFeatureSettingViewModel : FeatureSettingBaseViewModel
    {
        [Display(Name = nameof(HasCodeGenerator), ResourceType = typeof(DisplayNames))]
        public bool HasCodeGenerator { get; set; }
    }
}
