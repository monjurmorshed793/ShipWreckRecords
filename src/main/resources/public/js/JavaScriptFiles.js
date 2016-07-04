/// <reference path="../typings/jquery/jquery.d.ts" />
/// <reference path="../typings/angularjs/angular.d.ts" />
/// <reference path="../typings/angularjs/angular-route.d.ts" />
var app;
(function (app) {
    var main = angular.module("boot", ["ngRoute"]);
    main.config(routeConfig);
    routeConfig.$inject = ["$routeProvider"];
    function routeConfig($routeProvider) {
        $routeProvider
            .when("/home", {
            templateUrl: "/ts/views/home.html",
            controller: 'HomeController'
        })
            .when("/shipwrecks", {
            templateUrl: "/views/shipwrecks.html",
            controller: "ShipWreckCtrl"
        })
            .otherwise("/home");
    }
})(app || (app = {}));
var app;
(function (app) {
    var HomeController = (function () {
        function HomeController($scope) {
        }
        return HomeController;
    })();
    app.HomeController = HomeController;
    angular.module("boot")
        .controller("HomeController", HomeController);
})(app || (app = {}));
