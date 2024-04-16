import { Account } from "./account";
import { Customer } from "./customer";
import { TransactionGroup } from "./transactionGroup";

export interface Alert{
    id : number ,
    customer : Customer,
    account : Account,
    description : string ,
    accountId : number,
    transactionGroups : TransactionGroup[],
    showTransactions: boolean
    
}