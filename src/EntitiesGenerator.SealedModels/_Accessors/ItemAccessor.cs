namespace EntitiesGenerator
{
    public class ItemAccessor : IItemAccessor<Item, Module>
    {
        public object GetId(Item item) => item.Id;

        public string GetName(Item item) => item.Name;

        public void SetNormalizedName(Item item, string normalizedName) => item.NormalizedName = normalizedName;

        public object GetScopeId(Item item) => item.ModuleId;

        public void SetScopeId(Item item, object moduleId) => item.ModuleId = (string)moduleId;

        public Module GetScope(Item item) => item.Module;

        public void SetScope(Item item, Module module) => item.Module = module;
    }
}
