using System.ComponentModel.DataAnnotations;

namespace EntitiesGenerator
{
    public sealed class ChildEntityFeatureSetting : FeatureSetting
    {
        public override int Position => 11;

        [Required]
        [StringLength(StringLengths.TinyContent)]
        public string ParentName { get; set; }
    }
}
