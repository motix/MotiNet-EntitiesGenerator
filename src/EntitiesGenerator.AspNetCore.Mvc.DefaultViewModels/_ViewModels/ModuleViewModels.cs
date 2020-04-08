using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace EntitiesGenerator.Mvc
{
    // Base
    public abstract class ModuleViewModelBase
    {
        protected ModuleViewModelBase() => Id = Guid.NewGuid().ToString();

        public string Id { get; set; }

        [LocalizedRequired]
        [Display(Name = "Project", ResourceType = typeof(DisplayNames))]
        public string ProjectId { get; set; }

        [Display(Name = nameof(Position), ResourceType = typeof(DisplayNames))]
        public int Position { get; set; }

        [LocalizedRequired]
        [Display(Name = nameof(Name), ResourceType = typeof(DisplayNames))]
        public string Name { get; set; }
    }

    // Full
    public class ModuleViewModel : ModuleViewModelBase
    {
        [Display(Name = nameof(Project), ResourceType = typeof(DisplayNames))]
        public ProjectLiteViewModel Project { get; set; }

        [Display(Name = nameof(Items), ResourceType = typeof(DisplayNames))]
        public ICollection<ItemLiteViewModel> Items { get; set; }
    }

    // Lite
    public class ModuleLiteViewModel : ModuleViewModelBase { }
}
