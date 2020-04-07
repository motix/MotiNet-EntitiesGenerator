using MotiNet;
using MotiNet.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EntitiesGenerator
{
    public class ModuleValidator<TModule, TProject> : IValidator<TModule, TProject>
        where TModule : class
        where TProject : class
    {
        public ModuleValidator(IModuleAccessor<TModule, TProject> accessor, EntitiesGeneratorErrorDescriber errorDescriber)
        {
            Accessor = accessor;
            ErrorDescriber = errorDescriber;
        }

        protected IModuleAccessor<TModule, TProject> Accessor { get; }

        private EntitiesGeneratorErrorDescriber ErrorDescriber { get; }

        public async Task<GenericResult> ValidateAsync(object manager, TModule module)
        {
            var theManager = this.GetManager<TModule, IModuleManager<TModule, TProject>>(manager);
            var errors = new List<GenericError>();

            await this.ValidateNameAsync(theManager, Accessor, module, errors,
                name => ErrorDescriber.InvalidModuleName(name), name => ErrorDescriber.DuplicateModuleName(name));

            return GenericResult.GetResult(errors);
        }

        public Task<GenericResult> ValidateAsync(object manager, TProject project)
        {
            throw new NeverValidateSubEntityException<TProject, IModuleManager<TModule, TProject>>();
        }
    }
}
