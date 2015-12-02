using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BudgetPlanner.Models
{
    public class Account
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public float Balance { get; set; }
        public int HouseholdId { get; set; }
        public bool? Archived { get; set; }
        
        public virtual Household Household {get; set;}
        
    }
}