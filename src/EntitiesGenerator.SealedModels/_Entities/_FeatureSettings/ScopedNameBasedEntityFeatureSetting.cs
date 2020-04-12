using System.ComponentModel.DataAnnotations;

namespace EntitiesGenerator
{
    public sealed class ScopedNameBasedEntityFeatureSetting : FeatureSettingBase
    {
        public override int Position => 6;

        [Required]
        [StringLength(StringLengths.TitleContent)]
        public string ScopeName { get; set; }
    }
}
