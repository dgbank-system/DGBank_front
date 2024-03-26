import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { ToastrService } from 'ngx-toastr';
import { Account } from '../../interface/account';
import { AccountService } from '../../services/account.service';
import { SharingService } from 'src/app/services/sharingService.service';
import { Observable, map } from 'rxjs';


@Component({
  selector: 'app-deposite',
  templateUrl: './deposite.component.html',
  styleUrls: ['./deposite.component.css']
})
export class DepositeComponent implements OnInit {

  amount : number | undefined;
  selectedAccountId : number = 0 ;
  selectedAccount: Account | undefined// Initialize it with an appropriate data type
  accountIds: number[] = [];
  accounts$: Observable<Account[]> | undefined;
  balance : number | undefined ;

  constructor(private transferService : TransactionService ,
              private toaster : ToastrService ,
              private accountService :AccountService){}

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

  performDeposite()
  {
    this.transferService.addDeposite(this.selectedAccount?.id , this.amount).subscribe(
      (response : any) => 
      {
        const msg = response.description;
        this.accountService.updateBalance(this.selectedAccount?.id, response.balanceA);
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
