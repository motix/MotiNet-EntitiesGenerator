using System.ComponentModel.DataAnnotations;

namespace EntitiesGenerator
{
    public sealed class ScopedNameBasedEntityFeatureSetting : FeatureSetting
    {
        public override int Position => 9;

        [Required]
        [StringLength(StringLengths.TinyContent)]
        public string ScopeName { get; set; }

        [StringLength(StringLengths.TinyContent)]
        public string NamePropertyName { get; set; }

        [Required]
        [StringLength(StringLengths.TinyContent)]
        public string LookupNormalizer { get; set; }
    }
}
