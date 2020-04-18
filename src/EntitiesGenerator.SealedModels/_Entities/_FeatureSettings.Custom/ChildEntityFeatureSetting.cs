using System.ComponentModel.DataAnnotations;

namespace EntitiesGenerator
{
    public sealed class ChildEntityFeatureSetting : FeatureSetting
    {
        public override int Position => 11;

        [Required]
        [StringLength(StringLengths.TitleContent)]
        public string ParentName { get; set; }

        public bool DeleteRestrict { get; set; }

        public bool HasSortedChildrenInParent { get; set; }

        [StringLength(StringLengths.TitleContent)]
        public string SortedChildrenInParentCriteriaPropertyName { get; set; }
    }
}
