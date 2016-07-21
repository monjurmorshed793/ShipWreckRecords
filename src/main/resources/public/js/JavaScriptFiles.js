/// <reference path="../typings/jquery/jquery.d.ts" />
/// <reference path="../typings/angularjs/angular.d.ts" />
/// <reference path="../typings/angularjs/angular-route.d.ts" />
/// <reference path="../typings/ui-grid/ui-grid.d.ts" />
var app;
(function (app) {
    var main = angular.module("boot", ["ngRoute", "ngResource", "ui.grid", "ui.grid.edit"]);
    main.config(routeConfig);
    routeConfig.$inject = ["$routeProvider"];
    function routeConfig($routeProvider) {
        $routeProvider
            .when("/home", {
            templateUrl: "/ts/views/home.html",
            controller: 'HomeController'
        })
            .when("/shipwrecks", {
            templateUrl: "/ts/views/shipwrecks.html",
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
var app;
(function (app) {
    var ShipWrecksCtrl = (function () {
        function ShipWrecksCtrl($scope, $http, $q, $sce, $window) {
            this.$scope = $scope;
            this.$http = $http;
            this.$q = $q;
            this.$sce = $sce;
            this.$window = $window;
            $scope.clickHandler = {};
            $scope.editButtonClicked = false;
            $scope.saveButtonClicked = false;
            $scope.addButtonClicked = false;
            $scope.someProp = 'abc';
            $scope.shipWreckArr = [];
            $scope.getShipWreckInfo = this.getShipWreckInfo.bind(this);
            $scope.getShipWreck = this.getShipWreck.bind(this);
            $scope.showMe = this.showMe.bind(this);
            $scope.edit = this.edit.bind(this);
            $scope.editUIGrid = this.editUIGrid.bind(this);
        }
        ShipWrecksCtrl.prototype.showMe = function () {
            alert(this.$scope.someProp);
        };
        ShipWrecksCtrl.prototype.editUIGrid = function (shipWreck) {
            this.$scope.editButtonClicked = true;
            this.$scope.editModel = shipWreck;
        };
        ShipWrecksCtrl.prototype.edit = function (shipWreck) {
            //console.log("in the edit ui grid");
            this.$scope.editButtonClicked = true;
            this.$scope.editModel = shipWreck;
            console.log(this.$scope.editModel);
        };
        ShipWrecksCtrl.prototype.getShipWreck = function () {
            var _this = this;
            //this.$scope.shipWreckArr = this.getShipWreck();
            this.$scope.gOptions = [];
            this.getShipWreckInfo().then(function (shipWreckArr) {
                _this.$scope.shipWreckArr = shipWreckArr;
                _this.setUpUgGrid(shipWreckArr);
            });
        };
        ShipWrecksCtrl.prototype.setUpUgGrid = function (shipWreckArr) {
            console.log("*************************");
            console.log(shipWreckArr);
            this.$scope.gOptions.columnDefs = [
                { field: 'name', displayName: 'Name', enableSorting: false },
                { field: 'description', displayName: 'Sort Description', width: '40%' },
                { field: 'condition', displayName: 'Current Condition', width: '10%' },
                { field: 'depth', displayName: 'Depth', width: '*' },
                { field: 'latitude', displayName: 'Lattitude', width: '*' },
                { field: 'longitude', displayName: 'Longitude', width: '*' },
                { field: 'yearDiscovered', displayName: 'Years of Discovering', width: '*' },
                { name: 'Action', cellEditableCondition: false, cellTemplate: '<button ng-click="grid.appScope.editUIGrid(row.entity)">Edit</button><button>Delete</button>', width: '10%' }
            ];
            this.$scope.gOptions.enableSorting = true;
            this.$scope.gOptions.data = shipWreckArr;
            this.$scope.gridOptions = this.$scope.gOptions;
            //this.$scope.gridOptions=this.$scope.gOptions;
        };
        ShipWrecksCtrl.prototype.getShipWreckInfo = function () {
            var _this = this;
            return this.$http.get('/api/v1/shipwrecks')
                .then(function (response) {
                console.log(response);
                _this.$scope.jsonData = response;
                console.log("Json");
                console.log(_this.$scope.jsonData);
                return response.data;
            });
        };
        ShipWrecksCtrl.prototype.convertToJson = function (data) {
        };
        ShipWrecksCtrl.$inject = ['$scope', '$http', '$q', '$sce', '$window'];
        return ShipWrecksCtrl;
    })();
    app.ShipWrecksCtrl = ShipWrecksCtrl;
    angular.module("boot")
        .controller("ShipWreckCtrl", ShipWrecksCtrl);
})(app || (app = {}));
