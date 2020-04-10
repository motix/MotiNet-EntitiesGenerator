namespace EntitiesGenerator
{
    public class FeatureAccessor : IFeatureAccessor<Feature>
    {
        public object GetId(Feature feature) => feature.Id;

        public string GetName(Feature feature) => feature.Name;

        public void SetNormalizedName(Feature feature, string normalizedName) => feature.NormalizedName = normalizedName;

        public object GetIdSource(Feature feature) => feature.Name;

        public void SetId(Feature feature, string id) => feature.Id = id;
    }
}
