
export enum Position{
    CEO="CEO",
    MD="MD",
    DUHead="DUHead",
    Manager="Manager",
    TL="TL",
    SDE="SDE",
    SDET="SDET",
    DevOps="DevOps"
}

export interface employeeInterface{
    id:number;
    firstName:string;
    lastName:string
    age:number
    experience:number;
    address:string;
    mobileNo:string;
    position:Position;
    teamLead?:number;
    manager?:number;
    duHead?:number;
    managingDirector?:number;
    CEO?:number;
    team?:string;
}

