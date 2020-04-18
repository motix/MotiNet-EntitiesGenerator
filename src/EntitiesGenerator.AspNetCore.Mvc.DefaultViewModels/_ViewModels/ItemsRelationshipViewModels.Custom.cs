using System.ComponentModel.DataAnnotations;

namespace EntitiesGenerator.Mvc
{
    // Base
    partial class ItemsRelationshipViewModelBase
    {
        [LocalizedRequired]
        [Display(Name = "Item1", ResourceType = typeof(DisplayNames_Custom))]
        public string Item1Id { get; set; }

        [LocalizedRequired]
        [Display(Name = "Item2", ResourceType = typeof(DisplayNames_Custom))]
        public string Item2Id { get; set; }
    }

    // Full
    partial class ItemsRelationshipViewModel
    {
        [Display(Name = nameof(Item1), ResourceType = typeof(DisplayNames_Custom))]
        public ItemLiteViewModel Item1 { get; set; }

        [Display(Name = nameof(Item2), ResourceType = typeof(DisplayNames_Custom))]
        public ItemLiteViewModel Item2 { get; set; }
    }
}
