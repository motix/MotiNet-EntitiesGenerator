namespace EntitiesGenerator
{
    public class ProjectAccessor : IProjectAccessor<Project>
    {
        public object GetId(Project project) => project.Id;

        public string GetName(Project project) => project.Name;

        public void SetNormalizedName(Project project, string normalizedName) => project.NormalizedName = normalizedName;
    }
}
