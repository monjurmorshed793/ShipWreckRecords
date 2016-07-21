module app{
    export interface ShipWrecks{
        id:number;
        name: string;
        description: string;
        condition: string;
        depth: number;
        latitude:any;
        longitude:any;
        yearDiscovered:number;
    }
}