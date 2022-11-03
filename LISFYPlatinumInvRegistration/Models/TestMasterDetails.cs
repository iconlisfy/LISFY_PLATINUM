using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LISFYPlatinumInvRegistration.Models
{
    public class TestMasterDetails
    {
        //public double Nrml_Key { get; set; }
        //public string Nrml_Sex { get; set; }
        public string lblLISCode { get; set; }
        public string tstRefName { get; set; }
        public string txtGrpAmount { get; set; }
        public string TotalRate { get; set; }
        public List<ResultTemplate> rsltTemplList { get; set; }
        public List<ReferanceRange1> rfrnceRangelist { get; set; }
        public List<ReferedLab> referalList { get; set; }
        public List<SetSpcRate> spcRatelist { get; set; }
        public List<SetGroupTest> gptstList { get; set; }
        public string Specification { get; set; }
        public string RfrnceSpec { get; set; }
        public bool optRef2Chk { get; set; }
        public string cmbSpGender { get; set; }
        public string rtbSpecifications { get; set; }
        //
        public bool NABL { get; set; }
        public bool SndSMS { get; set; }
        public bool SmplType { get; set; }
        public bool FreeTst { get; set; }
        public bool AvoidInc { get; set; }
        public bool AlphaCritical { get; set; }
        public bool chkCommonTech { get; set; }
        public bool chkAvoidRsltEntry { get; set; }
        public bool chkHideHead { get; set; }
        //
        public string txtSpecifications { get; set; }
        public string lblUser { get; set; }
        public string TestName { get; set; }
        public string TestKey { get; set; }
        public string TestType { get; set; }
        public string TestTypeID { get; set; }
        public string TestMethod { get; set; }
        public string TestMethodID { get; set; }
        public string TestRate { get; set; }
        public string TestDiscPer { get; set; }
        public string TestDpmnt { get; set; }
        public string TestDpmntID { get; set; }
        public string TestDivision { get; set; }
        public string TestDivisionID { get; set; }
        public string TestAmount { get; set; }
        public string TestUnit { get; set; }
        public string TestUnitID { get; set; }
        public string TestTech { get; set; }
        public string TestTechID { get; set; }
        public string TestSample { get; set; }
        public string TestSampleID { get; set; }
        public string TestVolume { get; set; }
        public string TestVolumeID { get; set; }
        public string TestCtTime { get; set; }
        public string TestCtTimeID { get; set; }
        public string TestMode { get; set; }
        public string TestModeID { get; set; }
        public string TestShortName { get; set; }
        public string TestRptON { get; set; }
        public string TestRptonMHD { get; set; }
        public string TestPerfmAT { get; set; }
        public string TestPerfmATID { get; set; }
        public string TstInternalNote { get; set; }
        public string RfrnceRange1 { get; set; }
        public string SpecRfrnce { get; set; }
        /////////////////////////////////////////////////////////////
        //public string RfrnceGender { get; set; }
        //public string RfrnceAgeFrm { get; set; }
        //public string RfrnceAgeType { get; set; }
        //public string RfrnceAgeTo { get; set; }
        //public string RfrnceLow { get; set; }
        //public string RfrnceHigh { get; set; }
        //public string RfrnceCrtLow { get; set; }
        //public string RfrnceCrtHigh { get; set; }
        //public string RfrnceRange { get; set; }
        ////////////////////////////////////////////////////////////

    }
}