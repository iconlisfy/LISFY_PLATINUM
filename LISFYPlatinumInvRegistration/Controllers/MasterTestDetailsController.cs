using LISFYPlatinumInvRegistration.Models;
using System;
using System.Windows;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace LISFYPlatinumInvRegistration.Controllers
{

    public class MasterTestDetailsController : Controller
    {
        CARE021112LisfyPlatinumEntities db = new CARE021112LisfyPlatinumEntities();
        connection con = new connection();
        List<testDetails> tstdls = new List<testDetails>();
        List<masterDetails> mstrDls = new List<masterDetails>();
        // GET: MasterTestDetails
        string OldRefrence1 = ""; string OldGroupTest = "";
        string O_txtTestType = "", O_txtDepartment = "", O_txtMethod = "", O_txtRate = "", O_txtDivision = "";
        string O_txtUnit = "", O_txtSample = "", O_txtVolume = "", O_txtCutOfTime = "", O_txtTestMode = "";
        string O_txtTechnology = "", O_txtTestName = "", O_txtShortName = "", O_txtPerformedat = "", O_txtInternalNote = "";
        string O_cmbRptOn1 = "", O_cmbRptOn2 = "", NewRefrence1 = "", NewGroupTest = "";
        Boolean O_chkNABL, O_chkSendSMS, O_chkSampleBarcode, O_chkFreeTest;
        Boolean O_chkCommonTech, O_chkAvoidRsltEntry, O_chkHideHead;
        public ActionResult MasterTestDetail()
        {
            return View();
        }
        public JsonResult TestSearch(string term, int Check)
        {
            List<testDetails> testdtls = new List<testDetails>();
            if (Check == 0 && term != "")
            {
                //var patDls = db.Patient_Mst.Where(p => p.AhMst_pName.Contains(term)).Select(pat => new { pat.AhMst_Code, pat.AhMst_Key, pat.AhMst_pName, pat.AhMst_Address, pat.AhMst_mobile, pat.AhMst_Dob, pat.AhMst_Phno, pat.AhMst_Email, pat.AhMst_Ismale }).ToList();
                var tstDls = (from tst in db.Test_Mst
                              join mstr in db.Masters on tst.TstMst_DeptId equals mstr.Mstr_Key
                              join mstr1 in db.Masters.DefaultIfEmpty() on tst.tst_SmplTypeId equals mstr1.Mstr_Key into Masters_1
                              from master1 in Masters_1
                              orderby tst.TstMst_name ascending
                              where tst.TstMst_name.Contains(term)
                              select new testDetails
                              {
                                  TstMst_name = tst.TstMst_name,
                                  Department = mstr.Mstr_Desc,
                                  TstMst_Key = tst.TstMst_Key,
                                  Sample = master1.Mstr_Desc,
                                  TstMst_Rate = tst.TstMst_Rate
                              }).ToList();
                return Json(new { Result = "OK", Records = tstDls }, JsonRequestBehavior.AllowGet);
            }
            else if (Check == 1 && term != "")
            {
                var tstDls = (from tst in db.Test_Mst
                              join mstr in db.Masters on tst.TstMst_DeptId equals mstr.Mstr_Key
                              join mstr1 in db.Masters.DefaultIfEmpty() on tst.tst_SmplTypeId equals mstr1.Mstr_Key into Masters_1
                              from master1 in Masters_1
                              orderby tst.TstMst_Key ascending
                              where (tst.TstMst_Key.ToString()).Contains(term)
                              select new testDetails
                              {
                                  TstMst_name = tst.TstMst_name,
                                  Department = mstr.Mstr_Desc,
                                  TstMst_Key = tst.TstMst_Key,
                                  Sample = master1.Mstr_Desc,
                                  TstMst_Rate = tst.TstMst_Rate
                              }).ToList();
                return Json(new { Result = "OK", Records = tstDls }, JsonRequestBehavior.AllowGet);
            }
            else if (Check == 2 && term != "")
            {
                var tstDls = (from tst in db.Test_Mst
                              join mstr in db.Masters on tst.TstMst_DeptId equals mstr.Mstr_Key
                              join mstr1 in db.Masters on tst.tst_SmplTypeId equals mstr1.Mstr_Key into Masters_1
                              from master1 in Masters_1.DefaultIfEmpty()
                              orderby mstr.Mstr_Desc ascending
                              where mstr.Mstr_Desc.Contains(term)
                              select new testDetails
                              {
                                  TstMst_name = tst.TstMst_name,
                                  Department = mstr.Mstr_Desc,
                                  TstMst_Key = tst.TstMst_Key,
                                  Sample = master1.Mstr_Desc,
                                  TstMst_Rate = tst.TstMst_Rate
                              }).ToList();
                return Json(new { Result = "OK", Records = tstDls }, JsonRequestBehavior.AllowGet);
            }
            else if (Check == 3 && term != "")
            {
                var tstDls = (from tst in db.Test_Mst
                              join mstr in db.Masters on tst.TstMst_DeptId equals mstr.Mstr_Key
                              join mstr1 in db.Masters on tst.tst_SmplTypeId equals mstr1.Mstr_Key into Masters_1
                              from master1 in Masters_1.DefaultIfEmpty()
                              orderby master1.Mstr_Desc ascending
                              where master1.Mstr_Desc.Contains(term)
                              select new testDetails
                              {
                                  TstMst_name = tst.TstMst_name,
                                  Department = mstr.Mstr_Desc,
                                  TstMst_Key = tst.TstMst_Key,
                                  Sample = master1.Mstr_Desc,
                                  TstMst_Rate = tst.TstMst_Rate
                              }).ToList();
                return Json(new { Result = "OK", Records = tstDls }, JsonRequestBehavior.AllowGet);
            }
            else if (Check == 4 && term != "")
            {
                var tstDls = (from tst in db.Test_Mst
                              join mstr in db.Masters on tst.TstMst_DeptId equals mstr.Mstr_Key
                              join mstr1 in db.Masters on tst.tst_SmplTypeId equals mstr1.Mstr_Key into Masters_1
                              from master1 in Masters_1.DefaultIfEmpty()
                              orderby tst.TstMst_Rate ascending
                              where (tst.TstMst_Rate.ToString()).Contains(term)
                              select new testDetails
                              {
                                  TstMst_name = tst.TstMst_name,
                                  Department = mstr.Mstr_Desc,
                                  TstMst_Key = tst.TstMst_Key,
                                  Sample = master1.Mstr_Desc,
                                  TstMst_Rate = tst.TstMst_Rate
                              }).ToList();
                return Json(new { Result = "OK", Records = tstDls }, JsonRequestBehavior.AllowGet);
            }

            else if (Check == 5 && term != "")
            {
                var tdlss = db.Masters.Where(mstr => mstr.Mstr_Type == "TstType" && mstr.Mstr_Desc.Contains(term)).Select(m => new { m.Mstr_Desc, m.Mstr_Key }).OrderBy(t => t.Mstr_Desc).ToList();
                foreach (var itm in tdlss)
                {
                    masterDetails tst = new masterDetails()
                    {
                        Mstr_Desc = itm.Mstr_Desc,
                        Mstr_Key = itm.Mstr_Key
                    };
                    mstrDls.Add(tst);
                }
                ViewBag.MstrDls = mstrDls;
                return Json(new { Result = "OK", Records = mstrDls }, JsonRequestBehavior.AllowGet);
                //return Json(new { Result = "OK", Records = tstDls }, JsonRequestBehavior.AllowGet);
            }
            else if (Check == 6 && term != "")
            {
                var tdlss = db.Masters.Where(mstr => mstr.Mstr_Type == "TstType" && (mstr.Mstr_Key.ToString()).Contains(term)).Select(m => new { m.Mstr_Desc, m.Mstr_Key }).OrderBy(t => t.Mstr_Key).ToList();
                foreach (var itm in tdlss)
                {
                    masterDetails tst = new masterDetails()
                    {
                        Mstr_Desc = itm.Mstr_Desc,
                        Mstr_Key = itm.Mstr_Key
                    };
                    mstrDls.Add(tst);
                }
                ViewBag.MstrDls = mstrDls;
                return Json(new { Result = "OK", Records = mstrDls }, JsonRequestBehavior.AllowGet);
                //return Json(new { Result = "OK", Records = tstDls }, JsonRequestBehavior.AllowGet);
            }
            else if (Check == 7 && term != "")
            {
                var tdlss = db.Masters.Where(mstr => mstr.Mstr_Type == "Mthd" && (mstr.Mstr_Desc.ToString()).Contains(term)).Select(m => new { m.Mstr_Desc, m.Mstr_Key }).OrderBy(t => t.Mstr_Desc).ToList();
                foreach (var itm in tdlss)
                {
                    masterDetails tst = new masterDetails()
                    {
                        Mstr_Desc = itm.Mstr_Desc,
                        Mstr_Key = itm.Mstr_Key
                    };
                    mstrDls.Add(tst);
                }
                ViewBag.MstrDls = mstrDls;
                return Json(new { Result = "OK", Records = mstrDls }, JsonRequestBehavior.AllowGet);
                //return Json(new { Result = "OK", Records = tstDls }, JsonRequestBehavior.AllowGet);
            }
            else if (Check == 8 && term != "")
            {
                var tdlss = db.Masters.Where(mstr => mstr.Mstr_Type == "Mthd" && (mstr.Mstr_Key.ToString()).Contains(term)).Select(m => new { m.Mstr_Desc, m.Mstr_Key }).OrderBy(t => t.Mstr_Key).ToList();
                foreach (var itm in tdlss)
                {
                    masterDetails tst = new masterDetails()
                    {
                        Mstr_Desc = itm.Mstr_Desc,
                        Mstr_Key = itm.Mstr_Key
                    };
                    mstrDls.Add(tst);
                }
                ViewBag.MstrDls = mstrDls;
                return Json(new { Result = "OK", Records = mstrDls }, JsonRequestBehavior.AllowGet);
                //return Json(new { Result = "OK", Records = tstDls }, JsonRequestBehavior.AllowGet);
            }
            else if (Check == 9 && term != "")
            {
                var tdlss = db.Masters.Where(mstr => mstr.Mstr_Type == "Dept" && (mstr.Mstr_Desc.ToString()).Contains(term)).Select(m => new { m.Mstr_Desc, m.Mstr_Key }).OrderBy(t => t.Mstr_Desc).ToList();
                foreach (var itm in tdlss)
                {
                    masterDetails tst = new masterDetails()
                    {
                        Mstr_Desc = itm.Mstr_Desc,
                        Mstr_Key = itm.Mstr_Key
                    };
                    mstrDls.Add(tst);
                }
                ViewBag.MstrDls = mstrDls;
                return Json(new { Result = "OK", Records = mstrDls }, JsonRequestBehavior.AllowGet);
                //return Json(new { Result = "OK", Records = tstDls }, JsonRequestBehavior.AllowGet);
            }
            else if (Check == 10 && term != "")
            {
                var tdlss = db.Masters.Where(mstr => mstr.Mstr_Type == "Dept" && (mstr.Mstr_Key.ToString()).Contains(term)).Select(m => new { m.Mstr_Desc, m.Mstr_Key }).OrderBy(t => t.Mstr_Key).ToList();
                foreach (var itm in tdlss)
                {
                    masterDetails tst = new masterDetails()
                    {
                        Mstr_Desc = itm.Mstr_Desc,
                        Mstr_Key = itm.Mstr_Key
                    };
                    mstrDls.Add(tst);
                }
                ViewBag.MstrDls = mstrDls;
                return Json(new { Result = "OK", Records = mstrDls }, JsonRequestBehavior.AllowGet);
                //return Json(new { Result = "OK", Records = tstDls }, JsonRequestBehavior.AllowGet);
            }
            else if (Check == 11 && term != "")
            {
                var tdlss = db.Masters.Where(mstr => mstr.Mstr_Type == "Div" && (mstr.Mstr_Desc.ToString()).Contains(term)).Select(m => new { m.Mstr_Desc, m.Mstr_Key }).OrderBy(t => t.Mstr_Desc).ToList();
                foreach (var itm in tdlss)
                {
                    masterDetails tst = new masterDetails()
                    {
                        Mstr_Desc = itm.Mstr_Desc,
                        Mstr_Key = itm.Mstr_Key
                    };
                    mstrDls.Add(tst);
                }
                ViewBag.MstrDls = mstrDls;
                return Json(new { Result = "OK", Records = mstrDls }, JsonRequestBehavior.AllowGet);
                //return Json(new { Result = "OK", Records = tstDls }, JsonRequestBehavior.AllowGet);
            }
            else if (Check == 12 && term != "")
            {
                var tdlss = db.Masters.Where(mstr => mstr.Mstr_Type == "Div" && (mstr.Mstr_Key.ToString()).Contains(term)).Select(m => new { m.Mstr_Desc, m.Mstr_Key }).OrderBy(t => t.Mstr_Key).ToList();
                foreach (var itm in tdlss)
                {
                    masterDetails tst = new masterDetails()
                    {
                        Mstr_Desc = itm.Mstr_Desc,
                        Mstr_Key = itm.Mstr_Key
                    };
                    mstrDls.Add(tst);
                }
                ViewBag.MstrDls = mstrDls;
                return Json(new { Result = "OK", Records = mstrDls }, JsonRequestBehavior.AllowGet);
                //return Json(new { Result = "OK", Records = tstDls }, JsonRequestBehavior.AllowGet);
            }
            else if (Check == 13 && term != "")
            {
                var tdlss = db.Masters.Where(mstr => mstr.Mstr_Type == "Unit" && (mstr.Mstr_Desc.ToString()).Contains(term)).Select(m => new { m.Mstr_Desc, m.Mstr_Key }).OrderBy(t => t.Mstr_Desc).ToList();
                foreach (var itm in tdlss)
                {
                    masterDetails tst = new masterDetails()
                    {
                        Mstr_Desc = itm.Mstr_Desc,
                        Mstr_Key = itm.Mstr_Key
                    };
                    mstrDls.Add(tst);
                }
                ViewBag.MstrDls = mstrDls;
                return Json(new { Result = "OK", Records = mstrDls }, JsonRequestBehavior.AllowGet);
                //return Json(new { Result = "OK", Records = tstDls }, JsonRequestBehavior.AllowGet);
            }
            else if (Check == 14 && term != "")
            {
                var tdlss = db.Masters.Where(mstr => mstr.Mstr_Type == "Unit" && (mstr.Mstr_Key.ToString()).Contains(term)).Select(m => new { m.Mstr_Desc, m.Mstr_Key }).OrderBy(t => t.Mstr_Key).ToList();
                foreach (var itm in tdlss)
                {
                    masterDetails tst = new masterDetails()
                    {
                        Mstr_Desc = itm.Mstr_Desc,
                        Mstr_Key = itm.Mstr_Key
                    };
                    mstrDls.Add(tst);
                }
                ViewBag.MstrDls = mstrDls;
                return Json(new { Result = "OK", Records = mstrDls }, JsonRequestBehavior.AllowGet);
                //return Json(new { Result = "OK", Records = tstDls }, JsonRequestBehavior.AllowGet);
            }
            else if (Check == 15 && term != "")
            {
                var tdlss = db.Masters.Where(mstr => mstr.Mstr_Type == "Tech" && (mstr.Mstr_Desc.ToString()).Contains(term)).Select(m => new { m.Mstr_Desc, m.Mstr_Key }).OrderBy(t => t.Mstr_Desc).ToList();
                foreach (var itm in tdlss)
                {
                    masterDetails tst = new masterDetails()
                    {
                        Mstr_Desc = itm.Mstr_Desc,
                        Mstr_Key = itm.Mstr_Key
                    };
                    mstrDls.Add(tst);
                }
                ViewBag.MstrDls = mstrDls;
                return Json(new { Result = "OK", Records = mstrDls }, JsonRequestBehavior.AllowGet);
                //return Json(new { Result = "OK", Records = tstDls }, JsonRequestBehavior.AllowGet);
            }
            else if (Check == 16 && term != "")
            {
                var tdlss = db.Masters.Where(mstr => mstr.Mstr_Type == "Tech" && (mstr.Mstr_Key.ToString()).Contains(term)).Select(m => new { m.Mstr_Desc, m.Mstr_Key }).OrderBy(t => t.Mstr_Key).ToList();
                foreach (var itm in tdlss)
                {
                    masterDetails tst = new masterDetails()
                    {
                        Mstr_Desc = itm.Mstr_Desc,
                        Mstr_Key = itm.Mstr_Key
                    };
                    mstrDls.Add(tst);
                }
                ViewBag.MstrDls = mstrDls;
                return Json(new { Result = "OK", Records = mstrDls }, JsonRequestBehavior.AllowGet);
                //return Json(new { Result = "OK", Records = tstDls }, JsonRequestBehavior.AllowGet);
            }
            else if (Check == 17 && term != "")
            {
                var tdlss = db.Masters.Where(mstr => mstr.Mstr_Type == "Sample" && (mstr.Mstr_Desc.ToString()).Contains(term)).Select(m => new { m.Mstr_Desc, m.Mstr_Key }).OrderBy(t => t.Mstr_Desc).ToList();
                foreach (var itm in tdlss)
                {
                    masterDetails tst = new masterDetails()
                    {
                        Mstr_Desc = itm.Mstr_Desc,
                        Mstr_Key = itm.Mstr_Key
                    };
                    mstrDls.Add(tst);
                }
                ViewBag.MstrDls = mstrDls;
                return Json(new { Result = "OK", Records = mstrDls }, JsonRequestBehavior.AllowGet);
                //return Json(new { Result = "OK", Records = tstDls }, JsonRequestBehavior.AllowGet);
            }
            else if (Check == 18 && term != "")
            {
                var tdlss = db.Masters.Where(mstr => mstr.Mstr_Type == "Sample" && (mstr.Mstr_Key.ToString()).Contains(term)).Select(m => new { m.Mstr_Desc, m.Mstr_Key }).OrderBy(t => t.Mstr_Key).ToList();
                foreach (var itm in tdlss)
                {
                    masterDetails tst = new masterDetails()
                    {
                        Mstr_Desc = itm.Mstr_Desc,
                        Mstr_Key = itm.Mstr_Key
                    };
                    mstrDls.Add(tst);
                }
                ViewBag.MstrDls = mstrDls;
                return Json(new { Result = "OK", Records = mstrDls }, JsonRequestBehavior.AllowGet);
                //return Json(new { Result = "OK", Records = tstDls }, JsonRequestBehavior.AllowGet);
            }
            else if (Check == 19 && term != "")
            {
                var tdlss = db.Masters.Where(mstr => mstr.Mstr_Type == "CutTime" && (mstr.Mstr_Desc.ToString()).Contains(term)).Select(m => new { m.Mstr_Desc, m.Mstr_Key }).OrderBy(t => t.Mstr_Desc).ToList();
                foreach (var itm in tdlss)
                {
                    masterDetails tst = new masterDetails()
                    {
                        Mstr_Desc = itm.Mstr_Desc,
                        Mstr_Key = itm.Mstr_Key
                    };
                    mstrDls.Add(tst);
                }
                ViewBag.MstrDls = mstrDls;
                return Json(new { Result = "OK", Records = mstrDls }, JsonRequestBehavior.AllowGet);
                //return Json(new { Result = "OK", Records = tstDls }, JsonRequestBehavior.AllowGet);
            }
            else if (Check == 20 && term != "")
            {
                var tdlss = db.Masters.Where(mstr => mstr.Mstr_Type == "CutTime" && (mstr.Mstr_Key.ToString()).Contains(term)).Select(m => new { m.Mstr_Desc, m.Mstr_Key }).OrderBy(t => t.Mstr_Key).ToList();
                foreach (var itm in tdlss)
                {
                    masterDetails tst = new masterDetails()
                    {
                        Mstr_Desc = itm.Mstr_Desc,
                        Mstr_Key = itm.Mstr_Key
                    };
                    mstrDls.Add(tst);
                }
                ViewBag.MstrDls = mstrDls;
                return Json(new { Result = "OK", Records = mstrDls }, JsonRequestBehavior.AllowGet);
                //return Json(new { Result = "OK", Records = tstDls }, JsonRequestBehavior.AllowGet);
            }
            else if (Check == 21 && term != "")
            {
                var tdlss = db.Masters.Where(mstr => mstr.Mstr_Type == "Volume" && (mstr.Mstr_Desc.ToString()).Contains(term)).Select(m => new { m.Mstr_Desc, m.Mstr_Key }).OrderBy(t => t.Mstr_Desc).ToList();
                foreach (var itm in tdlss)
                {
                    masterDetails tst = new masterDetails()
                    {
                        Mstr_Desc = itm.Mstr_Desc,
                        Mstr_Key = itm.Mstr_Key
                    };
                    mstrDls.Add(tst);
                }
                ViewBag.MstrDls = mstrDls;
                return Json(new { Result = "OK", Records = mstrDls }, JsonRequestBehavior.AllowGet);
                //return Json(new { Result = "OK", Records = tstDls }, JsonRequestBehavior.AllowGet);
            }
            else if (Check == 22 && term != "")
            {
                var tdlss = db.Masters.Where(mstr => mstr.Mstr_Type == "Volume" && (mstr.Mstr_Key.ToString()).Contains(term)).Select(m => new { m.Mstr_Desc, m.Mstr_Key }).OrderBy(t => t.Mstr_Key).ToList();
                foreach (var itm in tdlss)
                {
                    masterDetails tst = new masterDetails()
                    {
                        Mstr_Desc = itm.Mstr_Desc,
                        Mstr_Key = itm.Mstr_Key
                    };
                    mstrDls.Add(tst);
                }
                ViewBag.MstrDls = mstrDls;
                return Json(new { Result = "OK", Records = mstrDls }, JsonRequestBehavior.AllowGet);
                //return Json(new { Result = "OK", Records = tstDls }, JsonRequestBehavior.AllowGet);
            }
            else if (Check == 23 && term != "")
            {
                var tdlss = db.Masters.Where(mstr => mstr.Mstr_Type == "TstMode" && (mstr.Mstr_Desc.ToString()).Contains(term)).Select(m => new { m.Mstr_Desc, m.Mstr_Key }).OrderBy(t => t.Mstr_Desc).ToList();
                foreach (var itm in tdlss)
                {
                    masterDetails tst = new masterDetails()
                    {
                        Mstr_Desc = itm.Mstr_Desc,
                        Mstr_Key = itm.Mstr_Key
                    };
                    mstrDls.Add(tst);
                }
                ViewBag.MstrDls = mstrDls;
                return Json(new { Result = "OK", Records = mstrDls }, JsonRequestBehavior.AllowGet);
                //return Json(new { Result = "OK", Records = tstDls }, JsonRequestBehavior.AllowGet);
            }
            else if (Check == 24 && term != "")
            {
                var tdlss = db.Masters.Where(mstr => mstr.Mstr_Type == "TstMode" && (mstr.Mstr_Key.ToString()).Contains(term)).Select(m => new { m.Mstr_Desc, m.Mstr_Key }).OrderBy(t => t.Mstr_Key).ToList();
                foreach (var itm in tdlss)
                {
                    masterDetails tst = new masterDetails()
                    {
                        Mstr_Desc = itm.Mstr_Desc,
                        Mstr_Key = itm.Mstr_Key
                    };
                    mstrDls.Add(tst);
                }
                ViewBag.MstrDls = mstrDls;
                return Json(new { Result = "OK", Records = mstrDls }, JsonRequestBehavior.AllowGet);
                //return Json(new { Result = "OK", Records = tstDls }, JsonRequestBehavior.AllowGet);
            }
            else if (Check == 25 && term != "")
            {
                var tdlss = db.Masters.Where(mstr => mstr.Mstr_Type == "Perform" && (mstr.Mstr_Desc.ToString()).Contains(term)).Select(m => new { m.Mstr_Desc, m.Mstr_Key }).OrderBy(t => t.Mstr_Key).ToList();
                foreach (var itm in tdlss)
                {
                    masterDetails tst = new masterDetails()
                    {
                        Mstr_Desc = itm.Mstr_Desc,
                        Mstr_Key = itm.Mstr_Key
                    };
                    mstrDls.Add(tst);
                }
                ViewBag.MstrDls = mstrDls;
                return Json(new { Result = "OK", Records = mstrDls }, JsonRequestBehavior.AllowGet);
                //return Json(new { Result = "OK", Records = tstDls }, JsonRequestBehavior.AllowGet);
            }
            else if (Check == 26 && term != "")
            {
                var tdlss = db.Masters.Where(mstr => mstr.Mstr_Type == "Perform" && (mstr.Mstr_Key.ToString()).Contains(term)).Select(m => new { m.Mstr_Desc, m.Mstr_Key }).OrderBy(t => t.Mstr_Key).ToList();
                foreach (var itm in tdlss)
                {
                    masterDetails tst = new masterDetails()
                    {
                        Mstr_Desc = itm.Mstr_Desc,
                        Mstr_Key = itm.Mstr_Key
                    };
                    mstrDls.Add(tst);
                }
                ViewBag.MstrDls = mstrDls;
                return Json(new { Result = "OK", Records = mstrDls }, JsonRequestBehavior.AllowGet);
                //return Json(new { Result = "OK", Records = tstDls }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                var tstDls = (from tst in db.Test_Mst
                              join mstr in db.Masters on tst.TstMst_DeptId equals mstr.Mstr_Key
                              join mstr1 in db.Masters on tst.tst_SmplTypeId equals mstr1.Mstr_Key into Masters_1
                              from master1 in Masters_1.DefaultIfEmpty()
                              orderby tst.TstMst_name ascending
                              select new testDetails
                              {
                                  TstMst_name = tst.TstMst_name,
                                  Department = mstr.Mstr_Desc,
                                  TstMst_Key = tst.TstMst_Key,
                                  Sample = master1.Mstr_Desc,
                                  TstMst_Rate = tst.TstMst_Rate
                              }).ToList();
                return Json(new { Result = "OK", Records = tstDls }, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult LookUpEntry(int SrchCode)
        {


            if (SrchCode == 0)
            {
                try
                {
                    tstdls = (from tst in db.Test_Mst
                              join mstr in db.Masters on tst.TstMst_DeptId equals mstr.Mstr_Key into Masters_2
                              join mstr1 in db.Masters on tst.tst_SmplTypeId equals mstr1.Mstr_Key into Masters_1
                              from master1 in Masters_1.DefaultIfEmpty()
                              from master2 in Masters_2.DefaultIfEmpty()
                                  //where tst.TstMst_name.Contains("")
                              orderby tst.TstMst_name ascending
                              select new testDetails
                              {
                                  TstMst_name = tst.TstMst_name,
                                  Department = master2.Mstr_Desc,
                                  TstMst_Key = tst.TstMst_Key,
                                  Sample = master1.Mstr_Desc,
                                  TstMst_Rate = tst.TstMst_Rate
                              }).ToList();
                    var javascriptserializer = new JavaScriptSerializer();
                    javascriptserializer.MaxJsonLength = Int32.MaxValue;
                    return Json(new { Result = "OK", Records = tstdls }, JsonRequestBehavior.AllowGet);
                }
                catch (Exception exe)
                {
                    return Json(new { Result = "ERROR" });
                }
            }
            else if (SrchCode == 1)
            {
                try
                {
                    var tdlss = db.Masters.Where(mstr => mstr.Mstr_Type == "TstType").Select(m => new { m.Mstr_Desc, m.Mstr_Key }).OrderBy(t => t.Mstr_Desc).ToList();
                    foreach (var itm in tdlss)
                    {
                        masterDetails tst = new masterDetails()
                        {
                            Mstr_Desc = itm.Mstr_Desc,
                            Mstr_Key = itm.Mstr_Key
                        };
                        mstrDls.Add(tst);
                    }
                    ViewBag.MstrDls = mstrDls;
                    return Json(new { Result = "OK", Records = mstrDls }, JsonRequestBehavior.AllowGet);
                }
                catch (Exception exe)
                {
                    return Json(new { Result = "ERROR" });
                }
            }
            else if (SrchCode == 2)
            {
                try
                {
                    var tdlss = db.Masters.Where(mstr => mstr.Mstr_Type == "Mthd").Select(m => new { m.Mstr_Desc, m.Mstr_Key }).OrderBy(t => t.Mstr_Desc).ToList();
                    foreach (var itm in tdlss)
                    {
                        masterDetails tst = new masterDetails()
                        {
                            Mstr_Desc = itm.Mstr_Desc,
                            Mstr_Key = itm.Mstr_Key
                        };
                        mstrDls.Add(tst);
                    }
                    ViewBag.MstrDls = mstrDls;
                    return Json(new { Result = "OK", Records = mstrDls }, JsonRequestBehavior.AllowGet);
                }
                catch (Exception exe)
                {
                    return Json(new { Result = "ERROR" });
                }
            }
            else if (SrchCode == 3)
            {
                try
                {
                    var tdlss = db.Masters.Where(mstr => mstr.Mstr_Type == "Dept").Select(m => new { m.Mstr_Desc, m.Mstr_Key }).OrderBy(t => t.Mstr_Desc).ToList();
                    foreach (var itm in tdlss)
                    {
                        masterDetails tst = new masterDetails()
                        {
                            Mstr_Desc = itm.Mstr_Desc,
                            Mstr_Key = itm.Mstr_Key
                        };
                        mstrDls.Add(tst);
                    }
                    ViewBag.MstrDls = mstrDls;
                    return Json(new { Result = "OK", Records = mstrDls }, JsonRequestBehavior.AllowGet);
                }
                catch (Exception exe)
                {
                    return Json(new { Result = "ERROR" });
                }
            }
            else if (SrchCode == 4)
            {
                try
                {
                    var tdlss = db.Masters.Where(mstr => mstr.Mstr_Type == "Div").Select(m => new { m.Mstr_Desc, m.Mstr_Key }).OrderBy(t => t.Mstr_Desc).ToList();
                    foreach (var itm in tdlss)
                    {
                        masterDetails tst = new masterDetails()
                        {
                            Mstr_Desc = itm.Mstr_Desc,
                            Mstr_Key = itm.Mstr_Key
                        };
                        mstrDls.Add(tst);
                    }
                    ViewBag.MstrDls = mstrDls;
                    return Json(new { Result = "OK", Records = mstrDls }, JsonRequestBehavior.AllowGet);
                }
                catch (Exception exe)
                {
                    return Json(new { Result = "ERROR" });
                }
            }
            else if (SrchCode == 5)
            {
                try
                {
                    var tdlss = db.Masters.Where(mstr => mstr.Mstr_Type == "Unit").Select(m => new { m.Mstr_Desc, m.Mstr_Key }).OrderBy(t => t.Mstr_Desc).ToList();
                    foreach (var itm in tdlss)
                    {
                        masterDetails tst = new masterDetails()
                        {
                            Mstr_Desc = itm.Mstr_Desc,
                            Mstr_Key = itm.Mstr_Key
                        };
                        mstrDls.Add(tst);
                    }
                    ViewBag.MstrDls = mstrDls;
                    return Json(new { Result = "OK", Records = mstrDls }, JsonRequestBehavior.AllowGet);
                }
                catch (Exception exe)
                {
                    return Json(new { Result = "ERROR" });
                }
            }
            else if (SrchCode == 6)
            {
                try
                {
                    var tdlss = db.Masters.Where(mstr => mstr.Mstr_Type == "Tech").Select(m => new { m.Mstr_Desc, m.Mstr_Key }).OrderBy(t => t.Mstr_Desc).ToList();
                    foreach (var itm in tdlss)
                    {
                        masterDetails tst = new masterDetails()
                        {
                            Mstr_Desc = itm.Mstr_Desc,
                            Mstr_Key = itm.Mstr_Key
                        };
                        mstrDls.Add(tst);
                    }
                    ViewBag.MstrDls = mstrDls;
                    return Json(new { Result = "OK", Records = mstrDls }, JsonRequestBehavior.AllowGet);
                }
                catch (Exception exe)
                {
                    return Json(new { Result = "ERROR" });
                }
            }
            else if (SrchCode == 7)
            {
                try
                {
                    var tdlss = db.Masters.Where(mstr => mstr.Mstr_Type == "Sample").Select(m => new { m.Mstr_Desc, m.Mstr_Key }).OrderBy(t => t.Mstr_Desc).ToList();
                    foreach (var itm in tdlss)
                    {
                        masterDetails tst = new masterDetails()
                        {
                            Mstr_Desc = itm.Mstr_Desc,
                            Mstr_Key = itm.Mstr_Key
                        };
                        mstrDls.Add(tst);
                    }
                    ViewBag.MstrDls = mstrDls;
                    return Json(new { Result = "OK", Records = mstrDls }, JsonRequestBehavior.AllowGet);
                }
                catch (Exception exe)
                {
                    return Json(new { Result = "ERROR" });
                }
            }
            else if (SrchCode == 8)
            {
                try
                {
                    var tdlss = db.Masters.Where(mstr => mstr.Mstr_Type == "Volume").Select(m => new { m.Mstr_Desc, m.Mstr_Key }).OrderBy(t => t.Mstr_Desc).ToList();
                    foreach (var itm in tdlss)
                    {
                        masterDetails tst = new masterDetails()
                        {
                            Mstr_Desc = itm.Mstr_Desc,
                            Mstr_Key = itm.Mstr_Key
                        };
                        mstrDls.Add(tst);
                    }
                    ViewBag.MstrDls = mstrDls;
                    return Json(new { Result = "OK", Records = mstrDls }, JsonRequestBehavior.AllowGet);
                }
                catch (Exception exe)
                {
                    return Json(new { Result = "ERROR" });
                }
            }
            else if (SrchCode == 9)
            {
                try
                {
                    var tdlss = db.Masters.Where(mstr => mstr.Mstr_Type == "CutTime").Select(m => new { m.Mstr_Desc, m.Mstr_Key }).OrderBy(t => t.Mstr_Desc).ToList();
                    foreach (var itm in tdlss)
                    {
                        masterDetails tst = new masterDetails()
                        {
                            Mstr_Desc = itm.Mstr_Desc,
                            Mstr_Key = itm.Mstr_Key
                        };
                        mstrDls.Add(tst);
                    }
                    ViewBag.MstrDls = mstrDls;
                    return Json(new { Result = "OK", Records = mstrDls }, JsonRequestBehavior.AllowGet);
                }
                catch (Exception exe)
                {
                    return Json(new { Result = "ERROR" });
                }
            }
            else if (SrchCode == 10)
            {
                try
                {
                    var tdlss = db.Masters.Where(mstr => mstr.Mstr_Type == "TstMode").Select(m => new { m.Mstr_Desc, m.Mstr_Key }).OrderBy(t => t.Mstr_Desc).ToList();
                    foreach (var itm in tdlss)
                    {
                        masterDetails tst = new masterDetails()
                        {
                            Mstr_Desc = itm.Mstr_Desc,
                            Mstr_Key = itm.Mstr_Key
                        };
                        mstrDls.Add(tst);
                    }
                    ViewBag.MstrDls = mstrDls;
                    return Json(new { Result = "OK", Records = mstrDls }, JsonRequestBehavior.AllowGet);
                }
                catch (Exception exe)
                {
                    return Json(new { Result = "ERROR" });
                }
            }
            else if (SrchCode == 11)
            {
                try
                {
                    var tdlss = db.Masters.Where(mstr => mstr.Mstr_Type == "Perform").Select(m => new { m.Mstr_Desc, m.Mstr_Key }).OrderBy(t => t.Mstr_Desc).ToList();
                    foreach (var itm in tdlss)
                    {
                        masterDetails tst = new masterDetails()
                        {
                            Mstr_Desc = itm.Mstr_Desc,
                            Mstr_Key = itm.Mstr_Key
                        };
                        mstrDls.Add(tst);
                    }
                    ViewBag.MstrDls = mstrDls;
                    return Json(new { Result = "OK", Records = mstrDls }, JsonRequestBehavior.AllowGet);
                }
                catch (Exception exe)
                {
                    return Json(new { Result = "ERROR" });
                }
            }
            else
            {
                return Json(new { Result = "ERROR" });
            }

        }
        //TestMasterDls
        public JsonResult TestMasterDls(testDetails tstdls)
        {
            try
            {
                string TstMstName = "";
                TstMstName = tstdls.TstMst_name;
                List<ResultTemplate> rsltTemp = new List<ResultTemplate>();
                List<ReferanceRange1> rfrnce1 = new List<ReferanceRange1>();
                List<ReferedLab> Referal = new List<ReferedLab>();
                List<SetSpcRate> SpcRate = new List<SetSpcRate>();
                List<SetGroupTest> gpTst = new List<SetGroupTest>();
                List<TestMasterDetails> tstMstr = new List<TestMasterDetails>();
                SqlConnection sqlcon = new SqlConnection();
                sqlcon = con.dbcon();
                sqlcon.Open();
                string rtbSpecifications = "";
                int nTestId = 0;
                double TotalRate = 0;
                string txtTotal = "";
                string txtGrpAmount = "";
                string tstName = "";
                string txtTestType = "";
                string txtDepartment = "";
                string txtMethod = "";

                string txtDivision = "";
                string txtTestDiscPer = "";
                string txtShortName = "";
                string txtTestAmnt = "";
                string txtRate = "";
                string txtUnit = "";
                string LisCode = "LIS Code :";
                string txtSample = "";
                string txtTechnology = "";
                string txtVolume = "";
                string txtCutOfTime = "";
                string txtTestMode = "";
                string txtRefRange2 = "";
                string txtSpecifications = "";
                string txtPerformedat = "";
                string txtInternalNote = "";
                string lblLISCode = "";
                string cmbRptOn1 = "";
                string cmbRptOn2 = "";
                string cmbSpGender = "";
                bool chkNABL = false, chkSendSMS = false, chkSampleBarcode = false, chkFreeTest = false, optRef1 = false, optRef2 = false, chkStrgCritical = false, chkAvoidRsltEntry = false, chkCommonTech = false;
                bool chkHideHead = false, chkIncen = false, O_chkCommonTech, O_chkAvoidRsltEntry, O_chkHideHead, O_chkNABL, O_chkSendSMS, O_chkSampleBarcode, O_chkFreeTest;
                string SaveFlag = "";

                string lblUser = "";
                double tstKey = 0;
                double volumeID = 0;
                double cutTimeId = 0;
                double tstmodeId = 0;
                double perfomAtId = 0;
                int _reselectFlag = 0;
                double Technology = 0;
                double Performedat = 0;
                double Unit = 0;
                double Sample = 0;
                double TestType = 0;
                double Department = 0;
                double Method = 0;
                double Division = 0;
                double nDiscPer = 0;
                string Sample_Type = "";
                tstKey = tstdls.TstMst_Key;
                tstName = tstdls.TstMst_name;
                Sample_Type = tstdls.Sample_Type;
                //****************************************************************
                var tstDtls = (from tst in db.Test_Mst
                               join mstr in db.Masters on tst.TstMst_DeptId equals mstr.Mstr_Key
                               join mstr1 in db.Masters on tst.tst_SmplTypeId equals mstr1.Mstr_Key into Masters_1
                               from master1 in Masters_1.DefaultIfEmpty()
                               select new testDetails
                               {
                                   TstMst_name = tst.TstMst_name,
                                   Department = mstr.Mstr_Desc,
                                   TstMst_Key = tst.TstMst_Key,
                                   Sample = master1.Mstr_Desc,
                                   TstMst_Rate = tst.TstMst_Rate
                               }).ToList();
                //*****************************************************************
                if (tstDtls.Count > 0)
                {
                    try { nTestId = Convert.ToInt32(tstKey); } catch { }
                    SqlCommand sqlCmd0 = new SqlCommand();
                    sqlCmd0.Connection = sqlcon;
                    sqlCmd0.CommandType = CommandType.Text;

                    sqlCmd0.CommandText = "SELECT     dbo.Test_Mst.TstMst_Key,isnull(dbo.Test_Mst.TstMst_AlphNmCrit,0) as TstMst_AlphNmCrit ,isnull(dbo.Test_Mst.TstMst_AvdIncen,0) as TstMst_AvdIncen ,dbo.Test_Mst.TstMst_RateFree, dbo.Test_Mst.TstMst_TypeId, dbo.Masters.Mstr_Desc AS TestType, dbo.Test_Mst.TstMst_Rate, " + Environment.NewLine
        + "                      dbo.Test_Mst.TstMst_DeptId, Masters_1.Mstr_Desc AS Department, dbo.Test_Mst.TstMst_MthdId, Masters_2.Mstr_Desc AS Method, " + Environment.NewLine
        + "                      dbo.Test_Mst.TstMst_UnitId, Masters_3.Mstr_Desc AS Unit, dbo.Test_Mst.TstMst_RefNo, dbo.Test_Mst.TstMst_Rfrncerng, " + Environment.NewLine
        + "                      dbo.Test_Mst.TstMst_OthComment, dbo.Test_Mst.TstMst_PrntCmnTch, dbo.Test_Mst.TstMst_IsAvoid, " + Environment.NewLine
        + "                      dbo.Test_Mst.TstMst_DispHead, dbo.Test_Mst.TstMst_DivsnId, Masters_4.Mstr_Desc AS Division, " + Environment.NewLine
        + "                      dbo.Test_Mst.TstMst_TechId, Masters_5.Mstr_Desc AS Technology,TstMst_PerformId, Masters_7.Mstr_Desc AS Performat, dbo.Test_Mst.tst_RptDay, dbo.Test_Mst.tst_RptTmeDays, dbo.Test_Mst.TstMst_SpeciGender, dbo.Test_Mst.TstMst_SpeciTwo, " + Environment.NewLine
        + "                      dbo.Test_Mst.tst_SmplType, dbo.Test_Mst.TstMst_Sample, dbo.Test_Mst.TstMst_Volume, dbo.Test_Mst.TstMst_CutOftime, " + Environment.NewLine
        + "                      dbo.Test_Mst.TstMst_TstMode, dbo.Test_Mst.TstMst_ShortName, dbo.Test_Mst.TstMst_DiscPer, dbo.Test_Mst.tst_SmplTypeId,dbo.Test_Mst.TstMst_EditedUsr,dbo.Test_Mst.TstMst_IntrNote,dbo.Test_Mst.TstMst_IsNABL,dbo.Test_Mst.TstMst_IsSendSms,dbo.Test_Mst.TstMst_SmplBrCode,Masters_6.Mstr_Desc AS Sample" + Environment.NewLine
        + "                      FROM dbo.Test_Mst WITH (NOLOCK) LEFT OUTER JOIN" + Environment.NewLine
        + "                      dbo.Masters AS Masters_7 WITH (NOLOCK) ON dbo.Test_Mst.TstMst_PerformId = Masters_7.Mstr_Key LEFT OUTER JOIN" + Environment.NewLine
        + "                      dbo.Masters AS Masters_6 WITH (NOLOCK) ON dbo.Test_Mst.tst_SmplTypeId = Masters_6.Mstr_Key LEFT OUTER JOIN" + Environment.NewLine
        + "                      dbo.Masters AS Masters_5 WITH (NOLOCK) ON dbo.Test_Mst.TstMst_TechId = Masters_5.Mstr_Key LEFT OUTER JOIN" + Environment.NewLine
        + "                      dbo.Masters AS Masters_4 WITH (NOLOCK) ON dbo.Test_Mst.TstMst_DivsnId = Masters_4.Mstr_Key LEFT OUTER JOIN" + Environment.NewLine
        + "                      dbo.Masters AS Masters_3 WITH (NOLOCK) ON dbo.Test_Mst.TstMst_UnitId = Masters_3.Mstr_Key LEFT OUTER JOIN" + Environment.NewLine
        + "                      dbo.Masters AS Masters_2 WITH (NOLOCK) ON dbo.Test_Mst.TstMst_MthdId = Masters_2.Mstr_Key LEFT OUTER JOIN" + Environment.NewLine
        + "                      dbo.Masters AS Masters_1 WITH (NOLOCK) ON dbo.Test_Mst.TstMst_DeptId = Masters_1.Mstr_Key LEFT OUTER JOIN" + Environment.NewLine
        + "                      dbo.Masters WITH (NOLOCK) ON dbo.Test_Mst.TstMst_TypeId = dbo.Masters.Mstr_Key WHERE dbo.Test_Mst.TstMst_Key= " + tstKey;

                    SqlDataAdapter sda0 = new SqlDataAdapter(sqlCmd0);
                    DataTable Dt0 = new DataTable();
                    sda0.Fill(Dt0);
                    txtTestType = Convert.ToString(Dt0.Rows[0]["TestType"].ToString());
                    TestType = Convert.ToDouble(Dt0.Rows[0]["TstMst_TypeId"].ToString());

                    txtDepartment = Convert.ToString(Dt0.Rows[0]["Department"].ToString());
                    Department = Convert.ToDouble(Dt0.Rows[0]["TstMst_DeptId"].ToString());

                    txtMethod = Convert.ToString(Dt0.Rows[0]["Method"].ToString());
                    Method = Convert.ToDouble(Dt0.Rows[0]["TstMst_MthdId"].ToString());

                    txtDivision = Convert.ToString(Dt0.Rows[0]["Division"].ToString());
                    Division = Convert.ToDouble(Dt0.Rows[0]["TstMst_DivsnId"].ToString());

                    txtRate = Convert.ToString(Dt0.Rows[0]["TstMst_Rate"].ToString());

                    try
                    {
                        if (Convert.ToInt32(Dt0.Rows[0]["TstMst_DiscPer"]) != 0)
                        {

                            try
                            {
                                nDiscPer = Convert.ToDouble(Dt0.Rows[0]["TstMst_DiscPer"]);
                                nDiscPer = Math.Round(nDiscPer, 2);
                            }
                            catch { }
                            txtTestDiscPer = nDiscPer.ToString();

                            //txtTestDiscPer.Focus();
                            //txtShortName.Focus();
                        }
                        else
                        {
                            txtTestDiscPer = "";
                            txtTestAmnt = "";
                        }
                    }
                    catch (Exception ex) { }

                    txtUnit = Convert.ToString(Dt0.Rows[0]["Unit"].ToString());
                    Unit = Convert.ToDouble(Dt0.Rows[0]["TstMst_UnitId"].ToString());

                    txtTechnology = Convert.ToString(Dt0.Rows[0]["Technology"].ToString());
                    Technology = Convert.ToDouble(Dt0.Rows[0]["TstMst_TechId"].ToString());

                    txtSample = Convert.ToString(Dt0.Rows[0]["Sample"].ToString());
                    Sample = Convert.ToDouble(Dt0.Rows[0]["tst_SmplTypeId"].ToString());

                    txtVolume = Convert.ToString(Dt0.Rows[0]["TstMst_Volume"].ToString());
                    if (txtVolume != "")
                    {
                        var TestVolumeID = db.Masters.Where(mstr => mstr.Mstr_Type == "Volume" && mstr.Mstr_Desc == txtVolume).Select(m => m.Mstr_Key).FirstOrDefault();
                        volumeID = TestVolumeID;
                    }
                    txtCutOfTime = Convert.ToString(Dt0.Rows[0]["TstMst_CutOftime"].ToString());
                    if (txtCutOfTime != "")
                    {
                        var TestCtTimeID = db.Masters.Where(mstr => mstr.Mstr_Type == "CutTime" && mstr.Mstr_Desc == txtVolume).Select(m => m.Mstr_Key).FirstOrDefault();
                        cutTimeId = TestCtTimeID;
                    }
                    txtTestMode = Convert.ToString(Dt0.Rows[0]["TstMst_TstMode"].ToString());
                    if (txtTestMode != "")
                    {
                        var TTestModeID = db.Masters.Where(mstr => mstr.Mstr_Type == "TstMode" && mstr.Mstr_Desc == txtVolume).Select(m => m.Mstr_Key).FirstOrDefault();
                        tstmodeId = TTestModeID;
                    }
                    txtShortName = Convert.ToString(Dt0.Rows[0]["TstMst_ShortName"].ToString());
                    cmbRptOn1 = Convert.ToString(Dt0.Rows[0]["tst_RptDay"].ToString());
                    cmbRptOn2 = Convert.ToString(Dt0.Rows[0]["tst_RptTmeDays"].ToString());
                    chkNABL = false;
                    chkSendSMS = false;
                    chkSampleBarcode = false;
                    chkFreeTest = false;
                    //******************
                    cmbSpGender = Convert.ToString(Dt0.Rows[0]["TstMst_SpeciGender"].ToString());
                    rtbSpecifications = Convert.ToString(Dt0.Rows[0]["TstMst_SpeciTwo"].ToString());
                    //*******************************************************
                    if (Convert.ToInt32(Dt0.Rows[0]["TstMst_RefNo"]) == 1)
                    {
                        optRef1 = true;
                    }
                    else
                    {
                        optRef2 = true;

                    }
                    try
                    {
                        chkNABL = Convert.ToBoolean(Dt0.Rows[0]["TstMst_IsNABL"]);
                    }

                    catch { }
                    try
                    {
                        chkStrgCritical = Convert.ToBoolean(Dt0.Rows[0]["TstMst_AlphNmCrit"]);
                    }

                    catch { }
                    try
                    {
                        chkSampleBarcode = Convert.ToBoolean(Dt0.Rows[0]["TstMst_SmplBrCode"]);
                    }

                    catch { }
                    try
                    {
                        chkFreeTest = Convert.ToBoolean(Dt0.Rows[0]["TstMst_RateFree"]);
                    }

                    catch { }
                    try
                    {
                        chkSendSMS = Convert.ToBoolean(Dt0.Rows[0]["TstMst_IsSendSms"]);
                    }

                    catch { }
                    txtRefRange2 = Convert.ToString(Dt0.Rows[0]["TstMst_Rfrncerng"].ToString());
                    txtSpecifications = Convert.ToString(Dt0.Rows[0]["TstMst_OthComment"].ToString());
                    Performedat = Convert.ToDouble(Dt0.Rows[0]["TstMst_PerformId"].ToString());
                    txtPerformedat = (Dt0.Rows[0]["Performat"].ToString());
                    txtInternalNote = Convert.ToString(Dt0.Rows[0]["TstMst_IntrNote"].ToString());

                    if (Convert.ToInt32(Dt0.Rows[0]["TstMst_IsAvoid"]) == 1)
                        chkAvoidRsltEntry = true;
                    else
                        chkAvoidRsltEntry = false;

                    if (Convert.ToInt32(Dt0.Rows[0]["TstMst_PrntCmnTch"]) == 1)
                        chkCommonTech = true;
                    else
                        chkCommonTech = false;

                    if (Convert.ToInt32(Dt0.Rows[0]["TstMst_DispHead"]) == 1)
                        chkHideHead = true;
                    else
                        chkHideHead = false;
                    SaveFlag = "Edit";

                    if (Convert.ToInt32(Dt0.Rows[0]["TstMst_AvdIncen"]) == 1)
                    {
                        chkIncen = true;
                    }
                    else
                    {
                        chkIncen = false;
                    }
                    O_txtTestType = txtTestType;
                    O_txtTestName = tstName;
                    O_txtDepartment = txtDepartment;
                    O_txtMethod = txtMethod;
                    O_txtDivision = txtDivision;
                    O_txtRate = txtRate;
                    O_txtUnit = txtUnit;
                    O_txtTechnology = txtTechnology;
                    O_txtSample = txtSample;
                    O_txtVolume = txtVolume;
                    O_txtCutOfTime = txtCutOfTime;
                    O_txtTestMode = txtTestMode;
                    O_txtShortName = txtShortName;
                    O_cmbRptOn1 = cmbRptOn1;
                    O_cmbRptOn2 = cmbRptOn2;
                    O_txtPerformedat = txtPerformedat;
                    O_txtInternalNote = txtInternalNote;

                    //************************************************************************************************************************
                    int TempTstRow = 0;
                    //grdNewRefRange1.Rows.Clear();
                    OldRefrence1 = "";
                    //*********************************
                    lblUser = Convert.ToString(Dt0.Rows[0]["TstMst_EditedUsr"].ToString());
                    if (chkCommonTech == true)
                    {
                        O_chkCommonTech = true;
                    }
                    if (chkAvoidRsltEntry == true)
                    {
                        O_chkAvoidRsltEntry = true;
                    }
                    if (chkHideHead == true)
                    {
                        O_chkHideHead = true;
                    }

                    if (chkNABL == true)
                    {
                        O_chkNABL = true;
                    }
                    if (chkSendSMS == true)
                    {
                        O_chkSendSMS = true;
                    }
                    if (chkSampleBarcode == true)
                    {
                        O_chkSampleBarcode = true;
                    }
                    if (chkFreeTest == true)
                    {
                        O_chkFreeTest = true;
                    }

                    //**************************************************Load Refernce Range***********************************************
                    SqlCommand sqlCmd = new SqlCommand();
                    sqlCmd.Connection = sqlcon;
                    sqlCmd.CommandType = CommandType.Text;

                    sqlCmd.CommandText = ("SELECT dbo.NormalRanges.Nrml_Key,dbo.NormalRanges.Nrml_Sex, dbo.NormalRanges.Nrml_Agefr," + Environment.NewLine
                                                   + "dbo.NormalRanges.Nrml_Agetype, dbo.NormalRanges.Nrml_Ageto, dbo.NormalRanges.Nrml_Agetypeto," + Environment.NewLine
                                                   + "dbo.NormalRanges.Nrml_Low,dbo.NormalRanges.Nrml_High,dbo.NormalRanges.Nrml_Crtlow,dbo.NormalRanges.Nrml_Crthigh,dbo.NormalRanges.Nrml_Norage,'' as [NKey]" + Environment.NewLine
                                                   + "FROM dbo.NormalRanges WITH (NOLOCK) LEFT OUTER JOIN" + Environment.NewLine
                                                   + "dbo.Test_Mst WITH (NOLOCK) ON dbo.NormalRanges.Nrml_TstID = dbo.Test_Mst.TstMst_Key WHERE dbo.NormalRanges.Nrml_TstID= " + tstKey + " ORDER BY dbo.NormalRanges.Nrml_Sex");
                    // grdRefRange1.DataSource = dt3;
                    SqlDataAdapter sda = new SqlDataAdapter(sqlCmd);
                    DataTable dt3 = new DataTable();
                    sda.Fill(dt3);
                    int i = 0;
                    //************************************************************************************************************
                    foreach (DataRow dr in dt3.Rows)
                    {
                        //rfrnce1

                        ReferanceRange1 rfrnc = new ReferanceRange1()
                        {
                            Nrml_Key = Convert.ToDouble(dt3.Rows[i]["Nrml_Key"].ToString()),
                            Nrml_Sex = dt3.Rows[i]["Nrml_Sex"].ToString(),
                            Nrml_Agefr = Convert.ToDouble(dt3.Rows[i]["Nrml_Agefr"].ToString()),
                            Nrml_Agetype = dt3.Rows[i]["Nrml_Agetype"].ToString(),
                            Nrml_Ageto = Convert.ToDouble(dt3.Rows[i]["Nrml_Ageto"].ToString()),
                            Nrml_Agetypeto = dt3.Rows[i]["Nrml_Agetypeto"].ToString(),
                            Nrml_Low = dt3.Rows[i]["Nrml_Low"].ToString(),
                            Nrml_Crtlow = dt3.Rows[i]["Nrml_Crtlow"].ToString(),
                            Nrml_High = dt3.Rows[i]["Nrml_High"].ToString(),
                            Nrml_Crthigh = dt3.Rows[i]["Nrml_Crthigh"].ToString(),
                            Nrml_Norage = dt3.Rows[i]["Nrml_Norage"].ToString()
                        };
                        rfrnce1.Add(rfrnc);
                        i++;
                        if (OldRefrence1 == "")
                        {
                            OldRefrence1 = "\t" + dt3.Rows[0]["Nrml_Sex"].ToString() + Convert.ToDouble(dt3.Rows[0]["Nrml_Agefr"].ToString()) + dt3.Rows[0]["Nrml_Agetype"].ToString() + Convert.ToDouble(dt3.Rows[0]["Nrml_Ageto"].ToString()) + dt3.Rows[0]["Nrml_Agetypeto"].ToString() + dt3.Rows[0]["Nrml_Low"].ToString() + dt3.Rows[0]["Nrml_High"].ToString() + dt3.Rows[0]["Nrml_Crtlow"].ToString() + dt3.Rows[0]["Nrml_Crthigh"].ToString() + dt3.Rows[0]["Nrml_Norage"].ToString() + "";
                            //OldGroupTest = "\t" + grdSetGroupTest["TstMst_name", i].Value.ToString() + grdSetGroupTest[" TstMst_Rate", i].Value.ToString() + grdSetGroupTest["StGrpTst_OrderBy", i].Value.ToString() + grdSetGroupTest[" StGrpTst_Sh", i].Value.ToString() + grdSetGroupTest["Department", i].Value.ToString() + grdSetGroupTest["Sample", i].Value.ToString() + "";
                        }
                        else
                        {
                            try
                            {
                                OldRefrence1 = OldRefrence1 + "\r\n\t" + dt3.Rows[0]["Nrml_Sex"].ToString() + Convert.ToDouble(dt3.Rows[0]["Nrml_Agefr"].ToString()) + dt3.Rows[0]["Nrml_Agetype"].ToString() + Convert.ToDouble(dt3.Rows[0]["Nrml_Ageto"].ToString()) + dt3.Rows[0]["Nrml_Agetypeto"].ToString() + dt3.Rows[0]["Nrml_Low"].ToString() + dt3.Rows[0]["Nrml_High"].ToString() + dt3.Rows[0]["Nrml_Crtlow"].ToString() + dt3.Rows[0]["Nrml_Crthigh"].ToString() + dt3.Rows[0]["Nrml_Norage"].ToString() + "";
                                //  OldGroupTest = "\t" + grdSetGroupTest["TstMst_name", i].Value.ToString() + grdSetGroupTest[" TstMst_Rate", i].Value.ToString() + grdSetGroupTest["StGrpTst_OrderBy", i].Value.ToString() + grdSetGroupTest[" StGrpTst_Sh", i].Value.ToString() + grdSetGroupTest["Department", i].Value.ToString() + grdSetGroupTest["Sample", i].Value.ToString() + "";
                            }
                            catch { }


                        }
                    }
                    _reselectFlag = 1;
                    int _TestTypeId = 0;
                    try
                    {
                        _TestTypeId = Convert.ToInt32(TestType);
                    }
                    catch { }

                    if (_TestTypeId == -2 || _TestTypeId == -12 || _TestTypeId == -15 || _TestTypeId == -24)
                    {
                        //pnlSetGroupTest.Visible = true;
                        //grdSetGroupTest.Rows.Clear();
                        SqlCommand sqlCmd1 = new SqlCommand();
                        sqlCmd1.Connection = sqlcon;
                        sqlCmd1.CommandType = CommandType.Text;
                        sqlCmd1.CommandText = "SELECT '' as SlNo,dbo.Set_GroupTest.StGrpTst_TstCode, dbo.Test_Mst.TstMst_name,dbo.Test_Mst.TstMst_Rate, dbo.Set_GroupTest.StGrpTst_OrderBy," + Environment.NewLine
                                            + "dbo.Set_GroupTest.StGrpTst_Sh, dbo.Masters.Mstr_Desc AS Department, Masters_1.Mstr_Desc AS Sample" + Environment.NewLine
                                            + "FROM dbo.Set_GroupTest WITH (NOLOCK) LEFT OUTER JOIN" + Environment.NewLine
                                            + "dbo.Test_Mst WITH (NOLOCK) ON dbo.Set_GroupTest.StGrpTst_TstCode = dbo.Test_Mst.TstMst_Key LEFT OUTER JOIN" + Environment.NewLine
                                            + "dbo.Masters WITH (NOLOCK) ON dbo.Test_Mst.TstMst_DeptId = dbo.Masters.Mstr_Key LEFT OUTER JOIN dbo.Masters AS Masters_1 WITH (NOLOCK) ON dbo.Test_Mst.tst_SmplTypeId = Masters_1.Mstr_Key" + Environment.NewLine
                                            + "WHERE (dbo.Set_GroupTest.StGrpTst_GrpId =" + Convert.ToInt32(tstKey) + ") ORDER BY StGrpTst_OrderBy,StGrpTst_Key";

                        SqlDataAdapter sda1 = new SqlDataAdapter(sqlCmd1);
                        DataTable Dt1 = new DataTable();
                        sda1.Fill(Dt1);
                        //grdSetGroupTest.Rows.Clear();
                        if (Dt1.Rows.Count > 0)
                        {
                            //grdSetGroupTest.RowCount = Dt1.Rows.Count;
                        }
                        else
                        {
                            //grdSetGroupTest.RowCount = 1;
                        }
                        int Row = 0;


                        foreach (DataRow dr in Dt1.Rows)
                        {
                            double Rate = 0;
                            //************

                            //************

                            try
                            {
                                Rate = Convert.ToDouble(Dt1.Rows[Row]["TstMst_Rate"].ToString());
                            }
                            catch { }
                            TotalRate += Rate;
                            SetGroupTest stGPtst = new SetGroupTest()
                            {
                                StGrpTst_TstCode = Convert.ToDouble(Dt1.Rows[Row]["StGrpTst_TstCode"].ToString()),
                                TstMst_name = Dt1.Rows[Row]["TstMst_name"].ToString(),
                                TstMst_Rate = Convert.ToDouble(Dt1.Rows[Row]["TstMst_Rate"].ToString()),
                                TotalRate = TotalRate,
                                StGrpTst_OrderBy = Convert.ToDouble(Dt1.Rows[Row]["StGrpTst_OrderBy"].ToString()),
                                StGrpTst_Sh = Convert.ToInt32(Dt1.Rows[Row]["StGrpTst_Sh"].ToString()),
                                Department = Dt1.Rows[Row]["Department"].ToString(),
                                Sample = Dt1.Rows[Row]["Sample"].ToString()

                            };
                            gpTst.Add(stGPtst);

                            if (OldGroupTest == "")
                            {
                                //OldRefrence1 = "\t" + grdNewRefRange1["Nrml_Sex", i].Value.ToString() + grdNewRefRange1["Nrml_Agefr", i].Value.ToString() + grdNewRefRange1["Nrml_Agetype", i].Value.ToString() + grdNewRefRange1["Nrml_Ageto", i].Value.ToString() + grdNewRefRange1["Nrml_Agetypeto", i].Value.ToString() + grdNewRefRange1["Nrml_Low", i].Value.ToString() + grdNewRefRange1["Nrml_High", i].Value.ToString() + grdNewRefRange1["Nrml_Crtlow", i].Value.ToString() + grdNewRefRange1["Nrml_Crthigh", i].Value.ToString() + grdNewRefRange1["Nrml_Norage", i].Value.ToString() + "";
                                OldGroupTest = "\t" + Dt1.Rows[0]["TstMst_name"].ToString() + Convert.ToDouble(Dt1.Rows[0]["TstMst_Rate"].ToString()) + Convert.ToDouble(Dt1.Rows[0]["StGrpTst_OrderBy"].ToString()) + Convert.ToInt32(Dt1.Rows[0]["StGrpTst_Sh"].ToString()) + Dt1.Rows[0]["Department"].ToString() + Dt1.Rows[0]["Sample"].ToString() + "";
                            }
                            else
                            {
                                try
                                {
                                    //OldRefrence1 = OldRefrence1 + "\r\n\t" + grdNewRefRange1["Nrml_Sex", i].Value.ToString() + grdNewRefRange1["Nrml_Agefr", i].Value.ToString() + grdNewRefRange1["Nrml_Agetype", i].Value.ToString() + grdNewRefRange1["Nrml_Ageto", i].Value.ToString() + grdNewRefRange1["Nrml_Agetypeto", i].Value.ToString() + grdNewRefRange1["Nrml_Low", i].Value.ToString() + grdNewRefRange1["Nrml_High", i].Value.ToString() + grdNewRefRange1["Nrml_Crtlow", i].Value.ToString() + grdNewRefRange1["Nrml_Crthigh", i].Value.ToString() + grdNewRefRange1["Nrml_Norage", i].Value.ToString() + "";
                                    OldGroupTest = OldGroupTest + "\r\n\t" + Dt1.Rows[0]["TstMst_name"].ToString() + Convert.ToDouble(Dt1.Rows[0]["TstMst_Rate"].ToString()) + Convert.ToDouble(Dt1.Rows[0]["StGrpTst_OrderBy"].ToString()) + Convert.ToInt32(Dt1.Rows[0]["StGrpTst_Sh"].ToString()) + Dt1.Rows[0]["Department"].ToString() + Dt1.Rows[0]["Sample"].ToString() + "";
                                }
                                catch { }


                            }
                            Row += 1;
                        }
                        txtTotal = TotalRate.ToString();
                        sqlCmd1.CommandText = " SELECT TstMst_Rate FROM dbo.Test_Mst WITH (NOLOCK) WHERE dbo.Test_Mst.TstMst_Key= " + Convert.ToInt32(tstKey) + " ";
                        SqlDataAdapter sda2 = new SqlDataAdapter(sqlCmd1);
                        DataTable Dt2 = new DataTable();
                        sda2.Fill(Dt2);
                        txtGrpAmount = Convert.ToString(Dt2.Rows[0]["TstMst_Rate"]);
                    }


                    else
                    {
                        //pnlSetGroupTest.Visible = false;
                        txtTotal = "";
                        //txtGrpAmount.Text = "";
                        //grdSetGroupTest.Rows.Clear();
                    }

                }
                else
                {
                    if (_reselectFlag == 0)
                    {
                        //txtTestName = "";
                        //txtTestName = 0;
                        //btn_New_Click(null, null);
                    }
                }
                int Testid = 0;
                try
                {
                    Testid = Convert.ToInt32(tstKey);
                }
                catch { }
                if (Testid > 0)
                {
                    //lblLISCode.Visible = true;
                    lblLISCode = LisCode + Testid;

                    //************************Specail Rate show***********************
                    //grdSetSpcRate.Rows.Clear();
                    SqlCommand cmdspec = new SqlCommand("select SplR_NRate,Ahmst.Ahmst_Pname As Corporate FROM  Special_Rates LEFT JOIN AccountHeads_Mst Ahmst ON SplR_ID=Ahmst_Key  where SplR_TstID=" + Testid + " AND Ahmst.Ahmst_Pname!=''", sqlcon);
                    DataTable dtspc = new DataTable();
                    SqlDataAdapter sda = new SqlDataAdapter(cmdspec);
                    sda.Fill(dtspc);

                    if (dtspc.Rows.Count > 0)
                    {
                        //grdSetSpcRate.RowCount = dtspc.Rows.Count;
                    }
                    int nTRow = 0;
                    foreach (DataRow dr in dtspc.Rows)
                    {
                        //SpcRate
                        SetSpcRate spcrt = new SetSpcRate()
                        {
                            Corporate = (dtspc.Rows[nTRow]["Corporate"].ToString()),
                            Rate = txtRate,
                            SplR_NRate = Convert.ToDouble(dtspc.Rows[nTRow]["SplR_NRate"].ToString())
                        };
                        SpcRate.Add(spcrt);
                        nTRow += 1;

                    }

                    //**********************END Specail Rate ******************************************
                    //*************************SHOWS IN REFERED LAB************************************
                    try
                    {
                        SqlCommand cmdRef = new SqlCommand("SELECT TestRef_Id,TestRef_RefName,TestRef_SpRate,TestRef_ReportedOn,TestRef_TestId FROM TestRef_Mst WHERE TestRef_TestId=" + Testid + "", sqlcon);
                        DataTable dtref = new DataTable();
                        SqlDataAdapter sdaref = new SqlDataAdapter(cmdRef);
                        sdaref.Fill(dtref);
                        nTRow = 0;
                        //grdRef.Rows.Clear();
                        //grdRef.Rows.Add();
                        if (dtref.Rows.Count > 0)
                        {

                            //grdRef.RowCount = dtref.Rows.Count;
                        }
                        foreach (DataRow dr1 in dtref.Rows)
                        {
                            //Referal
                            ReferedLab rfrl = new ReferedLab()
                            {
                                TestRef_RefName = (dtref.Rows[nTRow]["TestRef_RefName"].ToString()),
                                TestRef_Id = Convert.ToDouble(dtref.Rows[nTRow]["TestRef_Id"].ToString()),
                                TestRef_SpRate = Convert.ToDouble(dtref.Rows[nTRow]["TestRef_SpRate"].ToString()),
                                TestRef_ReportedOn = dtref.Rows[nTRow]["TestRef_ReportedOn"].ToString(),
                                TestRef_TestID = tstKey.ToString()
                            };
                            Referal.Add(rfrl);
                            nTRow += 1;
                        }
                    }
                    catch { }
                    //***************************END SHOWS IN REFERED LAB****************************
                }
                else
                {
                    //lblLISCode.Visible = false;tstMstr
                }
                //ResultTempl(tstKey);
                //***************************ResultTempl****************************
                //int nTestId = 0;
                //bool TempDefult = false;
                try { nTestId = Convert.ToInt32(tstKey); } catch { }
                if (nTestId > 0)
                {
                    SqlCommand cmd = new SqlCommand("Select RsltTmpt_Template,ISNULL(RsltTmpt_default,0) as RsltTmpt_default,RsltTmpt_IsCritical  from Result_Template WITH (NOLOCK) where RsltTmpt_TestId=" + nTestId + "  Order By RsltTmpt_Key", sqlcon);
                    SqlDataAdapter sda = new SqlDataAdapter(cmd);
                    DataTable dt = new DataTable();
                    sda.Fill(dt);
                    if (dt.Rows.Count > 0)
                    {
                    }
                    else
                    {
                    }
                    int slno = 0;
                    foreach (DataRow dr in dt.Rows)
                    {
                        bool TempDefult = false;
                        int defult = 0;
                        try
                        {
                            defult = Convert.ToInt32(dr["RsltTmpt_default"]);
                        }
                        catch { }
                        if (defult == 1)
                        {
                            TempDefult = true;
                        }
                        ResultTemplate rfrl = new ResultTemplate()
                        {
                            Template = dt.Rows[slno]["RsltTmpt_Template"].ToString(),
                            Default = TempDefult,
                            CriticalSel = dt.Rows[slno]["RsltTmpt_IsCritical"].ToString()
                        };
                        rsltTemp.Add(rfrl);
                        slno++;
                    }
                }

                //***************************ResultTempl****************************
                TestMasterDetails tsts = new TestMasterDetails();
                //***************************************************************************************
                tsts = new TestMasterDetails()
                {
                    TestName = TstMstName,
                    TestKey = tstKey.ToString(),
                    TestType = txtTestType,
                    TestMethod = txtMethod,
                    TestRate = txtRate,
                    TestDiscPer = nDiscPer.ToString(),
                    TestDpmnt = txtDepartment,
                    TestDivision = txtDivision,
                    TestAmount = txtRate,
                    TestUnit = txtUnit,
                    TestTech = txtTechnology,
                    TestSample = txtSample,
                    TestVolume = txtVolume,
                    TestCtTime = txtCutOfTime,
                    TestMode = txtTestMode,
                    TestShortName = txtShortName,
                    TestRptON = cmbRptOn1,
                    TestRptonMHD = cmbRptOn2,
                    TestPerfmAT = txtPerformedat,
                    TstInternalNote = txtInternalNote,
                    //TestKey= tstKey.ToString(),
                    TestTypeID = TestType.ToString(),
                    TestMethodID = Method.ToString(),
                    TestDpmntID = Department.ToString(),
                    TestDivisionID = Division.ToString(),
                    TestUnitID = Unit.ToString(),
                    TestTechID = Technology.ToString(),
                    TestSampleID = Sample.ToString(),
                    TestVolumeID = volumeID.ToString(),
                    TestCtTimeID = cutTimeId.ToString(),
                    TestModeID = tstmodeId.ToString(),
                    TestPerfmATID = Performedat.ToString(),
                    RfrnceSpec = txtRefRange2,
                    optRef2Chk = optRef2,
                    cmbSpGender = cmbSpGender,
                    rtbSpecifications = rtbSpecifications,
                    NABL = chkNABL,
                    SndSMS = chkSendSMS,
                    SmplType = chkSampleBarcode,
                    FreeTst = chkFreeTest,
                    AvoidInc = chkIncen,
                    AlphaCritical = chkStrgCritical,
                    chkCommonTech = chkCommonTech,
                    chkAvoidRsltEntry = chkAvoidRsltEntry,
                    chkHideHead = chkHideHead,
                    lblUser = lblUser,
                    txtSpecifications = txtSpecifications,
                    TotalRate = TotalRate.ToString(),
                    txtGrpAmount = txtGrpAmount,
                    lblLISCode = lblLISCode
                };
                tstMstr.Add(tsts);
                tsts.rfrnceRangelist = rfrnce1;
                tsts.spcRatelist = SpcRate;
                tsts.referalList = Referal;
                tsts.gptstList = gpTst;
                tsts.rsltTemplList = rsltTemp;
                //  rsltTemp
                //**************************************************************************************************************************************
                //return Json(true);rsltTemplList
                return Json(new { Result = "OK", Record = tsts }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception exe)
            {
                return Json(new { Result = "ERROR" });
            }
        }
        public JsonResult SrchTestName(string term, int Check)
        {
            List<testDetails> tls = new List<testDetails>();
            tls = (from tst in db.Test_Mst
                   join mstr in db.Masters on tst.TstMst_DeptId equals mstr.Mstr_Key
                   join mstr1 in db.Masters on tst.tst_SmplTypeId equals mstr1.Mstr_Key into Masters_1
                   from master1 in Masters_1.DefaultIfEmpty()
                   orderby tst.TstMst_name ascending
                   where tst.TstMst_name.Contains(term)
                   select new testDetails
                   {
                       TstMst_name = tst.TstMst_name,
                       Department = mstr.Mstr_Desc,
                       TstMst_Key = tst.TstMst_Key,
                       Sample = master1.Mstr_Desc,
                       TstMst_Rate = tst.TstMst_Rate
                   }).ToList();
            return Json(new { Result = "OK", Records = tls }, JsonRequestBehavior.AllowGet);
        }
        //public JsonResult TestSave(double testID)
        //{
        //    return Json(true);
        //}
        public JsonResult DeleteTest(double testID, string tstName)
        {
            logindetails l = Session["logindls"] as logindetails;
            SqlConnection sqlCon = new SqlConnection();
            sqlCon = con.dbcon();
            int genaralrstid = 0;
            int ExsistTestId = 0;
            //int testID=tsts.
            sqlCon.Open();
            try
            {
                SqlCommand sqlCmd = new SqlCommand("Select isnull(count(InvItm_TstId),0) from Invoice_Det WITH (NOLOCK) Where InvItm_TstId=" + testID + "", sqlCon);
                ExsistTestId = Convert.ToInt32(sqlCmd.ExecuteScalar());

            }
            catch { }
            if (ExsistTestId > 0)
            {
                //MessageBox.Show("Cann't Delete..Transaction Found", cPublic.ProjectName);
                //return;
                return Json(new { Result = "TrnsctnFound" });
            }


            else
            {
                try
                {
                    SqlCommand sqlCmd = new SqlCommand("Select isnull(count(GenRsltDet_TstID),0) from GenaralRslt_Det WITH (NOLOCK) Where GenRsltDet_TstID=" + testID + "", sqlCon);
                    genaralrstid = Convert.ToInt32(sqlCmd.ExecuteScalar());

                }
                catch { }
                if (genaralrstid > 0)
                {
                    //MessageBox.Show("Cann't Delete..Transaction Found", cPublic.ProjectName);
                    //return;
                    return Json(new { Result = "TrnsctnFound" });
                }
            }




            try
            {
                if (Convert.ToInt32(testID) != 0)
                {



                    SqlCommand cmd2 = new SqlCommand();
                    cmd2.Connection = sqlCon;
                    cmd2.CommandType = CommandType.Text;
                    cmd2.CommandText = "DELETE FROM [dbo].[Test_Mst] WHERE TstMst_Key=" + testID + "";
                    cmd2.Parameters.Clear();
                    cmd2.ExecuteNonQuery();

                    try
                    {
                        DateTime date = DateTime.Now;
                        SqlCommand cmd = new SqlCommand("StProc_INSERT_LogDetails_Mst", sqlCon);
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@Log_TransNo", testID);
                        cmd.Parameters.AddWithValue("@Log_DateTime", date);
                        cmd.Parameters.AddWithValue("@Log_Desc", " Test    " + testID + "  " + tstName.Trim() + " Deleted  ");
                        cmd.Parameters.AddWithValue("@Log_Form", "TestMaster");
                        cmd.Parameters.AddWithValue("@Log_User", l.Usr_Name);
                        cmd.Parameters.AddWithValue("@Log_System", System.Environment.MachineName);
                        cmd.Parameters.AddWithValue("@Log_UserId", l.Usr_key);
                        cmd.Parameters.AddWithValue("@Log_CmpyId", l.BrMst_Key);
                        cmd.ExecuteNonQuery();
                    }
                    catch (Exception ex)
                    {
                        return Json(new { Result = "InsertLogERROR" });
                    }
                }
                sqlCon.Close();
                return Json(new { Result = "OK" });
            }
            catch
            {
                return Json(new { Result = "ERROR" });
            }
            //return Json(true);
        }

        public JsonResult TestMasterSave(testDetails tests)
        {
            try
            {


                string SaveFlag = "";
                //SaveFlag = tests.SaveFlag;
                double Ndisc = 0;
                double tstKey = 0;
                double MaxTstKey = 0;
                MaxTstKey = (db.Test_Mst.Max(tst => tst.TstMst_Key)) + 1;
                var HasTest = db.Test_Mst.Where(tst => tst.TstMst_name.Contains(tests.TstMst_name)).Select(t => t.TstMst_name).FirstOrDefault();
                if (HasTest == (tests.TstMst_name))
                {
                    SaveFlag = "Old";
                    var x = db.Test_Mst.Where(tst => tst.TstMst_name.Contains(tests.TstMst_name)).Select(t => t.TstMst_Key).FirstOrDefault();
                    try { tstKey = Convert.ToDouble(x); } catch { }
                }
                else
                {
                    SaveFlag = "New";
                    try { tstKey = Convert.ToDouble(MaxTstKey); } catch { }
                }

                try { Ndisc = Convert.ToDouble(tests.TstMst_DiscPer); } catch { }
                logindetails l = Session["logindls"] as logindetails;
                //************************************************************************************
                int TestId = 0;
                int ShortTestId = 0;
                int SampleID = 0;
                int DepId = 0;
                SqlConnection sqlcon = new SqlConnection();
                sqlcon = con.dbcon();
                sqlcon.Open();
                SqlCommand cmd5;
                SqlDataAdapter sda;
                DataTable dt = new DataTable();

                if (SaveFlag == "New")
                {
                    try
                    {
                        cmd5 = new SqlCommand("select isnull (TstMst_Key,0) AS TstMst_Key ,isnull (TstMst_DeptId,0) AS TstMst_DeptId ,isnull (tst_SmplTypeId,0) AS tst_SmplTypeId from [dbo].[Test_Mst] WITH (NOLOCK) where [TstMst_name]='" + tests.TstMst_name + "' AND TstMst_DeptId=" + tests.TstMst_DeptId + " AND tst_SmplTypeId=" + tests.TstMst_SmplId + "  ", sqlcon);
                        sda = new SqlDataAdapter(cmd5);
                        sda.Fill(dt);
                        foreach (DataRow dr in dt.Rows)
                        {
                            TestId = Convert.ToInt32(dr["TstMst_Key"]);
                            //SampleID = Convert.ToInt32(dr["TstMst_DeptId"]);
                            //DepId = Convert.ToInt32(dr["tst_SmplTypeId"]);
                        }

                    }
                    catch { }

                    try
                    {
                        cmd5 = new SqlCommand("select isnull (TstMst_Key,0) from [dbo].[Test_Mst] WITH (NOLOCK) where [TstMst_ShortName]='" + tests.TstMst_ShortName + "'", sqlcon);
                        ShortTestId = Convert.ToInt32(cmd5.ExecuteScalar());

                    }
                    catch { }
                    if (TestId != 0)
                    {
                        //MessageBox.Show("Test Name Already Exsists", "Test Details");
                        //txtTestName.Focus();
                        //return;
                        return Json(new { Result = "TestNameAlreadyExsists" });
                    }
                    if (ShortTestId != 0 && tests.TstMst_ShortName != null)
                    {
                        //MessageBox.Show("Test Short Name Already Exsists", "Test Details");
                        //txtShortName.Focus();
                        //return;
                        return Json(new { Result = "TestShortNameAlreadyExsists" });
                    }
                }
                else
                {
                    TestId = 0;
                    ShortTestId = 0;
                    int ExsistTestid = 0;
                    try
                    {
                        var x = db.Test_Mst.Where(tst => tst.TstMst_name.Contains(tests.TstMst_name)).Select(t => t.TstMst_Key).FirstOrDefault();
                        ExsistTestid = Convert.ToInt32(x);
                        //string ExsistTestid = (db.Test_Mst.Where(tst => tst.TstMst_name.Contains(tests.TstMst_name)).Select(t => t.TstMst_Key)).ToString();
                    }
                    catch { }

                    try
                    {
                        cmd5 = new SqlCommand("select isnull (TstMst_Key,0) AS TstMst_Key ,isnull (TstMst_DeptId,0) AS TstMst_DeptId ,isnull (tst_SmplTypeId,0) AS tst_SmplTypeId from [dbo].[Test_Mst] WITH (NOLOCK) where [TstMst_name]='" + tests.TstMst_name + "' And TstMst_Key!=" + ExsistTestid + " AND TstMst_DeptId=" + tests.TstMst_DeptId + " AND tst_SmplTypeId=" + tests.TstMst_SmplId + " ", sqlcon);
                        sda = new SqlDataAdapter(cmd5);
                        sda.Fill(dt);
                        foreach (DataRow dr in dt.Rows)
                        {
                            TestId = Convert.ToInt32(dr["TstMst_Key"]);
                            //SampleID = Convert.ToInt32(dr["TstMst_DeptId"]);
                            //DepId = Convert.ToInt32(dr["tst_SmplTypeId"]);
                        }

                    }
                    catch { }

                    try
                    {
                        cmd5 = new SqlCommand("select isnull (TstMst_Key,0) from [dbo].[Test_Mst] WITH (NOLOCK) where [TstMst_ShortName]='" + tests.TstMst_ShortName + "' and [TstMst_ShortName]!='' And TstMst_Key!=" + ExsistTestid + " ", sqlcon);
                        ShortTestId = Convert.ToInt32(cmd5.ExecuteScalar());

                    }
                    catch { }

                    if (TestId != 0)
                    {
                        //MessageBox.Show("Test Name Already Exsists", "Test Details");
                        //txtTestName.Focus();
                        //return;
                        return Json(new { Result = "TestNameAlreadyExsists" });
                    }
                    if (ShortTestId != 0 && tests.TstMst_ShortName != "")
                    {
                        //MessageBox.Show("Test Short Name Already Exsists", "Test Details");
                        //txtShortName.Focus();
                        //return;
                        return Json(new { Result = "TestShortNameAlreadyExsists" });
                    }
                }
                //**************************************************************************************************************************************************
                //**************************************************************************************************************************************************
                try
                {

                    if (Convert.ToString(tests.TstMst_Key) == "0")
                    {
                        try
                        {
                            int _tstag;
                            DataTable dt0 = getTable("SELECT MAX(TstMst_Key) AS TstMst_Key FROM Test_Mst WITH (NOLOCK)");
                            _tstag = Convert.ToInt32(dt0.Rows[0]["TstMst_Key"]);
                            tests.TstMst_Key = _tstag + 1;
                        }
                        catch
                        {
                            tests.TstMst_Key = 0;
                            /*return*/
                            ;
                        }

                    }

                    try
                    {
                        tests.TstMst_name = tests.TstMst_name.Replace("'", "`");
                    }
                    catch { }

                    //*********GroupTestChecking************
                    int _TestTypeId = 0;
                    int ExsisitFlag = 0;
                    try
                    {
                        _TestTypeId = Convert.ToInt32(tests.TstMst_TypeId);
                    }
                    catch { }
                    if (_TestTypeId != -2 && _TestTypeId != -12 && _TestTypeId != -15 && _TestTypeId != -24)
                    {
                        //for (int i = 0; i < tests.SetGpTstLst.Count; i++)
                        //{
                        int Testid = 0;
                        foreach (var item in tests.SetGpTstLst)
                        {
                            try
                            {
                                Testid = Convert.ToInt32(item.StGrpTst_TstCode);
                            }
                            catch { }
                            if (Testid > 0)
                            {
                                ExsisitFlag = 1;
                                break;
                            }
                        }
                        if (ExsisitFlag == 1)
                        {

                            //MessageBox.Show("Can't Allow ...Remove Group Test First....", cPublic.ProjectName);
                            ////tabControl1.TabPages[0].Show();
                            //tabControl1.SelectedTab = tabSetGroupTest;
                            //return;
                            return Json(new { Result = "RmveGPTest" });
                        }
                    }

                    //**********************

                    SqlCommand cmd = new SqlCommand();
                    cmd.Connection = sqlcon;
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = "StProc_INSERT_TEST_MASTER";

                    cmd.Parameters.Clear();
                    cmd.Parameters.AddWithValue("@InsertMode", SaveFlag);
                    cmd.Parameters.AddWithValue("@TstMst_Key", Convert.ToInt32(tstKey));
                    cmd.Parameters.AddWithValue("@TstMst_name", tests.TstMst_name);
                    cmd.Parameters.AddWithValue("@TstMst_TypeId", Convert.ToInt32(tests.TstMst_TypeId));
                    try
                    {
                        cmd.Parameters.AddWithValue("@TstMst_Rate", Convert.ToDouble(tests.TstMst_Rate));
                    }
                    catch
                    {
                        cmd.Parameters.AddWithValue("@TstMst_Rate", 0);
                    }
                    //cmd.Parameters.AddWithValue("@TstMst_SpeciTwo", Convert.ToInt32(tests.TstMst_DeptId));
                    //cmd.Parameters.AddWithValue("@TstMst_SpeciGender", Convert.ToInt32(tests.TstMst_MthdId));


                    cmd.Parameters.AddWithValue("@TstMst_DeptId", Convert.ToInt32(tests.TstMst_DeptId));
                    cmd.Parameters.AddWithValue("@TstMst_MthdId", Convert.ToInt32(tests.TstMst_MthdId));
                    cmd.Parameters.AddWithValue("@TstMst_UnitId", Convert.ToInt32(tests.TstMst_UnitId));

                    //if (optRef1.Checked == true)
                    if (tests.optRef1 == true)
                        cmd.Parameters.AddWithValue("@TstMst_RefNo", 1);
                    else
                        cmd.Parameters.AddWithValue("@TstMst_RefNo", 2);

                    ////////////////////////tests.RefRange2 = tests.RefRange2.Replace("'", "`");
                    ////////////////////////tests.Specficatn = tests.Specficatn.Replace("'", "`");
                    //AvoidRsltEntry chkHideHead
                    cmd.Parameters.AddWithValue("@TstMst_Rfrncerng", tests.RefRange2 ?? "");
                    cmd.Parameters.AddWithValue("@TstMst_OthComment", tests.Specficatn ?? "");
                    cmd.Parameters.AddWithValue("@TstMst_PrntCmnTch", tests.ChkCommonTech);
                    cmd.Parameters.AddWithValue("@TstMst_IsAvoid", tests.AvoidRsltEntry);

                    cmd.Parameters.AddWithValue("@TstMst_DispHead", tests.chkHideHead);
                    cmd.Parameters.AddWithValue("@TstMst_DivsnId", Convert.ToInt32(tests.TstMst_DivId));
                    try
                    {
                        cmd.Parameters.AddWithValue("@TstMst_TechId", Convert.ToInt32(tests.TstMst_TechId));
                    }
                    catch { cmd.Parameters.AddWithValue("@TstMst_TechId", 0); }
                    cmd.Parameters.AddWithValue("@tst_RptDay", tests.TstMst_ReportON ?? "");
                    cmd.Parameters.AddWithValue("@tst_RptTmeDays", tests.TstMst_rptonDMH ?? "");
                    cmd.Parameters.AddWithValue("@tst_SmplType", "");
                    cmd.Parameters.AddWithValue("@tst_SmplTypeId", Convert.ToInt32(tests.TstMst_SmplId));
                    cmd.Parameters.AddWithValue("@TstMst_Sample", tests.Sample ?? "");
                    cmd.Parameters.AddWithValue("@TstMst_Volume", tests.Volume ?? "");
                    //if (tests.Volume != null)
                    //{
                    //    cmd.Parameters.AddWithValue("@TstMst_Volume", tests.Volume.Trim());
                    //}
                    //else
                    //{
                    //    cmd.Parameters.AddWithValue("@TstMst_Volume", DBNull.Value);
                    //}
                    //cmd.Parameters.AddWithValue("@TstMst_Volume", tests.Volume.Trim());
                    cmd.Parameters.AddWithValue("@TstMst_CutOftime", tests.CtOfTime ?? "");
                    cmd.Parameters.AddWithValue("@TstMst_TstMode", tests.TstMst_Mode ?? "");
                    cmd.Parameters.AddWithValue("@TstMst_ShortName", tests.TstMst_ShortName ?? "");

                    cmd.Parameters.AddWithValue("@TstMst_DiscPer", Ndisc);
                    ////////////////////////////UserDetails();
                    cmd.Parameters.AddWithValue("@TstMst_EditedUsr", tests.lblUser ?? "");
                    try
                    {
                        cmd.Parameters.AddWithValue("@TstMst_PerformId", Convert.ToInt32(tests.PerformatID));
                    }
                    catch
                    {
                        cmd.Parameters.AddWithValue("@TstMst_PerformId", 0);
                    }
                    cmd.Parameters.AddWithValue("@TstMst_IntrNote", tests.InternalNote ?? "");
                    //********
                    int IsNABL = 0;
                    int IsSendSms = 0;
                    int IsSmplBrCode = 0;
                    int IsFreeTest = 0;
                    int IsAvdIncen = 0;
                    int IsAlphanmCriti = 0;
                    //chkNABL chkSendSMS chkSampleBarcode chkFreeTest chkIncen chkStrgCritical
                    if (tests.chkNABL == true)
                    {
                        IsNABL = 1;
                    }
                    if (tests.chkSendSMS == true)
                    {
                        IsSendSms = 1;
                    }
                    if (tests.chkSampleBarcode == true)
                    {
                        IsSmplBrCode = 1;
                    }
                    if (tests.chkFreeTest == true)
                    {
                        IsFreeTest = 1;
                    }
                    if (tests.chkIncen == true)
                    {
                        IsAvdIncen = 1;

                    }
                    if (tests.chkStrgCritical == true)
                    {
                        IsAlphanmCriti = 1;
                    }
                    cmd.Parameters.AddWithValue("@TstMst_IsNABL", IsNABL);
                    cmd.Parameters.AddWithValue("@TstMst_IsSendSms", IsSendSms);
                    cmd.Parameters.AddWithValue("@TstMst_SmplBrCode", IsSmplBrCode);
                    cmd.Parameters.AddWithValue("@TstMst_RateFree", IsFreeTest);
                    cmd.Parameters.AddWithValue("@TstMst_AvdIncen", IsAvdIncen);
                    cmd.Parameters.AddWithValue("@TstMst_AlphNmCrit", IsAlphanmCriti);

                    //********
                    cmd.ExecuteNonQuery();

                    // update special rates
                    int testMstKey = 0, splAccHdId = 0, schmaId = 0;
                    double splDiscper = 0, splRate = 0, testRate = 0;
                    string isChangedAccHeads = "", accntHeadName = "", isChangedSchema = "", schmaName = "";
                    if ((tests.TstMst_Rate).ToString() != O_txtRate.ToString())
                    {
                        try
                        {
                            testMstKey = Convert.ToInt32(tests.TstMst_Key);
                        }
                        catch { }
                        try
                        {
                            testRate = Convert.ToDouble(tests.TstMst_Rate);
                        }
                        catch { }


                        SqlCommand cmdSplRate = new SqlCommand("SELECT SplR_ID,SplR_DisPer,SplR_NRate,AHMST_PNAME FROM Special_Rates LEFT JOIN ACCOUNTHEADS_MST ON AHMST_KEY=SplR_ID WHERE SplR_TstID='" + testMstKey + "'", sqlcon);
                        SqlDataAdapter sdaSpl = new SqlDataAdapter(cmdSplRate);
                        DataTable dtSpl = new DataTable();
                        sdaSpl.Fill(dtSpl);
                        if (dtSpl.Rows.Count != 0)
                        {
                            foreach (DataRow dr in dtSpl.Rows)
                            {
                                splDiscper = 0;
                                splAccHdId = 0;
                                splRate = 0;
                                accntHeadName = "";
                                try
                                {
                                    splDiscper = Convert.ToDouble(dr["SplR_DisPer"]);
                                }
                                catch { }
                                try
                                {
                                    splAccHdId = Convert.ToInt32(dr["SplR_ID"]);
                                }
                                catch { }
                                accntHeadName = dr["AHMST_PNAME"].ToString();
                                if (splDiscper != 0)
                                {

                                    splRate = (testRate - (testRate * splDiscper / 100));

                                    SqlCommand cmdSplUpd = new SqlCommand("StProc_UPDATE_SpecialRates", sqlcon);
                                    cmdSplUpd.CommandType = CommandType.StoredProcedure;
                                    cmdSplUpd.Parameters.AddWithValue("@SplR_ID", splAccHdId);
                                    cmdSplUpd.Parameters.AddWithValue("@SplR_TstID", testMstKey);
                                    cmdSplUpd.Parameters.AddWithValue("@SplR_NRate", splRate);
                                    cmdSplUpd.Parameters.AddWithValue("@isSplRate", 1);
                                    try
                                    {
                                        cmdSplUpd.ExecuteNonQuery();
                                        isChangedAccHeads = accntHeadName + " (" + splAccHdId + ")" + ", \n" + isChangedAccHeads;
                                    }
                                    catch { }

                                }
                            }
                            if (isChangedAccHeads != "")
                            {
                                try
                                {
                                    DateTime date = DateTime.Now;
                                    cmd = new SqlCommand("StProc_INSERT_LogDetails_Mst", sqlcon);
                                    cmd.CommandType = CommandType.StoredProcedure;
                                    cmd.Parameters.AddWithValue("@Log_TransNo", testMstKey);
                                    cmd.Parameters.AddWithValue("@Log_DateTime", date);
                                    cmd.Parameters.AddWithValue("@Log_Desc", "Special Rate of " + tests.TstMst_name + ", of Ledgers " + isChangedAccHeads + " are Updated");
                                    cmd.Parameters.AddWithValue("@Log_Form", "TestMaster");
                                    cmd.Parameters.AddWithValue("@Log_User", l.Usr_Name);
                                    cmd.Parameters.AddWithValue("@Log_System", System.Environment.MachineName);
                                    cmd.Parameters.AddWithValue("@Log_UserId", l.Usr_key);
                                    cmd.Parameters.AddWithValue("@Log_CmpyId", l.BrMst_Key);
                                    cmd.ExecuteNonQuery();
                                }
                                catch (Exception ex)
                                { }
                            }
                        }

                        /****SCHEMA RATES***/
                        SqlCommand cmdSchmaRate = new SqlCommand("SELECT SplSchR_ID,SplSchR_DisPer,SplSchR_NRate,Mstr_Desc FROM Special_SchemeRates LEFT JOIN Masters ON Mstr_Key=SplSchR_ID WHERE SplSchR_TstID='" + testMstKey + "'", sqlcon);
                        SqlDataAdapter sdaSch = new SqlDataAdapter(cmdSchmaRate);
                        DataTable dtSch = new DataTable();
                        sdaSch.Fill(dtSch);
                        if (dtSch.Rows.Count != 0)
                        {
                            foreach (DataRow dr in dtSch.Rows)
                            {
                                splDiscper = 0;
                                schmaId = 0;
                                splRate = 0;
                                schmaName = "";
                                try
                                {
                                    splDiscper = Convert.ToDouble(dr["SplSchR_DisPer"]);
                                }
                                catch { }
                                try
                                {
                                    schmaId = Convert.ToInt32(dr["SplSchR_ID"]);
                                }
                                catch { }
                                schmaName = dr["Mstr_Desc"].ToString();
                                if (splDiscper != 0)
                                {

                                    splRate = (testRate - (testRate * splDiscper / 100));

                                    SqlCommand cmdSplUpd = new SqlCommand("StProc_UPDATE_SpecialRates", sqlcon);
                                    cmdSplUpd.CommandType = CommandType.StoredProcedure;
                                    cmdSplUpd.Parameters.AddWithValue("@SplR_ID", schmaId);
                                    cmdSplUpd.Parameters.AddWithValue("@SplR_TstID", testMstKey);
                                    cmdSplUpd.Parameters.AddWithValue("@SplR_NRate", splRate);
                                    cmdSplUpd.Parameters.AddWithValue("@isSplRate", 2);
                                    try
                                    {
                                        cmdSplUpd.ExecuteNonQuery();
                                        isChangedSchema = schmaName + " (" + schmaId + ")" + ", \n" + isChangedSchema;
                                    }
                                    catch { }

                                }
                            }
                            if (isChangedSchema != "")
                            {
                                try
                                {
                                    DateTime date = DateTime.Now;
                                    cmd = new SqlCommand("StProc_INSERT_LogDetails_Mst", sqlcon);
                                    cmd.CommandType = CommandType.StoredProcedure;
                                    cmd.Parameters.AddWithValue("@Log_TransNo", testMstKey);
                                    cmd.Parameters.AddWithValue("@Log_DateTime", date);
                                    cmd.Parameters.AddWithValue("@Log_Desc", "Schema Rate of " + tests.TstMst_name + ", of Schema " + isChangedSchema + " are Updated");
                                    cmd.Parameters.AddWithValue("@Log_Form", "TestMaster");
                                    cmd.Parameters.AddWithValue("@Log_User", l.Usr_Name);
                                    cmd.Parameters.AddWithValue("@Log_System", System.Environment.MachineName);
                                    cmd.Parameters.AddWithValue("@Log_UserId", l.Usr_key);
                                    cmd.Parameters.AddWithValue("@Log_CmpyId", l.BrMst_Key);
                                    cmd.ExecuteNonQuery();
                                }
                                catch (Exception ex)
                                { }
                            }
                        }
                        /******************/
                    }

                    //return Json(new { Result = "OK" });
                    //*****************UPDATING SPECIAL RATES ENDS ******************
                }
                catch (Exception ex)
                {
                    //MessageBox.Show(ex.Message);
                    //return;
                    return Json(new { Result = "ERROR" });
                }
                //************************************************************************************
                if (tests.rtbSpec != "")
                {
                    using (SqlCommand com = new SqlCommand("UPDATE Test_Mst SET TstMst_SpeciGender=@M,TstMst_SpeciTwo=@Spec WHERE TstMst_Key= " + Convert.ToInt32(tstKey) + "", sqlcon))
                    {
                        //com.Parameters.AddWithValue("@M", @"""%$#@?,.;"); 
                        com.Parameters.AddWithValue("@M", tests.Gender);
                        com.Parameters.AddWithValue("@Spec", tests.rtbSpec);
                        try { com.ExecuteNonQuery(); } catch { };
                    }
                }
                else
                {
                    using (SqlCommand com = new SqlCommand("UPDATE Test_Mst SET TstMst_SpeciGender=@M,TstMst_SpeciTwo=@Spec WHERE TstMst_Key= " + Convert.ToInt32(tstKey) + "", sqlcon))
                    {
                        //com.Parameters.AddWithValue("@M", @"""%$#@?,.;"); 
                        com.Parameters.AddWithValue("@M", DBNull.Value);
                        com.Parameters.AddWithValue("@Spec", DBNull.Value);
                        com.ExecuteNonQuery();
                    }
                }




                //}
                //************************************************************
                //*********************************************Delete from Refrence Range grid*******************************************
                try
                {
                    SqlCommand cmd2 = new SqlCommand();
                    cmd2.Connection = sqlcon;
                    cmd2.CommandType = CommandType.Text;
                    cmd2.CommandText = "DELETE FROM [dbo].[NormalRanges] WHERE Nrml_TstID=" + tstKey + "";
                    cmd2.Parameters.Clear();
                    cmd2.ExecuteNonQuery();
                }
                catch (Exception ex)
                {
                    //MessageBox.Show(ex.Message);
                    //return;
                }
                //*********************************************Delete from Refrence Range grid End*******************************************

                //*********************************************Insert Into Grid Reference Range*******************************************
                try
                {
                    try
                    {
                        SqlCommand cmd3 = new SqlCommand();
                        cmd3.Connection = sqlcon;
                        cmd3.CommandType = CommandType.StoredProcedure;
                        cmd3.CommandText = "StProc_INSERT_REFRANGE";



                        //for (int i = 0; i < tests.refRange1.Count; i++)
                        //{
                        var Nrml_Key = db.NormalRanges.Max(n => n.Nrml_Key);
                        foreach (var item in tests.refRange1)
                        {
                            cmd3.Parameters.Clear();
                            cmd3.Parameters.AddWithValue("@Nrml_Key", (Nrml_Key + 1));
                            cmd3.Parameters.AddWithValue("@Nrml_TstID", tstKey);
                            try
                            {
                                cmd3.Parameters.AddWithValue("@Nrml_Agefr", Convert.ToDouble(item.Nrml_Agefr));
                            }
                            catch
                            {
                                cmd3.Parameters.AddWithValue("@Nrml_Agefr", 0);
                            }

                            cmd3.Parameters.AddWithValue("@Nrml_Agetype", item.Nrml_Agetype);
                            try
                            {
                                cmd3.Parameters.AddWithValue("@Nrml_Ageto", Convert.ToDouble(item.Nrml_Ageto));
                            }
                            catch
                            {
                                cmd3.Parameters.AddWithValue("@Nrml_Ageto", 0);
                            }
                            cmd3.Parameters.AddWithValue("@Nrml_Agetypeto", item.Nrml_Agetypeto);

                            cmd3.Parameters.AddWithValue("@Nrml_Sex", item.Nrml_Sex);
                            cmd3.Parameters.AddWithValue("@Nrml_Norage", item.Nrml_Norage);

                            try
                            {
                                cmd3.Parameters.AddWithValue("@Nrml_Low", Convert.ToDouble(item.Nrml_Low));
                            }
                            catch
                            {
                                cmd3.Parameters.AddWithValue("@Nrml_Low", 0);
                            }

                            try
                            {
                                cmd3.Parameters.AddWithValue("@Nrml_Crtlow", Convert.ToDouble(item.Nrml_Crtlow));
                            }
                            catch
                            {
                                cmd3.Parameters.AddWithValue("@Nrml_Crtlow", 0);
                            }

                            try
                            {
                                // cmd3.Parameters.AddWithValue("@Nrml_High", Convert.ToDouble(grdNewRefRange1["Nrml_High", i].Value));
                                cmd3.Parameters.AddWithValue("@Nrml_High", item.Nrml_High);
                            }
                            catch
                            {
                                cmd3.Parameters.AddWithValue("@Nrml_High", 0);
                            }

                            try
                            {
                                //  cmd3.Parameters.AddWithValue("@Nrml_Crthigh", Convert.ToDouble(grdNewRefRange1["Nrml_Crthigh", i].Value));
                                cmd3.Parameters.AddWithValue("@Nrml_Crthigh", item.Nrml_Crthigh);
                            }
                            catch
                            {
                                cmd3.Parameters.AddWithValue("@Nrml_Crthigh", 0);
                            }

                            cmd3.ExecuteNonQuery();
                            if (NewRefrence1 == "")
                            {
                                try
                                {
                                    NewRefrence1 = "\t" + item.Nrml_Sex.ToString() + item.Nrml_Agefr.ToString() + item.Nrml_Agetype.ToString() + item.Nrml_Ageto.ToString() + item.Nrml_Agetypeto.ToString() + item.Nrml_Low.ToString() + item.Nrml_High.ToString() + item.Nrml_Crtlow.ToString() + item.Nrml_Crthigh.ToString() + item.Nrml_Norage.ToString() + "";
                                }
                                catch { }
                                //OldGroupTest = "\t" + grdSetGroupTest["TstMst_name", i].Value.ToString() + grdSetGroupTest[" TstMst_Rate", i].Value.ToString() + grdSetGroupTest["StGrpTst_OrderBy", i].Value.ToString() + grdSetGroupTest[" StGrpTst_Sh", i].Value.ToString() + grdSetGroupTest["Department", i].Value.ToString() + grdSetGroupTest["Sample", i].Value.ToString() + "";
                            }
                            else
                            {
                                try
                                {
                                    NewRefrence1 = NewRefrence1 + "\r\n\t" + item.Nrml_Sex.ToString() + item.Nrml_Agefr.ToString() + item.Nrml_Agetype.ToString() + item.Nrml_Ageto.ToString() + item.Nrml_Agetypeto.ToString() + item.Nrml_Low.ToString() + item.Nrml_High.ToString() + item.Nrml_Crtlow.ToString() + item.Nrml_Crthigh.ToString() + item.Nrml_Norage.ToString() + "";
                                    //  OldGroupTest = OldGroupTest + "\r\n\t" + grdSetGroupTest["TstMst_name", i].Value.ToString() + grdSetGroupTest[" TstMst_Rate", i].Value.ToString() + grdSetGroupTest["StGrpTst_OrderBy", i].Value.ToString() + grdSetGroupTest[" StGrpTst_Sh", i].Value.ToString() + grdSetGroupTest["Department", i].Value.ToString() + grdSetGroupTest["Sample", i].Value.ToString() + "";
                                }
                                catch { }
                            }
                        }
                    }
                    catch (Exception exe)
                    {
                        //StreamWriter tstream = System.IO.File.AppendText(Server.MapPath("~/bin/Debug") + "\\ERRORLOG.txt");
                        //try
                        //{
                        //    tstream.WriteLine("");
                        //    tstream.WriteLine(DateTime.Now + "errorss -->" + exe.Message + "innerExceptn->" + exe.InnerException);
                        //    tstream.WriteLine("");
                        //    tstream.Flush();
                        //    tstream.Close();
                        //}
                        //catch { }
                    }

                    //**************************************
                    int TestTypeId = 0;
                    try
                    {
                        TestTypeId = Convert.ToInt32(tests.TstMst_TypeId);
                    }
                    catch { }
                    //Calculate();********************************************************
                    double TotalAmount = 0; string txtTotal = ""; double? txtGrpAmount = 0;
                    txtGrpAmount = tests.TstMst_Rate;

                    //for (int i = 0; i < grdSetGroupTest.Rows.Count; i++)
                    //{
                    foreach (var item in tests.SetGpTstLst)
                    {
                        double Rate = 0;
                        try
                        {
                            Rate = Convert.ToDouble(item.TstMst_Rate);
                        }
                        catch { }
                        TotalAmount += Rate;
                    }
                    txtTotal = TotalAmount.ToString();
                    //********************************************************************
                    if (TestTypeId == -2 || TestTypeId == -12 || TestTypeId == -24)
                    {
                        try
                        {
                            SqlCommand sqlCmd3 = new SqlCommand();
                            sqlCmd3.Connection = sqlcon;
                            sqlCmd3.CommandType = CommandType.Text;
                            sqlCmd3.CommandText = "DELETE FROM Set_GroupTest WHERE StGrpTst_GrpId=@StGrpTst_GrpId";
                            sqlCmd3.Parameters.Clear();
                            sqlCmd3.Parameters.AddWithValue("@StGrpTst_GrpId", SqlDbType.Float);
                            sqlCmd3.Parameters["@StGrpTst_GrpId"].Value = tstKey;
                            sqlCmd3.ExecuteNonQuery();

                            SqlCommand sqlcmd4 = new SqlCommand();
                            sqlcmd4.Connection = sqlcon;
                            sqlcmd4.CommandType = CommandType.StoredProcedure;
                            sqlcmd4.CommandText = "StProc_SETGROUPTEST";

                            int Sh_Val = 0;
                            //for (int i = 0; i < grdSetGroupTest.Rows.Count; i++)
                            //{
                            foreach (var item in tests.SetGpTstLst)
                            {
                                Sh_Val = 0;
                                int TempTestId = 0;
                                try
                                {
                                    TempTestId = Convert.ToInt32(item.StGrpTst_TstCode);
                                }
                                catch { }
                                var GrpTst_Key = db.Set_GroupTest.Max(s => s.StGrpTst_Key);
                                if (TempTestId > 0)
                                {
                                    sqlcmd4.Parameters.Clear();
                                    sqlcmd4.Parameters.AddWithValue("@StGrpTst_Key", Convert.ToDouble(GrpTst_Key + 1));
                                    sqlcmd4.Parameters.AddWithValue("@StGrpTst_GrpId", tstKey);
                                    sqlcmd4.Parameters.AddWithValue("@StGrpTst_TstCode", Convert.ToDouble(item.StGrpTst_TstCode));

                                    sqlcmd4.Parameters.AddWithValue("@StGrpTst_OrderBy", Convert.ToDouble(item.StGrpTst_OrderBy));

                                    try
                                    {
                                        if (Convert.ToInt32(item.StGrpTst_Sh) == 1 || Convert.ToInt32(item.StGrpTst_Sh) == -1)
                                        {
                                            Sh_Val = -1;

                                        }
                                    }
                                    catch
                                    {
                                        Sh_Val = 0;
                                    }

                                    sqlcmd4.Parameters.AddWithValue("@StGrpTst_Sh", Sh_Val.ToString());
                                    sqlcmd4.ExecuteNonQuery();
                                    if (NewGroupTest == "")
                                    {
                                        try
                                        {
                                            NewGroupTest = "\t" + item.TstMst_name.ToString() + item.TstMst_Rate.ToString() + item.StGrpTst_OrderBy.ToString() + item.StGrpTst_Sh.ToString() + item.Department.ToString() + item.Sample.ToString() + "";
                                        }
                                        catch { }
                                    }
                                    else
                                    {
                                        try
                                        {
                                            NewGroupTest = NewGroupTest + "\r\n\t" + item.TstMst_name.ToString() + item.TstMst_Rate.ToString() + item.StGrpTst_OrderBy.ToString() + item.StGrpTst_Sh.ToString() + item.Department.ToString() + item.Sample.ToString() + "";
                                        }
                                        catch { }
                                    }
                                }
                            }
                        }
                        catch (Exception exe)
                        {

                        }

                    }
                    //*************************************
                    //********************Save ReferedLabRate*************************************

                    double NRate = 0;
                    int RefId = 0;
                    string userinf = l.Usr_Name + " " + DateTime.Now.ToString("dd - MM - yyyy hh: mm tt") + " Work Satation:" + Environment.MachineName;
                    try
                    {
                        SqlCommand cmdref = new SqlCommand("DELETE FROM TestRef_Mst WHERE TestRef_TestId=" + tstKey + "", sqlcon);
                        cmdref.ExecuteNonQuery();
                        //ReferedLabLst
                        //for (int i = 0; i < grdRef.Rows.Count; i++)
                        //{
                        foreach (var item in tests.ReferedLabLst)
                        {
                            NRate = 0;
                            RefId = 0;
                            try
                            {
                                NRate = Convert.ToInt32(item.TestRef_SpRate);

                            }
                            catch
                            { }
                            try
                            {
                                RefId = Convert.ToInt32(item.TestRef_Id);

                            }
                            catch
                            { }
                            if (NRate > 0 && RefId > 0)
                            {
                                SqlCommand cmds = new SqlCommand("StProc_INSERT_TESTREF_MST", sqlcon);
                                cmds.CommandType = CommandType.StoredProcedure;
                                cmds.Parameters.AddWithValue("@TestRef_Id", RefId);
                                cmds.Parameters.AddWithValue("@TestRef_RefName", item.TestRef_RefName);
                                cmds.Parameters.AddWithValue("@TestRef_SpRate", NRate);
                                cmds.Parameters.AddWithValue("@TestRef_ReportedOn", item.TestRef_ReportedOn);
                                cmds.Parameters.AddWithValue("@TestRef_TestId", tstKey);
                                cmds.Parameters.AddWithValue("@TestRef_UserInfo", userinf);
                                cmds.ExecuteNonQuery();
                            }
                        }

                    }
                    catch (Exception ex) { }

                    //********************END Save ReferedLabRate*********************************

                    //*******************Result Template*******************************************************
                    //SaveResTempl();
                    int TestIds = 0;
                    int flag = 0;
                    TestIds = Convert.ToInt32(tstKey);
                    string Template = "";
                    bool Default = false;
                    bool Iscritical = false;
                    int TemplateDefault = 0;
                    int TempIsCritical = 0;
                    SqlCommand cmd1 = new SqlCommand("Delete from Result_Template Where RsltTmpt_TestId =" + tstKey + "", sqlcon);
                    cmd1.ExecuteNonQuery();

                    //for (int i = 0; i < grdResultTemplate.Rows.Count; i++)
                    //{
                    foreach (var item in tests.RsltTmpltLst)
                    {
                        try
                        {
                            TemplateDefault = 0;
                            TempIsCritical = 0;
                            if (item.Template != null)
                            {
                                SqlCommand cmd2 = new SqlCommand("StProc_INSERT_RESULTTEMPLATE", sqlcon);
                                cmd2.CommandType = CommandType.StoredProcedure;
                                cmd2.Parameters.Add("@RsltTmpt_Template", SqlDbType.NVarChar).Value = item.Template;
                                cmd2.Parameters.Add("@RsltTmpt_TestId", SqlDbType.Int).Value = tstKey;
                                Default = Convert.ToBoolean(item.Default);
                                Iscritical = false;
                                try { Iscritical = Convert.ToBoolean(item.CriticalSel); } catch { }
                                if (Default == true)
                                {
                                    TemplateDefault = 1;
                                }
                                if (Iscritical == true)
                                {
                                    TempIsCritical = 1;
                                }
                                cmd2.Parameters.Add("@RsltTmpt_default", SqlDbType.Int).Value = TemplateDefault;

                                cmd2.Parameters.Add("@RsltTmpt_IsCritical", SqlDbType.Int).Value = TempIsCritical;
                                cmd2.ExecuteNonQuery();
                            }
                        }

                        catch (Exception exe)
                        {
                        }
                    }
                    //***********************END Result Template*******************************************************************
                    SqlCommand sqlCmd = new SqlCommand();
                    sqlCmd.Connection = sqlcon;
                    sqlCmd.CommandType = CommandType.Text;

                    sqlCmd.CommandText = ("SELECT dbo.NormalRanges.Nrml_Key,dbo.NormalRanges.Nrml_Sex, dbo.NormalRanges.Nrml_Agefr," + Environment.NewLine
                                                   + "dbo.NormalRanges.Nrml_Agetype, dbo.NormalRanges.Nrml_Ageto, dbo.NormalRanges.Nrml_Agetypeto," + Environment.NewLine
                                                   + "dbo.NormalRanges.Nrml_Low,dbo.NormalRanges.Nrml_High,dbo.NormalRanges.Nrml_Crtlow,dbo.NormalRanges.Nrml_Crthigh,dbo.NormalRanges.Nrml_Norage,'' as [NKey]" + Environment.NewLine
                                                   + "FROM dbo.NormalRanges WITH (NOLOCK) LEFT OUTER JOIN" + Environment.NewLine
                                                   + "dbo.Test_Mst WITH (NOLOCK) ON dbo.NormalRanges.Nrml_TstID = dbo.Test_Mst.TstMst_Key WHERE dbo.NormalRanges.Nrml_TstID= " + tstKey + " ORDER BY dbo.NormalRanges.Nrml_Sex");
                    // grdRefRange1.DataSource = dt3;
                    SqlDataAdapter sda1 = new SqlDataAdapter(sqlCmd);
                    DataTable dt3 = new DataTable();
                    sda1.Fill(dt3);
                    int i = 0;
                    //************************************************************************************************************
                    foreach (DataRow dr in dt3.Rows)
                    {
                        //rfrnce1

                        ReferanceRange1 rfrnc = new ReferanceRange1()
                        {
                            Nrml_Key = Convert.ToDouble(dt3.Rows[i]["Nrml_Key"].ToString()),
                            Nrml_Sex = dt3.Rows[i]["Nrml_Sex"].ToString(),
                            Nrml_Agefr = Convert.ToDouble(dt3.Rows[i]["Nrml_Agefr"].ToString()),
                            Nrml_Agetype = dt3.Rows[i]["Nrml_Agetype"].ToString(),
                            Nrml_Ageto = Convert.ToDouble(dt3.Rows[i]["Nrml_Ageto"].ToString()),
                            Nrml_Agetypeto = dt3.Rows[i]["Nrml_Agetypeto"].ToString(),
                            Nrml_Low = dt3.Rows[i]["Nrml_Low"].ToString(),
                            Nrml_Crtlow = dt3.Rows[i]["Nrml_Crtlow"].ToString(),
                            Nrml_High = dt3.Rows[i]["Nrml_High"].ToString(),
                            Nrml_Crthigh = dt3.Rows[i]["Nrml_Crthigh"].ToString(),
                            Nrml_Norage = dt3.Rows[i]["Nrml_Norage"].ToString()
                        };
                        //rfrnce1s.Add(rfrnc);
                        i++;
                        if (OldRefrence1 == "")
                        {
                            OldRefrence1 = "\t" + dt3.Rows[0]["Nrml_Sex"].ToString() + Convert.ToDouble(dt3.Rows[0]["Nrml_Agefr"].ToString()) + dt3.Rows[0]["Nrml_Agetype"].ToString() + Convert.ToDouble(dt3.Rows[0]["Nrml_Ageto"].ToString()) + dt3.Rows[0]["Nrml_Agetypeto"].ToString() + dt3.Rows[0]["Nrml_Low"].ToString() + dt3.Rows[0]["Nrml_High"].ToString() + dt3.Rows[0]["Nrml_Crtlow"].ToString() + dt3.Rows[0]["Nrml_Crthigh"].ToString() + dt3.Rows[0]["Nrml_Norage"].ToString() + "";
                            //OldGroupTest = "\t" + grdSetGroupTest["TstMst_name", i].Value.ToString() + grdSetGroupTest[" TstMst_Rate", i].Value.ToString() + grdSetGroupTest["StGrpTst_OrderBy", i].Value.ToString() + grdSetGroupTest[" StGrpTst_Sh", i].Value.ToString() + grdSetGroupTest["Department", i].Value.ToString() + grdSetGroupTest["Sample", i].Value.ToString() + "";
                        }
                        else
                        {
                            try
                            {
                                OldRefrence1 = OldRefrence1 + "\r\n\t" + dt3.Rows[0]["Nrml_Sex"].ToString() + Convert.ToDouble(dt3.Rows[0]["Nrml_Agefr"].ToString()) + dt3.Rows[0]["Nrml_Agetype"].ToString() + Convert.ToDouble(dt3.Rows[0]["Nrml_Ageto"].ToString()) + dt3.Rows[0]["Nrml_Agetypeto"].ToString() + dt3.Rows[0]["Nrml_Low"].ToString() + dt3.Rows[0]["Nrml_High"].ToString() + dt3.Rows[0]["Nrml_Crtlow"].ToString() + dt3.Rows[0]["Nrml_Crthigh"].ToString() + dt3.Rows[0]["Nrml_Norage"].ToString() + "";
                                //  OldGroupTest = "\t" + grdSetGroupTest["TstMst_name", i].Value.ToString() + grdSetGroupTest[" TstMst_Rate", i].Value.ToString() + grdSetGroupTest["StGrpTst_OrderBy", i].Value.ToString() + grdSetGroupTest[" StGrpTst_Sh", i].Value.ToString() + grdSetGroupTest["Department", i].Value.ToString() + grdSetGroupTest["Sample", i].Value.ToString() + "";
                            }
                            catch { }


                        }
                    }
                    SqlCommand sqlCmd1 = new SqlCommand();
                    sqlCmd1.Connection = sqlcon;
                    sqlCmd1.CommandType = CommandType.Text;
                    sqlCmd1.CommandText = "SELECT '' as SlNo,dbo.Set_GroupTest.StGrpTst_TstCode, dbo.Test_Mst.TstMst_name,dbo.Test_Mst.TstMst_Rate, dbo.Set_GroupTest.StGrpTst_OrderBy," + Environment.NewLine
                                        + "dbo.Set_GroupTest.StGrpTst_Sh, dbo.Masters.Mstr_Desc AS Department, Masters_1.Mstr_Desc AS Sample" + Environment.NewLine
                                        + "FROM dbo.Set_GroupTest WITH (NOLOCK) LEFT OUTER JOIN" + Environment.NewLine
                                        + "dbo.Test_Mst WITH (NOLOCK) ON dbo.Set_GroupTest.StGrpTst_TstCode = dbo.Test_Mst.TstMst_Key LEFT OUTER JOIN" + Environment.NewLine
                                        + "dbo.Masters WITH (NOLOCK) ON dbo.Test_Mst.TstMst_DeptId = dbo.Masters.Mstr_Key LEFT OUTER JOIN dbo.Masters AS Masters_1 WITH (NOLOCK) ON dbo.Test_Mst.tst_SmplTypeId = Masters_1.Mstr_Key" + Environment.NewLine
                                        + "WHERE (dbo.Set_GroupTest.StGrpTst_GrpId =" + Convert.ToInt32(tstKey) + ") ORDER BY StGrpTst_OrderBy,StGrpTst_Key";

                    SqlDataAdapter sda2 = new SqlDataAdapter(sqlCmd1);
                    DataTable Dt1 = new DataTable();
                    sda2.Fill(Dt1);
                    //grdSetGroupTest.Rows.Clear();
                    if (Dt1.Rows.Count > 0)
                    {
                        //grdSetGroupTest.RowCount = Dt1.Rows.Count;
                    }
                    else
                    {
                        //grdSetGroupTest.RowCount = 1;
                    }
                    int Row = 0;


                    foreach (DataRow dr in Dt1.Rows)
                    {
                        double Rate = 0;
                        //************

                        //************

                        try
                        {
                            Rate = Convert.ToDouble(Dt1.Rows[Row]["TstMst_Rate"].ToString());
                        }
                        catch { }
                        //TotalRate += Rate;
                        SetGroupTest stGPtst = new SetGroupTest()
                        {
                            StGrpTst_TstCode = Convert.ToDouble(Dt1.Rows[Row]["StGrpTst_TstCode"].ToString()),
                            TstMst_name = Dt1.Rows[Row]["TstMst_name"].ToString(),
                            TstMst_Rate = Convert.ToDouble(Dt1.Rows[Row]["TstMst_Rate"].ToString()),
                            //TotalRate = TotalRate,
                            StGrpTst_OrderBy = Convert.ToDouble(Dt1.Rows[Row]["StGrpTst_OrderBy"].ToString()),
                            StGrpTst_Sh = Convert.ToInt32(Dt1.Rows[Row]["StGrpTst_Sh"].ToString()),
                            Department = Dt1.Rows[Row]["Department"].ToString(),
                            Sample = Dt1.Rows[Row]["Sample"].ToString()

                        };
                        //gpTst.Add(stGPtst);

                        if (OldGroupTest == "")
                        {
                            //OldRefrence1 = "\t" + grdNewRefRange1["Nrml_Sex", i].Value.ToString() + grdNewRefRange1["Nrml_Agefr", i].Value.ToString() + grdNewRefRange1["Nrml_Agetype", i].Value.ToString() + grdNewRefRange1["Nrml_Ageto", i].Value.ToString() + grdNewRefRange1["Nrml_Agetypeto", i].Value.ToString() + grdNewRefRange1["Nrml_Low", i].Value.ToString() + grdNewRefRange1["Nrml_High", i].Value.ToString() + grdNewRefRange1["Nrml_Crtlow", i].Value.ToString() + grdNewRefRange1["Nrml_Crthigh", i].Value.ToString() + grdNewRefRange1["Nrml_Norage", i].Value.ToString() + "";
                            OldGroupTest = "\t" + Dt1.Rows[0]["TstMst_name"].ToString() + Convert.ToDouble(Dt1.Rows[0]["TstMst_Rate"].ToString()) + Convert.ToDouble(Dt1.Rows[0]["StGrpTst_OrderBy"].ToString()) + Convert.ToInt32(Dt1.Rows[0]["StGrpTst_Sh"].ToString()) + Dt1.Rows[0]["Department"].ToString() + Dt1.Rows[0]["Sample"].ToString() + "";
                        }
                        else
                        {
                            try
                            {
                                //OldRefrence1 = OldRefrence1 + "\r\n\t" + grdNewRefRange1["Nrml_Sex", i].Value.ToString() + grdNewRefRange1["Nrml_Agefr", i].Value.ToString() + grdNewRefRange1["Nrml_Agetype", i].Value.ToString() + grdNewRefRange1["Nrml_Ageto", i].Value.ToString() + grdNewRefRange1["Nrml_Agetypeto", i].Value.ToString() + grdNewRefRange1["Nrml_Low", i].Value.ToString() + grdNewRefRange1["Nrml_High", i].Value.ToString() + grdNewRefRange1["Nrml_Crtlow", i].Value.ToString() + grdNewRefRange1["Nrml_Crthigh", i].Value.ToString() + grdNewRefRange1["Nrml_Norage", i].Value.ToString() + "";
                                OldGroupTest = OldGroupTest + "\r\n\t" + Dt1.Rows[0]["TstMst_name"].ToString() + Convert.ToDouble(Dt1.Rows[0]["TstMst_Rate"].ToString()) + Convert.ToDouble(Dt1.Rows[0]["StGrpTst_OrderBy"].ToString()) + Convert.ToInt32(Dt1.Rows[0]["StGrpTst_Sh"].ToString()) + Dt1.Rows[0]["Department"].ToString() + Dt1.Rows[0]["Sample"].ToString() + "";
                            }
                            catch { }


                        }
                        Row += 1;
                    }
                    //int TestIds = 0;
                    //int flag = 0;
                    //TestId = Convert.ToInt32(txtTestName.Tag);
                    //string Template = "";
                    //bool Default = false;
                    //bool Iscritical = false;
                    //int TemplateDefault = 0;
                    //int TempIsCritical = 0;
                    //SqlCommand cmd1 = new SqlCommand("Delete from Result_Template Where RsltTmpt_TestId =" + TestId + "", sqlcon);
                    //cmd1.ExecuteNonQuery();

                    //for (int i = 0; i < grdResultTemplate.Rows.Count; i++)
                    //{
                    //    try
                    //    {
                    //        TemplateDefault = 0;
                    //        TempIsCritical = 0;
                    //        if (grdResultTemplate[1, i].Value != null)
                    //        {
                    //            SqlCommand cmd = new SqlCommand("StProc_INSERT_RESULTTEMPLATE", Common.myConnectionVM);
                    //            cmd.CommandType = CommandType.StoredProcedure;
                    //            cmd.Parameters.Add("@RsltTmpt_Template", SqlDbType.NVarChar).Value = grdResultTemplate[1, i].Value;
                    //            cmd.Parameters.Add("@RsltTmpt_TestId", SqlDbType.Int).Value = txtTestName.Tag;
                    //            Default = Convert.ToBoolean(grdResultTemplate[2, i].Value);
                    //            Iscritical = false;
                    //            try { Iscritical = Convert.ToBoolean(grdResultTemplate["NCriticalVal", i].Value); } catch { }
                    //            if (Default == true)
                    //            {
                    //                TemplateDefault = 1;
                    //            }
                    //            if (Iscritical == true)
                    //            {
                    //                TempIsCritical = 1;
                    //            }
                    //            cmd.Parameters.Add("@RsltTmpt_default", SqlDbType.Int).Value = TemplateDefault;

                    //            cmd.Parameters.Add("@RsltTmpt_IsCritical", SqlDbType.Int).Value = TempIsCritical;
                    //            cmd.ExecuteNonQuery();
                    //        }

                    //    }

                    //    catch (Exception exe)
                    //    {
                    //    }
                    //}
                    //**********CHECKING *********************
                    string ModiDes = "";
                    if (tests.TstMst_name != O_txtTestName)
                    {
                        ModiDes = "Testname Changed From " + O_txtTestName + " To " + tests.TstMst_name + ",";
                    }
                    if (tests.TstMst_Type != O_txtTestType)
                    {
                        ModiDes = ModiDes + "Testtype  Changed From " + O_txtTestType + " To " + tests.TstMst_Type + ",";
                    }
                    if (tests.Department != O_txtDepartment)
                    {
                        ModiDes = ModiDes + "Department Changed From " + O_txtDepartment + " To " + tests.Department + ",";
                    }
                    if (tests.Method != O_txtMethod)
                    {
                        ModiDes = ModiDes + "Method Changed From " + O_txtMethod + " To " + tests.Method + ",";
                    }
                    if (tests.Division != O_txtDivision)
                    {
                        ModiDes = ModiDes + "Division Changed From " + O_txtDivision + " To " + tests.Division + ",";
                    }
                    if (tests.TstMst_Rate.ToString() != O_txtRate)
                    {
                        ModiDes = ModiDes + "Rate Changed From " + O_txtRate + " To " + tests.TstMst_Rate.ToString() + ",";
                    }

                    if (tests.Unit != O_txtUnit)
                    {
                        ModiDes = ModiDes + "Unit Changed From " + O_txtUnit + " To " + tests.Unit + ",";
                    }
                    if (tests.Technology != O_txtTechnology)
                    {
                        ModiDes = ModiDes + "Technology Changed From " + O_txtTechnology + " To " + tests.Technology + ",";
                    }

                    if (tests.Sample != O_txtSample)
                    {
                        ModiDes = ModiDes + "Sample Changed From " + O_txtSample + " To " + tests.Sample + ",";
                    }
                    if (tests.Volume != O_txtVolume)
                    {
                        ModiDes = ModiDes + "Volume Changed From " + O_txtVolume + " To " + tests.Volume + ",";
                    }

                    if (tests.CtOfTime != O_txtCutOfTime)
                    {
                        ModiDes = ModiDes + "Cutoftime Changed From " + O_txtCutOfTime + " To " + tests.CtOfTime + ",";
                    }
                    if (tests.TstMst_Mode != O_txtTestMode)
                    {
                        ModiDes = ModiDes + "Testmode Changed From " + O_txtTestMode + " To " + tests.TstMst_Mode + ",";
                    }

                    if (tests.TstMst_ShortName != O_txtShortName)
                    {
                        ModiDes = ModiDes + "Shortname Changed From " + O_txtShortName + " To " + tests.TstMst_ShortName + ",";
                    }
                    if (tests.TstMst_ReportON != O_cmbRptOn1)
                    {
                        ModiDes = ModiDes + "Rpton1 Changed From " + O_cmbRptOn1 + " To " + tests.TstMst_ReportON + ",";
                    }

                    if (tests.TstMst_rptonDMH != O_cmbRptOn2)
                    {
                        ModiDes = ModiDes + "Rpton2 Changed From " + O_cmbRptOn2 + " To " + tests.TstMst_rptonDMH + ",";
                    }


                    if (tests.PerformAt != O_txtPerformedat)
                    {
                        ModiDes = ModiDes + "Performnce Changed From " + O_txtPerformedat + " To " + tests.PerformAt + ",";
                    }
                    if (tests.InternalNote != O_txtInternalNote)
                    {
                        ModiDes = ModiDes + "Internalnote Changed From " + O_txtInternalNote + " To " + tests.InternalNote + ",";
                    }

                    if (tests.ChkCommonTech != O_chkCommonTech)
                    {
                        ModiDes = ModiDes + "Commontech Changed From " + O_chkCommonTech + " To " + tests.ChkCommonTech + ",";
                    }
                    if (tests.AvoidRsltEntry != O_chkAvoidRsltEntry)
                    {
                        ModiDes = ModiDes + "AvoidRsltEntry Changed From " + O_chkAvoidRsltEntry + " To " + tests.AvoidRsltEntry + ",";
                    }
                    if (tests.chkHideHead != O_chkHideHead)
                    {
                        ModiDes = ModiDes + "HideHead Changed From " + O_chkHideHead + " To " + tests.chkHideHead + ",";
                    }
                    if (tests.chkNABL != O_chkNABL)
                    {
                        ModiDes = ModiDes + "NABL Changed From " + O_chkNABL + " To " + tests.chkNABL + ",";
                    }

                    if (tests.chkSendSMS != O_chkSendSMS)
                    {
                        ModiDes = ModiDes + "ChkSendSMS Changed From " + O_chkSendSMS + " To " + tests.chkSendSMS + ",";
                    }
                    if (tests.chkSampleBarcode != O_chkSampleBarcode)
                    {
                        ModiDes = ModiDes + "ChkSampleBarcode Changed From " + O_chkSampleBarcode + " To " + tests.chkSampleBarcode + ",";
                    }
                    if (tests.chkFreeTest != O_chkFreeTest)
                    {
                        ModiDes = ModiDes + "ChkFreeTest Changed From " + O_chkFreeTest + " To " + tests.chkFreeTest + ",";
                    }
                    ModiDes = ModiDes + "\r\n\t" + "Reference Changed From " + OldRefrence1 + " To " + NewRefrence1 + ",";
                    ModiDes = ModiDes + "\r\n\t" + "Grouptest Changed From " + OldGroupTest + " To " + NewGroupTest + ",";
                    DateTime TempDatetime = DateTime.Now;
                    string TempDat = TempDatetime.ToString("dd-MM-yyyy hh:mm:ss tt");
                    int txtid = 0;
                    try
                    {
                        txtid = Convert.ToInt32(tests.TstMst_Key);
                    }
                    catch { }
                    SqlCommand cmd = new SqlCommand("StProc_INSERT_LogDetails_Mst", sqlcon);
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@Log_TransNo", (txtid));
                    cmd.Parameters.AddWithValue("@Log_DateTime", TempDatetime);
                    cmd.Parameters.AddWithValue("@Log_Desc", ModiDes);
                    cmd.Parameters.AddWithValue("@Log_Form", "Test_Master");
                    cmd.Parameters.AddWithValue("@Log_User", l.Usr_Name);
                    cmd.Parameters.AddWithValue("@Log_System", System.Environment.MachineName);
                    cmd.Parameters.AddWithValue("@Log_UserId", l.Usr_key);
                    cmd.Parameters.AddWithValue("@Log_CmpyId", l.BrMst_Key);
                    cmd.ExecuteNonQuery();
                    //****************************************
                    sqlcon.Close();
                    // AutoFillTextBox();
                    //btn_New_Click(null, null);
                }
                catch (Exception ex)
                {
                    string x = ex.Message;

                    //var x = ex.Message;
                    //var y = ex.InnerException;
                    //MessageBox.Show(ex.Message);
                    //return;
                }
                return Json(new { Result = "OK" });
            }
            catch (Exception exe)
            {
                return Json(new { Result = "ERROR" });
            }

        }
        public static DataTable getTable(string QryTable)
        {
            connection con = new connection();
            SqlConnection sqlcon = new SqlConnection();
            sqlcon = con.dbcon();
            sqlcon.Open();
            SqlCommand cmd = new SqlCommand();
            cmd.Connection = sqlcon;
            cmd.CommandType = CommandType.Text;
            cmd.CommandText = QryTable;
            cmd.ExecuteNonQuery();
            SqlDataAdapter sda = new SqlDataAdapter(cmd);
            DataTable dt = new DataTable();
            sda.Fill(dt);
            sqlcon.Close();
            return dt;
        }
        //RfrdLabSrch
        public JsonResult RfrdLabSrch(string term)
        {
            try
            {
                List<testDetails> tstsss = new List<testDetails>();
                //var refLabLst = (from num in db.TestRef_Mst
                //          select num).Distinct(term=>term.).ToList();
                var refLabLst = db.TestRef_Mst.Where(t => t.TestRef_RefName.Contains(term)).Select(tst => new { tst.TestRef_RefName, tst.TestRef_Id }).Distinct().ToList();
                //var query = (from p in db.TestRef_Mst
                //             select new
                //             {
                //                x = p.TestRef_RefName,
                //                y=p.TestRef_RefName
                //             }).Distinct().ToList();
                return Json(new { Result = "OK", Records = refLabLst }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception exe)
            {
                return Json(new { Result = "ERROR", message = exe.Message });
            }
        }
        //GpTstDls
        public JsonResult GpTstDlsSrch(string term)
        {
            //if (_TestTypeId == -2 || _TestTypeId == -12 || _TestTypeId == -15 || _TestTypeId == -24)
            var gpTst = db.Test_Mst.Where(tst => tst.TstMst_name.Contains(term)/* && (tst.TstMst_TypeId == -2 || tst.TstMst_TypeId == -12 || tst.TstMst_TypeId == -15 || tst.TstMst_TypeId == -24)*/).Select(t => new { t.TstMst_Key, t.TstMst_name }).ToList();
            return Json(new { Result = "OK", Record = gpTst }, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GpTstDls(string term, double tstkey)
        {
            try
            {
                int Row = 0;
                string txtGrpAmount = "";
                List<SetGroupTest> gpTstDls = new List<SetGroupTest>();
                SqlConnection sqlcon = new SqlConnection();
                sqlcon = con.dbcon();
                SqlCommand sqlCmd1 = new SqlCommand();
                sqlCmd1.Connection = sqlcon;
                sqlCmd1.CommandType = CommandType.Text;
                //sqlCmd1.CommandText = "SELECT '' as SlNo,dbo.Set_GroupTest.StGrpTst_TstCode, dbo.Test_Mst.TstMst_name,dbo.Test_Mst.TstMst_Rate, dbo.Set_GroupTest.StGrpTst_OrderBy," + Environment.NewLine
                //                    + "dbo.Set_GroupTest.StGrpTst_Sh, dbo.Masters.Mstr_Desc AS Department, Masters_1.Mstr_Desc AS Sample" + Environment.NewLine
                //                    + "FROM dbo.Set_GroupTest WITH (NOLOCK) LEFT OUTER JOIN" + Environment.NewLine
                //                    + "dbo.Test_Mst WITH (NOLOCK) ON dbo.Set_GroupTest.StGrpTst_TstCode = dbo.Test_Mst.TstMst_Key LEFT OUTER JOIN" + Environment.NewLine
                //                    + "dbo.Masters WITH (NOLOCK) ON dbo.Test_Mst.TstMst_DeptId = dbo.Masters.Mstr_Key LEFT OUTER JOIN dbo.Masters AS Masters_1 WITH (NOLOCK) ON dbo.Test_Mst.tst_SmplTypeId = Masters_1.Mstr_Key" + Environment.NewLine
                //                    + "WHERE (dbo.Test_Mst.TstMst_Key=" + Convert.ToInt32(tstkey) + ") ORDER BY StGrpTst_OrderBy,StGrpTst_Key";
                //sqlCmd1.CommandText = "";
                //SqlDataAdapter sda2 = new SqlDataAdapter(sqlCmd1);
                //DataTable Dt1 = new DataTable();
                //sda2.Fill(Dt1);
                var x = db.Test_Mst.Where(tst => tst.TstMst_Key == tstkey &&
                  tst.TstMst_name == term).Select(t => new { t.TstMst_Key, t.TstMst_name, t.TstMst_Rate, t.TstMst_DeptId, t.TstMst_Sample }).ToList();
                sqlCmd1.CommandText = " SELECT TstMst_Rate FROM dbo.Test_Mst WITH (NOLOCK) WHERE dbo.Test_Mst.TstMst_Key= " + Convert.ToInt32(tstkey) + " ";
                SqlDataAdapter sda = new SqlDataAdapter(sqlCmd1);
                DataTable Dt2 = new DataTable();
                sda.Fill(Dt2);
                txtGrpAmount = Convert.ToString(Dt2.Rows[0]["TstMst_Rate"]);
                double Rate = 0;
                double TotalRate = 0;
                foreach (var dr in x)
                {

                    //************
                    var dptmnt = db.Masters.Where(mstr => mstr.Mstr_Key == dr.TstMst_DeptId).Select(m => m.Mstr_Desc).FirstOrDefault();
                    //************

                    try
                    {
                        Rate = Convert.ToDouble(dr.TstMst_Rate.ToString());
                    }
                    catch { }
                    TotalRate += Rate;
                    SetGroupTest stGPtst = new SetGroupTest()
                    {
                        StGrpTst_TstCode = Convert.ToDouble(dr.TstMst_Key.ToString()),
                        TstMst_name = dr.TstMst_name.ToString(),
                        TstMst_Rate = Convert.ToDouble(dr.TstMst_Rate.ToString()),
                        TotalRate = TotalRate,
                        //StGrpTst_OrderBy = Convert.ToDouble(Dt1.Rows[Row]["StGrpTst_OrderBy"].ToString()),
                        //StGrpTst_Sh = Convert.ToInt32(Dt1.Rows[Row]["StGrpTst_Sh"].ToString()),
                        Department = dptmnt.ToString(),
                        Sample = dr.TstMst_Sample,
                        txtGrpAmount = txtGrpAmount
                    };

                    //gpTst.Add(stGPtst);
                    gpTstDls.Add(stGPtst);
                    Row += 1;
                }
                return Json(new { Result = "OK", Records = gpTstDls }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception exe)
            {
                return Json(new { Result = "ERROR", message = exe.Message });
            }
        }

        public JsonResult dctrLookUpEntry(int SrchCode)
        {


            if (SrchCode == 0)
            {
                try
                {
                    var dctrDls = db.AccountHeads_Mst.Where(a => a.AhMst_Type == "Doctor").Select(acc => new { acc.AhMst_pName, acc.AhMst_Key }).ToList();
                    return Json(new { Result = "OK", Records = dctrDls }, JsonRequestBehavior.AllowGet);
                }
                catch (Exception exe)
                {
                    return Json(new { Result = "ERROR" });
                }
            }
            else if (SrchCode == 1)
            {
                try
                {
                    var dctrDls = db.Masters.Where(mstr => mstr.Mstr_Type == "Area").Select(m => new { m.Mstr_Desc, m.Mstr_Key }).ToList();
                    return Json(new { Result = "OK", Records = dctrDls }, JsonRequestBehavior.AllowGet);
                }
                catch (Exception exe)
                {
                    return Json(new { Result = "ERROR" });
                }
            }
            else if (SrchCode == 2)
            {
                try
                {
                    var dctrDls = db.Masters.Where(mstr => mstr.Mstr_Type == "DrCatagory").Select(m => new { m.Mstr_Desc, m.Mstr_Key }).ToList();
                    return Json(new { Result = "OK", Records = dctrDls }, JsonRequestBehavior.AllowGet);
                }
                catch (Exception exe)
                {
                    return Json(new { Result = "ERROR" });
                }
            }
            else if (SrchCode == 3)
            {
                try
                {
                    var dctrDls = db.Masters.Where(mstr => mstr.Mstr_Type == "Specilzed").Select(m => new { m.Mstr_Desc, m.Mstr_Key }).ToList();
                    return Json(new { Result = "OK", Records = dctrDls }, JsonRequestBehavior.AllowGet);
                }
                catch (Exception exe)
                {
                    return Json(new { Result = "ERROR" });
                }
            }
            if (SrchCode == 4)
            {
                try
                {
                    var dctrDls = db.AccountHeads_Mst.Where(a => a.AhMst_Type == "Hosp").Select(acc => new { acc.AhMst_pName, acc.AhMst_Key }).ToList();
                    return Json(new { Result = "OK", Records = dctrDls }, JsonRequestBehavior.AllowGet);
                }
                catch (Exception exe)
                {
                    return Json(new { Result = "ERROR" });
                }
            }
            else
            {
                return Json(new { Result = "OK" });
            }
        }

        public JsonResult DoctorDls(string dctrName, int dctrKey)
        {
            try
            {
                string Chkbase64 = "";
                List<doctorDtls> dctrDls = new List<doctorDtls>();
                string txtDocId = "", txtDocName = "", txtDocAddres = "", txtDrcode = "", txtDocMobile = "", txtDocPhone = "", txtDocEmail = "", txtDocArea = "";
                string txtDocConPrsn = "", txtDocSpecialised = "", txtCatagory = "", txtDocHosp = "", txtDocEdu = "", txtHospAddress = "", txtLandMark = "", txtPRO = "";
                string txtOthrNote = "", dtpDob = "", dtpWedding = "", txtNote = "", txtGroup = "", nGROUPLEVEL = "", nLEVEL1 = "", saveFlag = "", txtDocSplzdKey = "", txtCatgKey = "";
                string txtDocHospKey = "";
                //txtGroup txtGroupKey nGROUPLEVEL nLEVEL1 saveFlag 
                bool chkDocDis = false, chkenbleinc = false, chkActive = false, chkEmployee = false, chkEmailReport = false, optMale = false, optFemale = false, opnHospAddrss = false, opnHomeAddrss = false;
                Image pb_sign = null;
                double docKey = 0, txtDocAreaKey = 0, txtGroupKey = 0;
                SqlConnection sqlcon = new SqlConnection();
                sqlcon = con.dbcon();
                sqlcon.Open();
                SqlCommand sqlcmd0 = new SqlCommand();
                sqlcmd0.Connection = sqlcon;
                sqlcmd0.CommandType = CommandType.Text;
                sqlcmd0.CommandText = "SELECT     dbo.AccountHeads_Mst.AhMst_Key,dbo.AccountHeads_Mst.AhMst_IsDiscPat,dbo.AccountHeads_Mst.AhMst_Incen, dbo.AccountHeads_Mst.AhMst_HospName,  dbo.AccountHeads_Mst.AhMst_HospAddress,dbo.AccountHeads_Mst.AhMst_pName, dbo.AccountHeads_Mst.AhMst_Ismale, dbo.AccountHeads_Mst.AhMst_drEdDet,dbo.AccountHeads_Mst.AhMst_DrCode,dbo.AccountHeads_Mst.AhMst_PRO,dbo.AccountHeads_Mst.AhMst_OthrNote,dbo.AccountHeads_Mst.LEVEL1,dbo.AccountHeads_Mst.GROUPLEVEL,dbo.AccountHeads_Mst.GROUPCODE,G.HEAD As GroupName," + Environment.NewLine
                      + "dbo.AccountHeads_Mst.AhMst_SplID, dbo.Masters.Mstr_Desc AS Specialised, dbo.AccountHeads_Mst.AhMst_Address, dbo.AccountHeads_Mst.AhMst_AreaID, " + Environment.NewLine
                      + "Masters_1.Mstr_Desc AS Area, dbo.AccountHeads_Mst.AhMst_CatgryId,MstCat.Mstr_Desc as DrCatagory, dbo.AccountHeads_Mst.AhMst_ContPrsn, dbo.AccountHeads_Mst.AhMst_Phno, dbo.AccountHeads_Mst.AhMst_mobile, " + Environment.NewLine
                      + "dbo.AccountHeads_Mst.AhMst_HosId, dbo.AccountHeads_Mst.AhMst_Dob, dbo.AccountHeads_Mst.AhMst_WedAnn, dbo.AccountHeads_Mst.AhMst_Email, " + Environment.NewLine
                      + "dbo.AccountHeads_Mst.AhMst_SendMail, dbo.AccountHeads_Mst.AhMst_IsActive, dbo.AccountHeads_Mst.AhMst_Note, dbo.AccountHeads_Mst.AhMst_IssDate,dbo.AccountHeads_Mst.AhMst_IsEmp,dbo.AccountHeads_Mst.AhMst_IsDocBod,dbo.AccountHeads_Mst.AhMst_IsDocWedng, " + Environment.NewLine
                      + "dbo.AccountHeads_Mst.AhMst_IsCrdHldr, dbo.AccountHeads_Mst.AhMst_Type,dbo.AccountHeads_Mst.AhMst_Landmark,dbo.AccountHeads_Mst.AhMst_Image,dbo.AccountHeads_Mst.AhMst_DefltAddress, AccountHeads_Mst_1.AhMst_pName AS Hospital,[SetCorp_StaffId] as staffid,AccountHeads_Mst_2.AhMst_pName as pro" + Environment.NewLine
                      + "FROM dbo.AccountHeads_Mst WITH (NOLOCK) LEFT JOIN GROUPS G On dbo.AccountHeads_Mst.GROUPCODE=G.CODE LEFT OUTER JOIN" + Environment.NewLine
                      + "dbo.AccountHeads_Mst AS AccountHeads_Mst_1 WITH (NOLOCK) ON dbo.AccountHeads_Mst.AhMst_HosId = AccountHeads_Mst_1.AhMst_Key LEFT OUTER JOIN" + Environment.NewLine
                      + "dbo.Masters WITH (NOLOCK) ON dbo.AccountHeads_Mst.AhMst_SplID = dbo.Masters.Mstr_Key LEFT OUTER JOIN" + Environment.NewLine
                      + "dbo.Masters AS Masters_1 WITH (NOLOCK) ON dbo.AccountHeads_Mst.AhMst_AreaID = Masters_1.Mstr_Key LEFT OUTER JOIN " + Environment.NewLine
                      + "dbo.Masters AS MstCat WITH (NOLOCK) ON dbo.AccountHeads_Mst.AhMst_CatgryId = MstCat.Mstr_Key  left outer join SetDoctor_Staff on dbo.AccountHeads_Mst.AhMst_Key = [SetCorp_CorpId] left outer join dbo.AccountHeads_Mst AS AccountHeads_Mst_2 on[SetCorp_StaffId] = AccountHeads_Mst_2.AhMst_Key WHERE dbo.AccountHeads_Mst.AhMst_Key=" + dctrKey + "";

                SqlDataAdapter sd0 = new SqlDataAdapter(sqlcmd0);
                DataTable dt0 = new DataTable();
                sd0.Fill(dt0);

                txtDocId = dt0.Rows[0]["AhMst_Key"].ToString();

                txtDocName = dt0.Rows[0]["AhMst_pName"].ToString();
                docKey = Convert.ToDouble(dt0.Rows[0]["AhMst_Key"].ToString());

                txtDocAddres = dt0.Rows[0]["AhMst_Address"].ToString();
                txtDrcode = dt0.Rows[0]["AhMst_DrCode"].ToString();
                txtDocMobile = dt0.Rows[0]["AhMst_mobile"].ToString();
                txtDocPhone = dt0.Rows[0]["AhMst_Phno"].ToString();
                txtDocEmail = dt0.Rows[0]["AhMst_Email"].ToString();

                txtDocArea = dt0.Rows[0]["Area"].ToString();
                txtDocAreaKey = Convert.ToDouble(dt0.Rows[0]["AhMst_AreaID"].ToString());

                txtDocConPrsn = dt0.Rows[0]["AhMst_ContPrsn"].ToString();

                txtDocSpecialised = dt0.Rows[0]["Specialised"].ToString();
                txtDocSplzdKey = dt0.Rows[0]["AhMst_SplID"].ToString();

                txtCatagory = dt0.Rows[0]["DrCatagory"].ToString();
                txtCatgKey = dt0.Rows[0]["AhMst_CatgryId"].ToString();

                txtDocEdu = dt0.Rows[0]["AhMst_drEdDet"].ToString();

                txtHospAddress = dt0.Rows[0]["AhMst_HospAddress"].ToString();

                txtDocHosp = dt0.Rows[0]["AhMst_HospName"].ToString();
                txtDocHospKey = dt0.Rows[0]["AhMst_HosId"].ToString();

                txtLandMark = dt0.Rows[0]["AhMst_Landmark"].ToString();
                txtPRO = dt0.Rows[0]["pro"].ToString();
                txtOthrNote = dt0.Rows[0]["AhMst_OthrNote"].ToString();
                try
                {
                    var x = Convert.ToBase64String((byte[])dt0.Rows[0]["AhMst_Image"]);
                    //MemoryStream ms = new MemoryStream((byte[])dt0.Rows[0]["AhMst_Image"]);
                    //pb_sign = Image.FromStream(ms);
                    Chkbase64 = Convert.ToBase64String((byte[])dt0.Rows[0]["AhMst_Image"]);
                    //Chks =dt0.Rows[0]["AhMst_Image"].ToString();

                    //pb_sign.SizeMode = PictureBoxSizeMode.StretchImage;
                    //pb_sign.Refresh();


                }
                catch(Exception exe)
                {
                    var msg = exe.Message;
                    var innr = exe.InnerException;
                    //pb_sign.Image = null;
                }

                int TempBOD = 0;
                int TempWdDy = 0;
                try
                {
                    TempBOD = Convert.ToInt32(dt0.Rows[0]["AhMst_IsDocBod"]);
                }
                catch { }
                try
                {
                    TempWdDy = Convert.ToInt32(dt0.Rows[0]["AhMst_IsDocWedng"]);
                }
                catch { }
                dtpDob = dt0.Rows[0]["AhMst_Dob"].ToString();
                //if (TempBOD == 0)
                //{
                //    dtpDob.Checked = false;
                //}
                //else
                //{
                //    dtpDob.Checked = true;
                //}

                /*dtpDob = dt0.Rows[0]["AhMst_Dob"].ToString()*/
                //;
                dtpWedding = dt0.Rows[0]["AhMst_WedAnn"].ToString();
                //if (TempWdDy == 0)
                //{
                //    dtpWedding.Checked = false;
                //}
                //else
                //{
                //    dtpWedding.Checked = true;
                //}
                //dtpCardIssue.Text = dt0.Rows[0]["AhMst_IssDate"].ToString();
                txtNote = dt0.Rows[0]["AhMst_Note"].ToString();
                int Incen = 0;
                try { Incen = Convert.ToInt32(dt0.Rows[0]["AhMst_Incen"]); } catch { }

                int ndiscpat = 0;
                try { ndiscpat = Convert.ToInt32(dt0.Rows[0]["AhMst_IsDiscPat"]); } catch { }
                if (ndiscpat == 0)
                {
                    chkDocDis = false;

                }
                else
                {
                    chkDocDis = true;
                }
                if (Incen == 0)
                {
                    chkenbleinc = false;

                }
                else
                {
                    chkenbleinc = true;
                }
                if (dt0.Rows[0]["AhMst_IsActive"].ToString() == "1")
                {
                    chkActive = true;
                }
                else
                {
                    chkActive = false;
                }
                if (dt0.Rows[0]["AhMst_IsEmp"].ToString() == "1")
                {
                    chkEmployee = true;
                }
                else
                {
                    chkEmployee = false;
                }

                //if (dt0.Rows[0]["AhMst_IsCrdHldr"].ToString() == "1")
                //{
                //    chkCardHolder.Checked = true;
                //    label13.Visible = true;
                //    dtpCardIssue.Visible = true;
                //}
                //else
                //{
                //    label13.Visible = false;
                //    dtpCardIssue.Visible = false;
                //}
                if (dt0.Rows[0]["AhMst_SendMail"].ToString() == "1")
                {
                    chkEmailReport = true;
                }
                if (dt0.Rows[0]["AhMst_Ismale"].ToString() == "M")
                {
                    optMale = true;

                }
                else
                {
                    optFemale = true;
                }

                if (dt0.Rows[0]["AhMst_DefltAddress"].ToString() == "1")
                {
                    opnHospAddrss = true;
                    opnHomeAddrss = false;
                }
                else
                {
                    opnHomeAddrss = true;
                    opnHospAddrss = false;
                }
                //************************************************
                txtGroup = dt0.Rows[0]["GroupName"].ToString();
                txtGroup = dt0.Rows[0]["GROUPCODE"].ToString();
                nGROUPLEVEL = dt0.Rows[0]["GROUPLEVEL"].ToString();
                nLEVEL1 = dt0.Rows[0]["LEVEL1"].ToString();
                //*********************************************************************************
                doctorDtls dctrs = new doctorDtls()
                {
                    Chkbase64 = Chkbase64,
                    pb_sign = pb_sign,
                    dctr_pName = txtDocName,
                    dctr_Key = txtDocId,
                    dctr_Code = txtDrcode,
                    home_addrChk = opnHomeAddrss,
                    hosp_addrChk = opnHospAddrss,
                    ndiscpat = ndiscpat,
                    Incen = Incen,
                    dctr_homeaddr = txtDocAddres,
                    DocMobile = txtDocMobile,
                    DocPhone = txtDocPhone,
                    DocEmail = txtDocEmail,
                    DocArea = txtDocArea,
                    DocAreaKey = txtDocAreaKey,
                    LandMark = txtLandMark,
                    DocConPrsn = txtDocConPrsn,
                    Catagory = txtCatagory,
                    CatgKey = Convert.ToDouble(txtCatgKey),
                    DocSpecialised = txtDocSpecialised,
                    DocSplsdKey = Convert.ToDouble(txtDocSplzdKey),
                    DocEdu = txtDocEdu,
                    DocHosp = txtDocHosp,
                    dctr_hospaddr = txtHospAddress,
                    DocHospKey = Convert.ToDouble(txtDocHospKey),
                    OthrNote = txtOthrNote,
                    txtPRO = txtPRO,
                    doc_Dob = dtpDob,
                    doc_Wedding = dtpWedding,
                    chkActive = chkActive,
                    chkEmailReport = chkEmailReport,
                    chkEmployee = chkEmployee,
                    optMale = optMale,
                    optFemale = optFemale,
                    dctr_Note = txtNote
                };
                dctrDls.Add(dctrs);

                //*********************************************************************************
                saveFlag = "Edit";
                sqlcon.Close();
                return Json(new { Result = "OK", Records = dctrDls }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception exe)
            {
                return Json(new { Result = "ERROR" });
            }
        }
        public JsonResult DoctorSave(doctorDtls dctls)
        {
            try
            {
                logindetails l = Session["logindls"] as logindetails;
                string ExsistDrcode = "";
                string TempExsistDrcode = "";
                string nGroupCode = "";
                string saveFlag = "";
                //saveFlag = dctls.saveFlag;
                string base64Strng = dctls.Chkbase64;
                string[] v = base64Strng.Split(',');
                SqlConnection sqlcon = new SqlConnection();
                sqlcon = con.dbcon();
                sqlcon.Open();
                if (nGroupCode == "")
                {
                    nGroupCode = "45";
                    // MessageBox.Show("Enter Group", cPublic.ProjectName, MessageBoxButtons.OK, MessageBoxIcon.Exclamation);
                    // txtGroup.Focus();
                    // return;
                }
                //***DoctName And  Exsists Checking**
                string sigName = dctls.imgSrch;
                string filePathName = Server.MapPath("~/") + dctls.imgSrch;
                //double x = 0;
                //if (System.IO.File.Exists("~/" + filePathName))
                //{
                //    int ss = 0;
                //}
                //else
                //{
                //    int ss = 1;
                //}
                var x = Convert.ToDouble(dctls.dctr_Key);
                int DocterID = 0;
                int ExsistDoctid = 0;
                SqlCommand cmd5;
                double doc_key = 0;
                var docdtls = db.AccountHeads_Mst.Where(a => a.AhMst_Key == x).ToList();
                foreach (var dls in docdtls)
                {
                    db.AccountHeads_Mst.Remove(dls);
                }
                db.SaveChanges();
                if (docdtls.Count > 0)
                {
                    saveFlag = "Old";
                }
                else
                {
                    saveFlag = "New";
                }
                if (saveFlag == "New")
                {
                    //(db.Test_Mst.Max(tst => tst.TstMst_Key)) + 1;
                    double sx = db.AccountHeads_Mst.Max(a => a.AhMst_Key);
                    doc_key = db.AccountHeads_Mst.Max(acc => acc.AhMst_Key) + 1;
                    cmd5 = new SqlCommand("select isnull(AhMst_Key,0) from [dbo].[AccountHeads_Mst] WITH (NOLOCK) where [AhMst_Type]='Doctor' And [AhMst_pName]='" + dctls.dctr_pName + "'", sqlcon);
                }
                else
                {

                    try
                    {
                        doc_key = Convert.ToInt32(dctls.dctr_Key);
                        ExsistDoctid = Convert.ToInt32(dctls.dctr_Key);
                    }
                    catch { }
                    cmd5 = new SqlCommand("select isnull(AhMst_Key,0) from [dbo].[AccountHeads_Mst] WITH (NOLOCK) where [AhMst_Type]='Doctor' And [AhMst_pName]='" + dctls.dctr_pName + "' And AhMst_Key!=" + ExsistDoctid + " ", sqlcon);
                }

                try
                {

                    DocterID = Convert.ToInt32(cmd5.ExecuteScalar());

                }
                catch { }

                if (DocterID != 0)
                {
                    //MessageBox.Show("Doctor Name Already Exsists", cPublic.ProjectName);
                    //txtDocName.Focus();
                    //return;

                }


                //**************************************************
                TempExsistDrcode = dctls.dctr_Code;
                if (TempExsistDrcode != "")
                {
                    if (saveFlag == "New")
                    {
                        cmd5 = new SqlCommand("select isnull(AhMst_pName,'') from [dbo].[AccountHeads_Mst] WITH (NOLOCK) where [AhMst_Type]='Doctor' And ISNULL(AhMst_DrCode,'')='" + dctls.dctr_Code + "'", sqlcon);
                    }
                    else
                    {
                        try
                        {
                            ExsistDoctid = Convert.ToInt32(dctls.dctr_Key);
                        }
                        catch { }
                        cmd5 = new SqlCommand("select isnull(AhMst_pName,'') from [dbo].[AccountHeads_Mst] WITH (NOLOCK) where [AhMst_Type]='Doctor' And [AhMst_DrCode]='" + dctls.dctr_Code + "' And AhMst_Key!=" + ExsistDoctid + " ", sqlcon);
                    }

                    try
                    {

                        //ExsistDrcode = Convert.ToString(cmd5.ExecuteScalar());
                        ExsistDrcode = "";

                    }
                    catch { }

                    if (ExsistDrcode != "")
                    {
                        return Json(new { Result = "Doctor Code Exsist(DrName:" + ExsistDrcode + ").Change the Doctor Code" });

                        //MessageBox.Show("Doctor Code Exsist(DrName:" + ExsistDrcode + ").Change the Doctor Code", cPublic.ProjectName);
                        //txtDrcode.Focus();
                        //return;
                    }

                }
                //**************************************************
                //*****
                // DateTime BirthDate = Convert.ToDateTime("1900-01-01");
                DateTime dob, wedday;
                int Dob = 0;
                int WedDy = 0;
                int incen = 0;
                int Discpat = 0;

                string dobdate = (dctls.doc_Dob);
                if (dobdate != null)
                {
                    string[] dateString2 = dobdate.Split('/');
                    dob = DateTime.Parse(dateString2[1] + "/" + dateString2[0] + "/" + dateString2[2]);
                }
                else
                {
                    dob = DateTime.Now;
                }
                string wedDate = (dctls.doc_Wedding);
                if (wedDate != null)
                {
                    string[] dateString = wedDate.Split('/');
                    wedday = DateTime.Parse(dateString[1] + "/" + dateString[0] + "/" + dateString[2]);
                }
                else
                {
                    wedday = DateTime.Now;
                }
                //if (chkenbleinc.Checked == true)
                //{
                //    incen = 1;

                //}
                //if (chkDocDis.Checked == true)
                //{
                //    Discpat = 1;

                //}
                //if (dtpDob.Checked == true)
                //{
                //    // BirthDate = dtpDob.Value;
                //    Dob = 1;
                //}
                //if (dtpWedding.Checked)
                //{
                //    WedDy = 1;
                //}
                SqlCommand sqlcmd1 = new SqlCommand();
                sqlcmd1.Connection = sqlcon;
                sqlcmd1.CommandType = CommandType.StoredProcedure;
                sqlcmd1.CommandText = "StProc_INSERT_ACCHEADS";

                sqlcmd1.Parameters.Clear();
                sqlcmd1.Parameters.AddWithValue("@InsertMode", "New");
                sqlcmd1.Parameters.AddWithValue("@AhMst_Key", Convert.ToInt32(doc_key));
                sqlcmd1.Parameters.AddWithValue("@AhMst_pName", dctls.dctr_pName ?? "");
                sqlcmd1.Parameters.AddWithValue("@AhMst_OpBal", DBNull.Value);
                sqlcmd1.Parameters.AddWithValue("@AhMst_OpStatus", DBNull.Value);
                sqlcmd1.Parameters.AddWithValue("@AhMst_CrLimit", DBNull.Value);
                sqlcmd1.Parameters.AddWithValue("@AhMst_Tin", DBNull.Value);


                if (dctls.optMale == true)
                {
                    sqlcmd1.Parameters.AddWithValue("@AhMst_Ismale", "M");
                }
                else if (dctls.optFemale == true)
                {
                    sqlcmd1.Parameters.AddWithValue("@AhMst_Ismale", "F");
                }
                //DateTime dob=
                sqlcmd1.Parameters.AddWithValue("@AhMst_drEdDet", dctls.DocEdu ?? "");
                sqlcmd1.Parameters.AddWithValue("@AhMst_SplID", Convert.ToInt32(dctls.DocSplsdKey));
                sqlcmd1.Parameters.AddWithValue("@AhMst_Address", dctls.dctr_homeaddr ?? "");

                sqlcmd1.Parameters.AddWithValue("@AhMst_AreaID", Convert.ToInt32(dctls.DocAreaKey));
                sqlcmd1.Parameters.AddWithValue("@AhMst_ContPrsn", dctls.DocConPrsn ?? "");
                sqlcmd1.Parameters.AddWithValue("@AhMst_Phno", dctls.DocPhone ?? "");
                sqlcmd1.Parameters.AddWithValue("@AhMst_mobile", dctls.DocMobile ?? "");
                sqlcmd1.Parameters.AddWithValue("@AhMst_HosId", Convert.ToInt32(dctls.DocHospKey));
                sqlcmd1.Parameters.AddWithValue("@AhMst_Dob", Convert.ToDateTime(dob));
                sqlcmd1.Parameters.AddWithValue("@AhMst_WedAnn", Convert.ToDateTime(wedday));
                sqlcmd1.Parameters.AddWithValue("@AhMst_Email", dctls.DocEmail ?? "");
                sqlcmd1.Parameters.AddWithValue("@AhMst_SendMail", dctls.chkEmailReport);

                sqlcmd1.Parameters.AddWithValue("@AhMst_IsActive", dctls.chkActive);
                sqlcmd1.Parameters.AddWithValue("@AhMst_Note", dctls.dctr_Note ?? "");
                sqlcmd1.Parameters.AddWithValue("@AhMst_IssDate", DBNull.Value);
                sqlcmd1.Parameters.AddWithValue("@AhMst_IsCrdHldr", 0);
                sqlcmd1.Parameters.AddWithValue("@AhMst_Type", "Doctor");
                sqlcmd1.Parameters.AddWithValue("@AhMst_AcGrpId", DBNull.Value);
                sqlcmd1.Parameters.AddWithValue("@AhMst_DrCode", TempExsistDrcode ?? "");
                sqlcmd1.Parameters.AddWithValue("@AhMst_IsEmp", dctls.chkEmployee);
                //try
                //{
                //    sqlcmd1.Parameters.AddWithValue("@AhMst_IsDocBod", dctls.doc_Dob);
                //}
                //catch (Exception) { }
                //try
                //{
                //    sqlcmd1.Parameters.AddWithValue("@AhMst_IsDocWedng", dctls.doc_Wedding);
                //}
                //catch (Exception) { }
                //sqlcmd1.Parameters.AddWithValue("@AhMst_IsDocBod", dctls.doc_Dob);
                //sqlcmd1.Parameters.AddWithValue("@AhMst_IsDocWedng", dctls.doc_Wedding);
                sqlcmd1.Parameters.AddWithValue("@AhMst_Landmark", dctls.LandMark ?? "");
                sqlcmd1.Parameters.AddWithValue("@AhMst_HospAddress", dctls.dctr_hospaddr ?? "");
                sqlcmd1.Parameters.AddWithValue("@AhMst_HospName", dctls.DocHosp ?? "");
                sqlcmd1.Parameters.AddWithValue("@AhMst_PRO", dctls.txtPRO ?? "");
                sqlcmd1.Parameters.AddWithValue("@AhMst_OthrNote", dctls.OthrNote ?? "");
                sqlcmd1.Parameters.AddWithValue("@AhMst_Incen", incen);
                if (dctls.home_addrChk == true)
                {
                    sqlcmd1.Parameters.AddWithValue("@AhMst_DefltAddress", "0");
                }
                else if (dctls.hosp_addrChk == true)
                {
                    sqlcmd1.Parameters.AddWithValue("@AhMst_DefltAddress", "1");
                }

                int CatgId = 0;
                try
                {
                    CatgId = Convert.ToInt32(dctls.CatgKey);
                }
                catch { }
                sqlcmd1.Parameters.AddWithValue("@AhMst_CatgryId", CatgId);
                try
                {
                    Image pb_sign = null;
                    Image img = pb_sign;
                    byte[] arr;
                    ImageConverter converter = new ImageConverter();
                    string[] base64Val = base64Strng.Split(',');
                    byte[] bytes = Convert.FromBase64String(base64Val[1]);
                    //Image image;
                    //using (MemoryStream ms = new MemoryStream(bytes))
                    //{
                    //    image = Image.FromStream(ms);
                    //}
                    //arr = (byte[])converter.ConvertTo((image), typeof(byte[]));
                    sqlcmd1.Parameters.AddWithValue("@AhMst_Image", bytes);

                }
                catch (Exception exe)
                {
                    var xs = exe.InnerException;

                }
                //////sqlcmd1.Parameters.AddWithValue("@LEVEL1", nLEVEL1);
                //////sqlcmd1.Parameters.AddWithValue("@GROUPLEVEL", nGROUPLEVEL);
                sqlcmd1.Parameters.AddWithValue("@GROUPCODE", nGroupCode);
                sqlcmd1.Parameters.AddWithValue("@AhMst_IsDiscPat", Discpat);


                sqlcmd1.ExecuteNonQuery();

                SqlCommand cmd1 = new SqlCommand("StProc_INSERT_OPENINGBALANCE", sqlcon);
                cmd1.CommandType = CommandType.StoredProcedure;
                cmd1.Parameters.Add("@OpBl_AccId", SqlDbType.Int).Value = doc_key;
                cmd1.Parameters.Add("@OpBl_OpBalance", SqlDbType.Float).Value = 0;
                cmd1.Parameters.Add("@OpBl_UsrId", SqlDbType.Int).Value = l.Usr_key;
                cmd1.Parameters.Add("@OpBl_YrId", SqlDbType.Int).Value = l.Yr_Id;
                cmd1.Parameters.Add("@OpBl_OpStatus", SqlDbType.NVarChar).Value = "";
                cmd1.Parameters.Add("@Head", SqlDbType.NVarChar).Value = dctls.dctr_pName;
                cmd1.ExecuteNonQuery();

                string usrLogData = "";
                if (saveFlag == "New")
                {
                    usrLogData = "DOCTOR CREATED -NAME : " + dctls.dctr_pName;
                    //cPublic.UserTrackInsert(usrLogData, "DOCTOR", 32);
                    try
                    {

                        SqlCommand cmd = new SqlCommand("StProc_INSERT_USERTRACK", sqlcon);
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@UsrTrack_Date", DateTime.Now);
                        cmd.Parameters.AddWithValue("@UsrTrack_UsrId", l.Usr_key);
                        cmd.Parameters.AddWithValue("@UsrTrack_EmpId", l.Usr_key);
                        cmd.Parameters.AddWithValue("@UsrTrack_UsrName", l.Usr_Name);
                        cmd.Parameters.AddWithValue("@UsrTrack_Caption", usrLogData);
                        cmd.Parameters.AddWithValue("@UsrTrack_Type", 32);
                        cmd.Parameters.AddWithValue("@UsrTrack_Form", "DOCTOR");
                        cmd.Parameters.AddWithValue("@UsrTrack_WorkStation", System.Environment.MachineName);
                        cmd.Parameters.AddWithValue("@UsrTrack_YrId", l.Yr_Id);
                        cmd.Parameters.AddWithValue("@UsrTrack_CpyId", l.BrMst_Key);
                        cmd.ExecuteNonQuery();
                    }
                    catch { }
                }
                else
                {
                    usrLogData = "DOCTOR EDITED -NAME : " + dctls.dctr_pName;
                    //cPublic.UserTrackInsert(usrLogData, "DOCTOR", 33);
                    try
                    {

                        SqlCommand cmd = new SqlCommand("StProc_INSERT_USERTRACK", sqlcon);
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@UsrTrack_Date", DateTime.Now);
                        cmd.Parameters.AddWithValue("@UsrTrack_UsrId", l.Usr_key);
                        cmd.Parameters.AddWithValue("@UsrTrack_EmpId", l.Usr_key);
                        cmd.Parameters.AddWithValue("@UsrTrack_UsrName", l.Usr_Name);
                        cmd.Parameters.AddWithValue("@UsrTrack_Caption", usrLogData);
                        cmd.Parameters.AddWithValue("@UsrTrack_Type", 33);
                        cmd.Parameters.AddWithValue("@UsrTrack_Form", "DOCTOR");
                        cmd.Parameters.AddWithValue("@UsrTrack_WorkStation", System.Environment.MachineName);
                        cmd.Parameters.AddWithValue("@UsrTrack_YrId", l.Yr_Id);
                        cmd.Parameters.AddWithValue("@UsrTrack_CpyId", l.BrMst_Key);
                        cmd.ExecuteNonQuery();
                    }
                    catch { }
                }
                sqlcon.Close();
                //}
                return Json(new { Result = "OK" });
            }
            catch (Exception exe)
            {
                return Json(new { Result = "ERROR" });
            }
        }

        public JsonResult DctrSearch(string term, int Check)
        {
            List<testDetails> testdtls = new List<testDetails>();
            if (Check == 0 && term != "")
            {
                var dctrDls = db.AccountHeads_Mst.Where(a => a.AhMst_Type == "Doctor" && a.AhMst_pName.Contains(term)).Select(acc => new { acc.AhMst_pName, acc.AhMst_Key }).OrderBy(a => a.AhMst_pName).ToList();
                return Json(new { Result = "OK", Records = dctrDls }, JsonRequestBehavior.AllowGet);
            }
            else if (Check == 1 && term != "")
            {
                var dctrDls = db.AccountHeads_Mst.Where(a => a.AhMst_Type == "Doctor" && (a.AhMst_Key.ToString()).Contains(term)).Select(acc => new { acc.AhMst_pName, acc.AhMst_Key }).OrderBy(a => a.AhMst_Key).ToList();
                return Json(new { Result = "OK", Records = dctrDls }, JsonRequestBehavior.AllowGet);
            }
            else if (Check == 2 && term != "")
            {
                var dctrDls = db.Masters.Where(m => m.Mstr_Type == "Area" && (m.Mstr_Desc).Contains(term)).Select(mstr => new { mstr.Mstr_Desc, mstr.Mstr_Key }).OrderBy(m => m.Mstr_Desc).ToList();
                return Json(new { Result = "OK", Records = dctrDls }, JsonRequestBehavior.AllowGet);
            }
            else if (Check == 3 && term != "")
            {
                var dctrDls = db.Masters.Where(m => m.Mstr_Type == "Area" && (m.Mstr_Key.ToString()).Contains(term)).Select(mstr => new { mstr.Mstr_Desc, mstr.Mstr_Key }).OrderBy(m => m.Mstr_Key).ToList();
                return Json(new { Result = "OK", Records = dctrDls }, JsonRequestBehavior.AllowGet);
            }
            else if (Check == 4 && term != "")
            {
                var dctrDls = db.Masters.Where(m => m.Mstr_Type == "DrCatagory" && (m.Mstr_Desc).Contains(term)).Select(mstr => new { mstr.Mstr_Desc, mstr.Mstr_Key }).OrderBy(m => m.Mstr_Desc).ToList();
                return Json(new { Result = "OK", Records = dctrDls }, JsonRequestBehavior.AllowGet);
            }
            else if (Check == 5 && term != "")
            {
                var dctrDls = db.Masters.Where(m => m.Mstr_Type == "DrCatagory" && (m.Mstr_Key.ToString()).Contains(term)).Select(mstr => new { mstr.Mstr_Desc, mstr.Mstr_Key }).OrderBy(m => m.Mstr_Key).ToList();
                return Json(new { Result = "OK", Records = dctrDls }, JsonRequestBehavior.AllowGet);
            }
            else if (Check == 6 && term != "")
            {
                var dctrDls = db.Masters.Where(m => m.Mstr_Type == "Specilzed" && (m.Mstr_Desc).Contains(term)).Select(mstr => new { mstr.Mstr_Desc, mstr.Mstr_Key }).OrderBy(m => m.Mstr_Desc).ToList();
                return Json(new { Result = "OK", Records = dctrDls }, JsonRequestBehavior.AllowGet);
            }
            else if (Check == 7 && term != "")
            {
                var dctrDls = db.Masters.Where(m => m.Mstr_Type == "Specilzed" && (m.Mstr_Key.ToString()).Contains(term)).Select(mstr => new { mstr.Mstr_Desc, mstr.Mstr_Key }).OrderBy(m => m.Mstr_Key).ToList();
                return Json(new { Result = "OK", Records = dctrDls }, JsonRequestBehavior.AllowGet);
            }
            else if (Check == 8 && term != "")
            {
                var dctrDls = db.Masters.Where(m => m.Mstr_Type == "Hosp" && (m.Mstr_Desc).Contains(term)).Select(mstr => new { mstr.Mstr_Desc, mstr.Mstr_Key }).OrderBy(m => m.Mstr_Desc).ToList();
                return Json(new { Result = "OK", Records = dctrDls }, JsonRequestBehavior.AllowGet);
            }
            else if (Check == 9 && term != "")
            {
                var dctrDls = db.Masters.Where(m => m.Mstr_Type == "Hosp" && (m.Mstr_Key.ToString()).Contains(term)).Select(mstr => new { mstr.Mstr_Desc, mstr.Mstr_Key }).OrderBy(m => m.Mstr_Key).ToList();
                return Json(new { Result = "OK", Records = dctrDls }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { Result = "ERROR" }, JsonRequestBehavior.AllowGet);
            }
        }

    }
}