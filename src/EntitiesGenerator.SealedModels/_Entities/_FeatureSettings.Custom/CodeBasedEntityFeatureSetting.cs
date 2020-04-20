using System.ComponentModel.DataAnnotations;

namespace EntitiesGenerator
{
    public sealed class CodeBasedEntityFeatureSetting : FeatureSetting
    {
        public override int Position => 6;

        [StringLength(StringLengths.TitleContent)]
        public string CodePropertyName { get; set; }

        public bool HasCodeGenerator { get; set; }
    }
}
