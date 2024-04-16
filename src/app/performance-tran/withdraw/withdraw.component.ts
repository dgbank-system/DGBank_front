import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../../services/account.service';
import { Account } from '../../interface/account';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2'

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}
@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent implements OnInit {
[x: string]: any;


  amount : number | undefined;
  selectedAccount: Account | undefined ;
  accountfNames : String[] = [];
  accountlNames : String[] = []
  accounts$: Observable<Account[]> | undefined;
  accounts: Account[] = [];
  accountIds : number[] = [];
  selectedAccountId: number = 0;
  balance : number | undefined ;
  suggestions: { label: string; value: number }[] = [];


  constructor(private transactionSrevice : TransactionService ,
              private toaster : ToastrService,
              private accountService : AccountService,
             ){}

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
  
  


  performWithdraw()
  {
    
    this.transactionSrevice.addWithdraw(this.selectedAccount?.id , this.amount ).subscribe(
      (response : any) => 
      {
        
        this.accountService.updateBalance(this.selectedAccount?.id, response.balanceA)
        if (response.status === "Successful") {
          Swal.fire("Saved!", "Your Withdraw has been completed.", "success");
        } else {
          Swal.fire("Failed Transaction Process", "Your account balance is not sufficient to complete this withdrawal request", "error");
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
    this.selectedAccountId = account.value;
      this.accounts$?.subscribe(accounts => {
        accounts.forEach(account => {
            if (account.id == this.selectedAccountId) {
                this.selectedAccount = account;
            }
        });
    });
  }

  DialogConfirm() {
    if (!this.amount) {
      Swal.fire("Warning!", "Please enter a valid amount.", "warning");
      return; 
    }
    Swal.fire({
      title: `Are you sure that you want to Withdraw ${this.amount}$ ?`,
      showCancelButton: true,
      showConfirmButton :true,
      icon:"question",
    }).then((result) => {
      if (result.isConfirmed) {
        this.performWithdraw();
      }
    });
  }



 
  
}
