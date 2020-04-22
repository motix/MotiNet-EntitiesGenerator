using System.ComponentModel.DataAnnotations;

namespace EntitiesGenerator
{
    public sealed class NameBasedEntityFeatureSetting : FeatureSetting
    {
        public override int Position => 7;

        [StringLength(StringLengths.TitleContent)]
        public string NamePropertyName { get; set; }

        [Required]
        [StringLength(StringLengths.TinyContent)]
        public string LookupNormalizer { get; set; }
    }
}
