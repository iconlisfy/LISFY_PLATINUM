using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LISFYPlatinumInvRegistration.Models
{
    public class CashReceipt
    {
    public int    CashRecTransNo { get; set; }
        public int CashRecTransNoid { get; set; }
        public string CashRecDate { get; set; }
        public int CashRecAccountTxtid { get; set; }
        public string CashRecAccountTxt { get; set; }
        public string CashRecamount { get; set; }
        public string CashRecNarr { get; set; }
        public string CashRecUsrInfo { get; set; }
        public string CashRecUsrInfoid { get; set; }

        public string file { get; set; }




    }
}