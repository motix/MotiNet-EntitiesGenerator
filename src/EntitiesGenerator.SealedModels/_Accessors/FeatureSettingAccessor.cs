namespace EntitiesGenerator
{
    public class FeatureSettingAccessor : IFeatureSettingAccessor<FeatureSetting>
    {
        public object GetId(FeatureSetting featureSetting) => featureSetting.Id;
    }
}
