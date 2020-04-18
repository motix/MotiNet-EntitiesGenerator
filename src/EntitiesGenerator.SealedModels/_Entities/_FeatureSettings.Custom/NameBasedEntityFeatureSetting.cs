using System.ComponentModel.DataAnnotations;

namespace EntitiesGenerator
{
    public sealed class NameBasedEntityFeatureSetting : FeatureSetting
    {
        public override int Position => 4;

        [StringLength(StringLengths.TitleContent)]
        public string NamePropertyName { get; set; }
    }
}
