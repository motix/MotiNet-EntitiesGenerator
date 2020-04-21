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

        [Display(Name = nameof(HasCoreOptions), ResourceType = typeof(DisplayNames_Custom))]
        public bool HasCoreOptions { get; set; }

        [Display(Name = nameof(HasEntityFrameworkCoreSealedModelsOptions), ResourceType = typeof(DisplayNames_Custom))]
        public bool HasEntityFrameworkCoreSealedModelsOptions { get; set; }

        [Display(Name = nameof(HasAspNetCoreOptions), ResourceType = typeof(DisplayNames_Custom))]
        public bool HasAspNetCoreOptions { get; set; }
    }

    // Full
    partial class ModuleViewModel
    {
        // Customization

        public ICollection<ItemViewModel> FullItems { get; set; }
    }
}
