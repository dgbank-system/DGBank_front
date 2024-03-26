import { Component, OnInit } from '@angular/core';
import { Deposite_Withdraw } from '../../interface/deposite&withdraw';
import { TransactionService } from '../../services/transaction.service';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../../services/account.service';
import { Account } from '../../interface/account';
import { HttpErrorResponse } from '@angular/common/http';
import { Type } from '../../enum/typeEnum';
import { SharingService } from 'src/app/services/sharingService.service';
import { Observable, map } from 'rxjs';

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
  accounts$: Observable<Account[]> | undefined;
  accountIds : number[] = [];
  selectedAccountId: number = 0;
  balance : number | undefined ;

  constructor(private transactionSrevice : TransactionService ,
              private toaster : ToastrService,
              private accountService : AccountService 
             ){}

  ngOnInit(): void {

    this.accounts$ = this.accountService.accounts$;

    // Check if accountsSubject has emitted any data
    this.accountService.accounts$.subscribe(accounts => {
      if (accounts.length === 0) {
        // Fetch accounts from the server if accountsSubject is empty
        this.accountService.fetchAccounts().subscribe();
      }
    });

  }
  
  


  performWithdraw()
  {
    this.transactionSrevice.addWithdraw(this.selectedAccount?.id , this.amount ).subscribe(
      (response : any) => 
      {
        const msg = response.description;
        this.accountService.updateBalance(this.selectedAccount?.id, response.balanceA)
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
  
   
    this.accounts$?.subscribe(accounts => {
        accounts.forEach(account => {
            if (account.id == this.selectedAccountId) {
                this.selectedAccount = account;
            }
        });
    });
  }


}
