import { Component } from '@angular/core';
import { Customer } from '../interface/customer';
import { HttpClient } from '@angular/common/http';
import { Gender } from '../enum/genderEnum';
import { CustomerService } from '../customer/customer.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Account } from '../interface/account';
import { Type } from '../enum/typeEnum';

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
    phone: 0 , // You can set the appropriate phone number
    address: '',
    date:'',
    gender: Gender.Male
  };

  account : Account = {
    id: 0,
    balance : 0, 
    type : Type.SAVINGS 
  }
  gender: typeof Gender = Gender; 
  type : typeof Type = Type ;
  personalInfoForm!: FormGroup;
  accountInfoForm!: FormGroup;
  currentStep: number = 1;

  constructor(private httpClient : HttpClient , private customerService : CustomerService ,private formBuilder: FormBuilder )
  {
    this.personalInfoForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
     
      gender: ['Male'] // Default value
    });

    this.accountInfoForm = this.formBuilder.group({
      balance: ['', Validators.required],
      type: ['Savings']
      // Add other form controls for the account information as needed
    });
  }


  nextStep() {
    this.currentStep = 2; // Move to the next step (account information)
  }

  saveCustomer()
  {
    // let bodyData = {
    //   "firstname" : this.customer.firstName,
    //   "lastname" : this.customer.lastName,
    //   "email" : this.customer.email,
    //   "date": this.customer.date,
    //   "address": this.customer.address,
    //   "gender": this.customer.gender,
    //   "phone": this.customer.phone
    // };
   
      this.customerService.addCustomer(this.customer,'Ahmed','moderesta').subscribe(
        (newCustomer: Customer) =>
        {
          console.log('Customer Registered Successfully', newCustomer)
          alert('Customer Registered Successfully');
        },
        (error) => {
          console.error('Error registering customer:', error);
          alert('An error occurred while registering the customer');
        }
      )
    }
    
    
}
