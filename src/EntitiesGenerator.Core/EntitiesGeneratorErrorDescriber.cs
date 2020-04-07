using Microsoft.Extensions.Localization;
using EntitiesGenerator.Resources;
using MotiNet;

namespace EntitiesGenerator
{
    public class EntitiesGeneratorErrorDescriber
    {
        #region Fields

        private readonly IStringLocalizer _localizer;

        #endregion

        #region Constructors

        public EntitiesGeneratorErrorDescriber(IStringLocalizer<EntitiesGeneratorErrorDescriberResources> localizer) => _localizer = localizer;

        protected EntitiesGeneratorErrorDescriber(IStringLocalizer localizer) => _localizer = localizer;

        #endregion

        #region Feature

        public virtual GenericError InvalidFeatureName(string featureName)
            => new GenericError
            {
                Code = nameof(InvalidFeatureName),
                Description = _localizer[nameof(InvalidFeatureName), featureName]
            };

        public virtual GenericError DuplicateFeatureName(string featureName)
            => new GenericError
            {
                Code = nameof(DuplicateFeatureName),
                Description = _localizer[nameof(DuplicateFeatureName), featureName]
            };

        #endregion

        #region Project

        public virtual GenericError InvalidProjectName(string projectName)
            => new GenericError
            {
                Code = nameof(InvalidProjectName),
                Description = _localizer[nameof(InvalidProjectName), projectName]
            };

        public virtual GenericError DuplicateProjectName(string projectName)
            => new GenericError
            {
                Code = nameof(DuplicateProjectName),
                Description = _localizer[nameof(DuplicateProjectName), projectName]
            };

        #endregion

        #region Module

        public virtual GenericError InvalidModuleName(string moduleName)
            => new GenericError
            {
                Code = nameof(InvalidModuleName),
                Description = _localizer[nameof(InvalidModuleName), moduleName]
            };

        public virtual GenericError DuplicateModuleName(string moduleName)
            => new GenericError
            {
                Code = nameof(DuplicateModuleName),
                Description = _localizer[nameof(DuplicateModuleName), moduleName]
            };

        #endregion

        #region Item

        public virtual GenericError InvalidItemName(string itemName)
            => new GenericError
            {
                Code = nameof(InvalidItemName),
                Description = _localizer[nameof(InvalidItemName), itemName]
            };

        public virtual GenericError DuplicateItemName(string itemName)
            => new GenericError
            {
                Code = nameof(DuplicateItemName),
                Description = _localizer[nameof(DuplicateItemName), itemName]
            };

        #endregion
    }
}
