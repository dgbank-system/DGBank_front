import { Gender } from "../enum/genderEnum";

export interface Customer{
    id : number ,
    firstName : string,
    lastName : string , 
    email : string ,
    phone : number ,
    address : string , 
   date : String ,
    gender : Gender

}