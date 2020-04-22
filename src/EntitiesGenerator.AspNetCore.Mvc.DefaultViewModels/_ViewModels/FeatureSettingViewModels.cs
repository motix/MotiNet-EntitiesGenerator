using System;

namespace EntitiesGenerator.Mvc
{
    // Base
    public abstract partial class FeatureSettingViewModelBase
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
    }

    // Full
    public partial class FeatureSettingViewModel : FeatureSettingViewModelBase
    { }

    // Lite
    public partial class FeatureSettingLiteViewModel : FeatureSettingViewModelBase
    { }
}
