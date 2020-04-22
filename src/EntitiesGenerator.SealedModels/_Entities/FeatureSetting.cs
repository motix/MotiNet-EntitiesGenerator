using System;
using System.ComponentModel.DataAnnotations;

namespace EntitiesGenerator
{
    // Entity
    public abstract partial class FeatureSetting
    {
        [StringLength(StringLengths.Guid)]
        public string Id { get; set; } = Guid.NewGuid().ToString();

        [Required]
        [StringLength(StringLengths.Guid)]
        public string ItemId { get; set; }
    }

    // Relationships
    partial class FeatureSetting
    {
        public Item Item { get; set; }
    }
}
