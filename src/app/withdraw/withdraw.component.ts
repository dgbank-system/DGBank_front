import { Component } from '@angular/core';
import { Deposite_Withdraw } from '../interface/deposite&withdraw';
import { TransactionService } from '../services/transaction.service';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../services/account.service';
import { Account } from '../interface/account';
import { HttpErrorResponse } from '@angular/common/http';
import { Type } from '../enum/typeEnum';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent {
withdraw : Deposite_Withdraw ={
  accountA: {
    id: ''
  },
  amount: ''
}
selectedAccount: Account | undefined// Initialize it with an appropriate data type
accountIds: number[] = [];
accountfNames : String[] = [];
accountlNames : String[] = []
accounts!: Account[];

constructor(private transactionSrevice : TransactionService , private toaster : ToastrService, private accountService : AccountService){}
ngOnInit(): void {
  this.getAccountIds();
}
getAccountIds() {
  this.accountService.getAccount().subscribe(
    (response: Account[]) => {
      this.accounts = response;
      this.accountfNames = this.accounts.map(account => account.customerFirstName)
      this.accountlNames = this.accounts.map(account => account.customerLastName)
      // Extract all account IDs and store them in the accountIds array
      this.accountIds = this.accounts.map(account =>account.id);
    },
    (error: HttpErrorResponse) => {
      console.error(error.message);
    }
  );
}
performWithdraw()
{
  this.transactionSrevice.addWithdraw(this.withdraw).subscribe(
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
  const selectedAccountId = Number(this.withdraw.accountA.id);
  this.selectedAccount = this.accounts.find(account => account.id === selectedAccountId);
}


}
