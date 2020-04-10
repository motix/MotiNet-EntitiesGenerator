using MotiNet.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace EntitiesGenerator
{
    // Entity
    public sealed partial class Project
        : IIdWiseEntity<string>,
          INameWiseEntity
    {
        public Project() => Id = Guid.NewGuid().ToString();

        [StringLength(StringLengths.Guid)]
        public string Id { get; set; }

        [Required]
        [StringLength(StringLengths.TitleContent)]
        public string Name { get; set; }

        [Required]
        [StringLength(StringLengths.TitleContent)]
        public string NormalizedName { get; set; }

        [StringLength(StringLengths.TitleContent)]
        public string Namespace { get; set; }
    }

    // Relationships
    partial class Project
    {
        public ICollection<Module> Modules { get; set; }
    }

    // Customization
    partial class Project
    {
        public IEnumerable<Module> OrderedModules => Modules?.OrderBy(x => x.Position);
    }
}
