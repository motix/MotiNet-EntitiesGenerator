using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace EntitiesGenerator.Mvc
{
    // Base
    public abstract partial class ItemViewModelBase
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();

        [LocalizedRequired]
        [Display(Name = nameof(Name), ResourceType = typeof(DisplayNames))]
        public string Name { get; set; }

        [LocalizedRequired]
        [Display(Name = "Module", ResourceType = typeof(DisplayNames))]
        public string ModuleId { get; set; }
    }

    // Full
    public partial class ItemViewModel : ItemViewModelBase
    {
        [Display(Name = nameof(Module), ResourceType = typeof(DisplayNames))]
        public ModuleLiteViewModel Module { get; set; }

        [Display(Name = nameof(FeatureSettings), ResourceType = typeof(DisplayNames))]
        public ICollection<FeatureSettingLiteViewModel> FeatureSettings { get; set; }

        [Display(Name = nameof(Item1ItemsRelationships), ResourceType = typeof(DisplayNames))]
        public ICollection<ItemsRelationshipLiteViewModel> Item1ItemsRelationships { get; set; }

        [Display(Name = nameof(Item2ItemsRelationships), ResourceType = typeof(DisplayNames))]
        public ICollection<ItemsRelationshipLiteViewModel> Item2ItemsRelationships { get; set; }
    }

    // Lite
    public partial class ItemLiteViewModel : ItemViewModelBase
    { }
}
