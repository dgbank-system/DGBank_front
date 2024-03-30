import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../../services/account.service';
import { Account } from '../../interface/account';
import { Observable } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';
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
              private accountService : AccountService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService 
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
        this.accountService.updateBalance(this.selectedAccount?.id, response.balanceA);
        if (response.status === "Successful") {
            this.messageService.add({ severity: 'success', summary: 'Withdraw Successful', detail: 'Your Withdraw has been completed.' });
        } else {
            this.messageService.add({ severity: 'error', summary: 'Withdraw Rejected', detail: 'Your account balance is not sufficient to complete this withdrawal request', life: 3000 });
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
        message: `Are you sure that you want to Withdraw ${this.amount}$ ?`,
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        acceptIcon:"none",
        rejectIcon:"none",
        rejectButtonStyleClass:"p-button-text",
        accept: () => {             
          this.performWithdraw();           
        },
        reject: () => {
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'Your Withdraw has been rejected', life: 3000 });
        }
    });
  }

}
