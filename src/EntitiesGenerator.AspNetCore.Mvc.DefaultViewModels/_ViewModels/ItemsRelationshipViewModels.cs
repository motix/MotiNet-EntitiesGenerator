using System;
using System.ComponentModel.DataAnnotations;

namespace EntitiesGenerator.Mvc
{
    // Full
    public class ItemsRelationshipViewModel
    {
        public ItemsRelationshipViewModel() => Id = Guid.NewGuid().ToString();

        public string Id { get; set; }

        [LocalizedRequired]
        [Display(Name = nameof(Item1), ResourceType = typeof(DisplayNames))]
        public string Item1Id { get; set; }

        [LocalizedRequired]
        [Display(Name = nameof(Item2), ResourceType = typeof(DisplayNames))]
        public string Item2Id { get; set; }

        [Display(Name = nameof(Item1), ResourceType = typeof(DisplayNames))]
        public ItemLiteViewModel Item1 { get; set; }

        [Display(Name = nameof(Item2), ResourceType = typeof(DisplayNames))]
        public ItemLiteViewModel Item2 { get; set; }
    }
}
