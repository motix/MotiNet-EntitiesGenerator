using System;
using System.ComponentModel.DataAnnotations;

namespace EntitiesGenerator
{
    // Entity
    public abstract partial class FeatureSetting
    {
        protected FeatureSetting() => Id = Guid.NewGuid().ToString();

        [StringLength(StringLengths.Guid)]
        public string Id { get; set; }
    }
}
