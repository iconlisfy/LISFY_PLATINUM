using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LISFYPlatinumInvRegistration.Models
{
    public class testDetails
    {
        //chkNABL chkSendSMS chkSampleBarcode chkFreeTest chkIncen chkStrgCritical
        public bool chkNABL { get; set; }
        public bool chkSendSMS { get; set; }
        public bool chkSampleBarcode { get; set; }
        public bool chkFreeTest { get; set; }
        public bool chkIncen { get; set; }
        public bool chkStrgCritical { get; set; }


        public string lblUser { get; set; } 
        public bool chkHideHead { get; set; }
        public bool AvoidRsltEntry { get; set; }
        public bool ChkCommonTech { get; set; }
        public List<ResultTemplate> RsltTmpltLst { get; set; }
        public List<SetGroupTest> SetGpTstLst { get; set; }
        public List<ReferedLab> ReferedLabLst { get; set; }
        public List<SetSpcRate> specRate { get; set; }
        public List<ReferanceRange1> refRange1 { get; set; }
        public bool optRef1 { get; set; }
        public string Sample_Type { get; set; }
        public string SaveFlag { get; set; }
        public string TstMst_Type { get; set; }
        public string Sample { get; set; }
        public string Method { get; set; }
        public string Gender { get; set; }
        public string Unit { get; set; }
        public string rtbSpec { get; set; }
        public string Technology { get; set; }
        public string InternalNote { get; set; }
        public string RefRange2 { get; set; }
        public string Specficatn { get; set; }
        //public string RefRange1 { get; set; }
        public string SpecRef { get; set; }
        public string Specificatn { get; set; }
        public string Volume { get; set; }
        public string Division { get; set; }
        public string CtOfTime { get; set; }
        public string Department { get; set; }
        public double SplR_DisPer { get; set; }
        public string TstMst_Mode { get; set; }
        public Nullable<double> TstMst_DiscPer { get; set; }
        public int TstMst_Key { get; set; }
        public double Corp_Id { get; set; }
        public string TstMst_name { get; set; }
        public string PerformAt { get; set; }
        public Nullable<double> PerformatID { get; set; }
        public Nullable<double> TstMst_CtTimeID { get; set; }
        public Nullable<double> TstMst_Rate { get; set; }
        public Nullable<double> SplR_NRate { get; set; }
        public Nullable<double> TstMst_Total { get; set; }
        public Nullable<double> discount { get; set; }
        public Nullable<double> Gross_Amnt { get; set; }
        public string TstMst_ShortName { get; set; }
        public string TstMst_ReportON { get; set; }
        public string TstMst_rptonDMH { get; set; }
        public Nullable<double> TstMst_ModeID { get; set; }
        public Nullable<double> TstMst_DivId { get; set; }
        public Nullable<double> TstMst_TypeId { get; set; }
        public Nullable<double> TstMst_VolumeId { get; set; }
        public Nullable<double> TstMst_SmplId { get; set; }
        public Nullable<int> TstMst_DeptId { get; set; }
        public Nullable<double> TstMst_TechId { get; set; }
        public Nullable<int> TstMst_MthdId { get; set; }
        public Nullable<int> TstMst_UnitId { get; set; }
        public int TstMst_RefNo { get; set; }
        public int TstMst_IsAvoid { get; set; }
        public int TstMst_IsCovidTst { get; set; }
        public double SplR_TstID { get; set; }
        public string tst_RptDay { get; set; }
        public string tst_RptTmeDays { get; set; }
        public string Inv_Dates { get; set; }
        public string Doctor { get; set; }
        public string Lab_No { get; set; }
        public string Test_Result { get; set; }
    }
}