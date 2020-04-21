namespace EntitiesGenerator
{
    public sealed class OnOffEntityFeatureSetting : FeatureSetting
    {
        public override int Position => 5;

        public bool UseActiveField { get; set; }
    }
}
