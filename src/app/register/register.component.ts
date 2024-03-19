import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../interface/employee';
import { EmployeeService } from '../services/employee.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  employee: Employee = {
    id: 0, // You can set the appropriate ID value
    username: '',
    name: '',
    email: '',
    phone: 0  , // You can set the appropriate phone number
    address: '',
    password:'',
  };

 
  isNameValid: boolean = true
  isPhoneValid = true
  phoneNumber = '' 
  constructor(private httpClient : HttpClient ,
    private empservice :EmployeeService,
      private formBuilder: FormBuilder,
      private router: Router,
      private toastr: ToastrService  ,
      )
  {}

  ngOnInit() {
 
  }


  saveEmployee()
  {
    
    // Parse the cleaned phone number to an integer

    const cleanedPhoneNumberString = this.phoneNumber.replace(/^\+2/, ''); // Removes "+20" if it exists at the beginning of the string


    this.employee.phone = parseInt(cleanedPhoneNumberString, 10);
    console.log(this.employee.phone)
    
    this.empservice.addEmployee(this.employee).subscribe(
        (response : any) =>
        {
           const message = response.message
           let employee: Employee = response.employee; 
           

            console.log(employee.name);
            console.log(message)
            this.toastr.success(message);
            this.navigateTologin()
           
          
        },
        (error) =>
         {
          const message = error.error.message;
          console.log(message)
          this.toastr.error(message);
         }
    )
  }
  navigateTologin() {
    this.router.navigate(['/login']); // Use the route path defined in your routes array
  }
  // saveCustomer()
  // {
  //     this.customerService.addCustomer(this.customer,'Ahmed','moderesta').subscribe(
  //       (newCustomer: Customer) =>
  //       {
  //         console.log('Customer Registered Successfully', newCustomer)
  //         alert('Customer Registered Successfully');
  //         console.log(newCustomer.id)
  //         //this.saveAccount(newCustomer.id)   
  //       },
  //       (error) => {
  //         console.error('Error registering customer:', error);
  //         alert('An error occurred while registering the customer');
  //       }
  //     )
       
  //   }

  //   saveAccount()
  //   {
  //     //this.account.customer_id = customerId
  //     this.accountService.addAccount(this.account,'reda','redaa').subscribe({
  //      next: (newAccount: any) =>
  //       {
  //         console.log('Account Registered Successfully', newAccount)
  //         alert('Account Registered Successfully');
  //       },
  //      error: (error:any) => {
  //         console.error('Error registering customer:', error);
  //         alert('An error occurred while registering the account');
  //       }
      
  //     } );
  //   }
  // navigateToOtherPage() {
  //   this.router.navigate(['/login']); // Use the route path defined in your routes array
  // }
    
  // validateName(name: string): boolean {
  //   // Implement your validation logic here
  //   // Return true if the name is valid, false otherwise
  //   return name.trim() !== ''; // Basic validation: Name must not be empty
  // }
  
  isAnyInputEmpty(): boolean {
    return !this.employee.name || !this.employee.email || !this.phoneNumber || !this.employee.address || !this.employee.password;
  }
  validatePhoneNumber(phone: string ): void {
    // Use a regular expression to check if the input consists only of numeric digits
    const pattern = /^[+\d][\d]*$/;
  
    // Test the input against the pattern
    this.isPhoneValid = pattern.test(phone);
  }
  
}
