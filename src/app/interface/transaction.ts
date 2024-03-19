export interface Transaction{
    id : number ,
    type : string,
    amount : number , 
    date : Date ,
    description : string ,
    accountId : number , 
    anotherAccountId : number ,
    status : string,
    [key: string]: any;
}