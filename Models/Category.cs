﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BudgetPlanner.Models
{
    public class Category
    {

        public Category()
        {
            this.Transactions = new HashSet<Transaction>();
            this.BudgetItem = new HashSet<BudgetItem>();
        }

        public int Id { get; set; }
        public int? HouseholdId { get; set; }
        public string Name { get; set; }
        public bool ExpenseTF { get; set; }

        public virtual Household Household { get; set; }
        public virtual ICollection<Transaction> Transactions { get; set; }
        public virtual ICollection<BudgetItem> BudgetItem { get; set; }

    }
}