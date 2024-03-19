import { Gender } from "../enum/genderEnum";
import { Account } from "./account";
import { Alert } from "./alert";

export interface Customer{
    id : number ,
    firstName? : string,
    lastName? : string , 
    email? : string ,
    phone ?: number ,
    address ?: string , 
   date ?: String ,
    gender ?: Gender,
    accounts : Account[], 
    alerts : Alert[]

}