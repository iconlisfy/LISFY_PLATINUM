using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace LISFYPlatinumInvRegistration.Models
{
    public class invoiceDetails
    {
        [Required]

        public string OrdReq_PatName { get; set; }
        [Required]
        public int OrdReq_Age { get; set; }
        [Required]
        public string OrdReq_Address { get; set; }
        [Required]
        public string OrdReq_Passport { get; set; }
        [Required]
        [Range(6000000000, 9999999999)]
        public string OrdReq_Phn { get; set; }
        [Required]
        public string OrdReq_AadhrNO { get; set; }
        [Required]
        public int OrdReq_PatID { get; set; }
        [Required]
        [EmailAddress]
        public string OrdReq_Email { get; set; }
        [Required]
        public int OrdReq_OPNO { get; set; }
        public string Temprequestdate { get; set; }
        public DateTime fromdate { get; set; }
        public DateTime todate { get; set; }
        public int OrdReq_RefNo { get; set; }
        public string OrdReq_RqstDMY { get; set; }
        public DateTime OrdReq_ReqDate { get; set; }
        public string Req_Date { get; set; }
        public DateTime requestdate { get; set; }
        public string Req_DOB { get; set; }
        public string OrdReq_PatTitle { get; set; }
        public DateTime? OrdReq_DOB { get; set; }
        public string OrdReq_Gender { get; set; }
        public string OrdReq_Cmnts { get; set; }
        public int OrdReq_CorpID { get; set; }
        public int OrdReq_YrID { get; set; }


        public int countobject { get; set; }
        public string fmdate { get; set; }
        public string rqdate { get; set; }
        public string tdate { get; set; }
        public int OrdReq_VarifyFlag { get; set; }

        public string OrdReq_Paymode { get; set; }
        public float OrdReq_NetAmnt { get; set; }
        public DateTime OrdReq_DateTime { get; set; }
        public float OrdReq_ItemDisc { get; set; }
        public DateTime accFromdate { get; set; }
        public DateTime accTodate { get; set; }

        public DateTime rptFromdate { get; set; }
        public DateTime rptTodate { get; set; }

        public double Inv_No { get; set; }
        public string Inv_RsltNO { get; set; }
        public string Inv_Date { get; set; }
        public string Inv_name { get; set; }
        public string Inv_Gender { get; set; }
        public int Inv_age { get; set; }
        public string Inv_ageymd { get; set; }
        public decimal Inv_YrId { get; set; }
        public string Inv_Tittle { get; set; }
        public string Inv_ShortName { get; set; }
        public string TstMst_name { get; set; }
        public string TstMst_ShortName { get; set; }
        public Nullable<double> TstMst_Key { get; set; }
        public Nullable<double> InvItm_TstId { get; set; }
        public Nullable<double> TstMst_TypeId { get; set; }
        public double prevPend { get; set; }
        public double totalPaid { get; set; }
        public double totalPendng { get; set; }
        public double lastBalance { get; set; }

    }
}