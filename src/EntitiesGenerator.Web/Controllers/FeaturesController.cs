using AutoMapper;
using EntitiesGenerator.Mvc;
using Microsoft.AspNetCore.Mvc;
using MotiNet.Entities;
using MotiNet.Entities.Mvc.Controllers;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EntitiesGenerator.Web.Controllers
{
    [Route("api/[controller]")]
    public class FeaturesController
        : EntityApiControllerBase<string, Feature, FeatureViewModel, IFeatureManager<Feature>>
    {
        public FeaturesController(IFeatureManager<Feature> featureManager, IMapper mapper)
            : base(featureManager, mapper)
        { }

        [HttpGet("active")]
        public virtual async Task<ActionResult<IEnumerable<FeatureViewModel>>> GetActive()
            => Get(await EntityManager.GetAllActiveAsync(EntitiesSpecificationAction));

        protected override IEnumerable<Feature> SortEntities(IEnumerable<Feature> features)
            => features.OrderBy(x => x.Position)
                       .ThenBy(x => x.Name);
    }
}
