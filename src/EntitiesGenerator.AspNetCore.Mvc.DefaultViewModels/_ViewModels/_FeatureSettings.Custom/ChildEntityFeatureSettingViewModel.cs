using System.ComponentModel.DataAnnotations;

namespace EntitiesGenerator.Mvc
{
    public class ChildEntityFeatureSettingViewModel : FeatureSettingViewModel
    {
        [LocalizedRequired]
        [Display(Name = nameof(ParentName), ResourceType = typeof(DisplayNames_Custom))]
        public string ParentName { get; set; }

        [Display(Name = nameof(DeleteRestrict), ResourceType = typeof(DisplayNames_Custom))]
        public bool DeleteRestrict { get; set; }

        [Display(Name = nameof(HasSortedChildrenInParent), ResourceType = typeof(DisplayNames_Custom))]
        public bool HasSortedChildrenInParent { get; set; }

        [Display(Name = nameof(SortedChildrenInParentCriteriaPropertyName), ResourceType = typeof(DisplayNames_Custom))]
        public string SortedChildrenInParentCriteriaPropertyName { get; set; }
    }
}
