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
        public IEnumerable<Category> AllCategory(int Id )
        {

            var cResult = db.Database.SqlQuery<Category>("EXEC GetCategoryByHouseholdId @householdId",
                new SqlParameter("householdId", Id)).ToList();
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
                ).ToList();

            return cResult.First();
        }

        /// <summary>
        /// Create a Category 
        /// </summary>
        /// <param name="t"></param>
        [HttpPost]
        [ActionName("Create")]
        public void CreateCategory(Category c)
        {
            var tResult = db.Database.SqlQuery<int>("EXEC CreateCategory @name, @householdId, @expenseTF",

                new SqlParameter("name", c.Name),
                new SqlParameter("householdId", c.HouseholdId),
                new SqlParameter("expenseTF", c.ExpenseTF)).First();

        }

        /// <summary>
        /// Edit a Category
        /// </summary>
        /// <param name="t"></param>
        [HttpPost]
        [ActionName("Edit")]
        public void EditCategory(Category c)
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
