namespace EntitiesGenerator.Web.ViewModels.Building
{
    public class SaveGeneratedProjectViewModel
    {
        public string ProjectId { get; set; }

        public FileFolderViewModel SolutionStructure { get; set; }

        public bool ClearOutput { get; set; }
    }
}
