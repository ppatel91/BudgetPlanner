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
    public class AccountsController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();
        /// <summary>
        /// Get account information by HouseholdID
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [ActionName("All")]
        public IEnumerable<Account> Get()
        {
            string username = Request.Headers.GetValues("Username").First();
            string household = Request.Headers.GetValues("Household").First();
            int householdId = Int32.Parse(household);

            //get a list of all accounts for the household with the supplied Id
            var accountResult = db.Database.SqlQuery<Account>("EXEC GetAccountInformation @householdId", 
                new SqlParameter("householdId", householdId)).ToList();
            //return list of accounts
            return accountResult; 
        }

        /// <summary>
        /// Get account by account Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        [ActionName("Single")]
        public Account Get(int id)
        {
            //get account that matches the supplied ID
            var accountResult = db.Database.SqlQuery<Account>("EXEC GetAccountsByAccountId @accountId", 
                new SqlParameter("accountId", id)).ToList();
            //return the account
            var r = accountResult.First();
            return r;
        }


        /// <summary>
        /// Create Account and give it a name, and balance
        /// </summary>
        /// <param name="a"></param>
        [HttpPost]
        [ActionName("Create")]
        public void CreateAccount(Account a)
        {

            var aResult = db.Database.SqlQuery<int>("EXEC CreateAccount @name, @balance, @householdId",
                new SqlParameter("name", a.Name),
                new SqlParameter("balance", a.Balance),
                new SqlParameter("householdId", a.HouseholdId)
                ).First();

        }

        /// <summary>
        /// Edit Account information
        /// </summary>
        /// <param name="a"></param>
        [HttpGet]
        [ActionName("Edit")]
        public void EditAccount(Account a)
        {
            var aResult = db.Database.SqlQuery<Account>("EXEC EditAccount @name, @balance, @accountId",
                            new SqlParameter("name", a.Name),
                            new SqlParameter("balance", a.Balance),
                            new SqlParameter("accountId", a.Id)
                            );
        }

        /// <summary>
        /// Archive Account Information
        /// </summary>
        /// <param name="a"></param>
        [HttpPost]
        [ActionName("Archive")]
        public void ArchiveAccount(Account a)
        {
            var aResult = db.Database.SqlQuery<Account>("EXEC ArchiveAccount @accountId",
                            new SqlParameter("accountId", a.Id)
                            );
        }

        /// <summary>
        /// Unarchive account information
        /// </summary>
        /// <param name="a"></param>
        [HttpPost]
        [ActionName("Unarchive")]
        public void UnarchiveAccount(Account a)
        {
            var tResult = db.Database.SqlQuery<Account>("EXEC UnArchiveAccount @accountId",
                            new SqlParameter("accountId", a.Id)
                            );
        }

    }
}
