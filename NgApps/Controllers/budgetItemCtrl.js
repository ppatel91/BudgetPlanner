'use strict';

app.controller('budgetItemCtrl', ['$http', '$state', 'authSvc', function ($http, $state, authSvc) {

    var i = this;
    i.budgetItems = [];
    i.budgetItem = '';
    i.message = '';
    i.demo = true;

    i.imodel = {
        Id: '',
        Amount: '',
        Name: '',
        CategoryId: '',
        BudgetId: ''
    };

    i.getBudgetItem = function (id) {
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


    i.createBudgetItem = function () {
        return $http.post(serviceBase + '/api/BudgetItem/Create', i.imodel).then(function (response) {
            return response;
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


}]);