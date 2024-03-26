import { Type } from "../enum/typeEnum";
// import { Customer } from "./customer";

export interface Account{
    id : number ,
    balance? : number ,
    type : Type ,   
    customerid: string;
    customerFirstName : String;
    customerLastName : string 
}