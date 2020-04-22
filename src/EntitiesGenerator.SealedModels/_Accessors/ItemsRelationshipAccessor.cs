namespace EntitiesGenerator
{
    public class ItemsRelationshipAccessor : IItemsRelationshipAccessor<ItemsRelationship, Module>
    {
        public object GetId(ItemsRelationship itemsRelationship) => itemsRelationship.Id;

        public string GetName(ItemsRelationship itemsRelationship) => itemsRelationship.Name;

        public void SetNormalizedName(ItemsRelationship itemsRelationship, string normalizedName) => itemsRelationship.NormalizedName = normalizedName;

        public object GetScopeId(ItemsRelationship itemsRelationship) => itemsRelationship.ModuleId;

        public void SetScopeId(ItemsRelationship itemsRelationship, object moduleId) => itemsRelationship.ModuleId = (string)moduleId;

        public Module GetScope(ItemsRelationship itemsRelationship) => itemsRelationship.Module;

        public void SetScope(ItemsRelationship itemsRelationship, Module module) => itemsRelationship.Module = module;
    }
}
