//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace LISFYPlatinumInvRegistration.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Booking_Consultation
    {
        public int DrBkng_Key { get; set; }
        public Nullable<System.DateTime> DrBkng_AloctDate { get; set; }
        public Nullable<System.DateTime> DrBkng_AloctTime { get; set; }
        public Nullable<decimal> DrBkng_MintsTake { get; set; }
        public Nullable<int> DrBkng_DivId { get; set; }
        public Nullable<decimal> DrBkng_LabNo { get; set; }
        public Nullable<decimal> DrBkng_TokenNo { get; set; }
        public Nullable<int> DrBkng_Status { get; set; }
        public string DrBkng_CompletedBy { get; set; }
        public Nullable<int> DrBkng_YrId { get; set; }
        public Nullable<int> DrBkng_CpyId { get; set; }
        public Nullable<decimal> DrBkng_bkgNo { get; set; }
        public Nullable<System.DateTime> DrBkng_Date { get; set; }
        public string DrBkng_Name { get; set; }
        public string DrBkng_bkgAddress { get; set; }
        public string DrBkng_bkgThrough { get; set; }
        public string DrBkng_MobileNo { get; set; }
        public string DrBkng_Phone { get; set; }
        public string DrBkng_Remarks { get; set; }
        public Nullable<double> DrBkng_TotalAmt { get; set; }
        public Nullable<double> DrBkng_SCharge { get; set; }
        public Nullable<double> DrBkng_NetAmt { get; set; }
        public string DrBkng_Userinfo { get; set; }
        public Nullable<int> DrBkng_Booking { get; set; }
        public Nullable<int> DrBkng_IsCancel { get; set; }
        public string DrBkng_CanclReson { get; set; }
        public string DrBkng_CanclUsrInfo { get; set; }
        public string DrBkng_TypeScan { get; set; }
    }
}