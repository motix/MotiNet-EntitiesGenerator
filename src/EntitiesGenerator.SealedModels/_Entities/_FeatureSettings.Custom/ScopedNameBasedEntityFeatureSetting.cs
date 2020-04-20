using System.ComponentModel.DataAnnotations;

namespace EntitiesGenerator
{
    public sealed class ScopedNameBasedEntityFeatureSetting : FeatureSetting
    {
        public override int Position => 9;

        [Required]
        [StringLength(StringLengths.TitleContent)]
        public string ScopeName { get; set; }

        [StringLength(StringLengths.TitleContent)]
        public string NamePropertyName { get; set; }

        public bool DeleteRestrict { get; set; }

        public bool HasSortedChildrenInScope { get; set; }

        [StringLength(StringLengths.TitleContent)]
        public string SortedChildrenInScopeCriteriaPropertyName { get; set; }
    }
}
