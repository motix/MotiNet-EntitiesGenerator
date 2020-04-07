using MotiNet;
using MotiNet.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EntitiesGenerator
{
    public class FeatureValidator<TFeature> : IValidator<TFeature>
        where TFeature : class
    {
        public FeatureValidator(IFeatureAccessor<TFeature> accessor, EntitiesGeneratorErrorDescriber errorDescriber)
        {
            Accessor = accessor;
            ErrorDescriber = errorDescriber;
        }

        protected IFeatureAccessor<TFeature> Accessor { get; }

        private EntitiesGeneratorErrorDescriber ErrorDescriber { get; }

        public async Task<GenericResult> ValidateAsync(object manager, TFeature feature)
        {
            var theManager = this.GetManager<TFeature, IFeatureManager<TFeature>>(manager);
            var errors = new List<GenericError>();

            await this.ValidateNameAsync(theManager, Accessor, feature, errors,
                name => ErrorDescriber.InvalidFeatureName(name), name => ErrorDescriber.DuplicateFeatureName(name));

            return GenericResult.GetResult(errors);
        }
    }
}
