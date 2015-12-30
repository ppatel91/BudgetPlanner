'use strict';

app.controller('categoryCtrl', ['$http', '$state', 'authSvc', function ($http, $state, authSvc) {

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

    c.getCategory = function () {
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