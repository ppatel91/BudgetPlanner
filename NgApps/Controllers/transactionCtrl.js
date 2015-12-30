'use strict';

app.controller('accountCtrl', ['$http', '$state', 'authSvc', function ($http, $state, authSvc) {

    var self = this;
    self.transactions = [];
    self.transaction = '';
    self.message = '';
    self.demo = true;

    self.model = {
        Id: '',
        Name: '',
        Amount: '',
        AccountId: '',
        CategoryId: '',
        Date: '',
        Description:'',
        Status:''
    };

    self.getTransaction = function (id) {
        if (authSvc.household) { //the has a household
            self.demo = false;
            $http({
                method: 'GET',
                url: authSvc.serviceBase + '/api/Transaction/All/' + id,
                headers: {  // load this header info for the first request and it applies to all others in the controller
                    'Authorization': authSvc.authentication.userName + '/token:' + authSvc.authentication.token,
                    'Username': authSvc.authentication.userName,
                    'Household': authSvc.authentication.householdId
                }
            }).then(function (response) {
                self.transactions = response.data;
            });
        } else {//the user is in the demo household
            //display user message-ubable to post

            self.message = "You may not post data to the application while in the demo household. Please Create a household by selecting 'Create Household'."
            self.demo = true;
        }
    };

    self.getTransaction = function (id) {
        return $http.get(authSvc.serviceBase + '/api/Transaction/Single/' + id).then(function (response) {
            self.transaction = response.data;
        });
    };


    self.createTransaction = function () {
        return $http.post(serviceBase + '/api/Transaction/Create', self.model).then(function (response) {
            return response;
        });
    };

    self.editTransaction = function () {
        return $http.post(serviceBase + '/api/Transaction/Edit', self.model).then(function (response) {
            self.value = response.data;
            return response;
        });
    };

    self.deleteTransaction = function (id) {
        return $http.post(serviceBase + '/api/Transaction/Delete/' + id, self.model).then(function (response) {
            self.value = response.data;
            return response;
        });
    };


}]);