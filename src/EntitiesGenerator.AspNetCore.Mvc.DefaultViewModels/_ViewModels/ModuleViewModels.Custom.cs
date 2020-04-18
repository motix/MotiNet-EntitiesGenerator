using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace EntitiesGenerator.Mvc
{
    // Base
    partial class ModuleViewModelBase
    {
        [Display(Name = nameof(Position), ResourceType = typeof(DisplayNames_Custom))]
        public int Position { get; set; }

        [Display(Name = nameof(HasOwnNamespace), ResourceType = typeof(DisplayNames_Custom))]
        public bool HasOwnNamespace { get; set; }
    }

    // Full
    partial class ModuleViewModel
    {
        // Customization

        public ICollection<ItemViewModel> FullItems { get; set; }
    }
}
