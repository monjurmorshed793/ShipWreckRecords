module app{

    export interface IContextMenuScope extends ng.IScope{
        customer:ICustomer;
    }

    class ContextMenu implements ng.IDirective{

        static $inject=['$scope'];
        constructor($scope:IContextMenuScope){

        }
    }

    interface ICustomer{
        name:string;
        address:string;
    }



    class ContextMenuDirective implements ng.IDirective{
        static instance():ng.IDirective{
            return new ContextMenuDirective;
        }
        public restrict='E';
        public controller = ContextMenu;
        public scope={
            customer:'=customer'
        };

       // public bindToController=true;

        template="Name: {{customer.name}} Address:{{customer.address}}";
        link(scope:ng.IScope, element:ng.IAugmentedJQuery, attributes:ng.IAttributes, controller:ContextMenu):void{
            //var customer=this.scope.customer;
            /*element.empty();

            element.text("HEllo world {{customer.name}}, {{customer.address}}");*/
            //var customer:ICustomer = attributes.

            var elementObjects;
            //element.text("Hello there");

            scope.$watch('customer',(value:ICustomer)=>{
                element.empty();
                console.log(value.name);
                elementObjects=angular.element("<h1>Name "+value.name+"</h1><br><h1>address"+value.address+"</h1>");
                element.append(elementObjects);


            });
            //element.empty();

            /*scope.$watch('customer',function(value){
                console.log("***");
                console.log(attributes);
            })*/
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