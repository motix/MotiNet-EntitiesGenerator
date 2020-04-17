using System.ComponentModel.DataAnnotations;

namespace EntitiesGenerator.Mvc
{
    public class CodeBasedEntityFeatureSettingViewModel : FeatureSettingViewModel
    {
        [Display(Name = nameof(HasCodeGenerator), ResourceType = typeof(DisplayNames))]
        public bool HasCodeGenerator { get; set; }
    }
}
