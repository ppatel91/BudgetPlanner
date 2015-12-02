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
    public class TransactionController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        /// <summary>
        /// Get all Transactions in an Account
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        [HttpGet]
        [ActionName("All")]
        public IEnumerable<Transaction> AllTransactions(int Id)
        {
            var tResult = db.Database.SqlQuery<Transaction>("EXEC GetTransactionByAccount @accountId",
                new SqlParameter("accountId", Id)
                );
            return tResult;
        }


        /// <summary>
        /// Get a Single Tranaction By ID
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        [HttpGet]
        [ActionName("Single")]
        public Transaction SingleTransaction(int Id)
        {
            var tResult = db.Database.SqlQuery<Transaction>("EXEC GetTransactionByTransactionId @transactionId",
                new SqlParameter("transactionId", Id)
                );
            return tResult.FirstAsync().Result;
        }

        /// <summary>
        /// Create Transaction
        /// </summary>
        /// <param name="t"></param>
        [HttpPost]
        [ActionName("Create")]
        public void CreateTransaction(Transaction t)
        {
            var tResult = db.Database.SqlQuery<Transaction>("EXEC CreateTransaction @amount, @date, @accountId, @categoryId, @description",

                new SqlParameter("amount", t.Amount),
                new SqlParameter("date", t.Date),
                new SqlParameter("accountId", t.AccountId),
                new SqlParameter("categoryId", t.CategoryId),
                new SqlParameter("description", t.Description)
                );

        }

        /// <summary>
        /// Edit Transaction using TransactionId
        /// </summary>
        /// <param name="t"></param>
        [HttpPost]
        [ActionName("Edit")]
        public void EditTransaction(Transaction t)
        {
            var tResult = db.Database.SqlQuery<Transaction>("EXEC EditTransaction @name, @amount, @categoryId, @date, @description, @status, @transactionId",

                new SqlParameter("amount", t.Amount),
                new SqlParameter("categoryId", t.CategoryId),
                new SqlParameter("date", t.Date),
                new SqlParameter("description", t.Description),
                new SqlParameter("status", t.Status),
                new SqlParameter("transactionId", t.Id)
                );
        }

        /// <summary>
        /// Deletes Transaction using a transaction Id
        /// </summary>
        /// <param name="id"></param>
        [HttpPost]
        [ActionName("Delete")]
        public void Delete(int id)
        {
            var tResult = db.Database.SqlQuery<Transaction>("EXEC DeleteTransaction @transactionId",
                            new SqlParameter("transactionId", id)
                            );
        }
    }
}
