var app = angular.module('mealtrack.controllers.meals', []);


/*********************************************************************
 * MealListCtrl
 *********************************************************************/




app.controller('DashboardCtrl', function ($scope,ItemsModel, $rootScope) {


    function getAll() {
        console.log('Getting All');
        ItemsModel.all()
            .then(function (result) {
                $scope.data = result.data.data;
                console.log($scope.data);

            });
    }
    getAll();



    function clearData(){
        $scope.data = null;
    }

    function create(object) {
        ItemsModel.create(object)
            .then(function (result) {
                cancelCreate();
                getAll();
            });
    }

    function update(object) {
        ItemsModel.update(object.id, object)
            .then(function (result) {
                cancelEditing();
                getAll();
            });
    }

    function deleteObject(id) {
        ItemsModel.delete(id)
            .then(function (result) {
                cancelEditing();
                getAll();
            });
    }

    function initCreateForm() {
        $scope.newObject = {name: '', description: ''};
    }

    function setEdited(object) {
        $scope.edited = angular.copy(object);
        $scope.isEditing = true;
    }

    function isCurrent(id) {
        return $scope.edited !== null && $scope.edited.id === id;
    }

    function cancelEditing() {
        $scope.edited = null;
        $scope.isEditing = false;
    }

    function cancelCreate() {
        initCreateForm();
        $scope.isCreating = false;
    }



    $rootScope.$on('logout', function () {
        clearData();
    });

    if(!$scope.isAuthorized){
        $rootScope.$broadcast('logout');
    }



});










app.controller('MealListCtrl', function ($scope, $ionicLoading, MealService) {

	$scope.meals = MealService;

	//$ionicLoading.show();
	$scope.meals.load().then(function () {
	//	$ionicLoading.hide();
	});

	$scope.refreshItems = function () {
		$scope.meals.refresh().then(function () {
			$scope.$broadcast('scroll.refreshComplete');
		});
	};

	$scope.nextPage = function () {
		$scope.meals.next().then(function () {
			$scope.$broadcast('scroll.infiniteScrollComplete');
		});
	};

});

/*********************************************************************
 * MealCreateCtrl
 *********************************************************************/
app.controller('MealCreateCtrl', function ($scope,
                                           $state,
                                           $ionicPopup,
                                           $ionicLoading,
                                           $cordovaCamera,
                                           MealService) {

	$scope.resetFormData = function () {
		$scope.formData = {
			'title': '',
			'category': '',
			'calories': 29,
			'picture': null
		};
	};
	$scope.resetFormData();


	$scope.trackMeal = function (form) {

        if(form.$valid){
            console.log("MealCreateCtrl::trackMeal");
            $ionicLoading.show();
            MealService.track($scope.formData)
                .then(function () {
                    $scope.resetFormData();
                    $ionicLoading.hide();
                    $ionicPopup.alert({
                        'title':'Meal Added'
                    });
                    form.$setPristine(true);
                    $state.go('tab.meals');

                });
        }
		//TODO
	};

	$scope.addPicture = function () {
		var options = {
			quality: 50,
			destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY, //Development Mode
           // sourceType: Camera.PictureSourceType.CAMERA, Production Mode
			allowEdit: true,
			encodingType: Camera.EncodingType.JPEG,
			targetWidth: 480,
			popoverOptions: CameraPopoverOptions,
			saveToPhotoAlbum: false
		};


        $cordovaCamera.getPicture(options)
            .then(function (imageData) {
                $scope.formData.picture=imageData;
            }, function (err) {
                console.error(err);
                $ionicPopup.alert({
                    'title':"Error Getting Pic",
                    subTitle:'You Had a problem , Try again please'
                })
            });


		//TODO


	};

});