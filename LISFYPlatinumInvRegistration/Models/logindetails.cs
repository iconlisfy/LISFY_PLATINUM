using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace LISFYPlatinumInvRegistration.Models
{
    public class logindetails
    {
        public Nullable<double> Yr_Id { get; set; }
        public string Yr_FYear { get; set; }
        public double BrMst_Key { get; set; }
        public string BrMst_Code { get; set; }
        public string BrMst_Name { get; set; }
        public DateTime fromdate { get; set; }
        public DateTime todate { get; set; }
        public int dailyCheck { get; set; }
        public int rowCount { get; set; }
        public string[] checkedBrnch { get; set; }
        public string[] checkedBrnchId { get; set; }
        public string ff { get; set; }
        public string tt { get; set; }
        [Required]
        public int Usr_key { get; set; }
        [Required]
        public string Usr_pwd { get; set; }
        [Required]
        public string Usr_Name { get; set; }
        [Required]
        public string Usr_grp { get; set; }
        //[Required]
        //public Nullable<decimal> Yr_Id { get; set; }
        [Required]
        public int Usr_EmpId { get; set; }
        public int Usr_EmpKey { get; set; }

        public int Usr_Sign { get; set; }

        public int Usr_SuperUser { get; set; }
        public int Usr_Status { get; set; }

        public int user_Secnd { get; set; }


    }
}