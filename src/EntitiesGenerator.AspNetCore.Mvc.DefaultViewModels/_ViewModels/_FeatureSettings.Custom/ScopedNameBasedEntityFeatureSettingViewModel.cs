﻿using System.ComponentModel.DataAnnotations;

namespace EntitiesGenerator.Mvc
{
    public class ScopedNameBasedEntityFeatureSettingViewModel : FeatureSettingViewModel
    {
        [LocalizedRequired]
        [Display(Name = nameof(ScopeName), ResourceType = typeof(DisplayNames_Custom))]
        public string ScopeName { get; set; }

        [Display(Name = nameof(NamePropertyName), ResourceType = typeof(DisplayNames_Custom))]
        public string NamePropertyName { get; set; }

        [Display(Name = nameof(DeleteRestrict), ResourceType = typeof(DisplayNames_Custom))]
        public bool DeleteRestrict { get; set; }

        [Display(Name = nameof(HasSortedChildrenInScope), ResourceType = typeof(DisplayNames_Custom))]
        public bool HasSortedChildrenInScope { get; set; }

        [Display(Name = nameof(SortedChildrenInScopeCriteriaPropertyName), ResourceType = typeof(DisplayNames_Custom))]
        public string SortedChildrenInScopeCriteriaPropertyName { get; set; }
    }
}