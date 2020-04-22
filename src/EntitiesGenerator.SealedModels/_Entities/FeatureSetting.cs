using System;
using System.ComponentModel.DataAnnotations;

namespace EntitiesGenerator
{
    // Entity
    public abstract partial class FeatureSetting
    {
        [StringLength(StringLengths.Guid)]
        public string Id { get; set; } = Guid.NewGuid().ToString();
    }
}
