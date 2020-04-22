namespace EntitiesGenerator
{
    public class FeatureSettingAccessor : IFeatureSettingAccessor<FeatureSetting, Item>
    {
        public object GetId(FeatureSetting featureSetting) => featureSetting.Id;

        public object GetParentId(FeatureSetting featureSetting) => featureSetting.ItemId;

        public void SetParentId(FeatureSetting featureSetting, object itemId) => featureSetting.ItemId = (string)itemId;

        public Item GetParent(FeatureSetting featureSetting) => featureSetting.Item;

        public void SetParent(FeatureSetting featureSetting, Item item) => featureSetting.Item = item;
    }
}
