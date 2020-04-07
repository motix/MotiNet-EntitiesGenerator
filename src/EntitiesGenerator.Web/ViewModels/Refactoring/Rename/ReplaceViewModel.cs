namespace EntitiesGenerator.Web.ViewModels.Refactoring.Rename
{
    public class ReplaceViewModel
    {
        public string Path { get; set; }

        public string Search { get; set; }

        public string Replace { get; set; }

        public bool CaseSensitive { get; set; }

        public bool Recursive { get; set; }
    }
}
