using System;
using System.ComponentModel.DataAnnotations;

namespace EntitiesGenerator
{
    // Entity
    public sealed partial class ItemsRelationship
    {
        public ItemsRelationship() => Id = Guid.NewGuid().ToString();

        [StringLength(StringLengths.Guid)]
        public string Id { get; set; }
    }
}
