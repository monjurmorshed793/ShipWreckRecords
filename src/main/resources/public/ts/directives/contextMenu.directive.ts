module app{

    export interface IContextMenuScope extends ng.IScope{
        customerInfo:any;
    }

    class ContextMenu implements ng.IDirective{

        static $inject=['$scope'];
        constructor($scope:IContextMenuScope){
            $scope.customerInfo={};
        }
    }

    interface ICustomer{
        name:string;
        address:string;
    }

    interface IAttributes extends ng.IAttributes{
        customerInfo:ICustomer;
    }

    class ContextMenuDirective implements ng.IDirective{
        static instance():ng.IDirective{
            return new ContextMenuDirective;
        }
        public restrict='E';
        public controller = ContextMenu;
        public scope={
            customer:'=info'
        };

        template="Name: {{customer.name}} Address:{{customer.address}}";
        link(scope:ng.IScope, element:ng.IAugmentedJQuery, attributes:ng.IAttributes, controller:ContextMenu):void{
            //var customer=this.scope.customer;
            /*element.empty();

            element.text("HEllo world {{customer.name}}, {{customer.address}}");*/
        }
    }

    function showContextMenu():ng.IDirective{
        var directive = <ng.IDirective>{
            restrict:'A',
            link:link,
            scope:{
                customerInfo: '=info'
            },
            template:"Name: {{customerInfo.name}} Address:{{customerInfo.address}}",
            controller:ContextMenu
        }

        function link(scope:ng.IScope, element:ng.IAugmentedJQuery){

           /* var table, div;

            /!*scope.$watch('config')=>{

            }*!/
            element.empty();
            table = angular.element('<table></table>');*/
        }

        return directive;
    }

    angular.module("boot")
            .directive('contextMenu',ContextMenuDirective.instance);
}