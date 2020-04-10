using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace EntitiesGenerator.Mvc
{
    // Base
    public abstract class ProjectViewModelBase
    {
        protected ProjectViewModelBase() => Id = Guid.NewGuid().ToString();

        public string Id { get; set; }

        [LocalizedRequired]
        [Display(Name = nameof(Name), ResourceType = typeof(DisplayNames))]
        public string Name { get; set; }

        [Display(Name = nameof(Namespace), ResourceType = typeof(DisplayNames))]
        public string Namespace { get; set; }

        [Display(Name = nameof(GenerateLocation), ResourceType = typeof(DisplayNames))]
        public string GenerateLocation { get; set; }

        [Display(Name = nameof(WorkingLocation), ResourceType = typeof(DisplayNames))]
        public string WorkingLocation { get; set; }
    }

    // Full
    public class ProjectViewModel : ProjectViewModelBase
    {
        [Display(Name = nameof(Modules), ResourceType = typeof(DisplayNames))]
        public ICollection<ModuleLiteViewModel> Modules { get; set; }

        public ICollection<ModuleViewModel> FullModules { get; set; }
    }

    // Lite
    public class ProjectLiteViewModel : ProjectViewModelBase { }
}
