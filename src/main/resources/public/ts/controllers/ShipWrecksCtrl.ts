
module app{



    import IColumnDef = uiGrid.cellNav.IColumnDef;
    import IGridOptions = uiGrid.cellNav.IGridOptions;
    import IColumnDefOf = uiGrid.IColumnDefOf;
    import IGridOptionsOf = uiGrid.IGridOptionsOf;
    interface IShipWrecks extends ng.IScope
    {
        myData:any;
        editButtonClicked:boolean;
        addButtonClicked:boolean;
        saveButtonClicked:boolean;
        shipWreckArr:Array<ShipWrecks>;
        gridOptions:IGridOptions;
        gridColumnDefs:IColumnDef;
        columnDef:IColumnDefOf<ShipWrecks>;
        gOptions:IGridOptionsOf<ShipWrecks>;
        clickHandler:any;
        editModel:ShipWrecks;
        someProp:string;
        showMe:Function;
        getShipWreckInfo:Function;
        saveShipWreckInfo:Function;
        putShipWreckInfo:Function;
        deleteShipWreckInfo:Function;
        edit:Function;
        editUIGrid:Function;
        add:Function;
        save:Function;
        jsonData:any;

        getShipWreck:Function;
    }


    interface IMyEntity{
        name:string;
        age:number;
    }

    export class ShipWrecksCtrl{

        static $inject = ['$scope','$http','$q','$sce','$window']
        constructor(private $scope:IShipWrecks,
                    private $http: ng.IHttpService,
                    private $q: ng.IQService,
                    private $sce:ng.ISCEService,
                    private $window: ng.IWindowService

        ){
            $scope.clickHandler={};
            $scope.editButtonClicked=false;
            $scope.saveButtonClicked=false;
            $scope.addButtonClicked=false;
            $scope.someProp='abc';
            $scope.shipWreckArr = [];
            $scope.getShipWreckInfo = this.getShipWreckInfo.bind(this);
            $scope.getShipWreck = this.getShipWreck.bind(this);
            $scope.showMe = this.showMe.bind(this);
            $scope.edit = this.edit.bind(this);
            $scope.editUIGrid = this.editUIGrid.bind(this);
        }

        private showMe(){
            alert(this.$scope.someProp);
        }

        private editUIGrid(shipWreck:ShipWrecks){
            this.$scope.editButtonClicked=true;
            this.$scope.editModel=shipWreck;
        }
        private edit(shipWreck:ShipWrecks){
            //console.log("in the edit ui grid");
            this.$scope.editButtonClicked=true;
            this.$scope.editModel = shipWreck;
            console.log(this.$scope.editModel);
        }
        private getShipWreck(){
            //this.$scope.shipWreckArr = this.getShipWreck();
            this.$scope.gOptions=[];
            this.getShipWreckInfo().then((shipWreckArr:Array<ShipWrecks>)=>{
                this.$scope.shipWreckArr = shipWreckArr;
                this.setUpUgGrid(shipWreckArr);
            });
        }

        private setUpUgGrid(  shipWreckArr:any){
            console.log("*************************");
            console.log(shipWreckArr);

            this.$scope.gOptions.columnDefs=[
                {field:'name',displayName:'Name',enableSorting:false},
                {field:'description',displayName:'Sort Description',width:'40%'},
                {field:'condition',displayName:'Current Condition',width:'10%'},
                {field:'depth',displayName:'Depth',width:'*'},
                {field:'latitude',displayName:'Lattitude',width:'*'},
                {field:'longitude',displayName:'Longitude',width:'*'},
                {field:'yearDiscovered',displayName:'Years of Discovering',width:'*'},
                {name:'Action',cellEditableCondition:false,cellTemplate:'<button ng-click="grid.appScope.editUIGrid(row.entity)">Edit</button><button>Delete</button>',width:'10%'}
            ];
            this.$scope.gOptions.enableSorting=true;

            this.$scope.gOptions.data=shipWreckArr;
            this.$scope.gridOptions=this.$scope.gOptions;


            //this.$scope.gridOptions=this.$scope.gOptions;
        }



        private getShipWreckInfo(): ng.IPromise<any>{

            return this.$http.get('/api/v1/shipwrecks')
                .then((response:any):any=>{
                    console.log(response);
                    this.$scope.jsonData=response;
                    console.log("Json");
                    console.log(this.$scope.jsonData);
                    return response.data;

                });
        }

        private convertToJson(data:ShipWrecks):any{

        }


    }

    angular.module("boot")
        .controller("ShipWreckCtrl",ShipWrecksCtrl);
}