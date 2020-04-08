using MotiNet.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace EntitiesGenerator
{
    // Entity
    public sealed partial class Feature
        : INameWiseEntity,
          IIsActiveWiseEntity
    {
        [StringLength(StringLengths.Guid)]
        public string Id { get; set; }

        public bool IsActive { get; set; }

        public int Position { get; set; }

        [Required]
        [StringLength(StringLengths.TitleContent)]
        public string Name { get; set; }

        [Required]
        [StringLength(StringLengths.TitleContent)]
        public string NormalizedName { get; set; }
    }

    // Relationships
    partial class Feature
    {
        public ICollection<ItemFeatureSetting> FeatureSettings { get; set; }
    }
}
