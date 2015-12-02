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
    public class HouseholdController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();


        /// <summary>
        /// Get Household using the Username
        /// </summary>
        /// <returns></returns>
        /// 
        [HttpGet]
        [ActionName("HouseholdByUserName")]
        public int GetHouseholdByUserId()
        {
            var householdId = db.Database.SqlQuery<int>("EXEC GetHouseholdIdByUsername @name",
                new SqlParameter("name", User.Identity.Name)).FirstAsync().Result;
            //return the account
            return householdId;
        }

        /// <summary>
        /// Get household using householdId
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [ActionName("HouseholdByID")]
        public Household Get()
        {
            var householdResult = db.Database.SqlQuery<Household>("EXEC GetHouseholdById @householdId",
                new SqlParameter("householdId", GetHouseholdByUserId()));
            return householdResult.FirstAsync().Result;
        }

        /// <summary>
        /// Get all users in household
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [ActionName("UsersInHousehold")]
        public IEnumerable<ApplicationUser> UsersInHousehold()
        {
            var userResult = db.Database.SqlQuery<ApplicationUser>("Exec GetUsersInHousehold @householdId",
                new SqlParameter("householdId", GetHouseholdByUserId())
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
            var hResult = db.Database.SqlQuery<ApplicationUser>("EXEC JoinHousehold @householdId, @userId",
                new SqlParameter("householdId", h.HouseHoldId),
                new SqlParameter("userId", h.Id)
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
