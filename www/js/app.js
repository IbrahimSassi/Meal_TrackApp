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


    BackandProvider.setAppName('mealtrack'); // change here to your app name
    BackandProvider.setSignUpToken('3467e603-17f7-4835-8b35-faf977381a92'); //token that enable sign up. see http://docs.backand.com/en/latest/apidocs/security/index.html#sign-up
   // BackandProvider.setAnonymousToken('f667add7-c9a2-432e-8646-7264425ca19b'); // token is for anonymous login. see http://docs.backand.com/en/latest/apidocs/security/index.html#anonymous-access



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
        /*.state('test', {
            url: "/test",
            controller: 'DashboardCtrl',
            templateUrl: "templates/tabs-dashboard.html"
        })*/
        .state('tab.meals',{
            url:'/meals',
            views:{
                'tab-meals':{
                    templateUrl:'templates/tabs/tab-meals.html',
                    controller:'MealListCtrl'
                }
            }
        })
        .state('tab.track',{
            url:'/track',
            views:{
                'tab-track':{
                    templateUrl:'templates/tabs/tab-track.html',
                    controller:'MealCreateCtrl'
                }
            }
        })
        .state('tab.account',{
            url:'/account',
            views:{
                'tab-account':{
                    templateUrl:'templates/tabs/tab-account.html',
                    controller:'AccountCtrl'
                }
            }
        })
		//TODO
	;

	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/login');

});
