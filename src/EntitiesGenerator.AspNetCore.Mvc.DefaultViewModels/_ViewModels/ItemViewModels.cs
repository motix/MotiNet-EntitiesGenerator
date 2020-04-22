using System;
using System.ComponentModel.DataAnnotations;

namespace EntitiesGenerator.Mvc
{
    // Base
    public abstract partial class ItemViewModelBase
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();

        [LocalizedRequired]
        [Display(Name = "Module", ResourceType = typeof(DisplayNames))]
        public string ModuleId { get; set; }

        [LocalizedRequired]
        [Display(Name = nameof(Name), ResourceType = typeof(DisplayNames))]
        public string Name { get; set; }
    }

    // Full
    public partial class ItemViewModel : ItemViewModelBase
    {
        [Display(Name = nameof(Module), ResourceType = typeof(DisplayNames))]
        public ModuleLiteViewModel Module { get; set; }
    }

    // Lite
    public partial class ItemLiteViewModel : ItemViewModelBase
    { }
}
