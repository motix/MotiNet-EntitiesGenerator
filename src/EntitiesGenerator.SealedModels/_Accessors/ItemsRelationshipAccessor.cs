namespace EntitiesGenerator
{
    public class ItemsRelationshipAccessor : IItemsRelationshipAccessor<ItemsRelationship>
    {
        public object GetId(ItemsRelationship projectEntitiesRelationship) => projectEntitiesRelationship.Id;
    }
}
