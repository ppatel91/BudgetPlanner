'use strict';

var app = angular.module('app');
app.controller('householdCtrl', ['$http', '$state', 'authSvc', function ($http, $state, authSvc) {

    var self = this;
    self.household = '';
    self.message = '';
    self.demo = true;
    self.users = [];

    self.model = {
        Id: '',
        Name: ''
    };

    self.getHousehold = function () {
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
            self.household = response.data;
        });
        //} else {//the user is in the demo household
        //display user message-ubable to post

        //    self.message = "You may not post data to the application while in the demo household. Please Create a household by selecting 'Create Household'."
        //  self.demo = true;
        //}
    };


    self.getUsers = function (id) {
        return $http.get(authSvc.serviceBase + '/api/Household/UsersInHousehold/' + id).then(function (response) {
            self.users = response.data;
        });
    };


    self.createHousehold = function () {
        $http({
            method: 'Post',
            url: authSvc.serviceBase + '/api/Household/create',
            data: self.householdName,
            headers: {
                'Authorization': authSvc.authentication.userName + '/token:' + authSvc.authentication.token,
                'Username': authSvc.authentication.userName,
            }
            }).then(function (response) {
                authSvc.authentication.householdId = response.data;
            });


    };

    self.joinHousehold = function () {
        return $http.post(serviceBase + '/api/Household/Join', self.model).then(function (response) {
            self.value = response.data;
            return response;
        });
    };

    self.leaveHousehold = function () {
        return $http.post(serviceBase + '/api/Household/Leave', self.model).then(function (response) {
            self.value = response.data;
            return response;
        });
    };

    self.getHousehold();

}]);