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
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    using System.Data.Entity.Core.Objects;
    using System.Linq;
    
    public partial class CARE021112LisfyPlatinumEntities : DbContext
    {
        public CARE021112LisfyPlatinumEntities()
            : base("name=CARE021112LisfyPlatinumEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<AccountHeads_Mst> AccountHeads_Mst { get; set; }
        public virtual DbSet<Master> Masters { get; set; }
        public virtual DbSet<SetDoctor_Staff> SetDoctor_Staff { get; set; }
        public virtual DbSet<Set_GroupTest> Set_GroupTest { get; set; }
        public virtual DbSet<Voucher> Vouchers { get; set; }
        public virtual DbSet<Customize2_RsltDescMst> Customize2_RsltDescMst { get; set; }
        public virtual DbSet<PendingCollection> PendingCollections { get; set; }
        public virtual DbSet<Labcor_Login> Labcor_Login { get; set; }
        public virtual DbSet<Company_Mst> Company_Mst { get; set; }
        public virtual DbSet<Special_SchemeRates> Special_SchemeRates { get; set; }
        public virtual DbSet<Special_Rates> Special_Rates { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<Patient_Mst> Patient_Mst { get; set; }
        public virtual DbSet<Invoice_Mst> Invoice_Mst { get; set; }
        public virtual DbSet<Invoice_Det> Invoice_Det { get; set; }
        public virtual DbSet<TestRef_Mst> TestRef_Mst { get; set; }
        public virtual DbSet<NormalRanx> NormalRanges { get; set; }
        public virtual DbSet<Test_Mst> Test_Mst { get; set; }
    
        public virtual ObjectResult<Stproc_CHECK_LOGIN_DETAILS_Result> Stproc_CHECK_LOGIN_DETAILS(string userName, string password)
        {
            var userNameParameter = userName != null ?
                new ObjectParameter("UserName", userName) :
                new ObjectParameter("UserName", typeof(string));
    
            var passwordParameter = password != null ?
                new ObjectParameter("Password", password) :
                new ObjectParameter("Password", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Stproc_CHECK_LOGIN_DETAILS_Result>("Stproc_CHECK_LOGIN_DETAILS", userNameParameter, passwordParameter);
        }
    
        public virtual ObjectResult<Stproc_CORPORATE_LOGIN_DETAILS_Result> Stproc_CORPORATE_LOGIN_DETAILS(string labCorp_UserName, string labCorp_Password)
        {
            var labCorp_UserNameParameter = labCorp_UserName != null ?
                new ObjectParameter("LabCorp_UserName", labCorp_UserName) :
                new ObjectParameter("LabCorp_UserName", typeof(string));
    
            var labCorp_PasswordParameter = labCorp_Password != null ?
                new ObjectParameter("LabCorp_Password", labCorp_Password) :
                new ObjectParameter("LabCorp_Password", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Stproc_CORPORATE_LOGIN_DETAILS_Result>("Stproc_CORPORATE_LOGIN_DETAILS", labCorp_UserNameParameter, labCorp_PasswordParameter);
        }
    
        public virtual ObjectResult<Stproc_GET_BRANCH_DETAILS_Result> Stproc_GET_BRANCH_DETAILS()
        {
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Stproc_GET_BRANCH_DETAILS_Result>("Stproc_GET_BRANCH_DETAILS");
        }
    
        public virtual ObjectResult<Stproc_GET_BRNCH_DETAILS_Result> Stproc_GET_BRNCH_DETAILS()
        {
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Stproc_GET_BRNCH_DETAILS_Result>("Stproc_GET_BRNCH_DETAILS");
        }
    
        public virtual ObjectResult<Stproc_GET_COLLECTION_SUMMERY_DETAILS_Result> Stproc_GET_COLLECTION_SUMMERY_DETAILS(Nullable<int> companyId, Nullable<int> yearId, Nullable<System.DateTime> fromdate, Nullable<System.DateTime> todate)
        {
            var companyIdParameter = companyId.HasValue ?
                new ObjectParameter("CompanyId", companyId) :
                new ObjectParameter("CompanyId", typeof(int));
    
            var yearIdParameter = yearId.HasValue ?
                new ObjectParameter("YearId", yearId) :
                new ObjectParameter("YearId", typeof(int));
    
            var fromdateParameter = fromdate.HasValue ?
                new ObjectParameter("fromdate", fromdate) :
                new ObjectParameter("fromdate", typeof(System.DateTime));
    
            var todateParameter = todate.HasValue ?
                new ObjectParameter("todate", todate) :
                new ObjectParameter("todate", typeof(System.DateTime));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Stproc_GET_COLLECTION_SUMMERY_DETAILS_Result>("Stproc_GET_COLLECTION_SUMMERY_DETAILS", companyIdParameter, yearIdParameter, fromdateParameter, todateParameter);
        }
    
        public virtual int Stproc_GET_COMPANY_MST_DETAILS()
        {
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("Stproc_GET_COMPANY_MST_DETAILS");
        }
    
        public virtual ObjectResult<Stproc_GET_USER_DETAILS_Result> Stproc_GET_USER_DETAILS()
        {
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Stproc_GET_USER_DETAILS_Result>("Stproc_GET_USER_DETAILS");
        }
    
        public virtual ObjectResult<Stproc_GET_YEAR_DETAILS_Result> Stproc_GET_YEAR_DETAILS()
        {
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Stproc_GET_YEAR_DETAILS_Result>("Stproc_GET_YEAR_DETAILS");
        }
    
        public virtual ObjectResult<Stproc_CorporateLogin_Details_Result> Stproc_CorporateLogin_Details(Nullable<int> labCorp_YrID, string labCorp_UserName, string labCorp_Password)
        {
            var labCorp_YrIDParameter = labCorp_YrID.HasValue ?
                new ObjectParameter("LabCorp_YrID", labCorp_YrID) :
                new ObjectParameter("LabCorp_YrID", typeof(int));
    
            var labCorp_UserNameParameter = labCorp_UserName != null ?
                new ObjectParameter("LabCorp_UserName", labCorp_UserName) :
                new ObjectParameter("LabCorp_UserName", typeof(string));
    
            var labCorp_PasswordParameter = labCorp_Password != null ?
                new ObjectParameter("LabCorp_Password", labCorp_Password) :
                new ObjectParameter("LabCorp_Password", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Stproc_CorporateLogin_Details_Result>("Stproc_CorporateLogin_Details", labCorp_YrIDParameter, labCorp_UserNameParameter, labCorp_PasswordParameter);
        }
    
        public virtual ObjectResult<Stproc_GET_CATAGORY_DETAILS_Result> Stproc_GET_CATAGORY_DETAILS()
        {
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Stproc_GET_CATAGORY_DETAILS_Result>("Stproc_GET_CATAGORY_DETAILS");
        }
    
        public virtual ObjectResult<Stproc_GET_CORPORATE_DETAILS_Result> Stproc_GET_CORPORATE_DETAILS()
        {
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Stproc_GET_CORPORATE_DETAILS_Result>("Stproc_GET_CORPORATE_DETAILS");
        }
    
        public virtual ObjectResult<Stproc_GET_CORPORATE_DTLS_Result> Stproc_GET_CORPORATE_DTLS()
        {
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Stproc_GET_CORPORATE_DTLS_Result>("Stproc_GET_CORPORATE_DTLS");
        }
    
        public virtual ObjectResult<Stproc_GET_CORPORATE_INVOICE_DETAILS_Result> Stproc_GET_CORPORATE_INVOICE_DETAILS()
        {
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Stproc_GET_CORPORATE_INVOICE_DETAILS_Result>("Stproc_GET_CORPORATE_INVOICE_DETAILS");
        }
    
        public virtual ObjectResult<Stproc_GET_DEPARTMENT_DETAILS_Result> Stproc_GET_DEPARTMENT_DETAILS()
        {
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Stproc_GET_DEPARTMENT_DETAILS_Result>("Stproc_GET_DEPARTMENT_DETAILS");
        }
    
        public virtual ObjectResult<Stproc_GET_DISCOUNT_WISE_MASTER_DETAILS_Result> Stproc_GET_DISCOUNT_WISE_MASTER_DETAILS()
        {
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Stproc_GET_DISCOUNT_WISE_MASTER_DETAILS_Result>("Stproc_GET_DISCOUNT_WISE_MASTER_DETAILS");
        }
    
        public virtual ObjectResult<Stproc_GET_DIVISION_DETAILS_Result> Stproc_GET_DIVISION_DETAILS()
        {
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Stproc_GET_DIVISION_DETAILS_Result>("Stproc_GET_DIVISION_DETAILS");
        }
    
        public virtual ObjectResult<Stproc_GET_DOCTOR_DETAILS_Result> Stproc_GET_DOCTOR_DETAILS()
        {
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Stproc_GET_DOCTOR_DETAILS_Result>("Stproc_GET_DOCTOR_DETAILS");
        }
    
        public virtual ObjectResult<Stproc_GET_DOCTOR_SPECIALIZED_DETAILS_Result> Stproc_GET_DOCTOR_SPECIALIZED_DETAILS()
        {
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Stproc_GET_DOCTOR_SPECIALIZED_DETAILS_Result>("Stproc_GET_DOCTOR_SPECIALIZED_DETAILS");
        }
    
        public virtual ObjectResult<Stproc_SEARCH_AGENT_WITH_KEY_Result> Stproc_SEARCH_AGENT_WITH_KEY(string ahMst_Key)
        {
            var ahMst_KeyParameter = ahMst_Key != null ?
                new ObjectParameter("AhMst_Key", ahMst_Key) :
                new ObjectParameter("AhMst_Key", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Stproc_SEARCH_AGENT_WITH_KEY_Result>("Stproc_SEARCH_AGENT_WITH_KEY", ahMst_KeyParameter);
        }
    
        public virtual ObjectResult<Stproc_SEARCH_AGENT_WITH_NAME_Result> Stproc_SEARCH_AGENT_WITH_NAME(string ahMst_pName)
        {
            var ahMst_pNameParameter = ahMst_pName != null ?
                new ObjectParameter("AhMst_pName", ahMst_pName) :
                new ObjectParameter("AhMst_pName", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Stproc_SEARCH_AGENT_WITH_NAME_Result>("Stproc_SEARCH_AGENT_WITH_NAME", ahMst_pNameParameter);
        }
    
        public virtual ObjectResult<Stproc_SEARCH_AREA_WITH_CODE_Result> Stproc_SEARCH_AREA_WITH_CODE(string mstr_Key)
        {
            var mstr_KeyParameter = mstr_Key != null ?
                new ObjectParameter("Mstr_Key", mstr_Key) :
                new ObjectParameter("Mstr_Key", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Stproc_SEARCH_AREA_WITH_CODE_Result>("Stproc_SEARCH_AREA_WITH_CODE", mstr_KeyParameter);
        }
    
        public virtual ObjectResult<Stproc_SEARCH_AREA_WITH_NAME_Result> Stproc_SEARCH_AREA_WITH_NAME(string mstr_Desc)
        {
            var mstr_DescParameter = mstr_Desc != null ?
                new ObjectParameter("Mstr_Desc", mstr_Desc) :
                new ObjectParameter("Mstr_Desc", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Stproc_SEARCH_AREA_WITH_NAME_Result>("Stproc_SEARCH_AREA_WITH_NAME", mstr_DescParameter);
        }
    
        public virtual ObjectResult<Stproc_SEARCH_BRNCH_WITH_KEY_Result> Stproc_SEARCH_BRNCH_WITH_KEY(string brMst_Key)
        {
            var brMst_KeyParameter = brMst_Key != null ?
                new ObjectParameter("BrMst_Key", brMst_Key) :
                new ObjectParameter("BrMst_Key", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Stproc_SEARCH_BRNCH_WITH_KEY_Result>("Stproc_SEARCH_BRNCH_WITH_KEY", brMst_KeyParameter);
        }
    
        public virtual ObjectResult<Stproc_SEARCH_BRNCH_WITH_NAME_Result> Stproc_SEARCH_BRNCH_WITH_NAME(string brMst_Name)
        {
            var brMst_NameParameter = brMst_Name != null ?
                new ObjectParameter("BrMst_Name", brMst_Name) :
                new ObjectParameter("BrMst_Name", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Stproc_SEARCH_BRNCH_WITH_NAME_Result>("Stproc_SEARCH_BRNCH_WITH_NAME", brMst_NameParameter);
        }
    
        public virtual ObjectResult<Stproc_SEARCH_CATAGORY_WITH_CODE_Result> Stproc_SEARCH_CATAGORY_WITH_CODE(string ahMst_Key)
        {
            var ahMst_KeyParameter = ahMst_Key != null ?
                new ObjectParameter("AhMst_Key", ahMst_Key) :
                new ObjectParameter("AhMst_Key", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Stproc_SEARCH_CATAGORY_WITH_CODE_Result>("Stproc_SEARCH_CATAGORY_WITH_CODE", ahMst_KeyParameter);
        }
    
        public virtual ObjectResult<Stproc_SEARCH_CATAGORY_WITH_NAME_Result> Stproc_SEARCH_CATAGORY_WITH_NAME(string ahMst_pName)
        {
            var ahMst_pNameParameter = ahMst_pName != null ?
                new ObjectParameter("AhMst_pName", ahMst_pName) :
                new ObjectParameter("AhMst_pName", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Stproc_SEARCH_CATAGORY_WITH_NAME_Result>("Stproc_SEARCH_CATAGORY_WITH_NAME", ahMst_pNameParameter);
        }
    
        public virtual ObjectResult<Stproc_SEARCH_COLL_PERSON_WITH_CODE_Result> Stproc_SEARCH_COLL_PERSON_WITH_CODE(string ahMst_Key)
        {
            var ahMst_KeyParameter = ahMst_Key != null ?
                new ObjectParameter("AhMst_Key", ahMst_Key) :
                new ObjectParameter("AhMst_Key", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Stproc_SEARCH_COLL_PERSON_WITH_CODE_Result>("Stproc_SEARCH_COLL_PERSON_WITH_CODE", ahMst_KeyParameter);
        }
    
        public virtual ObjectResult<Stproc_SEARCH_COLL_PERSON_WITH_PHNO_Result> Stproc_SEARCH_COLL_PERSON_WITH_PHNO(string ahMst_mobile)
        {
            var ahMst_mobileParameter = ahMst_mobile != null ?
                new ObjectParameter("AhMst_mobile", ahMst_mobile) :
                new ObjectParameter("AhMst_mobile", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Stproc_SEARCH_COLL_PERSON_WITH_PHNO_Result>("Stproc_SEARCH_COLL_PERSON_WITH_PHNO", ahMst_mobileParameter);
        }
    
        public virtual ObjectResult<Stproc_SEARCH_COLL_PERSON_WITH_WORD_Result> Stproc_SEARCH_COLL_PERSON_WITH_WORD(string ahMst_pName)
        {
            var ahMst_pNameParameter = ahMst_pName != null ?
                new ObjectParameter("AhMst_pName", ahMst_pName) :
                new ObjectParameter("AhMst_pName", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Stproc_SEARCH_COLL_PERSON_WITH_WORD_Result>("Stproc_SEARCH_COLL_PERSON_WITH_WORD", ahMst_pNameParameter);
        }
    
        public virtual ObjectResult<Stproc_SEARCH_CORPORATE_WITH_AGNT_KEY_Result> Stproc_SEARCH_CORPORATE_WITH_AGNT_KEY(Nullable<double> ahMst_Key, Nullable<double> setCorp_StaffId)
        {
            var ahMst_KeyParameter = ahMst_Key.HasValue ?
                new ObjectParameter("AhMst_Key", ahMst_Key) :
                new ObjectParameter("AhMst_Key", typeof(double));
    
            var setCorp_StaffIdParameter = setCorp_StaffId.HasValue ?
                new ObjectParameter("SetCorp_StaffId", setCorp_StaffId) :
                new ObjectParameter("SetCorp_StaffId", typeof(double));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Stproc_SEARCH_CORPORATE_WITH_AGNT_KEY_Result>("Stproc_SEARCH_CORPORATE_WITH_AGNT_KEY", ahMst_KeyParameter, setCorp_StaffIdParameter);
        }
    
        public virtual ObjectResult<Stproc_SEARCH_CORPORATE_WITH_AGNT_NAME_Result> Stproc_SEARCH_CORPORATE_WITH_AGNT_NAME(string ahMst_pName, Nullable<double> setCorp_StaffId)
        {
            var ahMst_pNameParameter = ahMst_pName != null ?
                new ObjectParameter("AhMst_pName", ahMst_pName) :
                new ObjectParameter("AhMst_pName", typeof(string));
    
            var setCorp_StaffIdParameter = setCorp_StaffId.HasValue ?
                new ObjectParameter("SetCorp_StaffId", setCorp_StaffId) :
                new ObjectParameter("SetCorp_StaffId", typeof(double));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Stproc_SEARCH_CORPORATE_WITH_AGNT_NAME_Result>("Stproc_SEARCH_CORPORATE_WITH_AGNT_NAME", ahMst_pNameParameter, setCorp_StaffIdParameter);
        }
    
        public virtual ObjectResult<Stproc_SEARCH_CORPORATE_WITH_CODE_Result> Stproc_SEARCH_CORPORATE_WITH_CODE(string ahMst_Key)
        {
            var ahMst_KeyParameter = ahMst_Key != null ?
                new ObjectParameter("AhMst_Key", ahMst_Key) :
                new ObjectParameter("AhMst_Key", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Stproc_SEARCH_CORPORATE_WITH_CODE_Result>("Stproc_SEARCH_CORPORATE_WITH_CODE", ahMst_KeyParameter);
        }
    
        public virtual ObjectResult<Stproc_SEARCH_CORPORATE_WITH_KEY_Result> Stproc_SEARCH_CORPORATE_WITH_KEY(Nullable<double> ahMst_Key, string ahMst_PayType, Nullable<double> ahMst_AreaID)
        {
            var ahMst_KeyParameter = ahMst_Key.HasValue ?
                new ObjectParameter("AhMst_Key", ahMst_Key) :
                new ObjectParameter("AhMst_Key", typeof(double));
    
            var ahMst_PayTypeParameter = ahMst_PayType != null ?
                new ObjectParameter("AhMst_PayType", ahMst_PayType) :
                new ObjectParameter("AhMst_PayType", typeof(string));
    
            var ahMst_AreaIDParameter = ahMst_AreaID.HasValue ?
                new ObjectParameter("AhMst_AreaID", ahMst_AreaID) :
                new ObjectParameter("AhMst_AreaID", typeof(double));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Stproc_SEARCH_CORPORATE_WITH_KEY_Result>("Stproc_SEARCH_CORPORATE_WITH_KEY", ahMst_KeyParameter, ahMst_PayTypeParameter, ahMst_AreaIDParameter);
        }
    
        public virtual ObjectResult<Stproc_SEARCH_CORPORATE_WITH_NAME_Result> Stproc_SEARCH_CORPORATE_WITH_NAME(string ahMst_pName)
        {
            var ahMst_pNameParameter = ahMst_pName != null ?
                new ObjectParameter("AhMst_pName", ahMst_pName) :
                new ObjectParameter("AhMst_pName", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Stproc_SEARCH_CORPORATE_WITH_NAME_Result>("Stproc_SEARCH_CORPORATE_WITH_NAME", ahMst_pNameParameter);
        }
    
        public virtual ObjectResult<Stproc_SEARCH_CORPORATE_WITH_PHN_Result> Stproc_SEARCH_CORPORATE_WITH_PHN(string ahMst_mobile, string ahMst_PayType, Nullable<double> ahMst_AreaID)
        {
            var ahMst_mobileParameter = ahMst_mobile != null ?
                new ObjectParameter("AhMst_mobile", ahMst_mobile) :
                new ObjectParameter("AhMst_mobile", typeof(string));
    
            var ahMst_PayTypeParameter = ahMst_PayType != null ?
                new ObjectParameter("AhMst_PayType", ahMst_PayType) :
                new ObjectParameter("AhMst_PayType", typeof(string));
    
            var ahMst_AreaIDParameter = ahMst_AreaID.HasValue ?
                new ObjectParameter("AhMst_AreaID", ahMst_AreaID) :
                new ObjectParameter("AhMst_AreaID", typeof(double));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Stproc_SEARCH_CORPORATE_WITH_PHN_Result>("Stproc_SEARCH_CORPORATE_WITH_PHN", ahMst_mobileParameter, ahMst_PayTypeParameter, ahMst_AreaIDParameter);
        }
    
        public virtual ObjectResult<Stproc_SEARCH_CORPORATE_WITH_TERM_Result> Stproc_SEARCH_CORPORATE_WITH_TERM(string ahMst_pName, string ahMst_PayType, Nullable<double> ahMst_AreaID)
        {
            var ahMst_pNameParameter = ahMst_pName != null ?
                new ObjectParameter("AhMst_pName", ahMst_pName) :
                new ObjectParameter("AhMst_pName", typeof(string));
    
            var ahMst_PayTypeParameter = ahMst_PayType != null ?
                new ObjectParameter("AhMst_PayType", ahMst_PayType) :
                new ObjectParameter("AhMst_PayType", typeof(string));
    
            var ahMst_AreaIDParameter = ahMst_AreaID.HasValue ?
                new ObjectParameter("AhMst_AreaID", ahMst_AreaID) :
                new ObjectParameter("AhMst_AreaID", typeof(double));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Stproc_SEARCH_CORPORATE_WITH_TERM_Result>("Stproc_SEARCH_CORPORATE_WITH_TERM", ahMst_pNameParameter, ahMst_PayTypeParameter, ahMst_AreaIDParameter);
        }
    
        public virtual ObjectResult<Stproc_SEARCH_CUSTOMIZE2_TEST_WITH_KEY_Result> Stproc_SEARCH_CUSTOMIZE2_TEST_WITH_KEY(string tstMst_Key)
        {
            var tstMst_KeyParameter = tstMst_Key != null ?
                new ObjectParameter("TstMst_Key", tstMst_Key) :
                new ObjectParameter("TstMst_Key", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Stproc_SEARCH_CUSTOMIZE2_TEST_WITH_KEY_Result>("Stproc_SEARCH_CUSTOMIZE2_TEST_WITH_KEY", tstMst_KeyParameter);
        }
    
        public virtual ObjectResult<Stproc_SEARCH_CUSTOMIZE2_TEST_WITH_NAME_Result> Stproc_SEARCH_CUSTOMIZE2_TEST_WITH_NAME(string tstMst_name)
        {
            var tstMst_nameParameter = tstMst_name != null ?
                new ObjectParameter("TstMst_name", tstMst_name) :
                new ObjectParameter("TstMst_name", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Stproc_SEARCH_CUSTOMIZE2_TEST_WITH_NAME_Result>("Stproc_SEARCH_CUSTOMIZE2_TEST_WITH_NAME", tstMst_nameParameter);
        }
    
        public virtual ObjectResult<Stproc_SEARCH_DCTR_WITH_DCTR_CODE_Result> Stproc_SEARCH_DCTR_WITH_DCTR_CODE(string ahMst_DrCode)
        {
            var ahMst_DrCodeParameter = ahMst_DrCode != null ?
                new ObjectParameter("AhMst_DrCode", ahMst_DrCode) :
                new ObjectParameter("AhMst_DrCode", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Stproc_SEARCH_DCTR_WITH_DCTR_CODE_Result>("Stproc_SEARCH_DCTR_WITH_DCTR_CODE", ahMst_DrCodeParameter);
        }
    
        public virtual ObjectResult<Stproc_SEARCH_DCTR_WITH_KEY_Result> Stproc_SEARCH_DCTR_WITH_KEY(Nullable<double> ahMst_Key)
        {
            var ahMst_KeyParameter = ahMst_Key.HasValue ?
                new ObjectParameter("AhMst_Key", ahMst_Key) :
                new ObjectParameter("AhMst_Key", typeof(double));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Stproc_SEARCH_DCTR_WITH_KEY_Result>("Stproc_SEARCH_DCTR_WITH_KEY", ahMst_KeyParameter);
        }
    
        public virtual ObjectResult<Stproc_SEARCH_DOCTOR_WITH_CODE_Result> Stproc_SEARCH_DOCTOR_WITH_CODE(string ahMst_Key)
        {
            var ahMst_KeyParameter = ahMst_Key != null ?
                new ObjectParameter("AhMst_Key", ahMst_Key) :
                new ObjectParameter("AhMst_Key", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Stproc_SEARCH_DOCTOR_WITH_CODE_Result>("Stproc_SEARCH_DOCTOR_WITH_CODE", ahMst_KeyParameter);
        }
    
        public virtual ObjectResult<Stproc_SEARCH_DOCTOR_WITH_WORD_Result> Stproc_SEARCH_DOCTOR_WITH_WORD(string ahMst_pName)
        {
            var ahMst_pNameParameter = ahMst_pName != null ?
                new ObjectParameter("AhMst_pName", ahMst_pName) :
                new ObjectParameter("AhMst_pName", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Stproc_SEARCH_DOCTOR_WITH_WORD_Result>("Stproc_SEARCH_DOCTOR_WITH_WORD", ahMst_pNameParameter);
        }
    
        public virtual ObjectResult<Stproc_SEARCH_DOCTR_WITH_NAME_Result> Stproc_SEARCH_DOCTR_WITH_NAME(string ahMst_pName)
        {
            var ahMst_pNameParameter = ahMst_pName != null ?
                new ObjectParameter("AhMst_pName", ahMst_pName) :
                new ObjectParameter("AhMst_pName", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Stproc_SEARCH_DOCTR_WITH_NAME_Result>("Stproc_SEARCH_DOCTR_WITH_NAME", ahMst_pNameParameter);
        }
    
        public virtual ObjectResult<Stproc_SEARCH_DPT_CORPORATE_WITH_KEY_Result> Stproc_SEARCH_DPT_CORPORATE_WITH_KEY(Nullable<double> ahMst_Key, Nullable<double> ahMst_AreaID)
        {
            var ahMst_KeyParameter = ahMst_Key.HasValue ?
                new ObjectParameter("AhMst_Key", ahMst_Key) :
                new ObjectParameter("AhMst_Key", typeof(double));
    
            var ahMst_AreaIDParameter = ahMst_AreaID.HasValue ?
                new ObjectParameter("AhMst_AreaID", ahMst_AreaID) :
                new ObjectParameter("AhMst_AreaID", typeof(double));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Stproc_SEARCH_DPT_CORPORATE_WITH_KEY_Result>("Stproc_SEARCH_DPT_CORPORATE_WITH_KEY", ahMst_KeyParameter, ahMst_AreaIDParameter);
        }
    
        public virtual ObjectResult<Stproc_SEARCH_DPT_CORPORATE_WITH_PHN_Result> Stproc_SEARCH_DPT_CORPORATE_WITH_PHN(string ahMst_mobile, Nullable<double> ahMst_AreaID)
        {
            var ahMst_mobileParameter = ahMst_mobile != null ?
                new ObjectParameter("AhMst_mobile", ahMst_mobile) :
                new ObjectParameter("AhMst_mobile", typeof(string));
    
            var ahMst_AreaIDParameter = ahMst_AreaID.HasValue ?
                new ObjectParameter("AhMst_AreaID", ahMst_AreaID) :
                new ObjectParameter("AhMst_AreaID", typeof(double));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Stproc_SEARCH_DPT_CORPORATE_WITH_PHN_Result>("Stproc_SEARCH_DPT_CORPORATE_WITH_PHN", ahMst_mobileParameter, ahMst_AreaIDParameter);
        }
    
        public virtual ObjectResult<Stproc_SEARCH_DPT_CORPORATE_WITH_TERM_Result> Stproc_SEARCH_DPT_CORPORATE_WITH_TERM(string ahMst_pName, Nullable<double> ahMst_AreaID)
        {
            var ahMst_pNameParameter = ahMst_pName != null ?
                new ObjectParameter("AhMst_pName", ahMst_pName) :
                new ObjectParameter("AhMst_pName", typeof(string));
    
            var ahMst_AreaIDParameter = ahMst_AreaID.HasValue ?
                new ObjectParameter("AhMst_AreaID", ahMst_AreaID) :
                new ObjectParameter("AhMst_AreaID", typeof(double));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Stproc_SEARCH_DPT_CORPORATE_WITH_TERM_Result>("Stproc_SEARCH_DPT_CORPORATE_WITH_TERM", ahMst_pNameParameter, ahMst_AreaIDParameter);
        }
    
        public virtual ObjectResult<Stproc_SEARCH_HOSP_WITH_KEY_Result> Stproc_SEARCH_HOSP_WITH_KEY(string ahMst_Key)
        {
            var ahMst_KeyParameter = ahMst_Key != null ?
                new ObjectParameter("AhMst_Key", ahMst_Key) :
                new ObjectParameter("AhMst_Key", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Stproc_SEARCH_HOSP_WITH_KEY_Result>("Stproc_SEARCH_HOSP_WITH_KEY", ahMst_KeyParameter);
        }
    
        public virtual ObjectResult<Stproc_SEARCH_HOSP_WITH_NAME_Result> Stproc_SEARCH_HOSP_WITH_NAME(string ahMst_pName)
        {
            var ahMst_pNameParameter = ahMst_pName != null ?
                new ObjectParameter("AhMst_pName", ahMst_pName) :
                new ObjectParameter("AhMst_pName", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Stproc_SEARCH_HOSP_WITH_NAME_Result>("Stproc_SEARCH_HOSP_WITH_NAME", ahMst_pNameParameter);
        }
    
        public virtual ObjectResult<Stproc_SEARCH_LAB_WITH_KEY_Result> Stproc_SEARCH_LAB_WITH_KEY(string ahMst_Key)
        {
            var ahMst_KeyParameter = ahMst_Key != null ?
                new ObjectParameter("AhMst_Key", ahMst_Key) :
                new ObjectParameter("AhMst_Key", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Stproc_SEARCH_LAB_WITH_KEY_Result>("Stproc_SEARCH_LAB_WITH_KEY", ahMst_KeyParameter);
        }
    
        public virtual ObjectResult<Stproc_SEARCH_LAB_WITH_NAME_Result> Stproc_SEARCH_LAB_WITH_NAME(string ahMst_pName)
        {
            var ahMst_pNameParameter = ahMst_pName != null ?
                new ObjectParameter("AhMst_pName", ahMst_pName) :
                new ObjectParameter("AhMst_pName", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Stproc_SEARCH_LAB_WITH_NAME_Result>("Stproc_SEARCH_LAB_WITH_NAME", ahMst_pNameParameter);
        }
    
        public virtual ObjectResult<Stproc_SEARCH_TEST_WITH_KEY_Result> Stproc_SEARCH_TEST_WITH_KEY(string tstMst_Key)
        {
            var tstMst_KeyParameter = tstMst_Key != null ?
                new ObjectParameter("TstMst_Key", tstMst_Key) :
                new ObjectParameter("TstMst_Key", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Stproc_SEARCH_TEST_WITH_KEY_Result>("Stproc_SEARCH_TEST_WITH_KEY", tstMst_KeyParameter);
        }
    
        public virtual ObjectResult<Stproc_SEARCH_TEST_WITH_NAME_Result> Stproc_SEARCH_TEST_WITH_NAME(string tstMst_Name)
        {
            var tstMst_NameParameter = tstMst_Name != null ?
                new ObjectParameter("TstMst_Name", tstMst_Name) :
                new ObjectParameter("TstMst_Name", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Stproc_SEARCH_TEST_WITH_NAME_Result>("Stproc_SEARCH_TEST_WITH_NAME", tstMst_NameParameter);
        }
    
        public virtual ObjectResult<Stproc_SEARCH_USER_WITH_CODE_Result> Stproc_SEARCH_USER_WITH_CODE(string ahMst_Key)
        {
            var ahMst_KeyParameter = ahMst_Key != null ?
                new ObjectParameter("AhMst_Key", ahMst_Key) :
                new ObjectParameter("AhMst_Key", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Stproc_SEARCH_USER_WITH_CODE_Result>("Stproc_SEARCH_USER_WITH_CODE", ahMst_KeyParameter);
        }
    
        public virtual ObjectResult<Stproc_SEARCH_USER_WITH_WORD_Result> Stproc_SEARCH_USER_WITH_WORD(string ahMst_pName)
        {
            var ahMst_pNameParameter = ahMst_pName != null ?
                new ObjectParameter("AhMst_pName", ahMst_pName) :
                new ObjectParameter("AhMst_pName", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Stproc_SEARCH_USER_WITH_WORD_Result>("Stproc_SEARCH_USER_WITH_WORD", ahMst_pNameParameter);
        }
    
        public virtual ObjectResult<Stproc_SRCH_DCTR_WITH_DCTR_CODE_Result> Stproc_SRCH_DCTR_WITH_DCTR_CODE(string ahMst_DrCode)
        {
            var ahMst_DrCodeParameter = ahMst_DrCode != null ?
                new ObjectParameter("AhMst_DrCode", ahMst_DrCode) :
                new ObjectParameter("AhMst_DrCode", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Stproc_SRCH_DCTR_WITH_DCTR_CODE_Result>("Stproc_SRCH_DCTR_WITH_DCTR_CODE", ahMst_DrCodeParameter);
        }
    
        public virtual ObjectResult<Stproc_SRCH_DCTR_WITH_KEY_Result> Stproc_SRCH_DCTR_WITH_KEY(string ahMst_Key)
        {
            var ahMst_KeyParameter = ahMst_Key != null ?
                new ObjectParameter("AhMst_Key", ahMst_Key) :
                new ObjectParameter("AhMst_Key", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Stproc_SRCH_DCTR_WITH_KEY_Result>("Stproc_SRCH_DCTR_WITH_KEY", ahMst_KeyParameter);
        }
    
        public virtual ObjectResult<Stproc_GET_CMPNY_MST_DTLS_Result> Stproc_GET_CMPNY_MST_DTLS()
        {
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Stproc_GET_CMPNY_MST_DTLS_Result>("Stproc_GET_CMPNY_MST_DTLS");
        }
    
        public virtual ObjectResult<string> Stproc_GET_PAYMODE_DETAILS()
        {
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<string>("Stproc_GET_PAYMODE_DETAILS");
        }
    }
}
