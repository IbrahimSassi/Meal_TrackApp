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



app.service('AuthService', function ($q,ItemsModel,Backand,$ionicPopup) {

    var service = this,
        CurrentUser=null;
    service.signin = function (email, password) {
        var d = $q.defer();

        //call Backand for sign in
         Backand.signin(email, password)
            .then(function (user) {
                console.log("OKKKK");
                service.CurrentUser= user;

                d.resolve(service.CurrentUser);



            }, function (error) {
                $ionicPopup.alert({
                    'title':'Login Error',
                    'subTitle':error.error_description
                });
                console.log(error)
                d.reject(error);
            });

        return d.promise;
    };


    service.signup = function (firstName,lastName,email,password) {
        console.log(email);
        console.log(name);
        console.log(password);
        var d = $q.defer();



         Backand.signup(firstName, lastName, email, password, password)
            .then(function (signUpResponse) {
                if(signUpResponse.userId===null){
                    console.log("Exist");
                    console.log(signUpResponse);
                    $ionicPopup.alert({
                        'title':'Sign Up Error'
                    });
                    d.reject(signUpResponse);


                }else
                {
                    console.log("OK");
                    service.CurrentUser = signUpResponse;
                    $ionicPopup.alert({
                        'title':'Congratulation',
                        'subTitle':'Welcome To Our Application'
                    });

                    d.resolve(service.CurrentUser);

                }



            }, function (error) {
                console.log("Exist");
                 console.log(error);
                 $ionicPopup.alert({
                     'title':'Sign Up Error',
                     'subTitle':error.data.error_description
                 });

                 d.reject(error);



             });
        return d.promise;


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



