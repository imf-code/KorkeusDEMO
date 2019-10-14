using System;
using System.Collections.Generic;

namespace Korkeusdata_DEMO.Models
{
    public partial class Meta
    {
        public string MapId { get; set; }
        public int? Width { get; set; }
        public int? Height { get; set; }
        public double? NodataValue { get; set; }
    }
}
