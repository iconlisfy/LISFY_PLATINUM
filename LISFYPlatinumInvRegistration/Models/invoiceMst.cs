﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LISFYPlatinumInvRegistration.Models
{
    public class invoiceMst
    {
        public double? PendingAmt { get; set; }
        public double scanImg { get; set; }
        public double TstMst_Key { get; set; }
        public string TstMst_name { get; set; }
        public string TstMst_ShortName { get; set; }
        public List<invoiceDet> invDetlist { get; set; }
        public List<voucherDtls> vchrList { get; set; }
        public List<testDetails> tstList { get; set; }
        public string Clinic { get; set; }
        public string CollStaff { get; set; }

        public string OutDrName { get; set; }
        public string DiscReason { get; set; }
        public string BankName { get; set; }
        public string Corporate { get; set; }
        public string Doctor { get; set; }
        public string CollMode { get; set; }
        public string Inv_DOBstring { get; set; }
        public string Inv_SmplDatestring { get; set; }
        public string Inv_RsltOnDatestring { get; set; }
        //
        public int Inv_BankId { get; set; }
        public string Inv_User { get; set; }
        public double Inv_UsrId { get; set; }
        public string Inv_Ward { get; set; }
        public double Inv_WardId { get; set; }
        public bool Inv_WhatsApp { get; set; }
        public string Inv_WhatsAppError { get; set; }
        public int Inv_WhatsAppStatus { get; set; }
        public string Inv_WhatsAppUserInfo { get; set; }
        public double Inv_YrId { get; set; }
        public string Inv_RsltNO { get; set; }
        public string Inv_SampleStatus { get; set; }
        public int Inv_ScanComplete { get; set; }
        public double Inv_Schrge { get; set; }
        public string Inv_SentMail { get; set; }
        public string Inv_ShortName { get; set; }
        public DateTime? Inv_SmplDate { get; set; }
        public string Inv_Specimn { get; set; }
        public int Inv_SpecimnId { get; set; }
        public DateTime Inv_SRFDate { get; set; }
        public string Inv_SRFno { get; set; }
        public int Inv_Status { get; set; }
        public int Inv_EtoDr { get; set; }
        public string Inv_time { get; set; }
        public string Inv_Tittle { get; set; }
        public double Inv_Token { get; set; }
        public string Inv_TokenValue { get; set; }
        public double Inv_Updtd { get; set; }
        public int Inv_PresChck { get; set; }
        public int Inv_PrintBillC { get; set; }
        public int Inv_PrintCount { get; set; }
        public string Inv_Punchyth { get; set; }
        public double Inv_RcvdAmt { get; set; }
        public DateTime Inv_Rcvddate { get; set; }
        public DateTime Inv_Rcvdtime { get; set; }
        public double Inv_RefundAmt { get; set; }
        public bool Inv_RepThrCourier { get; set; }
        public bool Inv_RepThrEmail { get; set; }
        public bool Inv_RepThrPersonal { get; set; }
        public bool Inv_RepThrPhone { get; set; }
        public bool Inv_RepThrSms { get; set; }
        public DateTime? Inv_RepTime { get; set; }
        public bool Inv_RevInc { get; set; }
        public double Inv_Roundoff { get; set; }
        public string Inv_RptMode { get; set; }
        public int Inv_MailTryed { get; set; }
        public DateTime Inv_MailTryedOn { get; set; }
        public string Inv_MemberCode { get; set; }
        public string Inv_Mob { get; set; }
        public int Inv_ModalitDiv { get; set; }
        public string Inv_name { get; set; }
        public string Inv_Nationality { get; set; }
        public double Inv_Netamt { get; set; }
        public double Inv_No { get; set; }
        public double Inv_OthAmt { get; set; }
        public string Inv_OthCmnt { get; set; }
        public string Inv_OutDr { get; set; }
        public string Inv_Passport { get; set; }
        public string Inv_PayMode { get; set; }
        public string Inv_phno { get; set; }
        public double Inv_PntId { get; set; }
        public int Inv_PntInvId { get; set; }
        public string Inv_Gender { get; set; }
        public double Inv_GrosAmt { get; set; }
        public DateTime Inv_HOreceived { get; set; }
        public double Inv_hospId { get; set; }
        public int Inv_InPackge { get; set; }
        public double Inv_InsId { get; set; }
        public string Inv_InsNo { get; set; }
        public int Inv_IsCorpReqBill { get; set; }
        public int Inv_IsInsrnce { get; set; }
        public int Inv_IsNewPat { get; set; }
        public string Inv_ItemDesc { get; set; }
        public double Inv_ItemDisc { get; set; }
        public string Inv_LisfyInfo { get; set; }
        public string Inv_LisfyPath { get; set; }
        public int Inv_LisfyUpdtd { get; set; }
        public string Inv_MailError { get; set; }
        public string Inv_CnlComnt { get; set; }
        public string Inv_Cnltmestmp { get; set; }
        public double Inv_CollModeId { get; set; }
        public string Inv_Comment { get; set; }
        public int Inv_CovidStatus { get; set; }
        public int Inv_CashAllUsr { get; set; }
        public double Inv_CpyId { get; set; }
        public double Inv_CurBalAmt { get; set; }
        public double Inv_CurRcvdAmt { get; set; }
        public DateTime? Inv_Date { get; set; }
        public double Inv_DiscAmt { get; set; }
        public double Inv_DiscId { get; set; }
        public string Inv_District { get; set; }
        public DateTime? Inv_Dob { get; set; }
        public string Inv_DocPath1 { get; set; }
        public string Inv_DocPath2 { get; set; }
        public string Inv_DocPath3 { get; set; }
        public double Inv_DrId { get; set; }
        public string Inv_Email { get; set; }
        public int Inv_EmailtoPatient { get; set; }
        public DateTime Inv_AuthDate { get; set; }
        public int Inv_AutoMail { get; set; }
        public double Inv_BalAmt { get; set; }
        public double Inv_BrID { get; set; }
        public int Inv_BrUpdtd { get; set; }
        public int Inv_CashUsr { get; set; }
        public double Inv_CltnID { get; set; }
        public DateTime Inv_CmpltdDate { get; set; }
        public string Inv_CmpltdTime { get; set; }
        public double Invl_DiscPer { get; set; }
        public int Invl_IsPending { get; set; }
        public string Inv_Aadhaar { get; set; }
        public string Inv_Address { get; set; }
        public int Inv_ageDD { get; set; }
        public int Inv_ageMM { get; set; }
        public string Inv_ageymd { get; set; }
        public int Inv_ageYY { get; set; }
        public string Inv_Area { get; set; }
        public double Inv_AreaId { get; set; }
        public double Tst_TypeId { get; set; }
    }
}