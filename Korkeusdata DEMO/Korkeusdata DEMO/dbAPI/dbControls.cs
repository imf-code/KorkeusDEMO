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

        public void GetValues(string id)
        {
            using (ElevationDataContext context = new ElevationDataContext())
            {

                Data evContext = (from m in context.Data where m.MapId == id select m).FirstOrDefault();
                Stream mapStream = new MemoryStream(evContext.MapData);
                using (BinaryReader br = new BinaryReader(mapStream))
                {
                    List<float> floatMap = new List<float>();
                    for (int i = 0; i < mapStream.Length; i += 4)
                    {
                        floatMap.Add(br.ReadSingle());
                    }
                    MapData = floatMap;
                }
                MapId = evContext.MapId;
            }
        }
    }
}
