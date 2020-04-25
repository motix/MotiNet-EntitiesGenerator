using System;
using System.ComponentModel.DataAnnotations;

namespace EntitiesGenerator.Mvc
{
    // Base
    public abstract partial class ItemsRelationshipViewModelBase
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();

        [LocalizedRequired]
        [Display(Name = "Module", ResourceType = typeof(DisplayNames))]
        public string ModuleId { get; set; }

        [LocalizedRequired]
        [Display(Name = "Item1", ResourceType = typeof(DisplayNames))]
        public string Item1Id { get; set; }

        [LocalizedRequired]
        [Display(Name = "Item2", ResourceType = typeof(DisplayNames))]
        public string Item2Id { get; set; }
    }

    // Full
    public partial class ItemsRelationshipViewModel : ItemsRelationshipViewModelBase
    {
        [Display(Name = nameof(Module), ResourceType = typeof(DisplayNames))]
        public ModuleLiteViewModel Module { get; set; }

        [Display(Name = nameof(Item1), ResourceType = typeof(DisplayNames))]
        public ItemLiteViewModel Item1 { get; set; }

        [Display(Name = nameof(Item2), ResourceType = typeof(DisplayNames))]
        public ItemLiteViewModel Item2 { get; set; }
    }

    // Lite
    public partial class ItemsRelationshipLiteViewModel : ItemsRelationshipViewModelBase
    { }
}
