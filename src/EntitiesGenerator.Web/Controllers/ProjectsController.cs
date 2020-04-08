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
    public class ProjectsController
        : EntityApiControllerBase<string, Project, ProjectViewModel, IProjectManager<Project>>
    {
        public ProjectsController(IProjectManager<Project> entityManager, IMapper mapper)
            : base(entityManager, mapper)
        { }

        protected override Expression<Func<Project, object>> EntityIdExpression => x => x.Id;

        protected override void EntitySpecificationAction(IFindSpecification<Project> specification)
            => specification.AddInclude(x => x.Modules);

        protected override IEnumerable<Project> SortEntities(IEnumerable<Project> projects)
            => projects.OrderBy(x => x.Name);
    }
}
