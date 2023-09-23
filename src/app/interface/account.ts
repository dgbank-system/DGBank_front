import { Type } from "../enum/typeEnum";

export interface Account{
    id : number ,
    balance : null ,
    type : Type ,   
    customer_id: number; // Reference to the customer who owns this account
}