using System.Linq;

namespace EntitiesGenerator
{
    // Entity
    partial class Module
    {
        public int Position { get; set; }

        public bool HasOwnNamespace { get; set; }

        public bool HasCoreOptions { get; set; }

        public bool HasEntityFrameworkCoreSealedModelsOptions { get; set; }

        public bool HasAspNetCoreOptions { get; set; }
    }

    // Customization
    partial class Module
    {
        public Module() => _orderedItemsRelationshipsMethod = list => list?.OrderBy(x => x.Item1?.Name ?? x.Item1Id)
                                                                           .ThenBy(x => x.Item2?.Name ?? x.Item2Id);
    }
}
