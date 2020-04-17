using System;
using System.ComponentModel.DataAnnotations;

namespace EntitiesGenerator
{
    // Entity
    public abstract partial class FeatureSetting
    {
        protected FeatureSetting() => Id = Guid.NewGuid().ToString();

        [StringLength(StringLengths.Guid)]
        public string Id { get; set; }

        [Required]
        [StringLength(StringLengths.Guid)]
        public string ItemId { get; set; }
    }

    // Relationships
    partial class FeatureSetting
    {
        public Item Item { get; set; }
    }

    // Customization
    partial class FeatureSetting
    {
        public abstract int Position { get; }
    }
}
