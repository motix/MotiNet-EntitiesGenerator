using AutoMapper;
using EntitiesGenerator.Mvc;
using MotiNet.Entities;
using MotiNet.Entities.Mvc.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace EntitiesGenerator.Web.Controllers
{
    public class FullProjectsController
        : EntityApiControllerBase<string, Project, ProjectViewModel, IProjectManager<Project>>
    {
        public FullProjectsController(IProjectManager<Project> entityManager, IMapper mapper)
            : base(entityManager, mapper)
        { }

        protected override Expression<Func<Project, object>> EntityIdExpression => x => x.Id;

        protected override void EntitySpecificationAction(IFindSpecification<Project> specification)
            => specification.AddInclude($"{nameof(Project.Modules)}.{nameof(Module.Items)}");

        protected override IEnumerable<Project> SortEntities(IEnumerable<Project> projects)
            => projects.OrderBy(x => x.Name);

        protected override void ProcessViewModelForGet(ProjectViewModel viewModel, Project model)
        {
            viewModel.Modules = null;
            viewModel.FullModules = Mapper.Map<List<ModuleViewModel>>(model.Modules);
            foreach(var moduleViewModel in viewModel.FullModules)
            {
                moduleViewModel.Project = null;
                moduleViewModel.Items = null;
                moduleViewModel.FullItems = Mapper.Map<List<ItemViewModel>>(model.Modules.Single(x => x.Id == moduleViewModel.Id).Items);
                foreach(var itemViewModel in moduleViewModel.FullItems)
                {
                    itemViewModel.Module = null;
                }
            }
        }
    }
}
