using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace LISFYPlatinumInvRegistration.Models
{
    public class connection
    {
        public SqlConnection dbcon()
        {
            SqlConnection con = new SqlConnection(System.Web.Configuration.WebConfigurationManager.ConnectionStrings["ConnectionReport"].ConnectionString);
            return con;
        }

    }
}