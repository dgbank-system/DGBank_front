import { Component } from '@angular/core';
import { Gender } from 'src/app/enum/genderEnum';
import { Customer } from 'src/app/interface/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { ToastrService } from 'ngx-toastr';
import { fakeAsync } from '@angular/core/testing';
@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent {
  customer: Customer = {
    id: 0, // You can set the appropriate ID value
    firstName: '',
    lastName: '',
    email: '',
    phone: 0, // You can set the appropriate phone number
    address: '',
    date: '',
    gender: Gender.Male,
    accounts: [],
    alerts: []
  };

  isPhoneValid = true
  phoneNumber = '' 
  gender: typeof Gender = Gender; 
  constructor( private customerService : CustomerService ,private toastr: ToastrService){}
  saveCustomer()
    { 
      const cleanedPhoneNumberString = this.phoneNumber.replace(/^\+2/, ''); // Removes "+20" if it exists at the beginning of the string
       this.customer.phone = parseInt(cleanedPhoneNumberString, 10);
      this.customerService.addCustomer(this.customer).subscribe(
        (response: any) =>
        {
          const message = response.message
          let customer: Customer = response.customer; 
        
           console.log(customer.firstName);
           console.log(message)
           this.toastr.success(message);
        },
        (error) => {
          console.error('Error registering customer:', error);
          this.toastr.error(error.error.message);
        }
      )
       
    }
    isAnyInputEmpty(): boolean {
      return !this.customer.firstName || !this.customer.lastName || !this.customer.email || 
             !this.customer.date || !this.customer.address || !this.customer.gender || this.customer.phone !== 0 ;
  }
  validatePhoneNumber(phone: string ): void {
    // Use a regular expression to check if the input consists only of numeric digits
    const pattern = /^[+\d][\d]*$/;
  
    // Test the input against the pattern
    this.isPhoneValid = pattern.test(phone);
  }
  checkInputValidity(inputControl: any) {
    if (inputControl.value && !/^[0-9]*$/.test(inputControl.value)) {
      inputControl.control.setErrors({ 'pattern': true });
    } else {
      inputControl.control.setErrors(null);
    }
  }
}
