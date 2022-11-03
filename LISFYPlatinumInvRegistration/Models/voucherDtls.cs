using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Web;

namespace LISFYPlatinumInvRegistration.Models
{
    public class voucherDtls
    {
        public DateTime vchr_IssueDate { get; set; }
        public double vchr_Key { get; set; }
        public string vchr_Narration { get; set; }
        public double vchr_Paid { get; set; }
        public double vchr_Payment { get; set; }
        public double vchr_Receipt { get; set; }
        public double vchr_TdsAmt { get; set; }
        public string vchr_TimeStamp { get; set; }
        public double vchr_TransNo { get; set; }
        public string vchr_TransType { get; set; }
        public int vchr_Updtd { get; set; }
        public int vchr_UsrId { get; set; }
        public int vchr_YrId { get; set; }
        public Image vchr_Attachment { get; set; }
        public int vchr_AutoBrKey { get; set; }
        public int vchr_AutoBrVchrKey { get; set; }
        public double vchr_BookId { get; set; }
        public int vchr_BrId { get; set; }
        public int vchr_CashAllUsr { get; set; }
        public int vchr_CashUsr { get; set; }
        public int vchr_Chq { get; set; }
        public DateTime vchr_ChqDate { get; set; }
        public string vchr_ChqNo { get; set; }
        public int vchr_ChqPassed { get; set; }
        public int vchr_CpyId { get; set; }
        public double vchr_CurBal { get; set; }
        public DateTime vchr_Date { get; set; }
        public double vchr_Id { get; set; }
    }
}