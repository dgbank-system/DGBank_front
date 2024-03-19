import { Component } from '@angular/core';
import { Transfer } from '../interface/transfer';
import { TransactionService } from '../services/transaction.service';
import { ToastrService } from 'ngx-toastr';
import { Account } from '../interface/account';
import { AccountService } from '../services/account.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent {
  transfer: Transfer ={
    accountA: {
      id: '',
    },
    accountB: {
      id: ''
    },
    amount: ''
  }
  selectedAccountA: Account | undefined;
  selectedAccountB: Account | undefined;
  
accountIds: number[] = [];
accounts!: Account[];
constructor(private transferService : TransactionService ,private toaster : ToastrService, private accountService : AccountService){}
ngOnInit(): void {
  this.getAccountIds();
}
getAccountIds() {
  this.accountService.getAccount().subscribe(
    (response: Account[]) => {
      this.accounts = response;
      // Extract all account IDs and store them in the accountIds array
      this.accountIds = this.accounts.map(account =>account.id);
    },
    (error: HttpErrorResponse) => {
      console.error(error.message);
    }
  );
}
PerformTransfer()
{
  this.transferService.addTransfer(this.transfer).subscribe(
    (response : any) => 
    {
      const msg = response.description
      if( response.status === "Successful")
      {
        this.toaster.success(msg)
      }
      else{
        this.toaster.error(msg)
      }
    },
    (error) => 
    {
      const message = error.error.message
      this.toaster.error(message)
    }
  )
}
onAccountChange(accountType: string) {
 
  if (accountType === 'accountA') {
    const selectedAccountId = Number(this.transfer.accountA.id);
    this.selectedAccountA = this.accounts.find(account => account.id === selectedAccountId);
  } else if (accountType === 'accountB') {
    const selectedAccountId = Number(this.transfer.accountB.id);
    this.selectedAccountB = this.accounts.find(account => account.id === selectedAccountId);
  }
}


}
