using Microsoft.AspNetCore.Mvc;

namespace EntitiesGenerator.Web.Controllers
{
    [Route("api/[controller]")]
    public class AliveController : ControllerBase
    {
        [HttpGet]
        public string Get() => "Alive";
    }
}
