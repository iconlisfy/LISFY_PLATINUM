using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LISFYPlatinumInvRegistration.Models
{
    public class accountledgercs
    {
        public string accountname { get; set; }
        public int splrChk { get; set; }
        public string accounttype { get; set; }

        public string saveFlag { get; set; }

        public string AhMst_pName { get; set; }
        public int AhMst_AcGrpId { get; set; }
        public string AhMst_Type { get; set; }
        public string HEAD { get; set; }
        public string Mstr_Desc { get; set; }
        public int AhMst_SchemeId { get; set; }
        public int OPBALANCE { get; set; }
        public int AhMst_CRDays { get; set; }
        public int AhMst_CrLimit { get; set; }
        public string AhMst_Address { get; set; }
        public int AhMst_AreaID { get; set; }
        public string AhMst_Phno { get; set; }
        public string AhMst_mobile { get; set; }
        public string AhMst_Email { get; set; }

        public int AhMst_Key { get; set; }
        public string AhMst_Note { get; set; }
        public string AhMst_DiscPer { get; set; }
        public string AhMst_TstDiscPer { get; set; }
        public int OpBl_AccId { get; set; }
        //int IsAvdLettHead = 0;
        //int IsAvdHd = 0;
        public bool IsAvdHd { get; set; }
        public bool IsAvdLettHead { get; set; }
        public string txtAddress { get; set; }
        public string txtPhone { get; set; }
        public string txtMobile { get; set; }
        public string txtEmail { get; set; }
        public string txtDiscount { get; set; }
        public string SendMail { get; set; }
        public string txtCreditLmt { get; set; }
        public bool chkEmailReport { get; set; }
        public string txtScheme { get; set; }
        public string txtCustType { get; set; }
        public string txtArea { get; set; }
        public string IsActive { get; set; }
        public string txtACgrpName { get; set; }

        public string txtDescrpton { get; set; }
        public string cmbPayType { get; set; }
        public string txtTstDiscPer { get; set; }
        public string txtcrDays { get; set; }
        public string txtGroup { get; set; }
        public string nGROUPLEVEL { get; set; }
        public string nLEVEL1 { get; set; }
        public bool chkAvoidLH { get; set; }
        public string cmbPayMode { get; set; }
        public string txtOpeningBalnc { get; set; }
        public string cmbOpnType { get; set; }
        public double ChqPay { get; set; }
        public double ChqRec { get; set; }
        public bool chkIsActive { get; set; }

        public double OpAmt { get; set; }
        public double CashPay { get; set; }

        public double CashRec { get; set; }
        public int txtSchemeid { get; set; }
        public int txtCustTypeid { get; set; }
        public string txtAreaid { get; set; }

        public int txtACgrpId { get; set; }
        public string txtGroupid { get; set; }
        public string txtCur { get; set; }
        //public bool IsAvdHd { get; set; }
        //public bool IsAvdLettHead { get; set; }
        public int txtLedgerNameid { get; set; }
        public string txtLedgerName { get; set; }
        public string InsertMode { get; set; }
        public int CrLimit { get; set; }
        public double OpeningBal { get; set; }
        public int AhMst_CustTypeId { get; set; }
        public string AcGrp_GrpName { get; set; }
        public string AhMst_CustType { get; set; }
        public string AhMst_Scheme { get; set; }
        public string GROUPCODE { get; set; }
        public int txtHosId { get; set; }

        public string txtHosName { get; set; }
        public string txtHosConPrsn { get; set; }
        public string txtHosSpecialised { get; set; }
        public string dtpHospDay { get; set; }

        public string txtNoteHos { get; set; }
        public int txtHosNameid { get; set; }
        public int txtHosSpecialisedid { get; set; }
        public string Area { get; set; }
        public string AraMst_Name { get; set; }

        public string txtHosArea { get; set; }
        public string txtStfNameid { get; set; }

        public string txtStfName { get; set; }
        public bool optMale { get; set; }
        public bool optFemale { get; set; }
        public string txtStfAddres { get; set; }
        public int txtStfAreaid { get; set; }
        public string txtStfConPrsn { get; set; }
        public string txtStfPhone { get; set; }
        public string txtStfMobile { get; set; }
        public string dtpStfDob { get; set; }
        public string dtpStfWedding { get; set; }
        public string txtStfEmail { get; set; }
        public string txtStfNote { get; set; }
        public string txtStfArea { get; set; }
        public string txtStfId { get; set; }

        public string txtUsrName { get; set; }
        public string txtUsrNameid { get; set; }
        public string txtPasswrd { get; set; }

        public string txtRtpass { get; set; }

        public string cmbUsrGrp { get; set; }
        public string txtEmp { get; set; }

        public decimal txtEmpid { get; set; }

        public string Filepic { get; set; }
        public string codelookup { get; set; }
        public float valueslookup { get; set; }
        public string detailslookup { get; set; }
        public string namelookup { get; set; }
        public int masterkeylookup { get; set; }
        public string mastertype { get; set; }
        public int txtLabNo { get; set; }
        public string invdatetime { get; set; }
        public string invprefix { get; set; }
        public string invname { get; set; }
        public string invdatebirth { get; set; }

        public bool invmale { get; set; }
        public bool invfemale { get; set; }
        public string invphono { get; set; }
        public string invemail { get; set; }
        public string invrefby { get; set; }
        public int invrefbyid { get; set; }

        public string invoutdr { get; set; }
        public string invbranch { get; set; }
        public int invbranchid { get; set; }
        public string invipopno { get; set; }
        public string invcollmode { get; set; }

        public string invcollby { get; set; }
        public string sampleon { get; set; }
        public string reporton { get; set; }
        public string invamount { get; set; }
        public bool chkPersonally { get; set; }
        public bool chkTelephone { get; set; }
        public bool chkCourier { get; set; }
        public bool chkEmail { get; set; }

        public bool chkSms { get; set; }
        public string txtReason { get; set; }
        public int Inv_Status { get; set; }
       public int txtNameid { get; set; }
        public int txtCollByid { get; set; }
        public int invage { get; set; }
        
        public int invyear { get; set; }

        public int invmonth { get; set; }
        public string editlabno { get; set; }
        public string editlabnoid { get; set; }
        
        public string editprefix { get; set; }

        public string editname { get; set; }
        public string editnameid { get; set; }
        public int editinvage { get; set; }

        public int editinvmonth { get; set; }

        public int editinvyear { get; set; }
        public bool editmale { get; set; }
        public bool editfemale { get; set; }
        public string editphone { get; set; }
        public string editphone2 { get; set; }
        public string editemail { get; set; }
        public string editnationality { get; set; }
        public string editaddress { get; set; }
        public string editrefby { get; set; }
        public string editrefbyid { get; set; }
        
        public string editoutdr { get; set; }
        public string editpassport { get; set; }
        public string editsrfno { get; set; }
        public string editbranch { get; set; }
        public string editbranchid { get; set; }
        public string editadhar { get; set; }
        public string editwardno { get; set; }

        public string editwardnoid { get; set; }
        public string editipopno { get; set; }
        public string editcollmode { get; set; }
        public string editcollmodeid { get; set; }
        public string editcollby { get; set; }
        public string editcollbyid { get; set; }
        public string editsampleon { get; set; }
        public string editreporton { get; set; }
        public bool editpersonality { get; set; }
        public bool edittelephone { get; set; }
        public bool editcourier { get; set; }
        public bool chkeditemail { get; set; }
        public bool editsms { get; set; }
        public string txtReleaseMode { get; set; }
        public bool urgentreport { get; set; }
        public string editnote { get; set; }
        public string LblPateniId { get; set; }
        public bool editwastsup { get; set; }
        public string O_Branch { get; set; }
         public string O_CollBy { get; set; }
        public string O_CollMode { get; set; }
        public string O_Gender { get; set; }
        public string O_InPhone { get; set; }

        public string O_Inv_Address { get; set; }
        public string O_Inv_Age { get; set; }
        public string O_Inv_Doctor { get; set; }
        public string O_Inv_Email { get; set; }
        public string O_Inv_OutDoctor { get; set; }
        public string O_InvAgeIn { get; set; }
        public string O_InvName { get; set; }
        public string O_Prefix { get; set; }
        public string o_Inv_Mob { get; set; }
        public string O_Ward { get; set; }
        public string O_Srf { get; set; }
        public string O_Passport { get; set; }
        public string O_ReportedOn { get; set; }
        public string O_ReptReqCour { get; set; }
        public string O_ReptReqEmail { get; set; }
        public string O_ReptReqPer { get; set; }
        public string O_ReptReqsms { get; set; }
        public string O_ReptReqTel { get; set; }
        public string O_SampledOn { get; set; }
        public bool O_Urgent { get; set; }
        public string O_Inv_note { get; set; }
        public string dtpHospDay1 { get; set; }
        
        //  public int pendlabno { get; set; }


        //  public string pnddatetime { get; set; }
        //  public string pndnote { get; set; }

        //  public string pndprifix { get; set; }
        //  public string pndname { get; set; }
        //  public int agedd { get; set; }

        //  public int agemm { get; set; }

        //  public int ageyy { get; set; }
        //  public string pndgender { get; set; }
        //  public string pndphono { get; set; }
        //  public string pndemail { get; set; }
        //  public string pndpaymode { get; set; }
        //  public string pndcardno { get; set; }
        //  public string pndbank { get; set; }
        //  public string pndamt { get; set; }
        //  public string pndcurbalance { get; set; }
        //  public string pndcollamt { get; set; }
        //  public string pndcoldatetime { get; set; }

        //  public DateTime pndfromdate { get; set; }

        //  public DateTime pndtodate { get; set; }
        //  public bool pndcorporate { get; set; }

        //  public string pndcorptxt { get; set; }
        //  public int corpid { get; set; }
        //public bool chkcorp { get; set; }
        //  public string LabNo { get; set; }

        //  public string InvDate { get; set; }

        //  public string InvName { get; set; }
        //  public string InvCurbalance { get; set; }

        //  public string Invuser { get; set; }
        //  public string Invcorporate { get; set; }
        //  public string pndc_date { get; set; }
        //  public double PndC_Amount { get; set; }

        //  public  string PndC_TimeSmp { get; set; }

        //  public string PndC_YrId { get; set; }
        //  public string pendviewlabno { get; set; }
        //  public string pndviewname { get; set; }
        //  public string pndviewtotal { get; set; }
        //  public string pndpaymodeview { get; set; }
        //  public string discperview { get; set; }
        //  public string pndviewdisc { get; set; }
        //  public string pndbankid { get; set; }

        //  public string pndscharge { get; set; }
        //  public string pndnetamt { get; set; }
        //  public string pndpaidnetamt { get; set; }
        //  public string pndBalance { get; set; }
        //  public string pnddiscrson { get; set; }
        //  public string TESTNAME { get; set; }
        //  public double DISCAMT { get; set; }
        //  public string RATE { get; set; }
        //  public string TOTAL { get; set; }
        //  public string TESTCODE { get; set; }






    }
}