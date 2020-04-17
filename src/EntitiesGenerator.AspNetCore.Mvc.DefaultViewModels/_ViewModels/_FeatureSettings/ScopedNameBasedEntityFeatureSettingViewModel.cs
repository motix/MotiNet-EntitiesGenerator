using System.ComponentModel.DataAnnotations;

namespace EntitiesGenerator.Mvc
{
    public class ScopedNameBasedEntityFeatureSettingViewModel : FeatureSettingBaseViewModel
    {
        [LocalizedRequired]
        [Display(Name = nameof(ScopeName), ResourceType = typeof(DisplayNames))]
        public string ScopeName { get; set; }

        [Display(Name = nameof(DeleteRestrict), ResourceType = typeof(DisplayNames))]
        public bool DeleteRestrict { get; set; }

        [Display(Name = nameof(HasSortedChildrenInScope), ResourceType = typeof(DisplayNames))]
        public bool HasSortedChildrenInScope { get; set; }
    }
}
