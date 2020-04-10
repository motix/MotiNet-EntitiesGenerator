namespace EntitiesGenerator
{
    public class ModuleAccessor : IModuleAccessor<Module, Project>
    {
        public object GetId(Module module) => module.Id;

        public string GetName(Module module) => module.Name;

        public void SetNormalizedName(Module module, string normalizedName) => module.NormalizedName = normalizedName;

        public object GetScopeId(Module module) => module.ProjectId;

        public void SetScopeId(Module module, object projectId) => module.ProjectId = (string)projectId;

        public Project GetScope(Module module) => module.Project;

        public void SetScope(Module module, Project project) => module.Project = project;
    }
}
