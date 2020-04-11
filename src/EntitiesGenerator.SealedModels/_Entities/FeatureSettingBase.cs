using System;
using System.ComponentModel.DataAnnotations;

namespace EntitiesGenerator
{
    // Entity
    public abstract partial class FeatureSettingBase
    {
        protected FeatureSettingBase() => Id = Guid.NewGuid().ToString();

        [StringLength(StringLengths.Guid)]
        public string Id { get; set; }

        [Required]
        [StringLength(StringLengths.Guid)]
        public string ItemId { get; set; }
    }

    // Relationships
    partial class FeatureSettingBase
    {
        public Item Item { get; set; }
    }

    // Customization
    partial class FeatureSettingBase
    {
        public abstract int Position { get; }
    }
}
