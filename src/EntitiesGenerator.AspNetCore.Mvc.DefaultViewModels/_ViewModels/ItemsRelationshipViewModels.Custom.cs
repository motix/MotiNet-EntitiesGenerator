using System.ComponentModel.DataAnnotations;

namespace EntitiesGenerator.Mvc
{
    // Base
    partial class ItemsRelationshipViewModelBase
    {
        [Display(Name = nameof(Position), ResourceType = typeof(DisplayNames_Custom))]
        public int Position { get; set; }

        [Display(Name = nameof(Item1PropertyName), ResourceType = typeof(DisplayNames_Custom))]
        public string Item1PropertyName { get; set; }

        [Display(Name = nameof(Item2PropertyName), ResourceType = typeof(DisplayNames_Custom))]
        public string Item2PropertyName { get; set; }

        // Customization

        [Display(Name = nameof(Type), ResourceType = typeof(DisplayNames_Custom))]
        public string Type => GetType().Name.Replace("ItemsRelationshipViewModel", string.Empty);
    }
}
