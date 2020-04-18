using System.ComponentModel.DataAnnotations;

namespace EntitiesGenerator
{
    // Entity
    partial class Project
    {
        [StringLength(StringLengths.TinyContent)]
        public string Namespace { get; set; }

        [StringLength(StringLengths.Website)]
        public string GenerateLocation { get; set; }

        [StringLength(StringLengths.Website)]
        public string WorkingLocation { get; set; }
    }
}
