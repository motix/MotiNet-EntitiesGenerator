using System;

namespace EntitiesGenerator.Mvc
{
    // Base
    public abstract partial class ItemsRelationshipViewModelBase
    {
        protected ItemsRelationshipViewModelBase() => Id = Guid.NewGuid().ToString();

        public string Id { get; set; }
    }

    // Full
    public partial class ItemsRelationshipViewModel : ItemsRelationshipViewModelBase
    { }

    // Lite
    public partial class ItemsRelationshipLiteViewModel : ItemsRelationshipViewModelBase
    { }
}
