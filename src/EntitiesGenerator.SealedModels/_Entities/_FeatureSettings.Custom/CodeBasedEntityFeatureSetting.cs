namespace EntitiesGenerator
{
    public sealed class CodeBasedEntityFeatureSetting : FeatureSetting
    {
        public override int Position => 3;

        public bool HasCodeGenerator { get; set; }
    }
}
