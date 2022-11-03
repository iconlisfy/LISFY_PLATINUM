using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LISFYPlatinumInvRegistration.Models
{
    public class ChequeReceival
    {
        public string ChqRecTransNo { get; set; }
        public int ChqRecTransNoid { get; set; }
        public string ChqRecParty { get; set; }

        public int ChqRecPartyid { get; set; }
        public string ChqRecBank { get; set; }
        public string ChqRecBankid { get; set; }
        public string ChqReccurDate { get; set; }
        public string ChqRecAmt { get; set; }
        public string ChqRecNarr { get; set; }
        public string ChqRecUsrinfo { get; set; }
        public string ChqRecNo { get; set; }
        public string ChqRecDate { get; set; }
        public int _IsCheqPass { get; set; }

    }
}