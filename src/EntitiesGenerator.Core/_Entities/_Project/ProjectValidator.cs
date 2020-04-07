using MotiNet;
using MotiNet.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EntitiesGenerator
{
    public class ProjectValidator<TProject> : IValidator<TProject>
        where TProject : class
    {
        public ProjectValidator(IProjectAccessor<TProject> accessor, EntitiesGeneratorErrorDescriber errorDescriber)
        {
            Accessor = accessor;
            ErrorDescriber = errorDescriber;
        }

        protected IProjectAccessor<TProject> Accessor { get; }

        private EntitiesGeneratorErrorDescriber ErrorDescriber { get; }

        public async Task<GenericResult> ValidateAsync(object manager, TProject project)
        {
            var theManager = this.GetManager<TProject, IProjectManager<TProject>>(manager);
            var errors = new List<GenericError>();

            await this.ValidateNameAsync(theManager, Accessor, project, errors,
                name => ErrorDescriber.InvalidProjectName(name), name => ErrorDescriber.DuplicateProjectName(name));

            return GenericResult.GetResult(errors);
        }
    }
}
