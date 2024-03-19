import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Customer } from 'src/app/interface/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit{
  public customers!: Customer[];
  public Editcustomer! : Customer ;
  public confirmDelete: boolean = false;
  searchCustomerId : string = '';
  filteredCustomers: Customer[] | undefined;
  @ViewChild('deleteModalCloseButton') deleteModalCloseButton: ElementRef | undefined;

  constructor(private customerService: CustomerService){}
 
   ngOnInit() {
     this.getCustomers();
   }
 
   public getCustomers() : void {
     this.customerService.getCustomer().subscribe(
       (response: Customer[]) => {
         this.customers = response;
         
       },
       (error: HttpErrorResponse) => {
         alert(error.message);
       }
     );
   }
 
   
 
   public onUpdateEmployee(customer : Customer): void{
     this.customerService.updateCustomer(customer).subscribe(
       (response: Customer) =>
       {
          
          this.getCustomers();
        
       },
       (error: HttpErrorResponse) => {
         alert(error.message);
        
       }
     )
   }
 
   public onDeleteEmloyee(customerId: number): void {
    const confirmDeleteCheckbox = document.getElementById('confirmDeleteCheckbox') as HTMLInputElement;
    if (confirmDeleteCheckbox.checked) {

     this.customerService.deleteCustomer(customerId).subscribe(
       (response: any) => {
         console.log(response);
         this.getCustomers();
       this.closeDeleteModal()
       },
       (error: HttpErrorResponse) => {
         alert(error.message);
       });
      }
      
   }
   
   public searchCustomer(key: string): void {
    if (!key) {
      this.getCustomers(); // Get all customers when no search key is provided
      return;
    }
  
    const result: Customer[] = [];
  
    for (const customer of this.customers) {
      if (customer.id.toString().toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        result.push(customer);
      }
    }
  
    this.customers = result;
  }
  
  
  
  
 
   public onOpenModel(event: Event,customer:Customer | null , mode : string): void{
    event.preventDefault();
     const container = document.getElementById('main-container');
     const button = document.createElement('button');
     button.type = 'button';
     button.style.display = 'none';
     button.setAttribute('data-toggle','modal');
    
     if(mode === 'edit')
     {
       if(customer !== null)
       {
         this.Editcustomer = customer ;
         button.setAttribute('data-target','#EditcustomerModel');
         
       }   
     }
     if(mode === 'delete')
     {
       if(customer !== null)
       {
         this.Editcustomer = customer ;
         button.setAttribute('data-target','#DeletecustomerModel');
       }
     }
     container?.appendChild(button);
     button.click();
   }

   private closeDeleteModal(): void {
    if (this.deleteModalCloseButton) {
      this.deleteModalCloseButton.nativeElement.click();
    }
  }
}
