using AutoMapper;
using EntitiesGenerator.Mvc;
using EntitiesGenerator.Web.ViewModels.Building;
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
    public class ModulesController
        : EntityApiControllerBase<string, Module, ModuleViewModel, IModuleManager<Module, Project>>
    {
        private readonly IItemsRelationshipManager<ItemsRelationship, Module> _itemsRelationshipManager;

        public ModulesController(
            IModuleManager<Module, Project> entityManager,
            IItemsRelationshipManager<ItemsRelationship, Module> itemsRelationshipManager,
            IMapper mapper)
            : base(entityManager, mapper)
            => _itemsRelationshipManager = itemsRelationshipManager ?? throw new ArgumentNullException(nameof(itemsRelationshipManager));

        protected override Expression<Func<Module, object>> EntityIdExpression => x => x.Id;

        [HttpPost("add-items-relationship/{id}")]
        public async Task<ActionResult<ModuleViewModel>> AddItemsRelationship([FromRoute]string id, [FromBody]AddItemsRelationshipViewModel viewModel)
        {
            var module = await EntityManager.FindByIdAsync(id);

            if (module == null)
            {
                return NotFound();
            }

            ItemsRelationship model = viewModel.Type switch
            {
                nameof(OneToManyItemsRelationship) => new OneToManyItemsRelationship
                {
                    ModuleId = id,
                    Position = viewModel.Position,
                    Item1Id = viewModel.Item1Id,
                    Item2Id = viewModel.Item2Id,
                    Item1PropertyName = viewModel.Item1PropertyName,
                    Item2PropertyName = viewModel.Item2PropertyName
                },

                nameof(ManyToManyItemsRelationship) => new ManyToManyItemsRelationship
                {
                    ModuleId = id,
                    Position = viewModel.Position,
                    Item1Id = viewModel.Item1Id,
                    Item2Id = viewModel.Item2Id,
                    Item1PropertyName = viewModel.Item1PropertyName,
                    Item2PropertyName = viewModel.Item2PropertyName
                },

                _ => throw new NotImplementedException(),
            };

            var createResult = await _itemsRelationshipManager.CreateAsync(model);

            if (!createResult.Succeeded)
            {
                return BadRequest(createResult);
            }

            var result = await Get(id);
            result.Value.Items = null;

            return result;
        }

        [HttpPost("remove-items-relationship/{id}")]
        public async Task<ActionResult<ModuleViewModel>> RemoveItemsRelationship([FromRoute]string id)
        {
            var model = await _itemsRelationshipManager.FindByIdAsync(id);

            if (model == null)
            {
                return NotFound();
            }

            var deleteResult = await _itemsRelationshipManager.DeleteAsync(model);

            if (!deleteResult.Succeeded)
            {
                return BadRequest(deleteResult);
            }

            var result = await Get(model.ModuleId);
            result.Value.Items = null;

            return result;
        }

        [HttpPost("update-one-to-many-items-relationship")]
        public Task<ActionResult<ModuleViewModel>> UpdateOneToManyItemsRelationship([FromBody] OneToManyItemsRelationshipViewModel viewModel)
            => UpdateItemsRelationship<OneToManyItemsRelationship, OneToManyItemsRelationshipViewModel>(viewModel);

        [HttpPost("update-many-to-many-items-relationship")]
        public Task<ActionResult<ModuleViewModel>> UpdateManyToManyItemsRelationship([FromBody] ManyToManyItemsRelationshipViewModel viewModel)
            => UpdateItemsRelationship<ManyToManyItemsRelationship, ManyToManyItemsRelationshipViewModel>(viewModel);

        protected override void EntitySpecificationAction(IFindSpecification<Module> specification)
        {
            specification.AddInclude(x => x.Project);
            specification.AddInclude(x => x.Items);
            specification.AddInclude(x => x.ItemsRelationships);
        }

        protected override IEnumerable<Module> SortEntities(IEnumerable<Module> projects)
            => projects.OrderBy(x => x.Position)
                       .ThenBy(x => x.Name);

        protected override void ProcessViewModelForGet(ModuleViewModel viewModel, Module model)
        {
            ProcessViewModelForGetInternal(viewModel, model);
        }

        protected override void ProcessViewModelsForGet(IEnumerable<ModuleViewModel> viewModels, IEnumerable<Module> models)
        {
            for (var i = 0; i < viewModels.Count(); i++)
            {
                var viewModel = viewModels.ElementAt(i);
                var model = models.ElementAt(i);
                ProcessViewModelForGetInternal(viewModel, model);
            }
        }

        private void ProcessViewModelForGetInternal(ModuleViewModel viewModel, Module model)
        {
            viewModel.DistributeItemsRelationships();
            viewModel.ItemsRelationships = null;
        }

        private async Task<ActionResult<ModuleViewModel>> UpdateItemsRelationship<TItemsRelationship, TItemsRelationshipViewModel>(TItemsRelationshipViewModel viewModel)
            where TItemsRelationship : ItemsRelationship
            where TItemsRelationshipViewModel : ItemsRelationshipLiteViewModel
        {
            var oldModel = await _itemsRelationshipManager.FindByIdAsync(viewModel.Id);

            if (oldModel == null)
            {
                return NotFound();
            }

            var model = Mapper.Map<TItemsRelationship>(viewModel);

            var updateResult = await _itemsRelationshipManager.UpdateAsync(model);

            if (!updateResult.Succeeded)
            {
                return BadRequest(updateResult);
            }

            var result = await Get(model.ModuleId);
            result.Value.Items = null;

            return result;
        }
    }
}
