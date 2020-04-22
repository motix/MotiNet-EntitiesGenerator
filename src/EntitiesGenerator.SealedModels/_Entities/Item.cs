using MotiNet.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace EntitiesGenerator
{
    // Entity
    public sealed partial class Item
        : INameWiseEntity,
          IIdWiseEntity<string>
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

        public ICollection<FeatureSetting> FeatureSettings { get; set; }
    }

    // Customization
    partial class Item
    {
        public IEnumerable<FeatureSetting> OrderedFeatureSettings => FeatureSettings?.OrderBy(x => x.Position);
    }
}
