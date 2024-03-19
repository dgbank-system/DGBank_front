import { Transaction } from "./transaction";

export interface Alert{
    id : number ,
    customerFirstName : String;
    customerLastName : string
    description : string ,
    accountId : number,
    trxs : Transaction[],
    showTransactions: boolean
    
}