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
    
    public partial class User
    {
        public double Usr_key { get; set; }
        public string Usr_Name { get; set; }
        public string Usr_pwd { get; set; }
        public string Usr_grp { get; set; }
        public Nullable<decimal> Usr_EmpId { get; set; }
        public string Usr_EmpKey { get; set; }
        public byte[] Usr_Sign { get; set; }
        public Nullable<bool> Usr_SuperUser { get; set; }
        public Nullable<int> Usr_Status { get; set; }
        public Nullable<bool> user_Secnd { get; set; }
        public Nullable<int> user_PrintView { get; set; }
    }
}
