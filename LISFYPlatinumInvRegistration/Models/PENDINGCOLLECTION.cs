using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LISFYPlatinumInvRegistration.Models
{
    public class PENDINGCOLLECTION
    {
        public int pendlabno { get; set; }


        public string pnddatetime { get; set; }
        public string pndnote { get; set; }

        public string pndprifix { get; set; }
        public string pndname { get; set; }
        public int agedd { get; set; }

        public int agemm { get; set; }

        public int ageyy { get; set; }
        public string pndgender { get; set; }
        public string pndphono { get; set; }
        public string pndemail { get; set; }
        public string pndpaymode { get; set; }
        public string pndcardno { get; set; }
        public string pndbank { get; set; }
        public string pndamt { get; set; }
        public string pndcurbalance { get; set; }
        public string pndcollamt { get; set; }
        public string pndcoldatetime { get; set; }

        public DateTime pndfromdate { get; set; }

        public DateTime pndtodate { get; set; }
        public bool pndcorporate { get; set; }

        public string pndcorptxt { get; set; }
        public int corpid { get; set; }
        public bool chkcorp { get; set; }
        public string LabNo { get; set; }

        public string InvDate { get; set; }

        public string InvName { get; set; }
        public string InvCurbalance { get; set; }

        public string Invuser { get; set; }
        public string Invcorporate { get; set; }
        public string pndc_date { get; set; }
        public double PndC_Amount { get; set; }

        public string PndC_TimeSmp { get; set; }

        public string PndC_YrId { get; set; }
        public string pendviewlabno { get; set; }
        public string pndviewname { get; set; }
        public string pndviewtotal { get; set; }
        public string pndpaymodeview { get; set; }
        public string discperview { get; set; }
        public string pndviewdisc { get; set; }
        public string pndbankid { get; set; }

        public string pndscharge { get; set; }
        public string pndnetamt { get; set; }
        public string pndpaidnetamt { get; set; }
        public string pndBalance { get; set; }
        public string pnddiscrson { get; set; }
        public string TESTNAME { get; set; }
        public double DISCAMT { get; set; }
        public string RATE { get; set; }
        public string TOTAL { get; set; }
        public string TESTCODE { get; set; }

        public bool printcheck { get; set; }

        public string pndfrm { get; set; }
        public string pndto { get; set; }

    }
}