using LISFYPlatinumInvRegistration.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


namespace LISFYPlatinumInvRegistration.Models
{
    public class branchdetails
    {
        public string report { get; set; }
        //BrMst_Name BrMst_Key TstMst_name TstMst_Key
        public string[] TestClctnObj { get; set; }
        public string[] TestKeyObj { get; set; }
        public int IPOP_num { get; set; }
        public double TstMst_Key { get; set; }
        public string TstMst_name { get; set; }
        public string[] checkedDctr { get; set; }
        public string[] checkedDctrId { get; set; }
        public string[] checkedSplzd { get; set; }
        public string[] checkedSplzdId { get; set; }
        public double AgntKey { get; set; }
        public string TestName { get; set; }
        public double TestKey { get; set; }
        public int avoidFinishd { get; set; }
        public int uptoCheck { get; set; }
        public int billDetCheck { get; set; }
        public int avdClctdBillCheck { get; set; }
        public double catgryKey { get; set; }
        public double PROKey { get; set; }
        public string DptMnt_Name { get; set; }
        public int DptMnt_Id { get; set; }
        // Usr_Name Usr_EmpId
        public string Usr_Name { get; set; }
        public double Usr_EmpId { get; set; }
        public string[] dptClctnObj { get; set; }
        public string[] dptClctnKeyObj { get; set; }
        public string[] checkedDpt { get; set; }
        public string[] checkedDptId { get; set; }

        public string Corp_Name { get; set; }
        public double Corp_Key { get; set; }
        public string[] checkedMasters { get; set; }
        public string[] checkedMstrKey { get; set; }
        public string User_Name { get; set; }
        public double User_Key { get; set; }
        public string DctrName { get; set; }
        public string[] checkedDiv { get; set; }
        public string[] checkedDivId { get; set; }

        //public paymodeDetails paymodeDetails { get; set; }
        public string[] checkedBrnch { get; set; }
        public string[] checkedBrnchId { get; set; }
        public string Inv_PayMode { get; set; }
        public double dctrKey { get; set; }
        public string BrMst_Code { get; set; }
        public double BrMst_Key { get; set; }
        public string BrMst_Name { get; set; }
       // public string Inv_PayMode { get; set; }
        public DateTime fromdate { get; set; }
        public DateTime todate { get; set; }
        public int dctrCheck { get; set; }
        public int dailyCheck { get; set; }
        public int rowCount { get; set; }
        public int userKey { get; set; }
        public string AhMst_DrCode { get; set; }
        public string AhMst_pName { get; set; }
        public string AhMst_mobile { get; set; }
        public double AhMst_Key { get; set; }
        /////////////AreaKey PayType  
        public string PayType { get; set; }
        public string AreaName { get; set; }
        public double AreaKey { get; set; }
        public int Smry_Chk { get; set; }
        public int rptCheck { get; set; }
        public int usrCheck { get; set; }
        public string ff { get; set; }
        public string tt { get; set; }
        public double BrMstKey { get; set; }
        public string BrMstName { get; set; }
        public int usrFrom { get; set; }
        public int usrTo { get; set; }

    }
}