angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/home', {
			templateUrl: 'views/home.html',
			controller: 'MainController'
		})

		// nerds page that will use the NerdController
		.when('/nerds', {
			templateUrl: 'views/nerd.html',
			controller: 'NerdController'
		})


		.when('/login', {
			templateUrl: 'views/login.html',
			controller: ''
		})

		.otherwise ({ redirectTo: '/home' });

	$locationProvider.html5Mode(true);

}]);