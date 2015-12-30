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
    //[Authorize]
    public class BudgetController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();


        /// <summary>
        /// Get all household budget by householdId
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [ActionName("All")]
        public IEnumerable<Budget> Get()
        {
            string username = Request.Headers.GetValues("Username").First();
            string household = Request.Headers.GetValues("Household").First();
            int householdId = Int32.Parse(household);

            //get a list of all accounts for the household with the supplied Id
            var budgetResult = db.Database.SqlQuery<Budget>("EXEC GetHouseholdBudget @householdId",
                new SqlParameter("householdId", householdId)).ToList();
            //return list of accounts
            return budgetResult;
        }


        [HttpGet]
        [ActionName("AllByHouseholdId")]
        public IEnumerable<Budget> Get2()
        {
            string username = Request.Headers.GetValues("Username").First();
            string household = Request.Headers.GetValues("Household").First();
            int householdId = Int32.Parse(household);

            //get a list of all accounts for the household with the supplied Id
            var budgetResult = db.Database.SqlQuery<Budget>("EXEC GetBudgetByHouseholdId  @householdId",
                new SqlParameter("householdId", householdId)).ToList();
            //return list of accounts
            return budgetResult;
        }

        /// <summary>
        /// Get a budget by budgetId
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        [ActionName("Single")]
        public Budget Get(int id)
        {
            var budgetResult = db.Database.SqlQuery<Budget>("EXEC GetBudgetsByBudgetId @budgetId",
                new SqlParameter("budgetId", id));
            //return the account
            return budgetResult.FirstAsync().Result;
        }

        /// <summary>
        /// Create a Budget for a certain month and/or year
        /// </summary>
        /// <param name="b"></param>
        [HttpPost]
        [ActionName("Create")]
        public void CreateBudget(Budget b)
        {
            var bResult = db.Database.SqlQuery<Budget>("EXEC CreateBudget @month, @year, @householdId",
                new SqlParameter("month", b.Month),
                new SqlParameter("year",b.Year),
                new SqlParameter("householdId", b.HouseholdId)
                ).First();
        }

        /// <summary>
        /// Edit Budget
        /// </summary>
        /// <param name="b"></param>
        [HttpPost]
        [ActionName("Edit")]
        public void EditBudget(Budget b)
        {
            var bResult = db.Database.SqlQuery<Budget>("EXEC EditBudget @month, @year, @budgetId",
                new SqlParameter("month", b.Month),
                new SqlParameter("year", b.Year),
                new SqlParameter("budgetId", b.Id)
                );
        }


        // DELETE: api/Budget/5
        //public void Delete(int Id)
        //{
        //    var Result = db.Database.SqlQuery<Budget>("EXEC DeleteBudget @budgetId",
        //        new SqlParameter("budgetId", Id)
        //        );
        //}
    }
}
