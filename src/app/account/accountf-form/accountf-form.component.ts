import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Type } from 'src/app/enum/typeEnum';
import { Account } from 'src/app/interface/account';
import { Customer } from 'src/app/interface/customer';
import { AccountService } from 'src/app/services/account.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-accountf-form',
  templateUrl: './accountf-form.component.html',
  styleUrls: ['./accountf-form.component.css']
})
export class AccountfFormComponent implements OnInit {
account :Account = {
  id: 0,
  balance: '',
  type: Type.CHECKING,
  customerid: '',
  customerFirstName: '',
  customerLastName: ''
}
selectedCustomer: Customer | undefined// Initialize it with an appropriate data type
customerIds: number[] = [];
customers!: Customer[];
balanceString = ''
customer_idString = ''
customerID = ''
type: typeof Type = Type; 
constructor(private accountService : AccountService , private toaster : ToastrService , private customerService : CustomerService){}
  ngOnInit(): void {
    this.getCustomerIds()
  }
getCustomerIds()
{
  this.customerService.getCustomer().subscribe(
    (response: Customer[]) => {
      this.customers = response;
      // Extract all account IDs and store them in the accountIds array
      this.customerIds = this.customers.map(customer =>customer.id);
    },
    (error: HttpErrorResponse) => {
      console.error(error.message);
    }
  );
}
saveAccount()
{
  this.accountService.addAccount(this.account).subscribe(
    (response : any) =>
    {
      const message = response.message
      let account :Account = response.account
      
      this.toaster.success(message)
    },
    (error) =>
    {
      const message = error.error.message;
      console.log(message)
      this.toaster.error(message);
    }

  )
}

convertStringtoNumber(num : number,s :string)
{
  num = parseInt(s)
  console.log(num)
}
onCustomerChange(event: any) {
  // Find the selected account by its ID
  const selectedCustomerId = Number(this.account.customerid);
  this.selectedCustomer = this.customers.find(customer => customer.id === selectedCustomerId);
}

}
