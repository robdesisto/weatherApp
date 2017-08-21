//MODULE
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

//ROUTES
weatherApp.config(function ($routeProvider) {
   $routeProvider
       .when('/',  {
           templateUrl: 'pages/main.html',
           controller: 'mainController'
       })
       .when('/forecast',  {
           templateUrl: 'pages/forecast.html',
           controller: 'forecastController'
       })

});


//SERVICES
weatherApp.service('cityService', ['$http', function($http) {
    this.city = "San Diego, CA";
    /*this.weatherData = function () {
        $http.get("http://api.openweathermap.org/data/2.5/forecast/daily?APPID=2db4f864ab87744243c3bb775739460d&q=" + this.city).then(function(data) {
            console.log(data);
        });
    }*/
}]);
//CONTROLLERS
weatherApp.controller('mainController', ['$scope', 'cityService', function($scope, cityService) {
   $scope.city = cityService.city;
   $scope.$watch('city', function() {
       cityService.city = $scope.city;
   });

}]);
weatherApp.controller('forecastController', ['$scope', '$resource', 'cityService', '$log', function($scope, $resource, cityService, $log) {
    $scope.city = cityService.city;
    //cityService.weatherData();
    $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily?APPID=2db4f864ab87744243c3bb775739460d", { callback: "JSON_CALLBACK" }, { get: { method: "JSONP" }});

    $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, cnt: 2 });
    $log.log($scope.weatherAPI.get({ q: $scope.city, cnt: 2 }));

}]);

// API for openweathermap:  http://api.openweathermap.org/data/2.5/forecast/daily?APPID=2db4f864ab87744243c3bb775739460d
