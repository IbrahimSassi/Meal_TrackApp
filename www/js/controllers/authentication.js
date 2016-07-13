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
                $scope.formData.password).then(function () {
                    console.log(AuthService.CurrentUser);
                    $state.go('tab.meals');
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

            AuthService.signup(
                $scope.formData.firstName,
                $scope.formData.lastName,
                $scope.formData.email,
                $scope.formData.password)
                .then(function () {
                    console.log(AuthService.CurrentUser);
                    $state.go('tab.meals');
                });

        }
	};

});