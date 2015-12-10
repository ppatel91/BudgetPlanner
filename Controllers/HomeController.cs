using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BudgetPlanner.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";

            return View();
        }

        public ActionResult Dashboard()
        {
            ViewBag.Title = "Dashboard";

            return View();
        }

        public ActionResult Household()
        {
            ViewBag.Title = "Household";

            return View();
        }

        public ActionResult Accounts()
        {
            ViewBag.Title = "Account";

            return View();
        }

        public ActionResult Budgets()
        {
            ViewBag.Title = "Budget";

            return View();
        }
    }
}
