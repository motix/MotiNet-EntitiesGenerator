using System;
using System.ComponentModel.DataAnnotations;

namespace EntitiesGenerator.Mvc
{
    public abstract partial class FeatureSettingViewModel
    {
        protected FeatureSettingViewModel() => Id = Guid.NewGuid().ToString();

        public string Id { get; set; }

        [LocalizedRequired]
        [Display(Name = nameof(Item), ResourceType = typeof(DisplayNames))]
        public string ItemId { get; set; }

        [Display(Name = nameof(Item), ResourceType = typeof(DisplayNames))]
        public ItemLiteViewModel Item { get; set; }

        // Customizations

        public string Type => GetType().Name.Replace("FeatureSettingViewModel", string.Empty);
    }
}
