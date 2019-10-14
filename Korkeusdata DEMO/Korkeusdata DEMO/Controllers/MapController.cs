using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Korkeusdata_DEMO.dbAPI;
using Korkeusdata_DEMO.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Korkeusdata_DEMO.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MapController : ControllerBase
    {
        [HttpPost]
        [Route("")]
        public void HandlePost([FromBody] dbControls inJSON)
        {
            using (ElevationDataContext context = new ElevationDataContext())
            {

                Data dataContext = new Data();
                dataContext.MapId = inJSON.MapId;
                dataContext.MapData = inJSON.BinaryString();
                context.Data.Add(dataContext);
                context.SaveChanges();
                return;
            }
        }

        [HttpGet]
        [Route("Testi/{id}")]
        public dbControls HandleGet(string id)
        {
            dbControls palautusJSON = new dbControls();
            palautusJSON.GetValues(id);
            return palautusJSON;
        }
    }
}