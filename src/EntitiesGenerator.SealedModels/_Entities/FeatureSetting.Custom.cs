using System.ComponentModel.DataAnnotations;

namespace EntitiesGenerator
{
    // Entity
    partial class FeatureSetting
    {
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
