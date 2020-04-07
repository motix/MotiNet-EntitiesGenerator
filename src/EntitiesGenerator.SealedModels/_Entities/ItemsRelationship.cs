using System;
using System.ComponentModel.DataAnnotations;

namespace EntitiesGenerator
{
    // Entity
    public sealed partial class ItemsRelationship
    {
        public ItemsRelationship() => Id = Guid.NewGuid().ToString();

        [StringLength(StringLengths.Guid)]
        public string Id { get; set; }

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
