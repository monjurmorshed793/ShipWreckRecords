module app{
    import IScope = angular.IScope;
    interface IHomeController extends IScope{

    }

    export class HomeController {

        constructor($scope:IHomeController){
        }
    }

    angular.module("boot")
            .controller("HomeController",HomeController);
}