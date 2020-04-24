using System.ComponentModel.DataAnnotations;

namespace EntitiesGenerator
{
    public sealed class ReadableIdEntityFeatureSetting : FeatureSetting
    {
        public override int Position => 2;

        [Required]
        [StringLength(StringLengths.TinyContent)]
        public string IdSourcePropertyName { get; set; }
    }
}
