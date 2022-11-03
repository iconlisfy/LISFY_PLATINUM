using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LISFYPlatinumInvRegistration.Models
{
    public class CashClosing
    {
       public bool cashAlluser { get; set; }
        public bool cashloguser { get; set; }

        public string username { get; set; }
        //public string txtid { get; set; }
        public double Inv_No { get; set; }
        public double Inv_RcvdAmt { get; set; }
        public double Inv_UsrId { get; set; }
        public string Inv_Name { get; set; }
        public double PndC_Labno { get; set; }
        public double PndC_Amount { get; set; }
        public double PndC_UsrId { get; set; }
        public string vchr_TransNo { get; set; }
        public string AccountName { get; set; }
        public string vchr_UsrId { get; set; }
        public double vchr_Payment { get; set; }
        public string vchr_Receipt { get; set; }
        public string pndname { get; set; }
        public string vchr_recpno { get; set; }
        public string AccountNamerecp { get; set; }

        public string vchr_UsrIdrecp { get; set; }


        public double Coll1 { get; set; }
        public double PendColl { get; set; }
        public double Payments { get; set; }
        public double Coll2 { get; set; }
        public double TotalAmt { get; set; }
        public string userinfo { get; set; }

       public bool printclosing { get; set; }
 public double txt2000 { get; set; }
        public double txt1000 { get; set; }
        public double txt500 { get; set; }
        public double txt200 { get; set; }
        public double txt100 { get; set; }
        public double txt50 { get; set; }
        public double txt20 { get; set; }
        public double txt10 { get; set; }
        public double txt5 { get; set; }
        public double txtcoin { get; set; }
        public double txttotals { get; set; }
        public double txtoffice { get; set; }
        public double txtbalance { get; set; }
        public double txtexcessamt { get; set; }
        public double txtshortamt { get; set; }
     public string   txtNote { get; set; }
      public string cashclosingdate { get; set; }

        public string cashtime { get; set; }
     
        public string txtId { get; set; }
        public double txtcoll1 { get; set; }
        public double txtcoll2 { get; set; }

        public double txtpayment { get; set; }
        public double txtrecp { get; set; }
        public double txtofficeamt { get; set; }

        public double txttotal { get; set; }
       


    }
}