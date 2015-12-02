using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BudgetPlanner.Models
{
    public class Budget
    {
        public int Id {get; set;}
        public string Month { get; set; }
        public int Year { get; set; }
        public int HouseholdId { get; set; }

        public virtual Household Household { get; set; }
    }
}