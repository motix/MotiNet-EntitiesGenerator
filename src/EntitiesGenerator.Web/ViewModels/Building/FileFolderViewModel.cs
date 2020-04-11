using System.Collections.Generic;

namespace EntitiesGenerator.Web.ViewModels.Building
{
    public class FileFolderViewModel
    {
        public string Name { get; set; }

        public string Content { get; set; }

        public ICollection<FileFolderViewModel> Children { get; set; }
    }
}
