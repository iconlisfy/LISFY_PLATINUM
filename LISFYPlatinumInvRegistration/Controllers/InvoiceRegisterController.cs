using LISFYPlatinumInvRegistration.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web.Mvc;
//using System.Web.UI.WebControls;
using System.Data;
using WIA;
using System.Data.SqlClient;
using CrystalDecisions.CrystalReports.Engine;
using CrystalDecisions.Shared;
using System.Web.UI.WebControls;


namespace LISFYPlatinumInvRegistration.Controllers
{
    public class InvoiceRegisterController : Controller
    {
        connection con = new connection();
        CARE021112LisfyPlatinumEntities db = new CARE021112LisfyPlatinumEntities();
        public static int _ScanerT = 0;
        private Saraff.Twain.Twain32 _twain;
        string txtDoccuFileName1 = "";
        string txtDoccuFileName2 = "";
        string txtDoccuFileName3 = "";
        string txtDoccuFileName4 = "";
        public static double Inv_No { get; set; }
        public static string currentdate { get; set; }
        public static string scanImagePath { get; set; }
        public static string SysName { get; set; }
        public static string ProjectName { get; set; }
        public static string iDateFormat = "dd/MM/yyyy";
        [HttpGet]
        public ActionResult IvoiceRegistration()
        {
            logindetails l = Session["logindls"] as logindetails;
            double? yrid = l.Yr_Id;
            double cpyid = l.BrMst_Key;
            ViewBag.CpyDls = cpyid;
            ViewBag.YrDls = yrid;
            double Invno = db.Invoice_Mst.Where(inv => inv.Inv_CpyId == (decimal)cpyid
            && inv.Inv_YrId == (decimal)yrid).Max(invc => (double?)invc.Inv_No) ?? 0;
            if (Invno == 0)
            {
                Invno = 0;
                ViewBag.lab_No = Invno + 1;
            }
            else
            {
                ViewBag.lab_No = Invno + 1;
            }
            ViewBag.YrDls = yrid;
            int collList = db.Masters.Where(mstr => mstr.Mstr_Desc == "DIRECT"
            && mstr.Mstr_Type == "CollMode").Select(ms => ms.Mstr_Key).FirstOrDefault();
            ViewBag.CollDls = collList;
            List<patientMst> pdtls = new List<patientMst>();
            var patDls = db.Patient_Mst.Select(pat => new { pat.AhMst_Code, pat.AhMst_Key, pat.AhMst_pName, pat.AhMst_Address, pat.AhMst_mobile, pat.AhMst_Dob, pat.AhMst_Phno, pat.AhMst_Email, pat.AhMst_Ismale }).ToList();
            foreach (var itm in patDls)
            {
                patientMst pat = new patientMst()
                {
                    AhMst_Code = itm.AhMst_Code,
                    AhMst_pName = itm.AhMst_pName,
                    AhMst_Address = itm.AhMst_Address,
                    AhMst_Phno = itm.AhMst_Phno
                };
                pdtls.Add(pat);
            }
            ViewBag.patDls = pdtls;
            List<accHeadsDetails> accDls = new List<accHeadsDetails>();
            accDls = (from Ah in db.AccountHeads_Mst
                      join AhS in db.Masters on (float)Ah.AhMst_SplID equals AhS.Mstr_Key
                      join St in db.SetDoctor_Staff on (float)Ah.AhMst_Key equals (float)St.SetCorp_CorpId
                      join Ahstaff in db.AccountHeads_Mst on (float)St.SetCorp_StaffId equals (float)Ahstaff.AhMst_Key
                      select new accHeadsDetails
                      {
                          AhMst_Key = Ah.AhMst_Key,
                          AhMst_HospName = Ah.AhMst_HospName,
                          AhMst_mobile = Ah.AhMst_mobile,
                          AhMst_pName = Ah.AhMst_pName,
                          Specilized = AhS.Mstr_Desc,
                          Staff = Ahstaff.AhMst_pName

                      }).Distinct().ToList();
            ViewBag.AccHdsList = accDls;
            return View();
        }
        public JsonResult PatientSearch(string term, int Check)
        {
            List<patientMst> pdtls = new List<patientMst>();
            if (Check == 0)
            {
                var patDls = db.Patient_Mst.Where(p => p.AhMst_pName.Contains(term)).Select(pat => new { pat.AhMst_Code, pat.AhMst_Key, pat.AhMst_pName, pat.AhMst_Address, pat.AhMst_mobile, pat.AhMst_Dob, pat.AhMst_Phno, pat.AhMst_Email, pat.AhMst_Ismale }).ToList();
                foreach (var itm in patDls)
                {
                    patientMst pat = new patientMst()
                    {
                        AhMst_Code = itm.AhMst_Code,
                        AhMst_pName = itm.AhMst_pName,
                        AhMst_Address = itm.AhMst_Address,
                        AhMst_Phno = itm.AhMst_Phno
                    };
                    pdtls.Add(pat);
                }
                return Json(new { Result = "OK", Records = pdtls }, JsonRequestBehavior.AllowGet);
            }
            else if (Check == 1)
            {
                var patDls = db.Patient_Mst.Where(p => p.AhMst_Code.Contains(term)).Select(pat => new { pat.AhMst_Code, pat.AhMst_Key, pat.AhMst_pName, pat.AhMst_Address, pat.AhMst_mobile, pat.AhMst_Dob, pat.AhMst_Phno, pat.AhMst_Email, pat.AhMst_Ismale }).ToList();
                foreach (var itm in patDls)
                {
                    patientMst pat = new patientMst()
                    {
                        AhMst_Code = itm.AhMst_Code,
                        AhMst_pName = itm.AhMst_pName,
                        AhMst_Address = itm.AhMst_Address,
                        AhMst_Phno = itm.AhMst_Phno
                    };
                    pdtls.Add(pat);
                }
                return Json(new { Result = "OK", Records = pdtls }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                var patDls = db.Patient_Mst.Select(pat => new { pat.AhMst_Code, pat.AhMst_Key, pat.AhMst_pName, pat.AhMst_Address, pat.AhMst_mobile, pat.AhMst_Dob, pat.AhMst_Phno, pat.AhMst_Email, pat.AhMst_Ismale }).ToList();
                foreach (var itm in patDls)
                {
                    patientMst pat = new patientMst()
                    {
                        AhMst_Code = itm.AhMst_Code,
                        AhMst_pName = itm.AhMst_pName,
                        AhMst_Address = itm.AhMst_Address,
                        AhMst_Phno = itm.AhMst_Phno
                    };
                    pdtls.Add(pat);
                }
                return Json(new { Result = "OK", Records = pdtls }, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult PatientDetails(patientMst patObj)
        {
            try
            {
                List<patientMst> pdtls = new List<patientMst>();
                DateTime dateTst = DateTime.Now.AddDays(1);
                string tst = dateTst.ToString("dd/MM/yyyy");
                var patDls = db.Patient_Mst.Where(p => p.AhMst_Code == patObj.AhMst_Code
                && p.AhMst_pName == patObj.AhMst_pName
                && p.AhMst_Address == patObj.AhMst_Address
                && p.AhMst_Phno == patObj.AhMst_Phno).Select(pat => new { pat.AhMst_Code, pat.AhMst_Prfx, pat.AhMst_Key, pat.AhMst_pName, pat.AhMst_Address, pat.AhMst_mobile, pat.AhMst_Dob, pat.AhMst_Phno, pat.AhMst_Email, pat.AhMst_Ismale }).ToList();
                foreach (var itm in patDls)
                {
                    if (itm.AhMst_Dob == null)
                    {
                        patientMst pat = new patientMst()
                        {
                            AhMst_Code = itm.AhMst_Code,
                            AhMst_pName = itm.AhMst_pName,
                            AhMst_Address = itm.AhMst_Address,
                            AhMst_Phno = itm.AhMst_Phno,
                            testDOB = tst,
                            AhMst_Email = itm.AhMst_Email,
                            AhMst_Ismale = itm.AhMst_Ismale,
                            AhMst_Prfx = itm.AhMst_Prfx
                        };
                        pdtls.Add(pat);
                    }
                    else
                    {
                        patientMst pat = new patientMst()
                        {
                            AhMst_Code = itm.AhMst_Code,
                            AhMst_pName = itm.AhMst_pName,
                            AhMst_Address = itm.AhMst_Address,
                            AhMst_Phno = itm.AhMst_Phno,
                            testDOB = ((DateTime)itm.AhMst_Dob).ToString("dd-MMM-yyyy"),
                            AhMst_Email = itm.AhMst_Email,
                            AhMst_Ismale = itm.AhMst_Ismale,
                            AhMst_Prfx = itm.AhMst_Prfx
                        };
                        pdtls.Add(pat);
                    }
                }
                return Json(new { Result = "OK", Records = pdtls }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception exe)
            {
                var ecx = exe.InnerException;
                return Json(new { Result = "ERROR", message = exe.Message });
            }
        }
        public JsonResult SearchCorpWithName(string term)
        {
            try
            {
                var corpList = db.AccountHeads_Mst.Where(crp => (crp.AhMst_pName).Contains(term)
                  && (crp.AhMst_Type == "AccHd") && crp.AhMst_IsActive == 1
                  && (Convert.ToInt32(crp.AhMst_AcGrpId )== 27 || Convert.ToInt32(crp.AhMst_AcGrpId )== 28)).OrderBy(a => a.AhMst_pName).Select(cr => new { cr.AhMst_pName, cr.AhMst_Key }).ToList();

                return Json(new { Result = "OK", Records = corpList }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception exe)
            {
                return Json(new { Result = "ERROR", message = exe.Message });
            }
        }
        public JsonResult SearchTestWithEnterClick(string term)
        {
            try
            {
                int splrId = 17;
                List<testDetails> tstList = new List<testDetails>();
                tstList = (from tst in db.Test_Mst
                           join spr in db.Special_Rates on tst.TstMst_Key equals (float)spr.SplR_TstID
                           where ((tst.TstMst_ShortName == term)
                           && spr.SplR_ID == splrId)
                           select new testDetails
                           {
                               TstMst_name = tst.TstMst_name,
                               TstMst_Rate = tst.TstMst_Rate,
                               TstMst_Key = Convert.ToInt32(tst.TstMst_Key),
                               TstMst_ShortName = tst.TstMst_ShortName,
                               SplR_NRate = Convert.ToDouble(spr.SplR_NRate),
                               TstMst_Total = Convert.ToDouble(spr.SplR_NRate),
                               TstMst_DiscPer = ((Convert.ToDouble(spr.SplR_NRate) / tst.TstMst_Rate) * 100),
                               tst_RptDay = tst.tst_RptDay,
                               tst_RptTmeDays = tst.tst_RptTmeDays
                           }).ToList();
                return Json(new { Result = "OK", Records = tstList }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception exe)
            {
                return Json(new { Result = "ERROR", message = exe.Message });
            }
        }
        public JsonResult SearchTestDetails(string term, string nameCode)
        {
            try
            {
                List<testDetails> tstList = new List<testDetails>();
                if (nameCode == "tstName")
                {
                    tstList = (from tst in db.Test_Mst
                               join spr in db.Test_Mst on tst.TstMst_Key equals (float)spr.TstMst_Key
                               where ((tst.TstMst_name).Contains(term)
                              )
                               select new testDetails
                               {
                                   TstMst_name = tst.TstMst_name,
                                   TstMst_Rate = tst.TstMst_Rate,
                                   TstMst_Key = Convert.ToInt32(tst.TstMst_Key),
                                   TstMst_ShortName = tst.TstMst_ShortName,
                                   SplR_NRate = 0,
                                   TstMst_Total = tst.TstMst_Rate,
                                   SplR_DisPer = 0,
                                   TstMst_DiscPer = 0,
                                   TstMst_TypeId = tst.TstMst_TypeId
                               }).ToList();
                    return Json(new { Result = "OK", Records = tstList }, JsonRequestBehavior.AllowGet);
                }
                else if (nameCode == "tstCode")
                {
                    tstList = (from tst in db.Test_Mst
                               join spr in db.Test_Mst on tst.TstMst_Key equals (float)spr.TstMst_Key
                               where ((tst.TstMst_ShortName).Contains(term)
                              )
                               select new testDetails
                               {
                                   TstMst_name = tst.TstMst_name,
                                   TstMst_Rate = tst.TstMst_Rate,
                                   TstMst_Key = Convert.ToInt32(tst.TstMst_Key),
                                   TstMst_ShortName = tst.TstMst_ShortName,
                                   SplR_NRate = 0,
                                   SplR_DisPer = 0,
                                   TstMst_Total = tst.TstMst_Rate,
                                   TstMst_DiscPer = 0,
                                   TstMst_TypeId = tst.TstMst_TypeId
                               }).ToList();
                    return Json(new { Result = "OK", Records = tstList }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(new { Result = "ERROR" });
                }
            }
            catch (Exception exe)
            {
                return Json(new { Result = "ERROR", message = exe.Message });
            }
        }
        public JsonResult RefByDrName(string term)
        {
            try
            {
                var accDls = db.AccountHeads_Mst.Where(ahmst => ahmst.AhMst_Type == "Doctor"
                   && ahmst.AhMst_IsActive == 1
                   && (ahmst.AhMst_pName).Contains(term)).OrderBy(a => a.AhMst_pName).Select(ah => new { ah.AhMst_Key, ah.AhMst_pName, ah.AhMst_HosId, ah.AhMst_HospName, ah.AhMst_DiscPer }).ToList();
                return Json(new { Result = "OK", Records = accDls }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception exe)
            {
                return Json(new { Result = "ERROR", message = exe.Message });
            }
        }
        public JsonResult CollMode(string term)
        {
            try
            {
                var collList = db.Masters.Where(mstr => (mstr.Mstr_Desc).Contains(term)
               && mstr.Mstr_Type == "CollMode").Select(ms => new { ms.Mstr_Desc, ms.Mstr_Key }).ToList();
                return Json(new { Result = "OK", Records = collList }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception exe)
            {
                return Json(new { Result = "ERROR", message = exe.Message });
            }
        }
        public JsonResult CollPerson(string term)
        {
            try
            {
                var collbyStaffLst = db.AccountHeads_Mst.Where(ahmst => (ahmst.AhMst_pName).Contains(term)
               && (ahmst.AhMst_Type == "Staff" || ahmst.AhMst_Type == "Agent")).OrderBy(a => a.AhMst_pName).Select(ah => new { ah.AhMst_pName, ah.AhMst_Key }).ToList();
                return Json(new { Result = "OK", Records = collbyStaffLst }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception exe)
            {
                return Json(new { Result = "ERROR", message = exe.Message });
            }
        }
        public JsonResult DoctorClinic(string term)
        {
            try
            {
                var hospList = db.AccountHeads_Mst.Where(ah => (ah.AhMst_pName).Contains(term)
                  && ah.AhMst_Type == "Hosp").OrderBy(a => a.AhMst_pName).Select(ahmst => new { ahmst.AhMst_pName, ahmst.AhMst_Key }).ToList();
                return Json(new { Result = "OK", Records = hospList }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception exe)
            {
                return Json(new { Result = "ERROR", message = exe.Message });
            }
        }
        public JsonResult DoctrHospDtls(float DrId)
        {
            try
            {
                var hospId = db.AccountHeads_Mst.Where(ahmst => ahmst.AhMst_Key == DrId).Select(ah => ah.AhMst_HosId).FirstOrDefault();
                var hospDtls = db.AccountHeads_Mst.Where(ahmst => ahmst.AhMst_Key == hospId).Select(ah => new { ah.AhMst_Key, ah.AhMst_pName }).ToList();
                return Json(new { Result = "OK", Record = hospDtls }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception exe)
            {
                return Json(new { Result = "ERROR", message = exe.Message });
            }
        }
        public JsonResult SearchDiscReason(string term)
        {
            try
            {
                var mstrDls = db.Masters.Where(mstr => mstr.Mstr_Type == "DiscR"
                && (mstr.Mstr_Desc).Contains(term)).OrderBy(m => m.Mstr_Desc).Select(m => new { m.Mstr_Desc, m.Mstr_Key, m.Mstr_Value }).ToList();
                return Json(new { Result = "OK", Records = mstrDls }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception exe)
            {
                return Json(new { Result = "ERROR", message = exe.Message });
            }
        }
        public JsonResult SearchBankWithName(string term)
        {
            try
            {
                int splrId = 17;
                List<accHeadsDetails> bankDlss = new List<accHeadsDetails>();
                var bankDls = (from e in db.AccountHeads_Mst
                               join d in db.Masters on e.AhMst_SplID equals d.Mstr_Key into dept
                               from department in dept.DefaultIfEmpty()
                               join St in db.SetDoctor_Staff on e.AhMst_Key equals (double)St.SetCorp_CorpId into ks
                               from kss in ks.DefaultIfEmpty()
                               join Ahstaff in db.AccountHeads_Mst on (double)kss.SetCorp_StaffId equals Ahstaff.AhMst_Key into cs
                               from css in cs.DefaultIfEmpty()
                               where (e.AhMst_IsActive == 1
                       && (Convert.ToInt32(e.AhMst_AcGrpId) == 4)
                      && (e.AhMst_pName).Contains(term))
                               select new
                               {
                                   AhMst_Key = e.AhMst_Key,
                                   AhMst_pName = e.AhMst_pName,
                                   AhMst_mobile = e.AhMst_mobile,
                                   AhMst_Phno = e.AhMst_Phno
                               }).ToList();
                return Json(new { Result = "OK", Records = bankDls }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception exe)
            {
                return Json(new { Result = "ERROR", message = exe.Message });
            }
        }
        private DateTime AUTOTAT(List<invoiceDet> timeDate)
        {
            double RepDate = 0;
            string RepMode = "";
            double TempRepDate = 0;
            double TempMinitue = 0;
            double TempHour = 0;
            double TempDay = 0;
            DateTime dtpRportOn = DateTime.Now;
            string TempRepMode = "";
            int CurDay = 0, CurYear = 0, CurMonth = 0;
            double CurHour = 0, CurMin = 0, RepHou = 0, RepMin = 0;
            int RepDay = 0, RepYear = 0, RepMonth = 0;


            //for (int i = 0; i < timeDate.Count; i++)
            //{
            foreach (invoiceDet item in timeDate)
            {

                try
                {
                    RepDate = Convert.ToDouble(item.InvItm_RptDay);
                }
                catch { RepDate = 0; }

                try
                {
                    RepMode = item.InvItm_RptTimeDays.ToString();
                }
                catch { }


                if (RepDate > 0)
                {
                    if (RepMode.ToUpper() == "MINUTES" && TempRepMode.ToUpper() != "HOURS" && TempRepMode.ToUpper() != "DAYS")
                    {
                        if (TempMinitue == 0)
                        {

                            TempMinitue = RepDate;
                        }
                        TempRepMode = RepMode;
                        if (TempMinitue < RepDate)
                        {
                            TempMinitue = RepDate;
                        }
                    }
                    else if (RepMode.ToUpper() == "HOURS" && TempRepMode.ToUpper() != "DAYS")
                    {
                        if (TempHour == 0)
                        {

                            TempHour = RepDate;
                        }
                        TempRepMode = RepMode;
                        if (TempHour < RepDate)
                        {
                            TempHour = RepDate;
                        }
                    }
                    else if (RepMode.ToUpper() == "DAYS")
                    {
                        if (TempDay == 0)
                        {

                            TempDay = RepDate;
                        }
                        TempRepMode = RepMode;
                        if (TempDay < RepDate)
                        {
                            TempDay = RepDate;
                        }
                    }

                }
            }
            if (TempDay > 0 || TempHour > 0 || TempMinitue > 0)
            {
                RepYear = dtpRportOn.Year;
                RepMonth = dtpRportOn.Month;
                RepDay = dtpRportOn.Day;
                RepHou = dtpRportOn.Hour;
                RepMin = dtpRportOn.Minute;

                CurYear = DateTime.Now.Year;
                CurMonth = DateTime.Now.Month;
                CurDay = DateTime.Now.Day;
                CurHour = DateTime.Now.Hour;
                CurMin = DateTime.Now.Minute;
                int WrongDate = 0;
                if (TempDay == 0 && TempHour > 0 && TempMinitue > 0)
                {
                    double tempData = TempMinitue / 60;
                    if (tempData > TempHour)
                    {
                        TempRepMode = "MINUTES";
                    }
                }
                if (CurYear <= RepYear)
                {
                    if (CurMonth <= RepMonth)
                    {
                        if (CurDay > RepDay && CurMonth == RepMonth)
                        {
                            WrongDate = 1;
                        }
                        else
                        {
                            WrongDate = 0;
                        }
                    }
                    else
                    {
                        WrongDate = 1;
                    }
                }
                else
                {
                    WrongDate = 1;
                }
                DateTime Reptime = dtpRportOn;
                DateTime Curr = DateTime.Now;
                int Diff = 0;
                if (TempRepMode.ToUpper() == "MINUTES")
                {
                    Curr = Curr.AddMinutes(TempMinitue);
                    try
                    {
                        Diff = Convert.ToInt32((Reptime - Curr).TotalSeconds);
                    }
                    catch { }
                    if (WrongDate == 1)
                    {
                        dtpRportOn = DateTime.Now.AddMinutes(TempMinitue);
                    }
                    else if (Diff <= 0)
                    {
                        dtpRportOn = DateTime.Now.AddMinutes(TempMinitue);
                    }
                }
                else if (TempRepMode.ToUpper() == "HOURS")
                {
                    Curr = Curr.AddHours(TempHour);
                    try
                    {
                        Diff = Convert.ToInt32((Reptime - Curr).TotalSeconds);
                    }
                    catch { }
                    if (WrongDate == 1)
                    {
                        dtpRportOn = DateTime.Now.AddHours(TempHour);
                    }
                    else if (Diff <= 0)
                    {
                        dtpRportOn = DateTime.Now.AddHours(TempHour);
                    }
                }
                else if (TempRepMode.ToUpper() == "DAYS")
                {
                    Curr = Curr.AddDays(TempDay);
                    try
                    {
                        Diff = Convert.ToInt32((Reptime - Curr).TotalSeconds);
                    }
                    catch { }
                    if (WrongDate == 1)
                    {
                        dtpRportOn = DateTime.Now.AddDays(TempDay);
                    }
                    else if (Diff <= 0)
                    {
                        dtpRportOn = DateTime.Now.AddDays(TempDay);
                    }
                }
            }
            return dtpRportOn;
        }
        [HttpPost]
        public JsonResult InvoiceSave(invoiceMst pdt)
        {
            try
            {
                Voucher vchr = new Voucher();
                Invoice_Det det = new Invoice_Det();
                string payMde = pdt.Inv_PayMode;
                Invoice_Mst pdls = new Invoice_Mst();
                double tstId = 0;
                double tsttypeID = 0;
                double rptday = 0;
                string rptTimedays = "";
                DateTime tempDate = DateTime.Now;
                DateTime IntermediateTime = DateTime.Now;
                DateTime changedDate = DateTime.Now;
                decimal cpyid = (decimal)pdt.Inv_CpyId;
                decimal yrid = (decimal)pdt.Inv_YrId;
                double Invno = db.Invoice_Mst.Where(inv => inv.Inv_CpyId == (decimal)cpyid
           && inv.Inv_YrId == (decimal)yrid).Max(invc => (double?)invc.Inv_No) ?? 0;
                if (Invno == 0)
                {
                    Invno = 0;
                    ViewBag.lab_No = Invno + 1;
                }
                else
                {
                    ViewBag.lab_No = Invno + 1;
                }
                double InvNumber = ViewBag.lab_No;
                var pMode = "";
                double? InsId = 0;
                double invNumberChk = pdt.Inv_No;
                var tstng = db.Invoice_Mst.Where(i => i.Inv_No == invNumberChk && i.Inv_CpyId == cpyid && i.Inv_YrId == yrid).Select(invcMst => new { invcMst.Inv_name, invcMst.Inv_CpyId, invcMst.Inv_No, invcMst.Inv_InsId, invcMst.Inv_PayMode }).ToList();
                foreach (var itm in tstng)
                {
                    pMode = itm.Inv_PayMode;
                    InsId = itm.Inv_InsId;
                }
                if (tstng.Count > 0)
                {
                    var updt = 0;
                    var testing = this.db.Invoice_Mst.Where(invc => invc.Inv_No == invNumberChk && invc.Inv_YrId == (decimal)yrid && invc.Inv_BrID == (double)cpyid).ToList();
                    var invdetDls = db.Invoice_Det.Where(i => i.InvItm_Invno == invNumberChk && i.InvItm_CpyId == (decimal)cpyid && i.InvItm_YrId == (decimal)yrid).ToList();
                    foreach (var idet in invdetDls)
                    {
                        db.Invoice_Det.Remove(idet);
                    }
                    db.SaveChanges();
                    foreach (var imst in testing)
                    {
                        db.Invoice_Mst.Remove(imst);
                    }
                    db.SaveChanges();
                    if (pMode == "Credit" && pdt.Inv_PayMode == "Cash")
                    {
                        var vchrDls = db.Vouchers.Where(vochr => vochr.vchr_TransNo == invNumberChk && vochr.vchr_YrId == yrid && vochr.vchr_CpyId == cpyid && vochr.vchr_Id == InsId).ToList();
                        foreach (var vchrdls in vchrDls)
                        {
                            db.Vouchers.Remove(vchrdls);
                        }
                    }
                    List<invoiceDet> timeDate = new List<invoiceDet>();
                    foreach (invoiceDet invdet in pdt.invDetlist)
                    {
                        DateTime currentTime = DateTime.Now;
                        tsttypeID = invdet.Tst_TypeId;
                        tstId = invdet.InvItm_TstId;
                        rptday = Convert.ToDouble(db.Test_Mst.Where(tst => tst.TstMst_Key == tstId).Select(ts => ts.tst_RptDay).FirstOrDefault());
                        rptTimedays = db.Test_Mst.Where(tst => tst.TstMst_Key == tstId).Select(ts => ts.tst_RptTmeDays).FirstOrDefault();
                        invoiceDet tmdt = new invoiceDet()
                        {
                            InvItm_RptDay = Convert.ToString(rptday),
                            InvItm_RptTimeDays = rptTimedays

                        };
                        timeDate.Add(tmdt);
                        //if (rptTimedays == "Days")
                        //{
                        //    changedDate = currentTime.AddDays(rptday);
                        //}
                        //if (rptTimedays == "Hours")
                        //{
                        //    changedDate = currentTime.AddHours(rptday);
                        //}

                        //if (changedDate > tempDate)
                        //{
                        //    tempDate = changedDate;
                        //    IntermediateTime = tempDate;
                        //}
                        //else
                        //{
                        //    tempDate = IntermediateTime;
                        //}
                        if (tsttypeID == -12)
                        {
                            det.InvItm_TstId = invdet.InvItm_TstId;
                            det.InvItm_TstOrgRate = invdet.InvItm_TstOrgRate;
                            det.InvItm_YrId = (decimal)invdet.InvItm_YrId;
                            det.InvItm_CpyId = (decimal)invdet.InvItm_CpyId;
                            det.InvItm_DiscAmt = invdet.InvItm_DiscAmt;
                            det.InvItm_Invno = invNumberChk;
                            det.InvItm_DiscPer = (decimal)invdet.InvItm_DiscPer;
                            det.InvItm_Issued = invdet.InvItm_Issued;
                            det.InvItm_Orgrate = invdet.InvItm_Orgrate;
                            det.InvItm_rate = invdet.InvItm_rate;
                            det.InvItm_RevDiscAmt = invdet.InvItm_RevDiscAmt;
                            db.Invoice_Det.Add(det);
                            db.SaveChanges();
                            var gpTstDls = db.Set_GroupTest.Where(st => st.StGrpTst_GrpId == tstId).Select(s => new { s.StGrpTst_TstCode, s.StGrpTst_GrpId }).ToList();
                            foreach (var gpTst in gpTstDls)
                            {
                                det.InvItm_TstId = tstId;
                                det.InvItm_TstOrgRate = 0;
                                det.InvItm_Invno = invNumberChk;
                                det.InvItm_YrId = (decimal)invdet.InvItm_YrId;
                                det.InvItm_CpyId = (decimal)invdet.InvItm_CpyId;
                                det.InvItm_DiscAmt = 0;
                                det.InvItm_DiscPer = 0;
                                det.InvItm_Issued = 0;
                                det.InvItm_Orgrate = 0;
                                det.InvItm_rate = 0;
                                det.InvItm_Type = 1;
                                det.InvItm_RevDiscAmt = 0;
                                db.Invoice_Det.Add(det);
                                db.SaveChanges();
                            }
                        }
                        else
                        {
                            det.InvItm_TstId = invdet.InvItm_TstId;
                            det.InvItm_TstOrgRate = invdet.InvItm_TstOrgRate;
                            det.InvItm_YrId = (decimal)invdet.InvItm_YrId;
                            det.InvItm_CpyId = (decimal)invdet.InvItm_CpyId;
                            det.InvItm_Invno = invNumberChk;
                            det.InvItm_DiscAmt = invdet.InvItm_DiscAmt;
                            det.InvItm_DiscPer = (decimal)invdet.InvItm_DiscPer;
                            det.InvItm_Issued = invdet.InvItm_Issued;
                            det.InvItm_Orgrate = invdet.InvItm_Orgrate;
                            det.InvItm_rate = invdet.InvItm_rate;
                            det.InvItm_RevDiscAmt = invdet.InvItm_RevDiscAmt;
                            db.Invoice_Det.Add(det);
                            db.SaveChanges();
                        }
                    }
                    tempDate = AUTOTAT(timeDate);
                    pdls.Inv_IsInsrnce = pdt.Inv_IsInsrnce;
                    pdls.Inv_PntId = pdt.Inv_PntId;
                    pdls.Inv_PntInvId = pdt.Inv_PntInvId;
                    pdls.Inv_PayMode = pdt.Inv_PayMode;
                    pdls.Inv_Tittle = pdt.Inv_Tittle;
                    pdls.Inv_name = pdt.Inv_name;
                    pdls.Inv_Gender = pdt.Inv_Gender;
                    pdls.Inv_ageYY = pdt.Inv_ageYY;
                    pdls.Inv_ageMM = pdt.Inv_ageMM;
                    pdls.Inv_ageDD = pdt.Inv_ageDD;
                    pdls.Inv_phno = pdt.Inv_phno;
                    pdls.Inv_ItemDisc = pdt.Inv_ItemDisc;
                    pdls.Inv_Address = pdt.Inv_Address;
                    pdls.Inv_SmplDate = (DateTime?)(DateTime.Now);
                    pdls.Inv_RsltNO = pdt.Inv_RsltNO;
                    pdls.Inv_BrID = pdt.Inv_BrID;
                    string invdate = (pdt.Inv_Date).Value.ToShortDateString();
                    string inv = (pdt.Inv_Date).Value.ToString("hh:mm tt");
                    DateTime x = Convert.ToDateTime(invdate);
                    pdls.Inv_Date = x;
                    pdls.Inv_time = inv;
                    pdls.Inv_InsId = pdt.Inv_InsId;
                    pdls.Inv_InsNo = pdt.Inv_InsNo;
                    pdls.Inv_AreaId = pdt.Inv_AreaId;
                    pdls.Inv_EmailtoPatient = pdt.Inv_EmailtoPatient;
                    pdls.Inv_Email = pdt.Inv_Email;
                    pdls.Inv_EtoDr = pdt.Inv_EtoDr;
                    pdls.Inv_DrId = pdt.Inv_DrId;
                    pdls.Inv_OutDr = pdt.Inv_OutDr;
                    pdls.Inv_hospId = pdt.Inv_hospId;
                    pdls.Inv_Schrge = pdt.Inv_Schrge;
                    pdls.Inv_DiscId = pdt.Inv_DiscId;
                    pdls.Inv_CltnID = pdt.Inv_CltnID;
                    pdls.Invl_DiscPer = pdt.Invl_DiscPer;
                    pdls.Inv_RepTime = tempDate;
                    pdls.Inv_GrosAmt = pdt.Inv_GrosAmt;
                    pdls.Inv_DiscAmt = pdt.Inv_DiscAmt;
                    pdls.Inv_OthAmt = pdt.Inv_OthAmt;
                    pdls.Inv_Netamt = pdt.Inv_Netamt;
                    pdls.Inv_RcvdAmt = pdt.Inv_RcvdAmt;
                    pdls.Inv_BalAmt = pdt.Inv_BalAmt;
                    pdls.Inv_Comment = pdt.Inv_Comment;
                    pdls.Inv_OthCmnt = pdt.Inv_OthCmnt;
                    pdls.Inv_User = pdt.Inv_User;
                    pdls.Invl_IsPending = pdt.Invl_IsPending;
                    pdls.Inv_Status = pdt.Inv_Status;
                    pdls.Inv_No = pdt.Inv_No;//check
                    pdls.Inv_CurRcvdAmt = pdt.Inv_CurRcvdAmt;
                    pdls.Inv_CurBalAmt = pdt.Inv_CurBalAmt;
                    pdls.Inv_UsrId = (decimal)pdt.Inv_UsrId;
                    pdls.Inv_YrId = (decimal)pdt.Inv_YrId;
                    pdls.Inv_CpyId = (decimal)pdt.Inv_CpyId;
                    pdls.Inv_RepThrPersonal = pdt.Inv_RepThrPersonal;
                    pdls.Inv_RepThrCourier = pdt.Inv_RepThrCourier;
                    pdls.Inv_RepThrPhone = pdt.Inv_RepThrPhone;
                    pdls.Inv_RepThrEmail = pdt.Inv_RepThrEmail;
                    pdls.Inv_RepThrSms = pdt.Inv_RepThrSms;
                    pdls.Inv_RptMode = pdt.Inv_RptMode;
                    pdls.Inv_Updtd = (decimal)pdt.Inv_Updtd;
                    pdls.Inv_ItemDesc = pdt.Inv_ItemDesc;
                    pdls.Inv_WhatsApp = pdt.Inv_WhatsApp;
                    pdls.Inv_DocPath1 = pdt.Inv_DocPath1;
                    pdls.Inv_DocPath2 = pdt.Inv_DocPath2;
                    pdls.Inv_DocPath3 = pdt.Inv_DocPath3;
                    pdls.Inv_CollModeId = (decimal)pdt.Inv_CollModeId;
                    pdls.Inv_Ward = pdt.Inv_Ward;
                    pdls.Inv_WardId = (decimal)pdt.Inv_WardId;
                    pdls.Inv_Area = pdt.Inv_Area;
                    pdls.Inv_RevInc = pdt.Inv_RevInc;
                    pdls.Inv_MemberCode = pdt.Inv_MemberCode;
                    pdls.Inv_PresChck = pdt.Inv_PresChck;
                    pdls.Inv_Dob = pdt.Inv_Dob;
                    pdls.Inv_DiscAmt = pdt.Inv_DiscAmt;
                    pdls.Inv_ShortName = pdt.Inv_ShortName;
                    db.Invoice_Mst.Add(pdls);
                    db.SaveChanges();
                    double vchrId = pdt.Inv_InsId;
                    double vchrCpyid = pdt.Inv_CpyId;
                    double vchrYrid = pdt.Inv_YrId;
                    double vchr_key = 0;
                    double vchrKey = 0;
                    try
                    {
                        vchrKey = db.Vouchers.Max(v => v.vchr_Key);
                    }
                    catch (Exception exe)
                    {
                        vchrKey = 0;
                    }

                    if (vchrKey == 0)
                    {
                        vchr_key = vchr_key + 1;
                    }
                    else
                    {
                        vchr_key = vchrKey + 1;
                    }
                    if (payMde == "Credit")
                    {
                        foreach (voucherDtls vouchr in pdt.vchrList)
                        {
                            vchr.vchr_Key = vchr_key;
                            vchr.vchr_BookId = 0;
                            vchr.vchr_Chq = 0;
                            vchr.vchr_Updtd = 0;
                            vchr.vchr_TdsAmt = 0;
                            vchr.vchr_Narration = vouchr.vchr_Narration;
                            vchr.vchr_Payment = vouchr.vchr_Payment;
                            vchr.vchr_Receipt = vouchr.vchr_Receipt;
                            vchr.vchr_TimeStamp = vouchr.vchr_TimeStamp;
                            vchr.vchr_TransNo = Convert.ToInt32(vouchr.vchr_TransNo);
                            vchr.vchr_TransType = vouchr.vchr_TransType;
                            vchr.vchr_UsrId = vouchr.vchr_UsrId;
                            vchr.vchr_YrId = vouchr.vchr_YrId;
                            vchr.vchr_BrId = vouchr.vchr_BrId;
                            vchr.vchr_CpyId = vouchr.vchr_CpyId;
                            vchr.vchr_Date = vouchr.vchr_Date;
                            vchr.vchr_Id = Convert.ToInt32(vouchr.vchr_Id);
                            db.Vouchers.Add(vchr);
                            db.SaveChanges();

                        }
                    }
                }
                else
                {
                    List<invoiceDet> timeDate = new List<invoiceDet>();
                    foreach (invoiceDet invdt in pdt.invDetlist)
                    {
                        DateTime currentTime = DateTime.Now;
                        tsttypeID = invdt.Tst_TypeId;
                        tstId = invdt.InvItm_TstId;
                        try
                        {
                            rptday = Convert.ToDouble(db.Test_Mst.Where(tst => tst.TstMst_Key == tstId).Select(ts => ts.tst_RptDay).FirstOrDefault());
                        }
                        catch (Exception exe)
                        {
                            rptday = 0;
                        }
                        try
                        {
                            rptTimedays = db.Test_Mst.Where(tst => tst.TstMst_Key == tstId).Select(ts => ts.tst_RptTmeDays).FirstOrDefault();
                        }
                        catch (Exception exe)
                        {
                            rptTimedays = "";
                        }
                        invoiceDet tmdt = new invoiceDet()
                        {
                            InvItm_RptDay = Convert.ToString(rptday),
                            InvItm_RptTimeDays = rptTimedays

                        };
                        timeDate.Add(tmdt);
                        //tempDate = AUTOTAT(rptTimedays, rptday);
                        //if (rptTimedays == "Days")
                        //{
                        //    changedDate = currentTime.AddDays(rptday);
                        //}
                        //if (rptTimedays == "Hours")
                        //{
                        //    changedDate = currentTime.AddHours(rptday);
                        //}

                        //if (changedDate > tempDate)
                        //{
                        //    tempDate = changedDate;
                        //    IntermediateTime = tempDate;
                        //}
                        //else
                        //{
                        //    tempDate = IntermediateTime;
                        //}
                        if (tsttypeID == -12)
                        {
                            det.InvItm_TstId = invdt.InvItm_TstId;
                            det.InvItm_TstOrgRate = invdt.InvItm_TstOrgRate;
                            det.InvItm_YrId = (decimal)invdt.InvItm_YrId;
                            det.InvItm_CpyId = (decimal)invdt.InvItm_CpyId;
                            det.InvItm_DiscAmt = invdt.InvItm_DiscAmt;
                            det.InvItm_DiscPer = (decimal)invdt.InvItm_DiscPer;
                            det.InvItm_Invno = invdt.InvItm_Invno;
                            det.InvItm_Issued = invdt.InvItm_Issued;
                            det.InvItm_Orgrate = invdt.InvItm_Orgrate;
                            det.InvItm_rate = invdt.InvItm_rate;
                            det.InvItm_RevDiscAmt = invdt.InvItm_RevDiscAmt;
                            db.Invoice_Det.Add(det);
                            db.SaveChanges();
                            var gpTstDls = db.Set_GroupTest.Where(st => st.StGrpTst_GrpId == tstId).Select(s => new { s.StGrpTst_TstCode, s.StGrpTst_GrpId }).ToList();
                            foreach (var gpTst in gpTstDls)
                            {
                                det.InvItm_TstId = tstId;
                                det.InvItm_TstOrgRate = 0;
                                det.InvItm_YrId = (decimal)invdt.InvItm_YrId;
                                det.InvItm_CpyId = (decimal)invdt.InvItm_CpyId;
                                det.InvItm_DiscAmt = 0;
                                det.InvItm_DiscPer = 0;
                                det.InvItm_Invno = invdt.InvItm_Invno;
                                det.InvItm_Issued = 0;
                                det.InvItm_Orgrate = 0;
                                det.InvItm_rate = 0;
                                det.InvItm_Type = 1;
                                det.InvItm_RevDiscAmt = 0;
                                db.Invoice_Det.Add(det);
                                db.SaveChanges();
                            }
                        }
                        else
                        {
                            det.InvItm_TstId = invdt.InvItm_TstId;
                            det.InvItm_TstOrgRate = invdt.InvItm_TstOrgRate;
                            det.InvItm_YrId = (decimal?)invdt.InvItm_YrId;
                            det.InvItm_CpyId = (decimal?)invdt.InvItm_CpyId;
                            det.InvItm_DiscAmt = invdt.InvItm_DiscAmt;
                            det.InvItm_DiscPer = (decimal?)invdt.InvItm_DiscPer;
                            det.InvItm_Invno = invdt.InvItm_Invno;
                            det.InvItm_Issued = invdt.InvItm_Issued;
                            det.InvItm_Orgrate = invdt.InvItm_Orgrate;
                            det.InvItm_rate = invdt.InvItm_rate;
                            det.InvItm_RevDiscAmt = invdt.InvItm_RevDiscAmt;
                            db.Invoice_Det.Add(det);
                            db.SaveChanges();
                        }
                    }
                    tempDate = AUTOTAT(timeDate);
                    pdls.Inv_BankId = pdt.Inv_BankId;
                    pdls.Inv_No = pdt.Inv_No;
                    pdls.Inv_IsInsrnce = pdt.Inv_IsInsrnce;
                    pdls.Inv_PntId = pdt.Inv_PntId;
                    pdls.Inv_PntInvId = pdt.Inv_PntInvId;
                    pdls.Inv_PayMode = pdt.Inv_PayMode;
                    pdls.Inv_Tittle = pdt.Inv_Tittle;
                    pdls.Inv_name = pdt.Inv_name;
                    pdls.Inv_Gender = pdt.Inv_Gender;
                    pdls.Inv_ageYY = pdt.Inv_ageYY;
                    pdls.Inv_ageMM = pdt.Inv_ageMM;
                    pdls.Inv_ageDD = pdt.Inv_ageDD;
                    pdls.Inv_phno = pdt.Inv_phno;
                    pdls.Inv_ItemDisc = pdt.Inv_ItemDisc;
                    pdls.Inv_Address = pdt.Inv_Address;
                    pdls.Inv_SmplDate = (DateTime?)(DateTime.Now);
                    pdls.Inv_RsltNO = pdt.Inv_RsltNO;
                    pdls.Inv_BrID = (double)pdt.Inv_CpyId;
                    string invdate = (pdt.Inv_Date).Value.ToShortDateString();
                    string inv = (pdt.Inv_Date).Value.ToString("hh:mm tt");
                    DateTime x = Convert.ToDateTime(invdate);
                    pdls.Inv_Date = x;
                    pdls.Inv_time = inv;
                    pdls.Inv_InsId = pdt.Inv_InsId;
                    pdls.Inv_InsNo = pdt.Inv_InsNo;
                    pdls.Inv_AreaId = pdt.Inv_AreaId;
                    pdls.Inv_EmailtoPatient = pdt.Inv_EmailtoPatient;
                    pdls.Inv_Email = pdt.Inv_Email;
                    pdls.Inv_EtoDr = pdt.Inv_EtoDr;
                    pdls.Inv_DrId = pdt.Inv_DrId;
                    pdls.Inv_OutDr = pdt.Inv_OutDr;
                    pdls.Inv_hospId = pdt.Inv_hospId;
                    pdls.Inv_Schrge = pdt.Inv_Schrge;
                    pdls.Inv_DiscId = pdt.Inv_DiscId;
                    pdls.Inv_CltnID = pdt.Inv_CltnID;
                    pdls.Invl_DiscPer = pdt.Invl_DiscPer;
                    pdls.Inv_RepTime = tempDate;
                    pdls.Inv_GrosAmt = pdt.Inv_GrosAmt;
                    pdls.Inv_DiscAmt = pdt.Inv_DiscAmt;
                    pdls.Inv_OthAmt = pdt.Inv_OthAmt;
                    pdls.Inv_Netamt = pdt.Inv_Netamt;
                    pdls.Inv_RcvdAmt = pdt.Inv_RcvdAmt;
                    pdls.Inv_BalAmt = pdt.Inv_BalAmt;
                    pdls.Inv_Comment = pdt.Inv_Comment;
                    pdls.Inv_OthCmnt = pdt.Inv_OthCmnt;
                    pdls.Inv_User = pdt.Inv_User;
                    pdls.Invl_IsPending = pdt.Invl_IsPending;
                    pdls.Inv_Status = pdt.Inv_Status;
                    pdls.Inv_CurRcvdAmt = pdt.Inv_CurRcvdAmt;
                    pdls.Inv_CurBalAmt = pdt.Inv_CurBalAmt;
                    pdls.Inv_UsrId = (decimal)pdt.Inv_UsrId;
                    pdls.Inv_YrId = (decimal)pdt.Inv_YrId;
                    pdls.Inv_CpyId = (decimal)pdt.Inv_CpyId;
                    pdls.Inv_RepThrPersonal = pdt.Inv_RepThrPersonal;
                    pdls.Inv_RepThrCourier = pdt.Inv_RepThrCourier;
                    pdls.Inv_RepThrPhone = pdt.Inv_RepThrPhone;
                    pdls.Inv_RepThrEmail = pdt.Inv_RepThrEmail;
                    pdls.Inv_RepThrSms = pdt.Inv_RepThrSms;
                    pdls.Inv_RptMode = pdt.Inv_RptMode;
                    pdls.Inv_Updtd = (decimal)pdt.Inv_Updtd;
                    pdls.Inv_ItemDesc = pdt.Inv_ItemDesc;
                    pdls.Inv_WhatsApp = pdt.Inv_WhatsApp;
                    pdls.Inv_DocPath1 = pdt.Inv_DocPath1;
                    pdls.Inv_DocPath2 = pdt.Inv_DocPath2;
                    pdls.Inv_DocPath3 = pdt.Inv_DocPath3;
                    pdls.Inv_CollModeId = (decimal)pdt.Inv_CollModeId;
                    pdls.Inv_Ward = pdt.Inv_Ward;
                    pdls.Inv_WardId = (decimal)pdt.Inv_WardId;
                    pdls.Inv_Area = pdt.Inv_Area;
                    pdls.Inv_RevInc = pdt.Inv_RevInc;
                    pdls.Inv_MemberCode = pdt.Inv_MemberCode;
                    pdls.Inv_PresChck = pdt.Inv_PresChck;
                    pdls.Inv_Dob = pdt.Inv_Dob;
                    pdls.Inv_DiscAmt = pdt.Inv_DiscAmt;
                    pdls.Inv_ShortName = pdt.Inv_ShortName;
                    db.Invoice_Mst.Add(pdls);
                    db.SaveChanges();
                    double vchrId = pdt.Inv_InsId;
                    double vchrCpyid = pdt.Inv_CpyId;
                    double vchrYrid = pdt.Inv_YrId;
                    double vchr_key = 0;
                    double vchrKey = 0;
                    try
                    {
                        vchrKey = db.Vouchers.Max(v => v.vchr_Key);
                    }
                    catch (Exception exe)
                    {
                        vchrKey = 0;
                    }

                    if (vchrKey == 0)
                    {
                        vchr_key = vchr_key + 1;
                    }
                    else
                    {
                        vchr_key = vchrKey + 1;
                    }
                    if (payMde == "Credit")
                    {
                        foreach (voucherDtls vouchr in pdt.vchrList)
                        {
                            vchr.vchr_Key = vchr_key;
                            vchr.vchr_BookId = 0;
                            vchr.vchr_Chq = 0;
                            vchr.vchr_Updtd = 0;
                            vchr.vchr_TdsAmt = 0;
                            vchr.vchr_Narration = vouchr.vchr_Narration;
                            vchr.vchr_Payment = vouchr.vchr_Payment;
                            vchr.vchr_Receipt = vouchr.vchr_Receipt;
                            vchr.vchr_TimeStamp = vouchr.vchr_TimeStamp;
                            vchr.vchr_TransNo = Convert.ToInt32(vouchr.vchr_TransNo);
                            vchr.vchr_TransType = vouchr.vchr_TransType;
                            vchr.vchr_UsrId = vouchr.vchr_UsrId;
                            vchr.vchr_YrId = vouchr.vchr_YrId;
                            vchr.vchr_BrId = vouchr.vchr_BrId;
                            vchr.vchr_CpyId = vouchr.vchr_CpyId;
                            vchr.vchr_Date = vouchr.vchr_Date;
                            vchr.vchr_Id = Convert.ToInt32(vouchr.vchr_Id);
                            db.Vouchers.Add(vchr);
                            db.SaveChanges();
                        }
                    }
                }
                return Json(new { Result = "OK" });
            }
            catch (System.Data.Entity.Validation.DbEntityValidationException dbEx)
            {
                Exception raise = dbEx;
                foreach (var validationErrors in dbEx.EntityValidationErrors)
                {
                    foreach (var validationError in validationErrors.ValidationErrors)
                    {
                        string message = string.Format("{0}:{1}",
                            validationErrors.Entry.Entity.ToString(),
                            validationError.ErrorMessage);
                        raise = new InvalidOperationException(message, raise);
                    }
                }
                StreamWriter tstream = System.IO.File.AppendText(Server.MapPath("~/bin/Debug") + "\\ERRORLOG.txt");
                try
                {
                    tstream.WriteLine("");
                    tstream.WriteLine("errorss --" + "err---");
                    tstream.WriteLine("");
                    tstream.Flush();
                    tstream.Close();
                }
                catch { }
                return Json(new { Result = "ERROR" });
            }
        }
        public JsonResult FillPatientData(invoiceMst prev)
        {
            try
            {
                double splrId = prev.Inv_InsId;
                double labNum = prev.Inv_No;
                double YearId = prev.Inv_YrId;
                double CmpnyId = prev.Inv_CpyId;
                double? corpKey = 0;
                string tstId = "";
                double? tstKey = 0, PendingAmt = 0;
                double? drKey = 0;
                double? CollModeId = 0;
                double? clinicId = 0;
                double? discId = 0;
                double? bnkId = 0;
                double? CollStaffId = 0;
                invoiceMst invc = new invoiceMst();
                SqlConnection sqlcon = new SqlConnection();
                sqlcon = con.dbcon();
                sqlcon.Open();
                List<invoiceMst> Invlst = new List<invoiceMst>();
                var invDet_Dls = db.Invoice_Det.Where(inDet => inDet.InvItm_Invno == labNum
                 && inDet.InvItm_YrId == (decimal)YearId && inDet.InvItm_CpyId == (decimal)CmpnyId).Select(iD => new { iD.InvItm_TstId, iD.InvItm_Invno }).ToList();
                var invce_Dtls = db.Invoice_Mst.Where(inv => inv.Inv_No == labNum
                  && inv.Inv_YrId == (decimal)YearId && inv.Inv_CpyId == (decimal)CmpnyId).Select(i =>
                  new
                  {
                      i.Inv_No,
                      i.Inv_RsltNO,
                      i.Inv_Date,
                      i.Inv_time,
                      i.Inv_Tittle,
                      i.Inv_name,
                      i.Inv_Dob,
                      i.Inv_Gender,
                      i.Inv_ageYY,
                      i.Inv_ageMM,
                      i.Inv_ageDD,
                      i.Inv_phno,
                      i.Inv_Email,
                      i.Inv_Address,
                      i.Inv_DrId,
                      i.Inv_CollModeId,
                      i.Inv_InsId,
                      i.Inv_PntId,
                      i.Inv_OutDr,
                      i.Inv_hospId,
                      i.Inv_CltnID,
                      i.Inv_PayMode,
                      i.Inv_SmplDate,
                      i.Inv_RepTime,
                      i.Inv_GrosAmt,
                      i.Inv_DiscAmt,
                      i.Inv_OthAmt,
                      i.Inv_Netamt,
                      i.Inv_RcvdAmt,
                      i.Inv_BalAmt,
                      i.Invl_IsPending,
                      i.Inv_CurRcvdAmt,
                      i.Inv_CurBalAmt,
                      i.Inv_RepThrCourier,
                      i.Inv_RepThrEmail,
                      i.Inv_RepThrPersonal,
                      i.Inv_RepThrPhone,
                      i.Inv_RepThrSms,
                      i.Inv_WhatsApp,
                      i.Inv_Comment,
                      i.Inv_OthCmnt,
                      i.Inv_DiscId,
                      i.Inv_Schrge,
                      i.Inv_BankId,
                      i.Inv_InsNo
                  }).ToList();
                List<testDetails> tstList = new List<testDetails>();
                try
                {
                    if (CmpnyId > 0)
                    {
                        SqlCommand cmdPend = new SqlCommand("SELECT SUM(ISNULL(PndC_Amount,0))  FROM PendingCollections WHERE PndC_Labno=" + labNum + " AND PndC_YrId=" + YearId + " AND PndC_CpyId=" + CmpnyId + "", sqlcon);
                        PendingAmt = Convert.ToDouble(cmdPend.ExecuteScalar());
                    }
                    else
                    {
                        SqlCommand cmdPend = new SqlCommand("SELECT SUM(ISNULL(PndC_Amount,0))  FROM PendingCollections WHERE PndC_Labno=" + labNum + " AND PndC_YrId=" + YearId + " AND PndC_CpyId=" + CmpnyId + "", sqlcon);
                        PendingAmt = Convert.ToDouble(cmdPend.ExecuteScalar());

                    }
                }
                catch { }
                foreach (var itmDet in invDet_Dls)
                {
                    tstKey = itmDet.InvItm_TstId;
                    if (splrId != 0)
                    {
                        var tsList = (from tst in db.Test_Mst
                                      join spr in db.Special_Rates on tst.TstMst_Key equals (float)spr.SplR_TstID
                                      where (tst.TstMst_Key == tstKey
                                      && spr.SplR_ID == (decimal)splrId)
                                      select new testDetails
                                      {
                                          TstMst_name = tst.TstMst_name,
                                          TstMst_Rate = tst.TstMst_Rate,
                                          TstMst_Key = Convert.ToInt32(tst.TstMst_Key),
                                          TstMst_ShortName = tst.TstMst_ShortName,
                                          SplR_NRate = Convert.ToDouble(spr.SplR_NRate),
                                          TstMst_Total = Convert.ToDouble(spr.SplR_NRate),
                                          TstMst_DiscPer = ((Convert.ToDouble(spr.SplR_NRate) / tst.TstMst_Rate) * 100),
                                          TstMst_TypeId = tst.TstMst_TypeId
                                      }).ToList();
                        if (tsList == null)
                        {
                            tsList = (from tst in db.Test_Mst
                                      join spr in db.Special_SchemeRates on tst.TstMst_Key equals (float)spr.SplSchR_TstID
                                      where (tst.TstMst_Key == tstKey
                                      && spr.SplSchR_ID == (decimal)splrId)
                                      select new testDetails
                                      {
                                          TstMst_name = tst.TstMst_name,
                                          TstMst_Rate = tst.TstMst_Rate,
                                          TstMst_Key = Convert.ToInt32(tst.TstMst_Key),
                                          TstMst_ShortName = tst.TstMst_ShortName,
                                          SplR_NRate = spr.SplSchR_NRate,
                                          TstMst_Total = spr.SplSchR_NRate,
                                          TstMst_DiscPer = ((spr.SplSchR_NRate / tst.TstMst_Rate) * 100),
                                          TstMst_TypeId = tst.TstMst_TypeId
                                      }).ToList();
                            foreach (var tsts in tsList)
                            {
                                testDetails tstss = new testDetails()
                                {
                                    TstMst_name = tsts.TstMst_name,
                                    TstMst_Rate = tsts.TstMst_Rate,
                                    TstMst_Key = tsts.TstMst_Key,
                                    TstMst_ShortName = tsts.TstMst_ShortName,
                                    SplR_NRate = tsts.SplR_NRate,
                                    TstMst_Total = tsts.SplR_NRate,
                                    TstMst_DiscPer = ((tsts.SplR_NRate / tsts.TstMst_Rate) * 100),
                                    TstMst_TypeId = tsts.TstMst_TypeId
                                };
                                tstList.Add(tstss);
                            }
                        }
                        foreach (var tsts in tsList)
                        {
                            testDetails tstss = new testDetails()
                            {
                                TstMst_name = tsts.TstMst_name,
                                TstMst_Rate = tsts.TstMst_Rate,
                                TstMst_Key = tsts.TstMst_Key,
                                TstMst_ShortName = tsts.TstMst_ShortName,
                                SplR_NRate = tsts.SplR_NRate,
                                TstMst_Total = tsts.SplR_NRate,
                                TstMst_DiscPer = ((tsts.SplR_NRate / tsts.TstMst_Rate) * 100),
                                TstMst_TypeId = tsts.TstMst_TypeId
                            };
                            tstList.Add(tstss);
                        }
                    }
                    else
                    {
                        var tsList = db.Test_Mst.Where(tst => tst.TstMst_Key == tstKey).Select(t => new { t.TstMst_Key, t.TstMst_Rate, t.TstMst_ShortName, t.TstMst_name, t.TstMst_TypeId }).ToList();
                        foreach (var itm in tsList)
                        {
                            testDetails tst = new testDetails()
                            {
                                TstMst_name = itm.TstMst_name,
                                TstMst_Rate = itm.TstMst_Rate,
                                TstMst_Key = Convert.ToInt32(itm.TstMst_Key),
                                TstMst_ShortName = itm.TstMst_ShortName,
                                SplR_NRate = itm.TstMst_Rate,
                                TstMst_Total = itm.TstMst_Rate,
                                TstMst_DiscPer = ((itm.TstMst_Rate / itm.TstMst_Rate) * 100),
                                TstMst_TypeId = itm.TstMst_TypeId
                            };
                            tstList.Add(tst);
                        }
                    }
                }
                foreach (var itm in invce_Dtls)
                {
                    bnkId = itm.Inv_BankId;
                    string bnkName = db.AccountHeads_Mst.Where(acc => acc.AhMst_Key == bnkId).Select(a => a.AhMst_pName).FirstOrDefault();
                    discId = itm.Inv_DiscId;
                    string discRsn = db.Masters.Where(ms => ms.Mstr_Key == discId).Select(m => m.Mstr_Desc).FirstOrDefault();
                    clinicId = itm.Inv_hospId;
                    string clinic = db.AccountHeads_Mst.Where(acc => acc.AhMst_Key == clinicId).Select(a => a.AhMst_pName).FirstOrDefault();
                    CollStaffId = itm.Inv_CltnID;
                    string collStaff = db.AccountHeads_Mst.Where(acc => acc.AhMst_Key == CollStaffId).Select(a => a.AhMst_pName).FirstOrDefault();
                    corpKey = itm.Inv_InsId;
                    string Corporate = db.AccountHeads_Mst.Where(acc => acc.AhMst_Key == corpKey).Select(a => a.AhMst_pName).FirstOrDefault();
                    drKey = itm.Inv_DrId;
                    string DrName = db.AccountHeads_Mst.Where(acc => acc.AhMst_Key == drKey).Select(a => a.AhMst_pName).FirstOrDefault();
                    string OutDrName = db.Invoice_Mst.Where(invce => invce.Inv_No == labNum).Select(i => i.Inv_OutDr).FirstOrDefault();
                    CollModeId = (double?)itm.Inv_CollModeId;
                    string CollMode = db.Masters.Where(mstr => mstr.Mstr_Key == CollModeId).Select(a => a.Mstr_Desc).FirstOrDefault();
                    //DateTime invdate=DateTime.Now;
                    //var query = (from pnd in db.PendingCollections
                    //             join invce in db.Invoice_Mst on pnd.PndC_Labno equals invce.Inv_No
                    //             where pnd.PndC_CpyId == (decimal)l.BrMst_Key
                    //             && pnd.PndC_YrId == (decimal)l.Yr_Id
                    //             && pnd.PndC_Labno == itm.Inv_No
                    //             && pnd.PndC_Cancld != 1
                    //             && invce.Inv_Status != -1
                    //             select new { pnd.PndC_Amount }).FirstOrDefault();
                    invoiceMst inv = new invoiceMst()
                    {
                        PendingAmt = PendingAmt,
                        OutDrName = OutDrName ?? "",
                        BankName = bnkName ?? "",
                        DiscReason = discRsn ?? "",
                        Clinic = clinic ?? "",
                        CollStaff = collStaff ?? "",
                        Corporate = Corporate ?? "",
                        Doctor = DrName ?? "",
                        CollMode = CollMode ?? "",
                        Inv_No = itm.Inv_No,
                        Inv_RsltNO = itm.Inv_RsltNO ?? "",
                        Inv_Date = itm.Inv_Date,
                        Inv_time = itm.Inv_time ?? "",
                        Inv_Tittle = itm.Inv_Tittle ?? "",
                        Inv_name = itm.Inv_name ?? "",
                        Inv_Dob = itm.Inv_Dob,
                        Inv_InsNo = itm.Inv_InsNo ?? "",
                        Inv_DOBstring = (itm.Inv_Dob).Value.ToString("dd-MMM-yyyy") ?? "",
                        Inv_Gender = itm.Inv_Gender ?? "",
                        Inv_ageYY = (int)itm.Inv_ageYY,
                        Inv_ageMM = (int)itm.Inv_ageMM,
                        Inv_ageDD = (int)itm.Inv_ageDD,
                        Inv_phno = itm.Inv_phno ?? "",
                        Inv_Email = itm.Inv_Email ?? "",
                        Inv_Address = itm.Inv_Address ?? "",
                        Inv_DrId = (double)itm.Inv_DrId,
                        Inv_CollModeId = (double)itm.Inv_CollModeId,
                        Inv_InsId = (double)itm.Inv_InsId,
                        Inv_PntId = (double)itm.Inv_PntId,
                        Inv_OutDr = itm.Inv_OutDr ?? "",
                        Inv_hospId = (double)itm.Inv_hospId,
                        Inv_CltnID = (double)itm.Inv_CltnID,
                        Inv_PayMode = itm.Inv_PayMode ?? "",
                        Inv_SmplDate = itm.Inv_SmplDate,
                        Inv_SmplDatestring = (itm.Inv_SmplDate).Value.ToString("dd-MMM-yyyy hh:mm tt") ?? "",
                        Inv_RepTime = itm.Inv_RepTime,
                        Inv_RsltOnDatestring = (itm.Inv_RepTime).Value.ToString("dd-MMM-yyyy hh:mm tt") ?? "",
                        Inv_GrosAmt = (double)itm.Inv_GrosAmt,
                        Inv_DiscAmt = (double)itm.Inv_DiscAmt,
                        Inv_OthAmt = (double)itm.Inv_OthAmt,
                        Inv_Netamt = (double)itm.Inv_Netamt,
                        Inv_RcvdAmt = (double)itm.Inv_RcvdAmt,
                        Inv_BalAmt = (double)itm.Inv_BalAmt,
                        Invl_IsPending = (int)itm.Invl_IsPending,
                        Inv_CurRcvdAmt = (double)itm.Inv_CurRcvdAmt,
                        Inv_CurBalAmt = (double)itm.Inv_CurBalAmt,
                        Inv_RepThrCourier = (bool)itm.Inv_RepThrCourier,
                        Inv_RepThrEmail = (bool)itm.Inv_RepThrEmail,
                        Inv_RepThrPersonal = (bool)itm.Inv_RepThrPersonal,
                        Inv_RepThrPhone = (bool)itm.Inv_RepThrPhone,
                        Inv_RepThrSms = (bool)itm.Inv_RepThrSms,
                        Inv_WhatsApp = (bool)itm.Inv_WhatsApp,
                        Inv_Comment = itm.Inv_Comment ?? "",
                        Inv_OthCmnt = itm.Inv_OthCmnt ?? "",
                        Inv_DiscId = (double)itm.Inv_DiscId,
                        Inv_Schrge = (double)itm.Inv_Schrge
                    };
                    inv.tstList = tstList;
                    Invlst.Add(inv);
                    sqlcon.Close();
                }
                return Json(new { Result = "OK", Record = Invlst }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception exe)
            {
                return Json(new { Result = "ERROR", message = exe.Message });
            }
        }
        [HttpPost]
        public JsonResult InvoiceUpdate(invoiceMst pdt)
        {
            int errorlog = 0;
            try
            {
                errorlog = 1;
                Voucher vchr = new Voucher();
                Invoice_Det det = new Invoice_Det();
                string payMde = pdt.Inv_PayMode;
                Invoice_Mst pdls = new Invoice_Mst();
                errorlog = 3;
                double tstId = 0;
                double tsttypeID = 0;
                double rptday = 0;
                string rptTimedays = "";
                DateTime tempDate = DateTime.Now;
                DateTime IntermediateTime = DateTime.Now;
                DateTime changedDate = DateTime.Now;
                double cpyid = pdt.Inv_CpyId;
                double yrid = pdt.Inv_YrId;
                double InvNumber = pdt.Inv_No;
                var testing = this.db.Invoice_Mst.Where(invc => invc.Inv_No == InvNumber && invc.Inv_YrId == (decimal)yrid && invc.Inv_BrID == cpyid).ToList();
                var invdetDls = db.Invoice_Det.Where(i => i.InvItm_Invno == InvNumber && i.InvItm_CpyId == (decimal)cpyid && i.InvItm_YrId == (decimal)yrid).ToList();
                foreach (var idet in invdetDls)
                {
                    db.Invoice_Det.Remove(idet);
                }
                db.SaveChanges();
                foreach (invoiceDet invdet in pdt.invDetlist)
                {
                    DateTime currentTime = DateTime.Now;
                    tsttypeID = invdet.Tst_TypeId;
                    tstId = invdet.InvItm_TstId;
                    rptday = Convert.ToDouble(db.Test_Mst.Where(tst => tst.TstMst_Key == tstId).Select(ts => ts.tst_RptDay).FirstOrDefault());
                    rptTimedays = db.Test_Mst.Where(tst => tst.TstMst_Key == tstId).Select(ts => ts.tst_RptTmeDays).FirstOrDefault();
                    if (rptTimedays == "Days")
                    {
                        changedDate = currentTime.AddDays(rptday);
                    }
                    if (rptTimedays == "Hours")
                    {
                        changedDate = currentTime.AddHours(rptday);
                    }

                    if (changedDate > tempDate)
                    {
                        tempDate = changedDate;
                        IntermediateTime = tempDate;
                    }
                    else
                    {
                        tempDate = IntermediateTime;
                    }
                    if (tsttypeID == -12)
                    {
                        det.InvItm_TstId = invdet.InvItm_TstId;
                        det.InvItm_TstOrgRate = invdet.InvItm_TstOrgRate;
                        det.InvItm_YrId = (decimal)invdet.InvItm_YrId;
                        det.InvItm_CpyId = (decimal)invdet.InvItm_CpyId;
                        det.InvItm_DiscAmt = invdet.InvItm_DiscAmt;
                        det.InvItm_DiscPer = (decimal)invdet.InvItm_DiscPer;
                        det.InvItm_Issued = invdet.InvItm_Issued;
                        det.InvItm_Orgrate = invdet.InvItm_Orgrate;
                        det.InvItm_rate = invdet.InvItm_rate;
                        det.InvItm_RevDiscAmt = invdet.InvItm_RevDiscAmt;
                        db.Invoice_Det.Add(det);
                        db.SaveChanges();
                        var gpTstDls = db.Set_GroupTest.Where(st => st.StGrpTst_GrpId == tstId).Select(s => new { s.StGrpTst_TstCode, s.StGrpTst_GrpId }).ToList();
                        foreach (var gpTst in gpTstDls)
                        {
                            det.InvItm_TstId = tstId;
                            det.InvItm_TstOrgRate = 0;
                            det.InvItm_YrId = (decimal)invdet.InvItm_YrId;
                            det.InvItm_CpyId = (decimal)invdet.InvItm_CpyId;
                            det.InvItm_DiscAmt = 0;
                            det.InvItm_DiscPer = 0;
                            det.InvItm_Issued = 0;
                            det.InvItm_Orgrate = 0;
                            det.InvItm_rate = 0;
                            det.InvItm_Type = 1;
                            det.InvItm_RevDiscAmt = 0;
                            db.Invoice_Det.Add(det);
                            db.SaveChanges();
                            errorlog = 4;
                        }
                    }
                    else
                    {
                        det.InvItm_TstId = invdet.InvItm_TstId;
                        det.InvItm_TstOrgRate = invdet.InvItm_TstOrgRate;
                        det.InvItm_YrId = (decimal)invdet.InvItm_YrId;
                        det.InvItm_CpyId = (decimal)invdet.InvItm_CpyId;
                        det.InvItm_DiscAmt = invdet.InvItm_DiscAmt;
                        det.InvItm_DiscPer = (decimal)invdet.InvItm_DiscPer;
                        det.InvItm_Issued = invdet.InvItm_Issued;
                        det.InvItm_Orgrate = invdet.InvItm_Orgrate;
                        det.InvItm_rate = invdet.InvItm_rate;
                        det.InvItm_RevDiscAmt = invdet.InvItm_RevDiscAmt;
                        db.Invoice_Det.Add(det);
                        db.SaveChanges();
                        errorlog = 5;
                    }
                }
                pdls.Inv_IsInsrnce = pdt.Inv_IsInsrnce;
                pdls.Inv_PntId = pdt.Inv_PntId;
                pdls.Inv_PntInvId = pdt.Inv_PntInvId;
                pdls.Inv_PayMode = pdt.Inv_PayMode;
                pdls.Inv_Tittle = pdt.Inv_Tittle;
                pdls.Inv_name = pdt.Inv_name;
                pdls.Inv_Gender = pdt.Inv_Gender;
                pdls.Inv_ageYY = pdt.Inv_ageYY;
                pdls.Inv_ageMM = pdt.Inv_ageMM;
                pdls.Inv_ageDD = pdt.Inv_ageDD;
                pdls.Inv_phno = pdt.Inv_phno;
                pdls.Inv_ItemDisc = pdt.Inv_ItemDisc;
                pdls.Inv_Address = pdt.Inv_Address;
                pdls.Inv_SmplDate = (DateTime?)(DateTime.Now);
                pdls.Inv_RsltNO = pdt.Inv_RsltNO;
                pdls.Inv_BrID = pdt.Inv_BrID;
                string invdate = (pdt.Inv_Date).Value.ToShortDateString();
                string inv = (pdt.Inv_Date).Value.ToString("hh:mm tt");
                DateTime x = Convert.ToDateTime(invdate);
                pdls.Inv_Date = x;
                pdls.Inv_time = inv;
                pdls.Inv_InsId = pdt.Inv_InsId;
                pdls.Inv_InsNo = pdt.Inv_InsNo;
                pdls.Inv_AreaId = pdt.Inv_AreaId;
                pdls.Inv_EmailtoPatient = pdt.Inv_EmailtoPatient;
                pdls.Inv_Email = pdt.Inv_Email;
                pdls.Inv_EtoDr = pdt.Inv_EtoDr;
                pdls.Inv_DrId = pdt.Inv_DrId;
                pdls.Inv_OutDr = pdt.Inv_OutDr;
                pdls.Inv_hospId = pdt.Inv_hospId;
                pdls.Inv_Schrge = pdt.Inv_Schrge;
                pdls.Inv_DiscId = pdt.Inv_DiscId;
                pdls.Inv_CltnID = pdt.Inv_CltnID;
                pdls.Invl_DiscPer = pdt.Invl_DiscPer;
                pdls.Inv_RepTime = tempDate;
                pdls.Inv_GrosAmt = pdt.Inv_GrosAmt;
                pdls.Inv_DiscAmt = pdt.Inv_DiscAmt;
                pdls.Inv_OthAmt = pdt.Inv_OthAmt;
                pdls.Inv_Netamt = pdt.Inv_Netamt;
                pdls.Inv_RcvdAmt = pdt.Inv_RcvdAmt;
                pdls.Inv_BalAmt = pdt.Inv_BalAmt;
                pdls.Inv_Comment = pdt.Inv_Comment;
                pdls.Inv_OthCmnt = pdt.Inv_OthCmnt;
                pdls.Inv_User = pdt.Inv_User;
                pdls.Invl_IsPending = pdt.Invl_IsPending;
                pdls.Inv_Status = pdt.Inv_Status;
                pdls.Inv_CurRcvdAmt = pdt.Inv_CurRcvdAmt;
                pdls.Inv_CurBalAmt = pdt.Inv_CurBalAmt;
                pdls.Inv_UsrId = (decimal)pdt.Inv_UsrId;
                pdls.Inv_YrId = (decimal)pdt.Inv_YrId;
                pdls.Inv_CpyId = (decimal)pdt.Inv_CpyId;
                pdls.Inv_RepThrPersonal = pdt.Inv_RepThrPersonal;
                pdls.Inv_RepThrCourier = pdt.Inv_RepThrCourier;
                pdls.Inv_RepThrPhone = pdt.Inv_RepThrPhone;
                pdls.Inv_RepThrEmail = pdt.Inv_RepThrEmail;
                pdls.Inv_RepThrSms = pdt.Inv_RepThrSms;
                pdls.Inv_RptMode = pdt.Inv_RptMode;
                pdls.Inv_Updtd = (decimal)pdt.Inv_Updtd;
                pdls.Inv_ItemDesc = pdt.Inv_ItemDesc;
                pdls.Inv_WhatsApp = pdt.Inv_WhatsApp;
                pdls.Inv_DocPath1 = pdt.Inv_DocPath1;
                pdls.Inv_DocPath2 = pdt.Inv_DocPath2;
                pdls.Inv_DocPath3 = pdt.Inv_DocPath3;
                pdls.Inv_CollModeId = (decimal)pdt.Inv_CollModeId;
                pdls.Inv_Ward = pdt.Inv_Ward;
                pdls.Inv_WardId = (decimal)pdt.Inv_WardId;
                pdls.Inv_Area = pdt.Inv_Area;
                pdls.Inv_RevInc = pdt.Inv_RevInc;
                pdls.Inv_MemberCode = pdt.Inv_MemberCode;
                pdls.Inv_PresChck = pdt.Inv_PresChck;
                pdls.Inv_Dob = pdt.Inv_Dob;
                pdls.Inv_DiscAmt = pdt.Inv_DiscAmt;
                pdls.Inv_ShortName = pdt.Inv_ShortName;
                errorlog = 2;
                db.Invoice_Mst.Add(pdls);
                db.SaveChanges();
                double vchrId = pdt.Inv_InsId;
                double vchrCpyid = pdt.Inv_CpyId;
                double vchrYrid = pdt.Inv_YrId;
                double vchr_key = 0;
                double vchrKey = 0;
                errorlog = 6;
                try
                {
                    vchrKey = db.Vouchers.Max(v => v.vchr_Key);
                }
                catch (Exception exe)
                {
                    vchrKey = 0;
                }

                if (vchrKey == 0)
                {
                    vchr_key = vchr_key + 1;
                }
                else
                {
                    vchr_key = vchrKey + 1;
                }
                if (payMde == "Credit")
                {
                    foreach (voucherDtls vouchr in pdt.vchrList)
                    {
                        vchr.vchr_Key = vchr_key;
                        vchr.vchr_BookId = 0;
                        vchr.vchr_Chq = 0;
                        vchr.vchr_Updtd = 0;
                        vchr.vchr_TdsAmt = 0;
                        vchr.vchr_Narration = vouchr.vchr_Narration;
                        vchr.vchr_Payment = vouchr.vchr_Payment;
                        vchr.vchr_Receipt = vouchr.vchr_Receipt;
                        vchr.vchr_TimeStamp = vouchr.vchr_TimeStamp;
                        vchr.vchr_TransNo = Convert.ToInt32(vouchr.vchr_TransNo);
                        vchr.vchr_TransType = vouchr.vchr_TransType;
                        vchr.vchr_UsrId = vouchr.vchr_UsrId;
                        vchr.vchr_YrId = vouchr.vchr_YrId;
                        vchr.vchr_BrId = vouchr.vchr_BrId;
                        vchr.vchr_CpyId = vouchr.vchr_CpyId;
                        vchr.vchr_Date = vouchr.vchr_Date;
                        vchr.vchr_Id = Convert.ToInt32(vouchr.vchr_Id);
                        db.Vouchers.Add(vchr);
                        db.SaveChanges();
                        errorlog = 7;
                    }
                }
                return Json(new { Result = "OK" });
            }
            catch (System.Data.Entity.Validation.DbEntityValidationException dbEx)
            {
                Exception raise = dbEx;
                foreach (var validationErrors in dbEx.EntityValidationErrors)
                {
                    foreach (var validationError in validationErrors.ValidationErrors)
                    {
                        string message = string.Format("{0}:{1}",
                            validationErrors.Entry.Entity.ToString(),
                            validationError.ErrorMessage);
                        raise = new InvalidOperationException(message, raise);
                    }
                }
                string ModiData = " PdfExport Error- " + " ";
                StreamWriter tstream = System.IO.File.AppendText(Server.MapPath("~/bin/Debug") + "\\ERRORLOG.txt");
                try
                {
                    tstream.WriteLine("");
                    tstream.WriteLine("errorss --" + "err---" + errorlog);
                    tstream.WriteLine("");
                    tstream.Flush();
                    tstream.Close();
                }
                catch { }
                return Json(new { Result = "ERROR" });
            }
        }
        [HttpPost]
        public JsonResult TestDetailsWithcode(invoiceMst tstObj)
        {
            try
            {
                string term = "";
                double splrId = tstObj.Inv_InsId;
                double tstKey = tstObj.TstMst_Key;
                term = tstObj.TstMst_ShortName;
                if (term == null)
                {
                    term = tstObj.TstMst_name;
                    List<testDetails> tstList = new List<testDetails>();
                    if (splrId != 0)
                    {
                        tstList = (from tst in db.Test_Mst
                                   join spr in db.Special_Rates on tst.TstMst_Key equals (float)spr.SplR_TstID
                                   where (tst.TstMst_name == term
                                   && spr.SplR_ID == (decimal?)splrId) && spr.SplR_TstID == (decimal?)tstKey
                                   select new testDetails
                                   {
                                       TstMst_name = tst.TstMst_name,
                                       TstMst_Rate = tst.TstMst_Rate,
                                       TstMst_Key = Convert.ToInt32(tst.TstMst_Key),
                                       TstMst_ShortName = tst.TstMst_ShortName,
                                       SplR_NRate = Convert.ToDouble(spr.SplR_NRate),
                                       TstMst_Total = Convert.ToDouble(spr.SplR_NRate),
                                       TstMst_DiscPer = ((Convert.ToDouble(spr.SplR_NRate )/ tst.TstMst_Rate) * 100),
                                       SplR_DisPer = (double)spr.SplR_DisPer,
                                       TstMst_TypeId = tst.TstMst_TypeId,
                                       tst_RptDay = tst.tst_RptDay,
                                       tst_RptTmeDays = tst.tst_RptTmeDays
                                   }).ToList();
                        if (tstList.Count == 0)
                        {
                            tstList = (from tst in db.Test_Mst
                                       join spr in db.Special_SchemeRates on tst.TstMst_Key equals (float)spr.SplSchR_TstID
                                       where (tst.TstMst_name == term
                                       && spr.SplSchR_ID == (decimal?)splrId) && spr.SplSchR_TstID == (decimal?)tstKey
                                       select new testDetails
                                       {
                                           TstMst_name = tst.TstMst_name,
                                           TstMst_Rate = tst.TstMst_Rate,
                                           TstMst_Key = Convert.ToInt32(tst.TstMst_Key),
                                           TstMst_ShortName = tst.TstMst_ShortName,
                                           SplR_NRate = spr.SplSchR_NRate,
                                           TstMst_Total = spr.SplSchR_NRate,
                                           TstMst_DiscPer = ((spr.SplSchR_NRate / tst.TstMst_Rate) * 100),
                                           SplR_DisPer = (double)spr.SplSchR_DisPer,
                                           TstMst_TypeId = tst.TstMst_TypeId,
                                           tst_RptDay = tst.tst_RptDay,
                                           tst_RptTmeDays = tst.tst_RptTmeDays
                                       }).ToList();
                        }
                        if (tstList.Count == 0 && splrId != 0)
                        {
                            tstList = (from tst in db.Test_Mst
                                       join spr in db.Test_Mst on tst.TstMst_Key equals (float)spr.TstMst_Key
                                       where (tst.TstMst_name == term && tst.TstMst_Key == tstKey)
                                       select new testDetails
                                       {
                                           TstMst_name = tst.TstMst_name,
                                           TstMst_Rate = tst.TstMst_Rate,
                                           TstMst_Key = Convert.ToInt32(tst.TstMst_Key),
                                           TstMst_ShortName = tst.TstMst_ShortName,
                                           SplR_NRate = 0,
                                           TstMst_Total = tst.TstMst_Rate,
                                           TstMst_DiscPer = 0,
                                           SplR_DisPer = 0,
                                           TstMst_TypeId = tst.TstMst_TypeId,
                                           tst_RptDay = tst.tst_RptDay,
                                           tst_RptTmeDays = tst.tst_RptTmeDays
                                       }).ToList();
                        }
                    }
                    else
                    {
                        tstList = (from tst in db.Test_Mst
                                   join spr in db.Test_Mst on tst.TstMst_Key equals (float)spr.TstMst_Key
                                   where (tst.TstMst_name == term && tst.TstMst_Key == tstKey)
                                   select new testDetails
                                   {
                                       TstMst_name = tst.TstMst_name,
                                       TstMst_Rate = tst.TstMst_Rate,
                                       TstMst_Key = Convert.ToInt32(tst.TstMst_Key),
                                       TstMst_ShortName = tst.TstMst_ShortName,
                                       SplR_NRate = 0,
                                       TstMst_Total = tst.TstMst_Rate,
                                       TstMst_DiscPer = 0,
                                       SplR_DisPer = 0,
                                       TstMst_TypeId = tst.TstMst_TypeId,
                                       tst_RptDay = tst.tst_RptDay,
                                       tst_RptTmeDays = tst.tst_RptTmeDays
                                   }).ToList();
                    }
                    return Json(new { Result = "OK", Records = tstList }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    List<testDetails> tstList = new List<testDetails>();
                    if (splrId != 0)
                    {
                        tstList = (from tst in db.Test_Mst
                                   join spr in db.Special_Rates on tst.TstMst_Key equals (float)spr.SplR_TstID
                                   where (tst.TstMst_ShortName == term
                                   && spr.SplR_ID == (decimal?)splrId) && spr.SplR_TstID == (decimal?)tstKey
                                   select new testDetails
                                   {
                                       TstMst_name = tst.TstMst_name,
                                       TstMst_Rate = tst.TstMst_Rate,
                                       TstMst_Key = Convert.ToInt32(tst.TstMst_Key),
                                       TstMst_ShortName = tst.TstMst_ShortName,
                                       SplR_NRate = Convert.ToDouble(spr.SplR_NRate),
                                       TstMst_Total = Convert.ToDouble(spr.SplR_NRate),
                                       TstMst_DiscPer = ((Convert.ToDouble(spr.SplR_NRate) / tst.TstMst_Rate) * 100),
                                       SplR_DisPer = (double)spr.SplR_DisPer,
                                       TstMst_TypeId = tst.TstMst_TypeId,
                                       tst_RptDay = tst.tst_RptDay,
                                       tst_RptTmeDays = tst.tst_RptTmeDays
                                   }).ToList();
                        if (tstList.Count == 0)
                        {
                            tstList = (from tst in db.Test_Mst
                                       join spr in db.Special_SchemeRates on tst.TstMst_Key equals (float)spr.SplSchR_TstID
                                       where (tst.TstMst_ShortName == term
                                       && spr.SplSchR_ID == (decimal?)splrId) && spr.SplSchR_TstID == (decimal?)tstKey
                                       select new testDetails
                                       {
                                           TstMst_name = tst.TstMst_name,
                                           TstMst_Rate = tst.TstMst_Rate,
                                           TstMst_Key = Convert.ToInt32(tst.TstMst_Key),
                                           TstMst_ShortName = tst.TstMst_ShortName,
                                           SplR_NRate = spr.SplSchR_NRate,
                                           TstMst_Total = spr.SplSchR_NRate,
                                           TstMst_DiscPer = ((spr.SplSchR_NRate / tst.TstMst_Rate) * 100),
                                           SplR_DisPer = (double)spr.SplSchR_DisPer,
                                           TstMst_TypeId = tst.TstMst_TypeId,
                                           tst_RptDay = tst.tst_RptDay,
                                           tst_RptTmeDays = tst.tst_RptTmeDays
                                       }).ToList();
                        }
                        if (tstList.Count == 0 && splrId != 0)
                        {
                            tstList = (from tst in db.Test_Mst
                                       join spr in db.Test_Mst on tst.TstMst_Key equals (float)spr.TstMst_Key
                                       where (tst.TstMst_ShortName == term && tst.TstMst_Key == tstKey)
                                       select new testDetails
                                       {
                                           TstMst_name = tst.TstMst_name,
                                           TstMst_Rate = tst.TstMst_Rate,
                                           TstMst_Key = Convert.ToInt32(tst.TstMst_Key),
                                           TstMst_ShortName = tst.TstMst_ShortName,
                                           SplR_NRate = 0,
                                           TstMst_Total = tst.TstMst_Rate,
                                           TstMst_DiscPer = 0,
                                           SplR_DisPer = 0,
                                           TstMst_TypeId = tst.TstMst_TypeId,
                                           tst_RptDay = tst.tst_RptDay,
                                           tst_RptTmeDays = tst.tst_RptTmeDays
                                       }).ToList();
                        }
                    }
                    else
                    {
                        tstList = (from tst in db.Test_Mst
                                   join spr in db.Test_Mst on tst.TstMst_Key equals (float)spr.TstMst_Key
                                   where (tst.TstMst_ShortName == term && tst.TstMst_Key == tstKey)
                                   select new testDetails
                                   {
                                       TstMst_name = tst.TstMst_name,
                                       TstMst_Rate = tst.TstMst_Rate,
                                       TstMst_Key = Convert.ToInt32(tst.TstMst_Key),
                                       TstMst_ShortName = tst.TstMst_ShortName,
                                       SplR_NRate = 0,
                                       TstMst_Total = tst.TstMst_Rate,
                                       TstMst_DiscPer = 0,
                                       SplR_DisPer = 0,
                                       TstMst_TypeId = tst.TstMst_TypeId,
                                       tst_RptDay = tst.tst_RptDay,
                                       tst_RptTmeDays = tst.tst_RptTmeDays
                                   }).ToList();
                    }
                    return Json(new { Result = "OK", Records = tstList }, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception exe)
            {
                return Json(new { Result = "ERROR", message = exe.Message });
            }
        }
        public JsonResult CheckTestDetails(invoiceMst pdt)
        {
            try
            {
                double invNo = pdt.Inv_No;
                double CorpId = pdt.Inv_InsId;
                double Test_Key = 0;
                testDetails tstDls = new testDetails();
                List<testDetails> tstList = new List<testDetails>();
                foreach (invoiceDet invdet in pdt.invDetlist)
                {
                    double invn = invdet.InvItm_Invno;
                    Test_Key = invdet.InvItm_TstId;
                    if (CorpId != 0)
                    {
                        tstDls = (from tst in db.Test_Mst
                                  join spr in db.Special_Rates on tst.TstMst_Key equals (float)spr.SplR_TstID
                                  where (spr.SplR_ID == (decimal?)CorpId) && spr.SplR_TstID == (decimal?)Test_Key
                                  select new testDetails
                                  {
                                      TstMst_name = tst.TstMst_name,
                                      TstMst_Rate = tst.TstMst_Rate,
                                      TstMst_Key = Convert.ToInt32(tst.TstMst_Key),
                                      TstMst_ShortName = tst.TstMst_ShortName,
                                      SplR_NRate = Convert.ToDouble(spr.SplR_NRate),
                                      TstMst_Total = Convert.ToDouble(spr.SplR_NRate),
                                      TstMst_DiscPer = ((Convert.ToDouble(spr.SplR_NRate) / tst.TstMst_Rate) * 100),
                                      SplR_DisPer = (double)spr.SplR_DisPer,
                                      TstMst_TypeId = tst.TstMst_TypeId,
                                      tst_RptDay = tst.tst_RptDay,
                                      tst_RptTmeDays = tst.tst_RptTmeDays
                                  }).FirstOrDefault();
                        if (tstDls != null)
                        {
                            tstList.Add(tstDls);
                        }
                        if (tstDls == null)
                        {
                            tstDls = (from tst in db.Test_Mst
                                      join spr in db.Special_SchemeRates on tst.TstMst_Key equals (float)spr.SplSchR_TstID
                                      where (spr.SplSchR_ID == (decimal?)CorpId) && spr.SplSchR_TstID == (decimal?)Test_Key
                                      select new testDetails
                                      {
                                          TstMst_name = tst.TstMst_name,
                                          TstMst_Rate = tst.TstMst_Rate,
                                          TstMst_Key = Convert.ToInt32(tst.TstMst_Key),
                                          TstMst_ShortName = tst.TstMst_ShortName,
                                          SplR_NRate = spr.SplSchR_NRate,
                                          TstMst_Total = spr.SplSchR_NRate,
                                          TstMst_DiscPer = ((spr.SplSchR_NRate / tst.TstMst_Rate) * 100),
                                          SplR_DisPer = (double)spr.SplSchR_DisPer,
                                          TstMst_TypeId = tst.TstMst_TypeId,
                                          tst_RptDay = tst.tst_RptDay,
                                          tst_RptTmeDays = tst.tst_RptTmeDays
                                      }).FirstOrDefault();
                            if (tstDls != null)
                            {
                                tstList.Add(tstDls);
                            }
                        }
                        if (tstDls == null && CorpId != 0)
                        {
                            tstDls = (from tst in db.Test_Mst
                                      join spr in db.Test_Mst on tst.TstMst_Key equals (float)spr.TstMst_Key
                                      where (tst.TstMst_Key == Test_Key)
                                      select new testDetails
                                      {
                                          TstMst_name = tst.TstMst_name,
                                          TstMst_Rate = tst.TstMst_Rate,
                                          TstMst_Key = Convert.ToInt32(tst.TstMst_Key),
                                          TstMst_ShortName = tst.TstMst_ShortName,
                                          SplR_NRate = 0,
                                          TstMst_Total = tst.TstMst_Rate,
                                          TstMst_DiscPer = 0,
                                          SplR_DisPer = 0,
                                          TstMst_TypeId = tst.TstMst_TypeId,
                                          tst_RptDay = tst.tst_RptDay,
                                          tst_RptTmeDays = tst.tst_RptTmeDays
                                      }).FirstOrDefault();
                            if (tstDls != null)
                            {
                                tstList.Add(tstDls);
                            }
                        }
                    }
                    else
                    {
                        tstDls = (from tst in db.Test_Mst
                                  join spr in db.Test_Mst on tst.TstMst_Key equals (float)spr.TstMst_Key
                                  where (tst.TstMst_Key == Test_Key)
                                  select new testDetails
                                  {
                                      TstMst_name = tst.TstMst_name,
                                      TstMst_Rate = tst.TstMst_Rate,
                                      TstMst_Key = Convert.ToInt32(tst.TstMst_Key),
                                      TstMst_ShortName = tst.TstMst_ShortName,
                                      SplR_NRate = 0,
                                      TstMst_Total = tst.TstMst_Rate,
                                      TstMst_DiscPer = 0,
                                      SplR_DisPer = 0,
                                      TstMst_TypeId = tst.TstMst_TypeId,
                                      tst_RptDay = tst.tst_RptDay,
                                      tst_RptTmeDays = tst.tst_RptTmeDays
                                  }).FirstOrDefault();
                        if (tstDls != null)
                        {
                            tstList.Add(tstDls);
                        }
                    }
                }
                return Json(new { Result = "OK", Records = tstList }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception exe)
            {
                StreamWriter tstream = System.IO.File.AppendText(Server.MapPath("~/bin/Debug") + "\\ERRORLOG.txt");
                try
                {
                    tstream.WriteLine("");
                    tstream.Flush();
                    tstream.Close();
                }
                catch
                {
                }
                return Json(new { Result = "ERROR", message = exe.Message });
            }
        }
        public JsonResult ScanImage(double scanImage)
        {
            string filePathName = "";
            string ErrMsg = "";
            double scnImgChk = scanImage;
            filePathName = Server.MapPath("~/bin") + "\\Scaner2.ini";
            scanImagePath = "";
            if (System.IO.File.Exists(filePathName))
            {
                StreamReader sr = new StreamReader(filePathName);
                String line;
                line = sr.ReadLine();
                try
                {
                    if (line.Trim() != "")
                    {
                        scanImagePath = line.Trim();
                    }
                }
                catch { scanImagePath = ""; }
            }
            if (System.IO.File.Exists(filePathName))
            {
                _ScanerT = 1;
            }
            if (_ScanerT == 0)
            {
                try
                {
                    this._twain.Acquire();
                    return Json(new { Result = "OK" });
                }
                catch (Exception exe)
                {
                    var xceptn = exe.InnerException;
                    StreamWriter tstream = System.IO.File.AppendText(Server.MapPath("~/bin/Debug") + "\\ERRORLOG.txt");
                    try
                    {
                        tstream.WriteLine(DateTime.Now + "---" + xceptn);
                        tstream.Flush();
                        tstream.Close();
                    }
                    catch
                    {
                    }
                    return Json(new { Result = "ERROR" });
                }
            }
            else
            {
                try
                {
                    DeviceInfo firstScannerAvailable = null;
                    int ScanerF = 0;
                    var deviceManager = new DeviceManager();
                    for (int i = 1; i <= deviceManager.DeviceInfos.Count; i++)
                    {
                        if (deviceManager.DeviceInfos[i].Type != WiaDeviceType.ScannerDeviceType)
                        {
                            continue;
                        }
                        firstScannerAvailable = deviceManager.DeviceInfos[i];
                        ScanerF = 1;
                        break;
                    }
                    if (ScanerF == 0)
                    {
                        return Json(new { Result = "NoScanner" });
                    }
                    else
                    {
                        var device = firstScannerAvailable.Connect();
                        var scannerItem = device.Items[1];
                        CommonDialogClass dlg = new CommonDialogClass();
                        int resolution = 150;
                        int width_pixel = 1250;
                        int height_pixel = 1700;
                        int color_mode = 1;
                        string FileName = "";
                        string filenames = "";
                        object scanResult = dlg.ShowTransfer(scannerItem, WIA.FormatID.wiaFormatPNG, true);
                        if (scanResult != null)
                        {
                            ImageFile image = (ImageFile)scanResult;
                            FileName = scanImagePath + "Scan2.jpg";
                            if (System.IO.File.Exists(FileName))
                            {
                                System.IO.File.Delete(FileName);
                            }
                            image.SaveFile(FileName);
                            string imagename = "";
                            imagename = Guid.NewGuid().ToString();
                            try
                            {
                                filenames = scanImagePath + imagename + ".jpg";
                                image.SaveFile(filenames);
                                if (scnImgChk == 1)
                                    txtDoccuFileName1 = imagename;
                                else if (scnImgChk == 2)
                                    txtDoccuFileName2 = imagename;
                                else if (scnImgChk == 3)
                                    txtDoccuFileName3 = imagename;
                                else if (scnImgChk == 4)
                                    txtDoccuFileName4 = imagename;
                                return Json(new { Result = "OK", Record = filenames });
                            }
                            catch (Exception ex)
                            {
                                string msg = ex.Message;
                                return Json(new { Result = "ERROR" });
                            }
                        }
                        return Json(new { Result = "OK", Record = filenames });
                    }
                }
                catch (Exception ex)
                {
                    return Json(new { Result = "ERROR" });
                }
            }
        }
        //public JsonResult DeletePatientDetails(invoiceMst prev)
        //{
        //    try
        //    {
        //        //        var vps = db.VehicleProperties.Where(a => a.EngineId == id).ToList();
        //        //foreach (var vp in vps)
        //        //    db.VehicleProperties.Remove(vp);
        //        //db.SaveChanges();
        //        return Json(new { Result = "OK" });
        //    }
        //    catch (Exception exe)
        //    {
        //        //string ModiData = " PdfExport Error- " + " ";
        //        StreamWriter tstream = System.IO.File.AppendText(Server.MapPath("~/bin/Debug") + "\\ERRORLOG.txt");
        //        //StreamWriter tstream = System.IO.File.WriteAllText(Server.MapPath(""), "ERRORLOG.txt"));
        //        try
        //        {
        //            tstream.WriteLine("");
        //            tstream.WriteLine("errorss --" + "err---");
        //            tstream.WriteLine("");
        //            tstream.Flush();
        //            tstream.Close();
        //        }
        //        catch { }
        //        return Json(new { Result = "ERROR" });
        //    }
        //}
        //public JsonResult PatientPrint(invoiceMst inv)
        //{
        //    int nInv_No = 0;
        //    string filepath = "";
        //    String PName = "";
        //    String PAge = "";
        //    String Pymd = "";
        //    String Gender = "";
        //    string nReferBy = "";
        //    DateTime PInvDate = DateTime.Now;
        //    string nTestName = "";
        //    string nTestRate = "";

        //    string PInvTime = "";
        //    double nInv_Netamt = 0;
        //    double nInv_RcvdAmt = 0;
        //    double nInv_BalAmt = 0;
        //    double nInv_CurRcvdAmt = 0;
        //    double nInv_GrossAmt = 0;
        //    double nInv_DiscAmt = 0;
        //    string Paymode = "";
        //    string nAmtInWords = "";
        //    string nWardNo = "";
        //    string nUser = "";
        //    SqlConnection sqlcon = new SqlConnection();
        //    sqlcon = con.dbcon();
        //    sqlcon.Open();
        //    SqlCommand cmd = new SqlCommand();
        //    cmd.Connection = sqlcon;
        //    cmd.CommandType = CommandType.Text;
        //    SqlDataReader dread;

        //    cmd.CommandText = "SELECT INV.*,AHMST.AhMst_pName AS DrNAme from Invoice_Mst INV WITH (NOLOCK) LEFT JOIN AccountHeads_Mst AHMST ON INV.Inv_DrId=AHMST.AhMst_Key WHERE Inv_No = " + nInv_No + " AND Inv_CpyId = " + BrcmpyId + " AND Inv_YrId = " + cPublic.YearId;
        //    dread = cmd.ExecuteReader();
        //    if (dread.Read())
        //    {
        //        PName = Convert.ToString(dread["Inv_name"]);
        //        PAge = Convert.ToString(dread["Inv_age"]);
        //        Pymd = Convert.ToString(dread["Inv_ageymd"]);
        //        Gender = Convert.ToString(dread["Inv_Gender"]);
        //        Paymode = dread["Inv_PayMode"].ToString();
        //        Paymode = Paymode.ToUpper();
        //        try
        //        {
        //            nWardNo = Convert.ToString(dread["Inv_Ward"]);
        //        }
        //        catch { }
        //        try
        //        {
        //            nUser = Convert.ToString(dread["Inv_User"]);
        //        }
        //        catch { }
        //        if (Gender == "M")
        //        {
        //            Gender = "Male";
        //        }
        //        else if (Gender == "F")
        //        {
        //            Gender = "Female";
        //        }
        //        PInvDate = Convert.ToDateTime(dread["Inv_Date"].ToString());
        //        nReferBy = Convert.ToString(dread["Inv_OutDr"]);
        //        if (nReferBy == "")
        //        {
        //            nReferBy = Convert.ToString(dread["DrNAme"]);
        //        }
        //        PInvTime = Convert.ToString(dread["Inv_time"]);
        //        try
        //        {
        //            nInv_Netamt = Convert.ToDouble(dread["Inv_Netamt"]);
        //        }
        //        catch { }
        //        try
        //        {
        //            nInv_RcvdAmt = Convert.ToDouble(dread["Inv_RcvdAmt"]);
        //        }
        //        catch { }
        //        try
        //        {
        //            nInv_BalAmt = Convert.ToDouble(dread["Inv_CurBalAmt"]);
        //            nInv_BalAmt = nInv_BalAmt * -1;
        //        }
        //        catch { }
        //        try
        //        {
        //            nInv_CurRcvdAmt = Convert.ToDouble(dread["Inv_CurRcvdAmt"]);
        //        }
        //        catch { }
        //        try
        //        {
        //            nInv_GrossAmt = Convert.ToDouble(dread["Inv_GrosAmt"]);
        //        }
        //        catch { }
        //        try
        //        {
        //            nInv_DiscAmt = Convert.ToDouble(dread["Inv_DiscAmt"]);
        //        }
        //        catch { }

        //        if (Paymode == "CASH")
        //        {

        //            try
        //            {
        //                nAmtInWords = AmountInWords(nInv_CurRcvdAmt);
        //            }
        //            catch { }
        //        }
        //        else if (Paymode == "CREDIT")
        //        {
        //            try
        //            {
        //                nAmtInWords = AmountInWords(nInv_CurRcvdAmt);
        //            }
        //            catch { }
        //            //tstream.Write(cgen.AlignWord(nAmtInWords, "L", 30));
        //        }
        //        else
        //        {
        //            try
        //            {
        //                nAmtInWords = AmountInWords(nInv_Netamt);
        //            }
        //            catch { }
        //        }


        //        SqlCommand cmd1 = new SqlCommand();
        //        cmd1.Connection = Common.myConnectionVM;
        //        cmd1.CommandType = CommandType.Text;
        //        dread.Close();

        //        // SqlDataReader dread1;
        //        //***************Commected Rate 0******************************************
        //        cmd1.CommandText = "SELECT A.InvItm_TstId,A.InvItm_rate,A.InvItm_DiscPer,B.TstMst_name,B.TstMst_TypeId,B.TstMst_ShortName from Invoice_Det A WITH (NOLOCK) INNER JOIN Test_Mst B  WITH (NOLOCK) ON B.TstMst_Key = A.InvItm_TstId LEFT JOIN Masters Mst ON B.TstMst_DeptId=Mst.Mstr_Key  WHERE A.InvItm_Type=0 AND A.InvItm_Invno = " + nInv_No + " AND A.InvItm_CpyId = " + BrcmpyId + " AND A.InvItm_YrId = " + cPublic.YearId + " ORDER BY TstMst_DivsnId,TstMst_DeptId,TstMst_OrderBy";
        //        // cmd1.CommandText = "SELECT A.InvItm_TstId,A.InvItm_rate,A.InvItm_DiscPer,B.TstMst_name,B.TstMst_TypeId,B.TstMst_ShortName from Invoice_Det A WITH (NOLOCK) INNER JOIN Test_Mst B  WITH (NOLOCK) ON B.TstMst_Key = A.InvItm_TstId LEFT JOIN Masters Mst ON B.TstMst_DeptId=Mst.Mstr_Key  WHERE A.InvItm_rate>0 AND A.InvItm_Invno = " + nInv_No + " AND A.InvItm_CpyId = " + BrcmpyId + " AND A.InvItm_YrId = " + cPublic.YearId + " ORDER BY TstMst_DivsnId,TstMst_DeptId,TstMst_OrderBy";
        //        //******************************END********************************************
        //        //cmd1.CommandText = "SELECT A.InvItm_TstId,A.InvItm_rate,A.InvItm_DiscPer,B.TstMst_name,B.TstMst_TypeId,B.TstMst_ShortName from Invoice_Det A WITH (NOLOCK) INNER JOIN Test_Mst B  WITH (NOLOCK) ON B.TstMst_Key = A.InvItm_TstId WHERE A.InvItm_rate>0 AND A.InvItm_Invno = " + nInv_No + " AND A.InvItm_CpyId = " + BrcmpyId + " AND A.InvItm_YrId = " + cPublic.YearId + " ORDER BY TstMst_DeptId,TstMst_OrderBy";
        //        ////cmd1.CommandText = "SELECT A.InvItm_TstId,A.InvItm_rate,A.InvItm_DiscPer,B.TstMst_name from Invoice_Det A WITH (NOLOCK) INNER JOIN Test_Mst B  WITH (NOLOCK) ON B.TstMst_Key = A.InvItm_TstId WHERE A.InvItm_Invno = " + nInv_No + " AND A.InvItm_CpyId = " + BrcmpyId + " AND A.InvItm_YrId = " + cPublic.YearId+" AND A.InvItm_rate>0";
        //        // dread1 = cmd1.ExecuteReader();
        //        int slno = 1;
        //        int TempTestType = 0;
        //        SqlDataAdapter sda1 = new SqlDataAdapter(cmd1);
        //        DataTable dt1 = new DataTable();
        //        sda1.Fill(dt1);

        //        //  while (dread1.Read())
        //        foreach (DataRow dread1 in dt1.Rows)
        //        {
        //            nTestName = "";
        //            nTestRate = "0";
        //            //if (cPublic._TestShortBill == true)
        //            //{
        //            //    nTestName = Convert.ToString(dread1["TstMst_ShortName"]);
        //            //}
        //            //else
        //            //{
        //            try
        //            {
        //                nTestName = Convert.ToString(dread1["TstMst_name"]);
        //            }
        //            catch { }
        //            //}

        //            try
        //            {
        //                nTestRate = Convert.ToString(dread1["InvItm_rate"]);
        //            }
        //            catch { }
        //            slno = slno + 1;
        //            try
        //            {
        //                TempTestType = Convert.ToInt32(dread1["TstMst_TypeId"]);
        //            }
        //            catch { }
        //            if (TempTestType == -12)
        //            {
        //                int tempTestId = Convert.ToInt32(dread1["InvItm_TstId"]);
        //                SqlCommand Sqlcmd = new SqlCommand("SELECT Tst.TstMst_name,Tst.TstMst_ShortName FROM Set_GroupTest SetgrpTst LEFT JOIN Test_Mst Tst ON SetgrpTst.StGrpTst_TstCode=Tst.TstMst_Key WHERE StGrpTst_GrpId=" + tempTestId + " ORDER BY TstMst_DeptId,TstMst_OrderBy", Common.myConnectionVM);
        //                SqlDataAdapter sda = new SqlDataAdapter(Sqlcmd);
        //                DataTable dt = new DataTable();
        //                sda.Fill(dt);
        //                foreach (DataRow dr in dt.Rows)
        //                {
        //                    string TempTestName = "";
        //                    //if (cPublic._TestShortBill == true)
        //                    //{
        //                    //    TempTestName = dr["TstMst_ShortName"].ToString();
        //                    //}
        //                    //else
        //                    //{
        //                    try
        //                    {
        //                        TempTestName = dr["TstMst_name"].ToString();
        //                    }
        //                    catch { }

        //                    //}
        //                }
        //            }


        //            ///////////
        //        }
        //    }

        //    return null;
        //}
        public static string AmountInWords(double nAmount)
        {
            string[] inword = nAmount.ToString().Split('.');

            int number = Convert.ToInt32(inword[0].ToString());
            int fraction = 0;

            if (inword.Length > 1)
            {
                if (inword[1].Length == 1)
                {
                    try
                    {
                        fraction = Convert.ToInt32((inword[0].ToString().PadRight(2, '0')));
                    }
                    catch { }
                }
            }

            //int numbers;
            //int number = numbers;

            if (number == 0) return "Zero";
            if (number == -2147483648) return "Minus Two Hundred and Fourteen Crore Seventy Four Lakh Eighty Three Thousand Six Hundred and Forty Eight";

            int[] num = new int[4];
            int first = 0;
            int u, h, t;

            System.Text.StringBuilder sb = new System.Text.StringBuilder();

            if (number < 0)
            {
                sb.Append("Minus ");
                number = -number;
            }

            string[] words0 = { "", "One ", "Two ", "Three ", "Four ", "Five ", "Six ", "Seven ", "Eight ", "Nine " };
            string[] words1 = { "Ten ", "Eleven ", "Twelve ", "Thirteen ", "Fourteen ", "Fifteen ", "Sixteen ", "Seventeen ", "Eighteen ", "Nineteen " };
            string[] words2 = { "Twenty ", "Thirty ", "Forty ", "Fifty ", "Sixty ", "Seventy ", "Eighty ", "Ninety " };
            string[] words3 = { "Thousand ", "Lakh ", "Crore " };

            num[0] = number % 1000; // units
            num[1] = number / 1000;
            num[2] = number / 100000;

            num[1] = num[1] - 100 * num[2]; // thousands
            num[3] = number / 10000000; // crores
            num[2] = num[2] - 100 * num[3]; // lakhs

            for (int i = 3; i > 0; i--)
            {
                if (num[i] != 0)
                {
                    first = i;
                    break;
                }
            }

            for (int i = first; i >= 0; i--)
            {
                if (num[i] == 0) continue;
                u = num[i] % 10; // ones
                t = num[i] / 10;
                h = num[i] / 100; // hundreds
                t = t - 10 * h; // tens

                if (h > 0) sb.Append(words0[h] + "Hundred ");

                if (u > 0 || t > 0)
                {
                    if (h > 0 || i == 0 && nAmount > 100) sb.Append("and ");
                    if (t == 0)
                        sb.Append(words0[u]);
                    else if (t == 1)
                        sb.Append(words1[u]);
                    else
                        sb.Append(words2[t - 2] + words0[u]);
                }

                if (i != 0) sb.Append(words3[i - 1]);
            }
            return sb.ToString().TrimEnd();
        }
        public JsonResult PatientPrint(invoiceMst inv)
        {
            ReportDocument reportDocument = new ReportDocument();
            string Reportfilepaths = "";
            string NfileName = "";
            Reportfilepaths = Server.MapPath("~/Reports/");
            string filepath = "";
            DataSet dsPrint = new DataSet();
            DataTable dtMaster = new DataTable();
            DataTable dtDetails = new DataTable();
            DataTable dtTitle = new DataTable();
            DataTable dtBookingConsult = new DataTable();
            DataTable dtAccountHead = new DataTable();
            double nInv_No = inv.Inv_No;
            double nInv_YrId = inv.Inv_YrId;
            double nInv_CpyId = inv.Inv_CpyId;
            double Net_Amt = inv.Inv_Netamt;
            currentdate = DateTime.Now.ToString("ddmmyyyy");
            Inv_No = nInv_No;
            NfileName = "Report_" + nInv_No + "_" + currentdate + "_Invoice";
            SqlCommand cmd;
            SqlDataAdapter sDa;
            SqlConnection Sqlcon = null;
            Sqlcon = con.dbcon();
            Sqlcon.Open();
            dtTitle.TableName = "dtTitle";
            dtMaster.TableName = "dtMaster";
            dtDetails.TableName = "dtDetails";
            dtBookingConsult.TableName = "dtBookingConsult";
            dtAccountHead.TableName = "dtAccountHead";
            dtTitle.Columns.Add("FirmName", typeof(string));
            dtTitle.Columns.Add("FirmAdd1", typeof(string));
            dtTitle.Columns.Add("FirmAdd2", typeof(string));
            dtTitle.Columns.Add("FirmAdd3", typeof(string));
            dtTitle.Columns.Add("PhoneNo", typeof(string));
            dtTitle.Columns.Add("MailId", typeof(string));
            dtTitle.Columns.Add("TinNo", typeof(string));
            dtTitle.Columns.Add("CstNo", typeof(string));
            dtTitle.Columns.Add("Header1", typeof(string));
            dtTitle.Columns.Add("Header2", typeof(string));
            dtTitle.Columns.Add("Header3", typeof(string));
            cmd = new SqlCommand("SELECT A.*,ISNULL(B.AhMst_pName,'') AS ReferBy, ISNULL(C.AhMst_pName,'') AS Insurance ,Mst12.Mstr_Desc as CollMode,P.AhMst_NationalID As NationalID,P.AhMst_PassPortNo As PassportNO,P.AhMst_Dob AS PatienntDob,P.ahmst_code As PateintCode,BrMst.BrMst_Code as BrMst_Code " + Environment.NewLine
                + " FROM Invoice_Mst A LEFT JOIN AccountHeads_Mst B ON (B.AhMst_Key = A.Inv_DrId) LEFT JOIN AccountHeads_Mst C ON (C.AhMst_Key = A.Inv_InsId) LEFT JOIN AccountHeads_Mst P ON (P.AhMst_Key = A.Inv_PntId) " + Environment.NewLine
                + " LEFT JOIN Masters Mst12 ON A.Inv_CollModeId = Mst12.Mstr_Key " + Environment.NewLine
                + "LEFT JOIN Baranches_Mst BrMst ON A.Inv_CpyId = BrMst.BrMst_Key WHERE A.Inv_No = " + nInv_No + " AND A.Inv_YrId = " + nInv_YrId + " AND A.Inv_CpyId = " + nInv_CpyId, Sqlcon);
            sDa = new SqlDataAdapter(cmd.CommandText, Sqlcon);
            sDa.Fill(dtMaster);
            cmd = new SqlCommand("SELECT A.InvItm_TstId,A.InvItm_rate,A.InvItm_key,A.InvItm_Type,ISNULL(B.TstMst_name,'') AS TstMst_name,B.TstMst_DivsnId,B.TstMst_DeptId,B.TstMst_OrderBy,B.TstMst_TypeId,A.InvItm_Orgrate FROM Invoice_Det A LEFT JOIN Test_Mst B ON (B.TstMst_Key = A.InvItm_TstId) WHERE A.InvItm_Invno = " + nInv_No + " AND A.InvItm_YrId = " + nInv_YrId + " AND A.InvItm_CpyId = " + nInv_CpyId, Sqlcon);
            sDa = new SqlDataAdapter(cmd.CommandText, Sqlcon);
            sDa.Fill(dtDetails);
            try
            {
                cmd = new SqlCommand("SELECT Top 1 Bkn_Date,Bkn_Time,Bkn_Patient,Bkn_Token from Bkn_LabNo=" + nInv_No + " AND Bkn_YrId=" + nInv_YrId + " AND Bkn_CpyId=" + nInv_CpyId + "", Sqlcon);
                sDa = new SqlDataAdapter(cmd);
                sDa.Fill(dtBookingConsult);
            }
            catch { }
            try
            {
                cmd = new SqlCommand("Select Top 1 Ahmst.AhMst_Code As PatientCode from INVOICE_MSt Inv LEFT JOIN  AccountHeads_Mst Ahmst ON  Inv.Inv_PntId =Ahmst.Ahmst_Key where Inv_No=" + nInv_No + " and Inv_yrid=" + nInv_YrId + " and Inv_CpyId=" + nInv_CpyId + "", Sqlcon);
                sDa = new SqlDataAdapter(cmd);
                sDa.Fill(dtAccountHead);
            }
            catch { }
            Double AmtInWords = 0;
            string TempAmtInWors = "";
            try
            {
                AmtInWords = Convert.ToDouble(Net_Amt);
            }
            catch { }
            if (AmtInWords > 0)
            {
                TempAmtInWors = AmountInWords(AmtInWords);
            }

            //*****************************
            //****************Specimen****************************************

            //////***************SPECIMEN/sample types **************

            SqlCommand cmdSmpl = new SqlCommand("SELECT distinct Mst.Mstr_Desc as SampleType,Mst.Mstr_Code as SampleCode FROM dbo.Invoice_det genRes WITH(NOLOCK) left join dbo.Test_Mst Tst WITH(NOLOCK) ON genRes.InvItm_TstId = Tst.TstMst_Key LEFT join  Masters Mst ON Tst.tst_SmplTypeId = Mst.Mstr_Key  WHERE InvItm_Invno=" + nInv_No + " AND InvItm_CpyId=" + nInv_CpyId + " AND InvItm_YrId=" + nInv_YrId + " order by SampleType ", Sqlcon);
            string sampleType = "";


            try
            {
                SqlDataAdapter Sda = new SqlDataAdapter(cmdSmpl);
                DataTable dtsmppl = new DataTable();
                Sda.Fill(dtsmppl);
                if (dtsmppl.Rows.Count > 0)
                {
                    foreach (DataRow dr in dtsmppl.Rows)
                    {
                        if (sampleType == "")
                        {
                            sampleType = dr["SampleType"].ToString();
                        }
                        else
                        {
                            sampleType = sampleType + ", " + dr["SampleType"].ToString();
                        }
                    }
                }


            }
            catch { }
            //*******************************************************
            //*******************************
            DataTable dt = new DataTable();
            dt.Rows.Add();
            dt.Columns.Add("AmtInwords", typeof(string));
            dt.Columns.Add("sampleType", typeof(string));


            dt.Rows[0]["AmtInwords"] = TempAmtInWors;
            dt.Rows[0]["sampleType"] = sampleType;

            dsPrint.Tables.Clear();
            dsPrint.Tables.Add(dt);
            dsPrint.Tables.Add(dtTitle);
            dsPrint.Tables.Add(dtMaster);
            dsPrint.Tables.Add(dtDetails);
            dsPrint.Tables.Add(dtBookingConsult);
            dsPrint.Tables.Add(dtAccountHead);
            Reportfilepaths = Server.MapPath("~/Reports/");
            filepath = Path.Combine(Server.MapPath("~/Reports"), "rpt_Invoice.rpt");
            dsPrint.WriteXmlSchema(Reportfilepaths + "rpt_Invoice.xsd");
            try
            {
                reportDocument.Load(filepath);
                reportDocument.SetDataSource(dsPrint);
                string pdfFile = "";
                string pdfFilepath = Server.MapPath("~/PDFReport/");
                string TempLog = "";
                try
                {
                    NfileName = NfileName + ".pdf";
                    pdfFile = pdfFilepath + NfileName;
                    TempLog = pdfFile;
                    ExportOptions CrExportOptions;
                    CrystalDecisions.Shared.DiskFileDestinationOptions CrDiskFileDestinationOptions = new CrystalDecisions.Shared.DiskFileDestinationOptions();
                    PdfRtfWordFormatOptions CrFormatTypeOptions = new PdfRtfWordFormatOptions();
                    CrDiskFileDestinationOptions.DiskFileName = TempLog;
                    CrExportOptions = reportDocument.ExportOptions;
                    CrExportOptions.ExportDestinationType = ExportDestinationType.DiskFile;
                    CrExportOptions.ExportFormatType = ExportFormatType.PortableDocFormat;
                    CrExportOptions.DestinationOptions = CrDiskFileDestinationOptions;
                    CrExportOptions.FormatOptions = CrFormatTypeOptions;
                    reportDocument.Export();
                    Sqlcon.Close();
                }
                catch (Exception exe)
                {
                    StreamWriter tstream = System.IO.File.AppendText(Server.MapPath("~/bin/Debug") + "\\ERRORLOG.txt");
                    try
                    {
                        tstream.WriteLine("");
                        tstream.WriteLine(DateTime.Now + "errorss --" + exe.Message + "err->" + exe.InnerException);
                        tstream.WriteLine("");
                        tstream.Flush();
                        tstream.Close();
                    }
                    catch { }
                    return Json(new { Result = "ERROR" });
                }
                return Json(new { Result = "OK" });
            }
            catch (Exception exe)
            {
                StreamWriter tstream = System.IO.File.AppendText(Server.MapPath("~/bin/Debug") + "\\ERRORLOG.txt");
                try
                {
                    tstream.WriteLine("");
                    tstream.WriteLine(DateTime.Now + "errorss --" + exe.Message);
                    tstream.WriteLine("");
                    tstream.Flush();
                    tstream.Close();
                }
                catch { }
                return Json(new { Result = "ERROR" });
            }
        }
        public FileResult PDFPatientPrint()
        {
            string CurrentDate = currentdate;
            double InvNo = Inv_No;
            string fileName = "";
            fileName += "Report_" + InvNo + "_" + CurrentDate + "_Invoice";
            fileName = fileName + ".pdf";
            string ReportURL = Server.MapPath("~/PDFReport/" + fileName);
            byte[] FileBytes = System.IO.File.ReadAllBytes(ReportURL);
            return File(FileBytes, "application/pdf");
        }
        //InvNumCheck
        public JsonResult InvNumCheck(double invNo)
        {
            try
            {
                //double invNo = invNo;
                logindetails l = Session["logindls"] as logindetails;
                var minLabno = db.Invoice_Mst.Min(i => i.Inv_No);
                var invLst = db.Invoice_Mst.Where(inv => inv.Inv_No == invNo && inv.Inv_CpyId == (decimal)l.BrMst_Key && inv.Inv_YrId == (decimal)l.Yr_Id).ToList();
                return Json(new { Result = "OK", Records = minLabno, invLst= invLst }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception exe)
            {

                return Json(new { Result = "ERROR" });
            }

        }
        //public JsonResult InvNumCheck(double invNo, string fillstring)
        //{
        //    try
        //    {
        //        if (fillstring == "prev")
        //        {
        //            double x = invNo;
        //            var minLabno = db.Invoice_Mst.Min(i => i.Inv_No);
        //            return Json(new { Result = "OK", Records = minLabno }, JsonRequestBehavior.AllowGet);
        //        }
        //        else if (fillstring == "next")
        //        {
        //            double x = invNo;
        //            var maxLabno = db.Invoice_Mst.Max(i => i.Inv_No);
        //            return Json(new { Result = "OK", Records = maxLabno }, JsonRequestBehavior.AllowGet);
        //        }
        //        else
        //        {
        //            return Json(new { Result = "ERROR" });
        //        }
        //    }
        //    catch (Exception exe)
        //    {

        //        return Json(new { Result = "ERROR" });
        //    }

        //}
        public JsonResult SerchPatnt(String term, int Check)
        {
            List<patientMst> pdtls = new List<patientMst>();
            var patDls = db.Patient_Mst.Select(pat => new { pat.AhMst_Code, pat.AhMst_Key, pat.AhMst_pName, pat.AhMst_Address, pat.AhMst_mobile, pat.AhMst_Dob, pat.AhMst_Phno, pat.AhMst_Email, pat.AhMst_Ismale }).ToList();
            foreach (var itm in patDls)
            {
                patientMst pat = new patientMst()
                {
                    AhMst_Code = itm.AhMst_Code,
                    AhMst_pName = itm.AhMst_pName,
                    AhMst_Address = itm.AhMst_Address,
                    AhMst_Phno = itm.AhMst_Phno
                };
                pdtls.Add(pat);
            }
            //patDls = pdtls;
            return Json(new { Result = "OK", Record = pdtls }, JsonRequestBehavior.AllowGet);
        }
    }
}
