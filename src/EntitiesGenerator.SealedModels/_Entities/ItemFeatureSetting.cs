using System.ComponentModel.DataAnnotations;

namespace EntitiesGenerator
{
    // Entity
    public sealed partial class ItemFeatureSetting
    {
        [Required]
        [StringLength(StringLengths.Guid)]
        public string ItemId { get; set; }

        [Required]
        [StringLength(StringLengths.Guid)]
        public string FeatureId { get; set; }
    }

    // Relationships
    partial class ItemFeatureSetting
    {
        public Item Item { get; set; }

        public Feature Feature { get; set; }
    }
}
