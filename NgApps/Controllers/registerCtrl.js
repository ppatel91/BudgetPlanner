'use strict';
app.controller('registerCtrl', ['authSvc', '$timeout', '$state', function (authSvc, $timeout, $state) {
    var self = this;
    self.savedSuccessfully = false;
    self.message = "Register a new account";
    self.isError = false;

    self.model = {
        Name: "",
        Balance: "",
        HouseholdId: "",
        Archived: ""
    };

    self.register = function () {
        authSvc.register(self.model).then(function (response) {
            self.savedSuccessfully = true;
            self.message = "User has been registered successfully, you are being redirected";
            messageDelay(2, redirectCallback);
        },
            function (response) {
                var errors = [];
                for (var key in response.data.ModelState) {
                    for (var i = 0; i < response.data.ModelState[key].length; i++) {
                        errors.push(response.data.ModelState[key][i]);
                    }
                }
                self.message = "Failed to register user due to:" + errors.join(' ');
                self.isError = true;
                messageDelay(2, registerErrorCallback, self);
            });
    };

    var messageDelay = function (interval, callBack, self) {
        var timer = $timeout(function () {
            $timeout.cancel(timer);
            callBack(self);
        }, 1000 * interval);
    };

    var registerErrorCallback = function (self) {
        self.message = "Register a new account";
        self.isError = false;
    };

    var redirectCallback = function () {
        $state.go('login');
    };
}]);