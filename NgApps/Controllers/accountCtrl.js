'use strict';

app.controller('accountCtrl', ['$http', '$state', 'authSvc', function ($http, $state, authSvc) {

    var self = this;
    self.accounts = [];
    self.account = '';
    self.message = '';
    self.demo = true;
    self.householdName = '';


    self.model = {
        Id : '',
        Name: '',
        Balance: '',
        HouseholdId: authSvc.authentication.householdId,
    };

    self.getAccounts = function () {
     //   if (authSvc.household) { //the has a household
        //    self.demo = false;
            $http({
                method: 'GET',
                url: authSvc.serviceBase + '/api/accounts/All',
                headers: {  // load this header info for the first request and it applies to all others in the controller
                    'Authorization': authSvc.authentication.userName + '/token:' + authSvc.authentication.token,
                    'Username': authSvc.authentication.userName,
                    'Household': authSvc.authentication.householdId
                }
            }).then(function (response) {
                self.accounts = response.data;
            });
     //   } else {//the user is in the demo household
            //display user message-ubable to post

      //      self.message = "You may not post data to the application while in the demo household. Please Create a household by selecting 'Create Household'."
      //      self.demo = true;
      //  }
    };

    self.getAccount = function (id) {
        return $http.get(authSvc.serviceBase + '/api/Accounts/Single/' + id).then(function (response) {
            self.account = response.data;
        });
    };


    self.createAccount = function () {
        return $http.post(serviceBase + '/api/Accounts/Create', self.model).then(function (response) {
            return response;
        });
    };

    self.editAccount = function () {
        return $http.post(serviceBase + '/api/Accounts/Edit', self.model).then(function (response) {
            self.value = response.data;
            return response;
        });
    };

    self.archiveAccount = function () {
        return $http.post(serviceBase + '/api/Accounts/Archive', self.model).then(function (response) {
            self.value = response.data;
            return response;
        });
    };

    self.unarchiveAccount = function () {
        return $http.post(serviceBase + '/api/Accounts/Unarchive', self.model).then(function (response) {
            self.value = response.data;
            return response;
        });
    };

    //self.getHousehold = function () {
    //    return $http.get(authSvc.serviceBase + '/api/Household/', authSvc.authentication.HouseholdId).then(function (response) {
    //        self.householdName = response.data;
    //    });
    //};
    //self.getHousehold();


    self.getAccounts();
    self.getAccount();
}]);