import { Component, OnInit } from '@angular/core';
import { Deposite_Withdraw } from '../../interface/deposite&withdraw';
import { TransactionService } from '../../services/transaction.service';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../../services/account.service';
import { Account } from '../../interface/account';
import { HttpErrorResponse } from '@angular/common/http';
import { Type } from '../../enum/typeEnum';
import { SharingService } from 'src/app/services/sharingService.service';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent implements OnInit {

  amount : number | undefined;
  selectedAccount: Account | undefined ;
  accountfNames : String[] = [];
  accountlNames : String[] = []
  // accounts!: Account[];
  accountIds : number[] = [];
  selectedAccountId: number = 0;
  balance : number | undefined ;

  constructor(private transactionSrevice : TransactionService ,
              private toaster : ToastrService,
              private accountService : AccountService ,
              private sharingService : SharingService ){}

  ngOnInit(): void {
    const data = this.sharingService.getStorage();
    if(data != null)
    {
        this.accountIds = data;
    } else
    {
    this.accountService.fetchIDAccounts().subscribe(ids => {
      this.accountIds = ids;
    });
  }
  
  }


  performWithdraw()
  {
    this.transactionSrevice.addWithdraw(this.selectedAccount?.id , this.amount ).subscribe(
      (response : any) => 
      {
        const msg = response.description
         this.balance = response.balance
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

  onAccountChange() {
   
  
    // Find the selected account by its ID
    console.log(this.selectedAccountId);
     this.accountService.getAccountById(this.selectedAccountId).subscribe(
      (account: Account) => {
        this.selectedAccount = account;
        this.balance = this.selectedAccount.balance;
      },
      (error) => {
        console.error('Error:', error);
      }
     )
      
   
  }


}
