namespace EntitiesGenerator
{
    public class ItemsRelationshipAccessor : IItemsRelationshipAccessor<ItemsRelationship>
    {
        public object GetId(ItemsRelationship itemsRelationship) => itemsRelationship.Id;
    }
}
