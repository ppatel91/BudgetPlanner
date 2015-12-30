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
   // [Authorize]
    public class BudgetItemController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();
        
        /// <summary>
        /// Get all budget items in a budget 
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        [HttpGet]
        [ActionName("All")]
        public IEnumerable<BudgetItem> AllBudgetItems(int Id)
        {
            string username = Request.Headers.GetValues("Username").First();
            string household = Request.Headers.GetValues("Household").First();
            int householdId = Int32.Parse(household);

            var tResult = db.Database.SqlQuery<BudgetItem>("EXEC GetBudgetItemByBudgetId @budgetId",
                new SqlParameter("budgetId", Id)).ToList();
            return tResult;
        }


        /// <summary>
        /// Get budget using the budget Id
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        [HttpGet]
        [ActionName("Single")]
        public BudgetItem SingleTransaction(int Id)
        {
            var tResult = db.Database.SqlQuery<BudgetItem>("EXEC GetBudgetItemById @budgetItemId",
                new SqlParameter("budgetItemId", Id)
                );
            return tResult.FirstAsync().Result;
        }

        /// <summary>
        /// Create the item in a budget
        /// </summary>
        /// <param name="b"></param>
        [HttpGet]
        [ActionName("Create")]
        public void CreateBudgetItem(BudgetItem b)
        {
            var iResult = db.Database.SqlQuery<BudgetItem>("EXEC CreateBudgetItems  @amount, @name, @categoryId, @budgetId",

                new SqlParameter("amount", b.Amount),
                new SqlParameter("name", b.Name),
                new SqlParameter("categoryId", b.CategoryId),
                new SqlParameter("budgetId", b.BudgetId)
                );
        }

        /// <summary>
        /// Edit the item in a budget
        /// </summary>
        /// <param name="b"></param>
        [HttpGet]
        [ActionName("Edit")]
        public void EditBudgetItem(BudgetItem b)
        {
            var iResult = db.Database.SqlQuery<BudgetItem>("EXEC EditBudgetItems @name, @amount, @categoryId, @budgetItemId",
                new SqlParameter("name", b.Name),
                new SqlParameter("amount", b.Amount),
                new SqlParameter("categoryId", b.CategoryId),
                new SqlParameter("budgetItemId", b.Id)
                );
        }

        /// <summary>
        /// Delete the item in a budget
        /// </summary>
        /// <param name="id"></param>
        [HttpPost]
        [ActionName("Delete")]
        public void Delete(int id)
        {
            var iResult = db.Database.SqlQuery<BudgetItem>("EXEC DeleteBudgetItem @budgetItemId",
                            new SqlParameter("budgetItemId", id)
                            );
        }
    }
}
