using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LISFYPlatinumInvRegistration.Models
{
    public class ReportDispatch
    {
        public string reportPending { get; set; }
        public int ReportdisEntryNo { get; set; }
        public string ReportdisPname { get; set; }
        public string ServerSelect { get; set; }
        public string Sampleon { get; set; }
        public string Reporton { get; set; }
        public int ReportDisLabno { get; set; }
        public int Inv_Status { get; set; }
        
        public string AgeDD { get; set; }
        public string AgeMM { get; set; }
        public string AgeYY { get; set; }
        public string ReportDisipop { get; set; }
        public string BranchName { get; set; }
        public string RefBy { get; set; }
        public string ReportDisEmail { get; set; }
        public string ReportDisDate { get; set; }
        public string ReportDisTime { get; set; }

        public bool chkPersonally { get; set; }
        public bool chkTelephone { get; set; }
        public bool checkCourier { get; set; }
        public bool chkEmail { get; set; }
        public bool chksms { get; set; }
        public string RepMode { get; set; }
        public string DispatchMode { get; set; }
        public string RegNote { get; set; }

        public string Note { get; set; }
        public string RptDis_Dispmode { get; set; }
        public string RptDis_Userinfo { get; set; }
        public string RptDis_Person { get; set; }

    }
}