using MotiNet;
using MotiNet.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EntitiesGenerator
{
    public partial class ProjectValidator<TProject> : IValidator<TProject>
        where TProject : class
    {
        public ProjectValidator(IProjectAccessor<TProject> accessor, EntitiesGeneratorErrorDescriber errorDescriber)
        {
            Accessor = accessor ?? throw new System.ArgumentNullException(nameof(accessor));
            ErrorDescriber = errorDescriber ?? throw new System.ArgumentNullException(nameof(errorDescriber));
        }

        protected IProjectAccessor<TProject> Accessor { get; }

        private EntitiesGeneratorErrorDescriber ErrorDescriber { get; }

        public async Task<GenericResult> ValidateAsync(object manager, TProject project)
        {
            var theManager = this.GetManager<TProject, IProjectManager<TProject>>(manager);
            var errors = new List<GenericError>();

            await this.ValidateNameAsync(theManager, Accessor, project, errors,
                name => ErrorDescriber.InvalidProjectName(name), name => ErrorDescriber.DuplicateProjectName(name));

            var internalMethod = GetType().GetMethod("ValidateInternalAsync",
                System.Reflection.BindingFlags.Instance | System.Reflection.BindingFlags.NonPublic);

            if (internalMethod != null)
            {
                internalMethod.Invoke(this, new object[] { manager, project, errors });
            }

            return GenericResult.GetResult(errors);
        }
    }
}
