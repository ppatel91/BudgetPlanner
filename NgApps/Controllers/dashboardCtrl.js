'use strict';


app.controller('dashboardCtrl', ['$http', '$state', 'authSvc', function ($http, $state, authSvc) {


    var h = this;
    var a = this;
    var t = this;


    h.household = '';

    h.model = {
        Id: '',
        Name: ''
    };

    a.accounts = [];
    a.amodel = {
        Id: '',
        Name: '',
        Balance: '',
        HouseholdId: ''
    };

    t.transactions = [];
    t.tmodel = {
        Id: '',
        Name: '',
        Amount: '',
        AccountId: '',
        CategoryId: '',
        Date: '',
        Description: '',
        Status: ''
    };


    //HOUSEHOLD------------------------------------------HOUSEHOLD

    h.getHousehold = function () {
        //if (authSvc.household) { //the has a household
        //    self.demo = false;
        $http({
            method: 'GET',
            url: authSvc.serviceBase + '/api/Household/HouseholdNameById/' + authSvc.authentication.householdId,
            headers: {  // load this header info for the first request and it applies to all others in the controller
                'Authorization': authSvc.authentication.userName + '/token:' + authSvc.authentication.token,
                'Username': authSvc.authentication.userName,
                'Household': authSvc.authentication.householdId
            }
        }).then(function (response) {
            h.household = response.data;
        });
        //} else {//the user is in the demo household
        //display user message-ubable to post

        //    self.message = "You may not post data to the application while in the demo household. Please Create a household by selecting 'Create Household'."
        //  self.demo = true;
        //}
    };
    h.getHousehold();


    //ACCOUNTS-------------------------------------------ACCOUNTS
    a.getAccounts = function () {
       // if (authSvc.household) { //the has a household
        //    a.demo = false;
            $http({
                method: 'GET',
                url: authSvc.serviceBase + '/api/accounts/All',
                headers: {  // load this header info for the first request and it applies to all others in the controller
                    'Authorization': authSvc.authentication.userName + '/token:' + authSvc.authentication.token,
                    'Username': authSvc.authentication.userName,
                    'Household': authSvc.authentication.householdId
                }
            }).then(function (response) {
                a.accounts = response.data;
            });
       // } else {//the user is in the demo household
            //display user message-ubable to post

      //      a.message = "You may not post data to the application while in the demo household. Please Create a household by selecting 'Create Household'."
     //       a.demo = true;
     //   }
    };

    a.getAccount = function (id) {
        return $http.get(authSvc.serviceBase + '/api/Accounts/Single/' + id).then(function (response) {
            a.amodel = response.data;
        });
    };

    a.createAccount = function () {
        a.amodel.householdId = authSvc.authentication.householdId;

        $http({
            method: 'Post',
            url: authSvc.serviceBase + '/api/Accounts/Create',
            data: a.amodel,
            headers: {
                'Authorization': authSvc.authentication.userName + '/token:' + authSvc.authentication.token,
                'Username': authSvc.authentication.userName,
            }
        }).then(function (response) {
            authSvc.authentication.householdId = response.data;
        });
    };

    a.getAccounts();
    a.getAccount();

    //TRANSACTION---------------------------------------TRANSACTION

    t.getTransaction = function (id) {
      //  if (authSvc.household) { //the has a household
        //    t.demo = false;
            $http({
                method: 'GET',
                url: authSvc.serviceBase + '/api/Transaction/All/' + id,
               // data: t.tmodel,
                headers: {  // load this header info for the first request and it applies to all others in the controller
                    'Authorization': authSvc.authentication.userName + '/token:' + authSvc.authentication.token,
                    'Username': authSvc.authentication.userName,
                    'Household': authSvc.authentication.householdId
                }
            }).then(function (response) {
                t.transactions = response.data;
            });
      //  } else {//the user is in the demo household
            //display user message-ubable to post

        //    t.message = "You may not post data to the application while in the demo household. Please Create a household by selecting 'Create Household'."
      //      t.demo = true;
     //   }
    };

    t.createTransaction = function () {
        t.tmodel.householdId = authSvc.authentication.householdId;

        return $http.post(serviceBase + '/api/Transaction/Create', t.tmodel).then(function (response) {
            return response;
        });
    };

    t.getTransaction();


    self.initModel = function () {
        a.getAccount = function (id) {
            return $http.get(authSvc.serviceBase + '/api/Accounts/Single/' + id).then(function (response) {
                a.amodel = response.data;
            });
        };
    };

    self.initModel();

}]);