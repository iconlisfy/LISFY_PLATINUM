using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LISFYPlatinumInvRegistration.Models
{
    public class Billwisecollections
    {
   public  string txtName { get; set; }
        public int txtNameid { get; set; }
        public string txtPhone { get; set; }
        public int invno { get; set; }
        public string  TempInvdate { get; set; }
        public string Inv_Name { get; set; }
        public string AhMst_PName { get; set; }
        public int Inv_InsId { get; set; }
        public double Inv_Netamt { get; set; }

        public double BalAmt { get; set; }
        public string LblSumm { get; set; }

        public bool selectall { get; set; }
        public string currentbal { get; set; }
        public string TempBalAmt { get; set; }
        public string AllowAmt { get; set; }
        public double BalanceAmt { get; set; }
        public double collallowAmt { get; set; }
        public string dtpDate { get; set; }
       
        public string lblSelectedBillAmt { get; set; }
        public string slno { get; set; }


        public string labno { get; set; }

        public string date { get; set; }
        public string pat { get; set; }
        public string corpname { get; set; }
        public double amount { get; set; }
        public double balamount { get; set; }
        public string corpid { get; set; }
        public string phonono { get; set; }
        public string TdsId { get; set; }
        public int accountkey { get; set; }
        public double txtbankamt { get; set; }
        

    }
}