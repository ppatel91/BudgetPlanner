using BudgetPlanner.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace BudgetPlanner.Controllers
{
  //  [Authorize]
    public class HouseholdController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();



        public string GetHouseholdById (int id)
        {
            return db.Database.SqlQuery<string>("EXEC GetHouseholdNameById @id",
                new SqlParameter("id", id)).FirstAsync().Result;
        }

        /// <summary>
        /// Get Household using the Username
        /// </summary>
        /// <returns></returns>
        /// 
        [HttpGet]
        [ActionName("HouseholdByUserName")]
        public int GetHouseholdByUserId()
        {
            return db.Database.SqlQuery<int>("EXEC GetHouseholdIdByUsername @name",
                new SqlParameter("name", User.Identity.Name)).FirstAsync().Result;
            //return the account
            
        }

        /// <summary>
        /// Get household using householdId
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [ActionName("HouseholdNameById")]
        public string Get(int id)
        {
            var householdResult = db.Database.SqlQuery<string>("EXEC GetHouseholdNameById @householdId",
                new SqlParameter("householdId", id));
            return householdResult.FirstAsync().Result;
        }

        /// <summary>
        /// Get all users in household
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [ActionName("UsersInHousehold")]
        public IEnumerable<string> UsersInHousehold(int id)
        {
            var userResult = db.Database.SqlQuery<string>("Exec GetUsersInHousehold @householdId",
                new SqlParameter("householdId", id)
                );
            return userResult;
        }

        /// <summary>
        /// Create a Household
        /// </summary>
        /// <param name="h"></param>
        [HttpPost]
        [ActionName("Create")]
        public void CreateHousehold(Household h)
        {
            var hResult = db.Database.SqlQuery<Household>("EXEC CreateHousehold @name",
                new SqlParameter("name", h.Name));

        }

        /// <summary>
        /// Join a Household
        /// </summary>
        /// <param name="h"></param>
        [HttpPost]
        [ActionName("Join")]
        public void JoinHousehold(ApplicationUser h)
        {
            var hResult = db.Database.SqlQuery<ApplicationUser>("EXEC JoinHousehold @householdId, @username",
                new SqlParameter("householdId", h.HouseHoldId),
                new SqlParameter("username", h.UserName)
                );
        }

        /// <summary>
        /// Leave a Household
        /// </summary>
        /// <param name="h"></param>
        [HttpPost]
        [ActionName("Leave")]
        public void LeaveHousehold(ApplicationUser h)
        {
            var hResult = db.Database.SqlQuery<Household>("EXEC LeaveHousehold @userId",
                new SqlParameter("userId", h.Id)
                );
        }
    }
}
