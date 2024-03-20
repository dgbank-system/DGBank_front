import { Component, OnInit } from '@angular/core';
import { Deposite_Withdraw } from '../interface/deposite&withdraw';
import { TransactionService } from '../services/transaction.service';
import { ToastrService } from 'ngx-toastr';
import { Account } from '../interface/account';
import { AccountService } from '../services/account.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-deposite',
  templateUrl: './deposite.component.html',
  styleUrls: ['./deposite.component.css']
})
export class DepositeComponent implements OnInit {
deposite : Deposite_Withdraw ={
  accountA: {
    id: ''
  },
  amount: ''
}
selectedAccount: Account | undefined// Initialize it with an appropriate data type
accountIds: number[] = [];
accounts!: Account[];
constructor(private transferService : TransactionService ,private toaster : ToastrService , private accountService :AccountService){}

ngOnInit(): void {
  this.accountService.accounts$.subscribe(accounts => {
    this.accounts = accounts;
  });
}

performDeposite()
{
  this.transferService.addDeposite(this.deposite).subscribe(
    (response : any) => 
    {
      const msg = response.description
      if(response.status === "Successful")
      {
        this.toaster.success(msg)
      }
      else{
        this.toaster.error(msg)
      }
     
    },
    (error) =>
    {
      const msg = error.error.message
      this.toaster.error(msg)
    }
  )
}
onAccountChange(event: any) {
  // Find the selected account by its ID
  const selectedAccountId = Number(this.deposite.accountA.id);
  this.selectedAccount = this.accounts.find(account => account.id === selectedAccountId);
}
}
