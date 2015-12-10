using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Data.SqlClient;
using BudgetPlanner.Models;

namespace BudgetPlanner.Controllers
{
    public class InvitationController : ApiController
    {
       private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/Invitation
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Invitation/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Invitation
        public void Post([FromBody]string email)
        {
            var user = db.Users.FirstOrDefault(u => u.UserName == User.Identity.Name);
            db.Database.SqlQuery<Invitation>("EXEC CreateInvitation @toEmail, @fromEmail, @householdId, @inviteCode",
                new SqlParameter("toEmail", email),
                new SqlParameter("fromEmail", user.Email),
                new SqlParameter("inviteCode", Guid.NewGuid().ToString())
                );

            //now use sendgrid to send email to email with a invitation to join, the url, and invite code


        }

        // PUT: api/Invitation/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Invitation/5
        public void Delete(int id)
        {
        }
    }
}
