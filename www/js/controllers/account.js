var app = angular.module('mealtrack.controllers.account', []);

/*********************************************************************
 * AccountCtrl
 *********************************************************************/
app.controller('AccountCtrl', function ($scope, $state, AuthService,UsersModel,$ionicPopup) {


    if(!AuthService.CurrentUser){
        $state.go('login');
    }else
    {
        console.log("From Account Ctrl");

        $scope.formData = {
            firstName: AuthService.CurrentUser.firstName,
            lastName: AuthService.CurrentUser.lastName,
            email: AuthService.CurrentUser.username
        };

    }

	$scope.submit = function (form) {

        if(form.$valid){
            console.log("AccountCtrl::submit");
            UsersModel.update(AuthService.CurrentUser.userId,$scope.formData)
                .then(function (reslt) {
                    console.log(reslt);
                    $ionicPopup.alert({
                        'title':'Yeaah It\'s Done',
                        'subTitle': 'Editing Completed With success'
                    });


                }, function (err) {
                    console.error(err);
                    $ionicPopup.alert({
                        'title':'Error',
                        'subTitle': err.error_description
                });

        });




        }

	};


	$scope.logout = function () {
		console.log("AccountCtrl::logout");
        AuthService.signout().then(function () {
            $state.go('login');

        });

		//TODO
	};
});
