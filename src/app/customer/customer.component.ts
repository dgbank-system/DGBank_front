import { Component, OnInit } from '@angular/core';
import { CustomerService } from './customer.service';
import { Customer } from '../interface/customer';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  public customers !: Customer[];

  constructor(private customerservice: CustomerService){}
  
  ngOnInit(): void {
    this.getCustomer()
  }

  
  public getCustomer() : void {
    this.customerservice.getCustomer('Ahmed', 'moderesta').subscribe(
      (response: Customer[]) => {
        this.customers = response;
        console.log('Customers:', this.customers);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
    
  }

}
