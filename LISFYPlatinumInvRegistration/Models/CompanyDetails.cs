using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Web;

namespace LISFYPlatinumInvRegistration.Models
{
    public class CompanyDetails
    {
        public string CmpMst_Key { get; set; }
        public string CmpMst_Name { get; set; }
        public string CmpMst_Addr1 { get; set; }
        public string CmpMst_Addr2 { get; set; }
        public string CmpMst_Ph { get; set; }
        public string CmpMst_place { get; set; }
        public string CmpMst_Email { get; set; }
        public string CmpMst_Tin { get; set; }
        public string CmpMst_Cst { get; set; }
        public string CmpMst_Declton { get; set; }
        public string CmpMst_ExpPath { get; set; }
        public int CmpMst_AskPrntBill { get; set; }
        public float CmpMst_DfltBrId { get; set; }
        public string CmpMst_BcodePath { get; set; }
        public string CmpMst_DtPrntPath { get; set; }
        public int CmpMst_IsHo { get; set; }
        public int CmpMst_AlwInsrnce { get; set; }
        public int CmpMst_AlwArea { get; set; }
        public int CmpMst_SrvChrg { get; set; }
        public int CmpMst_AlwStmntStf { get; set; }
        public int CmpMst_AlwBillEditStf { get; set; }
        public int CmpMst_AlwBillCnclStf { get; set; }
        public int CmpMst_AlwBarCode { get; set; }
        public int CmpMst_AlwPrceEdit { get; set; }
        public int CmpMst_SmpleColltn { get; set; }
        public string CmpMst_Dsn { get; set; }
        public int CmpMst_ChngeAprnce { get; set; }
        public int CmpMst_NCopy { get; set; }
        public int CmpMst_NoAge { get; set; }
        public int CmpMst_PrntType { get; set; }
        public int CmpMst_PrntRptTime { get; set; }
        public int CmpMst_IsIF { get; set; }
        public float CmpMst_LpdExceedVal { get; set; }
        public int CmpMst_MsgType { get; set; }
        public int CmpMst_BarcodeType { get; set; }
        public int CmpMst_LicCnt { get; set; }
        public DateTime CmpMst_LicDate { get; set; }
        public int CmpMst_InHouseId { get; set; }
        public int CmpMst_TypeN { get; set; }
        public Image CmpMst_Headerimage { get; set; }
        public Image CmpMst_Footerimage { get; set; }
        public DateTime fromdate { get; set; }
        public DateTime todate { get; set; }

    }
}