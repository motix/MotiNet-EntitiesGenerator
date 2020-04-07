using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace EntitiesGenerator.Mvc
{
    // Base
    public abstract class ItemViewModelBase
    {
        public string Id { get; set; }

        [LocalizedRequired]
        [Display(Name = "Module", ResourceType = typeof(DisplayNames))]
        public string ModuleId { get; set; }

        [Display(Name = nameof(Position), ResourceType = typeof(DisplayNames))]
        public int Position { get; set; }

        [LocalizedRequired]
        [Display(Name = nameof(Name), ResourceType = typeof(DisplayNames))]
        public string Name { get; set; }
    }

    // Full
    public class ItemViewModel : ItemViewModelBase
    {
        [Display(Name = nameof(Module), ResourceType = typeof(DisplayNames))]
        public ModuleLiteViewModel Module { get; set; }

        [Display(Name = nameof(FeatureSettings), ResourceType = typeof(DisplayNames))]
        public ICollection<ItemFeatureSettingViewModel> FeatureSettings { get; set; }

        [Display(Name = nameof(Relationships), ResourceType = typeof(DisplayNames))]
        public ICollection<ItemsRelationshipViewModel> Relationships { get; set; }
    }

    // Lite
    public class ItemLiteViewModel : ItemViewModelBase { }
}
