using System.ComponentModel.DataAnnotations;

namespace EntitiesGenerator
{
    // Entity
    partial class ItemsRelationship
    {
        [Required]
        [StringLength(StringLengths.Guid)]
        public string Item1Id { get; set; }

        [Required]
        [StringLength(StringLengths.Guid)]
        public string Item2Id { get; set; }
    }

    // Relationships
    partial class ItemsRelationship
    {
        public Item Item1 { get; set; }

        public Item Item2 { get; set; }
    }
}
