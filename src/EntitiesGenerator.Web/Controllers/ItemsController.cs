using AutoMapper;
using EntitiesGenerator.Mvc;
using Microsoft.AspNetCore.Mvc;
using MotiNet.Entities;
using MotiNet.Entities.Mvc.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace EntitiesGenerator.Web.Controllers
{
    public class ItemsController
        : EntityApiControllerBase<string, Item, ItemViewModel, IItemManager<Item, Module>>
    {
        public ItemsController(IItemManager<Item, Module> entityManager, IMapper mapper)
            : base(entityManager, mapper)
        { }

        protected override Expression<Func<Item, object>> EntityIdExpression => x => x.Id;

        public override Task<ActionResult<ItemViewModel>> Post(ItemViewModel viewModel)
        {
            viewModel.CollectFeatureSettings();

            return base.Post(viewModel);
        }

        public override Task<ActionResult<ItemViewModel>> Put(string id, ItemViewModel viewModel)
        {
            viewModel.CollectFeatureSettings();

            return base.Put(id, viewModel);
        }

        protected override void EntitySpecificationAction(IFindSpecification<Item> specification)
        {
            specification.AddInclude(x => x.Module.Project);
            specification.AddInclude(x => x.Module.ItemsRelationships);
            specification.AddInclude(x => x.FeatureSettings);
        }

        protected override IEnumerable<Item> SortEntities(IEnumerable<Item> projects)
            => projects.OrderBy(x => x.Position)
                       .ThenBy(x => x.Name);

        protected override void ProcessViewModelForGet(ItemViewModel viewModel, Item model)
        {
            ProcessViewModelForGetInternal(viewModel, model);

            viewModel.FullModule = Mapper.Map<ModuleViewModel>(model.Module);
        }

        protected override void ProcessViewModelsForGet(IEnumerable<ItemViewModel> viewModels, IEnumerable<Item> models)
        {
            for (var i = 0; i < viewModels.Count(); i++)
            {
                var viewModel = viewModels.ElementAt(i);
                var model = models.ElementAt(i);
                ProcessViewModelForGetInternal(viewModel, model);
            }
        }

        private void ProcessViewModelForGetInternal(ItemViewModel viewModel, Item model)
        {
            viewModel.DistributeFeatureSettings();
            viewModel.FeatureSettings = null;
        }
    }
}
