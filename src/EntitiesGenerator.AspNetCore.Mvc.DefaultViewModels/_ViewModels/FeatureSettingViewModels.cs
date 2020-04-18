using System;

namespace EntitiesGenerator.Mvc
{
    // Base
    public abstract partial class FeatureSettingViewModelBase
    {
        protected FeatureSettingViewModelBase() => Id = Guid.NewGuid().ToString();

        public string Id { get; set; }
    }

    // Full
    public partial class FeatureSettingViewModel : FeatureSettingViewModelBase
    { }

    // Lite
    public partial class FeatureSettingLiteViewModel : FeatureSettingViewModelBase
    { }
}
