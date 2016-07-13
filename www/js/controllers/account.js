var app = angular.module('mealtrack.controllers.account', []);

/*********************************************************************
 * AccountCtrl
 *********************************************************************/
app.controller('AccountCtrl', function ($scope, $state, AuthService) {


    if(!AuthService.CurrentUser){
        $state.go('login');
    }else
    {
        console.log("From Account Ctrl");

        $scope.formData = {
            name: AuthService.CurrentUser.firstName,
            email: AuthService.CurrentUser.username
        };

    }

	$scope.submit = function () {
		console.log("AccountCtrl::submit");
		//TODO
	};


	$scope.logout = function () {
		console.log("AccountCtrl::logout");
		//TODO
	};
});
