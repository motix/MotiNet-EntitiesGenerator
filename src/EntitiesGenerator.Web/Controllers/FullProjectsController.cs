using AutoMapper;
using EntitiesGenerator.Mvc;
using EntitiesGenerator.Web.ViewModels.Building;
using Microsoft.AspNetCore.Mvc;
using MotiNet.Entities;
using MotiNet.Entities.Mvc.Controllers;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace EntitiesGenerator.Web.Controllers
{
    public class FullProjectsController
        : EntityApiControllerBase<string, Project, ProjectViewModel, IProjectManager<Project>>
    {
        public FullProjectsController(IProjectManager<Project> entityManager, IMapper mapper)
            : base(entityManager, mapper)
        { }

        [HttpPost("save-generated-project")]
        public async Task<ActionResult<bool>> SaveGeneratedProject([FromBody] SaveGeneratedProjectViewModel viewModel)
        {
            var project = await EntityManager.FindByIdAsync(viewModel.ProjectId);
            if (project == null)
            {
                return false;
            }

            if (Directory.Exists(project.GenerateLocation))
            {
                var folders = Directory.GetDirectories(project.GenerateLocation);
                foreach(var folder in folders)
                {
                    Directory.Delete(folder, true);
                }

                var files = Directory.GetFiles(project.GenerateLocation);
                foreach(var file in files)
                {
                    System.IO.File.Delete(file);
                }
            }

            var path = Path.GetDirectoryName(project.GenerateLocation);
            var rootFolderName = Path.GetFileName(project.GenerateLocation);
            viewModel.SolutionStructure.Name = rootFolderName;

            SaveNode(viewModel.SolutionStructure, path);

            return true;
        }

        private void SaveNode(FileFolderViewModel node, string path)
        {
            path = Path.Combine(path, node.Name);

            if (node.Children == null)
            {
                System.IO.File.WriteAllText(path, node.Content ?? string.Empty);
            }
            else
            {
                if (!Directory.Exists(path))
                {
                    Directory.CreateDirectory(path);
                }

                foreach (var child in node.Children)
                {
                    SaveNode(child, path);
                }
            }
        }

        protected override Expression<Func<Project, object>> EntityIdExpression => x => x.Id;

        protected override void EntitySpecificationAction(IFindSpecification<Project> specification)
            => specification.AddInclude($"{nameof(Project.Modules)}.{nameof(Module.Items)}");

        protected override IEnumerable<Project> SortEntities(IEnumerable<Project> projects)
            => projects.OrderBy(x => x.Name);

        protected override void ProcessViewModelForGet(ProjectViewModel viewModel, Project model)
        {
            viewModel.Modules = null;
            viewModel.FullModules = Mapper.Map<List<ModuleViewModel>>(model.OrderedModules);
            foreach (var moduleViewModel in viewModel.FullModules)
            {
                moduleViewModel.Project = null;
                moduleViewModel.Items = null;
                moduleViewModel.FullItems = Mapper.Map<List<ItemViewModel>>(model.Modules.Single(x => x.Id == moduleViewModel.Id).OrderedItems);
                foreach (var itemViewModel in moduleViewModel.FullItems)
                {
                    itemViewModel.Module = null;
                }
            }
        }
    }
}
