import { Type } from "../enum/typeEnum";
// import { Customer } from "./customer";

export interface Account{
    id : number ,
    balance : string ,
    type : Type ,   
    customerid: string;
    customerFirstName : String;
    customerLastName : string // Reference to the customer who owns this account
}