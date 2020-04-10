using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EntitiesGenerator.Web.ViewModels.Building
{
    public class FileFolderViewModel
    {
        public string Name { get; set; }

        public string Content { get; set; }

        public ICollection<FileFolderViewModel> Children { get; set; }
    }
}
