using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BudgetPlanner.Models
{
    public class Category
    {
        public int Id { get; set; }
        public string HouseholdName { get; set; }
        public string Name { get; set; }
        public bool ExpenseTF { get; set; }

    }
}