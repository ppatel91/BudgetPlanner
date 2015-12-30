'use strict';

app.controller('homeCtrl', ['$http', '$state', 'authSvc', function ($http, $state, authSvc) {

    var self = this;
    self.values = [];
    self.value = '';
    self.message = '';


    self.getValues = function () {
        if (authSvc.household) {
            $http({
                method: 'GET',
                url: authSvc.serviceBase + '/api/values',
                headers: {  // load this header info for the first request and it applies to all others in the controller
                    'Authorization': authSvc.authentication.userName + '/token:' + authSvc.authentication.token
                }
            }).then(function (response) {
                self.values = response.data;
            });
        } else {

            self.message = "You may not post data to the application while in the demo household. Please Create a household by selecting 'Create Household'."
        }
    };

    self.getValue = function (id) {
        return $http.get(authSvc.serviceBase + '/api/values/' + id).then(function (response) {
            self.value = response.data;
        });
    };


    // You can call the API directly from the controller, or you can use a service as we did in the CarFinder
    //self.getValues = function () {
    //    homeSvc.getValues().then(function (data) {
    //        self.values = data;
    //    });
    //};

    //self.getValue = function (id) {
    //    homeSvc.getValue(id).then(function (data) {
    //        self.value = data;
    //    });
    //};

}]);
