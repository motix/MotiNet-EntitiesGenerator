using MotiNet.Entities;
using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace EntitiesGenerator
{
    // Entity
    public sealed partial class Module
        : IIdWiseEntity<string>,
          INameWiseEntity
    {
        public Module() => Id = Guid.NewGuid().ToString();

        [StringLength(StringLengths.Guid)]
        public string Id { get; set; }

        [Required]
        [StringLength(StringLengths.Guid)]
        public string ProjectId { get; set; }

        public int Position { get; set; }

        [Required]
        [StringLength(StringLengths.TitleContent)]
        public string Name { get; set; }

        [Required]
        [StringLength(StringLengths.TitleContent)]
        public string NormalizedName { get; set; }
    }

    // Relationships
    partial class Module
    {
        public Project Project { get; set; }

        public ICollection<Item> Items { get; set; }
    }

    // Customization
    partial class Module
    {
        public IEnumerable<Item> OrderedItems => Items?.OrderBy(x => x.Position);
    }
}
