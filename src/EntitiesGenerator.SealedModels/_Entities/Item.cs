using MotiNet.Entities;
using System;
using System.ComponentModel.DataAnnotations;

namespace EntitiesGenerator
{
    // Entity
    public sealed partial class Item
        : INameWiseEntity
    {
        [StringLength(StringLengths.Guid)]
        public string Id { get; set; } = Guid.NewGuid().ToString();

        [Required]
        [StringLength(StringLengths.Guid)]
        public string ModuleId { get; set; }

        [Required]
        [StringLength(StringLengths.TitleContent)]
        public string Name { get; set; }

        [Required]
        [StringLength(StringLengths.TitleContent)]
        public string NormalizedName { get; set; }
    }

    // Relationships
    partial class Item
    {
        public Module Module { get; set; }
    }
}
