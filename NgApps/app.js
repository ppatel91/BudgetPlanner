
var app = angular.module('app', ['ui.router', 'LocalStorageModule']);

app.config(function ($stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/");
    //
    // Now set up the states
    $stateProvider
        .state('login', {
            url: "/login",
            templateUrl: "/NgApps/Templates/login.html",
            controller: "loginCtrl as login"
        })
        .state('household', {
            url: "/household",
            templateUrl: "/NgApps/Templates/household.html",
            controller: "householdCtrl as household"
        })
        .state('register', {
            url: "/register",
            templateUrl: "/NgApps/Templates/register.html",
            controller: "registerCtrl as register"
        })
        .state('account', {
            url: "/account",
            templateUrl: "/NgApps/Templates/account.html",
            controller: "accountCtrl as account"
        })
        .state('budget', {
            url: "/budget",
            templateUrl: "/NgApps/Templates/budget.html",
            controller: "budgetCtrl as budget"
        })
    .state('dashboard', {
        url: "/dashboard",
        templateUrl: "/NgApps/Templates/dashboard.html",
        controller: "dashboardCtrl as dashboard"
    });
});

var serviceBase = 'http://localhost:50676/';

app.constant('ngAuthSettings', {
    apiServiceBaseUri: serviceBase
});

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorSvc');
});

app.run(['authSvc', function (authService) {
    authService.fillAuthData();
}]);

