using System.ComponentModel.DataAnnotations;

namespace EntitiesGenerator
{
    public sealed class ScopedNameBasedEntityFeatureSetting : FeatureSetting
    {
        public override int Position => 6;

        [Required]
        [StringLength(StringLengths.TitleContent)]
        public string ScopeName { get; set; }

        public bool DeleteRestrict { get; set; }

        public bool HasSortedChildrenInScope { get; set; }
    }
}
