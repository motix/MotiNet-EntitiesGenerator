namespace EntitiesGenerator
{
    public class FeatureSettingAccessor : IFeatureSettingAccessor<FeatureSettingBase>
    {
        public object GetId(FeatureSettingBase featureSetting) => featureSetting.Id;
    }
}
