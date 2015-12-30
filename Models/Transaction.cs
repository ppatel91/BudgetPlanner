using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace BudgetPlanner.Models
{
    public class Transaction
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public float Amount { get; set; }
        public int AccountId { get; set; }
        public int CategoryId { get; set; }

        public DateTimeOffset? Date { get; set; }

        public string Description { get; set; }
        public bool? Status { get; set; }

        public virtual Account Account { get; set; }
        public virtual Category Category { get; set; }


    }
}