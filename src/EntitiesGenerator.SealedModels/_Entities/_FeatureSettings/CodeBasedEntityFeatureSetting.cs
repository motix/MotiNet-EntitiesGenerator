namespace EntitiesGenerator
{
    public sealed class CodeBasedEntityFeatureSetting : FeatureSettingBase
    {
        public override int Position => 3;

        public bool HasCodeGenerator { get; set; }
    }
}
