using System.ComponentModel.DataAnnotations;

namespace EntitiesGenerator
{
    public class OneToManyItemsRelationship : ItemsRelationship
    {
        public bool DeleteRestrict { get; set; }

        public bool HasSortedChildrenInParent { get; set; }

        [StringLength(StringLengths.TinyContent)]
        public string SortedChildrenInParentCriteriaPropertyName { get; set; }
    }
}
