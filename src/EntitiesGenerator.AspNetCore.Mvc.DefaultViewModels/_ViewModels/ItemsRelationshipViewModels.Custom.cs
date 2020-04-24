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

        [Display(Name = nameof(Item1PropertyName), ResourceType = typeof(DisplayNames_Custom))]
        public string Item1PropertyName { get; set; }

        [Display(Name = nameof(Item2PropertyName), ResourceType = typeof(DisplayNames_Custom))]
        public string Item2PropertyName { get; set; }

        // Customization

        [Display(Name = nameof(Type), ResourceType = typeof(DisplayNames_Custom))]
        public string Type => GetType().Name.Replace("ItemsRelationshipViewModel", string.Empty);
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
