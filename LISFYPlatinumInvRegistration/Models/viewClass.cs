using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LISFYPlatinumInvRegistration.Models
{
    public class viewClass
    {
        public IEnumerable<paymodeDetails> Teachers { get; set; }
        public IEnumerable<branchdetails> Students { get; set; }

    }
}