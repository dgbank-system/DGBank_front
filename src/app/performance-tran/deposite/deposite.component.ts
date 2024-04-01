import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { ToastrService } from 'ngx-toastr';
import { Account } from '../../interface/account';
import { AccountService } from '../../services/account.service';
import { Observable } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';
interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}
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
  accounts: Account[] = [];
  balance : number | undefined ;
  suggestions: { label: string; value: number }[] = [];
  constructor(private transferService : TransactionService ,
              private toaster : ToastrService ,
              private accountService :AccountService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService){}

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

  performDeposite()
  {
    this.transferService.addDeposite(this.selectedAccount?.id , this.amount).subscribe(
      (response : any) => 
      {
       
        this.accountService.updateBalance(this.selectedAccount?.id, response.balanceA);
        // this.accountService.updateBalance(this.selectedAccount?.id, response.balanceA);
        if (response.status === "Successful") {
            this.messageService.add({ severity: 'success', summary: 'Deposit Successful', detail: 'Your Deposit has been completed.' });
        } else {
            this.messageService.add({ severity: 'error', summary: 'Deposit Rejected', detail: 'Your Deposit has been rejected', life: 3000 });
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

    confirm1(event: Event) {
      this.confirmationService.confirm({
          target: event.target as EventTarget,
          message: `Are you sure that you want to Deposit ${this.amount}$ ?`,
          header: 'Confirmation',
          icon: 'pi pi-exclamation-triangle',
          acceptIcon:"none",
          rejectIcon:"none",
          rejectButtonStyleClass:"p-button-text",
          accept: () => {             
            this.performDeposite();           
          },
          reject: () => {
              this.messageService.add({ severity: 'error', summary: 'Deposit Rejected', detail: 'Your deposit has been rejected', life: 3000 });
          }
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

}
