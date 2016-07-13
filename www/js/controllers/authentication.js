var app = angular.module('mealtrack.controllers.authentication', []);

/*********************************************************************
 * LoginCtrl
 *********************************************************************/
app.controller('LoginCtrl', function ($scope, $state, AuthService) {

	$scope.formData = {
		"email": "",
		"password": ""
	};

	$scope.login = function (form) {
        if(form.$valid){
            console.log("LoginCtrl::login");
            AuthService.signin($scope.formData.email,
                $scope.formData.password)
                .then(function (user) {
                    console.log("OKKKK");
                    console.log(user);

                }, function (error) {
                    console.log(error)
                });
        }

	};

});

/*********************************************************************
 * SignupCtrl
 *********************************************************************/
app.controller('SignupCtrl', function ($scope, $state, AuthService) {

	$scope.formData = {
		"firstName": "",
		"lastName": "",
        "email": "",
        "password": ""
	};

	$scope.signup = function (form) {
        if(form.$valid) {
            console.log("SignupCtrl::signup");

            AuthService.signup($scope.formData.firstName,
                $scope.formData.lastName,
                $scope.formData.email,
                $scope.formData.password)
                .then(function (signUpResponse) {
                    if(signUpResponse.userId===null){
                        console.log("Exist");
                        console.log(signUpResponse);

                    }else
                    {
                        console.log("OK");
                        console.log(signUpResponse);
                    }



                }, function (error) {
                    console.log("Exist");

                    console.log(error)
                });
            ;

        }
	};

});