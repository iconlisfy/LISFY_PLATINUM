using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Web;

namespace LISFYPlatinumInvRegistration.Models
{
    public class doctorDtls
    {
        public Image pb_sign { get; set; }
        public string Chkbase64 { get; set; } 
        public string imgSrch { get; set; }
        public string saveFlag { get; set; }
        public string dctr_pName { get; set; }
        public string dctr_Key { get; set; }
        public string dctr_Code { get; set; }
        public bool home_addrChk { get; set; }
        public bool hosp_addrChk { get; set; }
        public string dctr_homeaddr { get; set; }
        public string dctr_hospaddr { get; set; }
        public int Incen { get; set; }
        public int ndiscpat { get; set; }
        public string DocMobile { get; set; }
        public string DocPhone { get; set; }
        public string DocEmail { get; set; }
        public string DocArea { get; set; }
        public double DocAreaKey { get; set; }
        public string LandMark { get; set; }
        public string DocConPrsn { get; set; }
        public string Catagory { get; set; }
        public double CatgKey { get; set; }
        public string DocSpecialised { get; set; }
        public double DocSplsdKey { get; set; }
        public string DocEdu { get; set; }
        public string DocHosp { get; set; }
        public double DocHospKey { get; set; }
        public string OthrNote { get; set; }
        public string txtPRO { get; set; }
        public string doc_Dob { get; set; }
        public string doc_Wedding { get; set; }
        public bool chkActive { get; set; }
        public bool chkEmailReport { get; set; }
        public bool chkEmployee { get; set; }
        public bool optMale { get; set; }
        public bool optFemale { get; set; }
        public string dctr_Note { get; set; }
    }
}