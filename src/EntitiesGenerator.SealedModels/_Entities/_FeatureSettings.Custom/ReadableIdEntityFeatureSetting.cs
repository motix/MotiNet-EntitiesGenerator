using System.ComponentModel.DataAnnotations;

namespace EntitiesGenerator
{
    public sealed class ReadableIdEntityFeatureSetting : FeatureSetting
    {
        public override int Position => 2;

        [Required]
        [StringLength(StringLengths.TitleContent)]
        public string IdSourcePropertyName { get; set; }
    }
}
