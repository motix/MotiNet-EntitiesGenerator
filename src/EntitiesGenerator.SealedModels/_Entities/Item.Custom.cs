using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace EntitiesGenerator
{
    // Entity
    partial class Item
    {
        public int Position { get; set; }

        [Required]
        [StringLength(StringLengths.TitleContent)]
        public string DisplayName { get; set; }

        public bool ParameterListLineBreak { get; set; }

        public bool AbstractModel { get; set; }
    }

    // Relationships
    partial class Item
    {
        public ICollection<FeatureSetting> FeatureSettings { get; set; }
    }

    // Customization
    partial class Item
    {
        public IEnumerable<FeatureSetting> OrderedFeatureSettings => FeatureSettings?.OrderBy(x => x.Position);
    }
}
