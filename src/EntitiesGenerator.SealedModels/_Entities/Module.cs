﻿using MotiNet.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace EntitiesGenerator
{
    // Entity
    public sealed partial class Module
        : INameWiseEntity,
          IIdWiseEntity<string>
    {
        [StringLength(StringLengths.Guid)]
        public string Id { get; set; } = Guid.NewGuid().ToString();

        [Required]
        [StringLength(StringLengths.TitleContent)]
        public string Name { get; set; }

        [Required]
        [StringLength(StringLengths.TitleContent)]
        public string NormalizedName { get; set; }

        [Required]
        [StringLength(StringLengths.Guid)]
        public string ProjectId { get; set; }
    }

    // Relationships
    partial class Module
    {
        public Project Project { get; set; }

        public ICollection<Item> Items { get; set; }

        public ICollection<ItemsRelationship> ItemsRelationships { get; set; }
    }

    // Customization
    partial class Module
    {
        public IEnumerable<Item> OrderedItems => Items?.OrderBy(x => x.Position);

        public IEnumerable<ItemsRelationship> OrderedItemsRelationships => ItemsRelationships?.OrderBy(x => x.Position);
    }
}
