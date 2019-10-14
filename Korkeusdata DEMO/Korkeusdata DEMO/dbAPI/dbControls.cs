using Korkeusdata_DEMO.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Korkeusdata_DEMO.dbAPI
{
    public class dbControls
    {
        public string MapId { get; set; }
        public List<float> MapData { get; set; }

        public byte[] BinaryString()
        {
            using (MemoryStream ms = new MemoryStream())
            {
                using (BinaryWriter testiWriter = new BinaryWriter(ms))
                {
                    for (int i = 0; i < MapData.Count; i++)
                    {
                        testiWriter.Write(MapData[i]);
                    }
                    byte[] mapBytes = ms.ToArray();
                    return mapBytes;
                }
            }
        }
    }

    public class GetJSON
    {
        public int? Width { get; set; }
        public int? Height { get; set; }
        public double? NodataValue { get; set; }
        public List<float> MapData { get; set; }

        public GetJSON GetValues(string id)
        {
            using (ElevationDataContext context = new ElevationDataContext())
            {
                GetJSON dataJSON = new GetJSON();
                Data dataContext = (from m in context.Data where m.MapId == id select m).FirstOrDefault();
                Meta metaContext = (from m in context.Meta where m.MapId == id select m).FirstOrDefault();
                Stream mapStream = new MemoryStream(dataContext.MapData);
                using (BinaryReader br = new BinaryReader(mapStream))
                {
                    List<float> floatMap = new List<float>();
                    for (int i = 0; i < mapStream.Length; i += 4)
                    {
                        floatMap.Add(br.ReadSingle());
                    }
                    dataJSON.MapData = floatMap;
                }
                dataJSON.Width = metaContext.Width;
                dataJSON.Height = metaContext.Height;
                return dataJSON;
            }
        }
    }
}
