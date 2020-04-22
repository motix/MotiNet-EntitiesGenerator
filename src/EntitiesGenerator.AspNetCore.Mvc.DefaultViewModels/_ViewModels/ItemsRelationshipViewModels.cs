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
    }

    // Full
    public partial class ItemsRelationshipViewModel : ItemsRelationshipViewModelBase
    {
        [Display(Name = nameof(Module), ResourceType = typeof(DisplayNames))]
        public ModuleLiteViewModel Module { get; set; }
    }

    // Lite
    public partial class ItemsRelationshipLiteViewModel : ItemsRelationshipViewModelBase
    { }
}
