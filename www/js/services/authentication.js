var app = angular.module('mealtrack.services.authentication', []);



app.service('APIInterceptor', function ($rootScope, $q) {
    var service = this;

    service.responseError = function (response) {
        if (response.status === 401) {
            $rootScope.$broadcast('unauthorized');
        }
        return $q.reject(response);
    };
})



app.service('AuthService', function ($q,ItemsModel,Backand) {

    var service = this;

    service.signin = function (email, password) {
        //call Backand for sign in
        return Backand.signin(email, password);
    };


    service.signup = function (firstName,lastName,email,password) {
        console.log(email);
        console.log(name);
        console.log(password);




        return Backand.signup(firstName, lastName, email, password, password);

    }

    service.anonymousLogin= function(){
        // don't have to do anything here,
        // because we set app token att app.js
    }

    service.signout = function () {
        return Backand.signout();
    };


})
;



