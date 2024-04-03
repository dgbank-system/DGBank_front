import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { ToastrService } from 'ngx-toastr';
import { Account } from '../../interface/account';
import { AccountService } from '../../services/account.service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}
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
  accounts: Account[] = [];
  suggestions: { label: string; value: number }[] = [];
  constructor(private transferService : TransactionService,
              private toaster : ToastrService,
              private accountService : AccountService,) {}

  ngOnInit(): void {

    this.accounts$ = this.accountService.accounts$;

    // Check if accountsSubject has emitted any data
    this.accountService.accounts$.subscribe(accounts => {
      this.accounts = accounts;
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
        if (response.status === "Successful") {
          Swal.fire("Saved!", `Transfer successfully completed from Account  ${this.selectedAccountA?.id} to Account ${this.selectedAccountB?.id} by transferring an amount of ${this.amount}$.`, "success");
        } else {
          Swal.fire("Changes are not saved", "Your account balance is not sufficient to complete this Transfer request", "error");
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

 
 
 search(event: AutoCompleteCompleteEvent) {
  if (!this.accounts) return;
  
      const query = event.query.toLowerCase();
      const filteredAccounts = this.accounts
      .filter(account => 
          account.id.toString().includes(query) ||
          account.customerFirstName.toLowerCase().includes(query) ||
          account.customerLastName.toLowerCase().includes(query)
      );
      
  if (filteredAccounts.length === 0) {
      // If no accounts match the search criteria, set a single suggestion with "No Data Found" message
      this.suggestions = [{ label: 'No Data Found', value: 0 }];
  } else {
      // If there are matching accounts, map them to suggestions
      this.suggestions = filteredAccounts.map(account => ({ 
          label: `${account.id} - ${account.customerFirstName} ${account.customerLastName}`, 
          value: account.id 
      }));
  }
}


selectAccountFromSearch(account: any) {
  console.log("acc A : " , this.selectedAccountAId );
  console.log("acc B : " , this.selectedAccountBId );
  console.log("fuck" ,account)
  if( account === this.selectedAccountAId)
  {
    this.selectedAccountAId = account.value;
    this.accounts$?.subscribe(accounts => {
      accounts.forEach(account => {
          if (account.id == this.selectedAccountAId) {
              this.selectedAccountA = account;
              
          }
      });
  });
  }
  else if(account === this.selectedAccountBId){
    this.selectedAccountBId = account.value;
    this.accounts$?.subscribe(accounts => {
      accounts.forEach(account => {
          if (account.id == this.selectedAccountBId) {
              this.selectedAccountB = account;
          }
      });
  });
  }
 
}

DialogConfirm() {
  if (!this.amount) {
    Swal.fire("Warning!", "Please enter a valid amount.", "warning");
    return; 
  }
  Swal.fire({
    title: `Are you sure that you want to Tranfer ${this.amount}$ ?`,
    showCancelButton: true,
    showConfirmButton :true,
    icon:"question",
  }).then((result) => {
    if (result.isConfirmed) {
      this.PerformTransfer();
    }
  });
}



}
