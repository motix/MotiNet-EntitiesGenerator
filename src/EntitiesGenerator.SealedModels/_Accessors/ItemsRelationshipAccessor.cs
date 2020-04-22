namespace EntitiesGenerator
{
    public class ItemsRelationshipAccessor : IItemsRelationshipAccessor<ItemsRelationship, Module>
    {
        public object GetId(ItemsRelationship itemsRelationship) => itemsRelationship.Id;

        public object GetParentId(ItemsRelationship itemsRelationship) => itemsRelationship.ModuleId;

        public void SetParentId(ItemsRelationship itemsRelationship, object moduleId) => itemsRelationship.ModuleId = (string)moduleId;

        public Module GetParent(ItemsRelationship itemsRelationship) => itemsRelationship.Module;

        public void SetParent(ItemsRelationship itemsRelationship, Module module) => itemsRelationship.Module = module;
    }
}
