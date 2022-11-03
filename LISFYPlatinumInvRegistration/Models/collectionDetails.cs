using LISFYPlatinumInvRegistration.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LISFYPlatinumInvRegistration.Models
{
    public class collectionDetails
    {
        public string TstMst_Key { get; set; }
        public string TstMst_name { get; set; }
        public List<testDetails> testdtls { get; set; }
        public System.DateTime Mdate { get; set; }
        public Nullable<double> Discamt { get; set; }
        public Nullable<double> Netamt { get; set; }
        public Nullable<double> Advance { get; set; }
        public Nullable<double> CashBalance { get; set; }
        public Nullable<double> CredBalance { get; set; }
        public Nullable<double> CCardBalance { get; set; }
        public Nullable<double> PendCol { get; set; }
        public Nullable<double> Payments { get; set; }
        public Nullable<double> NetBal { get; set; }
        public Nullable<double> CashPend { get; set; }
        public Nullable<double> CreditPend { get; set; }
        public Nullable<double> Bhim { get; set; }

        //public string s { get; set; }
        public string M_date { get; set; }
        public Nullable<double> TotalBillCollected { get; set; }
        public Nullable<double> CashColl { get; set; }
        public Nullable<double> CardColl { get; set; }
        public Nullable<double> Credit { get; set; }
        public Nullable<double> PndngOnSameDay { get; set; }
        public Nullable<double> PrePendCashColl { get; set; }
        public Nullable<double> PrePendCardColl { get; set; }
        public Nullable<double> Payment { get; set; }
        public Nullable<double> NetCash { get; set; }
        public Nullable<double> Balance { get; set; }
        public Nullable<double> nBhim { get; set; }
        public Nullable<double> Grossamt { get; set; }
        public Nullable<double> DiscAmt { get; set; }
        public string Inv_User { get; set; }
        public string Inv_Gender { get; set; }
        public string Inv_Email { get; set; }
        public string AhMst_pName { get; set; }
        public string Pat_Age { get; set; }
        public int AhMst_Key { get; set; }
        public int Inv_age { get; set; }
        public string Inv_PayMode { get; set; }
        public string Inv_No { get; set; }
        public string Inv_name { get; set; }
        public string Inv_phno { get; set; }
        public string Inv_Date { get; set; }
        public string Inv_Schrge { get; set; }
        public string CrDayLimit { get; set; }
        public string Inv_RsltNO { get; set; }
        public string Inv_Netamt { get; set; }
        public double Inv_Gross { get; set; }
        public double Inv_Disc { get; set; }
        public double TempGrossAmt { get; set; }
        public double TemDiscAmt { get; set; }
        public double TempNetAmt { get; set; }
        public string Inv_CurBalAmt { get; set; }
        //PendCollAmt ReceivedAmt
        public string PendCollAmt { get; set; }
        public string ReceivedAmt { get; set; }
        public string Inv_RcvdAmt { get; set; }
        public string Inv_CurRcvd { get; set; }
        public double Inv_DiscAmt { get; set; }

        public string corporate { get; set; }
        public double billed { get; set; }
        public double collected { get; set; }
        public double balance { get; set; }
        public double debit { get; set; }
        public double credit { get; set; }

        public double AhMst_SplID { get; set; }
        public string Mstr_Desc { get; set; }
        public string Mstr_Code { get; set; }
        public int Mstr_Key { get; set; }

    }
}