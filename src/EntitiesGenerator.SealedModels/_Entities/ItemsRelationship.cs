using System;
using System.ComponentModel.DataAnnotations;

namespace EntitiesGenerator
{
    // Entity
    public abstract partial class ItemsRelationship
    {
        [StringLength(StringLengths.Guid)]
        public string Id { get; set; } = Guid.NewGuid().ToString();

        [Required]
        [StringLength(StringLengths.Guid)]
        public string ModuleId { get; set; }

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
        public Module Module { get; set; }

        public Item Item1 { get; set; }

        public Item Item2 { get; set; }
    }
}
