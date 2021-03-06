﻿using System.ComponentModel.DataAnnotations;

namespace EntitiesGenerator
{
    // Entity
    partial class Item
    {
        public int Position { get; set; }

        [Required]
        [StringLength(StringLengths.TitleContent)]
        public string DisplayName { get; set; }

        public bool ParameterListLineBreak { get; set; }

        public bool ModelOnly { get; set; }

        public bool AbstractModel { get; set; }

        public bool ReverseMappingLiteViewModel { get; set; }
    }
}
