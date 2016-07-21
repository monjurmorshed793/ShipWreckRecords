/// <reference path="../typings/jquery/jquery.d.ts" />
/// <reference path="../typings/angularjs/angular.d.ts" />
/// <reference path="../typings/angularjs/angular-route.d.ts" />
/// <reference path="../typings/ui-grid/ui-grid.d.ts" />


module app{
    var main = angular.module("boot",["ngRoute","ngResource","ui.grid","ui.grid.edit"]);

    main.config(routeConfig);
   
    routeConfig.$inject = ["$routeProvider"]
    function routeConfig($routeProvider: ng.route.IRouteProvider):void{
        $routeProvider  
            .when("/home",
                {
                    templateUrl:"/ts/views/home.html",
                    controller:'HomeController'
                })
            .when("/shipwrecks",
                {
                    templateUrl:"/ts/views/shipwrecks.html",
                    controller:"ShipWreckCtrl"
                })
            .otherwise("/home");

    }
}
