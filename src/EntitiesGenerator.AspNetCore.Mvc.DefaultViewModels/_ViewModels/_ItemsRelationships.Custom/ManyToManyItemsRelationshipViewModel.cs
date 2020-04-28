using System.ComponentModel.DataAnnotations;

namespace EntitiesGenerator.Mvc
{
    public class ManyToManyItemsRelationshipViewModel : ItemsRelationshipLiteViewModel
    {
        [Display(Name = nameof(HasSortedItem2sInItem1), ResourceType = typeof(DisplayNames_Custom))]
        public bool HasSortedItem2sInItem1 { get; set; }

        [Display(Name = nameof(SortedItem2sInItem1CriteriaPropertyName), ResourceType = typeof(DisplayNames_Custom))]
        public string SortedItem2sInItem1CriteriaPropertyName { get; set; }

        [Display(Name = nameof(HasSortedItem1sInItem2), ResourceType = typeof(DisplayNames_Custom))]
        public bool HasSortedItem1sInItem2 { get; set; }

        [Display(Name = nameof(SortedItem1sInItem2CriteriaPropertyName), ResourceType = typeof(DisplayNames_Custom))]
        public string SortedItem1sInItem2CriteriaPropertyName { get; set; }

        [Display(Name = nameof(HasFullItem2sInItem1ViewModel), ResourceType = typeof(DisplayNames_Custom))]
        public bool HasFullItem2sInItem1ViewModel { get; set; }

        [Display(Name = nameof(HasFullItem1sInItem2ViewModel), ResourceType = typeof(DisplayNames_Custom))]
        public bool HasFullItem1sInItem2ViewModel { get; set; }
    }
}
