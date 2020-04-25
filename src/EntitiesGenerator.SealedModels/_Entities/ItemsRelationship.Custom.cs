using System.ComponentModel.DataAnnotations;

namespace EntitiesGenerator
{
    // Entity
    partial class ItemsRelationship
    {
        public int Position { get; set; }

        [StringLength(StringLengths.TinyContent)]
        public string Item1PropertyName { get; set; }

        [StringLength(StringLengths.TinyContent)]
        public string Item2PropertyName { get; set; }
    }
}
