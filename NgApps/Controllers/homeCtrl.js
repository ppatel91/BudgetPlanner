'use strict';
angular.module('app')
    //.factory('homeSvc', ['$http', 'ngAuthSettings', function ($http, ngAuthSettings) {

    //    var serviceBase = ngAuthSettings.apiServiceBaseUri;
    //    var homeServiceFactory = {};

    //    var getValues = function () {
    //        return $http.get(serviceBase + '/api/values').then(function (response) {
    //            return response.data;
    //        });
    //    };

    //    var getValue = function (id) {
    //        return $http.get(serviceBase + '/api/values/' + id).then(function (response) {
    //            return response.data;
    //        });
    //    };

    //    return homeServiceFactory;
    //}])
//.controller('homeCtrl', ['homeSvc', '$state', function (homeSvc, $state) {
.controller('homeCtrl', ['$http', '$state', 'authSvc', function ($http, $state, authSvc) {

    var self = this;
    self.values = [];
    self.value = '';

    //self.getValues = function () {
    //    return $http.get(serviceBase + '/api/values').then(function (response) {
    //        self.values = response.data;
    //    });
    //};

    self.getValues = function () {
        $http({
            method: 'GET',
            url: authSvc.serviceBase + '/api/values',
            headers: {  // load this header info for the first request and it applies to all others in the controller
                'Authorization': authSvc.authentication.userName + '/token:' + authSvc.authentication.token
            }
        }).then(function (response) {
            self.values = response.data;
        });
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
