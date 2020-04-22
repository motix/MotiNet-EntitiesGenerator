using System;
using System.ComponentModel.DataAnnotations;

namespace EntitiesGenerator
{
    // Entity
    public sealed partial class ItemsRelationship
    {
        [StringLength(StringLengths.Guid)]
        public string Id { get; set; } = Guid.NewGuid().ToString();

        [Required]
        [StringLength(StringLengths.Guid)]
        public string ModuleId { get; set; }
    }

    // Relationships
    partial class ItemsRelationship
    {
        public Module Module { get; set; }
    }
}
