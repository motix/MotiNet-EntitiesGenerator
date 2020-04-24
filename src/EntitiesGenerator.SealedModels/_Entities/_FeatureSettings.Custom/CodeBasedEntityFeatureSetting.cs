using System.ComponentModel.DataAnnotations;

namespace EntitiesGenerator
{
    public sealed class CodeBasedEntityFeatureSetting : FeatureSetting
    {
        public override int Position => 6;

        [StringLength(StringLengths.TinyContent)]
        public string CodePropertyName { get; set; }

        [Required]
        [StringLength(StringLengths.TinyContent)]
        public string LookupNormalizer { get; set; }

        public bool HasCodeGenerator { get; set; }
    }
}
