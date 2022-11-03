using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LISFYPlatinumInvRegistration.Models
{
    public class patientMst
    {
        //AhMst_Ismale AhMst_Email AhMst_Phno AhMst_Dob AhMst_mobile AhMst_Address AhMst_pName AhMst_Key AhMst_Code  testDate
        public string patSrch { get; set; }
        public string testDOB { get; set; }
        public string AhMst_Ismale { get; set; }
        public string AhMst_Email { get; set; }
        public string AhMst_Phno { get; set; }
        public DateTime AhMst_Dob { get; set; }
        public string AhMst_mobile { get; set; }
        public string AhMst_Address { get; set; }
        public string AhMst_pName { get; set; }
        public double AhMst_Key { get; set; }
        public string AhMst_Code { get; set; }
        public string AhMst_Prfx { get; set; }
    }
}