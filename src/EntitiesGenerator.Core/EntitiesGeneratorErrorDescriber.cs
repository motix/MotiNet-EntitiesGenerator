using EntitiesGenerator.Resources;
using Microsoft.Extensions.Localization;
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

        #region ItemsRelationship

        public virtual GenericError InvalidItemsRelationshipName(string itemsRelationshipName)
            => new GenericError
            {
                Code = nameof(InvalidItemsRelationshipName),
                Description = _localizer[nameof(InvalidItemsRelationshipName), itemsRelationshipName]
            };

        public virtual GenericError DuplicateItemsRelationshipName(string itemsRelationshipName)
            => new GenericError
            {
                Code = nameof(DuplicateItemsRelationshipName),
                Description = _localizer[nameof(DuplicateItemsRelationshipName), itemsRelationshipName]
            };

        #endregion
    }
}
