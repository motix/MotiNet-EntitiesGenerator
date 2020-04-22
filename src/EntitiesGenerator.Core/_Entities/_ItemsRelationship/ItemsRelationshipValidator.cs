using MotiNet;
using MotiNet.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EntitiesGenerator
{
    public partial class ItemsRelationshipValidator<TItemsRelationship, TModule> : IValidator<TItemsRelationship, TModule>
        where TItemsRelationship : class
        where TModule : class
    {
        public ItemsRelationshipValidator(IItemsRelationshipAccessor<TItemsRelationship, TModule> accessor, EntitiesGeneratorErrorDescriber errorDescriber)
        {
            Accessor = accessor ?? throw new System.ArgumentNullException(nameof(accessor));
            ErrorDescriber = errorDescriber ?? throw new System.ArgumentNullException(nameof(errorDescriber));
        }

        protected IItemsRelationshipAccessor<TItemsRelationship, TModule> Accessor { get; }

        private EntitiesGeneratorErrorDescriber ErrorDescriber { get; }

        public async Task<GenericResult> ValidateAsync(object manager, TItemsRelationship itemsRelationship)
        {
            var theManager = this.GetManager<TItemsRelationship, IItemsRelationshipManager<TItemsRelationship, TModule>>(manager);
            var errors = new List<GenericError>();

            await this.ValidateNameAsync(theManager, Accessor, itemsRelationship, errors,
                name => ErrorDescriber.InvalidItemsRelationshipName(name), name => ErrorDescriber.DuplicateItemsRelationshipName(name));

            var internalMethod = GetType().GetMethod("ValidateInternalAsync",
                System.Reflection.BindingFlags.Instance | System.Reflection.BindingFlags.NonPublic);

            if (internalMethod != null)
            {
                internalMethod.Invoke(this, new object[] { manager, itemsRelationship, errors });
            }

            return GenericResult.GetResult(errors);
        }

        public Task<GenericResult> ValidateAsync(object manager, TModule module)
            => throw new NeverValidateSubEntityException<TModule, IItemsRelationshipManager<TItemsRelationship, TModule>>();
    }
}
