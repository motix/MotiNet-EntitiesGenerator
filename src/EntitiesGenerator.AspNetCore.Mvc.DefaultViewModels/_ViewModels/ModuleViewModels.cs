using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace EntitiesGenerator.Mvc
{
    // Base
    public abstract partial class ModuleViewModelBase
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();

        [LocalizedRequired]
        [Display(Name = "Project", ResourceType = typeof(DisplayNames))]
        public string ProjectId { get; set; }

        [LocalizedRequired]
        [Display(Name = nameof(Name), ResourceType = typeof(DisplayNames))]
        public string Name { get; set; }
    }

    // Full
    public partial class ModuleViewModel : ModuleViewModelBase
    {
        [Display(Name = nameof(Project), ResourceType = typeof(DisplayNames))]
        public ProjectLiteViewModel Project { get; set; }

        [Display(Name = nameof(Items), ResourceType = typeof(DisplayNames))]
        public ICollection<ItemLiteViewModel> Items { get; set; }

        [Display(Name = nameof(ItemsRelationships), ResourceType = typeof(DisplayNames))]
        public ICollection<ItemsRelationshipLiteViewModel> ItemsRelationships { get; set; }
    }

    // Lite
    public partial class ModuleLiteViewModel : ModuleViewModelBase
    { }
}
