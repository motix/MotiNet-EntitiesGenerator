﻿using System.ComponentModel.DataAnnotations;

namespace EntitiesGenerator.Mvc
{
    public class CodeBasedEntityFeatureSettingViewModel : FeatureSettingViewModel
    {
        [Display(Name = nameof(CodePropertyName), ResourceType = typeof(DisplayNames_Custom))]
        public string CodePropertyName { get; set; }

        [Display(Name = nameof(HasCodeGenerator), ResourceType = typeof(DisplayNames_Custom))]
        public bool HasCodeGenerator { get; set; }
    }
}
