﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace EntitiesGenerator.Mvc
{
    // Base
    public abstract partial class ProjectViewModelBase
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();

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
