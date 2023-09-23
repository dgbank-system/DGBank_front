import { Component } from '@angular/core';
import { Customer } from '../interface/customer';
import { HttpClient } from '@angular/common/http';
import { Gender } from '../enum/genderEnum';
import { CustomerService } from '../services/customer.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Account } from '../interface/account';
import { Type } from '../enum/typeEnum';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  customer: Customer = {
    id: 0, // You can set the appropriate ID value
    firstName: '',
    lastName: '',
    email: '',
    phone: null , // You can set the appropriate phone number
    address: '',
    date:'',
    gender: Gender.Male
  };
   account : Account = {
    id: 0,
    balance : null, 
    type : Type.SAVINGS ,
    customer_id : 0
  }

  gender: typeof Gender = Gender; 
  type : typeof Type = Type ;
  // customerForm!: FormGroup;
  // accountInfoForm!: FormGroup;
  currentStep: number = 1;
  selectedAccountType: Type | null  | string = 'Please select your Account type';


  
  constructor(private httpClient : HttpClient , private customerService : CustomerService ,  private accountService: AccountService ,private formBuilder: FormBuilder )
  {
  
  }


  nextStep() {
    this.currentStep ++; // Move to the next step (account information)
  }
  
  backStep()
  {
    this.currentStep --;
  }

  saveCustomer()
  {
      this.customerService.addCustomer(this.customer,'Ahmed','moderesta').subscribe(
        (newCustomer: Customer) =>
        {
          console.log('Customer Registered Successfully', newCustomer)
          alert('Customer Registered Successfully');
          console.log(newCustomer.id)
          //this.saveAccount(newCustomer.id)   
        },
        (error) => {
          console.error('Error registering customer:', error);
          alert('An error occurred while registering the customer');
        }
      )
       
    }

    saveAccount()
    {
      //this.account.customer_id = customerId
      this.accountService.addAccount(this.account,'reda','redaa').subscribe(
        (newAccount: Account) =>
        {
          console.log('Account Registered Successfully', newAccount)
          alert('Account Registered Successfully');
        },
        (error) => {
          console.error('Error registering customer:', error);
          alert('An error occurred while registering the account');
        }
      )
    }
    
    isValidBalance(balance: any): boolean {
      if (isNaN(balance) || balance === null || balance === '') {
        return false; // Invalid balance (not a number)
      }
      return true;
    }
}
