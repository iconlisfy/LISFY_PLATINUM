using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LISFYPlatinumInvRegistration.Models
{
    public class ChequeTransaction
    {
        public string ChqTrName { get; set; }
        public string ChqTrBank { get; set; }
        public string ChqTrNarr { get; set; }
        public string ChqTrChqNo { get; set; }
        public string ChqTrPayment { get; set; }
        public string ChqTrRec { get; set; }
        public string ChqTrTransType { get; set; }
        public string ChqTrTransNo { get; set; }
        public string datts { get; set; }
        public string datts1 { get; set; }
        public bool ChqTrPass { get; set; }



    }
}