'use strict';

app.controller('budgetCtrl', ['$http', '$state', 'authSvc', function ($http, $state, authSvc) {
    var b = this;
    b.budgets = [];
    b.budgetBhId = [];
    b.budget = '';
    //self.message = '';
    //self.demo = true;

    b.bmodel = {
        Id: '',
        Month: '',
        Year: '',
        HouseholdId: '',
    };

    b.getBudgets = function () {
     //   if (authSvc.household) { //the has a household
      //      self.demo = false;
            $http({
                method: 'GET',
                url: authSvc.serviceBase + '/api/Budget/All',
                headers: {  // load this header info for the first request and it applies to all others in the controller
                    'Authorization': authSvc.authentication.userName + '/token:' + authSvc.authentication.token,
                    'Username': authSvc.authentication.userName,
                    'Household': authSvc.authentication.householdId
                }
            }).then(function (response) {
                b.budgets = response.data;
            });
      //  } else {//the user is in the demo household
            //display user message-ubable to post

      //      self.message = "You may not post data to the application while in the demo household. Please Create a household by selecting 'Create Household'."
       //     self.demo = true;
    //    }
    };

    b.get2BudgetByHId = function () {
        //   if (authSvc.household) { //the has a household
        //      self.demo = false;
        $http({
            method: 'GET',
            url: authSvc.serviceBase + '/api/Budget/AllByHouseholdId',
            headers: {  // load this header info for the first request and it applies to all others in the controller
                'Authorization': authSvc.authentication.userName + '/token:' + authSvc.authentication.token,
                'Username': authSvc.authentication.userName,
                'Household': authSvc.authentication.householdId
            }
        }).then(function (response) {
            b.budgetBhId = response.data;
        });
        //  } else {//the user is in the demo household
        //display user message-ubable to post

        //      self.message = "You may not post data to the application while in the demo household. Please Create a household by selecting 'Create Household'."
        //     self.demo = true;
        //    }
    };

    b.getBudget = function (id) {
        return $http.get(authSvc.serviceBase + '/api/Budget/Single/' + id).then(function (response) {
            b.budget = response.data;
        });
    };

    b.getBudget();
    b.getBudgets();
    b.get2BudgetByHId();


    b.createBudget = function () {
        b.bmodel.householdId = authSvc.authentication.householdId;

        $http({
            method: 'Post',
            url: authSvc.serviceBase + '/api/Budget/Create',
            data: b.bmodel,
            headers: {
                'Authorization': authSvc.authentication.userName + '/token:' + authSvc.authentication.token,
                'Username': authSvc.authentication.userName,
            }
        }).then(function (response) {
            authSvc.authentication.householdId = response.data;
        });
    };

    b.editBudget = function () {
        return $http.post(serviceBase + '/api/Budget/Edit', b.bmodel).then(function (response) {
            authSvc.authentication.householdId = response.data;
        });
    };


    ///////////////////////////////////////////BUDGET ITEMS/////////////////////////////////////
    var i = this;
    i.budgetItems = [];
    i.budgetItem = '';
    i.message = '';
   // i.demo = true;

    i.imodel = {
        Id: '',
        Amount: '',
        Name: '',
        CategoryId: '',
        BudgetId: ''
    };

    i.getBudgetItems = function (id) {
        // if (authSvc.household) { //the has a household
        //     i.demo = false;
        $http({
            method: 'GET',
            url: authSvc.serviceBase + '/api/BudgetItem/All/' + id,
            headers: {  // load this header info for the first request and it applies to all others in the controller
                'Authorization': authSvc.authentication.userName + '/token:' + authSvc.authentication.token
            }
        }).then(function (response) {
            i.budgetItems = response.data;
        });
        //  } else {//the user is in the demo household
        //display user message-ubable to post
        //
        //       self.message = "You may not post data to the application while in the demo household. Please Create a household by selecting 'Create Household'."
        //        self.demo = true;
        //   }
    };

    i.getBudgetItem = function (id) {
        return $http.get(authSvc.serviceBase + '/api/BudgetItem/Single/' + id).then(function (response) {
            i.budgetItem = response.data;
        });
    };

    i.getBudgetItems();
    i.getBudgetItem();


    i.createBudgetItem = function () {

        i.imodel.householdId = authSvc.authentication.householdId;

        $http({
            method: 'Post',
            url: authSvc.serviceBase + '/api/BudgetItem/Create',
            data: i.imodel,
            headers: {
                'Authorization': authSvc.authentication.userName + '/token:' + authSvc.authentication.token,
                'Username': authSvc.authentication.userName,
            }
        }).then(function (response) {
            authSvc.authentication.householdId = response.data;
        });
    };

    i.editBudgetItem = function () {
        return $http.post(serviceBase + '/api/BudgetItem/Edit', i.imodel).then(function (response) {
            i.value = response.data;
            return response;
        });
    };

    i.deleteBudgetItem = function (id) {
        return $http.post(serviceBase + '/api/BudgetItem/Delete/' + id, i.imodel).then(function (response) {
            i.value = response.data;
            return response;
        });
    };

    /*   ================================== Category =======================================================*/
    var c = this;
    c.categorys = [];
    c.category = '';
    // c.message = '';
    //  c.demo = true;

    c.cmodel = {
        Id: '',
        HouseholdId: '',
        Name: '',
        ExpenseTF: ''
    };

    c.getCategorys = function () {
        // if (authSvc.household) { //the has a household
        //   c.demo = false;
        $http({
            method: 'GET',
            url: authSvc.serviceBase + '/api/Category/All/' + authSvc.authentication.householdId,
            headers: {  // load this header info for the first request and it applies to all others in the controller
                'Authorization': authSvc.authentication.userName + '/token:' + authSvc.authentication.token
            }
        }).then(function (response) {
            c.categorys = response.data;
        });
        //   } else {//the user is in the demo household
        //display user message-ubable to post

        //    c.message = "You may not post data to the application while in the demo household. Please Create a household by selecting 'Create Household'."
        //      c.demo = true;
        //   }
    };

    c.getCategory = function (id) {
        return $http.get(authSvc.serviceBase + '/api/Category/Single/' + id).then(function (response) {
            c.category = response.data;
        });
    };

    c.getCategorys();
    c.getCategory();

    c.createCategory = function () {

        c.cmodel.householdId = authSvc.authentication.householdId;

        $http({
            method: 'Post',
            url: authSvc.serviceBase + '/api/Category/Create',
            data: c.cmodel,
            headers: {
                'Authorization': authSvc.authentication.userName + '/token:' + authSvc.authentication.token,
                'Username': authSvc.authentication.userName,
            }
        }).then(function (response) {
            cmodel.Id = response.data;
        });
    };

    c.editCategory = function () {
        return $http.post(serviceBase + '/api/Category/Edit', c.cmodel).then(function (response) {
            c.value = response.data;
            return response;
        });
    };


    c.deleteCategory = function (id) {
        return $http.post(serviceBase + '/api/Category/Delete/' + id, c.cmodel).then(function (response) {
            c.value = response.data;
            return response;
        });
    };

}]);