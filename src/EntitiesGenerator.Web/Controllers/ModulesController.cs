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
    public class ModulesController
        : EntityApiControllerBase<string, Module, ModuleViewModel, IModuleManager<Module, Project>>
    {
        public ModulesController(IModuleManager<Module, Project> entityManager, IMapper mapper)
            : base(entityManager, mapper)
        { }

        protected override Expression<Func<Module, object>> EntityIdExpression => x => x.Id;

        protected override void EntitySpecificationAction(IFindSpecification<Module> specification)
        {
            specification.AddInclude(x => x.Project);
            specification.AddInclude(x => x.Items);
        }

        protected override IEnumerable<Module> SortEntities(IEnumerable<Module> projects)
            => projects.OrderBy(x => x.Position)
                       .ThenBy(x => x.Name);
    }
}
