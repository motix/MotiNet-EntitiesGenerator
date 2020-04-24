using System.ComponentModel.DataAnnotations;

namespace EntitiesGenerator
{
    public class ManyToManyItemsRelationship : ItemsRelationship
    {
        public bool HasSortedItem2sInItem1 { get; set; }

        [StringLength(StringLengths.TinyContent)]
        public string SortedItem2sInItem1CriteriaPropertyName { get; set; }

        public bool HasSortedItem1sInItem2 { get; set; }

        [StringLength(StringLengths.TinyContent)]
        public string SortedItem1sInItem2CriteriaPropertyName { get; set; }
    }
}
