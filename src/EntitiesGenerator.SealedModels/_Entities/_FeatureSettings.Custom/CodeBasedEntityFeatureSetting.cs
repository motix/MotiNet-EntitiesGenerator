using System.ComponentModel.DataAnnotations;

namespace EntitiesGenerator
{
    public sealed class CodeBasedEntityFeatureSetting : FeatureSetting
    {
        public override int Position => 3;

        [StringLength(StringLengths.TitleContent)]
        public string CodePropertyName { get; set; }

        public bool HasCodeGenerator { get; set; }
    }
}
