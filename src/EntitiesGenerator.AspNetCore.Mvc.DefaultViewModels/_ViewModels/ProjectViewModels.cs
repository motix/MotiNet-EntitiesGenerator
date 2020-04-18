using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace EntitiesGenerator.Mvc
{
    // Base
    public abstract partial class ProjectViewModelBase
    {
        protected ProjectViewModelBase() => Id = Guid.NewGuid().ToString();

        public string Id { get; set; }

        [LocalizedRequired]
        [Display(Name = nameof(Name), ResourceType = typeof(DisplayNames))]
        public string Name { get; set; }
    }

    // Full
    public partial class ProjectViewModel : ProjectViewModelBase
    {
        [Display(Name = nameof(Modules), ResourceType = typeof(DisplayNames))]
        public ICollection<ModuleLiteViewModel> Modules { get; set; }
    }

    // Lite
    public partial class ProjectLiteViewModel : ProjectViewModelBase
    { }
}
