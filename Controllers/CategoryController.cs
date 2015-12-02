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
    public class CategoryController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();
        /// <summary>
        /// Get all categories in a household
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        [HttpGet]
        [ActionName("All")]
        public IEnumerable<Category> AllCategory(string name )
        {
            var cResult = db.Database.SqlQuery<Category>("EXEC GetCategoryByHouseholdName @householdName",
                new SqlParameter("householdName", name)
                );
            return cResult;
        }


        /// <summary>
        /// Get a single category by Id
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        [HttpGet]
        [ActionName("Single")]
        public Category SingleCategory(int Id)
        {
            var cResult = db.Database.SqlQuery<Category>("EXEC GetCategoryById @categoryId",
                new SqlParameter("categoryId", Id)
                );
            return cResult.FirstAsync().Result;
        }

        /// <summary>
        /// Create a Category 
        /// </summary>
        /// <param name="t"></param>
        [HttpPost]
        [ActionName("Create")]
        public void CreateTransaction(Category c)
        {
            var tResult = db.Database.SqlQuery<Category>("EXEC CreateCategory @name, @householdName, @expenseTF",

                new SqlParameter("name", c.Name),
                new SqlParameter("householdName", c.HouseholdName),
                new SqlParameter("expenseTF", c.ExpenseTF)
                );

        }

        /// <summary>
        /// Edit a Category
        /// </summary>
        /// <param name="t"></param>
        [HttpPost]
        [ActionName("Edit")]
        public void EditTransaction(Category c)
        {
            var tResult = db.Database.SqlQuery<Category>("EXEC EditCategory @name, @expenseTF, @categoryId",

                new SqlParameter("name", c.Name),
                new SqlParameter("expenseTF", c.ExpenseTF),
                new SqlParameter("categoryId", c.Id)
                );
        }

        /// <summary>
        /// Delete a Category
        /// </summary>
        /// <param name="id"></param>
        [HttpPost]
        [ActionName("Delete")]
        public void Delete(int id)
        {
            var tResult = db.Database.SqlQuery<Category>("EXEC DeleteCategory @categoryId",
                            new SqlParameter("categoryId", id)
                            );
        }
    }
}
