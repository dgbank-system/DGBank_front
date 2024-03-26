import { Component, OnInit } from '@angular/core';
import { Transfer } from '../../interface/transfer';
import { TransactionService } from '../../services/transaction.service';
import { ToastrService } from 'ngx-toastr';
import { Account } from '../../interface/account';
import { AccountService } from '../../services/account.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SharingService } from 'src/app/services/sharingService.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {

  amount : number | undefined;
  selectedAccountAId : number =0;
  selectedAccountBId : number =0;
  selectedAccountA: Account | undefined;
  selectedAccountB: Account | undefined;
  balance : number | undefined ;
  accountIds: number[] = [];
  accounts$: Observable<Account[]> | undefined;

  constructor(private transferService : TransactionService,
              private toaster : ToastrService,
              private accountService : AccountService) {}

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


  PerformTransfer()
  {
    this.transferService.addTransfer(this.selectedAccountA?.id , this.selectedAccountB?.id , this.amount).subscribe(
      (response : any) => 
      {
        const msg = response.description
        this.accountService.updateBalance(this.selectedAccountA?.id, response.balanceA);
        this.accountService.updateBalance(this.selectedAccountB?.id, response.balanceB);
        
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
      this.accounts$?.subscribe(accounts => {
        accounts.forEach(account => {
            if (account.id == this.selectedAccountAId) {
                this.selectedAccountA = account;   
            }
        });
    });
      
    } else if (accountType === 'accountB') {
      this.accounts$?.subscribe(accounts => {
        accounts.forEach(account => {
            if (account.id == this.selectedAccountBId) {
                this.selectedAccountB = account; 
            }
        });
    });
    
  }
  }

}
