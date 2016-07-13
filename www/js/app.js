var app = angular.module('mealtrack', [
	'ionic',
	'ngMessages',
	'ngCordova',
	'angularMoment',
    'backand',
	'mealtrack.controllers.authentication',
	'mealtrack.controllers.meals',
	'mealtrack.controllers.account',
	'mealtrack.services.authentication',
	'mealtrack.services.meals',
    'mealtrack.services.CRUD',
	'mealtrack.filters.mealtime'
]);

app.run(function ($ionicPlatform) {
	$ionicPlatform.ready(function () {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
		}
		if (window.StatusBar) {
			// org.apache.cordova.statusbar required
			StatusBar.styleBlackTranslucent();
		}
	});





});

app.config(function ($stateProvider, $urlRouterProvider,BackandProvider) {


    BackandProvider.setAppName('mealtrack12'); // change here to your app name
    BackandProvider.setSignUpToken('0809f978-dba2-4b04-bfce-23b7efceedbd'); //token that enable sign up. see http://docs.backand.com/en/latest/apidocs/security/index.html#sign-up
   // BackandProvider.setAnonymousToken('bfc527d2-867d-496e-bdce-c2c1053f2aff'); // token is for anonymous login. see http://docs.backand.com/en/latest/apidocs/security/index.html#anonymous-access



    $stateProvider
		.state('login', {
			url: "/login",
			cache: false,
			controller: 'LoginCtrl',
			templateUrl: "templates/login.html"
		})
		.state('signup', {
			url: "/signup",
			cache: false,
			controller: 'SignupCtrl',
			templateUrl: "templates/signup.html"
		})
        .state('tab', {
            url: "/tab",
            abstract: true,
            templateUrl: "templates/tabs.html"
        })
        .state('test', {
            url: "/test",
            controller: 'DashboardCtrl',
            templateUrl: "templates/tabs-dashboard.html"
        })
		//TODO
	;

	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/login');

});
