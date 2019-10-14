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
        [Route("Meta")]
        public void HandleMetaPost([FromBody] Meta metaInJSON)
        {
            using (ElevationDataContext context = new ElevationDataContext())
            {
                context.Meta.Add(metaInJSON);
                context.SaveChanges();
                return;
            }
        }

        [HttpPost]
        [Route("Data")]
        public void HandleDataPost([FromBody] dbControls dataInJSON)
        {
            using (ElevationDataContext context = new ElevationDataContext())
            {

                Data dataContext = new Data();
                dataContext.MapId = dataInJSON.MapId;
                dataContext.MapData = dataInJSON.BinaryString();
                context.Data.Add(dataContext);
                context.SaveChanges();
                return;
            }
        }

        [HttpGet]
        [Route("{id}")]
        public GetJSON HandleGet(string id)
        {
            GetJSON dataContext = new GetJSON();
            GetJSON dataJSON = dataContext.GetValues(id);
            return dataJSON;
        }
    }
}