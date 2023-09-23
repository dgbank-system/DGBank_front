import { Gender } from "../enum/genderEnum";

export interface Customer{
    id : number ,
    firstName : string,
    lastName : string , 
    email : string ,
    phone : null ,
    address : string , 
   date : String ,
    gender : Gender

}