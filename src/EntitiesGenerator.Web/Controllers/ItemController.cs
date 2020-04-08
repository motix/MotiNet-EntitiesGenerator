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
    public class ItemsController
        : EntityApiControllerBase<string, Item, ItemViewModel, IItemManager<Item, Module>>
    {
        public ItemsController(IItemManager<Item, Module> entityManager, IMapper mapper)
            : base(entityManager, mapper)
        { }

        protected override Expression<Func<Item, object>> EntityIdExpression => x => x.Id;

        protected override void EntitySpecificationAction(IFindSpecification<Item> specification)
        {
            specification.AddInclude(x => x.Module);
        }

        protected override IEnumerable<Item> SortEntities(IEnumerable<Item> projects)
            => projects.OrderBy(x => x.Position)
                       .ThenBy(x => x.Name);
    }
}
