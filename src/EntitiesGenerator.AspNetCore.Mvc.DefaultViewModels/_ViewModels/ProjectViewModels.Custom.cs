using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace EntitiesGenerator.Mvc
{
    // Base
    partial class ProjectViewModelBase
    {
        [Display(Name = nameof(Namespace), ResourceType = typeof(DisplayNames_Custom))]
        public string Namespace { get; set; }

        [Display(Name = nameof(GenerateLocation), ResourceType = typeof(DisplayNames_Custom))]
        public string GenerateLocation { get; set; }

        [Display(Name = nameof(WorkingLocation), ResourceType = typeof(DisplayNames_Custom))]
        public string WorkingLocation { get; set; }
    }

    // Full
    partial class ProjectViewModel
    {
        // Customization

        public ICollection<ModuleViewModel> FullModules { get; set; }
    }
}
