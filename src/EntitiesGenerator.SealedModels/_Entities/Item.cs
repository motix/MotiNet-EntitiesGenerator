using MotiNet.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace EntitiesGenerator
{
    // Entity
    public sealed partial class Item
        : INameWiseEntity
    {
        public Item() => Id = Guid.NewGuid().ToString();

        [StringLength(StringLengths.Guid)]
        public string Id { get; set; }

        [Required]
        [StringLength(StringLengths.Guid)]
        public string ModuleId { get; set; }

        public int Position { get; set; }

        [Required]
        [StringLength(StringLengths.TitleContent)]
        public string Name { get; set; }

        [Required]
        [StringLength(StringLengths.TitleContent)]
        public string NormalizedName { get; set; }

        [Required]
        [StringLength(StringLengths.TitleContent)]
        public string DisplayName { get; set; }

        public bool ParameterListLineBreak { get; set; }

        public bool AbstractModel { get; set; }
    }

    // Relationships
    partial class Item
    {
        public Module Module { get; set; }

        public ICollection<FeatureSetting> FeatureSettings { get; set; }
    }

    // Customization
    partial class Item
    {
        public IEnumerable<FeatureSetting> OrderedFeatureSettings => FeatureSettings?.OrderBy(x => x.Position);
    }
}
