using MotiNet;
using MotiNet.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EntitiesGenerator
{
    public partial class ItemValidator<TItem, TModule> : IValidator<TItem, TModule>
        where TItem : class
        where TModule : class
    {
        public ItemValidator(IItemAccessor<TItem, TModule> accessor, EntitiesGeneratorErrorDescriber errorDescriber)
        {
            Accessor = accessor ?? throw new System.ArgumentNullException(nameof(accessor));
            ErrorDescriber = errorDescriber ?? throw new System.ArgumentNullException(nameof(errorDescriber));
        }

        protected IItemAccessor<TItem, TModule> Accessor { get; }

        private EntitiesGeneratorErrorDescriber ErrorDescriber { get; }

        public async Task<GenericResult> ValidateAsync(object manager, TItem item)
        {
            var theManager = this.GetManager<TItem, IItemManager<TItem, TModule>>(manager);
            var errors = new List<GenericError>();

            await this.ValidateNameAsync(theManager, Accessor, item, errors,
                name => ErrorDescriber.InvalidItemName(name), name => ErrorDescriber.DuplicateItemName(name));

            var internalMethod = GetType().GetMethod("ValidateInternalAsync",
                System.Reflection.BindingFlags.Instance | System.Reflection.BindingFlags.NonPublic);

            if (internalMethod != null)
            {
                internalMethod.Invoke(this, new object[] { manager, item, errors });
            }

            return GenericResult.GetResult(errors);
        }

        public Task<GenericResult> ValidateAsync(object manager, TModule module)
            => throw new NeverValidateSubEntityException<TModule, IItemManager<TItem, TModule>>();
    }
}
